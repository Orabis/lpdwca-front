#!/usr/bin/env bash
# ============================================================================
# rebuild-front.sh — reconstruit et redéploie le front LP DWCA.
#
# Déclenché par le récepteur de webhook (hooks.json) quand un contenu est
# publié dans Strapi. Peut aussi se lancer à la main : sudo ./rebuild-front.sh
#
# Comportement anti-rafale : si un build est déjà en cours, l'appel pose un
# marqueur et rend la main immédiatement ; le build en cours enchaîne alors
# une seule reconstruction supplémentaire à la fin. Dix publications
# consécutives dans l'admin ne coûtent donc que deux builds au maximum.
#
# La configuration se surcharge dans /etc/lpdwca-rebuild.conf (voir README).
# ============================================================================
set -euo pipefail

# --------------------------------------------------------------- configuration
REPO_DIR="${REPO_DIR:-/opt/lpdwca-front}"        # clone du dépôt sur le serveur
BRANCH="${BRANCH:-main}"                          # branche déployée
IMAGE="${IMAGE:-lpdwca-front}"                    # nom de l'image Docker
CONTAINER="${CONTAINER:-lpdwca-front}"            # nom du conteneur
ENV_FILE="${ENV_FILE:-$REPO_DIR/.env}"            # BASE_URL_API + TOKEN_API
BIND="${BIND:-127.0.0.1:4321}"                    # port publié (derrière le proxy)
LOCK_FILE="${LOCK_FILE:-/var/lock/lpdwca-rebuild.lock}"
PENDING_FILE="${PENDING_FILE:-/var/lock/lpdwca-rebuild.pending}"
LOG_FILE="${LOG_FILE:-/var/log/lpdwca-rebuild.log}"

CONF="/etc/lpdwca-rebuild.conf"
# shellcheck source=/dev/null
[ -f "$CONF" ] && . "$CONF"

log() { printf '%s %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*" | tee -a "$LOG_FILE"; }

# --------------------------------------------------------------- verrouillage
exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  # Un build tourne déjà : on note qu'il faudra relancer, et on sort tout de
  # suite pour que le webhook réponde vite à Strapi.
  touch "$PENDING_FILE"
  log "build déjà en cours — reconstruction supplémentaire programmée"
  exit 0
fi

# --------------------------------------------------------------- build
build_once() {
  log "=== reconstruction du front (branche $BRANCH) ==="

  cd "$REPO_DIR"
  git fetch --prune origin
  git checkout -q "$BRANCH"
  git reset --hard "origin/$BRANCH"
  log "code aligné sur origin/$BRANCH ($(git rev-parse --short HEAD))"

  if [ ! -f "$ENV_FILE" ]; then
    log "ATTENTION : $ENV_FILE introuvable — le front tournera sur son repli statique, sans articles."
  fi

  # L'image précédente est conservée sous :previous pour pouvoir revenir en
  # arrière d'une commande (voir README, section Retour arrière).
  if docker image inspect "$IMAGE:latest" >/dev/null 2>&1; then
    docker tag "$IMAGE:latest" "$IMAGE:previous"
  fi

  docker build -t "$IMAGE:latest" .
  log "image construite"

  docker rm -f "$CONTAINER" >/dev/null 2>&1 || true
  docker run -d \
    --name "$CONTAINER" \
    --restart unless-stopped \
    ${ENV_FILE:+--env-file "$ENV_FILE"} \
    -p "$BIND:4321" \
    "$IMAGE:latest" >/dev/null
  log "conteneur relancé sur $BIND"

  # Contrôle de démarrage : 30 s pour répondre, sinon on le signale.
  for _ in $(seq 1 15); do
    if curl -sf -o /dev/null "http://$BIND/"; then
      log "le front répond — déploiement terminé"
      docker image prune -f >/dev/null
      return 0
    fi
    sleep 2
  done
  log "ERREUR : le front ne répond pas après 30 s — image précédente disponible sous $IMAGE:previous"
  return 1
}

build_once

# Des publications sont-elles arrivées pendant le build ? Une seule passe
# supplémentaire suffit : elle emporte tout ce qui a été publié entre-temps.
if [ -f "$PENDING_FILE" ]; then
  rm -f "$PENDING_FILE"
  log "publications reçues pendant le build — nouvelle passe"
  build_once
fi

log "terminé"

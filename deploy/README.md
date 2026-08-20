# Webhook de reconstruction — pas-à-pas serveur

> **Pour : Léo** · Objectif : quand quelqu'un publie un contenu dans Strapi
> (`lp-dwca-api.lmerkel.fr/admin`), le front (`lp-dwca.lmerkel.fr`) se
> reconstruit et se redéploie tout seul. Plus personne ne touche au serveur
> pour un changement de texte.

```
Strapi (publication) ──▶ webhook HTTPS ──▶ récepteur (port 9000, localhost)
                                               │
                                               ▼
                                        rebuild-front.sh
                                 git pull → docker build → docker run
```

Trois fichiers dans ce dossier :

| Fichier | Rôle |
|---|---|
| `rebuild-front.sh` | git pull + build de l'image + relance du conteneur, avec verrou anti-rafale et retour arrière possible |
| `hooks.json` | configuration du récepteur [`webhook`](https://github.com/adnanh/webhook) : un seul endpoint, protégé par un secret |
| `lpdwca-webhook.service` | unité systemd qui fait tourner le récepteur en permanence |

Compte 15 minutes, tout se copie-colle.

---

## 1. Prérequis (déjà en place chez toi, à vérifier)

```bash
which git docker curl        # les trois doivent répondre
sudo apt install webhook     # le récepteur (paquet Debian/Ubuntu officiel)
```

Le dépôt front doit être cloné sur le serveur (adapte le chemin si besoin,
c'est la variable `REPO_DIR` de l'étape 3) :

```bash
sudo git clone https://github.com/Orabis/lpdwca-front.git /opt/lpdwca-front
```

## 2. Installer les fichiers

```bash
sudo mkdir -p /opt/lpdwca-deploy
sudo cp deploy/rebuild-front.sh deploy/hooks.json /opt/lpdwca-deploy/
sudo chmod 750 /opt/lpdwca-deploy/rebuild-front.sh
sudo cp deploy/lpdwca-webhook.service /etc/systemd/system/
```

Génère un secret et mets-le dans `hooks.json` à la place de
`CHANGER-CE-SECRET` (garde-le sous la main pour l'étape 6) :

```bash
openssl rand -hex 32
sudo nano /opt/lpdwca-deploy/hooks.json
```

## 3. Configurer le script

Crée `/etc/lpdwca-rebuild.conf` avec tes valeurs réelles :

```bash
sudo tee /etc/lpdwca-rebuild.conf > /dev/null <<'EOF'
REPO_DIR=/opt/lpdwca-front     # là où le dépôt est cloné
BRANCH=main                    # branche déployée — voir « Point d'attention branches »
CONTAINER=lpdwca-front         # nom de TON conteneur front actuel (docker ps)
BIND=127.0.0.1:4321            # port que ton reverse proxy cible déjà
EOF
```

⚠️ **Regarde d'abord comment le front tourne aujourd'hui** (`docker ps`) et
reprends le **même nom de conteneur et le même port** : le script remplace le
conteneur existant, il ne doit pas en créer un deuxième à côté.

### Le `.env` du dépôt sur le serveur

Le `.dockerignore` exclut `.env` de l'image : les identifiants Strapi passent
**au lancement du conteneur** (`--env-file`), jamais dans l'image. Vérifie que
`/opt/lpdwca-front/.env` contient :

```
BASE_URL_API=https://lp-dwca-api.lmerkel.fr/api
TOKEN_API=<jeton lecture seule, à créer dans Strapi → Settings → API Tokens>
```

Sans ce fichier, le site se construit quand même mais sert son repli statique
(`src/data/strapi-snapshot.json`) et n'affiche pas les articles.

## 4. Démarrer le récepteur et tester en local

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now lpdwca-webhook
systemctl status lpdwca-webhook          # doit être « active (running) »
```

Test local (remplace `<SECRET>`) — la première exécution construit l'image,
compte quelques minutes :

```bash
curl -s -H "X-Webhook-Secret: <SECRET>" http://127.0.0.1:9000/hooks/rebuild-front
tail -f /var/log/lpdwca-rebuild.log
```

Attendu dans le log : `code aligné … image construite … le front répond`.
Un appel **sans** le bon secret doit renvoyer `Hook rules were not satisfied` —
vérifie-le aussi.

## 5. Exposer l'endpoint en HTTPS

Le récepteur n'écoute que sur `127.0.0.1:9000` : il faut le publier via ton
reverse proxy existant, sur le vhost de ton choix. Exemple nginx, à poser sur
le vhost de l'API :

```nginx
location /hooks/rebuild-front {
    proxy_pass http://127.0.0.1:9000/hooks/rebuild-front;
    proxy_set_header X-Webhook-Secret $http_x_webhook_secret;
}
```

Puis depuis ta machine (à travers Cloudflare) :

```bash
curl -s -H "X-Webhook-Secret: <SECRET>" https://lp-dwca-api.lmerkel.fr/hooks/rebuild-front
```

Optionnel mais bien : dans Cloudflare, une règle WAF qui limite
`/hooks/rebuild-front` à quelques requêtes par minute — le secret protège
déjà, la règle évite juste le bruit.

## 6. Déclarer le webhook dans Strapi

Admin de prod → **Settings → Webhooks → Create new webhook** :

| Champ | Valeur |
|---|---|
| Name | `Rebuild front` |
| Url | `https://lp-dwca-api.lmerkel.fr/hooks/rebuild-front` |
| Headers | clé `X-Webhook-Secret`, valeur : le secret de l'étape 2 |
| Events | **Entry** : publish, unpublish, delete, update · **Media** : create, update, delete |

Enregistre, puis bouton **Trigger** : la réponse doit être 200 et
`/var/log/lpdwca-rebuild.log` doit bouger.

## 7. Test de bout en bout

1. Admin Strapi → *Page d'accueil* → modifie un titre → **Publish**
2. `tail -f /var/log/lpdwca-rebuild.log` → un build démarre
3. Deux à trois minutes plus tard : le changement est visible sur
   `https://lp-dwca.lmerkel.fr` (pense au cache Cloudflare : purge-le ou
   attends son expiration pour vérifier)

C'est en place. L'équipe publie, le site suit.

---

## Points d'attention

### Branches — à trancher avant la première exécution

`BRANCH=main` suppose que les PR sont mergées dans `main` et que tu déploies
`main`. Or **ta branche `dockerize` front diverge de `main`** sur un point
structurant : elle passe Astro en **SSR** (`output: 'server'`, adaptateur
Node, dépendances Astro 7) alors que `main` est en **statique**. Deux options :

- **Statique (recommandé — c'est l'architecture du cahier des charges)** :
  merge `main` dans `dockerize` en gardant `output: 'static'`, et remplace le
  `CMD` du Dockerfile par un serveur de fichiers statiques (ou sers `dist/`
  via nginx). Le webhook prend alors tout son sens : le contenu est figé au
  build, chaque publication reconstruit.
- **SSR (ton montage actuel)** : les pages interrogent Strapi à la demande,
  **mais** les services mettent le contenu en cache au niveau du module — le
  premier rendu fige les textes jusqu'au redémarrage du processus. Le webhook
  reste donc nécessaire ; il peut se contenter de `docker restart` au lieu
  d'un rebuild complet (modifie `build_once` en conséquence).

Dans les deux cas, garde une seule source de vérité pour la config Astro —
aujourd'hui la prod tourne sur Astro 7.2.3 alors que le lockfile du dépôt
épingle la 6.x : le build de prod ne sort pas du dépôt, c'est fragile.

### Prérequis côté Strapi (avant que tout ceci serve)

1. Merger et déployer `Orabis/lpdwca-back#7` — les 17 content-types
2. Charger le contenu : seed sur base vierge (`node scripts/seed.js`) ou
   saisie dans l'admin. Le seed **ne se rejoue pas** sur une base déjà
   initialisée (drapeau `initHasRun` dans le core store)
3. Étendre le jeton API du front : find/findOne sur les nouveaux types

### Retour arrière

Chaque build conserve l'image précédente :

```bash
docker rm -f lpdwca-front
docker run -d --name lpdwca-front --restart unless-stopped \
  --env-file /opt/lpdwca-front/.env -p 127.0.0.1:4321:4321 lpdwca-front:previous
```

### Diagnostic rapide

| Symptôme | Piste |
|---|---|
| `Hook rules were not satisfied` | le secret du header ≠ celui de `hooks.json` |
| 404 sur `/hooks/rebuild-front` | règle de proxy absente, ou service arrêté (`systemctl status lpdwca-webhook`) |
| build ok mais anciens textes | cache Cloudflare, ou `.env` absent → repli statique (voir le log) |
| `le front ne répond pas après 30 s` | `docker logs lpdwca-front` ; revenir sur `:previous` |
| rafale de publications | normal : les appels se regroupent, deux builds maximum (voir le log) |

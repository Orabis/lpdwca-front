import { fetchSingle } from './strapi'
import snapshot from '@/data/strapi-snapshot.json'

/**
 * Libellés courts réutilisés par plusieurs composants (boutons de carte, états
 * vides, commandes du menu). Modifier une valeur dans Strapi la change partout.
 *
 * Le repli ci-dessous reprend les libellés historiquement figés dans le code.
 */
export interface UiLabels {
  viewAll: string
  learnMore: string
  viewProgram: string
  readArticle: string
  viewArticles: string
  moreDetails: string
  submitContact: string
  submitting: string
  articlesEmpty: string
  coverFallback: string
  menuOpen: string
  menuClose: string
  externalLinkSuffix: string
}

// Repli genere par scripts/sync-fallback.mjs — ne pas editer a la main.
const FALLBACK = snapshot.uiLabels as unknown as UiLabels

let cache: UiLabels | undefined

export async function getUiLabels(): Promise<UiLabels> {
  if (cache) return cache
  const remote = await fetchSingle<Partial<UiLabels>>('/ui-label')
  // Une valeur vide dans l'admin ne doit pas effacer un libellé : on complète
  // toujours par le repli.
  cache = { ...FALLBACK, ...(remote ?? {}) }
  return cache
}

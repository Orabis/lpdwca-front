import { fetchSingle } from './strapi'
import snapshot from '@/data/strapi-snapshot.json'

/**
 * Accès générique aux single types « page » de Strapi.
 *
 * Chaque page appelle getPageContent('licence-page', params) et reçoit soit le
 * contenu publié dans Strapi, soit l'instantané de repli généré par
 * scripts/sync-fallback.mjs. Les données passent telles quelles : la forme des
 * champs Strapi est alignée sur ce que les gabarits Astro attendent.
 */
export type PageKey =
  | 'licence-page'
  | 'formation-page'
  | 'financement-page'
  | 'contact-page'
  | 'candidature-page'
  | 'alumni-page'
  | 'elearning-page'
  | 'legal-page'
  | 'articles-page'

const SNAPSHOT_KEYS: Record<PageKey, string> = {
  'licence-page': 'licencePage',
  'formation-page': 'formationPage',
  'financement-page': 'financementPage',
  'contact-page': 'contactPage',
  'candidature-page': 'candidaturePage',
  'alumni-page': 'alumniPage',
  'elearning-page': 'elearningPage',
  'legal-page': 'legalPage',
  'articles-page': 'articlesPage',
}

const cache = new Map<PageKey, unknown>()

export async function getPageContent<T>(page: PageKey, params: Record<string, unknown> = {}): Promise<T> {
  if (cache.has(page)) return cache.get(page) as T

  const remote = await fetchSingle<T>(`/${page}`, params)
  const value = remote ?? ((snapshot as Record<string, unknown>)[SNAPSHOT_KEYS[page]] as T)

  if (!value) {
    throw new Error(
      `Contenu introuvable pour « ${page} » : ni Strapi ni l'instantané de repli ne le fournissent. ` +
        'Lancez « node scripts/sync-fallback.mjs » avec Strapi démarré.'
    )
  }

  cache.set(page, value)
  return value
}

/** Populate profond par défaut pour une page : composants à un niveau. */
export const DEEP = { populate: '*' }

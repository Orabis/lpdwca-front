import { fetchSingle } from './strapi'
import snapshot from '@/data/strapi-snapshot.json'
import type { NavLink, FooterNavSection, SocialLink } from '@/data/navigation'

/**
 * Bandeau, barre de navigation et pied de page — présents sur toutes les pages.
 *
 * Source de vérité : le single type « Navigation » dans Strapi. Les valeurs de
 * src/data/navigation.ts ne servent que de repli quand l'API n'est pas jointe
 * au build ; elles sont régénérées par scripts/sync-fallback.
 */
export interface NavigationContent {
  bannerText: string
  bannerLinkLabel?: string
  bannerLinkHref?: string
  logoAlt: string
  mainLinks: NavLink[]
  ctaLabel: string
  ctaHref: string
  footerSections: FooterNavSection[]
  socialTitle?: string
  socialLinks: SocialLink[]
  legalLinks: NavLink[]
  contactEmail?: string
  contactPhone?: string
  contactAddress?: string
  copyright?: string
}

// Repli genere par scripts/sync-fallback.mjs — ne pas editer a la main.
const FALLBACK = snapshot.navigation as unknown as NavigationContent

let cache: NavigationContent | undefined

export async function getNavigation(): Promise<NavigationContent> {
  if (cache) return cache

  const remote = await fetchSingle<NavigationContent>('/navigation', {
    'populate[mainLinks]': true,
    'populate[legalLinks]': true,
    'populate[socialLinks]': true,
    'populate[footerSections][populate][links]': true,
  })

  cache = remote ?? FALLBACK
  return cache
}

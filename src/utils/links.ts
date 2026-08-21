/**
 * Aides de liens partagées par l'en-tête, le bandeau et le pied de page.
 */

/** Un href absolu quitte le site : il doit s'ouvrir dans un nouvel onglet. */
export function isExternalHref(href?: string): boolean {
  return typeof href === 'string' && /^https?:\/\//i.test(href)
}

/** Compare deux chemins internes en ignorant requête, ancre et slash final. */
export function isSamePath(a: string, b: string): boolean {
  const normalise = (path: string) => path.split(/[?#]/)[0].replace(/\/+$/, '') || '/'
  return normalise(a) === normalise(b)
}

// Source unique des liens de navigation (NavBar + Footer)

export interface NavLink {
  href: string
  label: string
  external?: boolean
}

export interface FooterNavSection {
  title: string
  links: NavLink[]
}

export interface SocialLink {
  icon: string
  label: string
  href: string
}

export const mainNavLinks: NavLink[] = [
  { href: '/', label: 'Accueil' },
  { href: '/licence/', label: 'Licence' },
  { href: '/formation/', label: 'Formation' },
  { href: '/financement/', label: 'Financement' },
  { href: '/contact/', label: 'Contact' },
]

export const footerNavSections: FooterNavSection[] = [
  {
    title: 'Accueil',
    links: [
      { href: '/#avantages', label: 'Avantages' },
      { href: '/formation/', label: 'Nos formations' },
      { href: '/#temoignages', label: 'Témoignages alumni' },
      { href: '/#faq', label: 'Notre FAQ' },
    ],
  },
  {
    title: 'La formation',
    links: [
      { href: '/alumni/', label: 'Alumni' },
      { href: '/e-learning/', label: 'Se former à distance' },
      { href: '/candidature/', label: 'Candidater' },
      {
        href: 'https://formations.unistra.fr/fr/formations/licence-professionnelle-LIP/licence-professionnelle-metiers-de-l-informatique-conception-developpement-et-test-de-logiciels-ME157/developpement-web-communication-et-apprentissages-ead-sfc-PR828.html',
        label: 'Fiche officielle Unistra',
        external: true,
      },
    ],
  },
]

// TODO — URLs réelles des comptes à fournir. Le cahier des charges § 4.3 fait de
// LinkedIn et Instagram les canaux prioritaires ; Instagram est absent du site
// et Twitter / X n'est retenu dans aucun plan de communication.
export const socialLinks: SocialLink[] = [
  { icon: 'facebook', label: 'Facebook', href: '#' },
  { icon: 'twitter', label: 'Twitter / X', href: '#' },
  { icon: 'linkedin', label: 'LinkedIn', href: '#' },
]

export const legalLinks: NavLink[] = [
  { href: '/mentions-legales/', label: 'Mentions légales' },
  { href: '/mentions-legales/#donnees', label: 'Données personnelles' },
  { href: '/mentions-legales/#accessibilite', label: 'Accessibilité' },
]

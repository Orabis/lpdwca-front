// Source unique des liens de navigation (NavBar + Footer)

export interface NavLink {
  href: string
  label: string
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
    title: 'À propos de nous',
    links: [
      { href: '#', label: 'INSPE de Strasbourg' },
      { href: '#', label: 'Diplôme obtenu' },
      { href: '#', label: 'Volume horaire' },
    ],
  },
]

export const socialLinks: SocialLink[] = [
  { icon: 'facebook', label: 'Facebook', href: '#' },
  { icon: 'twitter', label: 'Twitter / X', href: '#' },
  { icon: 'linkedin', label: 'LinkedIn', href: '#' },
]

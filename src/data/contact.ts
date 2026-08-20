// Données de la page Contact — à remplacer par un fetch Strapi quand l'API sera prête
// `icon` correspond au modificateur CSS `.icon--<nom>` (voir global.css, section Icônes)

export interface ContactInfoCard {
  icon: string
  label: string
  href?: string
}

export interface ContactField {
  id: string
  name: string
  label: string
  type?: string
  placeholder: string
  textarea?: boolean
  full?: boolean
}

// Coordonnées du Service Formation Continue, vérifiées sur sfc.unistra.fr
// et sur la fiche officielle du diplôme (catalogue Unistra 2026-2027).
export const infoCards: ContactInfoCard[] = [
  {
    icon: 'mail',
    label: 'sfc-contact@unistra.fr',
    href: 'mailto:sfc-contact@unistra.fr',
  },
  {
    icon: 'phone',
    label: '+33 (0)3 68 85 49 20',
    href: 'tel:+33368854920',
  },
  {
    icon: 'location',
    label: 'Service Formation Continue — 21 rue du Maréchal Lefebvre, 67100 Strasbourg',
  },
]

export const contactFields: ContactField[] = [
  {
    id: 'contact-firstname',
    name: 'firstname',
    label: 'Prénom',
    type: 'text',
    placeholder: 'Entrez votre prénom',
  },
  {
    id: 'contact-lastname',
    name: 'lastname',
    label: 'Nom de famille',
    type: 'text',
    placeholder: 'Entrez votre nom de famille',
  },
  {
    id: 'contact-email',
    name: 'email',
    label: 'E-mail',
    type: 'email',
    placeholder: 'Entrez votre adresse e-mail',
  },
  {
    id: 'contact-phone',
    name: 'phone',
    label: 'Téléphone',
    type: 'tel',
    placeholder: 'Entrez votre numéro de téléphone',
  },
  {
    id: 'contact-subject',
    name: 'subject',
    label: 'Objet',
    type: 'text',
    placeholder: 'Indiquez votre sujet',
    full: true,
  },
  {
    id: 'contact-message',
    name: 'message',
    label: 'Message',
    placeholder: 'Écrivez votre message ici...',
    textarea: true,
    full: true,
  },
]

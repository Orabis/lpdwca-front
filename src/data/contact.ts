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

export const infoCards: ContactInfoCard[] = [
  {
    icon: 'mail',
    label: 'support@lpdwca.fr',
    href: 'mailto:support@lpdwca.fr',
  },
  {
    icon: 'phone',
    label: '+33 00 00 00 00 00',
  },
  {
    icon: 'location',
    label: 'Quelque part en alsace',
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

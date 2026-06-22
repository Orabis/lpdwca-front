// Données de la page Formation — à remplacer par un fetch Strapi quand l'API sera prête
// `icon` correspond au modificateur CSS `.icon--<nom>` (voir global.css, section Icônes)

export interface FormationType {
  title: string
  description: string
  question: string
  icon: string
}

export interface FormationInfoCard {
  title: string
  icon: string
  items: string[]
  ordered?: boolean
}

export const formationTypes: FormationType[] = [
  {
    title: 'Formation initiale',
    description: "Dans le cadre d'un contrat d'apprentissage ou de professionnalisation.",
    question: 'Vous avez moins de 30 ans, vous souhaitez continuer vos études ou vous réorienter ?',
    icon: 'formation-initiale',
  },
  {
    title: 'Formation continue',
    description: "Organisation libre de l'emploi du temps. Stage ou projet personnel au 2nd semestre.",
    question: 'Vous souhaitez vous reconvertir et développer de nouvelles compétences ?',
    icon: 'formation-continue',
  },
]

export const infoCards: FormationInfoCard[] = [
  {
    title: 'Public concerné',
    icon: 'chat-duo',
    items: [
      'Salariés en poste ou en reconversion',
      "Demandeurs d'emploi",
      'Travailleurs indépendants',
      "Personnes en reprise d'études après une interruption de plus de deux ans",
    ],
  },
  {
    title: 'Organisation',
    icon: 'book-open',
    items: [
      'Formation 100% à distance',
      'Cours synchrones les jeudis et vendredis soirs (18h–22h)',
      'Travail personnel flexible (soirs, week-ends)',
      'Stage de 12 semaines minimum ou projet professionnel pour les salariés',
    ],
  },
  {
    title: 'Financement',
    icon: 'pencil-square',
    items: [
      'Coût de la formation : 5610 € (tarif 2024–2025)',
      'Possibilités de financement : entreprise, OPCO, Pôle Emploi, CPF, financement personnel',
      "Paiement échelonné possible sur l'année de formation",
    ],
  },
  {
    title: 'Avantages',
    icon: 'sparkle',
    items: [
      'Compatibilité avec une activité professionnelle',
      "Flexibilité dans l'organisation du travail personnel",
      "Valorisation de l'expérience professionnelle",
      "Possibilité de réorientation ou d'évolution de carrière",
    ],
  },
  {
    title: 'Processus',
    icon: 'pencil',
    ordered: true,
    items: [
      'Candidature et admission à la formation',
      'Recherche de financement',
      'Inscription définitive',
      'Suivi des cours à distance',
      'Réalisation du stage ou du projet professionnel',
    ],
  },
]

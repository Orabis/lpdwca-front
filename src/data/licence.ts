// Données de la page Licence — à remplacer par un fetch Strapi quand l'API sera prête
// `icon` correspond au modificateur CSS `.icon--<nom>` (voir global.css, section Icônes)

export interface ProgramDomain {
  icon: string
  title: string
  description: string
  href?: string
}

export interface CurriculumUe {
  ue: string
  icon: string
  title: string
  lines: string[]
  short?: boolean
  offset?: 'top' | 'bottom'
}

export interface Semester {
  label: string
  gridModifier: string
  ariaLabel: string
  ues: CurriculumUe[]
}

export const programDomains: ProgramDomain[] = [
  {
    icon: 'command-line',
    title: 'Développement Web',
    description: 'Front-End : HTML/CSS, Javascript, ReactJS et Back-End : PHP/MySQL',
  },
  {
    icon: 'chat-duo',
    title: 'Communication',
    description: 'Gestion de projet web, Digital marketing, Réseaux sociaux, Droit du multimédia',
  },
  {
    icon: 'book-open',
    title: 'Apprentissages',
    description: 'E-learning, jeux sérieux et mondes virtuels Blender, Unity',
  },
]

export const semesters: Semester[] = [
  {
    label: 'Semestre 1 (210 heures)',
    gridModifier: 'semester-1',
    ariaLabel: "Unités d'enseignement du semestre 1",
    ues: [
      {
        ue: '51',
        icon: 'paint-brush',
        title: 'UE 5.1 Conception et réalisation graphiques pour le web et Technologie Web',
        lines: [
          'Création graphique',
          'Relation client/commanditaire',
          'Ergonomie et UX design',
          'Design web',
          'Droit du multimédia (58h)',
        ],
      },
      {
        ue: '52',
        icon: 'command-line',
        title: 'UE 5.2 Développement Front-End : fondamentaux de la programmation',
        offset: 'top',
        lines: ['HTML et CSS', 'Javascript, API et framework', 'Intégration web', 'Référencement (38h)'],
      },
      {
        ue: '53',
        icon: 'chat-duo',
        title: 'UE 5.3 Gestion de projet multimédia et commercialisation',
        lines: [
          'Cahier des charges',
          'Gestion de projet',
          'Marketing digital',
          'Communication publicitaire',
          'Community Management (48h)',
        ],
      },
      {
        ue: '54',
        icon: 'chat',
        title: 'UE 5.4 Langues',
        lines: ['Anglais : Expression écrite et orale', 'Anglais : Culture des entreprises (16h)'],
      },
      {
        ue: '55',
        icon: 'sparkle',
        title: 'UE 5.5 Projet Tuteuré, Étape 1',
        short: true,
        lines: ['Préparation et Analyse du projet (50h)'],
      },
    ],
  },
  {
    label: 'Semestre 2 (198 heures)',
    gridModifier: 'semester-2',
    ariaLabel: "Unités d'enseignement du semestre 2",
    ues: [
      {
        ue: '61',
        icon: 'command-line',
        title: 'UE 6.1 Développement Back-End',
        lines: ['PHP & Base de données', 'CMS', 'Sécurité des SI et web (36h)'],
      },
      {
        ue: '62',
        icon: 'paint-brush',
        title: 'UE 6.2 Design et application 3D immersives',
        offset: 'top',
        lines: ['Design 3D', 'Développement 3D', 'Réalité virtuelle (VR) 30h'],
      },
      {
        ue: '63',
        icon: 'command-line',
        title: 'UE 6.3 Développement Web : approfondissement',
        lines: ['ReactJS, NodeJS', 'Progressive Web App', 'Architecture MVC et frameworks (30h)'],
      },
      {
        ue: '64',
        icon: 'book-open',
        title: 'UE 6.4 Interactivité numérique et apprentissage tout au long de la vie',
        lines: [
          'TICE et Apprentissages',
          'Ingénierie des EIAH',
          'Scénarii pédagogiques',
          'Dispositifs de formation pour la FTLV 32h',
        ],
      },
      {
        ue: '65',
        icon: 'pencil',
        title: 'UE 6.5 Projet Tuteuré, Étape 2',
        offset: 'bottom',
        short: true,
        lines: ['Conception du projet (70h)'],
      },
      {
        ue: '66',
        icon: 'book-open',
        title: 'UE 6.6 Stage ou Apprentissage',
        short: true,
        lines: ['Projet personnel ou professionnel (420h)'],
      },
    ],
  },
]

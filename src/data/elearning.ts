// Données de la page « Se former à distance » — à remplacer par un fetch Strapi
// quand l'API sera prête.
//
// `icon` correspond au modificateur CSS `.icon--<nom>` (voir styles/icons.css).

export interface ScheduleRow {
  day: string
  values: string[]
}

export interface DistanceFact {
  icon: string
  title: string
  description: string
}

export interface PlatformCard {
  title: string
  icon: string
  intro: string
  items: string[]
}

// Les quatre piliers de la « Distance Augmentée », proposition de valeur unique
// définie dans le cahier des charges (Benchmark.docx).
export const distanceFacts: DistanceFact[] = [
  {
    icon: 'chat-duo',
    title: 'Synchronicité et accompagnement',
    description:
      'Deux soirs par semaine, vous êtes en cours avec un intervenant et le reste de la promotion. Vous posez vos questions à voix haute, on vous répond dans la minute, et le Service Formation Continue assure un suivi permanent.',
  },
  {
    icon: 'sparkle',
    title: 'Zéro logistique',
    description:
      'Aucun frais de déplacement ni de logement. Pas de double loyer, pas de trajet vers l’Alsace : la formation vient à vous, où que vous soyez.',
  },
  {
    icon: 'chat',
    title: 'Conciliation vie professionnelle et vie personnelle',
    description:
      'Les cours ont lieu en soirée et le travail personnel s’organise librement. Le rythme est pensé pour des actifs, et pour des alternants dont l’entreprise peut se situer partout en France.',
  },
  {
    icon: 'book-open',
    title: 'Crédibilité publique',
    description:
      'Un diplôme d’État de grade licence, délivré par l’Université de Strasbourg et porté par le Service Formation Continue avec l’INSPÉ. Pas un certificat privé.',
  },
]

export const platforms: PlatformCard[] = [
  {
    title: 'DigitalUni — la plateforme de la formation',
    icon: 'book-open',
    intro:
      'C’est le point de passage quotidien : tout ce qui n’est pas en direct s’y trouve. La plateforme est accessible depuis n’importe quel navigateur, sur n’importe quel système d’exploitation.',
    items: [
      'Les cours et les vidéo-cours, consultables et téléchargeables toute l’année',
      'Les exercices, les QCM et les situations problèmes à rendre',
      'Les forums de discussion, par module et par promotion',
      'Le dépôt des travaux et le retour des intervenants',
      'Le suivi du travail asynchrone, module par module',
    ],
  },
  {
    title: 'Classilio — les cours en direct',
    icon: 'chat',
    intro:
      'Les classes virtuelles ont lieu les jeudi et vendredi de 18 h à 22 h. C’est le cœur du dispositif : des heures de cours en direct chaque semaine, avec les intervenants et le reste de la promotion.',
    items: [
      'Audioconférence et partage d’écran',
      'Tableau blanc partagé et annotation en direct',
      'Travail en sous-groupes pendant la séance',
      'Enregistrement des séances, consultables ensuite',
      'Aucune installation lourde : la classe s’ouvre depuis le navigateur',
    ],
  },
]

export const dailyTools: string[] = [
  'Discord — les échanges quotidiens entre apprenants, l’entraide, les salons par projet',
  'Dropbox — le partage de fichiers et le travail collaboratif sur les livrables',
  'GitHub — le versionnement du code, utilisé dans les modules de développement',
]

export const equipment: string[] = [
  'Un ordinateur capable de faire tourner des logiciels de création graphique et de 3D. Aucun système d’exploitation n’est imposé : Windows, macOS et Linux conviennent.',
  'Une connexion internet stable — c’est le seul point réellement bloquant pour les classes virtuelles.',
  'Un microphone correct. Les cours sont interactifs : on vous entend autant que vous écoutez.',
  'Les logiciels de création. La formation ouvre l’accès aux tarifs étudiants d’Adobe et d’Affinity.',
]

export const scheduleColumns: string[] = ['En apprentissage', 'En formation continue']

export const scheduleRows: ScheduleRow[] = [
  {
    day: 'Lundi',
    values: ['En entreprise', 'Activité professionnelle'],
  },
  {
    day: 'Mardi',
    values: ['En entreprise', 'Activité professionnelle'],
  },
  {
    day: 'Mercredi',
    values: ['En entreprise', 'Activité professionnelle'],
  },
  {
    day: 'Jeudi',
    values: [
      'Travail personnel en journée · cours en direct de 18 h à 22 h',
      'Activité professionnelle · cours en direct de 18 h à 22 h',
    ],
  },
  {
    day: 'Vendredi',
    values: [
      'Travail personnel en journée · cours en direct de 18 h à 22 h',
      'Activité professionnelle · cours en direct de 18 h à 22 h',
    ],
  },
  {
    day: 'Week-end',
    values: ['Projet tuteuré et travaux de groupe', 'Travail personnel et travaux de groupe'],
  },
]

// TODO — captures d'écran de DigitalUni et de Classilio à produire (cahier des
// charges § 4.3), en veillant à anonymiser les apprenants visibles.

// TODO — encadré « fuseaux horaires » non intégré : les modalités accordées aux
// apprenants situés hors de France métropolitaine ne sont pas confirmées.

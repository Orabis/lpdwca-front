// Données de la page Licence — à remplacer par un fetch Strapi quand l'API sera prête
// `icon` correspond au modificateur CSS `.icon--<nom>` (voir global.css, section Icônes)

import type { ImageMetadata } from "astro";
import ericPhoto from "@/assets/images/Eric.png";
import marcTrestiniPhoto from "@/assets/images/Marc_Trestini.jpg";

export interface LicencePanelBlock {
  title: string;
  mobileTitle?: string;
  paragraphs?: string[];
  items?: string[];
}

export interface LicencePanel {
  blocks: LicencePanelBlock[];
}

export interface ScientificLead {
  name: string;
  role: string;
  imageSrc: ImageMetadata;
  imageAlt: string;
  // Sans valeur, la carte reste centrée — cas d'un responsable unique.
  align?: "left" | "right";
}

export interface InsertionStats {
  title: string;
  intro: string;
  stats: string[];
  href?: string;
  linkLabel?: string;
}

export interface ProgramDomain {
  icon: string;
  title: string;
  description: string;
  href?: string;
}

export interface CurriculumUe {
  ue: string;
  icon: string;
  title: string;
  lines: string[];
  short?: boolean;
  offset?: "top" | "bottom";
}

export interface Semester {
  label: string;
  gridModifier: string;
  ariaLabel: string;
  ues: CurriculumUe[];
}

export const programDomains: ProgramDomain[] = [
  {
    icon: "command-line",
    title: "Développement Web",
    description:
      "Front-End : HTML/CSS, Javascript, ReactJS et Back-End : PHP/MySQL",
    href: "#curriculum",
  },
  {
    icon: "chat-duo",
    title: "Communication",
    description:
      "Gestion de projet web, Digital marketing, Réseaux sociaux, Droit du multimédia",
    href: "#curriculum",
  },
  {
    icon: "book-open",
    title: "Apprentissages",
    description: "E-learning, jeux sérieux et mondes virtuels Blender, Unity",
    href: "#curriculum",
  },
];

export const semesters: Semester[] = [
  {
    label: "Semestre 1 (210 heures)",
    gridModifier: "semester-1",
    ariaLabel: "Unités d'enseignement du semestre 1",
    ues: [
      {
        ue: "51",
        icon: "paint-brush",
        title:
          "UE 5.1 Conception et réalisation graphiques pour le web et Technologie Web",
        lines: [
          "Création graphique",
          "Relation client/commanditaire",
          "Ergonomie et UX design",
          "Design web",
          "Droit du multimédia (58h)",
        ],
      },
      {
        ue: "52",
        icon: "command-line",
        title: "UE 5.2 Développement Front-End : fondamentaux de la programmation",
        offset: "top",
        lines: [
          "HTML et CSS",
          "Javascript, API et framework",
          "Intégration web",
          "Référencement (38h)",
        ],
      },
      {
        ue: "53",
        icon: "chat-duo",
        title: "UE 5.3 Gestion de projet multimédia et commercialisation",
        lines: [
          "Cahier des charges",
          "Gestion de projet",
          "Marketing digital",
          "Communication publicitaire",
          "Community Management (48h)",
        ],
      },
      {
        ue: "54",
        icon: "chat",
        title: "UE 5.4 Langues",
        lines: [
          "Anglais : Expression écrite et orale",
          "Anglais : Culture des entreprises (16h)",
        ],
      },
      {
        ue: "55",
        icon: "sparkle",
        title: "UE 5.5 Projet Tuteuré, Étape 1",
        short: true,
        lines: ["Préparation et Analyse du projet (50h)"],
      },
    ],
  },
  {
    label: "Semestre 2 (198 heures)",
    gridModifier: "semester-2",
    ariaLabel: "Unités d'enseignement du semestre 2",
    ues: [
      {
        ue: "61",
        icon: "command-line",
        title: "UE 6.1 Développement Back-End",
        lines: ["PHP & Base de données", "CMS", "Sécurité des SI et web (36h)"],
      },
      {
        ue: "62",
        icon: "paint-brush",
        title: "UE 6.2 Design et application 3D immersives",
        offset: "top",
        lines: ["Design 3D", "Développement 3D", "Réalité virtuelle (VR) 30h"],
      },
      {
        ue: "63",
        icon: "command-line",
        title: "UE 6.3 Développement Web : approfondissement",
        lines: [
          "ReactJS, NodeJS",
          "Progressive Web App",
          "Architecture MVC et frameworks (30h)",
        ],
      },
      {
        ue: "64",
        icon: "book-open",
        title:
          "UE 6.4 Interactivité numérique et apprentissage tout au long de la vie",
        lines: [
          "TICE et Apprentissages",
          "Ingénierie des EIAH",
          "Scénarii pédagogiques",
          "Dispositifs de formation pour la FTLV 32h",
        ],
      },
      {
        ue: "65",
        icon: "pencil",
        title: "UE 6.5 Projet Tuteuré, Étape 2",
        offset: "bottom",
        short: true,
        lines: ["Conception du projet (70h)"],
      },
      {
        ue: "66",
        icon: "book-open",
        title: "UE 6.6 Stage ou Apprentissage",
        short: true,
        lines: ["Projet personnel ou professionnel (420h)"],
      },
    ],
  },
];

export const scientificLeads: ScientificLead[] = [
  {
    name: "Éric Christoffel",
    role: "Maître de conférences, laboratoire LISEC, UFR de Physique et ingénierie, Université de Strasbourg",
    imageSrc: ericPhoto,
    imageAlt: "Portrait d'Éric Christoffel",
    align: "left",
  },
  {
    name: "Marc Trestini",
    role: "Professeur des universités en sciences de l’information et de la communication, INSPÉ, Université de Strasbourg.",
    imageSrc: marcTrestiniPhoto,
    imageAlt: "Portrait de Marc Trestini",
    align: "right",
  },
];

export const organisationPanels: LicencePanel[] = [
  {
    blocks: [
      {
        title: "Durée et Calendrier",
        paragraphs: [
          "Notre programme de formation s'étend sur une année complète, d'octobre à septembre.",
          "La prochaine session est prévue du 20 septembre 2024 au 29 août 2025.",
        ],
      },
      {
        title: "Structure et Rythme",
        paragraphs: [
          "Cours synchrones : Les jeudis et vendredis soirs, de 18h à 22h, en interaction directe avec les formateurs.",
          "Apprentissage autonome : Travail personnel et collaboratif sur notre plateforme dédiée DigitalUni.",
          "Pour les apprentis : Immersion professionnelle de 3 jours en entreprise (lundi, mardi, mercredi), complétée par 2 jours de formation (jeudi, vendredi).",
          "Investissement hebdomadaire : Prévoyez 20 à 25 heures de travail personnel en complément des cours synchrones pour une progression optimale.",
        ],
      },
    ],
  },
  {
    blocks: [
      {
        title: "Environnement d'apprentissage",
        paragraphs: [
          "DigitalUni / Classilio : Notre plateforme centrale pour les cours en ligne, les forums interactifs et la soumission des travaux.",
          "Outils collaboratifs : Utilisation de Dropbox pour le partage de fichiers et Discord pour la communication en temps réel.",
        ],
      },
      {
        title: "Équipement recommandé",
        paragraphs: [
          "Matériel informatique : Un ordinateur performant capable de gérer les logiciels de création.",
          "Connectivité : Une connexion internet haut débit et stable pour une participation optimale aux cours en ligne.",
          "Audio : Un microphone de qualité pour des interactions claires lors des classes virtuelles.",
          "Logiciels : La suite Adobe (ou équivalent), avec accès à des tarifs préférentiels pour étudiants.",
        ],
      },
    ],
  },
];

export const afterGraduationPanels: LicencePanel[] = [
  {
    blocks: [
      {
        title: "Poursuite d'études",
        paragraphs: [
          "Les diplômés ont la possibilité de poursuivre leur cursus académique en Master, notamment :",
        ],
        items: [
          "Master SYNVA (Université de Strasbourg) : Formation en ingénierie des systèmes numériques virtuels pour l'apprentissage. Ce programme se concentre sur la conception de solutions éducatives innovantes utilisant les technologies numériques.",
          "Master VCiel (Université de Lyon, enseignement à distance) : Cursus approfondi en développement, graphisme et gestion de projet. Cette formation offre une flexibilité adaptée aux professionnels en activité.",
        ],
      },
    ],
  },
  {
    blocks: [
      {
        title: "Débouchés",
        mobileTitle: "Insertion professionnelle",
        paragraphs: [
          "Cette formation universitaire prépare les étudiants à diverses carrières dans le domaine du numérique et des technologies de l'information :",
        ],
        items: [
          "Développeur web (Front-End, Back-End, Full-Stack) : Conception et réalisation d'applications web",
          "Intégrateur web : Mise en œuvre technique de l'interface utilisateur",
          "Webmaster : Gestion et maintenance de sites web",
          "Web designer / UX Designer : Conception d'interfaces et d'expériences utilisateur",
          "Chef de projet digital : Coordination et gestion de projets numériques",
          "Community Manager : Gestion de la présence en ligne et de la communication digitale",
          "Concepteur e-learning : Élaboration de dispositifs de formation en ligne",
        ],
      },
    ],
  },
];

export const insertionStats: InsertionStats = {
  title: "Données statistiques sur l'insertion professionnelle",
  intro:
    "Les enquêtes menées auprès de nos anciens étudiants par l'ORESIPE révèlent les indicateurs suivants :",
  stats: [
    "Taux d'insertion professionnelle : 67 % à 18 mois post-diplôme, atteignant 100 % à 30 mois",
    "Délai moyen d'obtention du premier emploi : 3,6 mois",
    "Rémunération : Le salaire net mensuel médian s'élève à 1550 € à 18 mois et progresse à 1942 € à 30 mois post-diplôme",
  ],
  href: "https://formations.unistra.fr/fr/formations/licence-professionnelle-LIP/licence-professionnelle-metiers-de-l-informatique-conception-developpement-et-test-de-logiciels-ME157/developpement-web-communication-et-apprentissages-ead-sfc-PR828.html",
  linkLabel: "Consulter la fiche officielle du diplôme",
};

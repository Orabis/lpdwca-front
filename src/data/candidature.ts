// Données de la page Candidature — à remplacer par un fetch Strapi quand l'API sera prête
//
// `icon` correspond au modificateur CSS `.icon--<nom>` (voir styles/icons.css).

export interface EligibilityPanel {
  title: string
  text: string
}

export interface Step {
  title: string
  text: string
  duration?: string
}

export interface FaqEntry {
  question: string
  answer: string
}

export interface FaqTheme {
  id: string
  title: string
  items: FaqEntry[]
}

export const eligibilityPanels: EligibilityPanel[] = [
  {
    title: 'Vous avez un Bac+2',
    text: 'C’est le cas standard. Les titulaires d’un Bac+2 en informatique — BTS SIO, BUT MMI, DUT informatique — sont les mieux préparés au programme. Les filières graphiques et artistiques sont également valorisées. Venu d’une autre filière, votre dossier est examiné sur la base de vos compétences réelles.',
  },
  {
    title: 'Vous n’avez pas de Bac+2',
    text: 'La licence reste accessible par la validation des acquis professionnels et personnels : ce sont vos compétences, acquises en autodidacte ou en situation professionnelle, qui sont examinées à la place du diplôme. Un portfolio et des réalisations en production comptent davantage qu’un intitulé.',
  },
]

export const eligibilityNotes: EligibilityPanel[] = [
  {
    title: 'En formation continue',
    text: 'Ouverte aux salariés, aux demandeurs d’emploi, aux travailleurs indépendants et aux personnes en reprise d’études après une interruption de plus de deux ans.',
  },
  {
    title: 'En apprentissage',
    text: 'S’adresse aux candidats de moins de 30 ans à la signature du contrat. Aucune limite d’âge ne s’applique aux personnes en situation de handicap reconnue.',
  },
]

export const steps: Step[] = [
  {
    title: 'Créer votre compte eCandidat',
    text: 'Rendez-vous sur la plateforme eCandidat de l’Université de Strasbourg et créez un compte. Vous recevrez un identifiant par e-mail : conservez-le, c’est avec lui que vous suivrez votre dossier.',
    duration: '15 minutes',
  },
  {
    title: 'Constituer votre dossier',
    text: 'Renseignez votre parcours et déposez les pièces demandées, listées plus bas. Prenez le temps de la lettre de motivation et du portfolio : ce sont les deux éléments qui font la différence.',
    duration: '1 à 2 heures',
  },
  {
    title: 'Chercher une entreprise, si vous visez l’apprentissage',
    text: 'Commencez sans attendre le résultat de la candidature. La licence relaie les offres qu’elle reçoit et fait profiter les candidats de son réseau. Un délai de deux mois après le début des cours est accordé pour signer le contrat.',
    duration: 'À commencer tout de suite',
  },
  {
    title: 'Monter votre financement, si vous visez la formation continue',
    text: 'Identifiez le dispositif qui vous concerne et déposez votre dossier. Certaines démarches prennent plusieurs mois : ne les commencez pas après l’admission.',
    duration: 'Compter 2 à 4 mois',
  },
  {
    title: 'Admission et inscription',
    text: 'L’équipe pédagogique examine les dossiers et vous informe de sa décision via eCandidat. En cas d’admission, il reste à finaliser l’inscription administrative auprès de l’Université.',
  },
]

// TODO — liste à faire valider par la scolarité avant publication.
export const documents: string[] = [
  'Un curriculum vitae à jour',
  'Une lettre de motivation — dites pourquoi cette licence, et ce que vous voulez en faire',
  'L’adresse de votre portfolio en ligne : travaux de création, sites développés, projets menés',
  'Vos relevés de notes et diplômes depuis le baccalauréat',
  'Une pièce d’identité en cours de validité',
  'Pour une validation des acquis : un descriptif détaillé de votre expérience professionnelle et de vos réalisations',
]

export const faqThemes: FaqTheme[] = [
  {
    id: 'faq-admission',
    title: 'Admission et prérequis',
    items: [
      {
        question: 'Puis-je m’inscrire au milieu de l’année ?',
        answer:
          'Non. La promotion démarre à la rentrée universitaire et suit un calendrier unique jusqu’à l’été suivant. Les candidatures s’ouvrent au printemps précédent, sur eCandidat.',
      },
      {
        question: 'Quelles sont les conditions d’admission ?',
        answer:
          'La licence s’adresse aux titulaires d’un Bac+2. Les profils informatiques, graphiques ou artistiques sont les plus à l’aise, mais les candidatures venues d’autres filières sont examinées sur la base des compétences acquises, personnellement ou professionnellement.',
      },
      {
        question: 'Je n’ai pas de Bac+2. Puis-je quand même candidater ?',
        answer:
          'Oui, par la validation des acquis professionnels et personnels. Votre expérience et vos réalisations sont alors examinées à la place du diplôme manquant.',
      },
      {
        question: 'Quels sont les prérequis techniques ?',
        answer:
          'Des bases en informatique ou en création graphique. Vous n’avez pas besoin d’être développeur confirmé : chaque module reprend les fondamentaux avant d’approfondir.',
      },
      {
        question: 'Combien de personnes sont admises chaque année ?',
        answer:
          'Une quinzaine, avec un équilibre entre apprentissage et formation continue. Cet effectif réduit est un choix : il permet un suivi individuel et des travaux en petits groupes.',
      },
    ],
  },
  {
    id: 'faq-organisation',
    title: 'Organisation et rythme',
    items: [
      {
        question: 'Les cours se suivent-ils à son propre rythme, ou à dates fixes ?',
        answer:
          'Les deux. Les classes virtuelles sont synchrones, les jeudi et vendredi de 18 h à 22 h : votre présence y est attendue. Le travail personnel s’organise librement.',
      },
      {
        question: 'Quelle charge de travail faut-il prévoir ?',
        answer:
          '20 à 25 heures de travail personnel par semaine en plus des cours. La formation est exigeante, et plusieurs situations problèmes se déroulent souvent en parallèle.',
      },
      {
        question: 'Quel accompagnement puis-je attendre des enseignants ?',
        answer:
          'Les cours en direct se font en petit groupe. Entre deux séances, le suivi passe par DigitalUni et Discord. Chaque projet tuteuré est encadré par un enseignant tuteur.',
      },
      {
        question: 'Puis-je télécharger les supports de cours ?',
        answer:
          'Pour l’essentiel, oui. Les cours, vidéo-cours et exercices déposés sur DigitalUni restent accessibles toute l’année, et les classes virtuelles sont enregistrées.',
      },
      {
        question: 'Y a-t-il un examen final ?',
        answer:
          'Non. L’évaluation se fait en contrôle continu intégral, sur des études de cas et des situations professionnelles, individuelles ou en équipe.',
      },
    ],
  },
  {
    id: 'faq-financement',
    title: 'Financement',
    items: [
      {
        question: 'Combien coûte la formation ?',
        answer:
          'La formation continue est facturée 5 720 € pour l’année 2026-2027. En apprentissage, elle ne vous coûte rien : elle est prise en charge par l’opérateur de compétences de l’entreprise, via le CFAU.',
      },
      {
        question: 'Quels dispositifs peuvent financer la formation continue ?',
        answer:
          'L’entreprise, votre OPCO, France Travail, la région, le CPF ou Transition Pro selon votre situation. Le détail figure sur la page Financement.',
      },
      {
        question: 'Le paiement peut-il être échelonné ?',
        answer:
          'Oui, sur l’année de formation. Les modalités se conviennent avec le Service Formation Continue au moment de l’inscription.',
      },
    ],
  },
  {
    id: 'faq-apprentissage',
    title: 'Apprentissage et entreprise',
    items: [
      {
        question: 'Je n’ai pas encore d’entreprise. Est-ce bloquant ?',
        answer:
          'Non. La licence relaie les offres qu’elle reçoit et fait profiter les candidats de son réseau. Un délai de deux mois après le début des cours est accordé pour signer un contrat.',
      },
      {
        question: 'L’entreprise doit-elle être à Strasbourg ?',
        answer:
          'Non. Elle peut se situer partout en France, ou en zone transfrontalière. Comme les cours sont à distance, l’apprenti ne s’absente jamais pour se déplacer.',
      },
      {
        question: 'Quel est le rythme de l’alternance ?',
        answer:
          'Trois jours en entreprise du lundi au mercredi, deux jours consacrés à la formation le jeudi et le vendredi. Ce rythme ne change pas d’une semaine à l’autre.',
      },
      {
        question: 'Comment l’apprenti est-il suivi ?',
        answer:
          'Un plan de formation est établi en début de contrat par le maître d’apprentissage et validé par l’enseignant tuteur. Deux points formels réunissent ensuite l’apprenti, l’entreprise et le tuteur.',
      },
    ],
  },
]

// TODO — question « La licence est-elle éligible au CPF ? » retirée de la FAQ
// financement : l'éligibilité et le code CPF ne sont pas confirmés. À rétablir
// une fois l'information obtenue auprès de la SFC.

// TODO — bloc « Le calendrier » non intégré : aucune date de session, d'ouverture
// ou de clôture des candidatures n'est confirmée. Voir document 09, bloc 05.

// TODO — bloc « Recevoir la brochure » non intégré : la plaquette PDF n'existe
// pas encore. Le CTA correspondant est également absent du hero de la page
// d'accueil et du pied de page tant que le document n'est pas produit.

// TODO — le CTA « Candidater sur eCandidat » attend l'URL exacte de la plateforme
// pour cette formation.

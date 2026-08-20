// Données de la page Alumni — à remplacer par un fetch Strapi quand l'API sera prête
//
// Les trois témoignages ci-dessous sont ceux publiés par la formation sur
// lpdwca1.eformation-webmaster.net, remis en paragraphes. Ils doivent être
// soumis à la personne concernée avant publication définitive.

export interface AlumniFilter {
  key: string
  label: string
}

export interface Alumnus {
  anchorId: string
  name: string
  context: string
  track: string
  trackKey: string
  background: string
  shortQuote: string
  quote: string[]
}

export const alumniFilters: AlumniFilter[] = [
  { key: 'all', label: 'Tous les parcours' },
  { key: 'apprentissage', label: 'Formation initiale en apprentissage' },
  { key: 'continue', label: 'Formation continue et reconversion' },
]

export const alumni: Alumnus[] = [
  {
    anchorId: 'daigremont',
    name: 'Arthur Daigremont',
    context: '21 ans à l’époque · promotion 2021-2022',
    track: 'Formation initiale en apprentissage',
    trackKey: 'apprentissage',
    background: 'DUT MMI',
    shortQuote: '« Chaque module part des bases avant d’approfondir »',
    quote: [
      'Je me suis orienté dans le domaine du multimédia en 2019 en intégrant un DUT MMI. J’ai ensuite rejoint la LP DWCA, continuité parfaite de la formation MMI en termes de programme, car je recherchais une formation pluridisciplinaire qui me permettrait d’être le plus polyvalent possible.',
      'La LP DWCA propose de nombreux enseignements différents, en présentant pour chaque module les bases du domaine de compétences étudié, avant d’approfondir le sujet, de sorte à offrir à chacun les mêmes possibilités de réussite, quel que soit le parcours d’origine.',
      'Les enseignants sont à l’écoute et proposent un suivi approprié à chacun, notamment grâce à la petite taille des promotions — une quinzaine d’apprenants. La pédagogie par projets offre une mise en contexte professionnelle permanente.',
      'Je suis complètement satisfait de cette année, et je ressors de cette licence avec de nouvelles compétences qui m’ont d’ores et déjà aidé lors de mon alternance en entreprise.',
    ],
  },
  {
    anchorId: 'kauffmann',
    name: 'Laura Kauffmann',
    context: '27 ans à l’époque · promotion 2021-2022',
    track: 'Formation continue — reconversion',
    trackKey: 'continue',
    background: 'Reconversion vers le développement et le design',
    shortQuote: '« J’ai pu rapidement me lancer dans le métier »',
    quote: [
      'J’ai décidé de me reconvertir pour devenir développeuse web, designer, et travailler dans le marketing et la communication.',
      'Je suis fière d’avoir obtenu un diplôme RNCP avec une formation 100 % à distance et de qualité. J’ai beaucoup appris durant cette formation et, grâce à cela, j’ai pu rapidement me lancer dans le métier.',
      'Je suis devenue freelance et je propose mes services de création de sites internet et de design graphique. Je travaille également pour une société, dans le secteur du marketing digital et de la communication.',
      'La LP DWCA m’a donné les clés nécessaires pour réussir et continuer à progresser dans chaque domaine. Elle m’encourage à approfondir mon apprentissage, notamment dans la réalité virtuelle.',
    ],
  },
  {
    anchorId: 'stoessel',
    name: 'Audrey Stoessel',
    context: '40 ans à l’époque · promotion 2021-2022',
    track: 'Formation continue — reconversion',
    trackKey: 'continue',
    background: 'Ingénierie en génétique et biologie moléculaire',
    shortQuote: '« J’ai voulu compléter mon cursus par un vrai diplôme »',
    quote: [
      'Forte d’un début de carrière dans le domaine de l’ingénierie en génétique et biologie moléculaire, j’ai souhaité développer de nouvelles connaissances et compétences, et effectuer une reconversion professionnelle.',
      'Après avoir réalisé un bilan de compétences, j’ai choisi de m’orienter vers le domaine du développement web. C’est ainsi que j’ai effectué en 2021 un DU de Développeur Web Fullstack, qui m’a permis de me découvrir une passion pour ce domaine.',
      'C’est pourquoi j’ai voulu compléter mon cursus par l’obtention de la Licence Professionnelle DWCA.',
    ],
  },
]

// TODO — bloc « Que sont-ils devenus » non intégré : deux séries de chiffres
// d'insertion incompatibles circulent dans le projet (97 % / 85 % de CDI côté
// cahier des charges, 67 % à 18 mois côté enquête ORESIPE reprise dans
// licence.ts). À arbitrer, dater et sourcer avant affichage. Les valeurs
// devront être identiques à celles de la page Licence.

// TODO — trois témoignages restent à recueillir pour équilibrer la page :
//   1. un profil autodidacte venu chercher un diplôme (persona Sam) ;
//   2. un profil éloigné géographiquement (zone rurale, outre-mer, étranger) ;
//   3. un diplômé d'une promotion récente (2023-2024 ou 2024-2025).
// Trame d'entretien et format attendu : document 08, bloc 06.

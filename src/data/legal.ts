// Données de la page Mentions légales — à remplacer par un fetch Strapi quand l'API sera prête.
//
// AVERTISSEMENT — Cette page est structurée mais légalement INCOMPLÈTE.
// Les mentions obligatoires manquantes (directeur de la publication, SIRET,
// numéro de déclaration d'activité, hébergeur, coordonnées du délégué à la
// protection des données, durée de conservation, indicateurs de résultats)
// ne sont pas connues et ne sont donc pas affichées plutôt qu'inventées.
// La page ne doit pas être mise en ligne avant relecture par le service
// juridique de l'Université et par le délégué à la protection des données.

export interface LegalSection {
  id: string
  title: string
  paragraphs?: string[]
  definitions?: { term: string; value: string }[]
  items?: string[]
  links?: { label: string; href: string; external?: boolean }[]
}

export const legalSections: LegalSection[] = [
  {
    id: 'references',
    title: 'Références de la formation',
    paragraphs: [
      'Les informations ci-dessous proviennent du catalogue officiel des formations de l’Université de Strasbourg, édition 2026-2027, et de la fiche France Compétences correspondante. Elles sont destinées aux conseillers en évolution professionnelle, aux financeurs et aux organismes de contrôle.',
    ],
    definitions: [
      {
        term: 'Intitulé officiel',
        value:
          'Licence professionnelle Métiers de l’informatique : conception, développement et test de logiciels — parcours Développement web, communication et apprentissages (EAD)',
      },
      { term: 'Code RNCP', value: 'RNCP40319 — niveau 6 (Bac+3)' },
      { term: 'Enregistrement au RNCP', value: 'Jusqu’au 31 décembre 2029' },
      { term: 'Crédits ECTS', value: '60 crédits' },
      { term: 'Volume horaire', value: '408 heures, sur une année universitaire' },
      { term: 'Numéro de diplôme', value: '20180879' },
      { term: 'Niveau d’entrée', value: 'Bac+2, ou validation des acquis personnels et professionnels (VAPP)' },
      { term: 'Modalité', value: 'Entièrement à distance (EAD)' },
      {
        term: 'Régimes d’études',
        value:
          'Contrat d’apprentissage · Contrat de professionnalisation · Formation initiale · Formation continue',
      },
      { term: 'Composante', value: 'Institut national supérieur du professorat et de l’éducation (INSPÉ)' },
      { term: 'Établissement partenaire', value: 'Service Formation Continue de l’Université de Strasbourg (SFC)' },
      { term: 'CFA partenaire', value: 'CFAU — Centre de Formation des Apprentis Universitaires' },
      { term: 'Coût en formation continue', value: '5 720 € pour l’année universitaire 2026-2027' },
      { term: 'Éligibilité CPF', value: 'Formation éligible au compte personnel de formation' },
    ],
    links: [
      {
        label: 'Fiche officielle du diplôme — catalogue Unistra 2026-2027',
        href: 'https://formations.unistra.fr/fr/formations/licence-professionnelle-LIP/licence-professionnelle-metiers-de-l-informatique-conception-developpement-et-test-de-logiciels-ME157/developpement-web-communication-et-apprentissages-ead-sfc-PR828.html',
        external: true,
      },
      {
        label: 'Fiche RNCP40319 — France Compétences',
        href: 'https://www.francecompetences.fr/recherche/rncp/40319/',
        external: true,
      },
      {
        label: 'Page de la formation — Service Formation Continue',
        href: 'https://sfc.unistra.fr/developpement-web-communication-et-apprentissages2/',
        external: true,
      },
    ],
    // TODO — le code CPF exact reste à renseigner : il ne figure ni sur la fiche
    // du catalogue Unistra ni sur la page SFC. L'éligibilité, elle, est confirmée.
  },
  {
    id: 'editeur',
    title: 'Éditeur du site',
    definitions: [
      { term: 'Raison sociale', value: 'Université de Strasbourg — Service Formation Continue' },
      {
        term: 'Statut juridique',
        value: 'Établissement public à caractère scientifique, culturel et professionnel',
      },
      {
        term: 'Responsable éditorial',
        value: 'Éric Christoffel, responsable scientifique de la licence professionnelle DWCA',
      },
    ],
    // TODO — à compléter : directeur de la publication, adresse postale, téléphone,
    // adresse e-mail de contact, numéro SIRET, numéro de déclaration d'activité
    // de formation.
  },
  {
    id: 'propriete',
    title: 'Propriété intellectuelle',
    paragraphs: [
      'L’ensemble des contenus de ce site — textes, images, éléments graphiques, logo et code — est protégé par le droit d’auteur. Sauf mention contraire, ils sont la propriété de l’Université de Strasbourg.',
      'Toute reproduction ou représentation, totale ou partielle, à d’autres fins que la consultation individuelle et privée, est soumise à autorisation préalable.',
      'Les témoignages publiés sur ce site le sont avec l’accord de leurs auteurs. Les portraits sont diffusés avec l’autorisation des personnes photographiées.',
    ],
  },
  {
    id: 'donnees',
    title: 'Vos données personnelles',
    paragraphs: [
      'L’Université de Strasbourg est responsable du traitement des données collectées sur ce site.',
      'Le formulaire de contact collecte vos nom, prénom, adresse e-mail, numéro de téléphone si vous le renseignez, ainsi que l’objet et le contenu de votre message.',
      'Ces données servent uniquement à répondre à votre demande et, le cas échéant, à vous informer des sessions d’information de la licence. Elles sont traitées par l’équipe pédagogique et le Service Formation Continue de l’Université de Strasbourg. Elles ne sont ni vendues, ni transmises à des tiers.',
      'Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation et d’opposition sur les données qui vous concernent, ainsi que d’un droit à la portabilité. Vous pouvez également introduire une réclamation auprès de la CNIL.',
    ],
    // TODO — à compléter : base légale du traitement, durée de conservation,
    // coordonnées du délégué à la protection des données de l'Université.
  },
  {
    id: 'cookies',
    title: 'Cookies et mesure d’audience',
    paragraphs: [
      'Seuls les cookies strictement nécessaires au fonctionnement du site peuvent être déposés. Ils ne nécessitent pas votre consentement.',
    ],
    // TODO — arbitrage en attente : un outil de mesure d'audience sera-t-il
    // installé ? Si oui, ajouter le paragraphe correspondant et préciser si
    // l'outil est exempté de consentement. Si non, l'affirmer explicitement
    // (« ce site ne dépose aucun cookie de mesure d'audience ») : c'est un
    // argument, pas une lacune.
  },
  {
    id: 'accessibilite',
    title: 'Accessibilité numérique',
    paragraphs: [
      'L’Université de Strasbourg s’engage à rendre ce site accessible conformément au référentiel général d’amélioration de l’accessibilité.',
      'Vous rencontrez une difficulté pour accéder à un contenu de ce site ? Signalez-le à l’équipe pédagogique : nous vous répondrons et vous indiquerons comment obtenir l’information autrement. Si le problème persiste, vous pouvez saisir le Défenseur des droits.',
      'Le format 100 % à distance de la licence supprime toute contrainte de mobilité. La formation est ouverte sans limite d’âge aux personnes en situation de handicap reconnue pour l’apprentissage.',
    ],
    // TODO — à compléter après audit : état de conformité (totalement,
    // partiellement ou non conforme), taux de conformité au RGAA, date et
    // organisme de l'audit, liste des contenus non accessibles, nom du référent
    // handicap de la formation. Ne pas déclarer une conformité non mesurée.
  },
  {
    id: 'credits',
    title: 'Crédits',
    paragraphs: [
      'Site statique développé avec Astro, contenus gérés dans un CMS headless. Les technologies employées sont celles enseignées dans la formation.',
    ],
    // TODO — à compléter : crédits photographiques, et mention de l'équipe
    // projet ayant réalisé le site.
  },
]

// TODO — section « Hébergement » non intégrée : l'hébergeur n'est pas arrêté.
// Mention obligatoire dès la mise en ligne (nom, adresse, pays d'hébergement).

// TODO — section « Nos résultats » non intégrée : la publication des indicateurs
// de résultats est une exigence de la certification qualité. Les valeurs doivent
// être identiques à celles affichées sur la page Licence — deux séries de
// chiffres incompatibles circulent aujourd'hui dans le projet.

// Données de la page Financement — à remplacer par un fetch Strapi quand l'API sera prête

export interface FundingColumn {
  title: string;
  items: string[];
}

export const fundingColumns: FundingColumn[] = [
  {
    title: "Pour les demandeurs d'emploi",
    items: ["Pôle Emploi", "Votre région", "L'État"],
  },
  {
    title: "Pour les salariés",
    items: ["Financement possible par l'entreprise", "OPCO", "CPF"],
  },
];

export const extraOptions: string[] = [
  "Financement personnel",
  "Possibilité de paiement échelonné sur l'année de formation",
];

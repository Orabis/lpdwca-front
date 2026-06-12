// Données de la page d'accueil — à remplacer par un fetch Strapi quand l'API sera prête

export interface Advantage {
  id: number;
  number: string;
  title: string;
  description: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  quote: string;
  href?: string;
  avatarSrc?: string;
  avatarAlt?: string;
}

export const advantages: Advantage[] = [
  {
    id: 1,
    number: "01",
    title: "Horaire d'apprentissage flexible",
    description:
      "Adaptez vos cours à vos engagements et obligations existants.",
  },
  {
    id: 2,
    number: "02",
    title: "Enseignement par des experts",
    description:
      "Apprenez auprès d'experts du secteur qui possèdent une expérience pratique dans le développement.",
  },
  {
    id: 3,
    number: "03",
    title: "Formations variées",
    description:
      "Découvrez un large éventail de cours de conception et de développement.",
  },
  {
    id: 4,
    number: "04",
    title: "Programme d'études mis à jour",
    description:
      "Accédez à des cours dont le contenu est actualisé et reflète les dernières tendances du secteur.",
  },
  {
    id: 5,
    number: "05",
    title: "Projets pratiques et devoirs",
    description:
      "Créez un portfolio présentant vos compétences et vos aptitudes à des employeurs potentiels.",
  },
  {
    id: 6,
    number: "06",
    title: "Interactive Learning Environment",
    description:
      "Collaborez avec d'autres apprenants, échangez des idées pour améliorer votre compréhension.",
  },
];

export const courses: Course[] = [
  {
    id: 1,
    title: "Principes fondamentaux de la conception Web",
    description:
      "Apprenez les bases de la conception web, notamment le HTML, le CSS et les principes du responsive design. Développez les compétences nécessaires pour créer des sites web visuellement attrayants et conviviaux.",
    href: "/licence",
  },
  {
    id: 2,
    title: "Conception UI/UX",
    description:
      "Maîtrisez l'art de créer des interfaces utilisateur intuitives et d'améliorer l'expérience utilisateur. Découvrez les principes de conception, la création de maquettes fonctionnelles et le prototypage.",
    href: "/licence",
  },
  {
    id: 3,
    title: "Développement d'applications mobiles",
    description:
      "Plongez dans l'univers du développement d'applications mobiles. Apprenez à créer des applications natives pour iOS et Android à l'aide de langages de programmation de pointe.",
    href: "/licence",
  },
  {
    id: 4,
    title: "Conception graphique sur Affinity et Adobe",
    description:
      "Découvrez les bases du graphisme, notamment la typographie, la théorie des couleurs, la mise en page et les techniques de manipulation d'images pour les supports numériques.",
    href: "/licence",
  },
  {
    id: 5,
    title: "Développement web front-end",
    description:
      "Maîtrisez le développement web front-end. Apprenez le HTML, le CSS, le JavaScript, Bootstrap et React. Créez des sites web interactifs et réactifs.",
    href: "/licence",
  },
  {
    id: 6,
    title: "JavaScript avancé",
    description:
      "Améliorez vos compétences en JavaScript. Explorez des concepts avancés tels que les fermetures, les prototypes, la programmation asynchrone et les fonctionnalités ES6.",
    href: "/licence",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah L",
    quote:
      "Le cours de conception web m'a permis d'acquérir des bases solides. Les formateurs étaient compétents et encourageants, et l'environnement d'apprentissage interactif était stimulant. Je le recommande vivement !",
    avatarSrc: "/assets/testimonials/sarah-l.png",
    avatarAlt: "Portrait de Sarah L",
  },
  {
    id: 2,
    name: "Jason M",
    quote:
      "Le cours de conception UI/UX a dépassé mes attentes. L'expertise du formateur et les exercices pratiques m'ont aidé à améliorer mes compétences en conception. Je me sens désormais plus confiant dans ma carrière. Merci !",
    avatarSrc: "/assets/testimonials/jason-m.png",
    avatarAlt: "Portrait de Jason M",
  },
  {
    id: 3,
    name: "Emily R",
    quote:
      "Le cours sur le développement d'applications mobiles était fantastique ! Les unités d'enseignement étape par étape et les projets pratiques m'ont aidé à comprendre facilement les concepts. Je suis maintenant en train de créer ma propre application. Excellent cours !",
    avatarSrc: "/assets/testimonials/emily-r.png",
    avatarAlt: "Portrait d'Emily R",
  },
  {
    id: 4,
    name: "Michael K",
    quote:
      "J'ai assisté au cours de conception graphique sur Figma en tant que débutant, et cela a été un excellent point de départ. Les conseils et les commentaires du professeur m'ont permis d'améliorer considérablement mes compétences en conception. Je suis très reconnaissant d'avoir suivi ces cours !",
    avatarSrc: "/assets/testimonials/michael-k.png",
    avatarAlt: "Portrait de Michael K",
  },
];

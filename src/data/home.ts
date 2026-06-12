// Données de la page d'accueil — à remplacer par un fetch Strapi quand l'API sera prête

import webDesignImage from "@/assets/images/home/courses/web-design.png";
import uiUxImage from "@/assets/images/home/courses/ui-ux.png";
import mobileImage from "@/assets/images/home/courses/mobile.png";
import graphicDesignImage from "@/assets/images/home/courses/graphic-design.png";
import frontEndImage from "@/assets/images/home/courses/front-end.png";
import javascriptImage from "@/assets/images/home/courses/javascript.png";
import sarahAvatar from "@/assets/images/home/testimonials/sarah.png";
import jasonAvatar from "@/assets/images/home/testimonials/jason.png";
import emilyAvatar from "@/assets/images/home/testimonials/emily.png";
import michaelAvatar from "@/assets/images/home/testimonials/michael.png";

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

export interface FaqItem {
  question: string;
  answer: string;
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
      "Apprenez les bases de la conception web, notamment le langage HTML, le CSS et les principes du responsive design. Développez les compétences nécessaires pour créer des sites web visuellement attrayants et conviviaux.",
    href: "/licence/",
    imageSrc: webDesignImage.src,
    imageAlt: "Conception d'interfaces sur tableau et maquettes papier",
  },
  {
    id: 2,
    title: "Conception UI/UX",
    description:
      "Maîtrisez l'art de créer des interfaces utilisateur intuitives (UI) et d'améliorer l'expérience utilisateur (UX). Apprenez les principes de conception, le wireframing, le prototypage et les techniques de test d'utilisabilité.",
    href: "/licence/",
    imageSrc: uiUxImage.src,
    imageAlt: "Poste de travail dédié à la conception UI/UX",
  },
  {
    id: 3,
    title: "Développement d'applications mobiles",
    description:
      "Plongez dans l'univers du développement d'applications mobiles. Apprenez à créer des applications.",
    href: "/licence/",
    imageSrc: mobileImage.src,
    imageAlt: "Téléphone et carnet de notes pour la conception mobile",
  },
  {
    id: 4,
    title: "Conception graphique sur affinity et adobe",
    description:
      "Découvrez les principes fondamentaux du graphisme, notamment la typographie, la théorie des couleurs, la conception de mises en page et les techniques de manipulation d'images.",
    href: "/licence/",
    imageSrc: graphicDesignImage.src,
    imageAlt: "Palette de couleurs et matériel de conception graphique",
  },
  {
    id: 5,
    title: "Développement web front-end",
    description:
      "Maîtrisez le développement web front-end. Apprenez le HTML, le CSS, le JavaScript et les frameworks populaires tels que Bootstrap et React. Créez des sites web interactifs et réactifs.",
    href: "/licence/",
    imageSrc: frontEndImage.src,
    imageAlt: "Développement front-end sur ordinateur portable",
  },
  {
    id: 6,
    title: "JavaScript avancé",
    description:
      "Améliorez vos compétences en JavaScript. Explorez des concepts avancés tels que les fermetures, les prototypes, la programmation asynchrone et les fonctionnalités ES6. Créez des applications complexes en toute confiance.",
    href: "/licence/",
    imageSrc: javascriptImage.src,
    imageAlt: "Apprentissage avancé du JavaScript",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah L",
    quote:
      "Le cours de conception web m'a permis d'acquérir des bases solides. Les formateurs étaient compétents et encourageants, et l'environnement d'apprentissage interactif était stimulant. Je le recommande vivement !",
    href: "/licence/",
    avatarSrc: sarahAvatar.src,
    avatarAlt: "Portrait de Sarah L",
  },
  {
    id: 2,
    name: "Jason M",
    quote:
      "Le cours de conception UI/UX a dépassé mes attentes. L'expertise du formateur et les exercices pratiques m'ont aidé à améliorer mes compétences en conception. Je me sens désormais plus confiant dans ma carrière. Merci !",
    href: "/licence/",
    avatarSrc: jasonAvatar.src,
    avatarAlt: "Portrait de Jason M",
  },
  {
    id: 3,
    name: "Emily R",
    quote:
      "Le cours sur le développement d'applications mobiles était fantastique ! Les unités d'enseignement étape par étape et les projets pratiques m'ont aidé à comprendre facilement les concepts. Je suis maintenant en train de créer ma propre application. Excellent cours !",
    href: "/licence/",
    avatarSrc: emilyAvatar.src,
    avatarAlt: "Portrait d'Emily R",
  },
  {
    id: 4,
    name: "Michael K",
    quote:
      "J'ai assisté au cours de conception graphique sur Figma en tant que débutant, et cela a été un excellent point de départ. Les conseils et les commentaires du professeur m'ont permis d'améliorer considérablement mes compétences en conception. Je suis très reconnaissant d'avoir suivi ces cours !",
    href: "/licence/",
    avatarSrc: michaelAvatar.src,
    avatarAlt: "Portrait de Michael K",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Puis-je m'inscrire au milieu de l'année ?",
    answer:
      "Vous ne pouvez vous inscrire en milieu de l'année, la formation débute en septembre.",
  },
  {
    question: "Quel sont les conditions d'admission ?",
    answer:
      "Les conditions exactes dépendent de votre situation. Le dossier de candidature, le niveau d'études et le projet professionnel sont examinés avant admission.",
  },
  {
    question: "Quel type de soutien puis-je attendre des instructeurs ?",
    answer:
      "Les intervenants assurent un suivi pédagogique, des retours réguliers sur les travaux et un accompagnement tout au long de la formation.",
  },
  {
    question:
      "Les cours sont-ils à suivre à son propre rythme ou ont-ils des dates de début et de fin spécifiques ?",
    answer:
      "Le rythme combine des temps synchrones et du travail personnel. Certaines activités s'inscrivent dans un calendrier précis pendant l'année universitaire.",
  },
  {
    question: "Quels sont les prérogatives d'inscription en lpdwca ?",
    answer:
      "L'inscription dépend de l'adéquation entre votre parcours, les attendus de la licence et votre projet professionnel.",
  },
  {
    question:
      "Puis-je télécharger les supports de cours pour y accéder hors ligne ?",
    answer:
      "Cela dépend des ressources mises à disposition par les intervenants. Une partie des supports peut être consultée ou téléchargée selon les modules.",
  },
];

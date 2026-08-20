import { fetchSingle, fetchCollection, getImageUrl } from './strapi'
import snapshot from '@/data/strapi-snapshot.json'
import type { Advantage, Course, Testimonial, FaqItem } from '@/data/home'
import webDesignImage from '@/assets/images/home/courses/web-design.png'
import uiUxImage from '@/assets/images/home/courses/ui-ux.png'
import mobileImage from '@/assets/images/home/courses/mobile.png'
import graphicDesignImage from '@/assets/images/home/courses/graphic-design.png'
import frontEndImage from '@/assets/images/home/courses/front-end.png'
import javascriptImage from '@/assets/images/home/courses/javascript.png'

// TODO — visuels encore portes par le depot front. A televerser dans Strapi
// pour que l'equipe puisse les changer sans passer par le code.
const COURSE_IMAGES = [
  webDesignImage.src,
  uiUxImage.src,
  mobileImage.src,
  graphicDesignImage.src,
  frontEndImage.src,
  javascriptImage.src,
]

/**
 * Contenu de la page d'accueil.
 *
 * Les témoignages et les questions fréquentes viennent de leurs propres
 * collections : ils sont partagés avec les pages Alumni et Candidature, et ne
 * doivent être saisis qu'une fois.
 */
export interface SectionHeader {
  title: string
  intro?: string
  actionLabel?: string
  actionHref?: string
}

export interface Hero {
  accentWord?: string
  title: string
  text?: string
  subtext?: string
  ctaPrimaryLabel?: string
  ctaPrimaryHref?: string
  ctaSecondaryLabel?: string
  ctaSecondaryHref?: string
  image?: { url?: string }
  imageAlt?: string
  logosAlt?: string
}

export interface HomeContent {
  hero: Hero
  partnersTitle?: string
  advantagesHeader: SectionHeader
  advantages: Advantage[]
  articlesHeader: SectionHeader
  coursesHeader: SectionHeader
  courses: Course[]
  testimonialsHeader: SectionHeader
  testimonials: Testimonial[]
  faqHeader: SectionHeader
  faqItems: FaqItem[]
}

interface RawHome {
  hero?: Hero
  partnersTitle?: string
  advantagesHeader?: SectionHeader
  advantages?: { number: string; title: string; description: string }[]
  articlesHeader?: SectionHeader
  coursesHeader?: SectionHeader
  courses?: { title: string; description: string; image?: { url?: string }; imageAlt?: string; href?: string }[]
  testimonialsHeader?: SectionHeader
  faqHeader?: SectionHeader
}

interface RawAlumnus {
  name: string
  anchorId?: string
  shortQuote?: string
  photo?: { url?: string }
  photoAlt?: string
  featuredOnHome?: boolean
  order?: number
}

interface RawFaqItem {
  question: string
  answer: string
  showOnHome?: boolean
  order?: number
}

// Repli genere par scripts/sync-fallback.mjs — ne pas editer a la main.
const snap = snapshot.homePage as any
const FALLBACK: HomeContent = {
  hero: snap.hero,
  partnersTitle: snap.partnersTitle,
  advantagesHeader: snap.advantagesHeader,
  advantages: (snap.advantages ?? []).map((a: any, i: number) => ({ id: i + 1, ...a })),
  articlesHeader: snap.articlesHeader,
  coursesHeader: snap.coursesHeader,
  courses: (snap.courses ?? []).map((c: any, i: number) => ({
    id: i + 1,
    title: c.title,
    description: c.description,
    imageSrc: c.image?.url ? getImageUrl(c.image.url) : COURSE_IMAGES[i],
    imageAlt: c.imageAlt,
    href: c.href,
  })),
  testimonialsHeader: snap.testimonialsHeader,
  testimonials: ((snapshot.alumniHome ?? []) as any[]).map((a, i) => ({
    id: i + 1,
    name: a.name,
    quote: a.shortQuote ?? '',
    href: a.anchorId ? `/alumni/#${a.anchorId}` : '/alumni/',
    avatarSrc: a.photo?.url ? getImageUrl(a.photo.url) : undefined,
    avatarAlt: a.photoAlt,
  })),
  faqHeader: snap.faqHeader,
  faqItems: ((snapshot.faqHome ?? []) as any[]).map(({ question, answer }) => ({ question, answer })),
}
let cache: HomeContent | undefined

export async function getHomeContent(): Promise<HomeContent> {
  if (cache) return cache

  const [raw, rawAlumni, rawFaq] = await Promise.all([
    fetchSingle<RawHome>('/home-page', {
      'populate[hero][populate]': 'image',
      'populate[advantagesHeader]': true,
      'populate[advantages]': true,
      'populate[articlesHeader]': true,
      'populate[coursesHeader]': true,
      'populate[courses][populate]': 'image',
      'populate[testimonialsHeader]': true,
      'populate[faqHeader]': true,
    }),
    fetchCollection<RawAlumnus>('/alumni', { 'filters[featuredOnHome][$eq]': true, sort: 'order:asc' }),
    fetchCollection<RawFaqItem>('/faq-items', { 'filters[showOnHome][$eq]': true, sort: 'order:asc' }),
  ])

  if (!raw) {
    cache = FALLBACK
    return cache
  }

  cache = {
    hero: raw.hero ?? FALLBACK.hero,
    partnersTitle: raw.partnersTitle,
    advantagesHeader: raw.advantagesHeader ?? FALLBACK.advantagesHeader,
    advantages: raw.advantages?.length
      ? raw.advantages.map((a, i) => ({ id: i + 1, ...a }))
      : FALLBACK.advantages,
    articlesHeader: raw.articlesHeader ?? FALLBACK.articlesHeader,
    coursesHeader: raw.coursesHeader ?? FALLBACK.coursesHeader,
    courses: raw.courses?.length
      ? raw.courses.map((c, i) => ({
          id: i + 1,
          title: c.title,
          description: c.description,
          imageSrc: c.image?.url ? getImageUrl(c.image.url) : COURSE_IMAGES[i],
          imageAlt: c.imageAlt,
          href: c.href,
        }))
      : FALLBACK.courses,
    testimonialsHeader: raw.testimonialsHeader ?? FALLBACK.testimonialsHeader,
    testimonials: rawAlumni?.length
      ? rawAlumni.map((a, i) => ({
          id: i + 1,
          name: a.name,
          quote: a.shortQuote ?? '',
          href: a.anchorId ? `/alumni/#${a.anchorId}` : '/alumni/',
          avatarSrc: a.photo?.url ? getImageUrl(a.photo.url) : undefined,
          avatarAlt: a.photoAlt,
        }))
      : FALLBACK.testimonials,
    faqHeader: raw.faqHeader ?? FALLBACK.faqHeader,
    faqItems: rawFaq?.length ? rawFaq.map(({ question, answer }) => ({ question, answer })) : FALLBACK.faqItems,
  }

  return cache
}

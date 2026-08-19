import axios, { type AxiosInstance } from 'axios'

export type Category = {
  id: number
  documentId: string
  name: string
  slug: string
  description: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type Author = {
  id: number
  documentId: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type CoverFormat = {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes: number
}

export type Cover = {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  url: string
  formats?: {
    large?: CoverFormat
    small?: CoverFormat
    medium?: CoverFormat
    thumbnail?: CoverFormat
  }
}

export type Article = {
  id: number
  documentId: string
  title: string
  description: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  cover?: Cover
  author?: Author
  category?: Category
  blocks?: any[]
}

export type Pagination = {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export type ApiResponse<data> = {
  data: data
  meta?: {
    pagination?: Pagination
  }
}

const baseApiUrl = import.meta.env.BASE_URL_API?.trim() ?? ''
const apiToken = import.meta.env.TOKEN_API?.trim() ?? ''

export const STRAPI_URL = baseApiUrl ? baseApiUrl.replace(/\/api\/?$/, '') : ''
export const hasStrapiConfig = Boolean(baseApiUrl && apiToken)
let hasWarnedMissingStrapiConfig = false

const api: AxiosInstance | null = hasStrapiConfig
  ? axios.create({
      baseURL: baseApiUrl,
      timeout: 10000,
      headers: { Authorization: `Bearer ${apiToken}` },
    })
  : null

export function getImageUrl(url?: string): string {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `${STRAPI_URL}${url}`
}

// Strapi pagine par défaut (25 éléments) : on parcourt toutes les pages
// pour ne perdre aucun article dans le build statique.
export async function getArticles(): Promise<Article[]> {
  if (!api) {
    if (!hasWarnedMissingStrapiConfig) {
      console.warn(
        "Les variables d'environnement BASE_URL_API et TOKEN_API sont absentes ou incomplètes : le front continue sans articles."
      )
      hasWarnedMissingStrapiConfig = true
    }
    return []
  }

  try {
    const articles: Article[] = []
    let page = 1
    let pageCount = 1

    do {
      const response = await api.get<ApiResponse<Article[]>>('/articles', {
        params: {
          populate: '*',
          sort: 'publishedAt:desc',
          'pagination[page]': page,
          'pagination[pageSize]': 100,
        },
      })
      articles.push(...response.data.data)
      pageCount = response.data.meta?.pagination?.pageCount ?? 1
      page++
    } while (page <= pageCount)

    return articles
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error)
    return []
  }
}

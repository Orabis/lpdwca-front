import axios from 'axios'
import { strapiClient, hasStrapiConfig, STRAPI_URL, getImageUrl, type ApiResponse, type Pagination } from './strapi'

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

// Re-exports : les pages importent encore ces symboles depuis articles.ts.
export { hasStrapiConfig, STRAPI_URL, getImageUrl, strapiClient }
export type { ApiResponse, Pagination }

export async function getArticles(): Promise<Article[]> {
  if (!strapiClient) {
    // L'avertissement est émis une seule fois par le client partagé.
    return []
  }

  try {
    const articles: Article[] = []
    let page = 1
    let pageCount = 1

    do {
      const response = await strapiClient.get<ApiResponse<Article[]>>('/articles', {
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


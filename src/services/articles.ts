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

export type Articles = Article

export type ApiResponse<data> = {
  data: data
  meta?: unknown
}

const baseApiUrl = import.meta.env.BASE_URL_API
export const STRAPI_URL = baseApiUrl.replace(/\/api\/?$/, '')

const api: AxiosInstance = axios.create({
  baseURL: baseApiUrl,
  timeout: 10000,
  headers: { Authorization: `Bearer ${import.meta.env.TOKEN_API}` },
})

export function getImageUrl(url?: string): string {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `${STRAPI_URL}${url}`
}

export async function getArticles(): Promise<Article[] | null> {
  try {
    const response = await api.get<ApiResponse<Article[]>>(`/articles?populate=*`)
    return response.data.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.message)
    } else {
      console.error('Erreur inatendue:', error)
    }
    return null
  }
}

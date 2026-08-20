import axios, { type AxiosInstance } from 'axios'

/**
 * Client Strapi partagé par tous les services de contenu.
 *
 * Le front est généré statiquement : ces appels n'ont lieu qu'au build. Si
 * l'API n'est pas jointe, le client vaut null et chaque service retombe sur sa
 * copie statique de src/data — le site reste constructible hors ligne.
 */
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

export const strapiClient: AxiosInstance | null = hasStrapiConfig
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

const warned = new Set<string>()

/**
 * N'ajoute le populate générique que si l'appelant n'a pas fourni le sien :
 * mêler « populate=* » à des « populate[x][populate][y] » fait ignorer les
 * seconds par Strapi, et les relations profondes reviennent vides.
 */
function withPopulate(params: Record<string, unknown>): Record<string, unknown> {
  const hasPopulate = Object.keys(params).some((k) => k === 'populate' || k.startsWith('populate['))
  return hasPopulate ? params : { populate: '*', ...params }
}

/**
 * Récupère un single type et renvoie null en cas d'échec, sans jamais lever
 * d'exception : un contenu indisponible ne doit pas casser le build.
 */
export async function fetchSingle<T>(endpoint: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!strapiClient) {
    if (!warned.has(endpoint)) {
      console.warn(`Strapi non configuré : « ${endpoint} » est servi depuis src/data.`)
      warned.add(endpoint)
    }
    return null
  }

  try {
    const response = await strapiClient.get<ApiResponse<T | null>>(endpoint, {
      params: withPopulate(params),
    })
    return response.data.data ?? null
  } catch (error) {
    console.warn(
      `« ${endpoint} » indisponible depuis Strapi, repli sur les données statiques :`,
      error instanceof Error ? error.message : error
    )
    return null
  }
}

/**
 * Récupère une collection complète en suivant la pagination (Strapi renvoie
 * 25 éléments par défaut, ce qui tronquerait silencieusement le build).
 */
export async function fetchCollection<T>(
  endpoint: string,
  params: Record<string, unknown> = {}
): Promise<T[] | null> {
  if (!strapiClient) {
    if (!warned.has(endpoint)) {
      console.warn(`Strapi non configuré : « ${endpoint} » est servi depuis src/data.`)
      warned.add(endpoint)
    }
    return null
  }

  try {
    const items: T[] = []
    let page = 1
    let pageCount = 1

    do {
      const response = await strapiClient.get<ApiResponse<T[]>>(endpoint, {
        params: withPopulate({
          'pagination[page]': page,
          'pagination[pageSize]': 100,
          ...params,
        }),
      })
      items.push(...response.data.data)
      pageCount = response.data.meta?.pagination?.pageCount ?? 1
      page++
    } while (page <= pageCount)

    return items
  } catch (error) {
    console.warn(
      `« ${endpoint} » indisponible depuis Strapi, repli sur les données statiques :`,
      error instanceof Error ? error.message : error
    )
    return null
  }
}

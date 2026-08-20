import { strapiClient, type ApiResponse } from './strapi'
import snapshot from '@/data/strapi-snapshot.json'

/**
 * Références officielles du diplôme (RNCP, ECTS, volume horaire, tarif…).
 *
 * Ces valeurs changent chaque année universitaire : elles sont éditables dans
 * Strapi (single type « Références de la formation ») plutôt que figées dans le
 * code. Si l'API n'est pas jointe au moment du build, le front retombe sur la
 * copie statique de src/data/legal.ts — le site reste publiable hors ligne.
 */
export interface ProgramReferenceEntry {
  term: string
  value: string
}

export interface ProgramReferenceLink {
  label: string
  href: string
  external?: boolean
}

export interface ProgramReference {
  title: string
  intro?: string
  catalogYear?: string
  entries?: ProgramReferenceEntry[]
  links?: ProgramReferenceLink[]
  lastCheckedAt?: string
}

let hasWarned = false

export async function getProgramReference(): Promise<ProgramReference | null> {
  if (!strapiClient) {
    if (!hasWarned) {
      console.warn(
        'Strapi non configuré : les références de la formation sont servies depuis src/data/legal.ts.'
      )
      hasWarned = true
    }
    return (snapshot.programReference as ProgramReference | null) ?? null
  }

  try {
    const response = await strapiClient.get<ApiResponse<ProgramReference | null>>('/program-reference', {
      params: { populate: '*' },
    })
    return response.data.data ?? null
  } catch (error) {
    console.warn(
      'Références de la formation indisponibles depuis Strapi, repli sur les données statiques :',
      error instanceof Error ? error.message : error
    )
    return (snapshot.programReference as ProgramReference | null) ?? null
  }
}

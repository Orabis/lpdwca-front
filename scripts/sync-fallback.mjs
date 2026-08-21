/**
 * Régénère l'instantané de repli à partir de Strapi.
 *
 * Le front est généré statiquement : si l'API n'est pas jointe au build, les
 * services retombent sur src/data/strapi-snapshot.json. Ce fichier ne doit
 * jamais être édité à la main — il est produit par ce script, ce qui garantit
 * que le repli reste conforme à la seule source de vérité, Strapi.
 *
 *   node scripts/sync-fallback.mjs            # contre l'API de .env
 *   node scripts/sync-fallback.mjs --check    # échoue si le dépôt a divergé
 *   node scripts/sync-fallback.mjs --env .env.prod
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const OUT = path.join('src', 'data', 'strapi-snapshot.json')

const args = process.argv.slice(2)
const check = args.includes('--check')
const envFile = args.includes('--env') ? args[args.indexOf('--env') + 1] : '.env'

/** Lit un fichier .env sans dépendance externe. */
async function readEnv(file) {
  try {
    const raw = await fs.readFile(file, 'utf8')
    return Object.fromEntries(
      raw
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith('#') && l.includes('='))
        .map((l) => {
          const i = l.indexOf('=')
          return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
        })
    )
  } catch {
    return {}
  }
}

/** Les ressources dont le repli est nécessaire, avec leur populate. */
const RESOURCES = [
  { key: 'navigation', path: '/navigation', single: true, params: {
    'populate[mainLinks]': 'true',
    'populate[legalLinks]': 'true',
    'populate[socialLinks]': 'true',
    'populate[footerSections][populate][links]': 'true',
  } },
  { key: 'uiLabels', path: '/ui-label', single: true },
  { key: 'homePage', path: '/home-page', single: true, params: {
    'populate[hero][populate]': 'image',
    'populate[advantagesHeader]': 'true',
    'populate[advantages]': 'true',
    'populate[articlesHeader]': 'true',
    'populate[coursesHeader]': 'true',
    'populate[courses][populate]': 'image',
    'populate[testimonialsHeader]': 'true',
    'populate[faqHeader]': 'true',
  } },
  { key: 'alumniHome', path: '/alumni', single: false, params: {
    'filters[featuredOnHome][$eq]': 'true', sort: 'order:asc', populate: '*',
  } },
  { key: 'faqHome', path: '/faq-items', single: false, params: {
    'filters[showOnHome][$eq]': 'true', sort: 'order:asc',
  } },
  { key: 'programReference', path: '/program-reference', single: true, params: { populate: '*' } },
  { key: 'licencePage', path: '/licence-page', single: true, params: { 'populate[header]': 'true', 'populate[seo]': 'true', 'populate[programDomains]': 'true', 'populate[semesters][populate][ues][populate][lines]': 'true', 'populate[leads][populate]': 'photo', 'populate[organisationPanels][populate][blocks][populate]': '*', 'populate[afterPanels][populate][blocks][populate]': '*', 'populate[insertion][populate][stats]': 'true' } },
  { key: 'formationPage', path: '/formation-page', single: true, params: { 'populate[header]': 'true', 'populate[seo]': 'true', 'populate[cta]': 'true', 'populate[types]': 'true', 'populate[continuingCards][populate][items]': 'true', 'populate[apprenticeshipCards][populate][items]': 'true' } },
  { key: 'financementPage', path: '/financement-page', single: true, params: { 'populate[header]': 'true', 'populate[seo]': 'true', 'populate[fundingColumns][populate][items]': 'true', 'populate[extraOptions]': 'true', 'populate[apprenticeshipColumns][populate][items]': 'true' } },
  { key: 'contactPage', path: '/contact-page', single: true, params: { 'populate[header]': 'true', 'populate[seo]': 'true', 'populate[fields][populate][options]': 'true', 'populate[infoCards]': 'true', 'populate[companyArguments][populate][items]': 'true' } },
  { key: 'candidaturePage', path: '/candidature-page', single: true, params: { 'populate[header]': 'true', 'populate[seo]': 'true', 'populate[cta]': 'true', 'populate[eligibilityPanels]': 'true', 'populate[eligibilityNotes]': 'true', 'populate[steps]': 'true', 'populate[documents]': 'true' } },
  { key: 'alumniPage', path: '/alumni-page', single: true, params: { 'populate[header]': 'true', 'populate[seo]': 'true', 'populate[cta]': 'true', 'populate[filters]': 'true' } },
  { key: 'alumniAll', path: '/alumni', single: false, params: { sort: 'order:asc', populate: '*' } },
  { key: 'faqThemes', path: '/faq-themes', single: false, params: { sort: 'order:asc', 'populate[faq_items]': 'true' } },
  { key: 'elearningPage', path: '/elearning-page', single: true, params: { 'populate[header]': 'true', 'populate[seo]': 'true', 'populate[cta]': 'true', 'populate[facts][populate][items]': 'true', 'populate[platforms][populate][items]': 'true', 'populate[toolsCard][populate][items]': 'true', 'populate[scheduleColumns]': 'true', 'populate[scheduleRows][populate][values]': 'true', 'populate[equipmentCard][populate][items]': 'true' } },
  { key: 'legalPage', path: '/legal-page', single: true, params: { 'populate[header]': 'true', 'populate[seo]': 'true', 'populate[sections][populate]': '*' } },
  { key: 'articlesPage', path: '/articles-page', single: true, params: { 'populate[seo]': 'true' } },
]

const env = await readEnv(envFile)
const base = (env.BASE_URL_API || '').trim()
const token = (env.TOKEN_API || '').trim()

if (!base || !token) {
  console.error(`✗ ${envFile} ne fournit pas BASE_URL_API et TOKEN_API.`)
  process.exit(1)
}

console.log(`Source : ${base}`)

const snapshot = {}
let manquants = 0

for (const res of RESOURCES) {
  const url = new URL(base.replace(/\/$/, '') + res.path)
  for (const [k, v] of Object.entries(res.params ?? {})) url.searchParams.set(k, v)
  if (!res.params) url.searchParams.set('populate', '*')
  if (!res.single) url.searchParams.set('pagination[pageSize]', '100')

  try {
    const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
    if (!r.ok) {
      console.warn(`  ! ${res.path} → HTTP ${r.status}, ignoré`)
      manquants++
      continue
    }
    const body = await r.json()
    snapshot[res.key] = body.data ?? null
    const n = Array.isArray(body.data) ? `${body.data.length} entrée(s)` : 'ok'
    console.log(`  ✓ ${res.path.padEnd(20)} ${n}`)
  } catch (e) {
    console.warn(`  ! ${res.path} → ${e.message}, ignoré`)
    manquants++
  }
}

if (manquants === RESOURCES.length) {
  console.error('✗ Aucune ressource récupérée : Strapi est-il joignable ?')
  process.exit(1)
}

const serialise = JSON.stringify(snapshot, null, 2) + '\n'

if (check) {
  const actuel = await fs.readFile(OUT, 'utf8').catch(() => '')
  // Le contrôle ne doit réagir qu'au contenu. La copie de travail peut être en
  // CRLF (core.autocrlf sous Windows), et une simple republication dans Strapi
  // renumérote les entrées et déplace les horodatages sans rien changer.
  const VOLATILES = new Set(['id', 'documentId', 'createdAt', 'updatedAt', 'publishedAt'])
  const sansVolatiles = (valeur) => {
    if (Array.isArray(valeur)) return valeur.map(sansVolatiles)
    if (!valeur || typeof valeur !== 'object') return valeur
    return Object.fromEntries(
      Object.entries(valeur)
        .filter(([cle]) => !VOLATILES.has(cle))
        .map(([cle, v]) => [cle, sansVolatiles(v)]),
    )
  }
  const comparable = (texte) => {
    try {
      return JSON.stringify(sansVolatiles(JSON.parse(texte)))
    } catch {
      return texte.replace(/\r\n/g, '\n')
    }
  }
  if (comparable(actuel) !== comparable(serialise)) {
    console.error(`\n✗ ${OUT} a divergé de Strapi. Lancez « node scripts/sync-fallback.mjs » et commitez.`)
    process.exit(1)
  }
  console.log(`\n✓ ${OUT} est conforme à Strapi.`)
} else {
  await fs.mkdir(path.dirname(OUT), { recursive: true })
  await fs.writeFile(OUT, serialise, 'utf8')
  console.log(`\n✓ ${OUT} régénéré (${Buffer.byteLength(serialise)} octets).`)
}

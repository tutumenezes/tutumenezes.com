import { readFile, writeFile } from '../fs-helpers'
import { notion } from './client'
import { BLOG_INDEX_CACHE } from './server-constants'
import { getFileUrl } from './utils'

const formatValue = (key: string, value) => {
  switch (key) {
    case 'Authors':
      return value.rich_text.map((item) => item.plain_text)

    case 'Slug':
    case 'CTA':
    case 'Role':
    case 'Color':
    case 'AltText':
    case 'ogPreview':
      return value.rich_text.map((item) => item.plain_text).join('')

    case 'Cover':
    case 'Thumb':
    case 'ogImage':
      return value.files.map((item) => getFileUrl(item))[0] || ''

    case 'Date':
      return new Date(value.date?.start).getTime()

    case 'Owner':
      return value.people.map((item) => item.id)

    case 'Published':
      return value.checkbox

    case 'Tags':
    case 'Project':
    case 'Type':
      return value.multi_select.map((item) => item.name)

    case 'Page':
      return value.title.map((item) => item.plain_text)[0] || ''

    default:
      return value
  }
}

export type BlogTableRow = {
  id: string
  Slug?: string
  Cover?: string
  Thumb?: string
  CTA?: string
  ogPreview?: string
  Date?: number
  ogImage?: string
  AltText?: string
  Published?: boolean
  Tags?: string[]
  Type?: string[]
  Project?: string[]
  Page?: string
}

export default async function getBlogIndex(
  previews = true
): Promise<BlogTableRow[]> {
  const useCache = process.env.USE_CACHE === 'true'
  const cacheFile = `${BLOG_INDEX_CACHE}${previews ? '_previews' : ''}`

  if (useCache) {
    try {
      return JSON.parse(await readFile(cacheFile, 'utf8'))
    } catch (_) {
      /* not fatal */
    }
  }

  let postsTable: BlogTableRow[] = []

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    })

    postsTable = response.results
      .map((row) => {
        const newRow: BlogTableRow = { id: row.id }

        Object.entries(row.properties).forEach(([key, value]) => {
          newRow[key] = formatValue(key, value)

          if (typeof newRow[key] === 'string') {
            newRow[key] = newRow[key].trim()
          }

          // fix getStaticProps bug https://github.com/vercel/next.js/discussions/11209
          if (newRow[key] === undefined) {
            newRow[key] = null
          }
        })
        return newRow
      })
      .sort((a, b) => b.Date - a.Date)
  } catch (err) {
    console.warn(`Failed to load Notion posts`)
    return []
  }

  if (useCache) {
    writeFile(cacheFile, JSON.stringify(postsTable), 'utf8').catch(() => {})
  }

  return postsTable
}

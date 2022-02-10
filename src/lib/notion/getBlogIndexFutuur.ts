import { Sema } from 'async-sema'
import rpc, { values } from './rpc'
import getTableData from './getTableData'
import { getPostPreview } from './getPostPreview'
import { readFile, writeFile } from '../fs-helpers'
import { BLOG_INDEX_ID_2, BLOG_INDEX_CACHE } from './server-constants'

export default async function getBlogIndexFutuur(previewsFutuur = true) {
  let postsTableFutuur: any = null
  const useCache = process.env.USE_CACHE === 'true'
  const cacheFile = `${BLOG_INDEX_CACHE}${previewsFutuur ? '_previews' : ''}`

  if (useCache) {
    try {
      postsTableFutuur = JSON.parse(await readFile(cacheFile, 'utf8'))
    } catch (_) {
      /* not fatal */
    }
  }

  if (!postsTableFutuur) {
    try {
      const data = await rpc('loadPageChunk', {
        pageId: BLOG_INDEX_ID_2,
        limit: 100, // TODO: figure out Notion's way of handling pagination
        cursor: { stack: [] },
        chunkNumber: 0,
        verticalColumns: false,
      })

      const rawdata = data

      // Parse table with posts
      const tableBlock = values(data.recordMap.block).find(
        (block: any) => block.value.type === 'collection_view'
      )

      postsTableFutuur = await getTableData(tableBlock, true)
    } catch (err) {
      console.warn(
        `Failed to load Notion posts, have you run the create-table script?`
      )
      return {}
    }

    // only get 10 most recent post's previews
    const postsKeys = Object.keys(postsTableFutuur).splice(0, 10)

    const sema = new Sema(3, { capacity: postsKeys.length })

    if (previewsFutuur) {
      await Promise.all(
        postsKeys
          .sort((a, b) => {
            const postA = postsTableFutuur[a]
            const postB = postsTableFutuur[b]
            const timeA = postA.Date
            const timeB = postB.Date
            return Math.sign(timeB - timeA)
          })
          .map(async (postKey) => {
            await sema.acquire()
            const post = postsTableFutuur[postKey]
            post.preview = post.id
              ? await getPostPreview(postsTableFutuur[postKey].id)
              : []
            sema.release()
          })
      )
    }

    if (useCache) {
      writeFile(
        cacheFile,
        JSON.stringify(postsTableFutuur),
        'utf8'
      ).catch(() => {})
    }
  }

  return postsTableFutuur
}

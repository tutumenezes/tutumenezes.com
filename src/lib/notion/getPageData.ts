import { notion } from './client'
import { NotionBlock } from './types'

export type PageBlock = NotionBlock & {
  children?: PageBlock[]
}

const loadBlock = async (blockId: string) => {
  // a reasonable size limit for the largest blog post (1MB),
  // as one chunk is about 10KB
  const maximumChunckNumer = 100
  let chunkNumber = 0

  let data = await notion.blocks.children.list({ block_id: blockId })
  let blocks = data.results as PageBlock[]

  while (data.has_more && chunkNumber < maximumChunckNumer) {
    chunkNumber = chunkNumber + 1
    data = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: data.next_cursor,
    })
    blocks = blocks.concat(data.results as PageBlock[])
  }

  await Promise.all(
    blocks
      .filter((b) => b.has_children)
      .map((block) =>
        loadBlock(block.id).then((childrenData) => {
          block.children = childrenData
        })
      )
  )

  return blocks
}

export default async function getPageData(
  pageId: string
): Promise<{ blocks: PageBlock[] }> {
  try {
    const blocks = await loadBlock(pageId)
    return { blocks }
  } catch (err) {
    console.error(`Failed to load pageData for ${pageId}`, err)
    return { blocks: [] }
  }
}

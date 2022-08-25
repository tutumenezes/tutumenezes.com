import Slugger from 'github-slugger'
import React, { Fragment, ReactNode } from 'react'
import { PageBlock } from '../lib/notion/getPageData'
import {
  BulletedListItemBlock,
  NumberedListItemBlock,
  RichText,
} from '../lib/notion/types'
import { getFileUrl } from '../lib/notion/utils'

const renderRichText = (richText: RichText) => {
  return richText?.map((text) => {
    const key: string = text.plain_text

    let value: ReactNode = text.plain_text
    if (text.annotations.bold) {
      value = <b>{value}</b>
    }
    if (text.annotations.italic) {
      value = <i>{value}</i>
    }
    if (text.annotations.strikethrough) {
      value = <s>{value}</s>
    }
    if (text.annotations.underline) {
      value = <u>{value}</u>
    }
    if (text.annotations.code) {
      value = <code>{value}</code>
    }
    if (text.annotations.color !== 'default') {
      value = <span style={{ color: text.annotations.color }}>{value}</span>
    }
    if (text.href) {
      value = <a href={text.href}>{value}</a>
    }
    return <Fragment key={key}>{value}</Fragment>
  })
}

const renderHeading = (Tag, richText: RichText, slugger) => {
  const slug = slugger.slug(richText.map((t) => t.plain_text).join(''))
  return (
    <a href={`#${slug}`} id={slug}>
      <Tag>{renderRichText(richText)}</Tag>
    </a>
  )
}

type ListBlock =
  | { id: string; type: 'bulleted_list'; children: BulletedListItemBlock[] }
  | { id: string; type: 'numbered_list'; children: NumberedListItemBlock[] }

type RenderBlock = PageBlock | ListBlock

type PageBlocksProps = {
  blocks: PageBlock[]
}

const PageBlocks = ({ blocks }: PageBlocksProps) => {
  const slugger = new Slugger()

  const blocksWithList: RenderBlock[] = []

  let list: ListBlock | null = null
  const buildList = (type, block, blockIndex) => {
    if (!list) {
      list = { id: `${type}_${block.id}`, type, children: [] }
    }

    // TODO imprimir os children, e agrupar os itens comuns p o número ser incremental
    list.children.push(block)

    const isLast = blockIndex === blocks.length - 1
    const isNextSameType = blocks[blockIndex + 1]?.type === block.type

    const shouldFlush = isLast || !isNextSameType
    if (shouldFlush) {
      blocksWithList.push(list)
      list = null
    }
  }

  blocks.forEach((block, blockIndex) => {
    switch (block.type) {
      case 'bulleted_list_item':
        buildList('bulleted_list', block, blockIndex)
        break

      case 'numbered_list_item':
        buildList('numbered_list', block, blockIndex)
        break

      default:
        blocksWithList.push(block)
        break
    }
  })

  const renderBlock = (block: RenderBlock) => {
    switch (block.type) {
      case 'audio':
        return <audio controls src={getFileUrl(block.audio)} />

      case 'bulleted_list':
        return (
          <ul>
            {block.children.map((item) => (
              <li key={item.id}>
                {renderRichText(item.bulleted_list_item.rich_text)}
              </li>
            ))}
          </ul>
        )

      case 'callout':
        return (
          <div className="callout">
            {block.callout.icon && (
              <div>
                {block.callout.icon.type === 'emoji' ? (
                  block.callout.icon.emoji
                ) : (
                  <img src={getFileUrl(block.callout.icon)} />
                )}
              </div>
            )}
            <div className="text">
              {renderRichText(block.callout.rich_text)}
            </div>
          </div>
        )

      case 'code':
        return <code>{renderRichText(block.code.rich_text)}</code>

      case 'divider':
        return <hr />

      case 'embed':
        return <iframe src={block.embed.url} />

      case 'file':
        return (
          <a href={getFileUrl(block.file)} target="_blank">
            {block.file.caption.length
              ? renderRichText(block.file.caption)
              : 'Baixar arquivo'}
          </a>
        )

      case 'heading_1': {
        return renderHeading('h1', block.heading_1.rich_text, slugger)
      }

      case 'heading_2': {
        return renderHeading('h2', block.heading_2.rich_text, slugger)
      }

      case 'heading_3':
        return renderHeading('h3', block.heading_3.rich_text, slugger)

      case 'image':
        return (
          <img
            src={getFileUrl(block.image)}
            alt={block.image.caption.map((c) => c.plain_text).join('')}
          />
        )

      case 'paragraph':
        return <p>{renderRichText(block.paragraph.rich_text)}</p>

      case 'quote':
        return <blockquote>{renderRichText(block.quote.rich_text)}</blockquote>

      case 'numbered_list':
        return (
          <ol>
            {block.children.map((item) => (
              <li key={item.id}>
                {renderRichText(item.numbered_list_item?.rich_text)}
              </li>
            ))}
          </ol>
        )

      case 'to_do':
        // TODO imprimir os children
        return (
          <div>
            <input type="checkbox" defaultChecked={block.to_do.checked} />
            {renderRichText(block.to_do.rich_text)}
          </div>
        )

      case 'video':
        if (block.video.type === 'external') {
          var extURL = ''

          block.video.external.url.indexOf('youtube') > -1 &&
            (extURL =
              'https://www.youtube-nocookie.com/embed/' +
              block.video.external.url.split('v=')[1] +
              '?controls=0')

          return (
            <div className="video-container">
              <iframe
                src={extURL}
                className="video-container-iframe"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )
        } else {
          return <video src={block.video.file.url} controls />
        }

      default:
        return null
    }
  }

  const renderBlocks = (blocksArray: RenderBlock[]) => {
    return blocksArray?.map((block) => (
      <Fragment key={block.id}>
        {renderBlock(block)}
        {renderBlocks(block.children)}
      </Fragment>
    ))
  }

  return <>{renderBlocks(blocksWithList)}</>
}

export default PageBlocks

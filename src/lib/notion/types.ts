import { GetBlockResponse } from '@notionhq/client/build/src/api-endpoints'

export type AudioBlock = Extract<GetBlockResponse, { type: 'audio' }>
export type BulletedListItemBlock = Extract<GetBlockResponse,{ type: 'bulleted_list_item' }> // prettier-ignore
export type CalloutBlock = Extract<GetBlockResponse, { type: 'callout' }>
export type CodeBlock = Extract<GetBlockResponse, { type: 'code' }>
export type DividerBlock = Extract<GetBlockResponse, { type: 'divider' }>
export type EmbedBlock = Extract<GetBlockResponse, { type: 'embed' }>
export type FileBlock = Extract<GetBlockResponse, { type: 'file' }>
export type Heading1Block = Extract<GetBlockResponse, { type: 'heading_1' }>
export type Heading2Block = Extract<GetBlockResponse, { type: 'heading_2' }>
export type Heading3Block = Extract<GetBlockResponse, { type: 'heading_3' }>
export type ImageBlock = Extract<GetBlockResponse, { type: 'image' }>
export type ParagraphBlock = Extract<GetBlockResponse, { type: 'paragraph' }>
export type QuoteBlock = Extract<GetBlockResponse, { type: 'quote' }>
export type NumberedListItemBlock = Extract<GetBlockResponse,{ type: 'numbered_list_item' }> // prettier-ignore
export type ToDoBlock = Extract<GetBlockResponse, { type: 'to_do' }>
export type VideoBlock = Extract<GetBlockResponse, { type: 'video' }>

export type NotionBlock =
  | AudioBlock
  | BulletedListItemBlock
  | CalloutBlock
  | CodeBlock
  | DividerBlock
  | EmbedBlock
  | FileBlock
  | Heading1Block
  | Heading2Block
  | Heading3Block
  | ImageBlock
  | ParagraphBlock
  | QuoteBlock
  | NumberedListItemBlock
  | ToDoBlock
  | VideoBlock

export type RichText = ParagraphBlock['paragraph']['rich_text']

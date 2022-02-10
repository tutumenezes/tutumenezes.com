import Link from 'next/link'
import Header from './header'

import blogStyles from '../styles/blog.module.css'
import sharedStyles from '../styles/shared.module.css'
import Image from 'next/image'

import { getBlogLink, getDateStr, postIsPublished } from '../lib/blog-helpers'
import { textBlock } from '../lib/notion/renderers'
import getNotionUsers from '../lib/notion/getNotionUsers'
import getBlogIndex from '../lib/notion/getBlogIndex'

export async function getStaticProps({ preview }) {
  const postsTable = await getBlogIndex()
  const posts: any[] = Object.keys(postsTable)
    .map((slug) => {
      const post = postsTable[slug]
      // remove draft posts in production
      if (!preview && !postIsPublished(post)) {
        return null
      }
      return post
    })
    .filter(Boolean)

  const externalImageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  return {
    props: {
      preview: preview || false,
      posts,
    },
    revalidate: 10,
  }
}

const Cases = ({ posts = [], preview }) => {
  return (
    <>
      <Header titlePre="Blog" />
      {preview && (
        <div className={blogStyles.previewAlertContainer}>
          <div className={blogStyles.previewAlert}>
            <b>Note:</b>
            {` `}Viewing in preview mode{' '}
            <Link href={`/api/clear-preview`}>
              <button className={blogStyles.escapePreview}>Exit Preview</button>
            </Link>
          </div>
        </div>
      )}
      <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
        <h1>Tutumenezes</h1>
        <h2>Hey Ho Let's go</h2>
        {posts.length === 0 && (
          <p className={blogStyles.noPosts}>There are no posts yet</p>
        )}
        {posts.map((post) => {
          return (
            <div className={blogStyles.postPreview} key={post.Slug}>
              <h3>
                <span className={blogStyles.titleContainer}>
                  {!post.Published && (
                    <span className={blogStyles.draftBadge}>Draft</span>
                  )}
                  <Link href="/blog/[slug]" as={getBlogLink(post.Slug)}>
                    <a>{post.Page} →</a>
                  </Link>
                </span>
              </h3>
              {post.Cover.length > 0 && (
                <Image
                  className="cover"
                  src={post.Cover}
                  width={2250}
                  height={1390}
                  layout="responsive"
                />
              )}
              {post.Date && (
                <div className="posted">{getDateStr(post.Date)}</div>
              )}
              <p>
                {(!post.preview || post.preview.length === 0) &&
                  'No preview available'}
                {(post.preview || []).map((block, idx) =>
                  textBlock(block, true, `${post.Slug}${idx}`)
                )}
              </p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Cases

import Link from 'next/link'
import Header from '../components/header'
import Headline from '../components/headline'

import blogStyles from '../styles/blog.module.css'
import sharedStyles from '../styles/shared.module.css'
import themelight from '../styles/theme.light'
import Image from 'next/image'

import { getBlogLink, getDateStr, postIsPublished } from '../lib/blog-helpers'
import { textBlock } from '../lib/notion/renderers'
import getNotionUsers from '../lib/notion/getNotionUsers'
import getBlogIndex from '../lib/notion/getBlogIndex'
import getBlogIndexFutuur from '../lib/notion/getBlogIndexFutuur'

export async function getStaticProps({ preview }) {
  const mudeTable = await getBlogIndex()
  const futuurTable = await getBlogIndexFutuur()

  const postsTable: any = { ...mudeTable, ...futuurTable }

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

const Index = ({ posts = [], preview }) => {
  return (
    <>
      {console.log(posts)}

      <Header titlePre="Blog" />

      <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
        <Headline />

        {posts.length === 0 && (
          <p className={blogStyles.noPosts}>There are no posts yet</p>
        )}

        <div className="mude-cases">
          {posts.map((post) => {
            ///////////////////////////////
            // MUDE LOOP
            if (post.Project == 'mude') {
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
                  {/* <p>
                    {(!post.preview || post.preview.length === 0) &&
                      'No preview available'}
                    {(post.preview || []).map((block, idx) =>
                      textBlock(block, true, `${post.Slug}${idx}`)
                    )}
                  </p> */}
                </div>
              )
            }
          })}
        </div>

        <div className="futuur-cases">
          {posts.map((post) => {
            ///////////////////////////////
            // FUTUUR LOOP
            if (post.Project == 'futuur') {
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
                  {/* <p>
                    {(!post.preview || post.preview.length === 0) &&
                      'No preview available'}
                    {(post.preview || []).map((block, idx) =>
                      textBlock(block, true, `${post.Slug}${idx}`)
                    )}
                  </p> */}
                </div>
              )
            }
          })}
        </div>
      </div>
    </>
  )
}

export default Index

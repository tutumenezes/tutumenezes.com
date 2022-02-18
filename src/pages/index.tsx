import Link from 'next/link'
import Header from '../components/header'
import Headline from '../components/headline'
import Image from 'next/image'

import { FiArrowUpRight } from 'react-icons/fi'
import { getBlogLink, getDateStr, postIsPublished } from '../lib/blog-helpers'
import { textBlock } from '../lib/notion/renderers'

import { getPostTags } from '../lib/notion/getPostTags'

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

      <Header titlePre="Home" />

      <div className="main-container">
        <Headline />

        {posts.length === 0 && (
          <p className={'blogStyles.noPosts'}>There are no posts yet</p>
        )}

        <div className="cases">
          <div className="case-container mude-cases">
            {posts.map((post) => {
              ///////////////////////////////
              // MUDE LOOP
              if (post.Project == 'mude') {
                return (
                  <div className={'postPreview'} key={post.Slug}>
                    <div className="content-container">
                      {post.Date && (
                        <div className="posted">{getDateStr(post.Date)}</div>
                      )}
                      <h3>
                        <span className={'titleContainer'}>
                          {!post.Published && (
                            <span className={'draftBadge'}>Draft</span>
                          )}
                          <Link href="/blog/[slug]" as={getBlogLink(post.Slug)}>
                            <a>
                              {post.Page} <FiArrowUpRight />
                            </a>
                          </Link>
                        </span>
                      </h3>
                      {post.Tags && (
                        <div className="tags">{getPostTags(post.Tags)} </div>
                      )}
                    </div>
                    <div className="cover-container">
                      {post.Cover.length > 0 && (
                        <Image
                          className="cover"
                          src={post.Cover}
                          width={2250}
                          height={1390}
                          layout="responsive"
                        />
                      )}
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Index

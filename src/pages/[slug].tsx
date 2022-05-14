import Link from 'next/link'
import { useRouter } from 'next/router'
import Header from '../components/header'
import getPageData, { PageBlock } from '../lib/notion/getPageData'
import React, { FC, useEffect } from 'react'
import getBlogIndex, { BlogTableRow } from '../lib/notion/getBlogIndex'
import {
  getBlogLink,
  getDateStr,
  getCategoryLink,
  getProjectLink,
} from '../lib/blog-helpers'
import PageBlocks from '../components/PageBlocks'
import { FiArrowUpRight } from 'react-icons/fi'
import { Loading } from '../components/Loading'

type PostData = BlogTableRow & {
  content?: PageBlock[]
  prevPost?: BlogTableRow
  nextPost?: BlogTableRow
}

// Get the data for each blog post
export async function getStaticProps({ params: { slug }, preview }) {
  // load the postsTable so that we can get the page's ID
  const postsTable = await getBlogIndex()
  const post: PostData = postsTable.find((p) => p.Slug === slug)

  const today = new Date().getTime()

  // Return 404 custom page if the post doesn't exist
  if (!post) {
    return {
      notFound: true,
    }
  }

  // if we can't find the post or if it is unpublished and
  // viewed without preview mode then we returns 404
  const isAvailable = post.Published && post.Date < today
  if (!isAvailable && !preview) {
    console.log(`Failed to find post for slug: ${slug}`)
    return {
      unstable_revalidate: 5,
      notFound: true,
      revalidate: 5,
    }
  }

  const pageData = await getPageData(post.id)
  post.content = pageData.blocks

  const posts = postsTable.filter(
    (p) => (p.Published && p.Date < today) || p.Slug === slug
  )

  if (posts.length > 1) {
    const postIndex = posts.findIndex((p) => p.Slug === slug)

    let nextPostIndex = postIndex + 1
    let prevPostIndex = postIndex - 1

    if (postIndex === 0) {
      prevPostIndex = posts.length - 1
    }

    if (postIndex === posts.length - 1) {
      nextPostIndex = 0
    }

    post.prevPost = posts[prevPostIndex] || null
    post.nextPost = posts[nextPostIndex] || null
  }

  return {
    props: {
      post,
      preview: preview || false,
    },
    revalidate: 10,
  }
}

// Return our list of blog posts to prerender
export async function getStaticPaths() {
  const postsTable = await getBlogIndex()
  // we fallback for any unpublished posts to save build time
  // for actually published ones

  // const paths = Object.keys(postsTable)
  //   .filter((post) => postsTable[post].Published === 'Yes')
  //   .map((slug) => getBlogLink(slug))

  return {
    paths: postsTable
      .filter((post) => post.Published)
      .map((post) => getBlogLink(post.Slug)),
    fallback: true,
  }
}

const listTypes = new Set(['bulleted_list', 'numbered_list'])

type Props = {
  post: PostData
  redirect?: string
  preview?: boolean
}

const RenderPost: FC<Props> = ({ post, redirect, preview }) => {
  const router = useRouter()

  const Comp = 'img'

  let listTagName: string | null = null
  let listLastId: string | null = null
  let listMap: {
    [id: string]: {
      key: string
      isNested?: boolean
      nested: string[]
      children: React.ReactFragment
    }
  } = {}

  useEffect(() => {
    if (redirect && !post) {
      router.replace(redirect)
    }
  }, [redirect, post])

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  // if you don't have a post at this point, and are not
  // loading one from fallback then  redirect back to the index
  if (!post) {
    return (
      <div>
        <p>
          Woops! didn't find that post, redirecting you back to the blog index
        </p>
      </div>
    )
  }

  return (
    <>
      <Header
        titlePre={post.Page}
        dynamicOgImageURL={post.ogImage}
        preview={post.ogPreview}
        // updatedTime={toString(post.Date)}
        ogSlug={post.Slug}
        ogImageAlt={post.AltText}
      />

      {preview && (
        <div>
          <div>
            <b>Note:</b>
            {` `}Viewing in preview mode{' '}
            <Link href={`/api/clear-preview?slug=${post.Slug}`}>
              <button>Exit Preview</button>
            </Link>
          </div>
        </div>
      )}

      <div className={'blog-post'}>
        <div className="blog-post-header main-container">
          <div className="breadcrumbs" aria-label="breadcrumbs">
            {post.Type ? (
              <>
                <ol>
                  <li>
                    <Link href="/" as="/">
                      <a aria-label="Go to Homepage">Home</a>
                    </Link>
                  </li>
                  {post.Type && (
                    <li>
                      <Link
                        href={getCategoryLink(post.Type.toString())}
                        as={getCategoryLink(post.Type.toString())}
                      >
                        <a aria-label={'Go to type: ' + post.Type}>
                          {post.Type && post.Type}
                        </a>
                      </Link>
                    </li>
                  )}
                  {post.Type.toString() === 'case' &&
                  post.Project.toString() ? (
                    <li>
                      <Link
                        href={getProjectLink(post.Project.toString())}
                        as={getProjectLink(post.Project.toString())}
                      >
                        <a aria-label={'Go to type: ' + post.Project}>
                          {post.Project && post.Project}
                        </a>
                      </Link>
                    </li>
                  ) : (
                    ''
                  )}
                </ol>
              </>
            ) : (
              ''
            )}
          </div>
          <h1>{post.Page || ''}</h1>
          {post.Date && <div className="year">{getDateStr(post.Date)}</div>}
        </div>

        {post.Cover && (
          <div className="cover-image">
            <Comp
              key={post.id}
              src={post.Cover}
              alt={post.AltText ? post.AltText : 'cover do post ' + post.Page}
              className="Cover"
            />
          </div>
        )}

        <div className="post-content main-container">
          <PageBlocks blocks={post.content} />
        </div>

        <div className="related-posts main-container">
          <h3>Read More</h3>
          <div className="related-posts-list">
            {post.prevPost && (
              <div className="prevPost related-item">
                <span className={'titleContainer'}>
                  <Link
                    href={getBlogLink(post.prevPost.Slug)}
                    as={getBlogLink(post.prevPost.Slug)}
                  >
                    <a>
                      {post.prevPost.Page}
                      <FiArrowUpRight />
                    </a>
                  </Link>
                </span>
                {/* {post.prevPost.Type && (
                  <div className="tag"><span>#</span>{post.prevPost.Type}</div>
                )} */}
              </div>
            )}
            {post.nextPost && (
              <div className="nextPost related-item">
                <span className={'titleContainer'}>
                  <Link
                    href={getBlogLink(post.nextPost.Slug)}
                    as={getBlogLink(post.nextPost.Slug)}
                  >
                    <a>
                      {post.nextPost.Page} <FiArrowUpRight />
                    </a>
                  </Link>
                </span>
                {/* {post.nextPost.Type && (
                  <div className="tag"><span>#</span>{post.nextPost.Type}</div>
                )} */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default RenderPost

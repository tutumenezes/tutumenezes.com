import Link from 'next/link'
import { useRouter } from 'next/router'
import Header from '../components/header'
import getPageData, { PageBlock } from '../lib/notion/getPageData'
import React, { FC, useEffect } from 'react'
import getBlogIndex, { BlogTableRow } from '../lib/notion/getBlogIndex'
import PreviewMode from '../components/PreviewMode'
import {
  getBlogLink,
  getDateStr,
  getCategoryLink,
  getProjectLink,
} from '../lib/blog-helpers'
import PageBlocks from '../components/PageBlocks'
import { Loading } from '../components/Loading'

type PostData = BlogTableRow & {
  content?: PageBlock[]
  prevPost?: BlogTableRow
  nextPost?: BlogTableRow
}

// Get the data for each blog post
export async function getStaticProps({ preview }) {
  // load the postsTable so that we can get the page's ID
  const postsTable = await getBlogIndex()
  const post: PostData = postsTable.find((p) => p.Page === 'About Me')

  console.log(post)

  // Return 404 custom page if the post doesn't exist
  if (!post) {
    return {
      notFound: true,
    }
  }

  const pageData = await getPageData(post.id)
  post.content = pageData.blocks

  return {
    props: {
      post,
      preview: preview || false,
    },
    revalidate: 10,
  }
}

const listTypes = new Set(['bulleted_list', 'numbered_list'])

type Props = {
  post: PostData
  redirect?: string
  preview?: boolean
}

const RenderAbout: FC<Props> = ({ post, redirect, preview }) => {
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
        updatedTime={post.Date.toString()}
        ogSlug={post.Slug}
        ogImageAlt={post.AltText}
      />

      <PreviewMode preview={preview} />

      <div className={'blog-post'}>
        <div className="blog-post-header main-container">
          {/* <div className="breadcrumbs" aria-label="breadcrumbs">
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
          </div> */}
          {/* <h1>{post.Page || ''}</h1> */}
        </div>

        <div className="post-content main-container">
          <div className="post-eye">
            <div className="eye-content">
              <p>
                Hello there, I'm <s>Arthur</s> Tutu.
              </p>
              <p>
                I am incredibly driven and motivated by ideas that impact
                people's lives for the better, and that's what my work and
                personal life are all about.
              </p>
            </div>
            {post.Cover && (
              <div className="eye-cover-image">
                <Comp
                  key={post.id}
                  src={post.Cover}
                  alt={
                    post.AltText
                      ? post.AltText
                      : 'Tutu profile picture - ' + post.Page
                  }
                  className="Cover"
                />
              </div>
            )}
          </div>
          <PageBlocks blocks={post.content} />
        </div>
      </div>
    </>
  )
}

export default RenderAbout

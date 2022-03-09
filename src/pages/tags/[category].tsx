import Link from 'next/link'
import Header from '../../components/header'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  getBlogLink,
  getCategoryLink,
  onlyUnique,
  postIsPublished,
} from '../../lib/blog-helpers'
import { textBlock } from '../../lib/notion/renderers'
import getBlogIndex from '../../lib/notion/getBlogIndex'
import { useEffect } from 'react'
import Breadcrumbs from 'nextjs-breadcrumbs'

export async function getStaticProps({ preview }) {
  //TODO: get context from URL and then filter here instead at client-side

  const postsTable = await getBlogIndex()

  const posts: any[] = Object.keys(postsTable)
    .map((slug) => {
      const post = postsTable[slug]

      post.Tags = post.Tags || []

      // remove draft posts in production
      if (!preview && !postIsPublished(post)) {
        return null
      }

      return post
    })
    .filter(Boolean)

  // TODO: se não houver essa tag na api retorna 404
  // return {notFound: true}

  console.log(posts)

  return {
    props: {
      preview: preview || false,
      posts,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const postsTable = await getBlogIndex()
  // we fallback for any unpublished posts to save build time
  // for actually published ones

  const posts: any[] = Object.keys(postsTable)
    .map((slug) => {
      const post = postsTable[slug]

      post.Tags = post.Tags || []

      return post
    })
    .filter(Boolean)

  const alltags: any[] = Object.keys(posts)
    .map((slug) => {
      const tag = posts[slug].Tags

      return tag
    })
    .filter(Boolean)

  const tags = [].concat.apply([], alltags).filter(onlyUnique)

  const paths = tags.map((slug) => getCategoryLink(slug))

  return {
    paths: paths,
    fallback: true,
  }
}

const RenderCategory = ({ posts = [], redirect, preview }) => {
  // Sort by Date: most recent first
  posts.sort((a, b) => b.Date - a.Date)

  const router = useRouter()

  useEffect(() => {
    if (redirect && !posts) {
      router.replace(redirect)
    }
  }, [redirect, posts])

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  // console.log(posts)

  return (
    <>
      <Header titlePre="Categoria" />

      {preview && (
        <div className="alertContainer">
          <div className="previewAlert">
            <b>Note:</b>
            {` `}Viewing in preview mode{' '}
            <Link href={`/api/clear-preview`}>
              <button aria-label="sair do modo preview" className="escapeAlert">
                Exit Preview
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className="category-container">
        <div className="categoryHeader">
          <Breadcrumbs
            containerClassName={'blogBreadcrumb'}
            activeItemClassName={'activeItem'}
            omitIndexList={[1]}
          />

          <h1>#{router.query.category}</h1>
        </div>

        {posts.length === 0 && (
          <p className={'noPosts'}>Opa! Ainda tá sem post aqui.</p>
        )}
        <div className="categoryPostList">
          {posts.map((post) => {
            if (post.Type.IndexOf(router.query.category) > -1) {
              return (
                <Link href={getBlogLink(post.Slug)} as={getBlogLink(post.Slug)}>
                  <div className="categoryPostEntry">
                    <h3>
                      <span className="titleContainer">
                        <Link
                          href={getBlogLink(post.Slug)}
                          as={getBlogLink(post.Slug)}
                        >
                          <>
                            {!post.Published && (
                              <span className={'draftBadge'}>Draft</span>
                            )}
                            <a
                              title={'link para o post: ' + post.Page}
                              href={getBlogLink(post.Slug)}
                            >
                              {post.Page}
                            </a>
                          </>
                        </Link>
                      </span>
                    </h3>
                  </div>
                </Link>
              )
            }
          })}
        </div>
      </div>
      <div />
    </>
  )
}

export default RenderCategory

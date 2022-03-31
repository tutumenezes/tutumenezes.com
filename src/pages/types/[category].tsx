import Link from 'next/link'
import Header from '../../components/header'
import { useRouter } from 'next/router'
import {
  getBlogLink,
  getCategoryLink,
  onlyUnique,
  postIsPublished,
} from '../../lib/blog-helpers'
import getBlogIndex from '../../lib/notion/getBlogIndex'
import { useEffect } from 'react'
import Breadcrumbs from 'nextjs-breadcrumbs'
import { Loading } from '../../components/Loading'

export async function getStaticProps({ params: { category }, preview }) {
  //TODO: get context from URL and then filter here instead at client-side

  const postsTable = await getBlogIndex()

  const posts: any[] = Object.keys(postsTable)
    .map((category) => {
      const post = postsTable[category]

      post.Type = post.Type || []

      if (!preview && !postIsPublished(post)) {
        return null
      }

      return post
    })
    .filter(Boolean)

  const alltypes: any[] = Object.keys(posts)
    .map((category) => {
      const type = posts[category].Type

      return type
    })
    .filter(Boolean)

  const types = [].concat.apply([], alltypes).filter(onlyUnique).sort()

  if (types.indexOf(category) == -1) {
    return {
      notFound: true,
    }
  } else {
    return {
      props: {
        preview: preview || false,
        posts,
      },
      revalidate: 10,
    }
  }
}

export async function getStaticPaths() {
  const postsTable = await getBlogIndex()
  // we fallback for any unpublished posts to save build time
  // for actually published ones

  const types: any[] = Object.keys(postsTable)
    .map((category) => {
      const type = postsTable[category].Type

      return type
    })
    .filter(Boolean)

  const paths = []

  types.forEach((id) => {
    paths.push(getCategoryLink(id))
  })

  return {
    paths: paths.filter(onlyUnique),
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
    return (
      <div>
        <Loading />
      </div>
    )
  }

  return (
    <>
      <Header
        titlePre={router.query.category.toString()}
        ogSlug={'types/' + router.query.category.toString()}
      />

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

      <div className="tags-container main-container">
        <div className="tags-header">
          <Breadcrumbs
            containerClassName={'breadcrumbs'}
            activeItemClassName={'active'}
            omitIndexList={[1]}
          />

          <h1>#{router.query.category}</h1>
        </div>

        {posts.length === 0 && (
          <p className={'noPosts'}>Opa! Ainda tá sem post aqui.</p>
        )}
        <div className="tag-list tag-post-list">
          {posts.map((post) => {
            if (post.Type.indexOf(router.query.category) > -1) {
              return (
                <Link href={getBlogLink(post.Slug)} as={getBlogLink(post.Slug)}>
                  <div className="tag-post-entry">
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

import Link from 'next/link'
import Header from '../../components/header'
import { useRouter } from 'next/router'
import {
  getBlogLink,
  getCategoryLink,
  onlyUnique,
} from '../../lib/blog-helpers'
import getBlogIndex from '../../lib/notion/getBlogIndex'
import { useEffect } from 'react'
import Breadcrumbs from 'nextjs-breadcrumbs'
import { Loading } from '../../components/Loading'

export async function getStaticProps({ params: { category }, preview }) {
  //TODO: get context from URL and then filter here instead at client-side

  const postsTable = await getBlogIndex()

  const today = new Date().getTime()

  // viewed without preview mode then we returns 404
  const posts = postsTable.filter(
    (p) => (p.Published && p.Date < today) || preview
  )

  const types = postsTable.map((p) => p.Type).filter(Boolean)

  const allTypes = [].concat.apply([], types).filter(onlyUnique)

  if (allTypes.indexOf(category) == -1) {
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

  const type = postsTable.map((p) => p.Type).filter(Boolean)

  const allTypes = [].concat.apply([], type).filter(onlyUnique)

  const paths = []

  allTypes.filter(onlyUnique).forEach((id) => {
    paths.push(getCategoryLink(id))
  })

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

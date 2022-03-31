import Link from 'next/link'
import Header from '../../components/header'
import { useRouter } from 'next/router'
import {
  getBlogLink,
  getProjectLink,
  onlyUnique,
  postIsPublished,
} from '../../lib/blog-helpers'
import getBlogIndex from '../../lib/notion/getBlogIndex'
import { useEffect } from 'react'
import Breadcrumbs from 'nextjs-breadcrumbs'
import { Loading } from '../../components/Loading'

export async function getStaticProps({ params: { project }, preview }) {
  //TODO: get context from URL and then filter here instead at client-side

  const postsTable = await getBlogIndex()

  const posts: any[] = Object.keys(postsTable)
    .map((project) => {
      const post = postsTable[project]

      post.Project = post.Project || []

      if (!preview && !postIsPublished(post)) {
        return null
      }

      return post
    })
    .filter(Boolean)

  const allprojects: any[] = Object.keys(posts)
    .map((proj) => {
      const project = posts[proj].Project

      return project
    })
    .filter(Boolean)

  const projects = [].concat.apply([], allprojects).filter(onlyUnique).sort()

  const results = posts.filter((obj) => {
    return obj.Project === project
  })

  if (projects.indexOf(project) == -1) {
    return {
      notFound: true,
    }
  } else {
    return {
      props: {
        preview: preview || false,
        results,
      },
      revalidate: 10,
    }
  }
}

export async function getStaticPaths() {
  const postsTable = await getBlogIndex()
  // we fallback for any unpublished posts to save build time
  // for actually published ones

  const projects: any[] = Object.keys(postsTable)
    .map((proj) => {
      const project = postsTable[proj].Project

      return project
    })
    .filter(Boolean)

  const paths = []

  projects.forEach((id) => {
    paths.push(getProjectLink(id))
  })

  return {
    paths: paths.filter(onlyUnique),
    fallback: true,
  }
}

const RenderProject = ({ results = [], redirect, preview }) => {
  // Sort by Date: most recent first
  results.sort((a, b) => b.Date - a.Date)

  const router = useRouter()

  useEffect(() => {
    if (redirect && !results) {
      router.replace(redirect)
    }
  }, [redirect, results])

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
      <Header titlePre={router.query.project.toString()} />

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

          <h1>{router.query.project}</h1>
        </div>

        {results.length === 0 && (
          <p className={'noPosts'}>Ops! No posts yet.</p>
        )}

        <div className="tag-list tag-post-list">
          {results.map((post) => {
            if (post.Project.indexOf(router.query.project) > -1) {
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

export default RenderProject

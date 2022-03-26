import Link from 'next/link'
import Header from '../../components/header'
import React, { useEffect } from 'react'
import {
  getProjectLink,
  postIsPublished,
  onlyUnique,
} from '../../lib/blog-helpers'
import getBlogIndex from '../../lib/notion/getBlogIndex'
import Breadcrumbs from 'nextjs-breadcrumbs'

export async function getStaticProps({ preview }) {
  const postsTable = await getBlogIndex()

  const posts: any[] = Object.keys(postsTable)
    .map((slug) => {
      const post = postsTable[slug]

      post.Project = post.Project || []
      //   post.Tags = post.Category.split(',')

      if (!preview && !postIsPublished(post)) {
        return null
      }

      return post
    })
    .filter(Boolean)

  const allprojects: any[] = Object.keys(posts)
    .map((slug) => {
      const project = posts[slug].Project

      return project
    })
    .filter(Boolean)

  const projects = [].concat.apply([], allprojects).filter(onlyUnique).sort()

  return {
    props: {
      preview: preview || false,
      projects,
    },
    revalidate: 10,
  }
}

const Projects = ({ projects = [], preview }) => {
  return (
    <>
      <Header titlePre="Projects" />

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

      <div className="types-container">
        <div className="typesHeader">
          <Breadcrumbs
            containerClassName={'blogBreadcrumb'}
            activeItemClassName={'activeItem'}
            omitIndexList={[1]}
          />
          <h1>Projects</h1>
        </div>

        {projects.length === 0 && (
          <p className={'noPosts'}>Opa! Ainda tá sem post aqui.</p>
        )}
        <div className="typesList">
          {projects.map((proj) => {
            return (
              <Link
                key={proj}
                href={getProjectLink(proj)}
                as={getProjectLink(proj)}
              >
                <a href={getProjectLink(proj)} className="typeItem">
                  <span>#</span>
                  {proj}
                </a>
              </Link>
            )
          })}
        </div>
      </div>
      <div />
    </>
  )
}

export default Projects

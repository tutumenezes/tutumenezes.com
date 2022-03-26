import Link from 'next/link'
import Header from '../../components/header'
import React from 'react'
import {
  getCategoryLink,
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

      post.Type = post.Type || []
      //   post.Tags = post.Category.split(',')

      if (!preview && !postIsPublished(post)) {
        return null
      }

      return post
    })
    .filter(Boolean)

  const alltypes: any[] = Object.keys(posts)
    .map((slug) => {
      const type = posts[slug].Type

      return type
    })
    .filter(Boolean)

  const types = [].concat.apply([], alltypes).filter(onlyUnique).sort()

  return {
    props: {
      preview: preview || false,
      types,
    },
    revalidate: 10,
  }
}

const Types = ({ types = [], preview }) => {
  return (
    <>
      <Header titlePre="Types" />

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
            replaceCharacterList={[{ from: 'types', to: '' }]}
          />
          <h1>Types</h1>
        </div>

        {types.length === 0 && (
          <p className={'noPosts'}>Opa! Ainda tá sem post aqui.</p>
        )}
        <div className="tag-list">
          {types.map((type) => {
            return (
              <Link
                key={type}
                href={getCategoryLink(type)}
                as={getCategoryLink(type)}
              >
                <a href={getCategoryLink(type)} className="typeItem">
                  <span>#</span>
                  {type}
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

export default Types

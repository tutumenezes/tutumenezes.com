import Link from 'next/link'
import Header from '../components/header'
import Headline from '../components/headline'

import { FiArrowUpRight } from 'react-icons/fi'
import { getBlogLink, getCategoryLink } from '../lib/blog-helpers'

import getBlogIndex from '../lib/notion/getBlogIndex'
import PreviewMode from '../components/PreviewMode'

export async function getStaticProps({ preview }) {
  const postsTable = await getBlogIndex()

  const today = new Date().getTime()

  const posts = postsTable.filter(
    (post) => preview || (post.Published && post.Date < today)
  )

  return {
    props: {
      preview: preview || false,
      posts,
    },
    revalidate: 5,
  }
}

const Index = ({ posts = [], preview }) => {
  const Comp = 'img'

  return (
    <>
      <Header titlePre="Home" />

      <PreviewMode preview={preview} />

      <div className="main-container">
        <Headline />

        {posts.length === 0 && (
          <p className={'blogStyles.noPosts'}>There are no posts yet</p>
        )}

        <div className="cases">
          <div className="cases-wrapper">
            <div className="case-container mude-cases">
              <div className="content-list">
                {posts.map((post) => {
                  ///////////////////////////////
                  // Highlight Loop
                  if (post.Type == 'product') {
                    return (
                      <div className={'postPreview'} key={post.Slug}>
                        <div className="content-container">
                          <h3>
                            <span className={'titleContainer'}>
                              {!post.Published && (
                                <span className={'draftBadge'}>Draft</span>
                              )}
                              <Link
                                href={getBlogLink(post.Slug)}
                                as={getBlogLink(post.Slug)}
                              >
                                <a>
                                  {post.Page} <FiArrowUpRight />
                                </a>
                              </Link>
                            </span>
                          </h3>
                          <Link
                            href={getCategoryLink(post.Type)}
                            as={getCategoryLink(post.Type)}
                          >
                            <a>
                              {post.Type && (
                                <div className="tag">#{post.Type}</div>
                              )}
                            </a>
                          </Link>
                        </div>
                        <div className="cover-container">
                          {post.Thumb.length > 0 && (
                            <Comp
                              key={post.id}
                              src={post.Thumb}
                              alt={post.Alt}
                              className="cover"
                            />
                          )}
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
              <div className="bg-container"></div>
            </div>
          </div>

          {/* <div className="cases-wrapper">
            <div className="case-container futuur-cases">
              <div className="content-list">
                {posts.map((post) => {
                  ///////////////////////////////
                  // FUTUUR LOOP
                  if (post.Project == 'futuur') {
                    return (
                      <div className={'postPreview'} key={post.Slug}>
                        <div className="content-container">
                          <h3>
                            <span className={'titleContainer'}>
                              {!post.Published && (
                                <span className={'draftBadge'}>Draft</span>
                              )}
                              <Link
                                href={getBlogLink(post.Slug)}
                                as={getBlogLink(post.Slug)}
                              >
                                <a>
                                  {post.Page} <FiArrowUpRight />
                                </a>
                              </Link>
                            </span>
                          </h3>
                          <Link
                            href={getCategoryLink(post.Type)}
                            as={getCategoryLink(post.Type)}
                          >
                            <a>
                              {post.Type && (
                                <div className="tag">#{post.Type}</div>
                              )}
                            </a>
                          </Link>
                        </div>
                        <div className="cover-container">
                          {post.Thumb.length > 0 && (
                            <Comp
                              key={post.id}
                              src={post.Thumb}
                              alt={post.Alt}
                              className="cover"
                            />
                          )}
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
              <div className="bg-container"></div>
            </div>
          </div> */}

          <div className="cases-wrapper">
            <div className="case-container otherWork-cases">
              <div className="content-list">
                {posts.map((post) => {
                  ///////////////////////////////
                  // OTHER WORK LOOP
                  if (post.Type == 'feature') {
                    return (
                      <div className={'postPreview'} key={post.Slug}>
                        <div className="content-container">
                          <h3>
                            <span className={'titleContainer'}>
                              {!post.Published && (
                                <span className={'draftBadge'}>Draft</span>
                              )}
                              <Link
                                href={getBlogLink(post.Slug)}
                                as={getBlogLink(post.Slug)}
                              >
                                <a>
                                  {post.Page} <FiArrowUpRight />
                                </a>
                              </Link>
                            </span>
                          </h3>
                          <Link
                            href={getCategoryLink(post.Type)}
                            as={getCategoryLink(post.Type)}
                          >
                            <a>
                              {post.Type && (
                                <div className="tag">#{post.Type}</div>
                              )}
                            </a>
                          </Link>
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index

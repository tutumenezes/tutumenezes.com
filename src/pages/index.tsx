import Link from 'next/link'
import Header from '../components/header'
import Headline from '../components/headline'
import sectionDivider from '../components/sectionDivider'

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
          <div className="cases-wrapper product">
            {/* <div className="section-title"><h4>Product Highlights</h4></div> */}
            <div className="case-container mude-cases">
              <div className="content-list">
                {posts.map((post) => {
                  ///////////////////////////////
                  // Product Loop
                  if (post.Type == 'product') {
                    return (
                      <Link
                        href={getBlogLink(post.Slug)}
                        as={getBlogLink(post.Slug)}
                      >
                        <div className={'postPreview'} key={post.Slug}>
                          <div className="content-container">
                            <Link
                              href={getBlogLink(post.Slug)}
                              as={getBlogLink(post.Slug)}
                            >
                              <a>
                                {post.Project && (
                                  <div className="post-project">
                                    {post.Project}
                                  </div>
                                )}
                              </a>
                            </Link>
                            <Link
                              href={getBlogLink(post.Slug)}
                              as={getBlogLink(post.Slug)}
                            >
                              <a>
                                {post.Role && (
                                  <div className="post-role">
                                    as {post.Role}
                                  </div>
                                )}
                              </a>
                            </Link>
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
                          </div>
                          <div
                            className="cover-container"
                            style={{ backgroundColor: post.Color }}
                          >
                            {post.Thumb.length > 0 && (
                              <Comp
                                key={post.id}
                                src={post.Thumb}
                                alt={post.Alt}
                                className={post.Project}
                              />
                            )}
                          </div>
                        </div>
                      </Link>
                    )
                  }
                })}
              </div>
            </div>
          </div>

          <div className="cases-wrapper features">
            <div className="section-title">
              <h4>Features & Highlights</h4>
            </div>
            <div className="case-container otherWork-cases">
              <div className="content-list">
                {/* ///////////////////////////////
                // Features Loop */}
                <div className="feature-section">
                  <h5>with Mude.fit</h5>
                  <ul>
                    {posts.map((post) => {
                      if (
                        post.Type == 'feature' &&
                        post.Project == 'Mude.fit'
                      ) {
                        return (
                          <li className={'featurePreview'} key={post.Slug}>
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
                          </li>
                        )
                      }
                    })}
                  </ul>
                </div>
                <div className="feature-section">
                  <h5>with Futuur</h5>
                  <ul>
                    {posts.map((post) => {
                      if (post.Type == 'feature' && post.Project == 'Futuur') {
                        return (
                          <li className={'featurePreview'} key={post.Slug}>
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
                          </li>
                        )
                      }
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="cases-wrapper more">
            <div className="section-title">
              <h4>Other</h4>
            </div>
            <div className="case-container otherWork-cases">
              <div className="content-list">
                <div className="feature-section">
                  <ul>
                    <li className={'featurePreview'} key="AboutMe">
                      <h3>
                        <span className={'titleContainer'}>
                          <Link href={'/about'} as={'/about'}>
                            <a>
                              About me <FiArrowUpRight />
                            </a>
                          </Link>
                        </span>
                      </h3>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index

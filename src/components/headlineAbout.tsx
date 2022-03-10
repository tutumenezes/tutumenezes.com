import Link from 'next/link'

import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'

import ThemeToggle from './themetoggle'
import ReactTooltip from 'react-tooltip'
import { FiHome } from 'react-icons/fi'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'Home', page: '/' },
]

const HeadlineAbout = ({ titlePre = '' }) => {
  const { pathname } = useRouter()
  const { theme } = useTheme()

  return (
    <div className="headline">
      <div className="container">
        <p>
          <span>Hi, I'm Arthur. </span>
          <span>But you can call me Tutu.</span>
        </p>
        <div className="nav">
          <ul>
            {navItems.map(({ label, page, link }) => (
              <li className="nav-list-item" key={label}>
                {label == 'Home' ? (
                  <>
                    <Link href={page}>
                      <a
                        data-tip={label}
                        className={pathname === page ? 'active' : undefined}
                      >
                        <FiHome />
                        {theme == 'dark' ? (
                          <ReactTooltip
                            place="bottom"
                            type="light"
                            effect="solid"
                          />
                        ) : (
                          <ReactTooltip
                            place="bottom"
                            type="dark"
                            effect="solid"
                          />
                        )}
                      </a>
                    </Link>
                  </>
                ) : (
                  <Link href={page}>
                    <a className={pathname === page ? 'active' : undefined}>
                      {label}
                      {theme == 'dark' ? (
                        <ReactTooltip
                          place="bottom"
                          type="light"
                          effect="solid"
                        />
                      ) : (
                        <ReactTooltip
                          place="bottom"
                          type="dark"
                          effect="solid"
                        />
                      )}
                    </a>
                  </Link>
                )}
              </li>
            ))}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HeadlineAbout

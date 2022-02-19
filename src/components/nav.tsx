import Link from 'next/link'

import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'

import ThemeToggle from './themetoggle'
import ReactTooltip from 'react-tooltip'
import { FiFeather } from 'react-icons/fi'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'About', page: '/' },
]

const Nav = ({ titlePre = '' }) => {
  const { pathname } = useRouter()

  const { theme } = useTheme()

  return (
    <div className="nav">
      <ul>
        {navItems.map(({ label, page, link }) => (
          <li className="nav-list-item" key={label}>
            {label == 'About' ? (
              <>
                <Link href={page}>
                  <a
                    data-tip={label}
                    className={pathname === page ? 'active' : undefined}
                  >
                    <FiFeather />
                    {theme == 'dark' ? (
                      <ReactTooltip
                        place="bottom"
                        type="light"
                        effect="solid"
                      />
                    ) : (
                      <ReactTooltip place="bottom" type="dark" effect="solid" />
                    )}
                  </a>
                </Link>
              </>
            ) : (
              <Link href={page}>
                <a className={pathname === page ? 'active' : undefined}>
                  {label}
                  {theme == 'dark' ? (
                    <ReactTooltip place="bottom" type="light" effect="solid" />
                  ) : (
                    <ReactTooltip place="bottom" type="dark" effect="solid" />
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
  )
}

export default Nav

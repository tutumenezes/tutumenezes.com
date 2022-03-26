import Link from 'next/link'

import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'

import ThemeToggle from './themetoggle'
import ReactTooltip from 'react-tooltip'
import { FiFeather, FiHome } from 'react-icons/fi'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'About', page: '/about' },
  { label: 'Home', page: '/' },
]

const Nav = ({ titlePre = '' }) => {
  const { pathname } = useRouter()
  const { theme } = useTheme()

  return (
    <div className="nav">
      <ul>
        {pathname === '/about' && (
          <li className="nav-list-item" key={'about'}>
            <Link href={'/'} as={'/'}>
              <a data-tip={'Home'} className={'active'}>
                <FiHome />
                {theme == 'dark' ? (
                  <ReactTooltip place="bottom" type="light" effect="solid" />
                ) : (
                  <ReactTooltip place="bottom" type="dark" effect="solid" />
                )}
              </a>
            </Link>
          </li>
        )}
        {pathname !== '/about' && (
          <li className="nav-list-item" key={'about'}>
            <Link href={'/about'} as={'/about'}>
              <a data-tip={'About'} className={'active'}>
                <FiFeather />
                {theme == 'dark' ? (
                  <ReactTooltip place="bottom" type="light" effect="solid" />
                ) : (
                  <ReactTooltip place="bottom" type="dark" effect="solid" />
                )}
              </a>
            </Link>
          </li>
        )}
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </div>
  )
}

export default Nav

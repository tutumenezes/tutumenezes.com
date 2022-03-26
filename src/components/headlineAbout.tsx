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
      </div>
    </div>
  )
}

export default HeadlineAbout

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import ExtLink from './ext-link'

import ThemeToggle from './themetoggle'
import ReactTooltip from 'react-tooltip'
import { FiCircle } from 'react-icons/fi'
import Nav from './nav'

// import Nav from './nav'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'About', page: '/' },
]

//todo: update this image and try to make it dynamic for twitter shares
const ogImageUrl = 'https://notion-blog.now.sh/og-image.png'

const Header = ({ titlePre = '' }) => {
  const { pathname } = useRouter()

  const { theme } = useTheme()

  // Sticky Menu Hook and className const
  useEffect(() => {
    window.addEventListener('scroll', isSticky)
    return () => {
      window.removeEventListener('scroll', isSticky)
    }
  })

  //scrool to top when clicking h1
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const isSticky = (e) => {
    const header = document.querySelector('.header')
    const scrollTop = window.scrollY
    scrollTop >= 132
      ? header.classList.add('is-sticky')
      : header.classList.remove('is-sticky')
  }

  return (
    <header className={'header'}>
      <Head>
        <title>{titlePre ? `${titlePre} |` : ''} Tutu Menezes </title>
        <meta
          name="description"
          content="Tutu Menezes — digital and product designer portfolio"
        />
        <meta name="og:title" content="tutumenezes.com" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@tutumenezes" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>
      <div className="header-container">
        <h1
          id="start"
          onClick={() => scrollToTop()}
          className={pathname === '/#start' ? 'active' : undefined}
        >
          <Link href="/">
            <a>tutu menezes</a>
          </Link>
        </h1>
        <Nav />
      </div>
    </header>
  )
}

export default Header

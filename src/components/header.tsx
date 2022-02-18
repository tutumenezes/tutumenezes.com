import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import ExtLink from './ext-link'

import ThemeToggle from './themetoggle'
import ReactTooltip from 'react-tooltip'
import { FiCircle } from 'react-icons/fi'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'About', page: '/' },
]

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

  const isSticky = (e) => {
    const header = document.querySelector('.header')
    const scrollTop = window.scrollY
    scrollTop >= 32
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

      <h1 className={pathname === '/' ? 'active' : undefined}>
        <Link href="/">tutumenezes</Link>
      </h1>

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
                    <FiCircle />
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
    </header>
  )
}

export default Header

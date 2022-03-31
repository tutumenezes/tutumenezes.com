import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Nav from './nav'

const domain = process.env.NEXT_PUBLIC_GTM_DOMAIN
const ogImageUrl =
  'https://' + domain + '/_next/image?url=%2Fog-image.png&w=640&q=75'

const Header = ({
  titlePre = '',
  dynamicOgImageURL = ogImageUrl,
  ogImageAlt = '',
  ogSlug = '',
  preview = '',
  updatedTime = '',
}) => {
  //set pathname variable that will be added to page's title
  const { pathname } = useRouter()

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
          content="design portfolio: digital, product, code, interactive installations and more"
        />
        <meta
          name="og:title"
          content={titlePre ? titlePre + ' | Tutu Menezes' : 'Tutu Menezes'}
        />
        <meta
          property="og:description"
          content={
            preview
              ? preview
              : 'Personal Design Portfolio - Digital, Product Design, Code, Interactive Installations and more'
          }
        />
        <meta property="og:site_name" content={'Tutu Menezes'}></meta>
        <meta
          property="og:image:secure_url"
          content={dynamicOgImageURL ? dynamicOgImageURL : ogImageUrl}
        />
        <meta
          property="og:image"
          content={dynamicOgImageURL ? dynamicOgImageURL : ogImageUrl}
        />
        <meta
          property="og:url"
          content={
            ogSlug
              ? 'https://tutumenezes.com/' + ogSlug
              : 'https://tutumenezes.com'
          }
        />
        <meta name="twitter:site" content="@tutumenezes" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content={dynamicOgImageURL ? dynamicOgImageURL : ogImageUrl}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:updated_time"
          content={updatedTime ? updatedTime : undefined}
        />
        <meta
          property="og:image"
          content={dynamicOgImageURL ? dynamicOgImageURL : ogImageUrl}
        />
        <meta
          property="og:image:alt"
          content={ogImageAlt ? ogImageAlt : 'Post Cover Image'}
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
      </Head>

      <div className="header-container">
        <h1
          id="start"
          onClick={() => scrollToTop()}
          className={pathname === '/#start' ? 'active' : undefined}
        >
          <Link href="/">
            <a
              className="site-logo"
              title={
                'Tutu Menezes - click here to scroll to top or go to homepage'
              }
            >
              tutu menezes
            </a>
          </Link>
        </h1>
        <Nav />
      </div>
    </header>
  )
}

export default Header

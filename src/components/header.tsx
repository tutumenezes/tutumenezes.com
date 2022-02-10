import Link from 'next/link'
import Head from 'next/head'
import ExtLink from './ext-link'
import { useRouter } from 'next/router'
import themelight from '../styles/theme.light'
import styles from '../styles/header.module.css'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'about', page: '/' },
]

const ogImageUrl = 'https://notion-blog.now.sh/og-image.png'

const Header = ({ titlePre = '' }) => {
  const { pathname } = useRouter()

  return (
    <header className={styles.header}>
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
        <style jsx global>{`
          h1 {
            font-family: ${themelight.fontFamily.serif};
            font-size: ${themelight.fontSize.extralarge};
            font-weight: ${themelight.fontWeight.bold};
            text-align: center;
            color: ${themelight.colors.text};
          }
        `}</style>
      </h1>

      <ul>
        {navItems.map(({ label, page, link }) => (
          <li key={label}>
            {page ? (
              <Link href={page}>
                <a className={pathname === page ? 'active' : undefined}>
                  {label}
                </a>
              </Link>
            ) : (
              <ExtLink href={link}>{label}</ExtLink>
            )}
          </li>
        ))}
        <li key="dark-mode">dark-mode</li>
      </ul>
    </header>
  )
}

export default Header

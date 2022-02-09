import Link from 'next/link'
import Head from 'next/head'
import ExtLink from './ext-link'
import { useRouter } from 'next/router'
import styles from '../styles/header.module.css'
import MudeLogo from '../components/svgs/mudelogo'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'Para Alunos e Alunas', page: 'https://mude.fit/' },
  { label: 'Para dar Aulas', page: 'https://mude.fit/para-dar-aulas/' },
  { label: 'Para Mídia e Patrocínio', page: 'https://mude.fit/para-parcerias/' },
  { label: 'Blog', page: '/' },
  { label: 'Projetos', page: 'https://mude.fit/para-dar-aulas/' },
  { label: 'Contatos', page: 'https://mude.fit/contato/' },
]

const ogImageUrl = 'https://notion-blog.now.sh/og-image.png'

const Header = ({ titlePre = '' }) => {
  const { pathname } = useRouter()

  return (
    <header className={styles.header}>
      <Head>
        <title>{titlePre ? `${titlePre} |` : ''} Blog da Mude </title>
        <meta
          name="description"
          content="An example Next.js site using Notion for the blog"
        />
        <meta name="og:title" content="Mude Blog" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@mudehq" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>
      <ul>
        <MudeLogo />
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
      </ul>
    </header>
  )
}

export default Header

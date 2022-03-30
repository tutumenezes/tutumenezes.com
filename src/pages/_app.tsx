import '../styles/index.scss'

import { ThemeProvider } from 'next-themes'
import Layout from '../components/layout'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gTag'
import Analytics from '../components/analytics'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </ThemeProvider>
  )
}

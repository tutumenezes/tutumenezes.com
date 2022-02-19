import '../styles/index.scss'

import { ThemeProvider } from 'next-themes'
import Layout from '../components/layout'

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

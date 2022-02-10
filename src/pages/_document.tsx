import Document, { Html, Head, Main, NextScript } from 'next/document'
import themelight from '../styles/theme.light'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
        <style jsx global>{`
          body {
            background: ${themelight.colors.background};
            color: ${themelight.colors.text};
            font-family: ${themelight.fontFamily.sansSerif};
          }
        `}</style>
      </Html>
    )
  }
}

export default MyDocument

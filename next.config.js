const fs = require('fs')
const path = require('path')
const {
  NOTION_API_KEY,
  NOTION_DATABASE_ID,
} = require('./src/lib/notion/server-constants')

try {
  fs.unlinkSync(path.resolve('.blog_index_data'))
} catch (_) {
  /* non fatal */
}
try {
  fs.unlinkSync(path.resolve('.blog_index_data_previews'))
} catch (_) {
  /* non fatal */
}

const warnOrError =
  process.env.NODE_ENV !== 'production'
    ? console.warn
    : (msg) => {
        throw new Error(msg)
      }

if (!NOTION_API_KEY) {
  // We aren't able to build or serve images from Notion without the
  // NOTION_API_KEY being populated
  warnOrError(
    `\NOTION_API_KEY is missing from env, this will result in an error\n` +
      `Make sure to provide one before starting Next.js`
  )
}

if (!NOTION_DATABASE_ID) {
  // We aren't able to build or serve images from Notion without the
  // NOTION_DATABASE_ID being populated
  warnOrError(
    `\NOTION_DATABASE_ID is missing from env, this will result in an error\n` +
      `Make sure to provide one before starting Next.js`
  )
}

module.exports = {
  images: {
    domains: [
      's3.us-west-2.amazonaws.com',
      'drive.google.com',
      'doc-14-3g-docs.googleusercontent.com',
      'i.ibb.co',
    ],
  },

  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/',
        permanent: true,
      },
    ]
  },

  webpack(cfg, { dev }) {
    // only compile build-rss in production server build
    if (dev || cfg.name !== 'server') return cfg

    // we're in build mode so enable shared caching for Notion data
    process.env.USE_CACHE = 'false'

    const originalEntry = cfg.entry
    cfg.entry = async () => {
      const entries = { ...(await originalEntry()) }
      entries['build-rss.js'] = './src/lib/build-rss.ts'
      return entries
    }
    return cfg
  },

  typescript: {
    ignoreBuildErrors: true,
  },
}

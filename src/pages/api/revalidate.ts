import { NextApiRequest, NextApiResponse } from 'next'
import { getStaticPaths as blog_getStaticPaths } from '../blog/[slug]'
import { getStaticPaths as autoria_getStaticPaths } from '../autoria/[author]'
import { getStaticPaths as editorias_getStaticPaths } from '../editorias/[editoria]'
import { getStaticPaths as tags_getStaticPaths } from '../tags/[category]'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const startTime = Date.now()
  console.log(new Date(), '[API] Revalidate Start')

  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const paths = [
      '/',
      ...(await blog_getStaticPaths()).paths,
      '/autoria',
      ...(await autoria_getStaticPaths()).paths,
      '/editorias',
      ...(await editorias_getStaticPaths()).paths,
      '/tags',
      ...(await tags_getStaticPaths()).paths,
    ]

    await Promise.all(paths.map((path) => res.revalidate(path)))

    console.log(new Date(), '[API] Revalidate End', paths)

    return res.json({
      revalidated: true,
      duration: Date.now() - startTime,
      paths,
    })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}

import { NextApiRequest, NextApiResponse } from 'next'

export function setHeaders(req: NextApiRequest, res: NextApiResponse): boolean {
  // set SPR/CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'pragma')

  if (req.method === 'OPTIONS') {
    res.status(200)
    res.end()
    return true
  }
  return false
}

export async function handleData(res: NextApiResponse, data: any) {
  data = data || { status: 'error', message: 'unhandled request' }
  res.status(data.status !== 'error' ? 200 : 500)
  res.json(data)
}

export function handleError(res: NextApiResponse, error: string | Error) {
  console.error(error)
  res.status(500).json({
    status: 'error',
    message: 'an error occurred processing request',
  })
}

type FileOrExternal = {
  type: 'file' | 'external'
  external?: { url: string }
  file?: { url: string }
}

export const getFileUrl = (file: FileOrExternal) => {
  return file.type === 'external' ? file.external.url : file.file.url
}

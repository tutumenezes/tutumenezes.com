import Link from 'next/link'
import { FC } from 'react'

type Props = {
  preview?: boolean
}

const PreviewMode: FC<Props> = ({ preview }) => {
  if (!preview) {
    return null
  }

  return (
    <div className={'previewAlertContainer'}>
      <div className={'previewAlert'}>
        <b>obs:</b>
        {` `}Vendo em modo de Preview{' '}
        <Link href={`/api/clear-preview`}>
          <button className={'escapePreview'}>Sair de Preview</button>
        </Link>
      </div>
    </div>
  )
}

export default PreviewMode

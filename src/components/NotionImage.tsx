// import NextImage from 'next/image'
import { useState } from 'react'
import Image from 'next/image'

export const NotionImage: React.FC<{
  src: string
  alt: string
  blockId: string
}> = ({ src, alt, blockId }) => {
  const [imageSrc, setImageSrc] = useState(src)
  const [paddingTop, setPaddingTop] = useState('0')

  return (
    <div className="imageContainer" style={{ paddingTop }}>
      <Image
        src={imageSrc}
        layout="fill"
        objectFit="contain"
        alt={alt}
        objectPosition="center"
        unoptimized={process.env.NODE_ENV !== 'production'}
        onLoad={({ target }) => {
          const { naturalWidth, naturalHeight } = target as HTMLImageElement
          setPaddingTop(`calc(60% / (${naturalWidth} / ${naturalHeight})`)
        }}
        onError={async () => {
          const res = await fetch(`/api/image?blockId=${blockId}`).then((res) =>
            res.json()
          )
          setImageSrc(res.imageSrc)
        }}
      />
    </div>
  )
}

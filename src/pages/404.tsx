import Header from '../components/header'
import Image from 'next/image'

export default function pageNotFound() {
  return (
    <>
      <Header titlePre="Page Not Found" />
      <div className="main-container page-not-found">
        <div className="centralized">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <h3>It seems that what you're looking for is not here</h3>
          <div className="gif-wrapper">
            <Image
              src="/giphy.webp"
              alt="Jhon Travolta is Confused Meme Gif"
              layout="fill"
            />
          </div>
        </div>
      </div>
    </>
  )
}

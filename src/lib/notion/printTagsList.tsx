import Link from 'next/link'
import { getCategoryLink } from '../blog-helpers'

export function printTagsList(tagsArr, hasHeader) {
  return (
    <div className="tags-section-list section-container">
      {hasHeader ? <h3>Tags</h3> : ''}

      {tagsArr.map((tag) => {
        return (
          <Link href={getCategoryLink(tag)} as={getCategoryLink(tag)}>
            <a href={getCategoryLink(tag)} className="tagItem">
              <span>#</span>
              {tag}
            </a>
          </Link>
        )
      })}
    </div>
  )
}

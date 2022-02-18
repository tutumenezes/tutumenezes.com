export function getPostTags(tagString) {
  const tags: any[] = tagString.split(',')

  return tags.map((tag) => (
    <a href="/" className="tag-item">
      #{tag}
    </a>
  ))
}

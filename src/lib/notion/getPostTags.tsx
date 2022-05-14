export function getPostTags(tagsArr) {
  return tagsArr.map((tag) => (
    <a
      title={'filtre por posts com a tag ' + tag}
      href={'/type/' + tag}
      key={tag}
      className="tag-item"
    >
      #{tag}
    </a>
  ))
}

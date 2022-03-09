export const getBlogLink = (slug: string) => {
  return `/${slug}`
}

export const getCategoryLink = (tag: string) => {
  return `/tags/${tag}`
}

export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index
}

export const getArticleLink = (slug: string) => {
  return `/article/${slug}`
}

export const getDateStr = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
  })
}

export const postIsPublished = (post: any) => {
  return post.Published === 'Yes'
}

export const normalizeSlug = (slug) => {
  if (typeof slug !== 'string') return slug

  let startingSlash = slug.startsWith('/')
  let endingSlash = slug.endsWith('/')

  if (startingSlash) {
    slug = slug.substr(1)
  }
  if (endingSlash) {
    slug = slug.substr(0, slug.length - 1)
  }
  return startingSlash || endingSlash ? normalizeSlug(slug) : slug
}

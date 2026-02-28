import type { NamedNode, Store } from '@mashlib-next/store'
import { SCHEMA, DCT, FOAF } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'

/**
 * Format a date string for article display.
 */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Get author name, resolving structured nodes.
 */
function getAuthorName(authorNode: NamedNode, store: Store): string {
  return (
    store.any(authorNode, SCHEMA('name'), null, null)?.value ??
    store.any(authorNode, FOAF('name'), null, null)?.value ??
    labelFromUri(authorNode.value)
  )
}

/**
 * Render the article into the container.
 */
export function renderArticle(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  container.innerHTML = ''

  const wrapper = document.createElement('article')
  wrapper.className = 'article-view'

  // Title
  const title =
    store.any(subject, SCHEMA('headline'), null, null)?.value ??
    store.any(subject, SCHEMA('name'), null, null)?.value ??
    store.any(subject, DCT('title'), null, null)?.value ??
    labelFromUri(subject.value)

  const titleEl = document.createElement('h1')
  titleEl.className = 'article-title'
  titleEl.textContent = title
  wrapper.appendChild(titleEl)

  // Byline: author + date
  const authorNode = store.any(subject, SCHEMA('author'), null, null)
  const datePublished = store.any(subject, SCHEMA('datePublished'), null, null)?.value
  const dateCreated = store.any(subject, DCT('created'), null, null)?.value
  const pubDate = datePublished ?? dateCreated

  if (authorNode || pubDate) {
    const byline = document.createElement('div')
    byline.className = 'article-byline'

    if (authorNode) {
      const authorEl = document.createElement('span')
      authorEl.className = 'article-author'
      authorEl.textContent = getAuthorName(authorNode as NamedNode, store)
      byline.appendChild(authorEl)
    }

    if (pubDate) {
      const dateEl = document.createElement('time')
      dateEl.className = 'article-date'
      dateEl.dateTime = pubDate
      dateEl.textContent = formatDate(pubDate)
      byline.appendChild(dateEl)
    }

    wrapper.appendChild(byline)
  }

  // Hero image
  const imageUrl =
    store.any(subject, SCHEMA('image'), null, null)?.value ??
    store.any(subject, SCHEMA('thumbnailUrl'), null, null)?.value
  if (imageUrl) {
    const imgEl = document.createElement('img')
    imgEl.className = 'article-image'
    imgEl.src = imageUrl
    imgEl.alt = title
    wrapper.appendChild(imgEl)
  }

  // Description / abstract
  const description =
    store.any(subject, SCHEMA('description'), null, null)?.value ??
    store.any(subject, SCHEMA('abstract'), null, null)?.value ??
    store.any(subject, DCT('abstract'), null, null)?.value
  if (description) {
    const descEl = document.createElement('p')
    descEl.className = 'article-description'
    descEl.textContent = description
    wrapper.appendChild(descEl)
  }

  // Body
  const body = store.any(subject, SCHEMA('articleBody'), null, null)?.value
  if (body) {
    const bodyEl = document.createElement('div')
    bodyEl.className = 'article-body'
    // Split paragraphs on double newlines
    const paragraphs = body.split(/\n\n+/)
    for (const para of paragraphs) {
      const trimmed = para.trim()
      if (!trimmed) continue
      const p = document.createElement('p')
      p.textContent = trimmed
      bodyEl.appendChild(p)
    }
    wrapper.appendChild(bodyEl)
  }

  // Publisher
  const publisherNode = store.any(subject, SCHEMA('publisher'), null, null)
  if (publisherNode) {
    const pubName =
      store.any(publisherNode as NamedNode, SCHEMA('name'), null, null)?.value ??
      labelFromUri(publisherNode.value)
    const pubEl = document.createElement('p')
    pubEl.className = 'article-publisher'
    pubEl.textContent = `Published by ${pubName}`
    wrapper.appendChild(pubEl)
  }

  // Keywords
  const keywords = store.each(subject, SCHEMA('keywords'), null, null)
  if (keywords.length > 0) {
    const tagsEl = document.createElement('div')
    tagsEl.className = 'article-tags'
    for (const kw of keywords) {
      const tag = document.createElement('span')
      tag.className = 'article-tag'
      tag.textContent = kw.value
      tagsEl.appendChild(tag)
    }
    wrapper.appendChild(tagsEl)
  }

  container.appendChild(wrapper)
}

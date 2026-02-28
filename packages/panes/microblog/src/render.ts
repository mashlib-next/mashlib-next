import type { NamedNode, Store } from '@mashlib-next/store'
import { SIOC, SIOCt, DCT, DC, FOAF, SCHEMA, RDF } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'

interface MicroblogPost {
  uri: string
  content: string
  created: Date | null
  creator: string | null
  creatorUri: string | null
}

/**
 * Get the microblog title.
 */
function getTitle(subject: NamedNode, store: Store): string {
  return (
    store.any(subject, DCT('title'), null, null)?.value ??
    store.any(subject, DC('title'), null, null)?.value ??
    store.any(subject, SCHEMA('name'), null, null)?.value ??
    store.any(subject, SIOC('name'), null, null)?.value ??
    'Microblog'
  )
}

/**
 * Get display name for a creator.
 */
function getCreatorName(creatorNode: NamedNode, store: Store): string {
  return (
    store.any(creatorNode, FOAF('name'), null, null)?.value ??
    store.any(creatorNode, SCHEMA('name'), null, null)?.value ??
    labelFromUri(creatorNode.value)
  )
}

/**
 * Check if subject is a single post rather than a feed.
 */
function isSinglePost(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  return types.some(t => t.value === SIOCt('MicroblogPost').value)
}

/**
 * Extract a single post from a node.
 */
function extractPost(node: NamedNode, store: Store): MicroblogPost {
  const content =
    store.any(node, SIOC('content'), null, null)?.value ??
    store.any(node, DCT('description'), null, null)?.value ??
    store.any(node, DC('description'), null, null)?.value ??
    ''

  const createdStr =
    store.any(node, DCT('created'), null, null)?.value ??
    store.any(node, DC('date'), null, null)?.value
  const created = createdStr ? new Date(createdStr) : null

  const creatorNode =
    store.any(node, SIOC('has_creator'), null, null) ??
    store.any(node, FOAF('maker'), null, null) ??
    store.any(node, DCT('creator'), null, null)

  let creator: string | null = null
  let creatorUri: string | null = null
  if (creatorNode) {
    creatorUri = creatorNode.value
    if (creatorNode.termType === 'NamedNode') {
      creator = getCreatorName(creatorNode as NamedNode, store)
    } else {
      creator = creatorNode.value
    }
  }

  return { uri: node.value, content, created, creator, creatorUri }
}

/**
 * Get all posts from a microblog container.
 */
function getPosts(subject: NamedNode, store: Store): MicroblogPost[] {
  const postNodes = store.each(subject, SIOC('container_of'), null, null)
  const posts: MicroblogPost[] = []

  for (const node of postNodes) {
    if (node.termType === 'NamedNode') {
      posts.push(extractPost(node as NamedNode, store))
    }
  }

  // Sort newest first
  posts.sort((a, b) => {
    if (!a.created && !b.created) return 0
    if (!a.created) return 1
    if (!b.created) return -1
    return b.created.getTime() - a.created.getTime()
  })

  return posts
}

/**
 * Format a timestamp for display.
 */
function formatTimestamp(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffHr = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMin < 1) return 'just now'
  if (diffMin < 60) return `${diffMin}m ago`
  if (diffHr < 24) return `${diffHr}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  })
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Render post content with URL detection.
 */
function renderContent(content: string, el: HTMLElement): void {
  const urlPattern = /(https?:\/\/[^\s<>"]+)/g
  const parts = content.split(urlPattern)

  for (const part of parts) {
    if (urlPattern.test(part)) {
      urlPattern.lastIndex = 0
      const link = document.createElement('a')
      link.href = part
      link.textContent = part
      link.target = '_blank'
      link.rel = 'noopener'
      el.appendChild(link)
    } else if (part) {
      el.appendChild(document.createTextNode(part))
    }
  }
}

/**
 * Render a single post element.
 */
function renderPost(post: MicroblogPost): HTMLElement {
  const postEl = document.createElement('div')
  postEl.className = 'microblog-post'

  // Header: author + timestamp
  const headerEl = document.createElement('div')
  headerEl.className = 'microblog-post-header'

  if (post.creator) {
    const authorEl = document.createElement('span')
    authorEl.className = 'microblog-post-author'
    authorEl.textContent = post.creator
    if (post.creatorUri) authorEl.title = post.creatorUri
    headerEl.appendChild(authorEl)
  }

  if (post.created) {
    const timeEl = document.createElement('time')
    timeEl.className = 'microblog-post-time'
    timeEl.dateTime = post.created.toISOString()
    timeEl.textContent = formatTimestamp(post.created)
    headerEl.appendChild(timeEl)
  }

  postEl.appendChild(headerEl)

  // Content
  const contentEl = document.createElement('div')
  contentEl.className = 'microblog-post-content'
  renderContent(post.content, contentEl)
  postEl.appendChild(contentEl)

  // Character count indicator
  const charCount = post.content.length
  if (charCount > 0) {
    const countEl = document.createElement('span')
    countEl.className = 'microblog-char-count'
    countEl.textContent = `${charCount}`
    postEl.appendChild(countEl)
  }

  return postEl
}

/**
 * Render the microblog into the container.
 */
export function renderMicroblog(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  container.innerHTML = ''

  const wrapper = document.createElement('div')
  wrapper.className = 'microblog-view'

  // Check if this is a single post
  if (isSinglePost(subject, store)) {
    const post = extractPost(subject, store)
    const header = document.createElement('h2')
    header.className = 'microblog-title'
    header.textContent = 'Microblog Post'
    wrapper.appendChild(header)
    wrapper.appendChild(renderPost(post))
    container.appendChild(wrapper)
    return
  }

  // Feed view
  const title = getTitle(subject, store)
  const header = document.createElement('h2')
  header.className = 'microblog-title'
  header.textContent = title
  wrapper.appendChild(header)

  // Description
  const description =
    store.any(subject, DCT('description'), null, null)?.value ??
    store.any(subject, DC('description'), null, null)?.value
  if (description) {
    const descEl = document.createElement('p')
    descEl.className = 'microblog-description'
    descEl.textContent = description
    wrapper.appendChild(descEl)
  }

  const posts = getPosts(subject, store)

  // Post count
  const countEl = document.createElement('p')
  countEl.className = 'microblog-count'
  countEl.textContent = `${posts.length} post${posts.length !== 1 ? 's' : ''}`
  wrapper.appendChild(countEl)

  if (posts.length === 0) {
    const empty = document.createElement('p')
    empty.className = 'microblog-empty'
    empty.textContent = 'No posts yet.'
    wrapper.appendChild(empty)
    container.appendChild(wrapper)
    return
  }

  // Posts feed
  const feed = document.createElement('div')
  feed.className = 'microblog-feed'

  for (const post of posts) {
    feed.appendChild(renderPost(post))
  }

  wrapper.appendChild(feed)
  container.appendChild(wrapper)
}

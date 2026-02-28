import type { NamedNode, Store } from '@mashlib-next/store'
import { PAD, SIOC, DC, DCT, FOAF, SCHEMA } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'

interface PadChunk {
  uri: string
  content: string
  author: string | null
  authorUri: string | null
}

/**
 * Get the pad title.
 */
function getPadTitle(subject: NamedNode, store: Store): string {
  return (
    store.any(subject, DCT('title'), null, null)?.value ??
    store.any(subject, DC('title'), null, null)?.value ??
    store.any(subject, SCHEMA('name'), null, null)?.value ??
    'Notepad'
  )
}

/**
 * Get author display name.
 */
function getAuthorName(authorNode: NamedNode, store: Store): string {
  return (
    store.any(authorNode, FOAF('name'), null, null)?.value ??
    store.any(authorNode, SCHEMA('name'), null, null)?.value ??
    labelFromUri(authorNode.value)
  )
}

/**
 * Walk the linked-list structure of pad chunks.
 * Structure: subject → pad:next → chunk1 → pad:next → chunk2 → ... → subject (cycle)
 */
function getChunks(subject: NamedNode, store: Store): PadChunk[] {
  const chunks: PadChunk[] = []
  const visited = new Set<string>()
  let current = store.any(subject, PAD('next'), null, null)

  while (current && current.termType === 'NamedNode' && !visited.has(current.value)) {
    // Stop if we've looped back to subject
    if (current.value === subject.value) break

    visited.add(current.value)
    const node = current as NamedNode

    const content =
      store.any(node, SIOC('content'), null, null)?.value ??
      store.any(node, DC('description'), null, null)?.value ??
      ''

    const authorNode =
      store.any(node, DC('author'), null, null) ??
      store.any(node, DCT('creator'), null, null) ??
      store.any(node, FOAF('maker'), null, null)

    let author: string | null = null
    let authorUri: string | null = null
    if (authorNode) {
      authorUri = authorNode.value
      if (authorNode.termType === 'NamedNode') {
        author = getAuthorName(authorNode as NamedNode, store)
      } else {
        author = authorNode.value
      }
    }

    chunks.push({ uri: node.value, content, author, authorUri })
    current = store.any(node, PAD('next'), null, null)
  }

  return chunks
}

/**
 * Get creation date of the pad.
 */
function getCreatedDate(subject: NamedNode, store: Store): string | null {
  const dateStr =
    store.any(subject, DCT('created'), null, null)?.value ??
    store.any(subject, DC('date'), null, null)?.value
  if (!dateStr) return null
  const date = new Date(dateStr)
  return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString()
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Render the pad into the container.
 */
export function renderPad(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  container.innerHTML = ''

  const wrapper = document.createElement('div')
  wrapper.className = 'pad-view'

  // Title
  const title = getPadTitle(subject, store)
  const header = document.createElement('h2')
  header.className = 'pad-title'
  header.textContent = title
  wrapper.appendChild(header)

  // Metadata row
  const meta = document.createElement('div')
  meta.className = 'pad-meta'

  const createdDate = getCreatedDate(subject, store)
  if (createdDate) {
    const dateEl = document.createElement('span')
    dateEl.className = 'pad-date'
    dateEl.textContent = `Created: ${createdDate}`
    meta.appendChild(dateEl)
  }

  // Pad author
  const padAuthor =
    store.any(subject, DC('author'), null, null) ??
    store.any(subject, DCT('creator'), null, null)
  if (padAuthor && padAuthor.termType === 'NamedNode') {
    const authorName = getAuthorName(padAuthor as NamedNode, store)
    const authorEl = document.createElement('span')
    authorEl.className = 'pad-author'
    authorEl.textContent = `Author: ${authorName}`
    meta.appendChild(authorEl)
  }

  if (meta.children.length > 0) {
    wrapper.appendChild(meta)
  }

  // Chunks (the pad content)
  const chunks = getChunks(subject, store)

  if (chunks.length === 0) {
    const empty = document.createElement('p')
    empty.className = 'pad-empty'
    empty.textContent = 'This notepad is empty.'
    wrapper.appendChild(empty)
    container.appendChild(wrapper)
    return
  }

  const contentArea = document.createElement('div')
  contentArea.className = 'pad-content'

  // Collect unique authors for a multi-author pad
  const uniqueAuthors = new Set(chunks.filter(c => c.author).map(c => c.authorUri))
  const isMultiAuthor = uniqueAuthors.size > 1

  for (const chunk of chunks) {
    const chunkEl = document.createElement('div')
    chunkEl.className = 'pad-chunk'

    if (isMultiAuthor && chunk.author) {
      const authorTag = document.createElement('span')
      authorTag.className = 'pad-chunk-author'
      authorTag.textContent = chunk.author
      if (chunk.authorUri) authorTag.title = chunk.authorUri
      chunkEl.appendChild(authorTag)
    }

    const textEl = document.createElement('div')
    textEl.className = 'pad-chunk-text'

    // Render content with line breaks preserved
    const lines = chunk.content.split('\n')
    for (let i = 0; i < lines.length; i++) {
      if (i > 0) textEl.appendChild(document.createElement('br'))
      textEl.appendChild(document.createTextNode(lines[i]))
    }

    chunkEl.appendChild(textEl)
    contentArea.appendChild(chunkEl)
  }

  wrapper.appendChild(contentArea)

  // Chunk count
  const countEl = document.createElement('p')
  countEl.className = 'pad-count'
  countEl.textContent = `${chunks.length} chunk${chunks.length !== 1 ? 's' : ''}`
  wrapper.appendChild(countEl)

  container.appendChild(wrapper)
}

import type { NamedNode, Store } from '@mashlib-next/store'
import { LDP, RDF, DCT, POSIX, DC } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'

interface ContainedResource {
  uri: string
  name: string
  isContainer: boolean
  modified?: string
  size?: number
}

/**
 * Extract contained resources from the store for a given container subject.
 *
 * LDP containers use:
 *   <container/> ldp:contains <resource1>, <resource2>, ...
 *   <resource1> a ldp:Container .  (if it's a sub-folder)
 *   <resource1> posix:mtime "..." .
 *   <resource1> posix:size "..." .
 */
function extractContents(subject: NamedNode, store: Store): ContainedResource[] {
  const contained = store.each(subject, LDP('contains'), null, null)
  const resources: ContainedResource[] = []

  for (const item of contained) {
    const node = item as NamedNode
    const uri = node.value

    // Check if it's a container
    const types = store.each(node, RDF('type'), null, null).map(t => t.value)
    const isContainer =
      types.includes(LDP('Container').value) ||
      types.includes(LDP('BasicContainer').value) ||
      uri.endsWith('/')

    // Get name from URI
    const name = resourceName(uri, isContainer)

    // Get modification time
    const mtime = store.any(node, DCT('modified'), null, null)
      ?? store.any(node, POSIX('mtime'), null, null)
    const modified = mtime?.value

    // Get size
    const sizeNode = store.any(node, POSIX('size'), null, null)
    const size = sizeNode ? Number(sizeNode.value) : undefined

    resources.push({ uri, name, isContainer, modified, size })
  }

  // Sort: folders first, then alphabetically
  resources.sort((a, b) => {
    if (a.isContainer !== b.isContainer) return a.isContainer ? -1 : 1
    return a.name.localeCompare(b.name)
  })

  return resources
}

/**
 * Extract a human-readable name from a resource URI.
 */
function resourceName(uri: string, isContainer: boolean): string {
  // Remove trailing slash for containers
  const cleaned = isContainer ? uri.replace(/\/$/, '') : uri
  const segments = cleaned.split('/')
  return decodeURIComponent(segments[segments.length - 1] || uri)
}

/**
 * Format file size for display.
 */
function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * Format a date string or Unix timestamp for display.
 */
function formatDate(value: string): string {
  const num = Number(value)
  const date = Number.isNaN(num) ? new Date(value) : new Date(num * 1000)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Get the parent container URI (go up one level).
 */
function parentUri(uri: string): string | null {
  const cleaned = uri.replace(/\/$/, '')
  const lastSlash = cleaned.lastIndexOf('/')
  if (lastSlash <= 7) return null // don't go above scheme://host
  return cleaned.slice(0, lastSlash + 1)
}

/**
 * Render the folder listing into the container element.
 */
export function renderFolder(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  container.innerHTML = ''

  // Folder title
  const title =
    store.any(subject, DC('title'), null, null)?.value ??
    store.any(subject, DCT('title'), null, null)?.value ??
    resourceName(subject.value, true)

  const header = document.createElement('h2')
  header.textContent = title
  container.appendChild(header)

  const pathEl = document.createElement('p')
  pathEl.className = 'folder-path'
  pathEl.textContent = subject.value
  container.appendChild(pathEl)

  // Parent link
  const parent = parentUri(subject.value)
  if (parent) {
    const parentLink = document.createElement('a')
    parentLink.className = 'folder-parent'
    parentLink.href = `?uri=${encodeURIComponent(parent)}`
    parentLink.textContent = '\u2190 Parent folder'
    parentLink.addEventListener('click', (e) => {
      e.preventDefault()
      const input = document.getElementById('url-input') as HTMLInputElement | null
      if (input) {
        input.value = parent
        input.form?.dispatchEvent(new Event('submit', { cancelable: true }))
      }
    })
    container.appendChild(parentLink)
  }

  const resources = extractContents(subject, store)

  if (resources.length === 0) {
    const empty = document.createElement('p')
    empty.textContent = 'This folder is empty.'
    container.appendChild(empty)
    return
  }

  const table = document.createElement('table')
  table.className = 'folder-listing'

  const thead = document.createElement('thead')
  thead.innerHTML = '<tr><th></th><th>Name</th><th>Size</th><th>Modified</th></tr>'
  table.appendChild(thead)

  const tbody = document.createElement('tbody')

  for (const resource of resources) {
    const tr = document.createElement('tr')
    tr.className = resource.isContainer ? 'folder-row' : 'file-row'

    // Icon
    const iconTd = document.createElement('td')
    iconTd.className = 'folder-icon'
    iconTd.textContent = resource.isContainer ? '\u{1F4C1}' : '\u{1F4C4}'
    tr.appendChild(iconTd)

    // Name as link
    const nameTd = document.createElement('td')
    nameTd.className = 'folder-name'
    const link = document.createElement('a')
    link.href = `?uri=${encodeURIComponent(resource.uri)}`
    link.textContent = resource.name + (resource.isContainer ? '/' : '')
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const input = document.getElementById('url-input') as HTMLInputElement | null
      if (input) {
        input.value = resource.uri
        input.form?.dispatchEvent(new Event('submit', { cancelable: true }))
      }
    })
    nameTd.appendChild(link)
    tr.appendChild(nameTd)

    // Size
    const sizeTd = document.createElement('td')
    sizeTd.className = 'folder-size'
    sizeTd.textContent = resource.size != null ? formatSize(resource.size) : ''
    tr.appendChild(sizeTd)

    // Modified
    const modTd = document.createElement('td')
    modTd.className = 'folder-modified'
    modTd.textContent = resource.modified ? formatDate(resource.modified) : ''
    tr.appendChild(modTd)

    tbody.appendChild(tr)
  }

  table.appendChild(tbody)
  container.appendChild(table)
}

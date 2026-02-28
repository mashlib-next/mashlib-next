import type { NamedNode, Store } from '@mashlib-next/store'
import { LDP, RDF, DCT, POSIX, DC } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'

interface ContainedResource {
  uri: string
  name: string
  isContainer: boolean
  modified?: string
  size?: number
  contentType?: string
}

/**
 * Determine an icon for a resource based on file extension and type.
 */
function iconForResource(name: string, isContainer: boolean): string {
  if (isContainer) return '\u{1F4C1}' // folder

  const ext = name.split('.').pop()?.toLowerCase() ?? ''
  const iconMap: Record<string, string> = {
    // Images
    jpg: '\u{1F5BC}', jpeg: '\u{1F5BC}', png: '\u{1F5BC}', gif: '\u{1F5BC}',
    svg: '\u{1F5BC}', webp: '\u{1F5BC}', bmp: '\u{1F5BC}', ico: '\u{1F5BC}',
    // Audio
    mp3: '\u{1F3B5}', wav: '\u{1F3B5}', ogg: '\u{1F3B5}', flac: '\u{1F3B5}', m4a: '\u{1F3B5}',
    // Video
    mp4: '\u{1F3AC}', webm: '\u{1F3AC}', avi: '\u{1F3AC}', mov: '\u{1F3AC}', mkv: '\u{1F3AC}',
    // Documents
    pdf: '\u{1F4D1}', doc: '\u{1F4DD}', docx: '\u{1F4DD}',
    // Data
    ttl: '\u{1F4CA}', rdf: '\u{1F4CA}', jsonld: '\u{1F4CA}', n3: '\u{1F4CA}', nq: '\u{1F4CA}',
    json: '\u{1F4CB}', xml: '\u{1F4CB}', csv: '\u{1F4CB}',
    // Code
    js: '\u{1F4DC}', ts: '\u{1F4DC}', py: '\u{1F4DC}', html: '\u{1F4DC}', css: '\u{1F4DC}',
    // Text
    txt: '\u{1F4C4}', md: '\u{1F4C4}',
    // Archives
    zip: '\u{1F4E6}', tar: '\u{1F4E6}', gz: '\u{1F4E6}',
  }

  return iconMap[ext] ?? '\u{1F4C4}' // default file
}

/**
 * Extract contained resources from the store for a given container subject.
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

    // Get content type
    const contentType = store.any(node, DCT('format'), null, null)?.value ?? undefined

    resources.push({ uri, name, isContainer, modified, size, contentType })
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
 * Build breadcrumb trail from the URI.
 */
function buildBreadcrumbs(uri: string): { label: string; uri: string }[] {
  const crumbs: { label: string; uri: string }[] = []
  let current = uri

  // Walk up the path until we reach the origin
  while (true) {
    const name = resourceName(current, true)
    crumbs.unshift({ label: name || 'Root', uri: current })
    const parent = parentUri(current)
    if (!parent) break
    current = parent
  }

  return crumbs
}

/**
 * Navigate to a URI using the shell's URL input.
 */
function navigateTo(uri: string, e: Event): void {
  e.preventDefault()
  const input = document.getElementById('url-input') as HTMLInputElement | null
  if (input) {
    input.value = uri
    input.form?.dispatchEvent(new Event('submit', { cancelable: true }))
  }
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

  const wrapper = document.createElement('div')
  wrapper.className = 'folder-view'

  // Folder title
  const title =
    store.any(subject, DC('title'), null, null)?.value ??
    store.any(subject, DCT('title'), null, null)?.value ??
    resourceName(subject.value, true)

  const header = document.createElement('h2')
  header.className = 'folder-title'
  header.textContent = title
  wrapper.appendChild(header)

  // Breadcrumb navigation
  const crumbs = buildBreadcrumbs(subject.value)
  if (crumbs.length > 1) {
    const nav = document.createElement('nav')
    nav.className = 'folder-breadcrumbs'
    nav.setAttribute('aria-label', 'Folder path')

    for (let i = 0; i < crumbs.length; i++) {
      if (i > 0) {
        const sep = document.createElement('span')
        sep.className = 'folder-breadcrumb-sep'
        sep.textContent = ' / '
        nav.appendChild(sep)
      }

      if (i < crumbs.length - 1) {
        const link = document.createElement('a')
        link.className = 'folder-breadcrumb'
        link.href = `?uri=${encodeURIComponent(crumbs[i].uri)}`
        link.textContent = crumbs[i].label
        link.addEventListener('click', (e) => navigateTo(crumbs[i].uri, e))
        nav.appendChild(link)
      } else {
        const current = document.createElement('span')
        current.className = 'folder-breadcrumb-current'
        current.textContent = crumbs[i].label
        nav.appendChild(current)
      }
    }

    wrapper.appendChild(nav)
  }

  // Path display
  const pathEl = document.createElement('p')
  pathEl.className = 'folder-path'
  pathEl.textContent = subject.value
  wrapper.appendChild(pathEl)

  const resources = extractContents(subject, store)

  // Resource count
  const folders = resources.filter(r => r.isContainer)
  const files = resources.filter(r => !r.isContainer)
  const countParts: string[] = []
  if (folders.length > 0) countParts.push(`${folders.length} folder${folders.length !== 1 ? 's' : ''}`)
  if (files.length > 0) countParts.push(`${files.length} file${files.length !== 1 ? 's' : ''}`)

  const countEl = document.createElement('p')
  countEl.className = 'folder-count'
  countEl.textContent = countParts.length > 0 ? countParts.join(', ') : '0 items'
  wrapper.appendChild(countEl)

  if (resources.length === 0) {
    const empty = document.createElement('p')
    empty.className = 'folder-empty'
    empty.textContent = 'This folder is empty.'
    wrapper.appendChild(empty)
    container.appendChild(wrapper)
    return
  }

  const table = document.createElement('table')
  table.className = 'folder-listing'

  const thead = document.createElement('thead')
  thead.innerHTML = '<tr><th></th><th>Name</th><th>Type</th><th>Size</th><th>Modified</th></tr>'
  table.appendChild(thead)

  const tbody = document.createElement('tbody')

  for (const resource of resources) {
    const tr = document.createElement('tr')
    tr.className = resource.isContainer ? 'folder-row' : 'file-row'

    // Icon
    const iconTd = document.createElement('td')
    iconTd.className = 'folder-icon'
    iconTd.textContent = iconForResource(resource.name, resource.isContainer)
    tr.appendChild(iconTd)

    // Name as link
    const nameTd = document.createElement('td')
    nameTd.className = 'folder-name'
    const link = document.createElement('a')
    link.href = `?uri=${encodeURIComponent(resource.uri)}`
    link.textContent = resource.name + (resource.isContainer ? '/' : '')
    link.addEventListener('click', (e) => navigateTo(resource.uri, e))
    nameTd.appendChild(link)
    tr.appendChild(nameTd)

    // Content type
    const typeTd = document.createElement('td')
    typeTd.className = 'folder-type'
    if (resource.isContainer) {
      typeTd.textContent = 'Folder'
    } else if (resource.contentType) {
      typeTd.textContent = resource.contentType
    } else {
      typeTd.textContent = ''
    }
    tr.appendChild(typeTd)

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
  wrapper.appendChild(table)
  container.appendChild(wrapper)
}

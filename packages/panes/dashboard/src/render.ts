import type { NamedNode, Store } from '@mashlib-next/store'
import {
  RDF, LDP, FOAF, VCARD, SPACE, SOLID, DCT, DC, SCHEMA, POSIX,
} from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'

interface PodResource {
  uri: string
  label: string
  type: 'container' | 'resource'
}

/**
 * Get the pod owner's name.
 */
function getOwnerName(subject: NamedNode, store: Store): string | null {
  // Find who has this as storage
  const owners = store.each(null, SPACE('storage'), subject, null)
  for (const owner of owners) {
    if (owner.termType !== 'NamedNode') continue
    const name =
      store.any(owner as NamedNode, FOAF('name'), null, null)?.value ??
      store.any(owner as NamedNode, VCARD('fn'), null, null)?.value
    if (name) return name
  }

  // Try foaf:primaryTopic
  const topic = store.any(subject, FOAF('primaryTopic'), null, null)
  if (topic && topic.termType === 'NamedNode') {
    const name =
      store.any(topic as NamedNode, FOAF('name'), null, null)?.value ??
      store.any(topic as NamedNode, VCARD('fn'), null, null)?.value
    if (name) return name
  }

  // Fallback: extract from hostname
  try {
    const url = new URL(subject.value)
    const sub = url.hostname.split('.')[0]
    if (sub && sub !== 'www') return sub
  } catch {
    // ignore
  }

  return null
}

/**
 * Get owner WebID if available.
 */
function getOwnerWebId(subject: NamedNode, store: Store): string | null {
  const owners = store.each(null, SPACE('storage'), subject, null)
  for (const owner of owners) {
    if (owner.termType === 'NamedNode') return owner.value
  }

  const topic = store.any(subject, FOAF('primaryTopic'), null, null)
  if (topic && topic.termType === 'NamedNode') return topic.value

  return null
}

/**
 * Get top-level resources in the pod root container.
 */
function getContents(subject: NamedNode, store: Store): PodResource[] {
  const resources: PodResource[] = []

  const contained = store.each(subject, LDP('contains'), null, null)
  for (const item of contained) {
    if (item.termType !== 'NamedNode') continue
    const node = item as NamedNode
    const types = store.each(node, RDF('type'), null, null)
    const typeUris = types.map(t => t.value)

    const isContainer =
      typeUris.includes(LDP('Container').value) ||
      typeUris.includes(LDP('BasicContainer').value) ||
      node.value.endsWith('/')

    const label =
      store.any(node, DCT('title'), null, null)?.value ??
      store.any(node, DC('title'), null, null)?.value ??
      labelFromUri(node.value)

    resources.push({
      uri: node.value,
      label,
      type: isContainer ? 'container' : 'resource',
    })
  }

  // Sort: containers first, then alphabetically
  resources.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'container' ? -1 : 1
    return a.label.localeCompare(b.label)
  })

  return resources
}

/**
 * Get pod storage stats.
 */
function getStorageInfo(subject: NamedNode, store: Store): { typeLabel: string | null } {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)

  let typeLabel: string | null = null
  if (typeUris.includes(SOLID('Account').value)) typeLabel = 'Solid Account'
  else if (typeUris.includes(SPACE('Storage').value)) typeLabel = 'Solid Pod'

  return { typeLabel }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Render the dashboard into the container.
 */
export function renderDashboard(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  container.innerHTML = ''

  const wrapper = document.createElement('div')
  wrapper.className = 'dashboard-view'

  // Owner info
  const ownerName = getOwnerName(subject, store)
  const ownerWebId = getOwnerWebId(subject, store)

  const header = document.createElement('h2')
  header.className = 'dashboard-title'
  header.textContent = ownerName ? `${ownerName}'s Pod` : 'Solid Pod'
  wrapper.appendChild(header)

  // Pod URL
  const urlEl = document.createElement('p')
  urlEl.className = 'dashboard-url'
  const urlCode = document.createElement('code')
  urlCode.textContent = subject.value
  urlEl.appendChild(urlCode)
  wrapper.appendChild(urlEl)

  // Storage type badge
  const { typeLabel } = getStorageInfo(subject, store)
  if (typeLabel) {
    const badge = document.createElement('span')
    badge.className = 'dashboard-badge'
    badge.textContent = typeLabel
    wrapper.appendChild(badge)
  }

  // Owner profile link
  if (ownerWebId) {
    const profileSection = document.createElement('div')
    profileSection.className = 'dashboard-section'

    const profileTitle = document.createElement('h3')
    profileTitle.textContent = 'Profile'
    profileSection.appendChild(profileTitle)

    const profileLink = document.createElement('a')
    profileLink.className = 'dashboard-link'
    profileLink.href = `?uri=${encodeURIComponent(ownerWebId)}`
    profileLink.textContent = ownerName ? `View ${ownerName}'s profile` : 'View profile'
    profileLink.addEventListener('click', (e) => {
      e.preventDefault()
      const input = document.getElementById('url-input') as HTMLInputElement | null
      if (input) {
        input.value = ownerWebId
        input.form?.dispatchEvent(new Event('submit', { cancelable: true }))
      }
    })
    profileSection.appendChild(profileLink)
    wrapper.appendChild(profileSection)
  }

  // Contents (data section)
  const contents = getContents(subject, store)

  const dataSection = document.createElement('div')
  dataSection.className = 'dashboard-section'

  const dataTitle = document.createElement('h3')
  dataTitle.textContent = 'Data'
  dataSection.appendChild(dataTitle)

  if (contents.length === 0) {
    const empty = document.createElement('p')
    empty.className = 'dashboard-empty'
    empty.textContent = 'No visible contents.'
    dataSection.appendChild(empty)
  } else {
    const countEl = document.createElement('p')
    countEl.className = 'dashboard-count'
    const folders = contents.filter(c => c.type === 'container').length
    const files = contents.filter(c => c.type === 'resource').length
    const parts: string[] = []
    if (folders > 0) parts.push(`${folders} folder${folders !== 1 ? 's' : ''}`)
    if (files > 0) parts.push(`${files} file${files !== 1 ? 's' : ''}`)
    countEl.textContent = parts.join(', ')
    dataSection.appendChild(countEl)

    const list = document.createElement('ul')
    list.className = 'dashboard-contents'

    for (const item of contents) {
      const li = document.createElement('li')
      li.className = `dashboard-item dashboard-item-${item.type}`

      const icon = document.createElement('span')
      icon.className = 'dashboard-item-icon'
      icon.textContent = item.type === 'container' ? '\u{1F4C1}' : '\u{1F4C4}'
      li.appendChild(icon)

      const link = document.createElement('a')
      link.className = 'dashboard-item-link'
      link.href = `?uri=${encodeURIComponent(item.uri)}`
      link.textContent = item.label
      link.title = item.uri
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const input = document.getElementById('url-input') as HTMLInputElement | null
        if (input) {
          input.value = item.uri
          input.form?.dispatchEvent(new Event('submit', { cancelable: true }))
        }
      })
      li.appendChild(link)

      list.appendChild(li)
    }

    dataSection.appendChild(list)
  }

  wrapper.appendChild(dataSection)
  container.appendChild(wrapper)
}

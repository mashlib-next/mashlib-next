import type { NamedNode, Store } from '@mashlib-next/store'
import { ACL, FOAF, VCARD } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'

/** The four ACL access modes */
const ACCESS_MODES = [
  { uri: 'Read', label: 'Read' },
  { uri: 'Write', label: 'Write' },
  { uri: 'Append', label: 'Append' },
  { uri: 'Control', label: 'Control' },
] as const

interface TrustedApp {
  originUri: string
  originLabel: string
  modes: string[]
}

/**
 * Get display name for the profile subject.
 */
function getProfileName(subject: NamedNode, store: Store): string {
  return (
    store.any(subject, FOAF('name'), null, null)?.value ??
    store.any(subject, VCARD('fn'), null, null)?.value ??
    labelFromUri(subject.value)
  )
}

/**
 * Extract all trusted application entries for a profile.
 * RDF pattern: subject acl:trustedApp _:app .
 *              _:app acl:origin <origin> .
 *              _:app acl:mode acl:Read, acl:Write, ...
 */
function getTrustedApps(subject: NamedNode, store: Store): TrustedApp[] {
  const apps: TrustedApp[] = []
  const appNodes = store.each(subject, ACL('trustedApp'), null, null)

  for (const appNode of appNodes) {
    // Get origin
    const originNode = store.any(appNode as NamedNode, ACL('origin'), null, null)
    if (!originNode) continue

    const originUri = originNode.value
    const originLabel = labelFromUri(originUri)

    // Get modes
    const modeNodes = store.each(appNode as NamedNode, ACL('mode'), null, null)
    const modes = modeNodes.map(m => labelFromUri(m.value))

    apps.push({ originUri, originLabel, modes })
  }

  // Sort by origin
  apps.sort((a, b) => a.originUri.localeCompare(b.originUri))
  return apps
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Render the trusted applications pane.
 */
export function renderTrustedApps(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  container.innerHTML = ''

  const wrapper = document.createElement('div')
  wrapper.className = 'trusted-apps-view'

  // Header
  const header = document.createElement('h2')
  header.className = 'trusted-apps-title'
  header.textContent = 'Trusted Applications'
  wrapper.appendChild(header)

  const profileName = getProfileName(subject, store)
  const subtitle = document.createElement('p')
  subtitle.className = 'trusted-apps-subtitle'
  subtitle.textContent = `Manage applications trusted by ${profileName}`
  wrapper.appendChild(subtitle)

  const apps = getTrustedApps(subject, store)

  // App count
  const countEl = document.createElement('p')
  countEl.className = 'trusted-apps-count'
  countEl.textContent = `${apps.length} trusted application${apps.length !== 1 ? 's' : ''}`
  wrapper.appendChild(countEl)

  if (apps.length === 0) {
    const empty = document.createElement('p')
    empty.className = 'trusted-apps-empty'
    empty.textContent = 'No trusted applications configured.'
    wrapper.appendChild(empty)

    renderNotes(wrapper)
    container.appendChild(wrapper)
    return
  }

  // Table of trusted apps
  const table = document.createElement('table')
  table.className = 'trusted-apps-table'

  const thead = document.createElement('thead')
  const headRow = document.createElement('tr')
  const thOrigin = document.createElement('th')
  thOrigin.textContent = 'Application URL'
  const thModes = document.createElement('th')
  thModes.textContent = 'Access Modes'
  headRow.appendChild(thOrigin)
  headRow.appendChild(thModes)
  thead.appendChild(headRow)
  table.appendChild(thead)

  const tbody = document.createElement('tbody')

  for (const app of apps) {
    const row = document.createElement('tr')
    row.className = 'trusted-apps-row'

    // Origin cell
    const originCell = document.createElement('td')
    originCell.className = 'trusted-apps-origin'
    const link = document.createElement('a')
    link.href = app.originUri
    link.textContent = app.originUri
    link.target = '_blank'
    link.rel = 'noopener'
    originCell.appendChild(link)
    row.appendChild(originCell)

    // Modes cell
    const modesCell = document.createElement('td')
    modesCell.className = 'trusted-apps-modes'

    for (const mode of ACCESS_MODES) {
      const chip = document.createElement('span')
      const hasMode = app.modes.includes(mode.uri)
      chip.className = `trusted-apps-mode ${hasMode ? 'trusted-apps-mode-active' : 'trusted-apps-mode-inactive'}`
      chip.textContent = mode.label
      modesCell.appendChild(chip)
    }

    row.appendChild(modesCell)
    tbody.appendChild(row)
  }

  table.appendChild(tbody)
  wrapper.appendChild(table)

  // Notes
  renderNotes(wrapper)

  container.appendChild(wrapper)
}

/**
 * Render explanatory notes.
 */
function renderNotes(wrapper: HTMLElement): void {
  const notes = document.createElement('div')
  notes.className = 'trusted-apps-notes'

  const notesTitle = document.createElement('h3')
  notesTitle.textContent = 'Notes'
  notes.appendChild(notesTitle)

  const notesList = document.createElement('ol')
  const noteItems = [
    'Trusted applications get access to all resources that you have access to.',
    'You can limit which modes they have by default.',
    'They will not gain more access than you have.',
  ]

  for (const text of noteItems) {
    const li = document.createElement('li')
    li.textContent = text
    notesList.appendChild(li)
  }

  notes.appendChild(notesList)
  wrapper.appendChild(notes)
}

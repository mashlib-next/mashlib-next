import type { NamedNode, Store } from '@mashlib-next/store'
import { ACL, RDF, LDP, FOAF, VCARD } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'

/** ACL permission modes */
const MODES = [
  { uri: 'Read', label: 'Read', description: 'can view the resource' },
  { uri: 'Append', label: 'Append', description: 'can add new content' },
  { uri: 'Write', label: 'Write', description: 'can modify content' },
  { uri: 'Control', label: 'Control', description: 'can manage sharing' },
] as const

/** Permission level presets with colloquial names */
const PERMISSION_LEVELS = [
  { label: 'Owners', modes: ['Read', 'Write', 'Control'], color: '#7b2d8e' },
  { label: 'Editors', modes: ['Read', 'Write'], color: '#dc3545' },
  { label: 'Posters', modes: ['Read', 'Append'], color: '#e67e00' },
  { label: 'Submitters', modes: ['Append'], color: '#ccaa00' },
  { label: 'Viewers', modes: ['Read'], color: '#28a745' },
] as const

interface AclEntry {
  agentType: 'agent' | 'agentClass' | 'agentGroup'
  agentUri: string
  agentLabel: string
  modes: string[]
}

/**
 * Determine if this is a container (folder) or file.
 */
function isContainer(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)
  if (typeUris.includes(LDP('Container').value)) return true
  if (typeUris.includes(LDP('BasicContainer').value)) return true
  return subject.value.endsWith('/')
}

/**
 * Get a display label for an agent.
 */
function agentLabel(agentUri: string, store: Store): string {
  if (agentUri === FOAF('Agent').value) return 'Everyone (public)'
  if (agentUri === ACL('AuthenticatedAgent').value) return 'Anyone logged in'

  // Try to find a name in the store
  const agentNode = { termType: 'NamedNode', value: agentUri } as NamedNode
  const name =
    store.any(agentNode, FOAF('name'), null, null)?.value ??
    store.any(agentNode, VCARD('fn'), null, null)?.value
  if (name) return name

  return labelFromUri(agentUri)
}

/**
 * Extract ACL entries from the store for the given subject.
 * Looks for acl:Authorization triples that reference this resource.
 */
function getAclEntries(subject: NamedNode, store: Store): AclEntry[] {
  const entries: AclEntry[] = []

  // Find all Authorization nodes that grant access to this subject
  const authNodes = store.each(null, ACL('accessTo'), subject, null)

  for (const authNode of authNodes) {
    if (authNode.termType !== 'NamedNode') continue
    const auth = authNode as NamedNode

    // Check it's an Authorization
    const types = store.each(auth, RDF('type'), null, null)
    const isAuth = types.some(t => t.value === ACL('Authorization').value)
    if (!isAuth && types.length > 0) continue

    // Get modes
    const modeNodes = store.each(auth, ACL('mode'), null, null)
    const modes = modeNodes.map(m => labelFromUri(m.value))

    // Get agents
    for (const agentNode of store.each(auth, ACL('agent'), null, null)) {
      entries.push({
        agentType: 'agent',
        agentUri: agentNode.value,
        agentLabel: agentLabel(agentNode.value, store),
        modes,
      })
    }

    // Get agent classes
    for (const classNode of store.each(auth, ACL('agentClass'), null, null)) {
      entries.push({
        agentType: 'agentClass',
        agentUri: classNode.value,
        agentLabel: agentLabel(classNode.value, store),
        modes,
      })
    }

    // Get agent groups
    for (const groupNode of store.each(auth, ACL('agentGroup'), null, null)) {
      entries.push({
        agentType: 'agentGroup',
        agentUri: groupNode.value,
        agentLabel: agentLabel(groupNode.value, store),
        modes,
      })
    }
  }

  // Also check for default ACL on containers
  const defaultAuthNodes = store.each(null, ACL('default'), subject, null)
  for (const authNode of defaultAuthNodes) {
    if (authNode.termType !== 'NamedNode') continue
    const auth = authNode as NamedNode

    const modeNodes = store.each(auth, ACL('mode'), null, null)
    const modes = modeNodes.map(m => labelFromUri(m.value))

    for (const agentNode of store.each(auth, ACL('agent'), null, null)) {
      const uri = agentNode.value
      // Avoid duplicates
      if (entries.some(e => e.agentUri === uri && e.modes.join() === modes.join())) continue
      entries.push({
        agentType: 'agent',
        agentUri: uri,
        agentLabel: agentLabel(uri, store),
        modes,
      })
    }

    for (const classNode of store.each(auth, ACL('agentClass'), null, null)) {
      const uri = classNode.value
      if (entries.some(e => e.agentUri === uri && e.modes.join() === modes.join())) continue
      entries.push({
        agentType: 'agentClass',
        agentUri: uri,
        agentLabel: agentLabel(uri, store),
        modes,
      })
    }
  }

  return entries
}

/**
 * Group entries by their permission level for display.
 */
function groupByLevel(entries: AclEntry[]): Map<string, AclEntry[]> {
  const groups = new Map<string, AclEntry[]>()

  for (const entry of entries) {
    const key = entry.modes.sort().join(',')
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(entry)
  }

  return groups
}

/**
 * Find matching permission level label.
 */
function levelLabel(modes: string[]): { label: string; color: string } {
  const sorted = [...modes].sort().join(',')

  for (const level of PERMISSION_LEVELS) {
    if ([...level.modes].sort().join(',') === sorted) {
      return { label: level.label, color: level.color }
    }
  }

  return { label: modes.join(' + '), color: '#555' }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Render the sharing pane into the container.
 */
export function renderSharing(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  container.innerHTML = ''

  const wrapper = document.createElement('div')
  wrapper.className = 'sharing-view'

  const resourceType = isContainer(subject, store) ? 'folder' : 'file'

  // Header
  const header = document.createElement('h2')
  header.className = 'sharing-title'
  header.textContent = `Sharing for ${resourceType}`
  wrapper.appendChild(header)

  // Resource URI
  const uriEl = document.createElement('p')
  uriEl.className = 'sharing-resource'
  const uriCode = document.createElement('code')
  uriCode.textContent = subject.value
  uriEl.appendChild(uriCode)
  wrapper.appendChild(uriEl)

  // Extract ACL entries
  const entries = getAclEntries(subject, store)

  if (entries.length === 0) {
    const info = document.createElement('p')
    info.className = 'sharing-no-acl'
    info.textContent = 'No specific sharing settings found. This resource may inherit permissions from its parent container.'
    wrapper.appendChild(info)

    // Show mode legend
    renderModeLegend(wrapper)
    container.appendChild(wrapper)
    return
  }

  // Group by permission level
  const groups = groupByLevel(entries)

  const permSection = document.createElement('div')
  permSection.className = 'sharing-permissions'

  for (const [modeKey, groupEntries] of groups) {
    const modes = modeKey.split(',')
    const { label, color } = levelLabel(modes)

    const row = document.createElement('div')
    row.className = 'sharing-level'

    // Level label
    const labelEl = document.createElement('div')
    labelEl.className = 'sharing-level-name'
    labelEl.style.color = color
    labelEl.textContent = label
    row.appendChild(labelEl)

    // Agents in this level
    const agentsEl = document.createElement('div')
    agentsEl.className = 'sharing-agents'

    for (const entry of groupEntries) {
      const chip = document.createElement('span')
      chip.className = `sharing-agent sharing-agent-${entry.agentType}`
      chip.textContent = entry.agentLabel
      chip.title = entry.agentUri
      agentsEl.appendChild(chip)
    }

    row.appendChild(agentsEl)

    // Explanation
    const descEl = document.createElement('div')
    descEl.className = 'sharing-level-desc'
    descEl.style.color = color
    const modeDescs = modes.map(m => {
      const mode = MODES.find(md => md.uri === m)
      return mode ? mode.description : m
    })
    descEl.textContent = modeDescs.join(', ')
    row.appendChild(descEl)

    permSection.appendChild(row)
  }

  wrapper.appendChild(permSection)

  // Container-specific info
  if (resourceType === 'folder') {
    const defaultInfo = document.createElement('p')
    defaultInfo.className = 'sharing-default-info'
    defaultInfo.textContent = 'Folder permissions may also apply as defaults for new resources created within.'
    wrapper.appendChild(defaultInfo)
  }

  // Mode legend
  renderModeLegend(wrapper)

  container.appendChild(wrapper)
}

/**
 * Render the mode reference legend.
 */
function renderModeLegend(wrapper: HTMLElement): void {
  const legend = document.createElement('div')
  legend.className = 'sharing-legend'

  const legendTitle = document.createElement('h3')
  legendTitle.textContent = 'Access Modes'
  legend.appendChild(legendTitle)

  const table = document.createElement('table')
  table.className = 'sharing-legend-table'

  for (const mode of MODES) {
    const row = document.createElement('tr')
    const nameCell = document.createElement('td')
    nameCell.className = 'sharing-legend-mode'
    nameCell.textContent = mode.label
    const descCell = document.createElement('td')
    descCell.textContent = mode.description
    row.appendChild(nameCell)
    row.appendChild(descCell)
    table.appendChild(row)
  }

  legend.appendChild(table)
  wrapper.appendChild(legend)
}

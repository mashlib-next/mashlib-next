import type { NamedNode, Store } from '@mashlib-next/store'
import { MEE, DCT, SCHEMA, RDFS, FOAF, SIOC } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'

/**
 * Format a date/time for display.
 */
function formatDateTime(iso: string): string {
  const date = new Date(iso)
  if (isNaN(date.getTime())) return iso

  return date.toLocaleString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Get participant name from a node.
 */
function getParticipantName(node: NamedNode, store: Store): string {
  return (
    store.any(node, SCHEMA('name'), null, null)?.value ??
    store.any(node, FOAF('name'), null, null)?.value ??
    labelFromUri(node.value)
  )
}

/**
 * Render a meeting into the container.
 */
export function renderMeeting(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  container.innerHTML = ''

  const wrapper = document.createElement('div')
  wrapper.className = 'meeting-view'

  // Title
  const title =
    store.any(subject, DCT('title'), null, null)?.value ??
    store.any(subject, SCHEMA('name'), null, null)?.value ??
    store.any(subject, RDFS('label'), null, null)?.value ??
    labelFromUri(subject.value)

  const titleEl = document.createElement('h2')
  titleEl.className = 'meeting-title'
  titleEl.textContent = title
  wrapper.appendChild(titleEl)

  // Date/time
  const dateStr =
    store.any(subject, SCHEMA('startDate'), null, null)?.value ??
    store.any(subject, DCT('created'), null, null)?.value ??
    store.any(subject, DCT('date'), null, null)?.value
  if (dateStr) {
    const dateEl = document.createElement('p')
    dateEl.className = 'meeting-date'
    dateEl.textContent = formatDateTime(dateStr)
    wrapper.appendChild(dateEl)
  }

  // Location
  const location =
    store.any(subject, SCHEMA('location'), null, null)?.value ??
    store.any(subject, MEE('location'), null, null)?.value
  if (location && !location.startsWith('http')) {
    const locEl = document.createElement('p')
    locEl.className = 'meeting-location'
    locEl.textContent = location
    wrapper.appendChild(locEl)
  }

  // Description
  const description =
    store.any(subject, DCT('description'), null, null)?.value ??
    store.any(subject, SCHEMA('description'), null, null)?.value
  if (description) {
    const descEl = document.createElement('p')
    descEl.className = 'meeting-description'
    descEl.textContent = description
    wrapper.appendChild(descEl)
  }

  // Participants
  const participants = store.each(subject, MEE('participant'), null, null)
  if (participants.length > 0) {
    const section = document.createElement('div')
    section.className = 'meeting-section'

    const heading = document.createElement('h3')
    heading.textContent = 'Participants'
    section.appendChild(heading)

    const list = document.createElement('ul')
    list.className = 'meeting-participants'

    for (const p of participants) {
      const pNode = p as NamedNode
      const name = getParticipantName(pNode, store)

      const li = document.createElement('li')
      const link = document.createElement('a')
      link.className = 'meeting-participant'
      link.href = pNode.value
      link.textContent = name
      li.appendChild(link)
      list.appendChild(li)
    }

    section.appendChild(list)
    wrapper.appendChild(section)
  }

  // Agenda
  const agendaItems = store.each(subject, MEE('agenda'), null, null)
  if (agendaItems.length > 0) {
    const section = document.createElement('div')
    section.className = 'meeting-section'

    const heading = document.createElement('h3')
    heading.textContent = 'Agenda'
    section.appendChild(heading)

    const list = document.createElement('ol')
    list.className = 'meeting-agenda'

    for (const item of agendaItems) {
      const li = document.createElement('li')
      // Agenda item might be a literal or a node with a title
      const itemTitle =
        store.any(item as NamedNode, DCT('title'), null, null)?.value ??
        store.any(item as NamedNode, SCHEMA('name'), null, null)?.value ??
        item.value
      if (itemTitle && !itemTitle.startsWith('http')) {
        li.textContent = itemTitle
      } else {
        li.textContent = labelFromUri(itemTitle)
      }
      list.appendChild(li)
    }

    section.appendChild(list)
    wrapper.appendChild(section)
  }

  // Actions / notes
  const actions = store.each(subject, MEE('action'), null, null)
  if (actions.length > 0) {
    const section = document.createElement('div')
    section.className = 'meeting-section'

    const heading = document.createElement('h3')
    heading.textContent = 'Action Items'
    section.appendChild(heading)

    const list = document.createElement('ul')
    list.className = 'meeting-actions'

    for (const action of actions) {
      const li = document.createElement('li')
      const actionText =
        store.any(action as NamedNode, DCT('title'), null, null)?.value ??
        store.any(action as NamedNode, SCHEMA('name'), null, null)?.value ??
        store.any(action as NamedNode, RDFS('label'), null, null)?.value ??
        action.value
      if (actionText && !actionText.startsWith('http')) {
        li.textContent = actionText
      } else {
        li.textContent = labelFromUri(actionText)
      }
      list.appendChild(li)
    }

    section.appendChild(list)
    wrapper.appendChild(section)
  }

  // Notes (content)
  const notes =
    store.any(subject, SIOC('content'), null, null)?.value ??
    store.any(subject, SCHEMA('text'), null, null)?.value
  if (notes) {
    const section = document.createElement('div')
    section.className = 'meeting-section'

    const heading = document.createElement('h3')
    heading.textContent = 'Notes'
    section.appendChild(heading)

    const notesEl = document.createElement('div')
    notesEl.className = 'meeting-notes'
    notesEl.textContent = notes
    section.appendChild(notesEl)

    wrapper.appendChild(section)
  }

  container.appendChild(wrapper)
}

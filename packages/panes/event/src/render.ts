import type { NamedNode, Store } from '@mashlib-next/store'
import { SCHEMA, DCT, FOAF } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'

/**
 * Format a date/time string for display.
 */
function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr

  // Check if it's a date-only value (no time component)
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return date.toLocaleString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Format a time-only string (for end time on same day).
 */
function formatTimeOnly(dateStr: string): string {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Check if two date strings fall on the same calendar day.
 */
function isSameDay(a: string, b: string): boolean {
  const da = new Date(a)
  const db = new Date(b)
  return (
    da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
  )
}

/**
 * Add a detail row to the event card.
 */
function addRow(
  parent: HTMLElement,
  label: string,
  value: string | undefined,
  isLink = false
): void {
  if (!value) return

  const row = document.createElement('div')
  row.className = 'event-detail'

  const labelEl = document.createElement('span')
  labelEl.className = 'event-label'
  labelEl.textContent = label
  row.appendChild(labelEl)

  if (isLink && (value.startsWith('http://') || value.startsWith('https://'))) {
    const link = document.createElement('a')
    link.href = value
    link.textContent = labelFromUri(value)
    link.target = '_blank'
    link.rel = 'noopener'
    row.appendChild(link)
  } else {
    const valueEl = document.createElement('span')
    valueEl.className = 'event-value'
    valueEl.textContent = value
    row.appendChild(valueEl)
  }

  parent.appendChild(row)
}

/**
 * Render the event into the container.
 */
export function renderEvent(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  container.innerHTML = ''

  const wrapper = document.createElement('div')
  wrapper.className = 'event-view'

  // Title
  const name =
    store.any(subject, SCHEMA('name'), null, null)?.value ??
    store.any(subject, DCT('title'), null, null)?.value ??
    labelFromUri(subject.value)

  const titleEl = document.createElement('h2')
  titleEl.className = 'event-title'
  titleEl.textContent = name
  wrapper.appendChild(titleEl)

  // Date/Time
  const startDate = store.any(subject, SCHEMA('startDate'), null, null)?.value
  const endDate = store.any(subject, SCHEMA('endDate'), null, null)?.value

  if (startDate) {
    let dateText = formatDateTime(startDate)
    if (endDate) {
      if (isSameDay(startDate, endDate)) {
        dateText += ` \u2013 ${formatTimeOnly(endDate)}`
      } else {
        dateText += ` \u2013 ${formatDateTime(endDate)}`
      }
    }

    const dateEl = document.createElement('p')
    dateEl.className = 'event-date'
    dateEl.textContent = dateText
    wrapper.appendChild(dateEl)
  }

  // Details section
  const details = document.createElement('div')
  details.className = 'event-details'

  // Location
  const locationNode = store.any(subject, SCHEMA('location'), null, null)
  let locationText: string | undefined
  if (locationNode) {
    // Location can be a literal string or a structured Place node
    const placeName = store.any(locationNode as NamedNode, SCHEMA('name'), null, null)?.value
    locationText = placeName ?? locationNode.value
  }
  addRow(details, 'Location', locationText)

  // Organizer
  const organizerNode = store.any(subject, SCHEMA('organizer'), null, null)
  if (organizerNode) {
    const organizerName =
      store.any(organizerNode as NamedNode, SCHEMA('name'), null, null)?.value ??
      store.any(organizerNode as NamedNode, FOAF('name'), null, null)?.value ??
      labelFromUri(organizerNode.value)
    addRow(details, 'Organizer', organizerName)
  }

  // URL
  const url = store.any(subject, SCHEMA('url'), null, null)?.value
  addRow(details, 'Link', url, true)

  // Status
  const status = store.any(subject, SCHEMA('eventStatus'), null, null)?.value
  if (status) {
    addRow(details, 'Status', labelFromUri(status))
  }

  // Attendance mode
  const attendanceMode = store.any(subject, SCHEMA('eventAttendanceMode'), null, null)?.value
  if (attendanceMode) {
    addRow(details, 'Format', labelFromUri(attendanceMode))
  }

  wrapper.appendChild(details)

  // Description
  const description =
    store.any(subject, SCHEMA('description'), null, null)?.value ??
    store.any(subject, DCT('description'), null, null)?.value
  if (description) {
    const descEl = document.createElement('div')
    descEl.className = 'event-description'
    descEl.textContent = description
    wrapper.appendChild(descEl)
  }

  container.appendChild(wrapper)
}

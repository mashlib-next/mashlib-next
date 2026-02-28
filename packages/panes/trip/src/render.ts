import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, SCHEMA, DCT } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'

/**
 * Format a date/time for display.
 */
function formatDateTime(iso: string): string {
  const date = new Date(iso)
  if (isNaN(date.getTime())) return iso
  return date.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Format just a date (no time).
 */
function formatDate(iso: string): string {
  const date = new Date(iso)
  if (isNaN(date.getTime())) return iso
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Get a place name from a node (could be a literal or a Place node).
 */
function placeName(node: NamedNode, store: Store): string {
  const name = store.any(node, SCHEMA('name'), null, null)?.value
  if (name) return name
  const address = store.any(node, SCHEMA('address'), null, null)?.value
  if (address && !address.startsWith('http')) return address
  if (!node.value.startsWith('http')) return node.value
  return labelFromUri(node.value)
}

/**
 * Get the transport mode label from type.
 */
function transportLabel(types: string[]): string {
  for (const t of types) {
    if (t.includes('Flight')) return 'Flight'
    if (t.includes('TrainTrip')) return 'Train'
    if (t.includes('BusTrip')) return 'Bus'
    if (t.includes('BoatTrip')) return 'Boat'
  }
  return 'Leg'
}

/**
 * Render a single trip leg.
 */
function renderLeg(
  leg: NamedNode,
  store: Store,
  wrapper: HTMLElement
): void {
  const card = document.createElement('div')
  card.className = 'trip-leg'

  const types = store.each(leg, RDF('type'), null, null).map(t => t.value)
  const mode = transportLabel(types)

  // Header: mode + identifier (flight number, train number)
  const header = document.createElement('div')
  header.className = 'trip-leg-header'

  const modeEl = document.createElement('span')
  modeEl.className = 'trip-leg-mode'
  modeEl.textContent = mode

  const identifier =
    store.any(leg, SCHEMA('flightNumber'), null, null)?.value ??
    store.any(leg, SCHEMA('trainNumber'), null, null)?.value ??
    store.any(leg, SCHEMA('busNumber'), null, null)?.value ??
    store.any(leg, SCHEMA('name'), null, null)?.value
  if (identifier) {
    modeEl.textContent += ` ${identifier}`
  }

  header.appendChild(modeEl)

  // Provider / airline
  const provider =
    store.any(leg, SCHEMA('provider'), null, null) ??
    store.any(leg, SCHEMA('airline'), null, null)
  if (provider) {
    const providerName =
      store.any(provider as NamedNode, SCHEMA('name'), null, null)?.value ??
      (provider.value.startsWith('http') ? null : provider.value)
    if (providerName) {
      const provEl = document.createElement('span')
      provEl.className = 'trip-leg-provider'
      provEl.textContent = providerName
      header.appendChild(provEl)
    }
  }

  card.appendChild(header)

  // Route: departure → arrival
  const route = document.createElement('div')
  route.className = 'trip-leg-route'

  const depStation = store.any(leg, SCHEMA('departureStation'), null, null) ??
                     store.any(leg, SCHEMA('departureAirport'), null, null) ??
                     store.any(leg, SCHEMA('departureStop'), null, null) ??
                     store.any(leg, SCHEMA('fromLocation'), null, null)
  const arrStation = store.any(leg, SCHEMA('arrivalStation'), null, null) ??
                     store.any(leg, SCHEMA('arrivalAirport'), null, null) ??
                     store.any(leg, SCHEMA('arrivalStop'), null, null) ??
                     store.any(leg, SCHEMA('toLocation'), null, null)

  if (depStation || arrStation) {
    const depName = depStation ? placeName(depStation as NamedNode, store) : '?'
    const arrName = arrStation ? placeName(arrStation as NamedNode, store) : '?'

    route.innerHTML = `<span class="trip-from">${depName}</span><span class="trip-arrow">\u2192</span><span class="trip-to">${arrName}</span>`
    card.appendChild(route)
  }

  // Times
  const depTime = store.any(leg, SCHEMA('departureTime'), null, null)?.value
  const arrTime = store.any(leg, SCHEMA('arrivalTime'), null, null)?.value

  if (depTime || arrTime) {
    const times = document.createElement('div')
    times.className = 'trip-leg-times'
    if (depTime) {
      const dep = document.createElement('span')
      dep.className = 'trip-leg-time'
      dep.textContent = `Departs: ${formatDateTime(depTime)}`
      times.appendChild(dep)
    }
    if (arrTime) {
      const arr = document.createElement('span')
      arr.className = 'trip-leg-time'
      arr.textContent = `Arrives: ${formatDateTime(arrTime)}`
      times.appendChild(arr)
    }
    card.appendChild(times)
  }

  wrapper.appendChild(card)
}

/**
 * Render a trip into the container.
 */
export function renderTrip(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  container.innerHTML = ''

  const wrapper = document.createElement('div')
  wrapper.className = 'trip-view'

  // Title
  const name =
    store.any(subject, SCHEMA('name'), null, null)?.value ??
    store.any(subject, DCT('title'), null, null)?.value ??
    labelFromUri(subject.value)

  const titleEl = document.createElement('h2')
  titleEl.className = 'trip-title'
  titleEl.textContent = name
  wrapper.appendChild(titleEl)

  // Description
  const description =
    store.any(subject, SCHEMA('description'), null, null)?.value ??
    store.any(subject, DCT('description'), null, null)?.value
  if (description) {
    const descEl = document.createElement('p')
    descEl.className = 'trip-description'
    descEl.textContent = description
    wrapper.appendChild(descEl)
  }

  // Date range
  const startDate = store.any(subject, SCHEMA('departureTime'), null, null)?.value ??
                    store.any(subject, SCHEMA('startDate'), null, null)?.value
  const endDate = store.any(subject, SCHEMA('arrivalTime'), null, null)?.value ??
                  store.any(subject, SCHEMA('endDate'), null, null)?.value

  if (startDate || endDate) {
    const dateEl = document.createElement('p')
    dateEl.className = 'trip-dates'
    if (startDate && endDate) {
      dateEl.textContent = `${formatDate(startDate)} \u2014 ${formatDate(endDate)}`
    } else if (startDate) {
      dateEl.textContent = formatDate(startDate)
    } else if (endDate) {
      dateEl.textContent = `Until ${formatDate(endDate)}`
    }
    wrapper.appendChild(dateEl)
  }

  // Check if this IS a single leg (Flight, TrainTrip, etc.)
  const types = store.each(subject, RDF('type'), null, null).map(t => t.value)
  const isSingleLeg = types.some(t =>
    t.includes('Flight') || t.includes('TrainTrip') ||
    t.includes('BusTrip') || t.includes('BoatTrip')
  )

  if (isSingleLeg) {
    renderLeg(subject, store, wrapper)
  }

  // Itinerary legs
  const legs = store.each(subject, SCHEMA('itinerary'), null, null)
  if (legs.length > 0) {
    const section = document.createElement('div')
    section.className = 'trip-itinerary'

    const heading = document.createElement('h3')
    heading.textContent = `Itinerary (${legs.length} leg${legs.length !== 1 ? 's' : ''})`
    section.appendChild(heading)

    // Sort legs by departure time
    const sortedLegs = [...legs].sort((a, b) => {
      const aTime = store.any(a as NamedNode, SCHEMA('departureTime'), null, null)?.value ?? ''
      const bTime = store.any(b as NamedNode, SCHEMA('departureTime'), null, null)?.value ?? ''
      return aTime.localeCompare(bTime)
    })

    for (const leg of sortedLegs) {
      renderLeg(leg as NamedNode, store, section)
    }

    wrapper.appendChild(section)
  }

  container.appendChild(wrapper)
}

import type { NamedNode, Store } from '@mashlib-next/store'
import { SCHEMA, DCT } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'
import { getCoordinates } from './map-pane.js'

/**
 * Render the map view into the container.
 */
export function renderMap(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  container.innerHTML = ''

  const wrapper = document.createElement('div')
  wrapper.className = 'map-view'

  // Title
  const name =
    store.any(subject, SCHEMA('name'), null, null)?.value ??
    store.any(subject, DCT('title'), null, null)?.value ??
    labelFromUri(subject.value)

  const titleEl = document.createElement('h2')
  titleEl.className = 'map-title'
  titleEl.textContent = name
  wrapper.appendChild(titleEl)

  // Address
  const address =
    store.any(subject, SCHEMA('address'), null, null)?.value ??
    undefined
  if (address) {
    const addrEl = document.createElement('p')
    addrEl.className = 'map-address'
    addrEl.textContent = address
    wrapper.appendChild(addrEl)
  }

  // Description
  const description =
    store.any(subject, SCHEMA('description'), null, null)?.value ??
    store.any(subject, DCT('description'), null, null)?.value
  if (description) {
    const descEl = document.createElement('p')
    descEl.className = 'map-description'
    descEl.textContent = description
    wrapper.appendChild(descEl)
  }

  // Map embed
  const coords = getCoordinates(subject, store)
  if (coords) {
    const mapContainer = document.createElement('div')
    mapContainer.className = 'map-embed'

    const iframe = document.createElement('iframe')
    iframe.className = 'map-frame'
    iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.01},${coords.lat - 0.005},${coords.lng + 0.01},${coords.lat + 0.005}&layer=mapnik&marker=${coords.lat},${coords.lng}`
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin')
    iframe.title = `Map showing ${name}`

    mapContainer.appendChild(iframe)

    // Link to full OpenStreetMap
    const osmLink = document.createElement('a')
    osmLink.className = 'map-osm-link'
    osmLink.href = `https://www.openstreetmap.org/?mlat=${coords.lat}&mlon=${coords.lng}#map=16/${coords.lat}/${coords.lng}`
    osmLink.textContent = 'View on OpenStreetMap'
    osmLink.target = '_blank'
    osmLink.rel = 'noopener'
    mapContainer.appendChild(osmLink)

    wrapper.appendChild(mapContainer)
  } else {
    const noMap = document.createElement('p')
    noMap.className = 'map-no-coords'
    noMap.textContent = 'No coordinates available for this place.'
    wrapper.appendChild(noMap)
  }

  container.appendChild(wrapper)
}

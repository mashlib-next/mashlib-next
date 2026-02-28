import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, SCHEMA } from '@mashlib-next/utils'
import { renderMap } from './render.js'

/**
 * Try to extract latitude and longitude from the subject.
 *
 * Supports:
 *  - Direct schema:latitude / schema:longitude on the subject
 *  - schema:geo pointing to a GeoCoordinates node
 *  - schema:location pointing to a Place with geo
 */
export function getCoordinates(
  subject: NamedNode,
  store: Store
): { lat: number; lng: number } | null {
  // Direct coordinates
  const directLat = store.any(subject, SCHEMA('latitude'), null, null)?.value
  const directLng = store.any(subject, SCHEMA('longitude'), null, null)?.value
  if (directLat && directLng) {
    const lat = parseFloat(directLat)
    const lng = parseFloat(directLng)
    if (!isNaN(lat) && !isNaN(lng)) return { lat, lng }
  }

  // Via schema:geo
  const geoNode = store.any(subject, SCHEMA('geo'), null, null)
  if (geoNode) {
    const geoLat = store.any(geoNode as NamedNode, SCHEMA('latitude'), null, null)?.value
    const geoLng = store.any(geoNode as NamedNode, SCHEMA('longitude'), null, null)?.value
    if (geoLat && geoLng) {
      const lat = parseFloat(geoLat)
      const lng = parseFloat(geoLng)
      if (!isNaN(lat) && !isNaN(lng)) return { lat, lng }
    }
  }

  // Via schema:location → geo
  const locationNode = store.any(subject, SCHEMA('location'), null, null)
  if (locationNode) {
    const locGeo = store.any(locationNode as NamedNode, SCHEMA('geo'), null, null)
    if (locGeo) {
      const lat = store.any(locGeo as NamedNode, SCHEMA('latitude'), null, null)?.value
      const lng = store.any(locGeo as NamedNode, SCHEMA('longitude'), null, null)?.value
      if (lat && lng) {
        const pLat = parseFloat(lat)
        const pLng = parseFloat(lng)
        if (!isNaN(pLat) && !isNaN(pLng)) return { lat: pLat, lng: pLng }
      }
    }
    // Direct coords on location node
    const locLat = store.any(locationNode as NamedNode, SCHEMA('latitude'), null, null)?.value
    const locLng = store.any(locationNode as NamedNode, SCHEMA('longitude'), null, null)?.value
    if (locLat && locLng) {
      const lat = parseFloat(locLat)
      const lng = parseFloat(locLng)
      if (!isNaN(lat) && !isNaN(lng)) return { lat, lng }
    }
  }

  return null
}

function isPlace(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)

  if (typeUris.includes(SCHEMA('Place').value)) return true
  if (typeUris.includes(SCHEMA('GeoCoordinates').value)) return true

  return false
}

export const mapPane: Pane = {
  label: 'Map',
  icon: '\u{1F5FA}',

  canHandle(subject: NamedNode, store: Store): boolean {
    // Has coordinates extractable from subject
    if (getCoordinates(subject, store)) return true
    // Is typed as a Place (may have address but no coords)
    if (isPlace(subject, store)) return true
    return false
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderMap(subject, store, container)
  },
}

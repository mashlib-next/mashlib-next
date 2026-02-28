import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, SCHEMA } from '@mashlib-next/utils'
import { renderTrip } from './render.js'

const TRIP_TYPES = [
  'Trip',
  'TouristTrip',
  'Flight',
  'TrainTrip',
  'BusTrip',
  'BoatTrip',
  'TravelAction',
]

function isTrip(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null).map(t => t.value)

  for (const t of TRIP_TYPES) {
    if (types.includes(SCHEMA(t).value)) return true
  }

  // Duck-typing: has itinerary or departureTime + arrivalTime
  if (store.any(subject, SCHEMA('itinerary'), null, null)) return true
  const hasDeparture = store.any(subject, SCHEMA('departureTime'), null, null)
  const hasArrival = store.any(subject, SCHEMA('arrivalTime'), null, null)
  if (hasDeparture && hasArrival) return true

  return false
}

export const tripPane: Pane = {
  label: 'Trip',
  icon: '\u{2708}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isTrip(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderTrip(subject, store, container)
  },
}

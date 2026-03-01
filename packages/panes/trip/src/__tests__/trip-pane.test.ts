import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { tripPane } from '../trip-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const SCHEMA = Namespace('https://schema.org/')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')

describe('tripPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches schema:Trip type', () => {
      const subject = sym('https://example.com/trip')
      store.add(subject, RDF('type'), SCHEMA('Trip'), subject.doc())
      expect(tripPane.canHandle(subject, store)).toBe(true)
    })

    it('matches schema:Flight type', () => {
      const subject = sym('https://example.com/flight')
      store.add(subject, RDF('type'), SCHEMA('Flight'), subject.doc())
      expect(tripPane.canHandle(subject, store)).toBe(true)
    })

    it('matches schema:TrainTrip type', () => {
      const subject = sym('https://example.com/train')
      store.add(subject, RDF('type'), SCHEMA('TrainTrip'), subject.doc())
      expect(tripPane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with itinerary', () => {
      const subject = sym('https://example.com/trip')
      const leg = sym('https://example.com/trip#leg1')
      store.add(subject, SCHEMA('itinerary'), leg, subject.doc())
      expect(tripPane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with departure + arrival times', () => {
      const subject = sym('https://example.com/trip')
      store.add(subject, SCHEMA('departureTime'), lit('2025-08-01T10:00:00Z'), subject.doc())
      store.add(subject, SCHEMA('arrivalTime'), lit('2025-08-01T14:00:00Z'), subject.doc())
      expect(tripPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects with only departure time (no arrival)', () => {
      const subject = sym('https://example.com/trip')
      store.add(subject, SCHEMA('departureTime'), lit('2025-08-01T10:00:00Z'), subject.doc())
      expect(tripPane.canHandle(subject, store)).toBe(false)
    })

    it('rejects non-trip resources', () => {
      const subject = sym('https://example.com/person')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(tripPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders trip title', () => {
      const subject = sym('https://example.com/trip')
      store.add(subject, RDF('type'), SCHEMA('Trip'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Summer Vacation'), subject.doc())

      const container = document.createElement('div')
      tripPane.render(subject, store, container)

      expect(container.querySelector('.trip-title')!.textContent).toBe('Summer Vacation')
    })

    it('renders trip date range', () => {
      const subject = sym('https://example.com/trip')
      store.add(subject, RDF('type'), SCHEMA('Trip'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Trip'), subject.doc())
      store.add(subject, SCHEMA('startDate'), lit('2025-08-01'), subject.doc())
      store.add(subject, SCHEMA('endDate'), lit('2025-08-15'), subject.doc())

      const container = document.createElement('div')
      tripPane.render(subject, store, container)

      const dates = container.querySelector('.trip-dates')
      expect(dates).not.toBeNull()
      expect(dates!.textContent).toContain('2025')
    })

    it('renders a flight leg with route', () => {
      const subject = sym('https://example.com/flight')
      store.add(subject, RDF('type'), SCHEMA('Flight'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('BA123'), subject.doc())
      store.add(subject, SCHEMA('flightNumber'), lit('BA123'), subject.doc())

      const depAirport = sym('https://example.com/airport/LHR')
      const arrAirport = sym('https://example.com/airport/JFK')
      store.add(subject, SCHEMA('departureAirport'), depAirport, subject.doc())
      store.add(subject, SCHEMA('arrivalAirport'), arrAirport, subject.doc())
      store.add(depAirport, SCHEMA('name'), lit('London Heathrow'), depAirport.doc())
      store.add(arrAirport, SCHEMA('name'), lit('New York JFK'), arrAirport.doc())

      store.add(subject, SCHEMA('departureTime'), lit('2025-08-01T10:00:00Z'), subject.doc())
      store.add(subject, SCHEMA('arrivalTime'), lit('2025-08-01T14:00:00Z'), subject.doc())

      const container = document.createElement('div')
      tripPane.render(subject, store, container)

      const mode = container.querySelector('.trip-leg-mode')
      expect(mode!.textContent).toContain('Flight')
      expect(mode!.textContent).toContain('BA123')

      const route = container.querySelector('.trip-leg-route')
      expect(route!.textContent).toContain('London Heathrow')
      expect(route!.textContent).toContain('New York JFK')

      const times = container.querySelectorAll('.trip-leg-time')
      expect(times.length).toBe(2)
    })

    it('renders trip with itinerary legs', () => {
      const subject = sym('https://example.com/trip')
      store.add(subject, RDF('type'), SCHEMA('Trip'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Europe Tour'), subject.doc())

      const leg1 = sym('https://example.com/trip#leg1')
      const leg2 = sym('https://example.com/trip#leg2')

      store.add(subject, SCHEMA('itinerary'), leg1, subject.doc())
      store.add(subject, SCHEMA('itinerary'), leg2, subject.doc())

      store.add(leg1, RDF('type'), SCHEMA('Flight'), leg1.doc())
      store.add(leg1, SCHEMA('departureTime'), lit('2025-08-01T08:00:00Z'), leg1.doc())
      store.add(leg2, RDF('type'), SCHEMA('TrainTrip'), leg2.doc())
      store.add(leg2, SCHEMA('departureTime'), lit('2025-08-02T10:00:00Z'), leg2.doc())

      const container = document.createElement('div')
      tripPane.render(subject, store, container)

      const legs = container.querySelectorAll('.trip-leg')
      expect(legs.length).toBe(2)

      const heading = container.querySelector('.trip-itinerary h3')
      expect(heading!.textContent).toContain('2 legs')
    })

    it('renders description', () => {
      const subject = sym('https://example.com/trip')
      store.add(subject, RDF('type'), SCHEMA('Trip'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Trip'), subject.doc())
      store.add(subject, SCHEMA('description'), lit('A wonderful journey'), subject.doc())

      const container = document.createElement('div')
      tripPane.render(subject, store, container)

      expect(container.querySelector('.trip-description')!.textContent).toBe('A wonderful journey')
    })

    it('renders provider/airline', () => {
      const subject = sym('https://example.com/flight')
      store.add(subject, RDF('type'), SCHEMA('Flight'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Flight'), subject.doc())
      store.add(subject, SCHEMA('departureTime'), lit('2025-08-01T10:00:00Z'), subject.doc())
      store.add(subject, SCHEMA('arrivalTime'), lit('2025-08-01T14:00:00Z'), subject.doc())

      const airline = sym('https://example.com/airline/BA')
      store.add(subject, SCHEMA('airline'), airline, subject.doc())
      store.add(airline, SCHEMA('name'), lit('British Airways'), airline.doc())

      const container = document.createElement('div')
      tripPane.render(subject, store, container)

      expect(container.querySelector('.trip-leg-provider')!.textContent).toBe('British Airways')
    })

    it('renders without optional fields', () => {
      const subject = sym('https://example.com/trip')
      store.add(subject, RDF('type'), SCHEMA('Trip'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Quick Trip'), subject.doc())

      const container = document.createElement('div')
      tripPane.render(subject, store, container)

      expect(container.querySelector('.trip-title')!.textContent).toBe('Quick Trip')
      expect(container.querySelector('.trip-dates')).toBeNull()
      expect(container.querySelector('.trip-description')).toBeNull()
      expect(container.querySelector('.trip-itinerary')).toBeNull()
    })
  })
})

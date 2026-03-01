import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { eventPane } from '../event-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const SCHEMA = Namespace('https://schema.org/')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')
const XSD = Namespace('http://www.w3.org/2001/XMLSchema#')

describe('eventPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches schema:Event type', () => {
      const subject = sym('https://example.com/event')
      store.add(subject, RDF('type'), SCHEMA('Event'), subject.doc())
      expect(eventPane.canHandle(subject, store)).toBe(true)
    })

    it('matches schema:SocialEvent type', () => {
      const subject = sym('https://example.com/party')
      store.add(subject, RDF('type'), SCHEMA('SocialEvent'), subject.doc())
      expect(eventPane.canHandle(subject, store)).toBe(true)
    })

    it('matches schema:MusicEvent type', () => {
      const subject = sym('https://example.com/concert')
      store.add(subject, RDF('type'), SCHEMA('MusicEvent'), subject.doc())
      expect(eventPane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with startDate + name', () => {
      const subject = sym('https://example.com/meetup')
      store.add(subject, SCHEMA('startDate'), lit('2025-07-01'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Meetup'), subject.doc())
      expect(eventPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects startDate without name (avoids false positives)', () => {
      const subject = sym('https://example.com/something')
      store.add(subject, SCHEMA('startDate'), lit('2025-07-01'), subject.doc())
      expect(eventPane.canHandle(subject, store)).toBe(false)
    })

    it('rejects non-event resources', () => {
      const subject = sym('https://example.com/profile')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(eventPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders event title', () => {
      const subject = sym('https://example.com/event')
      store.add(subject, RDF('type'), SCHEMA('Event'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Solid World'), subject.doc())

      const container = document.createElement('div')
      eventPane.render(subject, store, container)

      expect(container.querySelector('.event-title')!.textContent).toBe('Solid World')
    })

    it('renders start date', () => {
      const subject = sym('https://example.com/event')
      store.add(subject, RDF('type'), SCHEMA('Event'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Meetup'), subject.doc())
      store.add(subject, SCHEMA('startDate'), lit('2025-07-15T18:00:00Z'), subject.doc())

      const container = document.createElement('div')
      eventPane.render(subject, store, container)

      const dateEl = container.querySelector('.event-date')
      expect(dateEl).not.toBeNull()
      expect(dateEl!.textContent).toBeTruthy()
    })

    it('renders location', () => {
      const subject = sym('https://example.com/event')
      store.add(subject, RDF('type'), SCHEMA('Event'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Meetup'), subject.doc())
      store.add(subject, SCHEMA('location'), lit('MIT Media Lab'), subject.doc())

      const container = document.createElement('div')
      eventPane.render(subject, store, container)

      const details = container.querySelectorAll('.event-detail')
      const texts = Array.from(details).map(d => d.textContent)
      expect(texts.some(t => t?.includes('MIT Media Lab'))).toBe(true)
    })

    it('renders organizer name', () => {
      const subject = sym('https://example.com/event')
      store.add(subject, RDF('type'), SCHEMA('Event'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Meetup'), subject.doc())

      const org = sym('https://example.com/org')
      store.add(subject, SCHEMA('organizer'), org, subject.doc())
      store.add(org, SCHEMA('name'), lit('W3C'), org.doc())

      const container = document.createElement('div')
      eventPane.render(subject, store, container)

      const details = container.querySelectorAll('.event-detail')
      const texts = Array.from(details).map(d => d.textContent)
      expect(texts.some(t => t?.includes('W3C'))).toBe(true)
    })

    it('renders description', () => {
      const subject = sym('https://example.com/event')
      store.add(subject, RDF('type'), SCHEMA('Event'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Meetup'), subject.doc())
      store.add(subject, SCHEMA('description'), lit('A great event about Solid.'), subject.doc())

      const container = document.createElement('div')
      eventPane.render(subject, store, container)

      expect(container.querySelector('.event-description')!.textContent).toBe('A great event about Solid.')
    })

    it('renders without description when not available', () => {
      const subject = sym('https://example.com/event')
      store.add(subject, RDF('type'), SCHEMA('Event'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Meetup'), subject.doc())

      const container = document.createElement('div')
      eventPane.render(subject, store, container)

      expect(container.querySelector('.event-description')).toBeNull()
    })
  })
})

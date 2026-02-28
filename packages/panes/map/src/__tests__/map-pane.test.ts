import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { mapPane } from '../map-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const SCHEMA = Namespace('http://schema.org/')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')

describe('mapPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches schema:Place type', () => {
      const subject = sym('https://example.com/place')
      store.add(subject, RDF('type'), SCHEMA('Place'), subject.doc())
      expect(mapPane.canHandle(subject, store)).toBe(true)
    })

    it('matches resource with direct coordinates', () => {
      const subject = sym('https://example.com/place')
      store.add(subject, SCHEMA('latitude'), lit('51.5074'), subject.doc())
      store.add(subject, SCHEMA('longitude'), lit('-0.1278'), subject.doc())
      expect(mapPane.canHandle(subject, store)).toBe(true)
    })

    it('matches resource with schema:geo node', () => {
      const subject = sym('https://example.com/place')
      const geo = sym('https://example.com/place#geo')
      store.add(subject, SCHEMA('geo'), geo, subject.doc())
      store.add(geo, SCHEMA('latitude'), lit('48.8566'), geo.doc())
      store.add(geo, SCHEMA('longitude'), lit('2.3522'), geo.doc())
      expect(mapPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects non-place resources without coordinates', () => {
      const subject = sym('https://example.com/profile')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(mapPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders place title', () => {
      const subject = sym('https://example.com/place')
      store.add(subject, RDF('type'), SCHEMA('Place'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('MIT Media Lab'), subject.doc())
      store.add(subject, SCHEMA('latitude'), lit('42.3601'), subject.doc())
      store.add(subject, SCHEMA('longitude'), lit('-71.0872'), subject.doc())

      const container = document.createElement('div')
      mapPane.render(subject, store, container)

      expect(container.querySelector('.map-title')!.textContent).toBe('MIT Media Lab')
    })

    it('renders OpenStreetMap iframe with coordinates', () => {
      const subject = sym('https://example.com/place')
      store.add(subject, SCHEMA('latitude'), lit('51.5074'), subject.doc())
      store.add(subject, SCHEMA('longitude'), lit('-0.1278'), subject.doc())

      const container = document.createElement('div')
      mapPane.render(subject, store, container)

      const iframe = container.querySelector('iframe')
      expect(iframe).not.toBeNull()
      expect(iframe!.src).toContain('openstreetmap.org')
      expect(iframe!.src).toContain('51.5074')
      expect(iframe!.src).toContain('-0.1278')
    })

    it('renders link to full OpenStreetMap', () => {
      const subject = sym('https://example.com/place')
      store.add(subject, SCHEMA('latitude'), lit('51.5074'), subject.doc())
      store.add(subject, SCHEMA('longitude'), lit('-0.1278'), subject.doc())

      const container = document.createElement('div')
      mapPane.render(subject, store, container)

      const link = container.querySelector('.map-osm-link') as HTMLAnchorElement
      expect(link).not.toBeNull()
      expect(link.href).toContain('openstreetmap.org')
      expect(link.textContent).toBe('View on OpenStreetMap')
    })

    it('renders address when available', () => {
      const subject = sym('https://example.com/place')
      store.add(subject, RDF('type'), SCHEMA('Place'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Office'), subject.doc())
      store.add(subject, SCHEMA('address'), lit('77 Mass Ave, Cambridge, MA'), subject.doc())
      store.add(subject, SCHEMA('latitude'), lit('42.3601'), subject.doc())
      store.add(subject, SCHEMA('longitude'), lit('-71.0872'), subject.doc())

      const container = document.createElement('div')
      mapPane.render(subject, store, container)

      expect(container.querySelector('.map-address')!.textContent).toBe('77 Mass Ave, Cambridge, MA')
    })

    it('shows message when Place has no coordinates', () => {
      const subject = sym('https://example.com/place')
      store.add(subject, RDF('type'), SCHEMA('Place'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Somewhere'), subject.doc())

      const container = document.createElement('div')
      mapPane.render(subject, store, container)

      expect(container.querySelector('.map-no-coords')!.textContent).toBe('No coordinates available for this place.')
      expect(container.querySelector('iframe')).toBeNull()
    })

    it('extracts coordinates from schema:geo node', () => {
      const subject = sym('https://example.com/place')
      const geo = sym('https://example.com/place#geo')
      store.add(subject, SCHEMA('name'), lit('Paris'), subject.doc())
      store.add(subject, SCHEMA('geo'), geo, subject.doc())
      store.add(geo, SCHEMA('latitude'), lit('48.8566'), geo.doc())
      store.add(geo, SCHEMA('longitude'), lit('2.3522'), geo.doc())

      const container = document.createElement('div')
      mapPane.render(subject, store, container)

      const iframe = container.querySelector('iframe')
      expect(iframe).not.toBeNull()
      expect(iframe!.src).toContain('48.8566')
    })
  })
})

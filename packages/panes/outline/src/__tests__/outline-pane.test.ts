import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { outlinePane } from '../outline-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const RDFS = Namespace('http://www.w3.org/2000/01/rdf-schema#')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')
const DCT = Namespace('http://purl.org/dc/terms/')
const SCHEMA = Namespace('https://schema.org/')

describe('outlinePane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('accepts any resource with triples', () => {
      const subject = sym('https://example.com/thing')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(outlinePane.canHandle(subject, store)).toBe(true)
    })

    it('rejects resources with no triples', () => {
      const subject = sym('https://example.com/empty')
      expect(outlinePane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders subject label from rdfs:label', () => {
      const subject = sym('https://example.com/thing')
      store.add(subject, RDFS('label'), lit('My Thing'), subject.doc())

      const container = document.createElement('div')
      outlinePane.render(subject, store, container)

      expect(container.querySelector('.outline-title')!.textContent).toBe('My Thing')
    })

    it('renders subject label from foaf:name', () => {
      const subject = sym('https://example.com/alice')
      store.add(subject, FOAF('name'), lit('Alice'), subject.doc())

      const container = document.createElement('div')
      outlinePane.render(subject, store, container)

      expect(container.querySelector('.outline-title')!.textContent).toBe('Alice')
    })

    it('renders subject URI', () => {
      const subject = sym('https://example.com/thing')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())

      const container = document.createElement('div')
      outlinePane.render(subject, store, container)

      const uriEl = container.querySelector('.outline-uri code')
      expect(uriEl).not.toBeNull()
      expect(uriEl!.textContent).toBe('https://example.com/thing')
    })

    it('renders triple count', () => {
      const subject = sym('https://example.com/thing')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      store.add(subject, FOAF('name'), lit('Alice'), subject.doc())
      store.add(subject, FOAF('age'), lit('30'), subject.doc())

      const container = document.createElement('div')
      outlinePane.render(subject, store, container)

      const count = container.querySelector('.outline-count')!.textContent!
      expect(count).toContain('3 triples')
    })

    it('renders property table with predicates and values', () => {
      const subject = sym('https://example.com/alice')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      store.add(subject, FOAF('name'), lit('Alice'), subject.doc())

      const container = document.createElement('div')
      outlinePane.render(subject, store, container)

      const table = container.querySelector('.outline-table')
      expect(table).not.toBeNull()

      const rows = table!.querySelectorAll('tbody tr')
      expect(rows.length).toBe(2) // type + name
    })

    it('renders NamedNode objects as clickable links', () => {
      const subject = sym('https://example.com/alice')
      const bob = sym('https://example.com/bob')
      store.add(subject, FOAF('knows'), bob, subject.doc())

      const container = document.createElement('div')
      outlinePane.render(subject, store, container)

      const link = container.querySelector('.outline-link') as HTMLAnchorElement
      expect(link).not.toBeNull()
      expect(link.href).toContain(encodeURIComponent('https://example.com/bob'))
    })

    it('renders literal values with language tags', () => {
      const subject = sym('https://example.com/thing')
      store.add(subject, RDFS('label'), lit('Bonjour', 'fr'), subject.doc())

      const container = document.createElement('div')
      outlinePane.render(subject, store, container)

      const langTag = container.querySelector('.outline-lang')
      expect(langTag).not.toBeNull()
      expect(langTag!.textContent).toBe('@fr')
    })

    it('renders empty state for resource with no triples', () => {
      // This shouldn't happen since canHandle checks, but test defensively
      const subject = sym('https://example.com/empty')

      const container = document.createElement('div')
      outlinePane.render(subject, store, container)

      expect(container.querySelector('.outline-empty')).not.toBeNull()
    })

    it('puts rdf:type first in property order', () => {
      const subject = sym('https://example.com/alice')
      // Add name first, then type
      store.add(subject, FOAF('name'), lit('Alice'), subject.doc())
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())

      const container = document.createElement('div')
      outlinePane.render(subject, store, container)

      const firstPred = container.querySelector('.outline-predicate a')
      expect(firstPred).not.toBeNull()
      expect(firstPred!.textContent).toBe('type')
    })

    it('groups multiple values under same predicate', () => {
      const subject = sym('https://example.com/alice')
      const bob = sym('https://example.com/bob')
      const carol = sym('https://example.com/carol')
      store.add(subject, FOAF('knows'), bob, subject.doc())
      store.add(subject, FOAF('knows'), carol, subject.doc())

      const container = document.createElement('div')
      outlinePane.render(subject, store, container)

      // Should have one predicate cell with rowSpan
      const predCells = container.querySelectorAll('.outline-predicate')
      // Only one predicate cell since they're grouped
      const withRowSpan = Array.from(predCells).filter(
        (cell) => (cell as HTMLTableCellElement).rowSpan === 2
      )
      expect(withRowSpan.length).toBe(1)

      // But two object cells
      const objCells = container.querySelectorAll('.outline-object')
      expect(objCells.length).toBe(2)
    })

    it('renders predicate count in summary', () => {
      const subject = sym('https://example.com/alice')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      store.add(subject, FOAF('name'), lit('Alice'), subject.doc())

      const container = document.createElement('div')
      outlinePane.render(subject, store, container)

      const count = container.querySelector('.outline-count')!.textContent!
      expect(count).toContain('2 predicates')
    })
  })
})

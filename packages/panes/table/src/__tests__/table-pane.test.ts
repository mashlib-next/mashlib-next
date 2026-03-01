import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { tablePane, findTypedItems } from '../table-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const SCHEMA = Namespace('https://schema.org/')
const RDFS = Namespace('http://www.w3.org/2000/01/rdf-schema#')
const DCT = Namespace('http://purl.org/dc/terms/')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')

describe('tablePane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('findTypedItems', () => {
    it('finds items sharing a common type', () => {
      const doc = sym('https://example.com/data')
      const item1 = sym('https://example.com/data#p1')
      const item2 = sym('https://example.com/data#p2')
      const item3 = sym('https://example.com/data#p3')

      store.add(item1, RDF('type'), SCHEMA('Person'), doc)
      store.add(item2, RDF('type'), SCHEMA('Person'), doc)
      store.add(item3, RDF('type'), SCHEMA('Person'), doc)

      const result = findTypedItems(doc, store)
      expect(result).not.toBeNull()
      expect(result!.items).toHaveLength(3)
      expect(result!.typeUri).toBe(SCHEMA('Person').value)
    })

    it('returns null when fewer than 2 items', () => {
      const doc = sym('https://example.com/data')
      const item1 = sym('https://example.com/data#p1')
      store.add(item1, RDF('type'), SCHEMA('Person'), doc)

      const result = findTypedItems(doc, store)
      expect(result).toBeNull()
    })

    it('picks the type with most instances', () => {
      const doc = sym('https://example.com/data')
      store.add(sym('https://example.com/data#p1'), RDF('type'), SCHEMA('Person'), doc)
      store.add(sym('https://example.com/data#p2'), RDF('type'), SCHEMA('Person'), doc)
      store.add(sym('https://example.com/data#p3'), RDF('type'), SCHEMA('Person'), doc)
      store.add(sym('https://example.com/data#e1'), RDF('type'), SCHEMA('Event'), doc)
      store.add(sym('https://example.com/data#e2'), RDF('type'), SCHEMA('Event'), doc)

      const result = findTypedItems(doc, store)
      expect(result!.typeUri).toBe(SCHEMA('Person').value)
    })
  })

  describe('canHandle', () => {
    it('matches schema:Dataset type', () => {
      const subject = sym('https://example.com/dataset')
      store.add(subject, RDF('type'), SCHEMA('Dataset'), subject.doc())
      expect(tablePane.canHandle(subject, store)).toBe(true)
    })

    it('matches schema:ItemList type', () => {
      const subject = sym('https://example.com/list')
      store.add(subject, RDF('type'), SCHEMA('ItemList'), subject.doc())
      expect(tablePane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with schema:itemListElement', () => {
      const subject = sym('https://example.com/list')
      store.add(subject, SCHEMA('itemListElement'), sym('https://example.com/item/1'), subject.doc())
      expect(tablePane.canHandle(subject, store)).toBe(true)
    })

    it('matches documents with 3+ typed items', () => {
      const subject = sym('https://example.com/data')
      store.add(sym('https://example.com/data#a'), RDF('type'), SCHEMA('Person'), subject.doc())
      store.add(sym('https://example.com/data#b'), RDF('type'), SCHEMA('Person'), subject.doc())
      store.add(sym('https://example.com/data#c'), RDF('type'), SCHEMA('Person'), subject.doc())
      expect(tablePane.canHandle(subject, store)).toBe(true)
    })

    it('rejects documents with only 2 typed items', () => {
      const subject = sym('https://example.com/data')
      store.add(sym('https://example.com/data#a'), RDF('type'), SCHEMA('Person'), subject.doc())
      store.add(sym('https://example.com/data#b'), RDF('type'), SCHEMA('Person'), subject.doc())
      expect(tablePane.canHandle(subject, store)).toBe(false)
    })

    it('rejects non-collection resources', () => {
      const subject = sym('https://example.com/person')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(tablePane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders table title', () => {
      const subject = sym('https://example.com/data')
      store.add(subject, RDF('type'), SCHEMA('Dataset'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Employee List'), subject.doc())

      const container = document.createElement('div')
      tablePane.render(subject, store, container)

      expect(container.querySelector('.table-title')!.textContent).toBe('Employee List')
    })

    it('renders item count', () => {
      const subject = sym('https://example.com/data')
      store.add(subject, RDF('type'), SCHEMA('Dataset'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('People'), subject.doc())

      const p1 = sym('https://example.com/data#p1')
      const p2 = sym('https://example.com/data#p2')
      const p3 = sym('https://example.com/data#p3')
      store.add(p1, RDF('type'), SCHEMA('Person'), subject.doc())
      store.add(p2, RDF('type'), SCHEMA('Person'), subject.doc())
      store.add(p3, RDF('type'), SCHEMA('Person'), subject.doc())
      store.add(p1, SCHEMA('name'), lit('Alice'), subject.doc())
      store.add(p2, SCHEMA('name'), lit('Bob'), subject.doc())
      store.add(p3, SCHEMA('name'), lit('Charlie'), subject.doc())

      const container = document.createElement('div')
      tablePane.render(subject, store, container)

      expect(container.querySelector('.table-count')!.textContent).toContain('3')
    })

    it('renders table headers from predicates', () => {
      const subject = sym('https://example.com/data')
      store.add(subject, RDF('type'), SCHEMA('Dataset'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Data'), subject.doc())

      const p1 = sym('https://example.com/data#p1')
      const p2 = sym('https://example.com/data#p2')
      store.add(p1, RDF('type'), SCHEMA('Person'), subject.doc())
      store.add(p2, RDF('type'), SCHEMA('Person'), subject.doc())
      store.add(p1, SCHEMA('name'), lit('Alice'), subject.doc())
      store.add(p2, SCHEMA('name'), lit('Bob'), subject.doc())
      store.add(p1, SCHEMA('email'), lit('alice@example.com'), subject.doc())

      const container = document.createElement('div')
      tablePane.render(subject, store, container)

      const headers = container.querySelectorAll('.table-header')
      expect(headers.length).toBeGreaterThanOrEqual(1)
      const headerTexts = Array.from(headers).map(h => h.textContent)
      expect(headerTexts).toContain('name')
    })

    it('renders table rows with cell values', () => {
      const subject = sym('https://example.com/data')
      store.add(subject, RDF('type'), SCHEMA('Dataset'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Data'), subject.doc())

      const p1 = sym('https://example.com/data#p1')
      const p2 = sym('https://example.com/data#p2')
      store.add(p1, RDF('type'), SCHEMA('Person'), subject.doc())
      store.add(p2, RDF('type'), SCHEMA('Person'), subject.doc())
      store.add(p1, SCHEMA('name'), lit('Alice'), subject.doc())
      store.add(p2, SCHEMA('name'), lit('Bob'), subject.doc())

      const container = document.createElement('div')
      tablePane.render(subject, store, container)

      const rows = container.querySelectorAll('.table-row')
      expect(rows.length).toBe(2)
    })

    it('renders empty state', () => {
      const subject = sym('https://example.com/data')
      store.add(subject, RDF('type'), SCHEMA('Dataset'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Empty'), subject.doc())

      const container = document.createElement('div')
      tablePane.render(subject, store, container)

      expect(container.querySelector('.table-empty')!.textContent).toBe('No items to display.')
    })

    it('renders URI values as links', () => {
      const subject = sym('https://example.com/data')
      store.add(subject, RDF('type'), SCHEMA('Dataset'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Links'), subject.doc())

      const p1 = sym('https://example.com/data#p1')
      const p2 = sym('https://example.com/data#p2')
      store.add(p1, RDF('type'), SCHEMA('Person'), subject.doc())
      store.add(p2, RDF('type'), SCHEMA('Person'), subject.doc())
      store.add(p1, SCHEMA('url'), sym('https://alice.example.com'), subject.doc())
      store.add(p2, SCHEMA('url'), sym('https://bob.example.com'), subject.doc())

      const container = document.createElement('div')
      tablePane.render(subject, store, container)

      const links = container.querySelectorAll('.table-link')
      expect(links.length).toBeGreaterThanOrEqual(1)
    })

    it('prioritizes name column first', () => {
      const subject = sym('https://example.com/data')
      store.add(subject, RDF('type'), SCHEMA('Dataset'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Data'), subject.doc())

      const p1 = sym('https://example.com/data#p1')
      const p2 = sym('https://example.com/data#p2')
      store.add(p1, RDF('type'), SCHEMA('Person'), subject.doc())
      store.add(p2, RDF('type'), SCHEMA('Person'), subject.doc())
      store.add(p1, SCHEMA('email'), lit('a@example.com'), subject.doc())
      store.add(p1, SCHEMA('name'), lit('Alice'), subject.doc())
      store.add(p2, SCHEMA('email'), lit('b@example.com'), subject.doc())
      store.add(p2, SCHEMA('name'), lit('Bob'), subject.doc())

      const container = document.createElement('div')
      tablePane.render(subject, store, container)

      const headers = container.querySelectorAll('.table-header')
      expect(headers[0].textContent).toBe('name')
    })
  })
})

import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { padPane } from '../pad-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const PAD = Namespace('http://www.w3.org/ns/pim/pad#')
const SIOC = Namespace('http://rdfs.org/sioc/ns#')
const DC = Namespace('http://purl.org/dc/elements/1.1/')
const DCT = Namespace('http://purl.org/dc/terms/')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')

describe('padPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches pad:Notepad type', () => {
      const subject = sym('https://example.com/pad#this')
      store.add(subject, RDF('type'), PAD('Notepad'), subject.doc())
      expect(padPane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with pad:next', () => {
      const subject = sym('https://example.com/pad#this')
      const chunk = sym('https://example.com/pad#chunk1')
      store.add(subject, PAD('next'), chunk, subject.doc())
      expect(padPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects non-pad resources', () => {
      const subject = sym('https://example.com/profile')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(padPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders pad title from dct:title', () => {
      const subject = sym('https://example.com/pad#this')
      store.add(subject, RDF('type'), PAD('Notepad'), subject.doc())
      store.add(subject, DCT('title'), lit('My Notes'), subject.doc())

      const container = document.createElement('div')
      padPane.render(subject, store, container)

      expect(container.querySelector('.pad-title')!.textContent).toBe('My Notes')
    })

    it('renders empty state when no chunks', () => {
      const subject = sym('https://example.com/pad#this')
      store.add(subject, RDF('type'), PAD('Notepad'), subject.doc())

      const container = document.createElement('div')
      padPane.render(subject, store, container)

      expect(container.querySelector('.pad-empty')).not.toBeNull()
      expect(container.querySelector('.pad-empty')!.textContent).toBe('This notepad is empty.')
    })

    it('renders pad chunks from linked-list', () => {
      const subject = sym('https://example.com/pad#this')
      const chunk1 = sym('https://example.com/pad#chunk1')
      const chunk2 = sym('https://example.com/pad#chunk2')

      store.add(subject, RDF('type'), PAD('Notepad'), subject.doc())
      store.add(subject, PAD('next'), chunk1, subject.doc())
      store.add(chunk1, SIOC('content'), lit('First paragraph'), subject.doc())
      store.add(chunk1, PAD('next'), chunk2, subject.doc())
      store.add(chunk2, SIOC('content'), lit('Second paragraph'), subject.doc())
      store.add(chunk2, PAD('next'), subject, subject.doc()) // cycle back

      const container = document.createElement('div')
      padPane.render(subject, store, container)

      const chunks = container.querySelectorAll('.pad-chunk-text')
      expect(chunks.length).toBe(2)
      expect(chunks[0].textContent).toBe('First paragraph')
      expect(chunks[1].textContent).toBe('Second paragraph')
    })

    it('shows chunk count', () => {
      const subject = sym('https://example.com/pad#this')
      const chunk1 = sym('https://example.com/pad#chunk1')
      const chunk2 = sym('https://example.com/pad#chunk2')
      const chunk3 = sym('https://example.com/pad#chunk3')

      store.add(subject, RDF('type'), PAD('Notepad'), subject.doc())
      store.add(subject, PAD('next'), chunk1, subject.doc())
      store.add(chunk1, SIOC('content'), lit('A'), subject.doc())
      store.add(chunk1, PAD('next'), chunk2, subject.doc())
      store.add(chunk2, SIOC('content'), lit('B'), subject.doc())
      store.add(chunk2, PAD('next'), chunk3, subject.doc())
      store.add(chunk3, SIOC('content'), lit('C'), subject.doc())
      store.add(chunk3, PAD('next'), subject, subject.doc())

      const container = document.createElement('div')
      padPane.render(subject, store, container)

      expect(container.querySelector('.pad-count')!.textContent).toBe('3 chunks')
    })

    it('renders author names in multi-author pad', () => {
      const subject = sym('https://example.com/pad#this')
      const chunk1 = sym('https://example.com/pad#chunk1')
      const chunk2 = sym('https://example.com/pad#chunk2')
      const alice = sym('https://alice.example.com/profile#me')
      const bob = sym('https://bob.example.com/profile#me')

      store.add(subject, RDF('type'), PAD('Notepad'), subject.doc())
      store.add(subject, PAD('next'), chunk1, subject.doc())
      store.add(chunk1, SIOC('content'), lit('Alice wrote this'), subject.doc())
      store.add(chunk1, DC('author'), alice, subject.doc())
      store.add(alice, FOAF('name'), lit('Alice'), alice.doc())
      store.add(chunk1, PAD('next'), chunk2, subject.doc())
      store.add(chunk2, SIOC('content'), lit('Bob wrote this'), subject.doc())
      store.add(chunk2, DC('author'), bob, subject.doc())
      store.add(bob, FOAF('name'), lit('Bob'), bob.doc())
      store.add(chunk2, PAD('next'), subject, subject.doc())

      const container = document.createElement('div')
      padPane.render(subject, store, container)

      const authors = container.querySelectorAll('.pad-chunk-author')
      expect(authors.length).toBe(2)
      expect(authors[0].textContent).toBe('Alice')
      expect(authors[1].textContent).toBe('Bob')
    })

    it('renders creation date', () => {
      const subject = sym('https://example.com/pad#this')
      store.add(subject, RDF('type'), PAD('Notepad'), subject.doc())
      store.add(subject, DCT('created'), lit('2025-06-15T10:00:00Z'), subject.doc())

      const container = document.createElement('div')
      padPane.render(subject, store, container)

      const dateEl = container.querySelector('.pad-date')
      expect(dateEl).not.toBeNull()
      expect(dateEl!.textContent).toContain('Created:')
    })

    it('renders pad author', () => {
      const subject = sym('https://example.com/pad#this')
      const alice = sym('https://alice.example.com/profile#me')

      store.add(subject, RDF('type'), PAD('Notepad'), subject.doc())
      store.add(subject, DC('author'), alice, subject.doc())
      store.add(alice, FOAF('name'), lit('Alice'), alice.doc())

      const container = document.createElement('div')
      padPane.render(subject, store, container)

      const authorEl = container.querySelector('.pad-author')
      expect(authorEl).not.toBeNull()
      expect(authorEl!.textContent).toContain('Alice')
    })

    it('does not show author tags for single-author pad', () => {
      const subject = sym('https://example.com/pad#this')
      const chunk1 = sym('https://example.com/pad#chunk1')
      const alice = sym('https://alice.example.com/profile#me')

      store.add(subject, RDF('type'), PAD('Notepad'), subject.doc())
      store.add(subject, PAD('next'), chunk1, subject.doc())
      store.add(chunk1, SIOC('content'), lit('Only Alice'), subject.doc())
      store.add(chunk1, DC('author'), alice, subject.doc())
      store.add(alice, FOAF('name'), lit('Alice'), alice.doc())
      store.add(chunk1, PAD('next'), subject, subject.doc())

      const container = document.createElement('div')
      padPane.render(subject, store, container)

      const authors = container.querySelectorAll('.pad-chunk-author')
      expect(authors.length).toBe(0) // Single author — no inline tags
    })

    it('preserves line breaks in chunk content', () => {
      const subject = sym('https://example.com/pad#this')
      const chunk1 = sym('https://example.com/pad#chunk1')

      store.add(subject, RDF('type'), PAD('Notepad'), subject.doc())
      store.add(subject, PAD('next'), chunk1, subject.doc())
      store.add(chunk1, SIOC('content'), lit('Line 1\nLine 2\nLine 3'), subject.doc())
      store.add(chunk1, PAD('next'), subject, subject.doc())

      const container = document.createElement('div')
      padPane.render(subject, store, container)

      const textEl = container.querySelector('.pad-chunk-text')!
      const brs = textEl.querySelectorAll('br')
      expect(brs.length).toBe(2)
    })
  })
})

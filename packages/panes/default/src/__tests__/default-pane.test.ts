import { describe, it, expect } from 'vitest'
import { graph, sym, Namespace } from 'rdflib'
import { defaultPane } from '../default-pane.js'

const DC = Namespace('http://purl.org/dc/elements/1.1/')
const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')

describe('defaultPane.canHandle', () => {
  it('returns true for any resource', () => {
    const store = graph()
    expect(defaultPane.canHandle(sym('http://example.org/anything'), store)).toBe(true)
  })
})

describe('defaultPane.render', () => {
  it('renders properties as a table', () => {
    const store = graph()
    const subject = sym('http://example.org/doc#alice')
    const doc = subject.doc()
    store.add(subject, RDF('type'), FOAF('Person'), doc)
    store.add(subject, FOAF('name'), 'Alice', doc)
    store.add(subject, FOAF('knows'), sym('http://example.org/bob'), doc)

    const container = document.createElement('div')
    defaultPane.render(subject, store, container)

    expect(container.querySelector('h2')?.textContent).toBe('alice')
    const table = container.querySelector('.properties-table')
    expect(table).not.toBeNull()
    const rows = container.querySelectorAll('tbody tr')
    expect(rows).toHaveLength(3)
  })

  it('renders URI objects as links', () => {
    const store = graph()
    const subject = sym('http://example.org/doc#alice')
    store.add(subject, FOAF('knows'), sym('http://example.org/bob'), subject.doc())

    const container = document.createElement('div')
    defaultPane.render(subject, store, container)

    const valueLinks = container.querySelectorAll('.prop-value a')
    expect(valueLinks).toHaveLength(1)
    expect((valueLinks[0] as HTMLAnchorElement).href).toBe('http://example.org/bob')
  })

  it('renders literal objects as text', () => {
    const store = graph()
    const subject = sym('http://example.org/doc#alice')
    store.add(subject, FOAF('name'), 'Alice Smith', subject.doc())

    const container = document.createElement('div')
    defaultPane.render(subject, store, container)

    const valueCells = container.querySelectorAll('.prop-value')
    expect(valueCells[0].textContent).toBe('Alice Smith')
  })

  it('shows empty message when no properties', () => {
    const store = graph()
    const subject = sym('http://example.org/empty')

    const container = document.createElement('div')
    defaultPane.render(subject, store, container)

    expect(container.textContent).toContain('No properties found')
  })
})

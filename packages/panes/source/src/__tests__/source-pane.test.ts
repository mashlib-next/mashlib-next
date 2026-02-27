import { describe, it, expect } from 'vitest'
import { graph, sym, Namespace } from 'rdflib'
import { sourcePane } from '../source-pane.js'

const DC = Namespace('http://purl.org/dc/elements/1.1/')
const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')

describe('sourcePane.canHandle', () => {
  it('returns true for any resource', () => {
    const store = graph()
    expect(sourcePane.canHandle(sym('http://example.org/anything'), store)).toBe(true)
  })
})

describe('sourcePane.render', () => {
  it('renders triples as source text', () => {
    const store = graph()
    const subject = sym('http://example.org/doc#thing')
    store.add(subject, DC('title'), 'Hello World', subject.doc())
    store.add(subject, RDF('type'), FOAF('Document'), subject.doc())

    const container = document.createElement('div')
    sourcePane.render(subject, store, container)

    expect(container.querySelector('h2')?.textContent).toBe('Source')
    const pre = container.querySelector('pre')
    expect(pre).not.toBeNull()
    expect(pre?.textContent).toContain('Hello World')
  })

  it('shows empty message when no triples', () => {
    const store = graph()
    const subject = sym('http://example.org/empty')

    const container = document.createElement('div')
    sourcePane.render(subject, store, container)

    expect(container.querySelector('p')?.textContent).toContain('No triples found')
  })
})

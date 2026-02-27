import { describe, it, expect } from 'vitest'
import { createStore } from '../create-store.js'
import { sym, Namespace } from 'rdflib'

const EX = Namespace('http://example.org/')

describe('createStore', () => {
  it('returns a store, fetcher, and fetchDocument function', () => {
    const result = createStore()
    expect(result.store).toBeDefined()
    expect(result.fetcher).toBeDefined()
    expect(typeof result.fetchDocument).toBe('function')
  })

  it('can add and query triples', () => {
    const { store } = createStore()
    const subject = sym('http://example.org/item1')
    const predicate = EX('title')

    store.add(subject, predicate, 'Test Title', subject.doc())

    const results = store.match(subject, predicate, null, null)
    expect(results).toHaveLength(1)
    expect(results[0].object.value).toBe('Test Title')
  })

  it('store.each returns matching objects', () => {
    const { store } = createStore()
    const s = sym('http://example.org/item1')
    store.add(s, EX('tag'), 'a', s.doc())
    store.add(s, EX('tag'), 'b', s.doc())

    const tags = store.each(s, EX('tag'))
    expect(tags).toHaveLength(2)
  })
})

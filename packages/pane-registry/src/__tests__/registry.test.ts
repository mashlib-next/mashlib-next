import { describe, it, expect, beforeEach } from 'vitest'
import { register, findPane, findMatchingPanes, clearRegistry, listPanes } from '../registry.js'
import type { Pane } from '../types.js'
import { sym, graph } from 'rdflib'

function makeMockPane(label: string, handles: boolean): Pane {
  return {
    label,
    icon: '?',
    canHandle: () => handles,
    render: () => {},
  }
}

describe('pane-registry', () => {
  beforeEach(() => {
    clearRegistry()
  })

  it('returns undefined when no panes registered', () => {
    const store = graph()
    const result = findPane(sym('http://example.org/x'), store)
    expect(result).toBeUndefined()
  })

  it('finds a pane that can handle the subject', () => {
    register(makeMockPane('fallback', false))
    register(makeMockPane('handler', true))

    const store = graph()
    const result = findPane(sym('http://example.org/x'), store)
    expect(result?.label).toBe('handler')
  })

  it('last registered pane takes priority', () => {
    register(makeMockPane('first', true))
    register(makeMockPane('second', true))

    const store = graph()
    const result = findPane(sym('http://example.org/x'), store)
    expect(result?.label).toBe('second')
  })

  it('lists all registered panes', () => {
    register(makeMockPane('a', true))
    register(makeMockPane('b', false))
    expect(listPanes()).toHaveLength(2)
  })

  describe('findMatchingPanes', () => {
    it('returns all matching panes in priority order', () => {
      register(makeMockPane('source', true))
      register(makeMockPane('default', true))
      register(makeMockPane('noMatch', false))
      register(makeMockPane('profile', true))

      const store = graph()
      const result = findMatchingPanes(sym('http://example.org/x'), store)
      expect(result.map(p => p.label)).toEqual(['profile', 'default', 'source'])
    })

    it('returns empty array when nothing matches', () => {
      register(makeMockPane('a', false))
      register(makeMockPane('b', false))

      const store = graph()
      expect(findMatchingPanes(sym('http://example.org/x'), store)).toEqual([])
    })

    it('skips panes that throw in canHandle', () => {
      register(makeMockPane('good', true))
      register({
        label: 'broken',
        icon: '!',
        canHandle: () => { throw new Error('boom') },
        render: () => {},
      })

      const store = graph()
      const result = findMatchingPanes(sym('http://example.org/x'), store)
      expect(result).toHaveLength(1)
      expect(result[0].label).toBe('good')
    })
  })
})

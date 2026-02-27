import { describe, it, expect, beforeEach } from 'vitest'
import { register, findPane, clearRegistry, listPanes } from '../registry.js'
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
})

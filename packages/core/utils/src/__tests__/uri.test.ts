import { describe, it, expect } from 'vitest'
import { fragment, docUrl, labelFromUri } from '../uri.js'

describe('uri utilities', () => {
  it('extracts fragment from URI', () => {
    expect(fragment('http://example.org/doc#thing')).toBe('thing')
  })

  it('returns empty string when no fragment', () => {
    expect(fragment('http://example.org/doc')).toBe('')
  })

  it('extracts document URL', () => {
    expect(docUrl('http://example.org/doc#thing')).toBe('http://example.org/doc')
  })

  it('derives label from fragment', () => {
    expect(labelFromUri('http://example.org/vocab#MyClass')).toBe('MyClass')
  })

  it('derives label from last path segment', () => {
    expect(labelFromUri('http://example.org/things/my-item')).toBe('my-item')
  })
})

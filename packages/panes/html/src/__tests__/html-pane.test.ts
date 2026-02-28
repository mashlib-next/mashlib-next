import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { htmlPane } from '../html-pane.js'

describe('htmlPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches .html files', () => {
      const subject = sym('https://example.com/page.html')
      expect(htmlPane.canHandle(subject, store)).toBe(true)
    })

    it('matches .htm files', () => {
      const subject = sym('https://example.com/page.htm')
      expect(htmlPane.canHandle(subject, store)).toBe(true)
    })

    it('matches .xhtml files', () => {
      const subject = sym('https://example.com/page.xhtml')
      expect(htmlPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects non-html files', () => {
      const subject = sym('https://example.com/data.ttl')
      expect(htmlPane.canHandle(subject, store)).toBe(false)
    })

    it('rejects markdown files', () => {
      const subject = sym('https://example.com/README.md')
      expect(htmlPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders a sandboxed iframe with correct src', () => {
      const subject = sym('https://example.com/page.html')
      const container = document.createElement('div')
      htmlPane.render(subject, store, container)

      const iframe = container.querySelector('iframe')
      expect(iframe).not.toBeNull()
      expect(iframe!.src).toBe('https://example.com/page.html')
      expect(iframe!.getAttribute('sandbox')).toContain('allow-same-origin')
    })

    it('does not allow scripts in sandbox', () => {
      const subject = sym('https://example.com/page.html')
      const container = document.createElement('div')
      htmlPane.render(subject, store, container)

      const iframe = container.querySelector('iframe')
      expect(iframe!.getAttribute('sandbox')).not.toContain('allow-scripts')
    })

    it('has the html-view wrapper class', () => {
      const subject = sym('https://example.com/page.html')
      const container = document.createElement('div')
      htmlPane.render(subject, store, container)

      expect(container.querySelector('.html-view')).not.toBeNull()
    })
  })
})

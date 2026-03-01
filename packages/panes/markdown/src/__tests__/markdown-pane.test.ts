import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { markdownPane } from '../markdown-pane.js'

const SOLID = Namespace('http://www.w3.org/ns/solid/terms#')
const DCT = Namespace('http://purl.org/dc/terms/')

describe('markdownPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches .md files', () => {
      const subject = sym('https://example.com/README.md')
      expect(markdownPane.canHandle(subject, store)).toBe(true)
    })

    it('matches .markdown files', () => {
      const subject = sym('https://example.com/docs/guide.markdown')
      expect(markdownPane.canHandle(subject, store)).toBe(true)
    })

    it('matches .mdown files', () => {
      const subject = sym('https://example.com/notes.mdown')
      expect(markdownPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects non-markdown files', () => {
      const subject = sym('https://example.com/data.ttl')
      expect(markdownPane.canHandle(subject, store)).toBe(false)
    })

    it('rejects HTML files', () => {
      const subject = sym('https://example.com/page.html')
      expect(markdownPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders markdown from solid:content triple', async () => {
      const subject = sym('https://example.com/README.md')
      store.add(subject, SOLID('content'), lit('# Hello\n\nThis is **bold**.'), subject.doc())

      const container = document.createElement('div')
      markdownPane.render(subject, store, container)

      // Wait for dynamic import('marked') to resolve
      await new Promise(r => setTimeout(r, 50))

      const view = container.querySelector('.markdown-view')!
      expect(view.querySelector('h1')!.textContent).toBe('Hello')
      expect(view.querySelector('strong')!.textContent).toBe('bold')
    })

    it('renders markdown from dct:content triple', async () => {
      const subject = sym('https://example.com/README.md')
      store.add(subject, DCT('content'), lit('- item one\n- item two'), subject.doc())

      const container = document.createElement('div')
      markdownPane.render(subject, store, container)

      await new Promise(r => setTimeout(r, 50))

      const view = container.querySelector('.markdown-view')!
      const items = view.querySelectorAll('li')
      expect(items.length).toBe(2)
      expect(items[0].textContent).toBe('item one')
      expect(items[1].textContent).toBe('item two')
    })

    it('shows loading state when no content in store', () => {
      const subject = sym('https://example.com/README.md')

      const container = document.createElement('div')
      markdownPane.render(subject, store, container)

      const loading = container.querySelector('.loading')
      expect(loading).not.toBeNull()
      expect(loading!.textContent).toBe('Loading markdown...')
    })
  })
})

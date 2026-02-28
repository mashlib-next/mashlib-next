import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { bookmarksPane } from '../bookmarks-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const BOOK = Namespace('http://www.w3.org/2002/01/bookmark#')
const DCT = Namespace('http://purl.org/dc/terms/')
const XSD = Namespace('http://www.w3.org/2001/XMLSchema#')

describe('bookmarksPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches book:BookmarkList type', () => {
      const subject = sym('https://example.com/bookmarks')
      store.add(subject, RDF('type'), BOOK('BookmarkList'), subject.doc())
      expect(bookmarksPane.canHandle(subject, store)).toBe(true)
    })

    it('matches book:Topic type', () => {
      const subject = sym('https://example.com/topic')
      store.add(subject, RDF('type'), BOOK('Topic'), subject.doc())
      expect(bookmarksPane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with hasMember containing Bookmark', () => {
      const subject = sym('https://example.com/bookmarks')
      const bm = sym('https://example.com/bookmarks#bm1')
      store.add(subject, BOOK('hasMember'), bm, subject.doc())
      store.add(bm, RDF('type'), BOOK('Bookmark'), bm.doc())
      expect(bookmarksPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects resources without bookmark indicators', () => {
      const subject = sym('https://example.com/other')
      expect(bookmarksPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders collection title', () => {
      const subject = sym('https://example.com/bookmarks')
      store.add(subject, RDF('type'), BOOK('BookmarkList'), subject.doc())
      store.add(subject, DCT('title'), lit('My Links'), subject.doc())

      const container = document.createElement('div')
      bookmarksPane.render(subject, store, container)

      expect(container.querySelector('.bookmarks-title')!.textContent).toBe('My Links')
    })

    it('renders empty state when no bookmarks', () => {
      const subject = sym('https://example.com/bookmarks')
      store.add(subject, RDF('type'), BOOK('BookmarkList'), subject.doc())

      const container = document.createElement('div')
      bookmarksPane.render(subject, store, container)

      expect(container.querySelector('.bookmarks-count')!.textContent).toBe('0 bookmarks')
      expect(container.querySelector('.bookmarks-empty')).not.toBeNull()
    })

    it('renders bookmarks with title and recalled URL', () => {
      const subject = sym('https://example.com/bookmarks')
      store.add(subject, RDF('type'), BOOK('BookmarkList'), subject.doc())

      const bm = sym('https://example.com/bookmarks#bm1')
      store.add(subject, BOOK('hasMember'), bm, subject.doc())
      store.add(bm, DCT('title'), lit('Solid Project'), bm.doc())
      store.add(bm, BOOK('recalls'), sym('https://solidproject.org/'), bm.doc())

      const container = document.createElement('div')
      bookmarksPane.render(subject, store, container)

      const titleLink = container.querySelector('.bookmark-title') as HTMLAnchorElement
      expect(titleLink.textContent).toBe('Solid Project')
      expect(titleLink.href).toBe('https://solidproject.org/')

      const urlEl = container.querySelector('.bookmark-url')
      expect(urlEl!.textContent).toBe('https://solidproject.org/')
    })

    it('shows bookmark count', () => {
      const subject = sym('https://example.com/bookmarks')
      store.add(subject, RDF('type'), BOOK('BookmarkList'), subject.doc())

      for (let i = 0; i < 3; i++) {
        const bm = sym(`https://example.com/bookmarks#bm${i}`)
        store.add(subject, BOOK('hasMember'), bm, subject.doc())
        store.add(bm, DCT('title'), lit(`Link ${i}`), bm.doc())
      }

      const container = document.createElement('div')
      bookmarksPane.render(subject, store, container)

      expect(container.querySelector('.bookmarks-count')!.textContent).toBe('3 bookmarks')
    })

    it('renders description when available', () => {
      const subject = sym('https://example.com/bookmarks')
      store.add(subject, RDF('type'), BOOK('BookmarkList'), subject.doc())

      const bm = sym('https://example.com/bookmarks#bm1')
      store.add(subject, BOOK('hasMember'), bm, subject.doc())
      store.add(bm, DCT('title'), lit('Example'), bm.doc())
      store.add(bm, DCT('description'), lit('A useful link'), bm.doc())

      const container = document.createElement('div')
      bookmarksPane.render(subject, store, container)

      expect(container.querySelector('.bookmark-desc')!.textContent).toBe('A useful link')
    })

    it('renders date when available', () => {
      const subject = sym('https://example.com/bookmarks')
      store.add(subject, RDF('type'), BOOK('BookmarkList'), subject.doc())

      const bm = sym('https://example.com/bookmarks#bm1')
      store.add(subject, BOOK('hasMember'), bm, subject.doc())
      store.add(bm, DCT('title'), lit('Example'), bm.doc())
      store.add(bm, DCT('created'), lit('2025-03-15T10:00:00Z', undefined, XSD('dateTime')), bm.doc())

      const container = document.createElement('div')
      bookmarksPane.render(subject, store, container)

      const dateEl = container.querySelector('.bookmark-date')
      expect(dateEl).not.toBeNull()
      expect(dateEl!.textContent).toBeTruthy()
    })
  })
})

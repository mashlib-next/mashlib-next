import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { articlePane } from '../article-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const SCHEMA = Namespace('https://schema.org/')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')

describe('articlePane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches schema:Article type', () => {
      const subject = sym('https://example.com/article')
      store.add(subject, RDF('type'), SCHEMA('Article'), subject.doc())
      expect(articlePane.canHandle(subject, store)).toBe(true)
    })

    it('matches schema:BlogPosting type', () => {
      const subject = sym('https://example.com/post')
      store.add(subject, RDF('type'), SCHEMA('BlogPosting'), subject.doc())
      expect(articlePane.canHandle(subject, store)).toBe(true)
    })

    it('matches schema:NewsArticle type', () => {
      const subject = sym('https://example.com/news')
      store.add(subject, RDF('type'), SCHEMA('NewsArticle'), subject.doc())
      expect(articlePane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with schema:headline', () => {
      const subject = sym('https://example.com/post')
      store.add(subject, SCHEMA('headline'), lit('Breaking News'), subject.doc())
      expect(articlePane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with schema:articleBody', () => {
      const subject = sym('https://example.com/post')
      store.add(subject, SCHEMA('articleBody'), lit('Some content...'), subject.doc())
      expect(articlePane.canHandle(subject, store)).toBe(true)
    })

    it('rejects non-article resources', () => {
      const subject = sym('https://example.com/profile')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(articlePane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders article title from headline', () => {
      const subject = sym('https://example.com/article')
      store.add(subject, RDF('type'), SCHEMA('Article'), subject.doc())
      store.add(subject, SCHEMA('headline'), lit('Solid Protocol Update'), subject.doc())

      const container = document.createElement('div')
      articlePane.render(subject, store, container)

      expect(container.querySelector('.article-title')!.textContent).toBe('Solid Protocol Update')
    })

    it('renders author and date', () => {
      const subject = sym('https://example.com/article')
      store.add(subject, RDF('type'), SCHEMA('Article'), subject.doc())
      store.add(subject, SCHEMA('headline'), lit('Test'), subject.doc())

      const author = sym('https://example.com/alice')
      store.add(subject, SCHEMA('author'), author, subject.doc())
      store.add(author, SCHEMA('name'), lit('Alice Smith'), author.doc())
      store.add(subject, SCHEMA('datePublished'), lit('2025-06-15'), subject.doc())

      const container = document.createElement('div')
      articlePane.render(subject, store, container)

      expect(container.querySelector('.article-author')!.textContent).toBe('Alice Smith')
      const dateEl = container.querySelector('.article-date')
      expect(dateEl).not.toBeNull()
      expect(dateEl!.getAttribute('datetime')).toBe('2025-06-15')
    })

    it('renders article body with paragraphs', () => {
      const subject = sym('https://example.com/article')
      store.add(subject, RDF('type'), SCHEMA('Article'), subject.doc())
      store.add(subject, SCHEMA('headline'), lit('Test'), subject.doc())
      store.add(subject, SCHEMA('articleBody'), lit('First paragraph.\n\nSecond paragraph.'), subject.doc())

      const container = document.createElement('div')
      articlePane.render(subject, store, container)

      const paragraphs = container.querySelectorAll('.article-body p')
      expect(paragraphs.length).toBe(2)
      expect(paragraphs[0].textContent).toBe('First paragraph.')
      expect(paragraphs[1].textContent).toBe('Second paragraph.')
    })

    it('renders hero image', () => {
      const subject = sym('https://example.com/article')
      store.add(subject, RDF('type'), SCHEMA('Article'), subject.doc())
      store.add(subject, SCHEMA('headline'), lit('Test'), subject.doc())
      store.add(subject, SCHEMA('image'), sym('https://example.com/hero.jpg'), subject.doc())

      const container = document.createElement('div')
      articlePane.render(subject, store, container)

      const img = container.querySelector('.article-image') as HTMLImageElement
      expect(img).not.toBeNull()
      expect(img.src).toBe('https://example.com/hero.jpg')
    })

    it('renders description', () => {
      const subject = sym('https://example.com/article')
      store.add(subject, RDF('type'), SCHEMA('Article'), subject.doc())
      store.add(subject, SCHEMA('headline'), lit('Test'), subject.doc())
      store.add(subject, SCHEMA('description'), lit('A brief summary.'), subject.doc())

      const container = document.createElement('div')
      articlePane.render(subject, store, container)

      expect(container.querySelector('.article-description')!.textContent).toBe('A brief summary.')
    })

    it('renders keywords as tags', () => {
      const subject = sym('https://example.com/article')
      store.add(subject, RDF('type'), SCHEMA('Article'), subject.doc())
      store.add(subject, SCHEMA('headline'), lit('Test'), subject.doc())
      store.add(subject, SCHEMA('keywords'), lit('solid'), subject.doc())
      store.add(subject, SCHEMA('keywords'), lit('web'), subject.doc())

      const container = document.createElement('div')
      articlePane.render(subject, store, container)

      const tags = container.querySelectorAll('.article-tag')
      expect(tags.length).toBe(2)
    })

    it('renders without optional fields', () => {
      const subject = sym('https://example.com/article')
      store.add(subject, RDF('type'), SCHEMA('Article'), subject.doc())
      store.add(subject, SCHEMA('headline'), lit('Minimal Article'), subject.doc())

      const container = document.createElement('div')
      articlePane.render(subject, store, container)

      expect(container.querySelector('.article-title')!.textContent).toBe('Minimal Article')
      expect(container.querySelector('.article-byline')).toBeNull()
      expect(container.querySelector('.article-image')).toBeNull()
      expect(container.querySelector('.article-body')).toBeNull()
    })
  })
})

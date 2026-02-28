import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { microblogPane } from '../microblog-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const SIOC = Namespace('http://rdfs.org/sioc/ns#')
const SIOCt = Namespace('http://rdfs.org/sioc/types#')
const DCT = Namespace('http://purl.org/dc/terms/')
const DC = Namespace('http://purl.org/dc/elements/1.1/')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')
const XSD = Namespace('http://www.w3.org/2001/XMLSchema#')

describe('microblogPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches SIOCt:Microblog type', () => {
      const subject = sym('https://example.com/microblog')
      store.add(subject, RDF('type'), SIOCt('Microblog'), subject.doc())
      expect(microblogPane.canHandle(subject, store)).toBe(true)
    })

    it('matches SIOCt:MicroblogPost type', () => {
      const subject = sym('https://example.com/post1')
      store.add(subject, RDF('type'), SIOCt('MicroblogPost'), subject.doc())
      expect(microblogPane.canHandle(subject, store)).toBe(true)
    })

    it('matches sioc:Forum type', () => {
      const subject = sym('https://example.com/forum')
      store.add(subject, RDF('type'), SIOC('Forum'), subject.doc())
      expect(microblogPane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with sioc:container_of posts', () => {
      const subject = sym('https://example.com/microblog')
      const post = sym('https://example.com/post1')
      store.add(subject, SIOC('container_of'), post, subject.doc())
      store.add(post, SIOC('content'), lit('Hello world'), subject.doc())
      expect(microblogPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects non-microblog resources', () => {
      const subject = sym('https://example.com/profile')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(microblogPane.canHandle(subject, store)).toBe(false)
    })

    it('rejects container_of without sioc:content in items', () => {
      const subject = sym('https://example.com/container')
      const item = sym('https://example.com/item1')
      store.add(subject, SIOC('container_of'), item, subject.doc())
      // item has no sioc:content
      expect(microblogPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders feed title', () => {
      const subject = sym('https://example.com/microblog')
      store.add(subject, RDF('type'), SIOCt('Microblog'), subject.doc())
      store.add(subject, DCT('title'), lit('My Thoughts'), subject.doc())

      const container = document.createElement('div')
      microblogPane.render(subject, store, container)

      expect(container.querySelector('.microblog-title')!.textContent).toBe('My Thoughts')
    })

    it('renders feed description', () => {
      const subject = sym('https://example.com/microblog')
      store.add(subject, RDF('type'), SIOCt('Microblog'), subject.doc())
      store.add(subject, DCT('description'), lit('Short updates about my day'), subject.doc())

      const container = document.createElement('div')
      microblogPane.render(subject, store, container)

      const desc = container.querySelector('.microblog-description')
      expect(desc).not.toBeNull()
      expect(desc!.textContent).toBe('Short updates about my day')
    })

    it('renders empty state', () => {
      const subject = sym('https://example.com/microblog')
      store.add(subject, RDF('type'), SIOCt('Microblog'), subject.doc())

      const container = document.createElement('div')
      microblogPane.render(subject, store, container)

      expect(container.querySelector('.microblog-count')!.textContent).toBe('0 posts')
      expect(container.querySelector('.microblog-empty')).not.toBeNull()
    })

    it('renders posts with content', () => {
      const subject = sym('https://example.com/microblog')
      store.add(subject, RDF('type'), SIOCt('Microblog'), subject.doc())

      const post1 = sym('https://example.com/post1')
      const post2 = sym('https://example.com/post2')

      store.add(subject, SIOC('container_of'), post1, subject.doc())
      store.add(post1, SIOC('content'), lit('First post!'), subject.doc())
      store.add(post1, DCT('created'), lit('2025-06-15T10:00:00Z', undefined, XSD('dateTime')), subject.doc())

      store.add(subject, SIOC('container_of'), post2, subject.doc())
      store.add(post2, SIOC('content'), lit('Second post!'), subject.doc())
      store.add(post2, DCT('created'), lit('2025-06-15T11:00:00Z', undefined, XSD('dateTime')), subject.doc())

      const container = document.createElement('div')
      microblogPane.render(subject, store, container)

      const posts = container.querySelectorAll('.microblog-post-content')
      expect(posts.length).toBe(2)
      // Newest first
      expect(posts[0].textContent).toBe('Second post!')
      expect(posts[1].textContent).toBe('First post!')
    })

    it('shows post count', () => {
      const subject = sym('https://example.com/microblog')
      store.add(subject, RDF('type'), SIOCt('Microblog'), subject.doc())

      for (let i = 0; i < 3; i++) {
        const post = sym(`https://example.com/post${i}`)
        store.add(subject, SIOC('container_of'), post, subject.doc())
        store.add(post, SIOC('content'), lit(`Post ${i}`), subject.doc())
      }

      const container = document.createElement('div')
      microblogPane.render(subject, store, container)

      expect(container.querySelector('.microblog-count')!.textContent).toBe('3 posts')
    })

    it('renders post creator', () => {
      const subject = sym('https://example.com/microblog')
      store.add(subject, RDF('type'), SIOCt('Microblog'), subject.doc())

      const post = sym('https://example.com/post1')
      const alice = sym('https://alice.example.com/profile#me')
      store.add(subject, SIOC('container_of'), post, subject.doc())
      store.add(post, SIOC('content'), lit('Hello!'), subject.doc())
      store.add(post, SIOC('has_creator'), alice, subject.doc())
      store.add(alice, FOAF('name'), lit('Alice'), alice.doc())

      const container = document.createElement('div')
      microblogPane.render(subject, store, container)

      const author = container.querySelector('.microblog-post-author')
      expect(author).not.toBeNull()
      expect(author!.textContent).toBe('Alice')
    })

    it('renders character count', () => {
      const subject = sym('https://example.com/microblog')
      store.add(subject, RDF('type'), SIOCt('Microblog'), subject.doc())

      const post = sym('https://example.com/post1')
      store.add(subject, SIOC('container_of'), post, subject.doc())
      store.add(post, SIOC('content'), lit('Short post'), subject.doc())

      const container = document.createElement('div')
      microblogPane.render(subject, store, container)

      const charCount = container.querySelector('.microblog-char-count')
      expect(charCount).not.toBeNull()
      expect(charCount!.textContent).toBe('10')
    })

    it('renders single post view', () => {
      const subject = sym('https://example.com/post1')
      store.add(subject, RDF('type'), SIOCt('MicroblogPost'), subject.doc())
      store.add(subject, SIOC('content'), lit('A single microblog post'), subject.doc())

      const container = document.createElement('div')
      microblogPane.render(subject, store, container)

      expect(container.querySelector('.microblog-title')!.textContent).toBe('Microblog Post')
      const content = container.querySelector('.microblog-post-content')
      expect(content).not.toBeNull()
      expect(content!.textContent).toBe('A single microblog post')
    })

    it('renders links in post content', () => {
      const subject = sym('https://example.com/microblog')
      store.add(subject, RDF('type'), SIOCt('Microblog'), subject.doc())

      const post = sym('https://example.com/post1')
      store.add(subject, SIOC('container_of'), post, subject.doc())
      store.add(post, SIOC('content'), lit('Check https://example.com/cool'), subject.doc())

      const container = document.createElement('div')
      microblogPane.render(subject, store, container)

      const link = container.querySelector('.microblog-post-content a') as HTMLAnchorElement
      expect(link).not.toBeNull()
      expect(link.href).toContain('example.com/cool')
      expect(link.target).toBe('_blank')
    })
  })
})

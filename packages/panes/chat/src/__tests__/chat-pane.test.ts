import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { chatPane } from '../chat-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const MEE = Namespace('http://www.w3.org/ns/pim/meeting#')
const WF = Namespace('http://www.w3.org/2005/01/wf/flow#')
const SIOC = Namespace('http://rdfs.org/sioc/ns#')
const DCT = Namespace('http://purl.org/dc/terms/')
const DC = Namespace('http://purl.org/dc/elements/1.1/')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')
const XSD = Namespace('http://www.w3.org/2001/XMLSchema#')

describe('chatPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches mee:LongChat type', () => {
      const subject = sym('https://example.com/chat')
      store.add(subject, RDF('type'), MEE('LongChat'), subject.doc())
      expect(chatPane.canHandle(subject, store)).toBe(true)
    })

    it('matches mee:ShortChat type', () => {
      const subject = sym('https://example.com/chat')
      store.add(subject, RDF('type'), MEE('ShortChat'), subject.doc())
      expect(chatPane.canHandle(subject, store)).toBe(true)
    })

    it('matches wf:Flow type', () => {
      const subject = sym('https://example.com/chat')
      store.add(subject, RDF('type'), WF('Flow'), subject.doc())
      expect(chatPane.canHandle(subject, store)).toBe(true)
    })

    it('matches sioc:Thread type', () => {
      const subject = sym('https://example.com/thread')
      store.add(subject, RDF('type'), SIOC('Thread'), subject.doc())
      expect(chatPane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with wf:message', () => {
      const subject = sym('https://example.com/chat')
      const msg = sym('https://example.com/chat#msg1')
      store.add(subject, WF('message'), msg, subject.doc())
      expect(chatPane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing for a message (content + created)', () => {
      const subject = sym('https://example.com/msg')
      store.add(subject, SIOC('content'), lit('Hello'), subject.doc())
      store.add(subject, DCT('created'), lit('2025-06-15T10:00:00Z'), subject.doc())
      expect(chatPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects non-chat resources', () => {
      const subject = sym('https://example.com/profile')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(chatPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders chat title from dct:title', () => {
      const subject = sym('https://example.com/chat')
      store.add(subject, RDF('type'), MEE('LongChat'), subject.doc())
      store.add(subject, DCT('title'), lit('Team Chat'), subject.doc())

      const container = document.createElement('div')
      chatPane.render(subject, store, container)

      expect(container.querySelector('.chat-title')!.textContent).toBe('Team Chat')
    })

    it('renders chat title from dc:title', () => {
      const subject = sym('https://example.com/chat')
      store.add(subject, RDF('type'), MEE('LongChat'), subject.doc())
      store.add(subject, DC('title'), lit('Old Chat'), subject.doc())

      const container = document.createElement('div')
      chatPane.render(subject, store, container)

      expect(container.querySelector('.chat-title')!.textContent).toBe('Old Chat')
    })

    it('renders empty state when no messages', () => {
      const subject = sym('https://example.com/chat')
      store.add(subject, RDF('type'), MEE('LongChat'), subject.doc())

      const container = document.createElement('div')
      chatPane.render(subject, store, container)

      expect(container.querySelector('.chat-count')!.textContent).toBe('0 messages')
      expect(container.querySelector('.chat-empty')).not.toBeNull()
    })

    it('renders messages sorted by date', () => {
      const subject = sym('https://example.com/chat')
      store.add(subject, RDF('type'), MEE('LongChat'), subject.doc())

      const msg1 = sym('https://example.com/chat#msg1')
      const msg2 = sym('https://example.com/chat#msg2')

      store.add(subject, WF('message'), msg1, subject.doc())
      store.add(msg1, SIOC('content'), lit('Second message'), msg1.doc())
      store.add(msg1, DCT('created'), lit('2025-06-15T10:30:00Z', undefined, XSD('dateTime')), msg1.doc())

      store.add(subject, WF('message'), msg2, subject.doc())
      store.add(msg2, SIOC('content'), lit('First message'), msg2.doc())
      store.add(msg2, DCT('created'), lit('2025-06-15T10:00:00Z', undefined, XSD('dateTime')), msg2.doc())

      const container = document.createElement('div')
      chatPane.render(subject, store, container)

      const contents = container.querySelectorAll('.chat-content')
      expect(contents.length).toBe(2)
      expect(contents[0].textContent).toBe('First message')
      expect(contents[1].textContent).toBe('Second message')
    })

    it('shows message count', () => {
      const subject = sym('https://example.com/chat')
      store.add(subject, RDF('type'), MEE('LongChat'), subject.doc())

      for (let i = 0; i < 3; i++) {
        const msg = sym(`https://example.com/chat#msg${i}`)
        store.add(subject, WF('message'), msg, subject.doc())
        store.add(msg, SIOC('content'), lit(`Message ${i}`), msg.doc())
      }

      const container = document.createElement('div')
      chatPane.render(subject, store, container)

      expect(container.querySelector('.chat-count')!.textContent).toBe('3 messages')
    })

    it('renders author name', () => {
      const subject = sym('https://example.com/chat')
      store.add(subject, RDF('type'), MEE('LongChat'), subject.doc())

      const msg = sym('https://example.com/chat#msg1')
      const alice = sym('https://alice.example.com/profile#me')
      store.add(subject, WF('message'), msg, subject.doc())
      store.add(msg, SIOC('content'), lit('Hello!'), msg.doc())
      store.add(msg, FOAF('maker'), alice, msg.doc())
      store.add(alice, FOAF('name'), lit('Alice'), alice.doc())

      const container = document.createElement('div')
      chatPane.render(subject, store, container)

      const author = container.querySelector('.chat-author')
      expect(author).not.toBeNull()
      expect(author!.textContent).toBe('Alice')
    })

    it('renders timestamp', () => {
      const subject = sym('https://example.com/chat')
      store.add(subject, RDF('type'), MEE('LongChat'), subject.doc())

      const msg = sym('https://example.com/chat#msg1')
      store.add(subject, WF('message'), msg, subject.doc())
      store.add(msg, SIOC('content'), lit('Hello!'), msg.doc())
      store.add(msg, DCT('created'), lit('2025-06-15T10:30:00Z', undefined, XSD('dateTime')), msg.doc())

      const container = document.createElement('div')
      chatPane.render(subject, store, container)

      const time = container.querySelector('.chat-time')
      expect(time).not.toBeNull()
      expect(time!.getAttribute('datetime')).toBe('2025-06-15T10:30:00.000Z')
    })

    it('groups messages by date', () => {
      const subject = sym('https://example.com/chat')
      store.add(subject, RDF('type'), MEE('LongChat'), subject.doc())

      const msg1 = sym('https://example.com/chat#msg1')
      store.add(subject, WF('message'), msg1, subject.doc())
      store.add(msg1, SIOC('content'), lit('Day 1 message'), msg1.doc())
      store.add(msg1, DCT('created'), lit('2025-06-14T09:00:00Z'), msg1.doc())

      const msg2 = sym('https://example.com/chat#msg2')
      store.add(subject, WF('message'), msg2, subject.doc())
      store.add(msg2, SIOC('content'), lit('Day 2 message'), msg2.doc())
      store.add(msg2, DCT('created'), lit('2025-06-15T09:00:00Z'), msg2.doc())

      const container = document.createElement('div')
      chatPane.render(subject, store, container)

      const dateHeaders = container.querySelectorAll('.chat-date-header')
      expect(dateHeaders.length).toBe(2)
    })

    it('renders inline images from URLs in content', () => {
      const subject = sym('https://example.com/chat')
      store.add(subject, RDF('type'), MEE('LongChat'), subject.doc())

      const msg = sym('https://example.com/chat#msg1')
      store.add(subject, WF('message'), msg, subject.doc())
      store.add(msg, SIOC('content'), lit('Check this out https://example.com/photo.jpg'), msg.doc())

      const container = document.createElement('div')
      chatPane.render(subject, store, container)

      const img = container.querySelector('.chat-inline-image') as HTMLImageElement
      expect(img).not.toBeNull()
      expect(img.src).toContain('photo.jpg')
    })

    it('renders links in message content', () => {
      const subject = sym('https://example.com/chat')
      store.add(subject, RDF('type'), MEE('LongChat'), subject.doc())

      const msg = sym('https://example.com/chat#msg1')
      store.add(subject, WF('message'), msg, subject.doc())
      store.add(msg, SIOC('content'), lit('Visit https://example.com/page for info'), msg.doc())

      const container = document.createElement('div')
      chatPane.render(subject, store, container)

      const link = container.querySelector('.chat-content a') as HTMLAnchorElement
      expect(link).not.toBeNull()
      expect(link.href).toContain('example.com/page')
      expect(link.target).toBe('_blank')
    })

    it('renders chat creator', () => {
      const subject = sym('https://example.com/chat')
      store.add(subject, RDF('type'), MEE('LongChat'), subject.doc())
      store.add(subject, DCT('title'), lit('My Chat'), subject.doc())

      const author = sym('https://alice.example.com/profile#me')
      store.add(subject, DCT('creator'), author, subject.doc())
      store.add(author, FOAF('name'), lit('Alice'), author.doc())

      const container = document.createElement('div')
      chatPane.render(subject, store, container)

      const creator = container.querySelector('.chat-creator')
      expect(creator).not.toBeNull()
      expect(creator!.textContent).toContain('Alice')
    })
  })
})

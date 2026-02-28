import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { notificationPane } from '../notification-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const LDP = Namespace('http://www.w3.org/ns/ldp#')
const SOLID = Namespace('http://www.w3.org/ns/solid/terms#')
const AS = Namespace('https://www.w3.org/ns/activitystreams#')
const SCHEMA = Namespace('http://schema.org/')
const DCT = Namespace('http://purl.org/dc/terms/')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')

describe('notificationPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches LDP container referenced as ldp:inbox', () => {
      const inbox = sym('https://example.com/inbox/')
      const profile = sym('https://example.com/profile#me')
      store.add(inbox, RDF('type'), LDP('Container'), inbox.doc())
      store.add(profile, LDP('inbox'), inbox, profile.doc())
      expect(notificationPane.canHandle(inbox, store)).toBe(true)
    })

    it('matches LDP container referenced as solid:inbox', () => {
      const inbox = sym('https://example.com/inbox/')
      const profile = sym('https://example.com/profile#me')
      store.add(inbox, RDF('type'), LDP('BasicContainer'), inbox.doc())
      store.add(profile, SOLID('inbox'), inbox, profile.doc())
      expect(notificationPane.canHandle(inbox, store)).toBe(true)
    })

    it('matches AS2 OrderedCollection', () => {
      const subject = sym('https://example.com/notifications')
      store.add(subject, RDF('type'), AS('OrderedCollection'), subject.doc())
      expect(notificationPane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with solid:notification', () => {
      const subject = sym('https://example.com/inbox/')
      const notif = sym('https://example.com/inbox/1')
      store.add(subject, SOLID('notification'), notif, subject.doc())
      expect(notificationPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects plain LDP container without inbox reference', () => {
      const subject = sym('https://example.com/files/')
      store.add(subject, RDF('type'), LDP('Container'), subject.doc())
      expect(notificationPane.canHandle(subject, store)).toBe(false)
    })

    it('rejects non-inbox resources', () => {
      const subject = sym('https://example.com/person')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(notificationPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders inbox title', () => {
      const inbox = sym('https://example.com/inbox/')
      store.add(inbox, RDF('type'), AS('OrderedCollection'), inbox.doc())
      store.add(inbox, SCHEMA('name'), lit('My Inbox'), inbox.doc())

      const container = document.createElement('div')
      notificationPane.render(inbox, store, container)

      expect(container.querySelector('.notif-title')!.textContent).toBe('My Inbox')
    })

    it('defaults title to Notifications', () => {
      const inbox = sym('https://example.com/inbox/')
      store.add(inbox, RDF('type'), AS('OrderedCollection'), inbox.doc())

      const container = document.createElement('div')
      notificationPane.render(inbox, store, container)

      expect(container.querySelector('.notif-title')!.textContent).toBe('Notifications')
    })

    it('renders notification count', () => {
      const inbox = sym('https://example.com/inbox/')
      store.add(inbox, RDF('type'), AS('OrderedCollection'), inbox.doc())

      const n1 = sym('https://example.com/inbox/1')
      const n2 = sym('https://example.com/inbox/2')
      store.add(inbox, LDP('contains'), n1, inbox.doc())
      store.add(inbox, LDP('contains'), n2, inbox.doc())
      store.add(n1, RDF('type'), AS('Create'), n1.doc())
      store.add(n2, RDF('type'), AS('Like'), n2.doc())

      const container = document.createElement('div')
      notificationPane.render(inbox, store, container)

      expect(container.querySelector('.notif-count')!.textContent).toBe('2 notifications')
    })

    it('renders notification with actor and verb', () => {
      const inbox = sym('https://example.com/inbox/')
      store.add(inbox, RDF('type'), AS('OrderedCollection'), inbox.doc())

      const notif = sym('https://example.com/inbox/1')
      store.add(inbox, LDP('contains'), notif, inbox.doc())
      store.add(notif, RDF('type'), AS('Like'), notif.doc())

      const actor = sym('https://example.com/alice#me')
      store.add(notif, AS('actor'), actor, notif.doc())
      store.add(actor, SCHEMA('name'), lit('Alice'), actor.doc())

      const obj = sym('https://example.com/post/42')
      store.add(notif, AS('object'), obj, notif.doc())
      store.add(obj, SCHEMA('name'), lit('My Post'), obj.doc())

      const container = document.createElement('div')
      notificationPane.render(inbox, store, container)

      const summary = container.querySelector('.notif-summary')!
      expect(summary.textContent).toContain('Alice')
      expect(summary.textContent).toContain('liked')
      expect(summary.textContent).toContain('My Post')
    })

    it('renders notification content', () => {
      const inbox = sym('https://example.com/inbox/')
      store.add(inbox, RDF('type'), AS('OrderedCollection'), inbox.doc())

      const notif = sym('https://example.com/inbox/1')
      store.add(inbox, LDP('contains'), notif, inbox.doc())
      store.add(notif, AS('content'), lit('Great work on this!'), notif.doc())

      const container = document.createElement('div')
      notificationPane.render(inbox, store, container)

      expect(container.querySelector('.notif-content')!.textContent).toBe('Great work on this!')
    })

    it('renders timestamp', () => {
      const inbox = sym('https://example.com/inbox/')
      store.add(inbox, RDF('type'), AS('OrderedCollection'), inbox.doc())

      const notif = sym('https://example.com/inbox/1')
      store.add(inbox, LDP('contains'), notif, inbox.doc())
      store.add(notif, AS('published'), lit('2025-01-15T10:00:00Z'), notif.doc())

      const container = document.createElement('div')
      notificationPane.render(inbox, store, container)

      const time = container.querySelector('.notif-time') as HTMLTimeElement
      expect(time).not.toBeNull()
      expect(time.dateTime).toBe('2025-01-15T10:00:00Z')
    })

    it('renders empty inbox', () => {
      const inbox = sym('https://example.com/inbox/')
      store.add(inbox, RDF('type'), AS('OrderedCollection'), inbox.doc())

      const container = document.createElement('div')
      notificationPane.render(inbox, store, container)

      expect(container.querySelector('.notif-count')!.textContent).toBe('0 notifications')
      expect(container.querySelector('.notif-empty')!.textContent).toBe('No notifications.')
    })

    it('renders actor and object as links', () => {
      const inbox = sym('https://example.com/inbox/')
      store.add(inbox, RDF('type'), AS('OrderedCollection'), inbox.doc())

      const notif = sym('https://example.com/inbox/1')
      store.add(inbox, LDP('contains'), notif, inbox.doc())
      store.add(notif, RDF('type'), AS('Follow'), notif.doc())

      const actor = sym('https://example.com/bob#me')
      store.add(notif, AS('actor'), actor, notif.doc())
      store.add(actor, SCHEMA('name'), lit('Bob'), actor.doc())

      const obj = sym('https://example.com/alice#me')
      store.add(notif, AS('object'), obj, notif.doc())
      store.add(obj, SCHEMA('name'), lit('Alice'), obj.doc())

      const container = document.createElement('div')
      notificationPane.render(inbox, store, container)

      const actorLink = container.querySelector('.notif-actor') as HTMLAnchorElement
      expect(actorLink.href).toBe('https://example.com/bob#me')
      expect(actorLink.textContent).toBe('Bob')

      const objectLink = container.querySelector('.notif-object') as HTMLAnchorElement
      expect(objectLink.href).toBe('https://example.com/alice#me')
      expect(objectLink.textContent).toBe('Alice')
    })

    it('deduplicates notifications from multiple sources', () => {
      const inbox = sym('https://example.com/inbox/')
      store.add(inbox, RDF('type'), AS('OrderedCollection'), inbox.doc())

      const notif = sym('https://example.com/inbox/1')
      // Same notification referenced via both contains and items
      store.add(inbox, LDP('contains'), notif, inbox.doc())
      store.add(inbox, AS('items'), notif, inbox.doc())

      const container = document.createElement('div')
      notificationPane.render(inbox, store, container)

      expect(container.querySelector('.notif-count')!.textContent).toBe('1 notification')
    })
  })
})

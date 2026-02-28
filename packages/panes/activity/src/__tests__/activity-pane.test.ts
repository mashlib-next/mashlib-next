import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { activityPane } from '../activity-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const AS = Namespace('https://www.w3.org/ns/activitystreams#')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')
const XSD = Namespace('http://www.w3.org/2001/XMLSchema#')

describe('activityPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches as:Create type', () => {
      const subject = sym('https://example.com/activity/1')
      store.add(subject, RDF('type'), AS('Create'), subject.doc())
      expect(activityPane.canHandle(subject, store)).toBe(true)
    })

    it('matches as:Like type', () => {
      const subject = sym('https://example.com/activity/2')
      store.add(subject, RDF('type'), AS('Like'), subject.doc())
      expect(activityPane.canHandle(subject, store)).toBe(true)
    })

    it('matches as:Follow type', () => {
      const subject = sym('https://example.com/activity/3')
      store.add(subject, RDF('type'), AS('Follow'), subject.doc())
      expect(activityPane.canHandle(subject, store)).toBe(true)
    })

    it('matches as:Collection type', () => {
      const subject = sym('https://example.com/inbox')
      store.add(subject, RDF('type'), AS('Collection'), subject.doc())
      expect(activityPane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with actor + object', () => {
      const subject = sym('https://example.com/activity/4')
      store.add(subject, AS('actor'), sym('https://alice.example.com/'), subject.doc())
      store.add(subject, AS('object'), sym('https://example.com/post'), subject.doc())
      expect(activityPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects non-activity resources', () => {
      const subject = sym('https://example.com/profile')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(activityPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders single activity with actor and object', () => {
      const subject = sym('https://example.com/activity/1')
      const actor = sym('https://alice.example.com/')
      const object = sym('https://example.com/post/1')

      store.add(subject, RDF('type'), AS('Like'), subject.doc())
      store.add(subject, AS('actor'), actor, subject.doc())
      store.add(subject, AS('object'), object, subject.doc())
      store.add(actor, AS('name'), lit('Alice'), actor.doc())
      store.add(object, AS('name'), lit('My Post'), object.doc())

      const container = document.createElement('div')
      activityPane.render(subject, store, container)

      const actorEl = container.querySelector('.activity-actor')
      expect(actorEl!.textContent).toBe('Alice')
      const objectEl = container.querySelector('.activity-object')
      expect(objectEl!.textContent).toBe('My Post')
      expect(container.textContent).toContain('liked')
    })

    it('renders activity with summary', () => {
      const subject = sym('https://example.com/activity/1')
      store.add(subject, RDF('type'), AS('Activity'), subject.doc())
      store.add(subject, AS('summary'), lit('Alice liked your post'), subject.doc())

      const container = document.createElement('div')
      activityPane.render(subject, store, container)

      expect(container.querySelector('.activity-summary')!.textContent).toBe('Alice liked your post')
    })

    it('renders activity with content', () => {
      const subject = sym('https://example.com/activity/1')
      store.add(subject, RDF('type'), AS('Create'), subject.doc())
      store.add(subject, AS('content'), lit('Hello world!'), subject.doc())

      const container = document.createElement('div')
      activityPane.render(subject, store, container)

      expect(container.querySelector('.activity-content')!.textContent).toBe('Hello world!')
    })

    it('renders timestamp', () => {
      const subject = sym('https://example.com/activity/1')
      store.add(subject, RDF('type'), AS('Create'), subject.doc())
      store.add(subject, AS('published'), lit('2025-06-15T10:30:00Z', undefined, XSD('dateTime')), subject.doc())

      const container = document.createElement('div')
      activityPane.render(subject, store, container)

      const time = container.querySelector('.activity-time')
      expect(time).not.toBeNull()
      expect(time!.getAttribute('datetime')).toBe('2025-06-15T10:30:00.000Z')
    })

    it('renders collection with items', () => {
      const subject = sym('https://example.com/inbox')
      store.add(subject, RDF('type'), AS('Collection'), subject.doc())
      store.add(subject, AS('name'), lit('Inbox'), subject.doc())
      store.add(subject, AS('totalItems'), lit('2'), subject.doc())

      const act1 = sym('https://example.com/activity/1')
      const act2 = sym('https://example.com/activity/2')
      store.add(subject, AS('items'), act1, subject.doc())
      store.add(subject, AS('items'), act2, subject.doc())
      store.add(act1, RDF('type'), AS('Like'), act1.doc())
      store.add(act1, AS('summary'), lit('Alice liked a post'), act1.doc())
      store.add(act2, RDF('type'), AS('Follow'), act2.doc())
      store.add(act2, AS('summary'), lit('Bob followed you'), act2.doc())

      const container = document.createElement('div')
      activityPane.render(subject, store, container)

      expect(container.querySelector('.activity-title')!.textContent).toBe('Inbox')
      expect(container.querySelector('.activity-count')!.textContent).toBe('2 items')
      expect(container.querySelectorAll('.activity-item').length).toBe(2)
    })

    it('renders empty collection', () => {
      const subject = sym('https://example.com/inbox')
      store.add(subject, RDF('type'), AS('Collection'), subject.doc())

      const container = document.createElement('div')
      activityPane.render(subject, store, container)

      expect(container.querySelector('.activity-empty')!.textContent).toBe('No activities.')
    })
  })
})

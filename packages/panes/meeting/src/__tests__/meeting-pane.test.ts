import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { meetingPane } from '../meeting-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const MEE = Namespace('http://www.w3.org/ns/pim/meeting#')
const DCT = Namespace('http://purl.org/dc/terms/')
const SCHEMA = Namespace('https://schema.org/')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')
const SIOC = Namespace('http://rdfs.org/sioc/ns#')

describe('meetingPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches mee:Meeting type', () => {
      const subject = sym('https://example.com/meeting/1')
      store.add(subject, RDF('type'), MEE('Meeting'), subject.doc())
      expect(meetingPane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with mee:participant', () => {
      const subject = sym('https://example.com/meeting/1')
      const participant = sym('https://example.com/people/alice')
      store.add(subject, MEE('participant'), participant, subject.doc())
      expect(meetingPane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with mee:agenda', () => {
      const subject = sym('https://example.com/meeting/1')
      store.add(subject, MEE('agenda'), lit('Discuss roadmap'), subject.doc())
      expect(meetingPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects non-meeting resources', () => {
      const subject = sym('https://example.com/person')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(meetingPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders meeting title', () => {
      const subject = sym('https://example.com/meeting/1')
      store.add(subject, RDF('type'), MEE('Meeting'), subject.doc())
      store.add(subject, DCT('title'), lit('Sprint Planning'), subject.doc())

      const container = document.createElement('div')
      meetingPane.render(subject, store, container)

      expect(container.querySelector('.meeting-title')!.textContent).toBe('Sprint Planning')
    })

    it('renders meeting date', () => {
      const subject = sym('https://example.com/meeting/1')
      store.add(subject, RDF('type'), MEE('Meeting'), subject.doc())
      store.add(subject, DCT('title'), lit('Standup'), subject.doc())
      store.add(subject, SCHEMA('startDate'), lit('2025-07-15T10:00:00Z'), subject.doc())

      const container = document.createElement('div')
      meetingPane.render(subject, store, container)

      const dateEl = container.querySelector('.meeting-date')
      expect(dateEl).not.toBeNull()
      expect(dateEl!.textContent).toContain('2025')
    })

    it('renders participants as links', () => {
      const subject = sym('https://example.com/meeting/1')
      store.add(subject, RDF('type'), MEE('Meeting'), subject.doc())
      store.add(subject, DCT('title'), lit('Standup'), subject.doc())

      const alice = sym('https://example.com/people/alice')
      const bob = sym('https://example.com/people/bob')
      store.add(subject, MEE('participant'), alice, subject.doc())
      store.add(subject, MEE('participant'), bob, subject.doc())
      store.add(alice, FOAF('name'), lit('Alice'), alice.doc())
      store.add(bob, FOAF('name'), lit('Bob'), bob.doc())

      const container = document.createElement('div')
      meetingPane.render(subject, store, container)

      const participants = container.querySelectorAll('.meeting-participant')
      expect(participants.length).toBe(2)
      const names = Array.from(participants).map(p => p.textContent)
      expect(names).toContain('Alice')
      expect(names).toContain('Bob')
    })

    it('renders agenda items', () => {
      const subject = sym('https://example.com/meeting/1')
      store.add(subject, RDF('type'), MEE('Meeting'), subject.doc())
      store.add(subject, DCT('title'), lit('Planning'), subject.doc())
      store.add(subject, MEE('agenda'), lit('Review sprint goals'), subject.doc())
      store.add(subject, MEE('agenda'), lit('Assign tasks'), subject.doc())

      const container = document.createElement('div')
      meetingPane.render(subject, store, container)

      const items = container.querySelectorAll('.meeting-agenda li')
      expect(items.length).toBe(2)
    })

    it('renders action items', () => {
      const subject = sym('https://example.com/meeting/1')
      store.add(subject, RDF('type'), MEE('Meeting'), subject.doc())
      store.add(subject, DCT('title'), lit('Review'), subject.doc())

      const action = sym('https://example.com/meeting/1#action1')
      store.add(subject, MEE('action'), action, subject.doc())
      store.add(action, DCT('title'), lit('Update documentation'), action.doc())

      const container = document.createElement('div')
      meetingPane.render(subject, store, container)

      const actions = container.querySelectorAll('.meeting-actions li')
      expect(actions.length).toBe(1)
      expect(actions[0].textContent).toBe('Update documentation')
    })

    it('renders notes', () => {
      const subject = sym('https://example.com/meeting/1')
      store.add(subject, RDF('type'), MEE('Meeting'), subject.doc())
      store.add(subject, DCT('title'), lit('Standup'), subject.doc())
      store.add(subject, SIOC('content'), lit('Discussed the new feature rollout.'), subject.doc())

      const container = document.createElement('div')
      meetingPane.render(subject, store, container)

      expect(container.querySelector('.meeting-notes')!.textContent).toBe('Discussed the new feature rollout.')
    })

    it('renders description', () => {
      const subject = sym('https://example.com/meeting/1')
      store.add(subject, RDF('type'), MEE('Meeting'), subject.doc())
      store.add(subject, DCT('title'), lit('Weekly'), subject.doc())
      store.add(subject, DCT('description'), lit('Weekly team sync'), subject.doc())

      const container = document.createElement('div')
      meetingPane.render(subject, store, container)

      expect(container.querySelector('.meeting-description')!.textContent).toBe('Weekly team sync')
    })

    it('renders without optional fields', () => {
      const subject = sym('https://example.com/meeting/1')
      store.add(subject, RDF('type'), MEE('Meeting'), subject.doc())
      store.add(subject, DCT('title'), lit('Quick sync'), subject.doc())

      const container = document.createElement('div')
      meetingPane.render(subject, store, container)

      expect(container.querySelector('.meeting-title')!.textContent).toBe('Quick sync')
      expect(container.querySelector('.meeting-date')).toBeNull()
      expect(container.querySelector('.meeting-participants')).toBeNull()
      expect(container.querySelector('.meeting-agenda')).toBeNull()
      expect(container.querySelector('.meeting-actions')).toBeNull()
      expect(container.querySelector('.meeting-notes')).toBeNull()
    })

    it('renders location', () => {
      const subject = sym('https://example.com/meeting/1')
      store.add(subject, RDF('type'), MEE('Meeting'), subject.doc())
      store.add(subject, DCT('title'), lit('Board meeting'), subject.doc())
      store.add(subject, SCHEMA('location'), lit('Room 42'), subject.doc())

      const container = document.createElement('div')
      meetingPane.render(subject, store, container)

      expect(container.querySelector('.meeting-location')!.textContent).toBe('Room 42')
    })
  })
})

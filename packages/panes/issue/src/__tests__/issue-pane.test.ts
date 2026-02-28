import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { issuePane } from '../issue-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const WF = Namespace('http://www.w3.org/2005/01/wf/flow#')
const TRACKER = Namespace('http://www.w3.org/ns/pim/tracker#')
const DCT = Namespace('http://purl.org/dc/terms/')
const SCHEMA = Namespace('http://schema.org/')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')
const RDFS = Namespace('http://www.w3.org/2000/01/rdf-schema#')

describe('issuePane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches wf:Tracker type', () => {
      const subject = sym('https://example.com/tracker')
      store.add(subject, RDF('type'), WF('Tracker'), subject.doc())
      expect(issuePane.canHandle(subject, store)).toBe(true)
    })

    it('matches wf:Issue type', () => {
      const subject = sym('https://example.com/issue/1')
      store.add(subject, RDF('type'), WF('Issue'), subject.doc())
      expect(issuePane.canHandle(subject, store)).toBe(true)
    })

    it('matches tracker:Tracker type', () => {
      const subject = sym('https://example.com/tracker')
      store.add(subject, RDF('type'), TRACKER('Tracker'), subject.doc())
      expect(issuePane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with wf:issue', () => {
      const subject = sym('https://example.com/tracker')
      const issue = sym('https://example.com/issue/1')
      store.add(subject, WF('issue'), issue, subject.doc())
      expect(issuePane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with wf:state', () => {
      const subject = sym('https://example.com/issue/1')
      store.add(subject, WF('state'), sym('https://example.com/states#Open'), subject.doc())
      expect(issuePane.canHandle(subject, store)).toBe(true)
    })

    it('rejects non-issue resources', () => {
      const subject = sym('https://example.com/person')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(issuePane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render - single issue', () => {
    it('renders issue title', () => {
      const subject = sym('https://example.com/issue/1')
      store.add(subject, RDF('type'), WF('Issue'), subject.doc())
      store.add(subject, DCT('title'), lit('Fix login bug'), subject.doc())

      const container = document.createElement('div')
      issuePane.render(subject, store, container)

      expect(container.querySelector('.issue-title')!.textContent).toBe('Fix login bug')
    })

    it('renders state badge', () => {
      const subject = sym('https://example.com/issue/1')
      store.add(subject, RDF('type'), WF('Issue'), subject.doc())
      store.add(subject, DCT('title'), lit('Bug'), subject.doc())
      store.add(subject, WF('state'), sym('https://example.com/states#Open'), subject.doc())

      const container = document.createElement('div')
      issuePane.render(subject, store, container)

      const badge = container.querySelector('.issue-state')
      expect(badge).not.toBeNull()
      expect(badge!.textContent).toBe('Open')
      expect(badge!.classList.contains('issue-state-open')).toBe(true)
    })

    it('renders closed state with correct class', () => {
      const subject = sym('https://example.com/issue/1')
      store.add(subject, RDF('type'), WF('Issue'), subject.doc())
      store.add(subject, DCT('title'), lit('Done bug'), subject.doc())
      store.add(subject, WF('state'), sym('https://example.com/states#Closed'), subject.doc())

      const container = document.createElement('div')
      issuePane.render(subject, store, container)

      const badge = container.querySelector('.issue-state')
      expect(badge!.classList.contains('issue-state-closed')).toBe(true)
    })

    it('renders assignee', () => {
      const subject = sym('https://example.com/issue/1')
      store.add(subject, RDF('type'), WF('Issue'), subject.doc())
      store.add(subject, DCT('title'), lit('Bug'), subject.doc())

      const assignee = sym('https://example.com/people/alice')
      store.add(subject, WF('assignee'), assignee, subject.doc())
      store.add(assignee, SCHEMA('name'), lit('Alice'), assignee.doc())

      const container = document.createElement('div')
      issuePane.render(subject, store, container)

      expect(container.querySelector('.issue-details')!.textContent).toContain('Alice')
    })

    it('renders description', () => {
      const subject = sym('https://example.com/issue/1')
      store.add(subject, RDF('type'), WF('Issue'), subject.doc())
      store.add(subject, DCT('title'), lit('Bug'), subject.doc())
      store.add(subject, DCT('description'), lit('Login fails on mobile'), subject.doc())

      const container = document.createElement('div')
      issuePane.render(subject, store, container)

      expect(container.querySelector('.issue-description')!.textContent).toBe('Login fails on mobile')
    })

    it('renders created date', () => {
      const subject = sym('https://example.com/issue/1')
      store.add(subject, RDF('type'), WF('Issue'), subject.doc())
      store.add(subject, DCT('title'), lit('Bug'), subject.doc())
      store.add(subject, DCT('created'), lit('2025-06-15T10:00:00Z'), subject.doc())

      const container = document.createElement('div')
      issuePane.render(subject, store, container)

      const details = container.querySelector('.issue-details')
      expect(details).not.toBeNull()
      expect(details!.textContent).toContain('2025')
    })
  })

  describe('render - tracker', () => {
    it('renders tracker title and issue count', () => {
      const subject = sym('https://example.com/tracker')
      store.add(subject, RDF('type'), WF('Tracker'), subject.doc())
      store.add(subject, DCT('title'), lit('Project Bugs'), subject.doc())

      const issue1 = sym('https://example.com/issue/1')
      const issue2 = sym('https://example.com/issue/2')
      store.add(subject, WF('issue'), issue1, subject.doc())
      store.add(subject, WF('issue'), issue2, subject.doc())
      store.add(issue1, DCT('title'), lit('Bug 1'), issue1.doc())
      store.add(issue2, DCT('title'), lit('Bug 2'), issue2.doc())

      const container = document.createElement('div')
      issuePane.render(subject, store, container)

      expect(container.querySelector('.tracker-title')!.textContent).toBe('Project Bugs')
      expect(container.querySelector('.tracker-count')!.textContent).toBe('2 issues')
    })

    it('renders issue list with titles', () => {
      const subject = sym('https://example.com/tracker')
      store.add(subject, RDF('type'), WF('Tracker'), subject.doc())
      store.add(subject, DCT('title'), lit('Tracker'), subject.doc())

      const issue1 = sym('https://example.com/issue/1')
      store.add(subject, WF('issue'), issue1, subject.doc())
      store.add(issue1, DCT('title'), lit('First issue'), issue1.doc())
      store.add(issue1, WF('state'), sym('https://example.com/states#Open'), issue1.doc())

      const container = document.createElement('div')
      issuePane.render(subject, store, container)

      const items = container.querySelectorAll('.tracker-issue')
      expect(items.length).toBe(1)
      expect(items[0].querySelector('.tracker-issue-title')!.textContent).toBe('First issue')
      expect(items[0].querySelector('.issue-state')!.textContent).toBe('Open')
    })

    it('renders empty tracker', () => {
      const subject = sym('https://example.com/tracker')
      store.add(subject, RDF('type'), WF('Tracker'), subject.doc())
      store.add(subject, DCT('title'), lit('Empty Tracker'), subject.doc())

      const container = document.createElement('div')
      issuePane.render(subject, store, container)

      expect(container.querySelector('.tracker-count')!.textContent).toBe('0 issues')
      expect(container.querySelector('.tracker-empty')!.textContent).toBe('No issues found.')
    })
  })
})

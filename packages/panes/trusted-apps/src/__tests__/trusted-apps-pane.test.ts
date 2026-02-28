import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace, blankNode } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { trustedAppsPane } from '../trusted-apps-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const ACL = Namespace('http://www.w3.org/ns/auth/acl#')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')

describe('trustedAppsPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches subject with acl:trustedApp triples', () => {
      const subject = sym('https://alice.example/profile/card#me')
      const app = blankNode('app1')
      store.add(subject, ACL('trustedApp'), app, subject.doc())
      store.add(app, ACL('origin'), sym('https://trusted.app'), subject.doc())
      store.add(app, ACL('mode'), ACL('Read'), subject.doc())
      expect(trustedAppsPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects subject without trusted apps', () => {
      const subject = sym('https://alice.example/profile/card#me')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(trustedAppsPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders title', () => {
      const subject = sym('https://alice.example/profile/card#me')
      const app = blankNode('app1')
      store.add(subject, ACL('trustedApp'), app, subject.doc())
      store.add(app, ACL('origin'), sym('https://trusted.app'), subject.doc())
      store.add(app, ACL('mode'), ACL('Read'), subject.doc())

      const container = document.createElement('div')
      trustedAppsPane.render(subject, store, container)

      expect(container.querySelector('.trusted-apps-title')!.textContent).toBe('Trusted Applications')
    })

    it('renders subtitle with profile name', () => {
      const subject = sym('https://alice.example/profile/card#me')
      store.add(subject, FOAF('name'), lit('Alice'), subject.doc())

      const app = blankNode('app1')
      store.add(subject, ACL('trustedApp'), app, subject.doc())
      store.add(app, ACL('origin'), sym('https://trusted.app'), subject.doc())
      store.add(app, ACL('mode'), ACL('Read'), subject.doc())

      const container = document.createElement('div')
      trustedAppsPane.render(subject, store, container)

      const subtitle = container.querySelector('.trusted-apps-subtitle')
      expect(subtitle!.textContent).toContain('Alice')
    })

    it('renders app count', () => {
      const subject = sym('https://alice.example/profile/card#me')

      const app1 = blankNode('app1')
      store.add(subject, ACL('trustedApp'), app1, subject.doc())
      store.add(app1, ACL('origin'), sym('https://app1.example'), subject.doc())
      store.add(app1, ACL('mode'), ACL('Read'), subject.doc())

      const app2 = blankNode('app2')
      store.add(subject, ACL('trustedApp'), app2, subject.doc())
      store.add(app2, ACL('origin'), sym('https://app2.example'), subject.doc())
      store.add(app2, ACL('mode'), ACL('Read'), subject.doc())
      store.add(app2, ACL('mode'), ACL('Write'), subject.doc())

      const container = document.createElement('div')
      trustedAppsPane.render(subject, store, container)

      expect(container.querySelector('.trusted-apps-count')!.textContent).toBe('2 trusted applications')
    })

    it('renders app table with origin URLs', () => {
      const subject = sym('https://alice.example/profile/card#me')

      const app = blankNode('app1')
      store.add(subject, ACL('trustedApp'), app, subject.doc())
      store.add(app, ACL('origin'), sym('https://trusted.app'), subject.doc())
      store.add(app, ACL('mode'), ACL('Read'), subject.doc())

      const container = document.createElement('div')
      trustedAppsPane.render(subject, store, container)

      const table = container.querySelector('.trusted-apps-table')
      expect(table).not.toBeNull()

      const originLink = container.querySelector('.trusted-apps-origin a') as HTMLAnchorElement
      expect(originLink).not.toBeNull()
      expect(originLink.textContent).toBe('https://trusted.app')
    })

    it('renders active and inactive mode chips', () => {
      const subject = sym('https://alice.example/profile/card#me')

      const app = blankNode('app1')
      store.add(subject, ACL('trustedApp'), app, subject.doc())
      store.add(app, ACL('origin'), sym('https://trusted.app'), subject.doc())
      store.add(app, ACL('mode'), ACL('Read'), subject.doc())
      store.add(app, ACL('mode'), ACL('Write'), subject.doc())

      const container = document.createElement('div')
      trustedAppsPane.render(subject, store, container)

      const activeChips = container.querySelectorAll('.trusted-apps-mode-active')
      const inactiveChips = container.querySelectorAll('.trusted-apps-mode-inactive')
      expect(activeChips.length).toBe(2) // Read + Write
      expect(inactiveChips.length).toBe(2) // Append + Control
    })

    it('renders notes section', () => {
      const subject = sym('https://alice.example/profile/card#me')

      const app = blankNode('app1')
      store.add(subject, ACL('trustedApp'), app, subject.doc())
      store.add(app, ACL('origin'), sym('https://trusted.app'), subject.doc())
      store.add(app, ACL('mode'), ACL('Read'), subject.doc())

      const container = document.createElement('div')
      trustedAppsPane.render(subject, store, container)

      const notes = container.querySelector('.trusted-apps-notes')
      expect(notes).not.toBeNull()
      const noteItems = notes!.querySelectorAll('li')
      expect(noteItems.length).toBe(3)
    })

    it('renders empty state when no apps exist', () => {
      // This shouldn't normally happen since canHandle checks, but test defensively
      const subject = sym('https://alice.example/profile/card#me')

      const container = document.createElement('div')
      trustedAppsPane.render(subject, store, container)

      expect(container.querySelector('.trusted-apps-empty')).not.toBeNull()
      expect(container.querySelector('.trusted-apps-count')!.textContent).toBe('0 trusted applications')
    })

    it('sorts apps by origin URL', () => {
      const subject = sym('https://alice.example/profile/card#me')

      const app1 = blankNode('app1')
      store.add(subject, ACL('trustedApp'), app1, subject.doc())
      store.add(app1, ACL('origin'), sym('https://z-app.example'), subject.doc())
      store.add(app1, ACL('mode'), ACL('Read'), subject.doc())

      const app2 = blankNode('app2')
      store.add(subject, ACL('trustedApp'), app2, subject.doc())
      store.add(app2, ACL('origin'), sym('https://a-app.example'), subject.doc())
      store.add(app2, ACL('mode'), ACL('Read'), subject.doc())

      const container = document.createElement('div')
      trustedAppsPane.render(subject, store, container)

      const origins = container.querySelectorAll('.trusted-apps-origin a')
      expect(origins[0].textContent).toBe('https://a-app.example')
      expect(origins[1].textContent).toBe('https://z-app.example')
    })
  })
})

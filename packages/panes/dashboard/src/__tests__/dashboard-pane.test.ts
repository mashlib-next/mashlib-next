import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { dashboardPane } from '../dashboard-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const LDP = Namespace('http://www.w3.org/ns/ldp#')
const SPACE = Namespace('http://www.w3.org/ns/pim/space#')
const SOLID = Namespace('http://www.w3.org/ns/solid/terms#')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')
const DCT = Namespace('http://purl.org/dc/terms/')

describe('dashboardPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches space:Storage type', () => {
      const subject = sym('https://alice.pod.example/')
      store.add(subject, RDF('type'), SPACE('Storage'), subject.doc())
      expect(dashboardPane.canHandle(subject, store)).toBe(true)
    })

    it('matches solid:Account type', () => {
      const subject = sym('https://alice.pod.example/')
      store.add(subject, RDF('type'), SOLID('Account'), subject.doc())
      expect(dashboardPane.canHandle(subject, store)).toBe(true)
    })

    it('matches container at site root', () => {
      const subject = sym('https://alice.pod.example/')
      store.add(subject, RDF('type'), LDP('BasicContainer'), subject.doc())
      expect(dashboardPane.canHandle(subject, store)).toBe(true)
    })

    it('matches when someone has space:storage pointing to it', () => {
      const subject = sym('https://alice.pod.example/')
      const alice = sym('https://alice.pod.example/profile/card#me')
      store.add(alice, SPACE('storage'), subject, alice.doc())
      expect(dashboardPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects non-root containers', () => {
      const subject = sym('https://alice.pod.example/documents/')
      store.add(subject, RDF('type'), LDP('Container'), subject.doc())
      expect(dashboardPane.canHandle(subject, store)).toBe(false)
    })

    it('rejects non-storage resources', () => {
      const subject = sym('https://example.com/file.ttl')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(dashboardPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders pod title with owner name', () => {
      const subject = sym('https://alice.pod.example/')
      const alice = sym('https://alice.pod.example/profile/card#me')
      store.add(subject, RDF('type'), SPACE('Storage'), subject.doc())
      store.add(alice, SPACE('storage'), subject, alice.doc())
      store.add(alice, FOAF('name'), lit('Alice'), alice.doc())

      const container = document.createElement('div')
      dashboardPane.render(subject, store, container)

      expect(container.querySelector('.dashboard-title')!.textContent).toBe("Alice's Pod")
    })

    it('renders pod URL', () => {
      const subject = sym('https://alice.pod.example/')
      store.add(subject, RDF('type'), SPACE('Storage'), subject.doc())

      const container = document.createElement('div')
      dashboardPane.render(subject, store, container)

      const urlEl = container.querySelector('.dashboard-url code')
      expect(urlEl).not.toBeNull()
      expect(urlEl!.textContent).toBe('https://alice.pod.example/')
    })

    it('renders storage type badge', () => {
      const subject = sym('https://alice.pod.example/')
      store.add(subject, RDF('type'), SPACE('Storage'), subject.doc())

      const container = document.createElement('div')
      dashboardPane.render(subject, store, container)

      const badge = container.querySelector('.dashboard-badge')
      expect(badge).not.toBeNull()
      expect(badge!.textContent).toBe('Solid Pod')
    })

    it('renders profile link when owner WebID found', () => {
      const subject = sym('https://alice.pod.example/')
      const alice = sym('https://alice.pod.example/profile/card#me')
      store.add(subject, RDF('type'), SPACE('Storage'), subject.doc())
      store.add(alice, SPACE('storage'), subject, alice.doc())
      store.add(alice, FOAF('name'), lit('Alice'), alice.doc())

      const container = document.createElement('div')
      dashboardPane.render(subject, store, container)

      const profileLink = container.querySelector('.dashboard-link')
      expect(profileLink).not.toBeNull()
      expect(profileLink!.textContent).toContain('Alice')
    })

    it('renders container contents', () => {
      const subject = sym('https://alice.pod.example/')
      store.add(subject, RDF('type'), SPACE('Storage'), subject.doc())

      const publicFolder = sym('https://alice.pod.example/public/')
      const privateFolder = sym('https://alice.pod.example/private/')
      const profileDoc = sym('https://alice.pod.example/profile/')

      store.add(subject, LDP('contains'), publicFolder, subject.doc())
      store.add(publicFolder, RDF('type'), LDP('Container'), subject.doc())

      store.add(subject, LDP('contains'), privateFolder, subject.doc())
      store.add(privateFolder, RDF('type'), LDP('Container'), subject.doc())

      store.add(subject, LDP('contains'), profileDoc, subject.doc())
      store.add(profileDoc, RDF('type'), LDP('Container'), subject.doc())

      const container = document.createElement('div')
      dashboardPane.render(subject, store, container)

      const items = container.querySelectorAll('.dashboard-item')
      expect(items.length).toBe(3)
    })

    it('renders resource count', () => {
      const subject = sym('https://alice.pod.example/')
      store.add(subject, RDF('type'), SPACE('Storage'), subject.doc())

      const folder = sym('https://alice.pod.example/docs/')
      const file = sym('https://alice.pod.example/readme.txt')

      store.add(subject, LDP('contains'), folder, subject.doc())
      store.add(folder, RDF('type'), LDP('Container'), subject.doc())

      store.add(subject, LDP('contains'), file, subject.doc())
      store.add(file, RDF('type'), LDP('Resource'), subject.doc())

      const container = document.createElement('div')
      dashboardPane.render(subject, store, container)

      const count = container.querySelector('.dashboard-count')!.textContent!
      expect(count).toContain('1 folder')
      expect(count).toContain('1 file')
    })

    it('renders empty state when no contents', () => {
      const subject = sym('https://alice.pod.example/')
      store.add(subject, RDF('type'), SPACE('Storage'), subject.doc())

      const container = document.createElement('div')
      dashboardPane.render(subject, store, container)

      expect(container.querySelector('.dashboard-empty')).not.toBeNull()
    })

    it('sorts containers before files', () => {
      const subject = sym('https://alice.pod.example/')
      store.add(subject, RDF('type'), SPACE('Storage'), subject.doc())

      const file = sym('https://alice.pod.example/readme.txt')
      const folder = sym('https://alice.pod.example/data/')

      store.add(subject, LDP('contains'), file, subject.doc())
      store.add(file, RDF('type'), LDP('Resource'), subject.doc())

      store.add(subject, LDP('contains'), folder, subject.doc())
      store.add(folder, RDF('type'), LDP('Container'), subject.doc())

      const container = document.createElement('div')
      dashboardPane.render(subject, store, container)

      const items = container.querySelectorAll('.dashboard-item-link')
      // Folder should come first
      expect(items[0].textContent).toBe('data')
    })
  })
})

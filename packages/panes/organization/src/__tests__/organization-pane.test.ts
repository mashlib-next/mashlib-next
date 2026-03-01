import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { organizationPane } from '../organization-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const SCHEMA = Namespace('https://schema.org/')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')

describe('organizationPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches schema:Organization type', () => {
      const subject = sym('https://example.com/org')
      store.add(subject, RDF('type'), SCHEMA('Organization'), subject.doc())
      expect(organizationPane.canHandle(subject, store)).toBe(true)
    })

    it('matches schema:Corporation type', () => {
      const subject = sym('https://example.com/corp')
      store.add(subject, RDF('type'), SCHEMA('Corporation'), subject.doc())
      expect(organizationPane.canHandle(subject, store)).toBe(true)
    })

    it('matches foaf:Organization type', () => {
      const subject = sym('https://example.com/org')
      store.add(subject, RDF('type'), FOAF('Organization'), subject.doc())
      expect(organizationPane.canHandle(subject, store)).toBe(true)
    })

    it('matches foaf:Group type', () => {
      const subject = sym('https://example.com/group')
      store.add(subject, RDF('type'), FOAF('Group'), subject.doc())
      expect(organizationPane.canHandle(subject, store)).toBe(true)
    })

    it('matches schema:EducationalOrganization type', () => {
      const subject = sym('https://example.com/uni')
      store.add(subject, RDF('type'), SCHEMA('EducationalOrganization'), subject.doc())
      expect(organizationPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects non-org resources', () => {
      const subject = sym('https://example.com/person')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(organizationPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders org name', () => {
      const subject = sym('https://example.com/org')
      store.add(subject, RDF('type'), SCHEMA('Organization'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('W3C'), subject.doc())

      const container = document.createElement('div')
      organizationPane.render(subject, store, container)

      expect(container.querySelector('.org-name')!.textContent).toBe('W3C')
    })

    it('renders logo', () => {
      const subject = sym('https://example.com/org')
      store.add(subject, RDF('type'), SCHEMA('Organization'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('W3C'), subject.doc())
      store.add(subject, SCHEMA('logo'), sym('https://example.com/logo.png'), subject.doc())

      const container = document.createElement('div')
      organizationPane.render(subject, store, container)

      const logo = container.querySelector('.org-logo') as HTMLImageElement
      expect(logo).not.toBeNull()
      expect(logo.src).toBe('https://example.com/logo.png')
    })

    it('renders description', () => {
      const subject = sym('https://example.com/org')
      store.add(subject, RDF('type'), SCHEMA('Organization'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('W3C'), subject.doc())
      store.add(subject, SCHEMA('description'), lit('The World Wide Web Consortium'), subject.doc())

      const container = document.createElement('div')
      organizationPane.render(subject, store, container)

      expect(container.querySelector('.org-description')!.textContent).toBe('The World Wide Web Consortium')
    })

    it('renders website link', () => {
      const subject = sym('https://example.com/org')
      store.add(subject, RDF('type'), SCHEMA('Organization'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('W3C'), subject.doc())
      store.add(subject, SCHEMA('url'), sym('https://www.w3.org/'), subject.doc())

      const container = document.createElement('div')
      organizationPane.render(subject, store, container)

      const details = container.querySelectorAll('.org-detail')
      const links = container.querySelectorAll('.org-detail a')
      expect(links.length).toBeGreaterThan(0)
    })

    it('renders members as clickable list', () => {
      const subject = sym('https://example.com/org')
      store.add(subject, RDF('type'), SCHEMA('Organization'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Team'), subject.doc())

      const alice = sym('https://example.com/alice')
      const bob = sym('https://example.com/bob')
      store.add(subject, SCHEMA('member'), alice, subject.doc())
      store.add(subject, SCHEMA('member'), bob, subject.doc())
      store.add(alice, SCHEMA('name'), lit('Alice'), alice.doc())
      store.add(bob, SCHEMA('name'), lit('Bob'), bob.doc())

      const container = document.createElement('div')
      organizationPane.render(subject, store, container)

      const people = container.querySelectorAll('.org-people-list li')
      expect(people.length).toBe(2)
    })

    it('renders without optional fields', () => {
      const subject = sym('https://example.com/org')
      store.add(subject, RDF('type'), SCHEMA('Organization'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Minimal Org'), subject.doc())

      const container = document.createElement('div')
      organizationPane.render(subject, store, container)

      expect(container.querySelector('.org-name')!.textContent).toBe('Minimal Org')
      expect(container.querySelector('.org-logo')).toBeNull()
      expect(container.querySelector('.org-description')).toBeNull()
      expect(container.querySelector('.org-people')).toBeNull()
    })
  })
})

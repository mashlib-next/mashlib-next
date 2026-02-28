import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { sharingPane } from '../sharing-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const LDP = Namespace('http://www.w3.org/ns/ldp#')
const ACL = Namespace('http://www.w3.org/ns/auth/acl#')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')

describe('sharingPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches ldp:Resource type', () => {
      const subject = sym('https://pod.example/file.ttl')
      store.add(subject, RDF('type'), LDP('Resource'), subject.doc())
      expect(sharingPane.canHandle(subject, store)).toBe(true)
    })

    it('matches ldp:Container type', () => {
      const subject = sym('https://pod.example/folder/')
      store.add(subject, RDF('type'), LDP('Container'), subject.doc())
      expect(sharingPane.canHandle(subject, store)).toBe(true)
    })

    it('matches ldp:BasicContainer type', () => {
      const subject = sym('https://pod.example/folder/')
      store.add(subject, RDF('type'), LDP('BasicContainer'), subject.doc())
      expect(sharingPane.canHandle(subject, store)).toBe(true)
    })

    it('matches URI ending with / (container convention)', () => {
      const subject = sym('https://pod.example/data/')
      expect(sharingPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects non-LDP resources', () => {
      const subject = sym('https://example.com/profile#me')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(sharingPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders sharing title for a file', () => {
      const subject = sym('https://pod.example/file.ttl')
      store.add(subject, RDF('type'), LDP('Resource'), subject.doc())

      const container = document.createElement('div')
      sharingPane.render(subject, store, container)

      expect(container.querySelector('.sharing-title')!.textContent).toBe('Sharing for file')
    })

    it('renders sharing title for a folder', () => {
      const subject = sym('https://pod.example/folder/')
      store.add(subject, RDF('type'), LDP('Container'), subject.doc())

      const container = document.createElement('div')
      sharingPane.render(subject, store, container)

      expect(container.querySelector('.sharing-title')!.textContent).toBe('Sharing for folder')
    })

    it('renders resource URI', () => {
      const subject = sym('https://pod.example/file.ttl')
      store.add(subject, RDF('type'), LDP('Resource'), subject.doc())

      const container = document.createElement('div')
      sharingPane.render(subject, store, container)

      const uriEl = container.querySelector('.sharing-resource code')
      expect(uriEl).not.toBeNull()
      expect(uriEl!.textContent).toBe('https://pod.example/file.ttl')
    })

    it('renders no-ACL message when no permissions found', () => {
      const subject = sym('https://pod.example/file.ttl')
      store.add(subject, RDF('type'), LDP('Resource'), subject.doc())

      const container = document.createElement('div')
      sharingPane.render(subject, store, container)

      expect(container.querySelector('.sharing-no-acl')).not.toBeNull()
    })

    it('renders ACL entries with agent permissions', () => {
      const subject = sym('https://pod.example/file.ttl')
      store.add(subject, RDF('type'), LDP('Resource'), subject.doc())

      // Create an ACL authorization
      const auth = sym('https://pod.example/file.ttl.acl#owner')
      store.add(auth, RDF('type'), ACL('Authorization'), auth.doc())
      store.add(auth, ACL('accessTo'), subject, auth.doc())
      store.add(auth, ACL('mode'), ACL('Read'), auth.doc())
      store.add(auth, ACL('mode'), ACL('Write'), auth.doc())
      store.add(auth, ACL('mode'), ACL('Control'), auth.doc())
      store.add(auth, ACL('agent'), sym('https://alice.example/profile#me'), auth.doc())

      const container = document.createElement('div')
      sharingPane.render(subject, store, container)

      const agents = container.querySelectorAll('.sharing-agent')
      expect(agents.length).toBeGreaterThan(0)
    })

    it('renders public access via foaf:Agent agentClass', () => {
      const subject = sym('https://pod.example/public/')
      store.add(subject, RDF('type'), LDP('Container'), subject.doc())

      const auth = sym('https://pod.example/public/.acl#public')
      store.add(auth, RDF('type'), ACL('Authorization'), auth.doc())
      store.add(auth, ACL('accessTo'), subject, auth.doc())
      store.add(auth, ACL('mode'), ACL('Read'), auth.doc())
      store.add(auth, ACL('agentClass'), FOAF('Agent'), auth.doc())

      const container = document.createElement('div')
      sharingPane.render(subject, store, container)

      const agents = container.querySelectorAll('.sharing-agent')
      expect(agents.length).toBe(1)
      expect(agents[0].textContent).toBe('Everyone (public)')
    })

    it('renders permission levels with color coding', () => {
      const subject = sym('https://pod.example/file.ttl')
      store.add(subject, RDF('type'), LDP('Resource'), subject.doc())

      const auth = sym('https://pod.example/file.ttl.acl#viewer')
      store.add(auth, RDF('type'), ACL('Authorization'), auth.doc())
      store.add(auth, ACL('accessTo'), subject, auth.doc())
      store.add(auth, ACL('mode'), ACL('Read'), auth.doc())
      store.add(auth, ACL('agent'), sym('https://bob.example/profile#me'), auth.doc())

      const container = document.createElement('div')
      sharingPane.render(subject, store, container)

      const levelName = container.querySelector('.sharing-level-name')
      expect(levelName).not.toBeNull()
      expect(levelName!.textContent).toBe('Viewers')
    })

    it('renders access mode legend', () => {
      const subject = sym('https://pod.example/file.ttl')
      store.add(subject, RDF('type'), LDP('Resource'), subject.doc())

      const container = document.createElement('div')
      sharingPane.render(subject, store, container)

      const legend = container.querySelector('.sharing-legend')
      expect(legend).not.toBeNull()
      expect(legend!.querySelector('.sharing-legend-table')).not.toBeNull()
    })

    it('renders default info for containers', () => {
      const subject = sym('https://pod.example/folder/')
      store.add(subject, RDF('type'), LDP('Container'), subject.doc())

      const auth = sym('https://pod.example/folder/.acl#owner')
      store.add(auth, RDF('type'), ACL('Authorization'), auth.doc())
      store.add(auth, ACL('accessTo'), subject, auth.doc())
      store.add(auth, ACL('mode'), ACL('Read'), auth.doc())
      store.add(auth, ACL('agent'), sym('https://alice.example/profile#me'), auth.doc())

      const container = document.createElement('div')
      sharingPane.render(subject, store, container)

      const defaultInfo = container.querySelector('.sharing-default-info')
      expect(defaultInfo).not.toBeNull()
    })
  })
})

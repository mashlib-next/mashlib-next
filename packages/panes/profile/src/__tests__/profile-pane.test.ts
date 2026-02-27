import { describe, it, expect } from 'vitest'
import { graph, sym, Namespace } from 'rdflib'
import { profilePane } from '../profile-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')
const VCARD = Namespace('http://www.w3.org/2006/vcard/ns#')
const SCHEMA = Namespace('http://schema.org/')

function buildProfileStore() {
  const store = graph()
  const me = sym('https://example.org/profile/card#me')
  const doc = me.doc()

  store.add(me, RDF('type'), FOAF('Person'), doc)
  store.add(me, RDF('type'), SCHEMA('Person'), doc)
  store.add(me, VCARD('fn'), 'Tim Berners-Lee', doc)
  store.add(me, FOAF('name'), 'Tim Berners-Lee', doc)
  store.add(me, FOAF('nick'), 'timbl', doc)
  store.add(me, VCARD('hasPhoto'), sym('https://example.org/photo.png'), doc)
  store.add(me, VCARD('role'), 'Cofounder and CTO', doc)
  store.add(me, VCARD('organization-name'), 'Inrupt Inc', doc)
  store.add(me, VCARD('bday'), '1955-06-08', doc)
  store.add(me, VCARD('note'), 'Inventor of the World Wide Web', doc)

  // Email
  const email = sym('https://example.org/profile/card#email1')
  store.add(me, VCARD('hasEmail'), email, doc)
  store.add(email, VCARD('value'), sym('mailto:tim@example.org'), doc)

  // Contacts
  store.add(me, FOAF('knows'), sym('https://alice.example.org/profile/card#me'), doc)
  store.add(me, FOAF('knows'), sym('https://bob.example.org/profile/card#me'), doc)

  return { store, me }
}

describe('profilePane.canHandle', () => {
  it('returns true for foaf:Person typed resource', () => {
    const { store, me } = buildProfileStore()
    expect(profilePane.canHandle(me, store)).toBe(true)
  })

  it('returns true for schema:Person typed resource', () => {
    const store = graph()
    const me = sym('https://example.org/p#me')
    store.add(me, RDF('type'), SCHEMA('Person'), me.doc())
    expect(profilePane.canHandle(me, store)).toBe(true)
  })

  it('returns false for non-person resource', () => {
    const store = graph()
    const subject = sym('https://example.org/thing')
    store.add(subject, RDF('type'), sym('http://example.org/Widget'), subject.doc())
    expect(profilePane.canHandle(subject, store)).toBe(false)
  })

  it('returns true via duck-typing when foaf:name exists', () => {
    const store = graph()
    const me = sym('https://example.org/p#me')
    store.add(me, FOAF('name'), 'Someone', me.doc())
    expect(profilePane.canHandle(me, store)).toBe(true)
  })
})

describe('profilePane.render', () => {
  it('renders name and nickname', () => {
    const { store, me } = buildProfileStore()
    const container = document.createElement('div')
    profilePane.render(me, store, container)

    expect(container.querySelector('.profile-name')?.textContent).toBe('Tim Berners-Lee')
    expect(container.querySelector('.profile-nick')?.textContent).toBe('@timbl')
  })

  it('renders profile photo', () => {
    const { store, me } = buildProfileStore()
    const container = document.createElement('div')
    profilePane.render(me, store, container)

    const img = container.querySelector('.profile-photo') as HTMLImageElement
    expect(img).not.toBeNull()
    expect(img.src).toContain('photo.png')
  })

  it('renders role and organization', () => {
    const { store, me } = buildProfileStore()
    const container = document.createElement('div')
    profilePane.render(me, store, container)

    expect(container.textContent).toContain('Cofounder and CTO')
    expect(container.textContent).toContain('Inrupt Inc')
  })

  it('renders contacts list', () => {
    const { store, me } = buildProfileStore()
    const container = document.createElement('div')
    profilePane.render(me, store, container)

    expect(container.querySelector('h3')?.textContent).toContain('Contacts')
    const friends = container.querySelectorAll('.profile-friends-list li')
    expect(friends).toHaveLength(2)
  })

  it('renders birthday', () => {
    const { store, me } = buildProfileStore()
    const container = document.createElement('div')
    profilePane.render(me, store, container)

    expect(container.textContent).toContain('1955-06-08')
  })
})

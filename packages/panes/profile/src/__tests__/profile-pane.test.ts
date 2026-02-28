import { describe, it, expect, vi } from 'vitest'
import { graph, sym, lit, Namespace, Fetcher, UpdateManager } from 'rdflib'
import { profilePane } from '../profile-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')
const VCARD = Namespace('http://www.w3.org/2006/vcard/ns#')
const SCHEMA = Namespace('http://schema.org/')
const SOLID = Namespace('http://www.w3.org/ns/solid/terms#')
const ORG = Namespace('http://www.w3.org/ns/org#')
const RDFS = Namespace('http://www.w3.org/2000/01/rdf-schema#')
const SPACE = Namespace('http://www.w3.org/ns/pim/space#')

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

  it('renders pronouns', () => {
    const store = graph()
    const me = sym('https://example.org/p#me')
    store.add(me, RDF('type'), FOAF('Person'), me.doc())
    store.add(me, VCARD('fn'), 'Alex', me.doc())
    store.add(me, SOLID('preferredSubjectPronoun'), lit('they'), me.doc())
    store.add(me, SOLID('preferredObjectPronoun'), lit('them'), me.doc())
    store.add(me, SOLID('preferredRelativePronoun'), lit('their'), me.doc())

    const container = document.createElement('div')
    profilePane.render(me, store, container)

    const pronounsEl = container.querySelector('.profile-pronouns')
    expect(pronounsEl).not.toBeNull()
    expect(pronounsEl!.textContent).toBe('they/them/their')
  })

  it('renders location from address', () => {
    const store = graph()
    const me = sym('https://example.org/p#me')
    store.add(me, RDF('type'), FOAF('Person'), me.doc())
    store.add(me, VCARD('fn'), 'Alice', me.doc())

    const addr = sym('https://example.org/p#addr')
    store.add(me, VCARD('hasAddress'), addr, me.doc())
    store.add(addr, VCARD('locality'), lit('Boston'), addr.doc())
    store.add(addr, VCARD('country-name'), lit('USA'), addr.doc())

    const container = document.createElement('div')
    profilePane.render(me, store, container)

    const locEl = container.querySelector('.profile-location')
    expect(locEl).not.toBeNull()
    expect(locEl!.textContent).toBe('Boston, USA')
  })

  it('renders phone numbers', () => {
    const store = graph()
    const me = sym('https://example.org/p#me')
    store.add(me, RDF('type'), FOAF('Person'), me.doc())
    store.add(me, VCARD('fn'), 'Bob', me.doc())

    const phone = sym('https://example.org/p#phone1')
    store.add(me, VCARD('hasTelephone'), phone, me.doc())
    store.add(phone, VCARD('value'), sym('tel:+1-555-0123'), phone.doc())

    const container = document.createElement('div')
    profilePane.render(me, store, container)

    expect(container.textContent).toContain('+1-555-0123')
  })

  it('renders homepage', () => {
    const store = graph()
    const me = sym('https://example.org/p#me')
    store.add(me, RDF('type'), FOAF('Person'), me.doc())
    store.add(me, VCARD('fn'), 'Carol', me.doc())
    store.add(me, FOAF('homepage'), sym('https://carol.example.org'), me.doc())

    const container = document.createElement('div')
    profilePane.render(me, store, container)

    expect(container.textContent).toContain('Homepage')
    const links = container.querySelectorAll('a[target="_blank"]')
    const homepageLink = Array.from(links).find(l => l.getAttribute('href') === 'https://carol.example.org')
    expect(homepageLink).not.toBeUndefined()
  })

  it('renders social accounts', () => {
    const store = graph()
    const me = sym('https://example.org/p#me')
    store.add(me, RDF('type'), FOAF('Person'), me.doc())
    store.add(me, VCARD('fn'), 'Dave', me.doc())

    const github = sym('https://example.org/p#github')
    store.add(me, FOAF('account'), github, me.doc())
    store.add(github, FOAF('name'), lit('GitHub'), github.doc())
    store.add(github, FOAF('homepage'), sym('https://github.com/dave'), github.doc())

    const mastodon = sym('https://example.org/p#mastodon')
    store.add(me, FOAF('account'), mastodon, me.doc())
    store.add(mastodon, FOAF('name'), lit('Mastodon'), mastodon.doc())
    store.add(mastodon, FOAF('homepage'), sym('https://mastodon.social/@dave'), mastodon.doc())

    const container = document.createElement('div')
    profilePane.render(me, store, container)

    expect(container.querySelector('.profile-social')).not.toBeNull()
    expect(container.querySelector('h3')?.textContent).toContain('Social')
    const socialItems = container.querySelectorAll('.profile-social-list li')
    expect(socialItems).toHaveLength(2)
  })

  it('renders work experience from org:Membership', () => {
    const store = graph()
    const me = sym('https://example.org/p#me')
    store.add(me, RDF('type'), FOAF('Person'), me.doc())
    store.add(me, VCARD('fn'), 'Eve', me.doc())

    const membership = sym('https://example.org/p#m1')
    store.add(membership, ORG('member'), me, me.doc())
    const orgNode = sym('https://example.org/p#org1')
    store.add(membership, ORG('organization'), orgNode, me.doc())
    store.add(orgNode, SCHEMA('name'), lit('CERN'), orgNode.doc())
    store.add(membership, VCARD('role'), lit('Researcher'), me.doc())
    store.add(membership, SCHEMA('startDate'), lit('2020-01-01'), me.doc())

    const container = document.createElement('div')
    profilePane.render(me, store, container)

    expect(container.querySelector('.profile-roles')).not.toBeNull()
    expect(container.textContent).toContain('Experience')
    expect(container.textContent).toContain('CERN')
    expect(container.textContent).toContain('Researcher')
  })

  it('renders multiple emails', () => {
    const store = graph()
    const me = sym('https://example.org/p#me')
    store.add(me, RDF('type'), FOAF('Person'), me.doc())
    store.add(me, VCARD('fn'), 'Frank', me.doc())

    const email1 = sym('https://example.org/p#e1')
    store.add(me, VCARD('hasEmail'), email1, me.doc())
    store.add(email1, VCARD('value'), sym('mailto:frank@work.com'), email1.doc())

    const email2 = sym('https://example.org/p#e2')
    store.add(me, VCARD('hasEmail'), email2, me.doc())
    store.add(email2, VCARD('value'), sym('mailto:frank@personal.com'), email2.doc())

    const container = document.createElement('div')
    profilePane.render(me, store, container)

    expect(container.textContent).toContain('frank@work.com')
    expect(container.textContent).toContain('frank@personal.com')
  })

  it('renders pod storage link', () => {
    const store = graph()
    const me = sym('https://example.org/p#me')
    store.add(me, RDF('type'), FOAF('Person'), me.doc())
    store.add(me, VCARD('fn'), 'Grace', me.doc())
    store.add(me, SPACE('storage'), sym('https://grace.solidcommunity.net/'), me.doc())

    const container = document.createElement('div')
    profilePane.render(me, store, container)

    expect(container.textContent).toContain('Pod')
  })

  it('shows Edit button when updater and fetcher are attached', () => {
    const store = graph()
    new Fetcher(store, {})
    store.updater = new UpdateManager(store)
    const me = sym('https://example.org/p#me')
    store.add(me, RDF('type'), FOAF('Person'), me.doc())
    store.add(me, VCARD('fn'), 'Alice', me.doc())

    const container = document.createElement('div')
    profilePane.render(me, store, container)

    expect(container.querySelector('.profile-edit-btn')).not.toBeNull()
  })

  it('hides Edit button when no updater', () => {
    const { store, me } = buildProfileStore()
    const container = document.createElement('div')
    profilePane.render(me, store, container)

    expect(container.querySelector('.profile-edit-btn')).toBeNull()
  })

  it('switches to edit form on Edit click', () => {
    const store = graph()
    new Fetcher(store, {})
    store.updater = new UpdateManager(store)
    const me = sym('https://example.org/p#me')
    store.add(me, RDF('type'), FOAF('Person'), me.doc())
    store.add(me, VCARD('fn'), 'Alice', me.doc())
    store.add(me, FOAF('nick'), 'alice', me.doc())

    const container = document.createElement('div')
    profilePane.render(me, store, container)

    const editBtn = container.querySelector('.profile-edit-btn') as HTMLButtonElement
    editBtn.click()

    // Should show edit form with input fields
    expect(container.querySelector('.profile-edit-form')).not.toBeNull()
    expect(container.querySelector('.profile-save-btn')).not.toBeNull()
    expect(container.querySelector('.profile-cancel-btn')).not.toBeNull()

    // Name field should be pre-filled
    const inputs = container.querySelectorAll('.profile-field-input')
    expect(inputs.length).toBeGreaterThanOrEqual(2)
    const nameInput = inputs[0] as HTMLInputElement
    expect(nameInput.value).toBe('Alice')
  })

  it('reverts to view mode on Cancel', () => {
    const store = graph()
    new Fetcher(store, {})
    store.updater = new UpdateManager(store)
    const me = sym('https://example.org/p#me')
    store.add(me, RDF('type'), FOAF('Person'), me.doc())
    store.add(me, VCARD('fn'), 'Alice', me.doc())

    const container = document.createElement('div')
    profilePane.render(me, store, container)

    // Enter edit mode
    ;(container.querySelector('.profile-edit-btn') as HTMLButtonElement).click()
    expect(container.querySelector('.profile-edit-form')).not.toBeNull()

    // Cancel
    ;(container.querySelector('.profile-cancel-btn') as HTMLButtonElement).click()

    // Back to profile view
    expect(container.querySelector('.profile-name')?.textContent).toBe('Alice')
    expect(container.querySelector('.profile-edit-form')).toBeNull()
  })
})

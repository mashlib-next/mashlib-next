import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { contactsPane } from '../contacts-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const VCARD = Namespace('http://www.w3.org/2006/vcard/ns#')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')

describe('contactsPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches vcard:AddressBook type', () => {
      const subject = sym('https://example.com/contacts')
      store.add(subject, RDF('type'), VCARD('AddressBook'), subject.doc())
      expect(contactsPane.canHandle(subject, store)).toBe(true)
    })

    it('matches vcard:Group type', () => {
      const subject = sym('https://example.com/group')
      store.add(subject, RDF('type'), VCARD('Group'), subject.doc())
      expect(contactsPane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with vcard:hasMember', () => {
      const subject = sym('https://example.com/contacts')
      const alice = sym('https://example.com/alice')
      store.add(subject, VCARD('hasMember'), alice, subject.doc())
      expect(contactsPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects non-address-book resources', () => {
      const subject = sym('https://example.com/profile')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(contactsPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders address book title', () => {
      const subject = sym('https://example.com/contacts')
      store.add(subject, RDF('type'), VCARD('AddressBook'), subject.doc())
      store.add(subject, VCARD('fn'), lit('My Contacts'), subject.doc())

      const container = document.createElement('div')
      contactsPane.render(subject, store, container)

      expect(container.querySelector('.contacts-title')!.textContent).toBe('My Contacts')
    })

    it('renders empty state when no contacts', () => {
      const subject = sym('https://example.com/contacts')
      store.add(subject, RDF('type'), VCARD('AddressBook'), subject.doc())

      const container = document.createElement('div')
      contactsPane.render(subject, store, container)

      expect(container.querySelector('.contacts-count')!.textContent).toBe('0 contacts')
      expect(container.querySelector('.contacts-empty')).not.toBeNull()
    })

    it('renders contacts sorted alphabetically', () => {
      const subject = sym('https://example.com/contacts')
      store.add(subject, RDF('type'), VCARD('AddressBook'), subject.doc())

      const bob = sym('https://example.com/bob')
      const alice = sym('https://example.com/alice')
      store.add(subject, VCARD('hasMember'), bob, subject.doc())
      store.add(subject, VCARD('hasMember'), alice, subject.doc())
      store.add(bob, VCARD('fn'), lit('Bob Smith'), bob.doc())
      store.add(alice, VCARD('fn'), lit('Alice Jones'), alice.doc())

      const container = document.createElement('div')
      contactsPane.render(subject, store, container)

      const names = container.querySelectorAll('.contact-name')
      expect(names.length).toBe(2)
      expect(names[0].textContent).toBe('Alice Jones')
      expect(names[1].textContent).toBe('Bob Smith')
    })

    it('shows contact count', () => {
      const subject = sym('https://example.com/contacts')
      store.add(subject, RDF('type'), VCARD('AddressBook'), subject.doc())

      const alice = sym('https://example.com/alice')
      const bob = sym('https://example.com/bob')
      const carol = sym('https://example.com/carol')
      store.add(subject, VCARD('hasMember'), alice, subject.doc())
      store.add(subject, VCARD('hasMember'), bob, subject.doc())
      store.add(subject, VCARD('hasMember'), carol, subject.doc())
      store.add(alice, VCARD('fn'), lit('Alice'), alice.doc())
      store.add(bob, VCARD('fn'), lit('Bob'), bob.doc())
      store.add(carol, VCARD('fn'), lit('Carol'), carol.doc())

      const container = document.createElement('div')
      contactsPane.render(subject, store, container)

      expect(container.querySelector('.contacts-count')!.textContent).toBe('3 contacts')
    })

    it('renders contact email', () => {
      const subject = sym('https://example.com/contacts')
      store.add(subject, RDF('type'), VCARD('AddressBook'), subject.doc())

      const alice = sym('https://example.com/alice')
      const emailNode = sym('https://example.com/alice#email')
      store.add(subject, VCARD('hasMember'), alice, subject.doc())
      store.add(alice, VCARD('fn'), lit('Alice'), alice.doc())
      store.add(alice, VCARD('hasEmail'), emailNode, alice.doc())
      store.add(emailNode, VCARD('value'), sym('mailto:alice@example.com'), alice.doc())

      const container = document.createElement('div')
      contactsPane.render(subject, store, container)

      const email = container.querySelector('.contact-email')
      expect(email).not.toBeNull()
      expect(email!.textContent).toBe('alice@example.com')
    })

    it('renders organization', () => {
      const subject = sym('https://example.com/contacts')
      store.add(subject, RDF('type'), VCARD('AddressBook'), subject.doc())

      const alice = sym('https://example.com/alice')
      store.add(subject, VCARD('hasMember'), alice, subject.doc())
      store.add(alice, VCARD('fn'), lit('Alice'), alice.doc())
      store.add(alice, VCARD('organization-name'), lit('ACME Corp'), alice.doc())

      const container = document.createElement('div')
      contactsPane.render(subject, store, container)

      expect(container.querySelector('.contact-org')!.textContent).toBe('ACME Corp')
    })

    it('renders initial placeholder when no photo', () => {
      const subject = sym('https://example.com/contacts')
      store.add(subject, RDF('type'), VCARD('AddressBook'), subject.doc())

      const alice = sym('https://example.com/alice')
      store.add(subject, VCARD('hasMember'), alice, subject.doc())
      store.add(alice, VCARD('fn'), lit('Alice'), alice.doc())

      const container = document.createElement('div')
      contactsPane.render(subject, store, container)

      const placeholder = container.querySelector('.contact-photo-placeholder')
      expect(placeholder).not.toBeNull()
      expect(placeholder!.textContent).toBe('A')
    })

    it('renders contact title', () => {
      const subject = sym('https://example.com/contacts')
      store.add(subject, RDF('type'), VCARD('AddressBook'), subject.doc())

      const alice = sym('https://example.com/alice')
      store.add(subject, VCARD('hasMember'), alice, subject.doc())
      store.add(alice, VCARD('fn'), lit('Alice'), alice.doc())
      store.add(alice, VCARD('title'), lit('CEO'), alice.doc())

      const container = document.createElement('div')
      contactsPane.render(subject, store, container)

      expect(container.querySelector('.contact-title')!.textContent).toBe('CEO')
    })

    it('renders contact address', () => {
      const subject = sym('https://example.com/contacts')
      store.add(subject, RDF('type'), VCARD('AddressBook'), subject.doc())

      const alice = sym('https://example.com/alice')
      store.add(subject, VCARD('hasMember'), alice, subject.doc())
      store.add(alice, VCARD('fn'), lit('Alice'), alice.doc())

      const addr = sym('https://example.com/alice#addr')
      store.add(alice, VCARD('hasAddress'), addr, alice.doc())
      store.add(addr, VCARD('locality'), lit('Cambridge'), addr.doc())
      store.add(addr, VCARD('region'), lit('MA'), addr.doc())
      store.add(addr, VCARD('country-name'), lit('USA'), addr.doc())

      const container = document.createElement('div')
      contactsPane.render(subject, store, container)

      expect(container.querySelector('.contact-address')!.textContent).toBe('Cambridge, MA, USA')
    })

    it('renders contact note', () => {
      const subject = sym('https://example.com/contacts')
      store.add(subject, RDF('type'), VCARD('AddressBook'), subject.doc())

      const alice = sym('https://example.com/alice')
      store.add(subject, VCARD('hasMember'), alice, subject.doc())
      store.add(alice, VCARD('fn'), lit('Alice'), alice.doc())
      store.add(alice, VCARD('note'), lit('Met at conference'), alice.doc())

      const container = document.createElement('div')
      contactsPane.render(subject, store, container)

      expect(container.querySelector('.contact-note')!.textContent).toBe('Met at conference')
    })

    it('renders groups section', () => {
      const subject = sym('https://example.com/contacts')
      store.add(subject, RDF('type'), VCARD('AddressBook'), subject.doc())

      const group = sym('https://example.com/group1')
      store.add(subject, VCARD('hasMember'), group, subject.doc())
      store.add(group, RDF('type'), VCARD('Group'), subject.doc())
      store.add(group, VCARD('fn'), lit('Work Friends'), group.doc())

      const c1 = sym('https://example.com/c1')
      store.add(group, VCARD('hasMember'), c1, group.doc())
      store.add(c1, VCARD('fn'), lit('Alice'), c1.doc())

      const container = document.createElement('div')
      contactsPane.render(subject, store, container)

      expect(container.querySelector('.contacts-groups')).not.toBeNull()
      expect(container.textContent).toContain('Work Friends')
    })

    it('renders search box for many contacts', () => {
      const subject = sym('https://example.com/contacts')
      store.add(subject, RDF('type'), VCARD('AddressBook'), subject.doc())

      for (let i = 0; i < 8; i++) {
        const c = sym(`https://example.com/c${i}`)
        store.add(subject, VCARD('hasMember'), c, subject.doc())
        store.add(c, VCARD('fn'), lit(`Contact ${i}`), c.doc())
      }

      const container = document.createElement('div')
      contactsPane.render(subject, store, container)

      expect(container.querySelector('.contacts-search')).not.toBeNull()
    })

    it('renders multiple emails for a contact', () => {
      const subject = sym('https://example.com/contacts')
      store.add(subject, RDF('type'), VCARD('AddressBook'), subject.doc())

      const alice = sym('https://example.com/alice')
      store.add(subject, VCARD('hasMember'), alice, subject.doc())
      store.add(alice, VCARD('fn'), lit('Alice'), alice.doc())

      const email1 = sym('https://example.com/alice#e1')
      store.add(alice, VCARD('hasEmail'), email1, alice.doc())
      store.add(email1, VCARD('value'), sym('mailto:alice@work.com'), email1.doc())

      const email2 = sym('https://example.com/alice#e2')
      store.add(alice, VCARD('hasEmail'), email2, alice.doc())
      store.add(email2, VCARD('value'), sym('mailto:alice@home.com'), email2.doc())

      const container = document.createElement('div')
      contactsPane.render(subject, store, container)

      const emailEls = container.querySelectorAll('.contact-email')
      expect(emailEls.length).toBe(2)
    })
  })
})

import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, VCARD, FOAF, SCHEMA } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'
import { renderContacts } from './render.js'

/**
 * Check if the subject is a vcard:AddressBook or vcard:Group.
 */
function isAddressBook(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)

  if (typeUris.includes(VCARD('AddressBook').value)) return true
  if (typeUris.includes(VCARD('Group').value)) return true

  // Duck-typing: has vcard:hasMember triples
  if (store.match(subject, VCARD('hasMember'), null, null).length > 0) return true

  return false
}

export const contactsPane: Pane = {
  label: 'Contacts',
  icon: '\u{1F4C7}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isAddressBook(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderContacts(subject, store, container)
  },
}

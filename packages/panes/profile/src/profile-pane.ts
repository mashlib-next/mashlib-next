import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, FOAF, VCARD, SCHEMA } from '@mashlib-next/utils'
import { renderProfile } from './render.js'

/**
 * Determine if the subject is a person (WebID profile).
 *
 * Checks for:
 *  1. rdf:type foaf:Person
 *  2. rdf:type schema:Person
 *  3. rdf:type vcard:Individual
 *  4. Has foaf:name or vcard:fn (duck-typing)
 */
function isPerson(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)

  if (typeUris.includes(FOAF('Person').value)) return true
  if (typeUris.includes(SCHEMA('Person').value)) return true
  if (typeUris.includes(VCARD('Individual').value)) return true

  // Duck-typing
  if (store.any(subject, FOAF('name'), null, null)) return true
  if (store.any(subject, VCARD('fn'), null, null)) return true

  return false
}

export const profilePane: Pane = {
  label: 'Profile',
  icon: '\u{1F464}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isPerson(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderProfile(subject, store, container)
  },
}

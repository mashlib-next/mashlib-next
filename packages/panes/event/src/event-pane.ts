import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, SCHEMA } from '@mashlib-next/utils'
import { renderEvent } from './render.js'

/**
 * Check if the subject is an event.
 */
function isEvent(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)

  if (typeUris.includes(SCHEMA('Event').value)) return true
  if (typeUris.includes(SCHEMA('SocialEvent').value)) return true
  if (typeUris.includes(SCHEMA('BusinessEvent').value)) return true
  if (typeUris.includes(SCHEMA('MusicEvent').value)) return true
  if (typeUris.includes(SCHEMA('EducationEvent').value)) return true

  // Duck-typing: has schema:startDate
  if (store.any(subject, SCHEMA('startDate'), null, null)) {
    // Only match if it also has a name — avoid false positives
    if (store.any(subject, SCHEMA('name'), null, null)) return true
  }

  return false
}

export const eventPane: Pane = {
  label: 'Event',
  icon: '\u{1F4C5}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isEvent(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderEvent(subject, store, container)
  },
}

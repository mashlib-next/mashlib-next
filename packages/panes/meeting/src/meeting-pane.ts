import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, MEE, SCHEMA } from '@mashlib-next/utils'
import { renderMeeting } from './render.js'

const MEETING_TYPES = [
  MEE('Meeting').value,
  SCHEMA('Event').value,
]

function isMeeting(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)

  // Explicit meeting type
  if (typeUris.includes(MEE('Meeting').value)) return true

  // Duck-typing: has mee:participant or mee:agenda
  if (store.any(subject, MEE('participant'), null, null)) return true
  if (store.any(subject, MEE('agenda'), null, null)) return true

  return false
}

export const meetingPane: Pane = {
  label: 'Meeting',
  icon: '\u{1F91D}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isMeeting(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderMeeting(subject, store, container)
  },
}

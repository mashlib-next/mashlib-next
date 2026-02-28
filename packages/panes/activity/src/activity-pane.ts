import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, AS } from '@mashlib-next/utils'
import { renderActivity } from './render.js'

const ACTIVITY_TYPES = [
  'Activity', 'Create', 'Update', 'Delete', 'Follow', 'Like',
  'Announce', 'Add', 'Remove', 'Accept', 'Reject', 'Undo',
  'Invite', 'Join', 'Leave', 'Offer',
]

const COLLECTION_TYPES = [
  'Collection', 'OrderedCollection',
  'CollectionPage', 'OrderedCollectionPage',
]

function isActivity(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)

  for (const t of ACTIVITY_TYPES) {
    if (typeUris.includes(AS(t).value)) return true
  }

  for (const t of COLLECTION_TYPES) {
    if (typeUris.includes(AS(t).value)) return true
  }

  // Duck-typing: has as:actor and as:object
  if (
    store.any(subject, AS('actor'), null, null) &&
    store.any(subject, AS('object'), null, null)
  ) {
    return true
  }

  return false
}

export const activityPane: Pane = {
  label: 'Activity',
  icon: '\u{1F514}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isActivity(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderActivity(subject, store, container)
  },
}

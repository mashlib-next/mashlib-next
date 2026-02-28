import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, LDP, SOLID, AS } from '@mashlib-next/utils'
import { renderNotifications } from './render.js'

function isNotificationInbox(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null).map(t => t.value)

  // Solid inbox
  if (types.includes(LDP('Container').value) || types.includes(LDP('BasicContainer').value)) {
    // Check if something points to this as ldp:inbox
    const inboxRefs = store.match(null, LDP('inbox'), subject, null)
    if (inboxRefs.length > 0) return true

    // Check if something points to this as solid:inbox
    const solidInboxRefs = store.match(null, SOLID('inbox'), subject, null)
    if (solidInboxRefs.length > 0) return true
  }

  // Explicit AS2 collection types used for notifications
  if (types.includes(AS('OrderedCollection').value)) return true
  if (types.includes(AS('Collection').value)) {
    // Only match if it contains notification-like items
    if (store.any(subject, AS('items'), null, null)) return true
    if (store.any(subject, LDP('contains'), null, null)) return true
  }

  // Duck-typing: has solid:notification children
  if (store.any(subject, SOLID('notification'), null, null)) return true

  return false
}

export const notificationPane: Pane = {
  label: 'Notifications',
  icon: '\u{1F514}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isNotificationInbox(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderNotifications(subject, store, container)
  },
}

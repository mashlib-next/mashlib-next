import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, MEE, WF, SIOC, DCT } from '@mashlib-next/utils'
import { renderChat } from './render.js'

/**
 * Check if the subject is a Solid chat (LongChat, ShortChat, or flow).
 */
function isChat(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)

  if (typeUris.includes(MEE('LongChat').value)) return true
  if (typeUris.includes(MEE('ShortChat').value)) return true
  if (typeUris.includes(MEE('Chat').value)) return true
  if (typeUris.includes(WF('Flow').value)) return true
  if (typeUris.includes(SIOC('Thread').value)) return true

  // Duck-typing: has wf:message triples
  if (store.match(subject, WF('message'), null, null).length > 0) return true

  // Duck-typing: looks like a message (has content + created)
  if (store.any(subject, SIOC('content'), null, null) &&
      store.any(subject, DCT('created'), null, null)) return true

  return false
}

export const chatPane: Pane = {
  label: 'Chat',
  icon: '\u{1F4AC}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isChat(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderChat(subject, store, container)
  },
}

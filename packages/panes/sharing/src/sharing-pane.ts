import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, LDP } from '@mashlib-next/utils'
import { renderSharing } from './render.js'

/**
 * Check if the subject is an LDP resource (file or container)
 * that can have ACL permissions managed.
 */
function isSharable(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)

  if (typeUris.includes(LDP('Resource').value)) return true
  if (typeUris.includes(LDP('Container').value)) return true
  if (typeUris.includes(LDP('BasicContainer').value)) return true

  // Duck-typing: URI ends with / (container convention)
  if (subject.value.endsWith('/')) return true

  return false
}

export const sharingPane: Pane = {
  label: 'Sharing',
  icon: '\u{1F512}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isSharable(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderSharing(subject, store, container)
  },
}

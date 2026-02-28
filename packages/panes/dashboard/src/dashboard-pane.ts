import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, SPACE, LDP, SOLID } from '@mashlib-next/utils'
import { renderDashboard } from './render.js'

/**
 * Check if the subject is a Solid pod root or storage root.
 * The dashboard activates on the root URI of a Solid pod.
 */
function isPodRoot(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)

  // Explicit storage type
  if (typeUris.includes(SPACE('Storage').value)) return true
  if (typeUris.includes(SOLID('Account').value)) return true

  // Pod root convention: URI is a site root (protocol + host + /)
  // AND has LDP container type
  const isContainerType =
    typeUris.includes(LDP('Container').value) ||
    typeUris.includes(LDP('BasicContainer').value)

  if (isContainerType) {
    try {
      const url = new URL(subject.value)
      if (url.pathname === '/') return true
    } catch {
      // invalid URL
    }
  }

  // Duck-typing: has space:storage pointing to self
  const storages = store.each(null, SPACE('storage'), subject, null)
  if (storages.length > 0) return true

  return false
}

export const dashboardPane: Pane = {
  label: 'Dashboard',
  icon: '\u{1F3E0}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isPodRoot(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderDashboard(subject, store, container)
  },
}

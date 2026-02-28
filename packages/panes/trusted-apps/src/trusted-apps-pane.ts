import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { ACL } from '@mashlib-next/utils'
import { renderTrustedApps } from './render.js'

/**
 * Check if the subject has trusted application entries
 * (acl:trustedApp triples pointing to app configurations).
 */
function hasTrustedApps(subject: NamedNode, store: Store): boolean {
  // Subject has acl:trustedApp triples (user profile with trusted apps)
  const apps = store.each(subject, ACL('trustedApp'), null, null)
  if (apps.length > 0) return true

  return false
}

export const trustedAppsPane: Pane = {
  label: 'Trusted Apps',
  icon: '\u{1F6E1}\u{FE0F}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return hasTrustedApps(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderTrustedApps(subject, store, container)
  },
}

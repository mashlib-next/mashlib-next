import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, LDP, DCT, POSIX } from '@mashlib-next/utils'
import { renderFolder } from './render.js'

/**
 * Determine if the subject is an LDP container (folder).
 *
 * Checks for:
 *  1. rdf:type ldp:Container
 *  2. rdf:type ldp:BasicContainer
 *  3. URI ends with / (duck-typing for containers)
 */
function isContainer(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)

  if (typeUris.includes(LDP('Container').value)) return true
  if (typeUris.includes(LDP('BasicContainer').value)) return true

  // Duck-typing: container URIs end with /
  if (subject.value.endsWith('/') && store.match(subject, LDP('contains'), null, null).length > 0) {
    return true
  }

  return false
}

export const folderPane: Pane = {
  label: 'Folder',
  icon: '\u{1F4C1}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isContainer(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderFolder(subject, store, container)
  },
}

import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, SIOC, SIOCt } from '@mashlib-next/utils'
import { renderMicroblog } from './render.js'

/**
 * Check if the subject is a microblog or microblog post.
 */
function isMicroblog(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)

  // Microblog container types
  if (typeUris.includes(SIOCt('Microblog').value)) return true
  if (typeUris.includes(SIOCt('MessageBoard').value)) return true
  if (typeUris.includes(SIOC('Forum').value)) return true

  // Single microblog post
  if (typeUris.includes(SIOCt('MicroblogPost').value)) return true

  // Duck-typing: has sioc:container_of relations pointing to posts
  const contained = store.each(subject, SIOC('container_of'), null, null)
  if (contained.length > 0) {
    // Check if any contained item looks like a post (has sioc:content)
    for (const item of contained) {
      if (item.termType === 'NamedNode') {
        if (store.any(item as NamedNode, SIOC('content'), null, null)) return true
      }
    }
  }

  return false
}

export const microblogPane: Pane = {
  label: 'Microblog',
  icon: '\u{1F4E2}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isMicroblog(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderMicroblog(subject, store, container)
  },
}

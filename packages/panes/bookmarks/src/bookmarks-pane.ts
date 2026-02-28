import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, BOOK } from '@mashlib-next/utils'
import { renderBookmarks } from './render.js'

/**
 * Check if the subject is a bookmark collection.
 */
function isBookmarkCollection(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)

  if (typeUris.includes(BOOK('BookmarkList').value)) return true
  if (typeUris.includes(BOOK('Topic').value)) return true

  // Duck-typing: has book:hasMember bookmarks
  const members = store.each(subject, BOOK('hasMember'), null, null)
  if (members.length > 0) {
    // Check at least one member is a Bookmark
    for (const m of members) {
      const memberTypes = store.each(m as NamedNode, RDF('type'), null, null)
      if (memberTypes.some(t => t.value === BOOK('Bookmark').value)) return true
    }
  }

  return false
}

export const bookmarksPane: Pane = {
  label: 'Bookmarks',
  icon: '\u{1F516}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isBookmarkCollection(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderBookmarks(subject, store, container)
  },
}

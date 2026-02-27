import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, OLO, PBO } from '@mashlib-next/utils'
import { renderPlaylist } from './render.js'

/**
 * Determine if the subject is a playlist.
 *
 * Checks for:
 *  1. rdf:type is olo:OrderedList
 *  2. rdf:type is pbo:Playlist
 *  3. Subject has olo:slot predicates (duck-typing)
 */
function isPlaylist(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)

  if (typeUris.includes(OLO('OrderedList').value)) return true
  if (typeUris.includes(PBO('Playlist').value)) return true

  // Duck-typing: if it has olo:slot entries, treat it as a playlist
  const slots = store.each(subject, OLO('slot'), null, null)
  return slots.length > 0
}

export const playlistPane: Pane = {
  label: 'Playlist',
  icon: '\u{1F3B5}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isPlaylist(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderPlaylist(subject, store, container)
  },
}

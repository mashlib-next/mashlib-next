import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, PAD } from '@mashlib-next/utils'
import { renderPad } from './render.js'

/**
 * Check if the subject is a collaborative notepad.
 */
function isPad(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)

  if (typeUris.includes(PAD('Notepad').value)) return true

  // Duck-typing: has pad:next chain
  if (store.any(subject, PAD('next'), null, null)) return true

  return false
}

export const padPane: Pane = {
  label: 'Notepad',
  icon: '\u{1F4DD}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isPad(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderPad(subject, store, container)
  },
}

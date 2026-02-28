import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { renderOutline } from './render.js'

/**
 * The outline pane is a generic RDF triple viewer.
 * It can display any resource by showing its triples in a hierarchical view.
 * This is intentionally low-priority — it's the "data browser" fallback
 * that works when no specialized pane is available.
 */
export const outlinePane: Pane = {
  label: 'Outline',
  icon: '\u{1F50D}',

  canHandle(subject: NamedNode, store: Store): boolean {
    // Accept any resource that has at least one triple about it
    const triples = store.match(subject, null, null, null)
    return triples.length > 0
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderOutline(subject, store, container)
  },
}

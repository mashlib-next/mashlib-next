import type { NamedNode, Store } from '@mashlib-next/store'

/**
 * A Pane is a UI component that can render a specific type of RDF resource.
 *
 * The pane registry asks each registered pane whether it can handle a given
 * subject. The first pane that returns true from canHandle() is selected.
 */
export interface Pane {
  /** Human-readable label for this pane (e.g., "Playlist") */
  label: string

  /** Icon identifier (emoji or icon name) */
  icon: string

  /**
   * Return true if this pane knows how to render the given subject.
   * Implementations typically check rdf:type or the presence of
   * specific predicates in the store.
   */
  canHandle: (subject: NamedNode, store: Store) => boolean

  /**
   * Render the subject into the provided container element.
   * The pane owns the container's innerHTML.
   */
  render: (subject: NamedNode, store: Store, container: HTMLElement) => void
}

import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { serialize, Namespace } from 'rdflib'

/**
 * Source pane — displays the raw Turtle serialization of all triples
 * in the document containing the given subject.
 *
 * This is the universal fallback: canHandle always returns true.
 * Register it first so more specific panes take priority.
 */
export const sourcePane: Pane = {
  label: 'Source',
  icon: '\u{1F4C4}',

  canHandle(_subject: NamedNode, _store: Store): boolean {
    return true
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    container.innerHTML = ''

    const header = document.createElement('h2')
    header.textContent = 'Source'
    container.appendChild(header)

    const docUri = subject.doc()
    const stmts = store.match(null, null, null, docUri)

    if (stmts.length === 0) {
      const empty = document.createElement('p')
      empty.textContent = 'No triples found in this document.'
      container.appendChild(empty)
      return
    }

    const pre = document.createElement('pre')
    pre.className = 'source-view'

    try {
      const turtle = serialize(docUri, store, undefined, 'text/turtle')
      pre.textContent = turtle ?? ''
    } catch {
      // Fallback: render triples as N-Triples manually
      const lines = stmts.map(
        st => `<${st.subject.value}> <${st.predicate.value}> ${
          st.object.termType === 'NamedNode'
            ? `<${st.object.value}>`
            : `"${st.object.value}"`
        } .`
      )
      pre.textContent = lines.join('\n')
    }

    container.appendChild(pre)
  },
}

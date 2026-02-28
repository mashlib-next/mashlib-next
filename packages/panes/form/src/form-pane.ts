import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, UI, RDFS } from '@mashlib-next/utils'
import { renderForm } from './render.js'

/**
 * Check if the subject has an associated UI form definition,
 * or is itself a form.
 */
function hasForm(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)

  // Subject is itself a form
  if (typeUris.includes(UI('Form').value)) return true

  // Check if any of the subject's types have a ui:creationForm or ui:annotationForm
  for (const typeNode of types) {
    if (typeNode.termType !== 'NamedNode') continue
    if (store.any(typeNode as NamedNode, UI('creationForm'), null, null)) return true
    if (store.any(typeNode as NamedNode, UI('annotationForm'), null, null)) return true

    // Walk superclasses
    const supers = store.each(typeNode as NamedNode, RDFS('subClassOf'), null, null)
    for (const sup of supers) {
      if (sup.termType !== 'NamedNode') continue
      if (store.any(sup as NamedNode, UI('creationForm'), null, null)) return true
      if (store.any(sup as NamedNode, UI('annotationForm'), null, null)) return true
    }
  }

  return false
}

export const formPane: Pane = {
  label: 'Form',
  icon: '\u{1F4CB}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return hasForm(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderForm(subject, store, container)
  },
}

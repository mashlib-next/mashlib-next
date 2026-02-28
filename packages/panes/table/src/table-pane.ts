import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, SCHEMA, RDFS } from '@mashlib-next/utils'
import { renderTable } from './render.js'

const COLLECTION_TYPES = [
  SCHEMA('Dataset').value,
  SCHEMA('DataCatalog').value,
  SCHEMA('ItemList').value,
  RDFS('Class').value,
]

/**
 * Find items that share a common rdf:type within a document.
 * Returns the type URI and list of items if found.
 */
export function findTypedItems(
  subject: NamedNode,
  store: Store
): { typeUri: string; items: NamedNode[] } | null {
  // Look for items in the same document that share a type
  const doc = subject.doc()
  const allStatements = store.match(null, RDF('type'), null, doc)

  // Count instances per type
  const typeCounts = new Map<string, NamedNode[]>()
  for (const st of allStatements) {
    const typeUri = st.object.value
    // Skip very generic types
    if (typeUri === RDFS('Resource').value) continue
    if (typeUri === RDF('Statement').value) continue

    const items = typeCounts.get(typeUri) ?? []
    items.push(st.subject as NamedNode)
    typeCounts.set(typeUri, items)
  }

  // Find the type with most instances (minimum 2)
  let bestType: string | null = null
  let bestItems: NamedNode[] = []

  for (const [typeUri, items] of typeCounts) {
    if (items.length >= 2 && items.length > bestItems.length) {
      bestType = typeUri
      bestItems = items
    }
  }

  if (bestType && bestItems.length >= 2) {
    return { typeUri: bestType, items: bestItems }
  }

  return null
}

function isTable(subject: NamedNode, store: Store): boolean {
  // Explicit collection types
  const types = store.each(subject, RDF('type'), null, null).map(t => t.value)
  for (const t of COLLECTION_TYPES) {
    if (types.includes(t)) return true
  }

  // Duck-typing: has schema:itemListElement
  if (store.any(subject, SCHEMA('itemListElement'), null, null)) return true

  // Has multiple typed items in its document
  const result = findTypedItems(subject, store)
  if (result && result.items.length >= 3) return true

  return false
}

export const tablePane: Pane = {
  label: 'Table',
  icon: '\u{1F4CA}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isTable(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderTable(subject, store, container)
  },
}

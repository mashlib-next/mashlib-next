import { graph, Fetcher, sym, NamedNode } from 'rdflib'
import type { Store } from './types.js'

export interface MashlibStore {
  /** The underlying rdflib quad store */
  store: Store
  /** The fetcher attached to the store */
  fetcher: Fetcher
  /**
   * Fetch a remote RDF document and load its triples into the store.
   * Returns the NamedNode for the document URI.
   */
  fetchDocument: (uri: string) => Promise<NamedNode>
}

/**
 * Create a new mashlib-next store with an attached fetcher.
 *
 * Usage:
 *   const { store, fetchDocument } = createStore()
 *   const doc = await fetchDocument('https://example.org/playlist.ttl')
 *   const triples = store.match(null, null, null, doc)
 */
export function createStore(): MashlibStore {
  const store = graph()
  const fetcher = new Fetcher(store, {})

  async function fetchDocument(uri: string): Promise<NamedNode> {
    const doc = sym(uri)
    await fetcher.load(doc)
    return doc
  }

  return { store, fetcher, fetchDocument }
}

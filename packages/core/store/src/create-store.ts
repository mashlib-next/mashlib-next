import { graph, Fetcher, UpdateManager, sym, NamedNode } from 'rdflib'
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

export interface CreateStoreOptions {
  /** Custom fetch function (e.g. authenticated fetch from solid-oidc) */
  fetch?: typeof globalThis.fetch
}

/**
 * Create a new mashlib-next store with an attached fetcher.
 *
 * Usage:
 *   const { store, fetchDocument } = createStore()
 *   const doc = await fetchDocument('https://example.org/playlist.ttl')
 *   const triples = store.match(null, null, null, doc)
 */
export function createStore(options?: CreateStoreOptions): MashlibStore {
  const store = graph()
  const fetcherOpts: Record<string, unknown> = {}
  if (options?.fetch) fetcherOpts.fetch = options.fetch
  const fetcher = new Fetcher(store, fetcherOpts)
  store.updater = new UpdateManager(store)

  async function fetchDocument(uri: string): Promise<NamedNode> {
    // Strip fragment — HTTP fetches the document, not a fragment within it
    const docUri = uri.replace(/#.*$/, '')
    const doc = sym(docUri)
    await fetcher.load(doc)
    return doc
  }

  return { store, fetcher, fetchDocument }
}

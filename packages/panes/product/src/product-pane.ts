import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, SCHEMA } from '@mashlib-next/utils'
import { renderProduct } from './render.js'

const PRODUCT_TYPES = [
  'Product', 'IndividualProduct', 'SomeProducts',
  'Vehicle', 'Car',
  'CreativeWork', 'SoftwareApplication', 'Book', 'Movie', 'MusicAlbum', 'Game',
]

function isProduct(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)

  for (const t of PRODUCT_TYPES) {
    if (typeUris.includes(SCHEMA(t).value)) return true
  }

  // Duck-typing: has schema:offers or schema:price
  if (store.any(subject, SCHEMA('offers'), null, null)) return true
  if (store.any(subject, SCHEMA('price'), null, null)) return true

  return false
}

export const productPane: Pane = {
  label: 'Product',
  icon: '\u{1F4E6}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isProduct(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderProduct(subject, store, container)
  },
}

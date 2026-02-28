import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, SCHEMA, FOAF } from '@mashlib-next/utils'
import { renderGallery } from './render.js'

const GALLERY_TYPES = [
  SCHEMA('ImageGallery').value,
  SCHEMA('MediaGallery').value,
  SCHEMA('CollectionPage').value,
]

const IMAGE_EXTENSIONS = [
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp', '.ico', '.avif', '.tiff',
]

/**
 * Collect image URIs from a subject's relationships.
 */
export function collectImages(subject: NamedNode, store: Store): string[] {
  const images = new Set<string>()

  // Direct schema:image values
  for (const node of store.each(subject, SCHEMA('image'), null, null)) {
    images.add(node.value)
  }

  // foaf:img
  for (const node of store.each(subject, FOAF('img'), null, null)) {
    images.add(node.value)
  }

  // schema:hasPart items that look like images
  for (const node of store.each(subject, SCHEMA('hasPart'), null, null)) {
    if (isImageUri(node.value)) {
      images.add(node.value)
    }
    // Check if the part is typed as ImageObject
    const types = store.each(node as NamedNode, RDF('type'), null, null).map(t => t.value)
    if (types.includes(SCHEMA('ImageObject').value) || types.includes(FOAF('Image').value)) {
      const url = store.any(node as NamedNode, SCHEMA('contentUrl'), null, null)?.value ??
                  store.any(node as NamedNode, SCHEMA('url'), null, null)?.value ??
                  node.value
      images.add(url)
    }
  }

  // schema:associatedMedia images
  for (const node of store.each(subject, SCHEMA('associatedMedia'), null, null)) {
    const types = store.each(node as NamedNode, RDF('type'), null, null).map(t => t.value)
    if (types.includes(SCHEMA('ImageObject').value)) {
      const url = store.any(node as NamedNode, SCHEMA('contentUrl'), null, null)?.value ?? node.value
      images.add(url)
    }
  }

  return Array.from(images)
}

function isImageUri(uri: string): boolean {
  const path = uri.split('?')[0].split('#')[0].toLowerCase()
  return IMAGE_EXTENSIONS.some(ext => path.endsWith(ext))
}

function isGallery(subject: NamedNode, store: Store): boolean {
  // Check explicit types
  const types = store.each(subject, RDF('type'), null, null).map(t => t.value)
  for (const t of GALLERY_TYPES) {
    if (types.includes(t)) return true
  }

  // Duck-typing: has 2+ images via schema:image or foaf:img
  const imageCount = collectImages(subject, store).length
  if (imageCount >= 2) return true

  return false
}

export const galleryPane: Pane = {
  label: 'Gallery',
  icon: '\u{1F5BC}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isGallery(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderGallery(subject, store, container)
  },
}

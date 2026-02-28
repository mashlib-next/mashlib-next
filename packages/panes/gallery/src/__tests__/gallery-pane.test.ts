import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { galleryPane, collectImages } from '../gallery-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const SCHEMA = Namespace('http://schema.org/')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')
const DCT = Namespace('http://purl.org/dc/terms/')

describe('galleryPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('collectImages', () => {
    it('collects schema:image values', () => {
      const subject = sym('https://example.com/album')
      store.add(subject, SCHEMA('image'), sym('https://example.com/a.jpg'), subject.doc())
      store.add(subject, SCHEMA('image'), sym('https://example.com/b.png'), subject.doc())

      const images = collectImages(subject, store)
      expect(images).toHaveLength(2)
      expect(images).toContain('https://example.com/a.jpg')
      expect(images).toContain('https://example.com/b.png')
    })

    it('collects foaf:img values', () => {
      const subject = sym('https://example.com/album')
      store.add(subject, FOAF('img'), sym('https://example.com/photo.jpg'), subject.doc())

      const images = collectImages(subject, store)
      expect(images).toHaveLength(1)
    })

    it('collects image URIs from schema:hasPart', () => {
      const subject = sym('https://example.com/album')
      store.add(subject, SCHEMA('hasPart'), sym('https://example.com/pic.jpg'), subject.doc())

      const images = collectImages(subject, store)
      expect(images).toContain('https://example.com/pic.jpg')
    })

    it('deduplicates images', () => {
      const subject = sym('https://example.com/album')
      const imgUri = sym('https://example.com/same.jpg')
      store.add(subject, SCHEMA('image'), imgUri, subject.doc())
      store.add(subject, FOAF('img'), imgUri, subject.doc())

      const images = collectImages(subject, store)
      expect(images).toHaveLength(1)
    })
  })

  describe('canHandle', () => {
    it('matches schema:ImageGallery type', () => {
      const subject = sym('https://example.com/gallery')
      store.add(subject, RDF('type'), SCHEMA('ImageGallery'), subject.doc())
      expect(galleryPane.canHandle(subject, store)).toBe(true)
    })

    it('matches schema:MediaGallery type', () => {
      const subject = sym('https://example.com/gallery')
      store.add(subject, RDF('type'), SCHEMA('MediaGallery'), subject.doc())
      expect(galleryPane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with 2+ images', () => {
      const subject = sym('https://example.com/album')
      store.add(subject, SCHEMA('image'), sym('https://example.com/a.jpg'), subject.doc())
      store.add(subject, SCHEMA('image'), sym('https://example.com/b.jpg'), subject.doc())
      expect(galleryPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects resources with only 1 image', () => {
      const subject = sym('https://example.com/item')
      store.add(subject, SCHEMA('image'), sym('https://example.com/a.jpg'), subject.doc())
      expect(galleryPane.canHandle(subject, store)).toBe(false)
    })

    it('rejects non-gallery resources', () => {
      const subject = sym('https://example.com/person')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(galleryPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders gallery title', () => {
      const subject = sym('https://example.com/gallery')
      store.add(subject, RDF('type'), SCHEMA('ImageGallery'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Vacation Photos'), subject.doc())
      store.add(subject, SCHEMA('image'), sym('https://example.com/a.jpg'), subject.doc())
      store.add(subject, SCHEMA('image'), sym('https://example.com/b.jpg'), subject.doc())

      const container = document.createElement('div')
      galleryPane.render(subject, store, container)

      expect(container.querySelector('.gallery-title')!.textContent).toBe('Vacation Photos')
    })

    it('renders image count', () => {
      const subject = sym('https://example.com/gallery')
      store.add(subject, RDF('type'), SCHEMA('ImageGallery'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Photos'), subject.doc())
      store.add(subject, SCHEMA('image'), sym('https://example.com/a.jpg'), subject.doc())
      store.add(subject, SCHEMA('image'), sym('https://example.com/b.jpg'), subject.doc())
      store.add(subject, SCHEMA('image'), sym('https://example.com/c.jpg'), subject.doc())

      const container = document.createElement('div')
      galleryPane.render(subject, store, container)

      expect(container.querySelector('.gallery-count')!.textContent).toBe('3 images')
    })

    it('renders thumbnail grid', () => {
      const subject = sym('https://example.com/gallery')
      store.add(subject, RDF('type'), SCHEMA('ImageGallery'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Photos'), subject.doc())
      store.add(subject, SCHEMA('image'), sym('https://example.com/a.jpg'), subject.doc())
      store.add(subject, SCHEMA('image'), sym('https://example.com/b.png'), subject.doc())

      const container = document.createElement('div')
      galleryPane.render(subject, store, container)

      const thumbs = container.querySelectorAll('.gallery-thumb')
      expect(thumbs.length).toBe(2)
      expect((thumbs[0] as HTMLImageElement).src).toBe('https://example.com/a.jpg')
      expect((thumbs[1] as HTMLImageElement).src).toBe('https://example.com/b.png')
    })

    it('sets lazy loading on thumbnails', () => {
      const subject = sym('https://example.com/gallery')
      store.add(subject, RDF('type'), SCHEMA('ImageGallery'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Photos'), subject.doc())
      store.add(subject, SCHEMA('image'), sym('https://example.com/a.jpg'), subject.doc())
      store.add(subject, SCHEMA('image'), sym('https://example.com/b.jpg'), subject.doc())

      const container = document.createElement('div')
      galleryPane.render(subject, store, container)

      const img = container.querySelector('.gallery-thumb') as HTMLImageElement
      expect(img.loading).toBe('lazy')
    })

    it('renders description', () => {
      const subject = sym('https://example.com/gallery')
      store.add(subject, RDF('type'), SCHEMA('ImageGallery'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Trip'), subject.doc())
      store.add(subject, SCHEMA('description'), lit('Summer trip photos'), subject.doc())
      store.add(subject, SCHEMA('image'), sym('https://example.com/a.jpg'), subject.doc())
      store.add(subject, SCHEMA('image'), sym('https://example.com/b.jpg'), subject.doc())

      const container = document.createElement('div')
      galleryPane.render(subject, store, container)

      expect(container.querySelector('.gallery-description')!.textContent).toBe('Summer trip photos')
    })

    it('renders empty gallery message', () => {
      const subject = sym('https://example.com/gallery')
      store.add(subject, RDF('type'), SCHEMA('ImageGallery'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Empty'), subject.doc())

      const container = document.createElement('div')
      galleryPane.render(subject, store, container)

      expect(container.querySelector('.gallery-empty')!.textContent).toBe('No images found.')
      expect(container.querySelector('.gallery-grid')).toBeNull()
    })
  })
})

import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { productPane } from '../product-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const SCHEMA = Namespace('https://schema.org/')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')

describe('productPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches schema:Product type', () => {
      const subject = sym('https://example.com/product')
      store.add(subject, RDF('type'), SCHEMA('Product'), subject.doc())
      expect(productPane.canHandle(subject, store)).toBe(true)
    })

    it('matches schema:SoftwareApplication type', () => {
      const subject = sym('https://example.com/app')
      store.add(subject, RDF('type'), SCHEMA('SoftwareApplication'), subject.doc())
      expect(productPane.canHandle(subject, store)).toBe(true)
    })

    it('matches schema:Book type', () => {
      const subject = sym('https://example.com/book')
      store.add(subject, RDF('type'), SCHEMA('Book'), subject.doc())
      expect(productPane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with schema:price', () => {
      const subject = sym('https://example.com/item')
      store.add(subject, SCHEMA('price'), lit('29.99'), subject.doc())
      expect(productPane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with schema:offers', () => {
      const subject = sym('https://example.com/item')
      const offer = sym('https://example.com/item#offer')
      store.add(subject, SCHEMA('offers'), offer, subject.doc())
      expect(productPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects non-product resources', () => {
      const subject = sym('https://example.com/person')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(productPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders product name', () => {
      const subject = sym('https://example.com/product')
      store.add(subject, RDF('type'), SCHEMA('Product'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Widget Pro'), subject.doc())

      const container = document.createElement('div')
      productPane.render(subject, store, container)

      expect(container.querySelector('.product-name')!.textContent).toBe('Widget Pro')
    })

    it('renders product image', () => {
      const subject = sym('https://example.com/product')
      store.add(subject, RDF('type'), SCHEMA('Product'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Widget'), subject.doc())
      store.add(subject, SCHEMA('image'), sym('https://example.com/widget.jpg'), subject.doc())

      const container = document.createElement('div')
      productPane.render(subject, store, container)

      const img = container.querySelector('.product-image') as HTMLImageElement
      expect(img).not.toBeNull()
      expect(img.src).toBe('https://example.com/widget.jpg')
    })

    it('renders direct price', () => {
      const subject = sym('https://example.com/product')
      store.add(subject, RDF('type'), SCHEMA('Product'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Widget'), subject.doc())
      store.add(subject, SCHEMA('price'), lit('29.99'), subject.doc())
      store.add(subject, SCHEMA('priceCurrency'), lit('USD'), subject.doc())

      const container = document.createElement('div')
      productPane.render(subject, store, container)

      const price = container.querySelector('.product-price')
      expect(price).not.toBeNull()
      expect(price!.textContent).toBeTruthy()
    })

    it('renders price from offers', () => {
      const subject = sym('https://example.com/product')
      store.add(subject, RDF('type'), SCHEMA('Product'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Widget'), subject.doc())

      const offer = sym('https://example.com/product#offer')
      store.add(subject, SCHEMA('offers'), offer, subject.doc())
      store.add(offer, SCHEMA('price'), lit('49.99'), offer.doc())
      store.add(offer, SCHEMA('priceCurrency'), lit('EUR'), offer.doc())

      const container = document.createElement('div')
      productPane.render(subject, store, container)

      const price = container.querySelector('.product-price')
      expect(price).not.toBeNull()
      expect(price!.textContent).toBeTruthy()
    })

    it('renders star rating', () => {
      const subject = sym('https://example.com/product')
      store.add(subject, RDF('type'), SCHEMA('Product'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Widget'), subject.doc())

      const rating = sym('https://example.com/product#rating')
      store.add(subject, SCHEMA('aggregateRating'), rating, subject.doc())
      store.add(rating, SCHEMA('ratingValue'), lit('4.2'), rating.doc())
      store.add(rating, SCHEMA('reviewCount'), lit('128'), rating.doc())

      const container = document.createElement('div')
      productPane.render(subject, store, container)

      const ratingEl = container.querySelector('.product-rating')
      expect(ratingEl).not.toBeNull()
      expect(container.querySelector('.product-stars')!.textContent).toContain('\u2605')
      expect(container.querySelector('.product-score')!.textContent).toContain('4.2')
      expect(container.querySelector('.product-score')!.textContent).toContain('128 reviews')
    })

    it('renders description', () => {
      const subject = sym('https://example.com/product')
      store.add(subject, RDF('type'), SCHEMA('Product'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Widget'), subject.doc())
      store.add(subject, SCHEMA('description'), lit('A great widget.'), subject.doc())

      const container = document.createElement('div')
      productPane.render(subject, store, container)

      expect(container.querySelector('.product-description')!.textContent).toBe('A great widget.')
    })

    it('renders without optional fields', () => {
      const subject = sym('https://example.com/product')
      store.add(subject, RDF('type'), SCHEMA('Product'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Minimal Product'), subject.doc())

      const container = document.createElement('div')
      productPane.render(subject, store, container)

      expect(container.querySelector('.product-name')!.textContent).toBe('Minimal Product')
      expect(container.querySelector('.product-image')).toBeNull()
      expect(container.querySelector('.product-price')).toBeNull()
      expect(container.querySelector('.product-rating')).toBeNull()
    })
  })
})

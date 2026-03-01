import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { imagePane } from '../image-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')
const SCHEMA = Namespace('https://schema.org/')
const DCT = Namespace('http://purl.org/dc/terms/')

describe('imagePane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches .png files', () => {
      const subject = sym('https://example.com/photo.png')
      expect(imagePane.canHandle(subject, store)).toBe(true)
    })

    it('matches .jpg files', () => {
      const subject = sym('https://example.com/photo.jpg')
      expect(imagePane.canHandle(subject, store)).toBe(true)
    })

    it('matches .svg files', () => {
      const subject = sym('https://example.com/diagram.svg')
      expect(imagePane.canHandle(subject, store)).toBe(true)
    })

    it('matches foaf:Image type', () => {
      const subject = sym('https://example.com/resource')
      store.add(subject, RDF('type'), FOAF('Image'), subject.doc())
      expect(imagePane.canHandle(subject, store)).toBe(true)
    })

    it('matches schema:ImageObject type', () => {
      const subject = sym('https://example.com/resource')
      store.add(subject, RDF('type'), SCHEMA('ImageObject'), subject.doc())
      expect(imagePane.canHandle(subject, store)).toBe(true)
    })

    it('rejects non-image URIs without image type', () => {
      const subject = sym('https://example.com/document.ttl')
      expect(imagePane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders an img element with correct src', () => {
      const subject = sym('https://example.com/photo.png')
      const container = document.createElement('div')
      imagePane.render(subject, store, container)

      const img = container.querySelector('img')
      expect(img).not.toBeNull()
      expect(img!.src).toBe('https://example.com/photo.png')
      expect(img!.alt).toBe('photo.png')
    })

    it('renders caption from RDF metadata', () => {
      const subject = sym('https://example.com/photo.png')
      store.add(subject, DCT('title'), lit('My Photo'), subject.doc())
      store.add(subject, DCT('description'), lit('A nice photo'), subject.doc())

      const container = document.createElement('div')
      imagePane.render(subject, store, container)

      const caption = container.querySelector('.image-caption')
      expect(caption).not.toBeNull()
      expect(caption!.querySelector('h3')!.textContent).toBe('My Photo')
      expect(caption!.querySelector('p')!.textContent).toBe('A nice photo')
    })

    it('renders without caption when no metadata', () => {
      const subject = sym('https://example.com/photo.png')
      const container = document.createElement('div')
      imagePane.render(subject, store, container)

      expect(container.querySelector('.image-caption')).toBeNull()
    })
  })
})

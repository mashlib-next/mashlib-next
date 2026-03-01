import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { videoPane } from '../video-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const SCHEMA = Namespace('https://schema.org/')
const DCT = Namespace('http://purl.org/dc/terms/')

describe('videoPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches .mp4 files', () => {
      const subject = sym('https://example.com/clip.mp4')
      expect(videoPane.canHandle(subject, store)).toBe(true)
    })

    it('matches .webm files', () => {
      const subject = sym('https://example.com/clip.webm')
      expect(videoPane.canHandle(subject, store)).toBe(true)
    })

    it('matches .ogg files', () => {
      const subject = sym('https://example.com/clip.ogg')
      expect(videoPane.canHandle(subject, store)).toBe(true)
    })

    it('matches .mov files', () => {
      const subject = sym('https://example.com/movie.mov')
      expect(videoPane.canHandle(subject, store)).toBe(true)
    })

    it('matches schema:VideoObject type', () => {
      const subject = sym('https://example.com/resource')
      store.add(subject, RDF('type'), SCHEMA('VideoObject'), subject.doc())
      expect(videoPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects non-video URIs without video type', () => {
      const subject = sym('https://example.com/photo.png')
      expect(videoPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders a video element with source and correct type', () => {
      const subject = sym('https://example.com/clip.mp4')
      const container = document.createElement('div')
      videoPane.render(subject, store, container)

      const video = container.querySelector('video')
      expect(video).not.toBeNull()
      expect(video!.controls).toBe(true)

      const source = video!.querySelector('source')
      expect(source).not.toBeNull()
      expect(source!.src).toBe('https://example.com/clip.mp4')
      expect(source!.type).toBe('video/mp4')
    })

    it('renders a video element with src for typed resources', () => {
      const subject = sym('https://example.com/resource')
      store.add(subject, RDF('type'), SCHEMA('VideoObject'), subject.doc())

      const container = document.createElement('div')
      videoPane.render(subject, store, container)

      const video = container.querySelector('video')
      expect(video).not.toBeNull()
      expect(video!.src).toBe('https://example.com/resource')
    })

    it('renders caption from RDF metadata', () => {
      const subject = sym('https://example.com/clip.mp4')
      store.add(subject, DCT('title'), lit('My Video'), subject.doc())
      store.add(subject, DCT('description'), lit('A great clip'), subject.doc())

      const container = document.createElement('div')
      videoPane.render(subject, store, container)

      const caption = container.querySelector('.video-caption')
      expect(caption).not.toBeNull()
      expect(caption!.querySelector('h3')!.textContent).toBe('My Video')
      expect(caption!.querySelector('p')!.textContent).toBe('A great clip')
    })

    it('renders without caption when no metadata', () => {
      const subject = sym('https://example.com/clip.webm')
      const container = document.createElement('div')
      videoPane.render(subject, store, container)

      expect(container.querySelector('.video-caption')).toBeNull()
    })
  })
})

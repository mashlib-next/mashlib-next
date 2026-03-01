import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { audioPane } from '../audio-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const SCHEMA = Namespace('https://schema.org/')
const MO = Namespace('http://purl.org/ontology/mo/')
const DCT = Namespace('http://purl.org/dc/terms/')

describe('audioPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches .mp3 files', () => {
      const subject = sym('https://example.com/song.mp3')
      expect(audioPane.canHandle(subject, store)).toBe(true)
    })

    it('matches .wav files', () => {
      const subject = sym('https://example.com/recording.wav')
      expect(audioPane.canHandle(subject, store)).toBe(true)
    })

    it('matches .flac files', () => {
      const subject = sym('https://example.com/track.flac')
      expect(audioPane.canHandle(subject, store)).toBe(true)
    })

    it('matches .ogg files', () => {
      const subject = sym('https://example.com/audio.ogg')
      expect(audioPane.canHandle(subject, store)).toBe(true)
    })

    it('matches .m4a files', () => {
      const subject = sym('https://example.com/podcast.m4a')
      expect(audioPane.canHandle(subject, store)).toBe(true)
    })

    it('matches schema:AudioObject type', () => {
      const subject = sym('https://example.com/resource')
      store.add(subject, RDF('type'), SCHEMA('AudioObject'), subject.doc())
      expect(audioPane.canHandle(subject, store)).toBe(true)
    })

    it('matches mo:Track type', () => {
      const subject = sym('https://example.com/resource')
      store.add(subject, RDF('type'), MO('Track'), subject.doc())
      expect(audioPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects non-audio URIs without audio type', () => {
      const subject = sym('https://example.com/photo.png')
      expect(audioPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders an audio element with source and correct type', () => {
      const subject = sym('https://example.com/song.mp3')
      const container = document.createElement('div')
      audioPane.render(subject, store, container)

      const audio = container.querySelector('audio')
      expect(audio).not.toBeNull()
      expect(audio!.controls).toBe(true)

      const source = audio!.querySelector('source')
      expect(source).not.toBeNull()
      expect(source!.src).toBe('https://example.com/song.mp3')
      expect(source!.type).toBe('audio/mpeg')
    })

    it('shows filename as title when no metadata', () => {
      const subject = sym('https://example.com/song.mp3')
      const container = document.createElement('div')
      audioPane.render(subject, store, container)

      const title = container.querySelector('.audio-title')
      expect(title).not.toBeNull()
      expect(title!.textContent).toBe('song.mp3')
    })

    it('renders title and artist from RDF metadata', () => {
      const subject = sym('https://example.com/song.mp3')
      store.add(subject, DCT('title'), lit('My Song'), subject.doc())
      store.add(subject, DCT('creator'), lit('The Artist'), subject.doc())

      const container = document.createElement('div')
      audioPane.render(subject, store, container)

      expect(container.querySelector('.audio-title')!.textContent).toBe('My Song')
      expect(container.querySelector('.audio-artist')!.textContent).toBe('The Artist')
    })

    it('renders without artist when not available', () => {
      const subject = sym('https://example.com/song.mp3')
      const container = document.createElement('div')
      audioPane.render(subject, store, container)

      expect(container.querySelector('.audio-artist')).toBeNull()
    })

    it('renders description when available', () => {
      const subject = sym('https://example.com/song.mp3')
      store.add(subject, DCT('description'), lit('A lovely tune'), subject.doc())

      const container = document.createElement('div')
      audioPane.render(subject, store, container)

      expect(container.querySelector('.audio-description')!.textContent).toBe('A lovely tune')
    })
  })
})

import { describe, it, expect } from 'vitest'
import { graph, sym, Namespace } from 'rdflib'
import { playlistPane } from '../playlist-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const OLO = Namespace('http://purl.org/ontology/olo/core#')
const DC = Namespace('http://purl.org/dc/elements/1.1/')
const SCHEMA = Namespace('http://schema.org/')

function buildPlaylistStore() {
  const store = graph()
  const playlist = sym('http://example.org/playlist1')
  const slot1 = sym('http://example.org/playlist1#slot1')
  const slot2 = sym('http://example.org/playlist1#slot2')
  const track1 = sym('http://example.org/track1')
  const track2 = sym('http://example.org/track2')
  const doc = playlist.doc()

  store.add(playlist, RDF('type'), OLO('OrderedList'), doc)
  store.add(playlist, DC('title'), 'My Test Playlist', doc)

  store.add(playlist, OLO('slot'), slot1, doc)
  store.add(slot1, OLO('index'), 1, doc)
  store.add(slot1, OLO('item'), track1, doc)
  store.add(track1, DC('title'), 'First Track', doc)
  store.add(track1, SCHEMA('video'), 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', doc)

  store.add(playlist, OLO('slot'), slot2, doc)
  store.add(slot2, OLO('index'), 2, doc)
  store.add(slot2, OLO('item'), track2, doc)
  store.add(track2, DC('title'), 'Second Track', doc)

  return { store, playlist }
}

describe('playlistPane.canHandle', () => {
  it('returns true for olo:OrderedList typed resource', () => {
    const { store, playlist } = buildPlaylistStore()
    expect(playlistPane.canHandle(playlist, store)).toBe(true)
  })

  it('returns false for unrelated resource', () => {
    const store = graph()
    const subject = sym('http://example.org/something')
    store.add(subject, DC('title'), 'Not a playlist', subject.doc())
    expect(playlistPane.canHandle(subject, store)).toBe(false)
  })

  it('returns true via duck-typing when olo:slot exists without explicit type', () => {
    const store = graph()
    const playlist = sym('http://example.org/pl')
    const slot = sym('http://example.org/pl#s1')
    store.add(playlist, OLO('slot'), slot, playlist.doc())
    expect(playlistPane.canHandle(playlist, store)).toBe(true)
  })
})

describe('playlistPane.render', () => {
  it('renders track titles into the container', () => {
    const { store, playlist } = buildPlaylistStore()
    const container = document.createElement('div')
    playlistPane.render(playlist, store, container)

    expect(container.querySelector('h2')?.textContent).toBe('My Test Playlist')
    const items = container.querySelectorAll('.playlist-track')
    expect(items).toHaveLength(2)
    expect(items[0].querySelector('.track-title')?.textContent).toBe('First Track')
    expect(items[1].querySelector('.track-title')?.textContent).toBe('Second Track')
  })

  it('embeds YouTube video for tracks with video URL', () => {
    const { store, playlist } = buildPlaylistStore()
    const container = document.createElement('div')
    playlistPane.render(playlist, store, container)

    const iframe = container.querySelector('iframe')
    expect(iframe).not.toBeNull()
    expect(iframe?.src).toContain('youtube-nocookie.com/embed/dQw4w9WgXcQ')
  })

  it('renders empty message when no tracks', () => {
    const store = graph()
    const playlist = sym('http://example.org/empty')
    store.add(playlist, RDF('type'), OLO('OrderedList'), playlist.doc())

    const container = document.createElement('div')
    playlistPane.render(playlist, store, container)
    expect(container.querySelector('p')?.textContent).toContain('No tracks found')
  })
})

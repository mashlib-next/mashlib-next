import { describe, it, expect } from 'vitest'
import { graph, sym, Namespace } from 'rdflib'
import { folderPane } from '../folder-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const LDP = Namespace('http://www.w3.org/ns/ldp#')
const DCT = Namespace('http://purl.org/dc/terms/')
const POSIX = Namespace('http://www.w3.org/ns/posix/stat#')

function buildFolderStore() {
  const store = graph()
  const container = sym('https://pod.example.org/public/')
  const doc = container.doc()

  // Container type
  store.add(container, RDF('type'), LDP('Container'), doc)
  store.add(container, RDF('type'), LDP('BasicContainer'), doc)

  // Sub-folder
  const subfolder = sym('https://pod.example.org/public/photos/')
  store.add(container, LDP('contains'), subfolder, doc)
  store.add(subfolder, RDF('type'), LDP('Container'), doc)
  store.add(subfolder, DCT('modified'), '2025-01-15T10:30:00Z', doc)

  // File
  const file = sym('https://pod.example.org/public/readme.txt')
  store.add(container, LDP('contains'), file, doc)
  store.add(file, POSIX('size'), '1234', doc)
  store.add(file, DCT('modified'), '2025-02-20T14:00:00Z', doc)

  // Another file
  const file2 = sym('https://pod.example.org/public/data.ttl')
  store.add(container, LDP('contains'), file2, doc)
  store.add(file2, DCT('format'), 'text/turtle', doc)

  return { store, container }
}

describe('folderPane.canHandle', () => {
  it('returns true for ldp:Container typed resource', () => {
    const { store, container } = buildFolderStore()
    expect(folderPane.canHandle(container, store)).toBe(true)
  })

  it('returns false for non-container resource', () => {
    const store = graph()
    const subject = sym('https://example.org/file.txt')
    store.add(subject, DCT('title'), 'A file', subject.doc())
    expect(folderPane.canHandle(subject, store)).toBe(false)
  })

  it('returns true via duck-typing for URI ending with / that has ldp:contains', () => {
    const store = graph()
    const container = sym('https://pod.example.org/stuff/')
    const item = sym('https://pod.example.org/stuff/thing.txt')
    store.add(container, LDP('contains'), item, container.doc())
    expect(folderPane.canHandle(container, store)).toBe(true)
  })
})

describe('folderPane.render', () => {
  it('renders contained resources as a listing', () => {
    const { store, container: subject } = buildFolderStore()
    const el = document.createElement('div')
    folderPane.render(subject, store, el)

    expect(el.querySelector('.folder-title')?.textContent).toBe('public')
    const rows = el.querySelectorAll('tbody tr')
    expect(rows).toHaveLength(3)
  })

  it('sorts folders before files', () => {
    const { store, container: subject } = buildFolderStore()
    const el = document.createElement('div')
    folderPane.render(subject, store, el)

    const rows = el.querySelectorAll('tbody tr')
    expect(rows[0].classList.contains('folder-row')).toBe(true)
    expect(rows[1].classList.contains('file-row')).toBe(true)
  })

  it('shows folder icon for containers', () => {
    const { store, container: subject } = buildFolderStore()
    const el = document.createElement('div')
    folderPane.render(subject, store, el)

    const icons = el.querySelectorAll('.folder-icon')
    expect(icons[0].textContent).toBe('\u{1F4C1}')
  })

  it('shows file-type icons based on extension', () => {
    const store = graph()
    const container = sym('https://pod.example.org/files/')
    store.add(container, RDF('type'), LDP('Container'), container.doc())

    const img = sym('https://pod.example.org/files/photo.jpg')
    store.add(container, LDP('contains'), img, container.doc())

    const audio = sym('https://pod.example.org/files/song.mp3')
    store.add(container, LDP('contains'), audio, container.doc())

    const el = document.createElement('div')
    folderPane.render(container, store, el)

    const icons = el.querySelectorAll('.folder-icon')
    expect(icons[0].textContent).toBe('\u{1F5BC}') // image icon
    expect(icons[1].textContent).toBe('\u{1F3B5}') // audio icon
  })

  it('displays file size when available', () => {
    const { store, container: subject } = buildFolderStore()
    const el = document.createElement('div')
    folderPane.render(subject, store, el)

    expect(el.textContent).toContain('1.2 KB')
  })

  it('renders empty message when no contents', () => {
    const store = graph()
    const container = sym('https://pod.example.org/empty/')
    store.add(container, RDF('type'), LDP('Container'), container.doc())

    const el = document.createElement('div')
    folderPane.render(container, store, el)
    expect(el.textContent).toContain('empty')
  })

  it('renders resource count', () => {
    const { store, container: subject } = buildFolderStore()
    const el = document.createElement('div')
    folderPane.render(subject, store, el)

    const count = el.querySelector('.folder-count')
    expect(count).not.toBeNull()
    expect(count!.textContent).toContain('1 folder')
    expect(count!.textContent).toContain('2 files')
  })

  it('renders breadcrumb navigation', () => {
    const { store, container: subject } = buildFolderStore()
    const el = document.createElement('div')
    folderPane.render(subject, store, el)

    const breadcrumbs = el.querySelector('.folder-breadcrumbs')
    expect(breadcrumbs).not.toBeNull()
    expect(breadcrumbs!.querySelectorAll('.folder-breadcrumb').length).toBeGreaterThan(0)
    expect(breadcrumbs!.querySelector('.folder-breadcrumb-current')!.textContent).toBe('public')
  })

  it('renders content type when available', () => {
    const { store, container: subject } = buildFolderStore()
    const el = document.createElement('div')
    folderPane.render(subject, store, el)

    expect(el.textContent).toContain('text/turtle')
  })

  it('shows Folder type for containers', () => {
    const { store, container: subject } = buildFolderStore()
    const el = document.createElement('div')
    folderPane.render(subject, store, el)

    const typeCells = el.querySelectorAll('.folder-type')
    expect(typeCells[0].textContent).toBe('Folder')
  })

  it('renders 0 items for truly empty folder', () => {
    const store = graph()
    const container = sym('https://pod.example.org/empty/')
    store.add(container, RDF('type'), LDP('Container'), container.doc())

    const el = document.createElement('div')
    folderPane.render(container, store, el)

    expect(el.querySelector('.folder-count')!.textContent).toBe('0 items')
  })
})

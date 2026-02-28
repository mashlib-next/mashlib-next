import { describe, it, expect, vi } from 'vitest'
import { graph, sym, Namespace, Fetcher } from 'rdflib'
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

  it('shows toolbar when fetcher is attached to store', () => {
    const store = graph()
    const container = sym('https://pod.example.org/public/')
    store.add(container, RDF('type'), LDP('Container'), container.doc())
    // Attach a fetcher
    ;(store as unknown as { fetcher: unknown }).fetcher = {
      webOperation: vi.fn().mockResolvedValue({}),
      load: vi.fn().mockResolvedValue({}),
    }

    const el = document.createElement('div')
    folderPane.render(container, store, el)

    const toolbar = el.querySelector('.folder-toolbar')
    expect(toolbar).not.toBeNull()
    expect(toolbar!.textContent).toContain('New Folder')
    expect(toolbar!.textContent).toContain('New File')
  })

  it('does not show toolbar when no fetcher', () => {
    const { store, container: subject } = buildFolderStore()
    const el = document.createElement('div')
    folderPane.render(subject, store, el)

    expect(el.querySelector('.folder-toolbar')).toBeNull()
  })

  it('shows create form when New Folder is clicked', () => {
    const store = graph()
    const container = sym('https://pod.example.org/public/')
    store.add(container, RDF('type'), LDP('Container'), container.doc())
    ;(store as unknown as { fetcher: unknown }).fetcher = {
      webOperation: vi.fn().mockResolvedValue({}),
      load: vi.fn().mockResolvedValue({}),
    }

    const el = document.createElement('div')
    folderPane.render(container, store, el)

    const newFolderBtn = el.querySelectorAll('.folder-toolbar-btn')[0] as HTMLButtonElement
    newFolderBtn.click()

    const form = el.querySelector('.folder-create-form') as HTMLElement
    expect(form.hidden).toBe(false)
    expect(form.textContent).toContain('Folder name')
  })

  it('hides form on cancel', () => {
    const store = graph()
    const container = sym('https://pod.example.org/public/')
    store.add(container, RDF('type'), LDP('Container'), container.doc())
    ;(store as unknown as { fetcher: unknown }).fetcher = {
      webOperation: vi.fn().mockResolvedValue({}),
      load: vi.fn().mockResolvedValue({}),
    }

    const el = document.createElement('div')
    folderPane.render(container, store, el)

    // Open the form
    const newFolderBtn = el.querySelectorAll('.folder-toolbar-btn')[0] as HTMLButtonElement
    newFolderBtn.click()

    // Cancel
    const cancelBtn = el.querySelector('.folder-create-cancel') as HTMLButtonElement
    cancelBtn.click()

    const form = el.querySelector('.folder-create-form') as HTMLElement
    expect(form.hidden).toBe(true)
  })

  it('calls webOperation POST for new folder creation', async () => {
    const store = graph()
    const container = sym('https://pod.example.org/public/')
    store.add(container, RDF('type'), LDP('Container'), container.doc())
    const mockWebOp = vi.fn().mockResolvedValue({})
    const mockLoad = vi.fn().mockResolvedValue({})
    ;(store as unknown as { fetcher: unknown }).fetcher = {
      webOperation: mockWebOp,
      load: mockLoad,
    }

    const el = document.createElement('div')
    folderPane.render(container, store, el)

    // Open form and type a name
    const newFolderBtn = el.querySelectorAll('.folder-toolbar-btn')[0] as HTMLButtonElement
    newFolderBtn.click()

    const input = el.querySelector('.folder-create-input') as HTMLInputElement
    input.value = 'my-folder'

    const createBtn = el.querySelector('.folder-create-ok') as HTMLButtonElement
    createBtn.click()

    // Wait for the async operation
    await vi.waitFor(() => {
      expect(mockWebOp).toHaveBeenCalledWith('POST', 'https://pod.example.org/public/', expect.objectContaining({
        headers: expect.objectContaining({ Slug: 'my-folder' }),
      }))
    })
  })
})

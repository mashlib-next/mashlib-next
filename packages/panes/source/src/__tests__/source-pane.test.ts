import { describe, it, expect, vi } from 'vitest'
import { graph, sym, Namespace, Fetcher } from 'rdflib'
import { sourcePane } from '../source-pane.js'

const DC = Namespace('http://purl.org/dc/elements/1.1/')
const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')

describe('sourcePane.canHandle', () => {
  it('returns true for any resource', () => {
    const store = graph()
    expect(sourcePane.canHandle(sym('http://example.org/anything'), store)).toBe(true)
  })
})

describe('sourcePane.render', () => {
  it('renders triples as source text', () => {
    const store = graph()
    const subject = sym('http://example.org/doc#thing')
    store.add(subject, DC('title'), 'Hello World', subject.doc())
    store.add(subject, RDF('type'), FOAF('Document'), subject.doc())

    const container = document.createElement('div')
    sourcePane.render(subject, store, container)

    expect(container.querySelector('h2')?.textContent).toBe('Source')
    const pre = container.querySelector('pre')
    expect(pre).not.toBeNull()
    expect(pre?.textContent).toContain('Hello World')
  })

  it('shows empty message when no triples', () => {
    const store = graph()
    const subject = sym('http://example.org/empty')

    const container = document.createElement('div')
    sourcePane.render(subject, store, container)

    expect(container.querySelector('p')?.textContent).toContain('No triples found')
  })

  it('shows Edit button when fetcher is attached', () => {
    const store = graph()
    const subject = sym('http://example.org/doc#thing')
    store.add(subject, DC('title'), 'Test', subject.doc())
    // Attach a fetcher (this is what createStore does)
    new Fetcher(store, {})

    const container = document.createElement('div')
    sourcePane.render(subject, store, container)

    const editBtn = container.querySelector('.source-edit-btn')
    expect(editBtn).not.toBeNull()
    expect(editBtn?.textContent).toBe('Edit')
  })

  it('hides Edit button when no fetcher', () => {
    const store = graph()
    const subject = sym('http://example.org/doc#thing')
    store.add(subject, DC('title'), 'Test', subject.doc())
    // No fetcher attached

    const container = document.createElement('div')
    sourcePane.render(subject, store, container)

    expect(container.querySelector('.source-edit-btn')).toBeNull()
  })

  it('switches to editor on Edit click', () => {
    const store = graph()
    const subject = sym('http://example.org/doc#thing')
    store.add(subject, DC('title'), 'Hello', subject.doc())
    new Fetcher(store, {})

    const container = document.createElement('div')
    sourcePane.render(subject, store, container)

    const editBtn = container.querySelector('.source-edit-btn') as HTMLButtonElement
    editBtn.click()

    // Should now have textarea, save, cancel — no pre
    expect(container.querySelector('textarea.source-editor')).not.toBeNull()
    expect(container.querySelector('.source-save-btn')).not.toBeNull()
    expect(container.querySelector('.source-cancel-btn')).not.toBeNull()
    expect(container.querySelector('pre')).toBeNull()
    expect(container.querySelector('.source-edit-btn')).toBeNull()
  })

  it('reverts to viewer on Cancel click', () => {
    const store = graph()
    const subject = sym('http://example.org/doc#thing')
    store.add(subject, DC('title'), 'Hello', subject.doc())
    new Fetcher(store, {})

    const container = document.createElement('div')
    sourcePane.render(subject, store, container)

    // Enter edit mode
    const editBtn = container.querySelector('.source-edit-btn') as HTMLButtonElement
    editBtn.click()

    // Cancel
    const cancelBtn = container.querySelector('.source-cancel-btn') as HTMLButtonElement
    cancelBtn.click()

    // Should be back to view mode
    expect(container.querySelector('pre.source-view')).not.toBeNull()
    expect(container.querySelector('.source-edit-btn')).not.toBeNull()
    expect(container.querySelector('textarea')).toBeNull()
  })

  it('calls webOperation PUT on Save', async () => {
    const store = graph()
    const subject = sym('http://example.org/doc#thing')
    store.add(subject, DC('title'), 'Hello', subject.doc())
    const fetcher = new Fetcher(store, {})
    fetcher.webOperation = vi.fn().mockResolvedValue({ ok: true, status: 200 })

    const container = document.createElement('div')
    sourcePane.render(subject, store, container)

    // Enter edit mode
    const editBtn = container.querySelector('.source-edit-btn') as HTMLButtonElement
    editBtn.click()

    // Modify content
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement
    textarea.value = '@prefix dc: <http://purl.org/dc/elements/1.1/> .\n<#thing> dc:title "Updated" .'

    // Save
    const saveBtn = container.querySelector('.source-save-btn') as HTMLButtonElement
    saveBtn.click()

    expect(fetcher.webOperation).toHaveBeenCalledWith('PUT', 'http://example.org/doc', {
      data: textarea.value,
      contentType: 'text/turtle',
    })
  })

  it('shows error on save failure', async () => {
    const store = graph()
    const subject = sym('http://example.org/doc#thing')
    store.add(subject, DC('title'), 'Hello', subject.doc())
    const fetcher = new Fetcher(store, {})
    fetcher.webOperation = vi.fn().mockRejectedValue(new Error('403 Forbidden'))

    const container = document.createElement('div')
    sourcePane.render(subject, store, container)

    // Enter edit, then save
    ;(container.querySelector('.source-edit-btn') as HTMLButtonElement).click()
    ;(container.querySelector('.source-save-btn') as HTMLButtonElement).click()

    // Wait for async save to complete
    await vi.waitFor(() => {
      const status = container.querySelector('.source-status')
      expect(status?.textContent).toContain('403 Forbidden')
      expect(status?.classList.contains('source-status-error')).toBe(true)
    })
  })
})

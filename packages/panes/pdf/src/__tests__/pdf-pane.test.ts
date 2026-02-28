import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { pdfPane } from '../pdf-pane.js'

describe('pdfPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches .pdf files', () => {
      const subject = sym('https://example.com/document.pdf')
      expect(pdfPane.canHandle(subject, store)).toBe(true)
    })

    it('matches .PDF files (case insensitive)', () => {
      const subject = sym('https://example.com/REPORT.PDF')
      expect(pdfPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects non-pdf files', () => {
      const subject = sym('https://example.com/document.txt')
      expect(pdfPane.canHandle(subject, store)).toBe(false)
    })

    it('rejects html files', () => {
      const subject = sym('https://example.com/page.html')
      expect(pdfPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders an object element with correct data and type', () => {
      const subject = sym('https://example.com/document.pdf')
      const container = document.createElement('div')
      pdfPane.render(subject, store, container)

      const obj = container.querySelector('object')
      expect(obj).not.toBeNull()
      expect(obj!.data).toBe('https://example.com/document.pdf')
      expect(obj!.type).toBe('application/pdf')
    })

    it('shows filename as title', () => {
      const subject = sym('https://example.com/my-report.pdf')
      const container = document.createElement('div')
      pdfPane.render(subject, store, container)

      expect(container.querySelector('.pdf-title')!.textContent).toBe('my-report.pdf')
    })

    it('includes download fallback link', () => {
      const subject = sym('https://example.com/document.pdf')
      const container = document.createElement('div')
      pdfPane.render(subject, store, container)

      const link = container.querySelector('.pdf-fallback a')
      expect(link).not.toBeNull()
      expect((link as HTMLAnchorElement).href).toBe('https://example.com/document.pdf')
      expect(link!.textContent).toBe('Download PDF')
    })

    it('has the pdf-view wrapper class', () => {
      const subject = sym('https://example.com/document.pdf')
      const container = document.createElement('div')
      pdfPane.render(subject, store, container)

      expect(container.querySelector('.pdf-view')).not.toBeNull()
    })
  })
})

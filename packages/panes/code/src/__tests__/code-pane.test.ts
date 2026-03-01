import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { codePane, getLanguage } from '../code-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const SCHEMA = Namespace('https://schema.org/')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')
const SOLID = Namespace('http://www.w3.org/ns/solid/terms#')

describe('codePane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('getLanguage', () => {
    it('detects JavaScript', () => {
      expect(getLanguage('https://example.com/app.js')).toBe('JavaScript')
    })

    it('detects TypeScript', () => {
      expect(getLanguage('https://example.com/main.ts')).toBe('TypeScript')
    })

    it('detects Python', () => {
      expect(getLanguage('https://example.com/script.py')).toBe('Python')
    })

    it('detects Rust', () => {
      expect(getLanguage('https://example.com/lib.rs')).toBe('Rust')
    })

    it('detects JSON', () => {
      expect(getLanguage('https://example.com/config.json')).toBe('JSON')
    })

    it('detects YAML', () => {
      expect(getLanguage('https://example.com/ci.yml')).toBe('YAML')
    })

    it('detects Dockerfile by name', () => {
      expect(getLanguage('https://example.com/Dockerfile')).toBe('Dockerfile')
    })

    it('detects Makefile by name', () => {
      expect(getLanguage('https://example.com/Makefile')).toBe('Makefile')
    })

    it('returns null for unknown extensions', () => {
      expect(getLanguage('https://example.com/file.xyz')).toBeNull()
    })

    it('returns null for extensionless files', () => {
      expect(getLanguage('https://example.com/README')).toBeNull()
    })

    it('ignores query params and fragments', () => {
      expect(getLanguage('https://example.com/app.ts?v=1#L10')).toBe('TypeScript')
    })
  })

  describe('canHandle', () => {
    it('matches .ts files', () => {
      const subject = sym('https://example.com/main.ts')
      expect(codePane.canHandle(subject, store)).toBe(true)
    })

    it('matches .py files', () => {
      const subject = sym('https://example.com/script.py')
      expect(codePane.canHandle(subject, store)).toBe(true)
    })

    it('matches .json files', () => {
      const subject = sym('https://example.com/data.json')
      expect(codePane.canHandle(subject, store)).toBe(true)
    })

    it('matches schema:SoftwareSourceCode', () => {
      const subject = sym('https://example.com/code')
      store.add(subject, RDF('type'), SCHEMA('SoftwareSourceCode'), subject.doc())
      expect(codePane.canHandle(subject, store)).toBe(true)
    })

    it('rejects non-code resources', () => {
      const subject = sym('https://example.com/person')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(codePane.canHandle(subject, store)).toBe(false)
    })

    it('rejects image files', () => {
      const subject = sym('https://example.com/photo.png')
      expect(codePane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders code header with filename and language', () => {
      const subject = sym('https://example.com/app.ts')
      store.add(subject, SOLID('content'), lit('const x = 1;'), subject.doc())

      const container = document.createElement('div')
      codePane.render(subject, store, container)

      expect(container.querySelector('.code-filename')!.textContent).toBe('app.ts')
      expect(container.querySelector('.code-language')!.textContent).toBe('TypeScript')
    })

    it('renders code with line numbers from store content', () => {
      const subject = sym('https://example.com/hello.py')
      store.add(subject, SOLID('content'), lit('print("hello")\nprint("world")'), subject.doc())

      const container = document.createElement('div')
      codePane.render(subject, store, container)

      const lines = container.querySelectorAll('.code-line')
      expect(lines.length).toBe(2)
      expect(lines[0].querySelector('.code-line-number')!.textContent).toBe('1')
      expect(lines[1].querySelector('.code-line-number')!.textContent).toBe('2')
    })

    it('renders line content', () => {
      const subject = sym('https://example.com/test.js')
      store.add(subject, SOLID('content'), lit('const x = 42;'), subject.doc())

      const container = document.createElement('div')
      codePane.render(subject, store, container)

      const content = container.querySelector('.code-line-content')
      expect(content!.textContent).toContain('const x = 42;')
    })

    it('renders line count footer', () => {
      const subject = sym('https://example.com/test.rs')
      store.add(subject, SOLID('content'), lit('fn main() {\n    println!("hi");\n}'), subject.doc())

      const container = document.createElement('div')
      codePane.render(subject, store, container)

      expect(container.querySelector('.code-footer')!.textContent).toBe('3 lines')
    })

    it('escapes HTML in code content', () => {
      const subject = sym('https://example.com/template.ts')
      store.add(subject, SOLID('content'), lit('const el = <div>hello</div>;'), subject.doc())

      const container = document.createElement('div')
      codePane.render(subject, store, container)

      const content = container.querySelector('.code-line-content')
      expect(content!.innerHTML).toContain('&lt;div&gt;')
    })

    it('shows loading state when fetching', () => {
      const subject = sym('https://example.com/remote.py')
      // No content in store, will attempt fetch

      const container = document.createElement('div')
      codePane.render(subject, store, container)

      expect(container.querySelector('.code-loading')!.textContent).toBe('Loading...')
    })

    it('renders single line with correct footer', () => {
      const subject = sym('https://example.com/one.sh')
      store.add(subject, SOLID('content'), lit('#!/bin/bash'), subject.doc())

      const container = document.createElement('div')
      codePane.render(subject, store, container)

      expect(container.querySelector('.code-footer')!.textContent).toBe('1 line')
    })
  })
})

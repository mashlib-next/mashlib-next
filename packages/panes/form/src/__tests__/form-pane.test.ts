import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { formPane } from '../form-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const RDFS = Namespace('http://www.w3.org/2000/01/rdf-schema#')
const UI = Namespace('http://www.w3.org/ns/ui#')
const DCT = Namespace('http://purl.org/dc/terms/')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')

describe('formPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches ui:Form type', () => {
      const subject = sym('https://example.com/form#this')
      store.add(subject, RDF('type'), UI('Form'), subject.doc())
      expect(formPane.canHandle(subject, store)).toBe(true)
    })

    it('matches subject whose type has ui:creationForm', () => {
      const subject = sym('https://example.com/thing')
      const myType = sym('https://example.com/ontology#MyType')
      const myForm = sym('https://example.com/forms/myForm')
      store.add(subject, RDF('type'), myType, subject.doc())
      store.add(myType, UI('creationForm'), myForm, myType.doc())
      expect(formPane.canHandle(subject, store)).toBe(true)
    })

    it('matches subject whose type has ui:annotationForm', () => {
      const subject = sym('https://example.com/thing')
      const myType = sym('https://example.com/ontology#MyType')
      const myForm = sym('https://example.com/forms/myForm')
      store.add(subject, RDF('type'), myType, subject.doc())
      store.add(myType, UI('annotationForm'), myForm, myType.doc())
      expect(formPane.canHandle(subject, store)).toBe(true)
    })

    it('matches via superclass ui:creationForm', () => {
      const subject = sym('https://example.com/thing')
      const subType = sym('https://example.com/ontology#SubType')
      const superType = sym('https://example.com/ontology#SuperType')
      const myForm = sym('https://example.com/forms/myForm')
      store.add(subject, RDF('type'), subType, subject.doc())
      store.add(subType, RDFS('subClassOf'), superType, subType.doc())
      store.add(superType, UI('creationForm'), myForm, superType.doc())
      expect(formPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects resources without forms', () => {
      const subject = sym('https://example.com/profile')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(formPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders form title from dct:title', () => {
      const form = sym('https://example.com/form#this')
      store.add(form, RDF('type'), UI('Form'), form.doc())
      store.add(form, DCT('title'), lit('Registration Form'), form.doc())

      const container = document.createElement('div')
      formPane.render(form, store, container)

      expect(container.querySelector('.form-title')!.textContent).toBe('Registration Form')
    })

    it('renders empty state when no fields', () => {
      const form = sym('https://example.com/form#this')
      store.add(form, RDF('type'), UI('Form'), form.doc())

      const container = document.createElement('div')
      formPane.render(form, store, container)

      expect(container.querySelector('.form-no-fields')).not.toBeNull()
    })

    it('renders form fields from ui:part', () => {
      const form = sym('https://example.com/form#this')
      store.add(form, RDF('type'), UI('Form'), form.doc())
      store.add(form, DCT('title'), lit('Test Form'), form.doc())

      const field1 = sym('https://example.com/form#field1')
      const field2 = sym('https://example.com/form#field2')

      store.add(form, UI('part'), field1, form.doc())
      store.add(field1, RDF('type'), UI('SingleLineTextField'), form.doc())
      store.add(field1, UI('property'), FOAF('name'), form.doc())
      store.add(field1, UI('sequence'), lit('1'), form.doc())

      store.add(form, UI('part'), field2, form.doc())
      store.add(field2, RDF('type'), UI('EmailField'), form.doc())
      store.add(field2, UI('property'), FOAF('mbox'), form.doc())
      store.add(field2, UI('sequence'), lit('2'), form.doc())

      const container = document.createElement('div')
      formPane.render(form, store, container)

      expect(container.querySelector('.form-count')!.textContent).toBe('2 fields')
      const fields = container.querySelectorAll('.form-field')
      expect(fields.length).toBe(2)
    })

    it('renders Comment fields as paragraphs', () => {
      const form = sym('https://example.com/form#this')
      store.add(form, RDF('type'), UI('Form'), form.doc())

      const comment = sym('https://example.com/form#comment')
      store.add(form, UI('part'), comment, form.doc())
      store.add(comment, RDF('type'), UI('Comment'), form.doc())
      store.add(comment, UI('contents'), lit('Please fill in all fields.'), form.doc())
      store.add(comment, UI('sequence'), lit('1'), form.doc())

      const container = document.createElement('div')
      formPane.render(form, store, container)

      const commentEl = container.querySelector('.form-comment')
      expect(commentEl).not.toBeNull()
      expect(commentEl!.textContent).toBe('Please fill in all fields.')
    })

    it('renders Heading fields as h3', () => {
      const form = sym('https://example.com/form#this')
      store.add(form, RDF('type'), UI('Form'), form.doc())

      const heading = sym('https://example.com/form#heading')
      store.add(form, UI('part'), heading, form.doc())
      store.add(heading, RDF('type'), UI('Heading'), form.doc())
      store.add(heading, UI('contents'), lit('Personal Information'), form.doc())
      store.add(heading, UI('sequence'), lit('1'), form.doc())

      const container = document.createElement('div')
      formPane.render(form, store, container)

      const headingEl = container.querySelector('.form-heading')
      expect(headingEl).not.toBeNull()
      expect(headingEl!.textContent).toBe('Personal Information')
    })

    it('renders BooleanField with checkmark/X', () => {
      const form = sym('https://example.com/form#this')
      store.add(form, RDF('type'), UI('Form'), form.doc())

      const boolField = sym('https://example.com/form#active')
      store.add(form, UI('part'), boolField, form.doc())
      store.add(boolField, RDF('type'), UI('BooleanField'), form.doc())
      store.add(boolField, UI('property'), sym('https://example.com/ontology#active'), form.doc())
      store.add(boolField, UI('sequence'), lit('1'), form.doc())

      const container = document.createElement('div')
      formPane.render(form, store, container)

      const boolEl = container.querySelector('.form-boolean')
      expect(boolEl).not.toBeNull()
    })

    it('renders field labels from ui:label', () => {
      const form = sym('https://example.com/form#this')
      store.add(form, RDF('type'), UI('Form'), form.doc())

      const field = sym('https://example.com/form#name')
      store.add(form, UI('part'), field, form.doc())
      store.add(field, RDF('type'), UI('SingleLineTextField'), form.doc())
      store.add(field, UI('property'), FOAF('name'), form.doc())
      store.add(field, UI('label'), lit('Full Name'), form.doc())
      store.add(field, UI('sequence'), lit('1'), form.doc())

      const container = document.createElement('div')
      formPane.render(form, store, container)

      const label = container.querySelector('.form-field-label')
      expect(label).not.toBeNull()
      expect(label!.textContent).toBe('Full Name')
    })

    it('renders current values from store', () => {
      const subject = sym('https://example.com/alice')
      const myType = sym('https://example.com/ontology#Person')
      const form = sym('https://example.com/forms/person')

      store.add(subject, RDF('type'), myType, subject.doc())
      store.add(myType, UI('annotationForm'), form, myType.doc())
      store.add(form, RDF('type'), UI('Form'), form.doc())
      store.add(form, DCT('title'), lit('Person Form'), form.doc())

      const field = sym('https://example.com/forms/person#name')
      store.add(form, UI('part'), field, form.doc())
      store.add(field, RDF('type'), UI('SingleLineTextField'), form.doc())
      store.add(field, UI('property'), FOAF('name'), form.doc())
      store.add(field, UI('sequence'), lit('1'), form.doc())

      // Current value
      store.add(subject, FOAF('name'), lit('Alice'), subject.doc())

      const container = document.createElement('div')
      formPane.render(subject, store, container)

      const input = container.querySelector('.form-input') as HTMLInputElement
      expect(input).not.toBeNull()
      expect(input.value).toBe('Alice')
    })

    it('renders no-form message when form not found', () => {
      const subject = sym('https://example.com/thing')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())

      const container = document.createElement('div')
      formPane.render(subject, store, container)

      expect(container.querySelector('.form-empty')).not.toBeNull()
    })

    it('renders MultiLineTextField as textarea', () => {
      const form = sym('https://example.com/form#this')
      store.add(form, RDF('type'), UI('Form'), form.doc())

      const field = sym('https://example.com/form#bio')
      store.add(form, UI('part'), field, form.doc())
      store.add(field, RDF('type'), UI('MultiLineTextField'), form.doc())
      store.add(field, UI('property'), sym('https://example.com/ontology#bio'), form.doc())
      store.add(field, UI('sequence'), lit('1'), form.doc())

      const container = document.createElement('div')
      formPane.render(form, store, container)

      const textarea = container.querySelector('.form-textarea')
      expect(textarea).not.toBeNull()
      expect(textarea!.tagName).toBe('TEXTAREA')
    })

    it('sorts fields by ui:sequence', () => {
      const form = sym('https://example.com/form#this')
      store.add(form, RDF('type'), UI('Form'), form.doc())

      const field1 = sym('https://example.com/form#second')
      const field2 = sym('https://example.com/form#first')

      store.add(form, UI('part'), field1, form.doc())
      store.add(field1, RDF('type'), UI('SingleLineTextField'), form.doc())
      store.add(field1, UI('label'), lit('Second'), form.doc())
      store.add(field1, UI('sequence'), lit('2'), form.doc())

      store.add(form, UI('part'), field2, form.doc())
      store.add(field2, RDF('type'), UI('SingleLineTextField'), form.doc())
      store.add(field2, UI('label'), lit('First'), form.doc())
      store.add(field2, UI('sequence'), lit('1'), form.doc())

      const container = document.createElement('div')
      formPane.render(form, store, container)

      const labels = container.querySelectorAll('.form-field-label')
      expect(labels[0].textContent).toBe('First')
      expect(labels[1].textContent).toBe('Second')
    })
  })
})

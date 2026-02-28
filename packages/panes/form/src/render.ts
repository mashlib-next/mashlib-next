import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, UI, RDFS, XSD, DC, DCT, FOAF, SCHEMA } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'

/** Supported field type URIs */
const FIELD_TYPES: Record<string, { inputType: string; xsdType?: string }> = {
  'SingleLineTextField': { inputType: 'text' },
  'TextField': { inputType: 'text' },
  'NamedNodeURIField': { inputType: 'url' },
  'IntegerField': { inputType: 'number', xsdType: 'integer' },
  'DecimalField': { inputType: 'number', xsdType: 'decimal' },
  'FloatField': { inputType: 'number', xsdType: 'float' },
  'DateField': { inputType: 'date', xsdType: 'date' },
  'DateTimeField': { inputType: 'datetime-local', xsdType: 'dateTime' },
  'TimeField': { inputType: 'time', xsdType: 'time' },
  'ColorField': { inputType: 'color' },
  'PhoneField': { inputType: 'tel' },
  'EmailField': { inputType: 'email' },
}

interface FormField {
  uri: string
  fieldType: string
  property: string | null
  label: string
  sequence: number
  contents: string | null
}

/**
 * Get a label for a resource.
 */
function getLabel(node: NamedNode, store: Store): string {
  return (
    store.any(node, RDFS('label'), null, null)?.value ??
    store.any(node, DCT('title'), null, null)?.value ??
    store.any(node, DC('title'), null, null)?.value ??
    store.any(node, FOAF('name'), null, null)?.value ??
    store.any(node, SCHEMA('name'), null, null)?.value ??
    labelFromUri(node.value)
  )
}

/**
 * Determine the most specific UI field type for a form field node.
 */
function getFieldType(fieldNode: NamedNode, store: Store): string {
  const types = store.each(fieldNode, RDF('type'), null, null)
  for (const t of types) {
    const local = labelFromUri(t.value)
    if (local !== 'type') return local
  }
  return 'Unknown'
}

/**
 * Get ordered form parts (fields) from a form node.
 * Supports both ui:parts (RDF Collection) and ui:part (unordered with ui:sequence).
 */
function getFormFields(formNode: NamedNode, store: Store): FormField[] {
  const fields: FormField[] = []

  // Try ui:part (unordered, sorted by ui:sequence)
  const parts = store.each(formNode, UI('part'), null, null)
  // Also try ui:parts (RDF Collection — follow rdf:first/rdf:rest)
  const partsCollection = store.any(formNode, UI('parts'), null, null)

  if (partsCollection && partsCollection.termType === 'NamedNode') {
    collectFromList(partsCollection as NamedNode, store, fields)
  }

  for (const part of parts) {
    if (part.termType !== 'NamedNode') continue
    const node = part as NamedNode
    // Skip if already collected from ui:parts
    if (fields.some(f => f.uri === node.value)) continue

    fields.push(extractField(node, store))
  }

  // Sort by sequence
  fields.sort((a, b) => a.sequence - b.sequence)
  return fields
}

/**
 * Walk an RDF Collection (rdf:first/rdf:rest linked list).
 */
function collectFromList(listNode: NamedNode, store: Store, fields: FormField[]): void {
  let current: NamedNode | null = listNode
  const visited = new Set<string>()

  while (current && !visited.has(current.value)) {
    visited.add(current.value)

    if (current.value === RDF('nil').value) break

    const first = store.any(current, RDF('first'), null, null)
    if (first && first.termType === 'NamedNode') {
      fields.push(extractField(first as NamedNode, store))
    }

    const rest = store.any(current, RDF('rest'), null, null)
    if (rest && rest.termType === 'NamedNode') {
      current = rest as NamedNode
    } else {
      break
    }
  }
}

/**
 * Extract field metadata from a field node.
 */
function extractField(node: NamedNode, store: Store): FormField {
  const fieldType = getFieldType(node, store)
  const property = store.any(node, UI('property'), null, null)?.value ?? null
  const label =
    store.any(node, UI('label'), null, null)?.value ??
    (property ? labelFromUri(property) : fieldType)
  const seqStr = store.any(node, UI('sequence'), null, null)?.value
  const sequence = seqStr ? parseInt(seqStr, 10) : 999
  const contents = store.any(node, UI('contents'), null, null)?.value ?? null

  return { uri: node.value, fieldType, property, label, sequence, contents }
}

/**
 * Find the form definition for a subject.
 */
function findForm(subject: NamedNode, store: Store): NamedNode | null {
  const types = store.each(subject, RDF('type'), null, null)

  // If subject IS a form
  if (types.some(t => t.value === UI('Form').value)) return subject

  // Look for annotationForm or creationForm on subject's types
  for (const typeNode of types) {
    if (typeNode.termType !== 'NamedNode') continue

    const annForm = store.any(typeNode as NamedNode, UI('annotationForm'), null, null)
    if (annForm && annForm.termType === 'NamedNode') return annForm as NamedNode

    const createForm = store.any(typeNode as NamedNode, UI('creationForm'), null, null)
    if (createForm && createForm.termType === 'NamedNode') return createForm as NamedNode

    // Walk superclasses
    const supers = store.each(typeNode as NamedNode, RDFS('subClassOf'), null, null)
    for (const sup of supers) {
      if (sup.termType !== 'NamedNode') continue
      const sAnn = store.any(sup as NamedNode, UI('annotationForm'), null, null)
      if (sAnn && sAnn.termType === 'NamedNode') return sAnn as NamedNode
      const sCreate = store.any(sup as NamedNode, UI('creationForm'), null, null)
      if (sCreate && sCreate.termType === 'NamedNode') return sCreate as NamedNode
    }
  }

  return null
}

/**
 * Render a single field.
 */
function renderField(
  field: FormField,
  subject: NamedNode,
  store: Store
): HTMLElement {
  const row = document.createElement('div')
  row.className = 'form-field'

  // Comment / Heading
  if (field.fieldType === 'Comment') {
    const p = document.createElement('p')
    p.className = 'form-comment'
    p.textContent = field.contents ?? ''
    return p
  }

  if (field.fieldType === 'Heading') {
    const h = document.createElement('h3')
    h.className = 'form-heading'
    h.textContent = field.contents ?? field.label
    return h
  }

  // Label
  const labelEl = document.createElement('label')
  labelEl.className = 'form-field-label'
  labelEl.textContent = field.label
  if (field.property) labelEl.title = field.property
  row.appendChild(labelEl)

  // Value container
  const valueEl = document.createElement('div')
  valueEl.className = 'form-field-value'

  // Get current value from store
  let currentValue = ''
  if (field.property) {
    const propNode = { termType: 'NamedNode', value: field.property } as NamedNode
    const val = store.any(subject, propNode, null, null)
    if (val) currentValue = val.value
  }

  // Boolean field
  if (field.fieldType === 'BooleanField' || field.fieldType === 'TristateField') {
    const btn = document.createElement('span')
    btn.className = 'form-boolean'
    if (currentValue === 'true' || currentValue === '1') {
      btn.textContent = '\u2713' // checkmark
      btn.classList.add('form-bool-true')
    } else if (currentValue === 'false' || currentValue === '0') {
      btn.textContent = '\u2717' // X
      btn.classList.add('form-bool-false')
    } else {
      btn.textContent = field.fieldType === 'TristateField' ? '\u2014' : '\u2717'
      btn.classList.add('form-bool-null')
    }
    valueEl.appendChild(btn)
    row.appendChild(valueEl)
    return row
  }

  // MultiLineTextField
  if (field.fieldType === 'MultiLineTextField') {
    const textarea = document.createElement('textarea')
    textarea.className = 'form-textarea'
    textarea.value = currentValue
    textarea.readOnly = true
    textarea.rows = 4
    valueEl.appendChild(textarea)
    row.appendChild(valueEl)
    return row
  }

  // Choice field
  if (field.fieldType === 'Choice' || field.fieldType === 'Classifier') {
    const select = document.createElement('select')
    select.className = 'form-select'
    select.disabled = true

    const opt = document.createElement('option')
    opt.textContent = currentValue ? labelFromUri(currentValue) : '(none)'
    opt.value = currentValue
    select.appendChild(opt)

    valueEl.appendChild(select)
    row.appendChild(valueEl)
    return row
  }

  // Standard input fields
  const fieldMeta = FIELD_TYPES[field.fieldType]
  const input = document.createElement('input')
  input.className = 'form-input'
  input.type = fieldMeta?.inputType ?? 'text'
  input.value = currentValue
  input.readOnly = true

  valueEl.appendChild(input)
  row.appendChild(valueEl)
  return row
}

/**
 * Render the form pane into the container.
 */
export function renderForm(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  container.innerHTML = ''

  const wrapper = document.createElement('div')
  wrapper.className = 'form-view'

  const formNode = findForm(subject, store)

  if (!formNode) {
    const empty = document.createElement('p')
    empty.className = 'form-empty'
    empty.textContent = 'No form definition found for this resource.'
    wrapper.appendChild(empty)
    container.appendChild(wrapper)
    return
  }

  // Form title
  const formTitle =
    store.any(formNode, DCT('title'), null, null)?.value ??
    store.any(formNode, DC('title'), null, null)?.value ??
    getLabel(formNode, store)

  const header = document.createElement('h2')
  header.className = 'form-title'
  header.textContent = formTitle
  wrapper.appendChild(header)

  // Subject label
  const subjectIsForm = formNode.value === subject.value
  if (!subjectIsForm) {
    const subLabel = document.createElement('p')
    subLabel.className = 'form-subject'
    subLabel.textContent = `Editing: ${getLabel(subject, store)}`
    wrapper.appendChild(subLabel)
  }

  // Get and render fields
  const fields = getFormFields(formNode, store)

  if (fields.length === 0) {
    const empty = document.createElement('p')
    empty.className = 'form-no-fields'
    empty.textContent = 'This form has no fields defined.'
    wrapper.appendChild(empty)
    container.appendChild(wrapper)
    return
  }

  const fieldCount = document.createElement('p')
  fieldCount.className = 'form-count'
  fieldCount.textContent = `${fields.length} field${fields.length !== 1 ? 's' : ''}`
  wrapper.appendChild(fieldCount)

  const fieldsContainer = document.createElement('div')
  fieldsContainer.className = 'form-fields'

  for (const field of fields) {
    fieldsContainer.appendChild(renderField(field, subject, store))
  }

  wrapper.appendChild(fieldsContainer)
  container.appendChild(wrapper)
}

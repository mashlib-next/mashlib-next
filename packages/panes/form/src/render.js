import { RDF, UI, RDFS, DC, DCT, FOAF, SCHEMA } from "@mashlib-next/utils";
import { labelFromUri } from "@mashlib-next/utils";
const FIELD_TYPES = {
  "SingleLineTextField": { inputType: "text" },
  "TextField": { inputType: "text" },
  "NamedNodeURIField": { inputType: "url" },
  "IntegerField": { inputType: "number", xsdType: "integer" },
  "DecimalField": { inputType: "number", xsdType: "decimal" },
  "FloatField": { inputType: "number", xsdType: "float" },
  "DateField": { inputType: "date", xsdType: "date" },
  "DateTimeField": { inputType: "datetime-local", xsdType: "dateTime" },
  "TimeField": { inputType: "time", xsdType: "time" },
  "ColorField": { inputType: "color" },
  "PhoneField": { inputType: "tel" },
  "EmailField": { inputType: "email" }
};
function getLabel(node, store) {
  return store.any(node, RDFS("label"), null, null)?.value ?? store.any(node, DCT("title"), null, null)?.value ?? store.any(node, DC("title"), null, null)?.value ?? store.any(node, FOAF("name"), null, null)?.value ?? store.any(node, SCHEMA("name"), null, null)?.value ?? labelFromUri(node.value);
}
function getFieldType(fieldNode, store) {
  const types = store.each(fieldNode, RDF("type"), null, null);
  for (const t of types) {
    const local = labelFromUri(t.value);
    if (local !== "type") return local;
  }
  return "Unknown";
}
function getFormFields(formNode, store) {
  const fields = [];
  const parts = store.each(formNode, UI("part"), null, null);
  const partsCollection = store.any(formNode, UI("parts"), null, null);
  if (partsCollection && partsCollection.termType === "NamedNode") {
    collectFromList(partsCollection, store, fields);
  }
  for (const part of parts) {
    if (part.termType !== "NamedNode") continue;
    const node = part;
    if (fields.some((f) => f.uri === node.value)) continue;
    fields.push(extractField(node, store));
  }
  fields.sort((a, b) => a.sequence - b.sequence);
  return fields;
}
function collectFromList(listNode, store, fields) {
  let current = listNode;
  const visited = /* @__PURE__ */ new Set();
  while (current && !visited.has(current.value)) {
    visited.add(current.value);
    if (current.value === RDF("nil").value) break;
    const first = store.any(current, RDF("first"), null, null);
    if (first && first.termType === "NamedNode") {
      fields.push(extractField(first, store));
    }
    const rest = store.any(current, RDF("rest"), null, null);
    if (rest && rest.termType === "NamedNode") {
      current = rest;
    } else {
      break;
    }
  }
}
function extractField(node, store) {
  const fieldType = getFieldType(node, store);
  const property = store.any(node, UI("property"), null, null)?.value ?? null;
  const label = store.any(node, UI("label"), null, null)?.value ?? (property ? labelFromUri(property) : fieldType);
  const seqStr = store.any(node, UI("sequence"), null, null)?.value;
  const sequence = seqStr ? parseInt(seqStr, 10) : 999;
  const contents = store.any(node, UI("contents"), null, null)?.value ?? null;
  return { uri: node.value, fieldType, property, label, sequence, contents };
}
function findForm(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  if (types.some((t) => t.value === UI("Form").value)) return subject;
  for (const typeNode of types) {
    if (typeNode.termType !== "NamedNode") continue;
    const annForm = store.any(typeNode, UI("annotationForm"), null, null);
    if (annForm && annForm.termType === "NamedNode") return annForm;
    const createForm = store.any(typeNode, UI("creationForm"), null, null);
    if (createForm && createForm.termType === "NamedNode") return createForm;
    const supers = store.each(typeNode, RDFS("subClassOf"), null, null);
    for (const sup of supers) {
      if (sup.termType !== "NamedNode") continue;
      const sAnn = store.any(sup, UI("annotationForm"), null, null);
      if (sAnn && sAnn.termType === "NamedNode") return sAnn;
      const sCreate = store.any(sup, UI("creationForm"), null, null);
      if (sCreate && sCreate.termType === "NamedNode") return sCreate;
    }
  }
  return null;
}
function renderField(field, subject, store) {
  const row = document.createElement("div");
  row.className = "form-field";
  if (field.fieldType === "Comment") {
    const p = document.createElement("p");
    p.className = "form-comment";
    p.textContent = field.contents ?? "";
    return p;
  }
  if (field.fieldType === "Heading") {
    const h = document.createElement("h3");
    h.className = "form-heading";
    h.textContent = field.contents ?? field.label;
    return h;
  }
  const labelEl = document.createElement("label");
  labelEl.className = "form-field-label";
  labelEl.textContent = field.label;
  if (field.property) labelEl.title = field.property;
  row.appendChild(labelEl);
  const valueEl = document.createElement("div");
  valueEl.className = "form-field-value";
  let currentValue = "";
  if (field.property) {
    const propNode = { termType: "NamedNode", value: field.property };
    const val = store.any(subject, propNode, null, null);
    if (val) currentValue = val.value;
  }
  if (field.fieldType === "BooleanField" || field.fieldType === "TristateField") {
    const btn = document.createElement("span");
    btn.className = "form-boolean";
    if (currentValue === "true" || currentValue === "1") {
      btn.textContent = "\u2713";
      btn.classList.add("form-bool-true");
    } else if (currentValue === "false" || currentValue === "0") {
      btn.textContent = "\u2717";
      btn.classList.add("form-bool-false");
    } else {
      btn.textContent = field.fieldType === "TristateField" ? "\u2014" : "\u2717";
      btn.classList.add("form-bool-null");
    }
    valueEl.appendChild(btn);
    row.appendChild(valueEl);
    return row;
  }
  if (field.fieldType === "MultiLineTextField") {
    const textarea = document.createElement("textarea");
    textarea.className = "form-textarea";
    textarea.value = currentValue;
    textarea.readOnly = true;
    textarea.rows = 4;
    valueEl.appendChild(textarea);
    row.appendChild(valueEl);
    return row;
  }
  if (field.fieldType === "Choice" || field.fieldType === "Classifier") {
    const select = document.createElement("select");
    select.className = "form-select";
    select.disabled = true;
    const opt = document.createElement("option");
    opt.textContent = currentValue ? labelFromUri(currentValue) : "(none)";
    opt.value = currentValue;
    select.appendChild(opt);
    valueEl.appendChild(select);
    row.appendChild(valueEl);
    return row;
  }
  const fieldMeta = FIELD_TYPES[field.fieldType];
  const input = document.createElement("input");
  input.className = "form-input";
  input.type = fieldMeta?.inputType ?? "text";
  input.value = currentValue;
  input.readOnly = true;
  valueEl.appendChild(input);
  row.appendChild(valueEl);
  return row;
}
function renderForm(subject, store, container) {
  container.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "form-view";
  const formNode = findForm(subject, store);
  if (!formNode) {
    const empty = document.createElement("p");
    empty.className = "form-empty";
    empty.textContent = "No form definition found for this resource.";
    wrapper.appendChild(empty);
    container.appendChild(wrapper);
    return;
  }
  const formTitle = store.any(formNode, DCT("title"), null, null)?.value ?? store.any(formNode, DC("title"), null, null)?.value ?? getLabel(formNode, store);
  const header = document.createElement("h2");
  header.className = "form-title";
  header.textContent = formTitle;
  wrapper.appendChild(header);
  const subjectIsForm = formNode.value === subject.value;
  if (!subjectIsForm) {
    const subLabel = document.createElement("p");
    subLabel.className = "form-subject";
    subLabel.textContent = `Editing: ${getLabel(subject, store)}`;
    wrapper.appendChild(subLabel);
  }
  const fields = getFormFields(formNode, store);
  if (fields.length === 0) {
    const empty = document.createElement("p");
    empty.className = "form-no-fields";
    empty.textContent = "This form has no fields defined.";
    wrapper.appendChild(empty);
    container.appendChild(wrapper);
    return;
  }
  const fieldCount = document.createElement("p");
  fieldCount.className = "form-count";
  fieldCount.textContent = `${fields.length} field${fields.length !== 1 ? "s" : ""}`;
  wrapper.appendChild(fieldCount);
  const fieldsContainer = document.createElement("div");
  fieldsContainer.className = "form-fields";
  for (const field of fields) {
    fieldsContainer.appendChild(renderField(field, subject, store));
  }
  wrapper.appendChild(fieldsContainer);
  container.appendChild(wrapper);
}
export {
  renderForm
};

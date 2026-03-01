import { RDF, SCHEMA, RDFS } from "@mashlib-next/utils";
import { renderTable } from "./render.js";
const COLLECTION_TYPES = [
  SCHEMA("Dataset").value,
  SCHEMA("DataCatalog").value,
  SCHEMA("ItemList").value,
  RDFS("Class").value
];
function findTypedItems(subject, store) {
  const doc = subject.doc();
  const allStatements = store.match(null, RDF("type"), null, doc);
  const typeCounts = /* @__PURE__ */ new Map();
  for (const st of allStatements) {
    const typeUri = st.object.value;
    if (typeUri === RDFS("Resource").value) continue;
    if (typeUri === RDF("Statement").value) continue;
    const items = typeCounts.get(typeUri) ?? [];
    items.push(st.subject);
    typeCounts.set(typeUri, items);
  }
  let bestType = null;
  let bestItems = [];
  for (const [typeUri, items] of typeCounts) {
    if (items.length >= 2 && items.length > bestItems.length) {
      bestType = typeUri;
      bestItems = items;
    }
  }
  if (bestType && bestItems.length >= 2) {
    return { typeUri: bestType, items: bestItems };
  }
  return null;
}
function isTable(subject, store) {
  const types = store.each(subject, RDF("type"), null, null).map((t) => t.value);
  for (const t of COLLECTION_TYPES) {
    if (types.includes(t)) return true;
  }
  if (store.any(subject, SCHEMA("itemListElement"), null, null)) return true;
  const result = findTypedItems(subject, store);
  if (result && result.items.length >= 3) return true;
  return false;
}
const tablePane = {
  label: "Table",
  icon: "\u{1F4CA}",
  canHandle(subject, store) {
    return isTable(subject, store);
  },
  render(subject, store, container) {
    renderTable(subject, store, container);
  }
};
export {
  findTypedItems,
  tablePane
};

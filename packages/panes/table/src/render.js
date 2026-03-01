import { sym } from "rdflib";
import { RDF, SCHEMA, DCT, RDFS } from "@mashlib-next/utils";
import { labelFromUri } from "@mashlib-next/utils";
import { findTypedItems } from "./table-pane.js";
function predicateLabel(uri) {
  return labelFromUri(uri);
}
function formatValue(value) {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return labelFromUri(value);
  }
  if (value.length > 120) {
    return value.slice(0, 117) + "...";
  }
  return value;
}
function renderTable(subject, store, container) {
  container.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "table-view";
  const title = store.any(subject, SCHEMA("name"), null, null)?.value ?? store.any(subject, DCT("title"), null, null)?.value ?? store.any(subject, RDFS("label"), null, null)?.value ?? labelFromUri(subject.value);
  const titleEl = document.createElement("h2");
  titleEl.className = "table-title";
  titleEl.textContent = title;
  wrapper.appendChild(titleEl);
  let items = [];
  let typeLabel = "";
  const listItems = store.each(subject, SCHEMA("itemListElement"), null, null);
  if (listItems.length > 0) {
    items = listItems;
    typeLabel = "List Items";
  }
  if (items.length === 0) {
    const result = findTypedItems(subject, store);
    if (result) {
      items = result.items;
      typeLabel = labelFromUri(result.typeUri);
    }
  }
  const countEl = document.createElement("p");
  countEl.className = "table-count";
  countEl.textContent = `${items.length} ${typeLabel}${items.length !== 1 ? "s" : ""}`;
  wrapper.appendChild(countEl);
  if (items.length === 0) {
    const empty = document.createElement("p");
    empty.className = "table-empty";
    empty.textContent = "No items to display.";
    wrapper.appendChild(empty);
    container.appendChild(wrapper);
    return;
  }
  const predicateSet = /* @__PURE__ */ new Set();
  for (const item of items) {
    const stmts = store.match(item, null, null, null);
    for (const st of stmts) {
      const pred = st.predicate.value;
      if (pred === RDF("type").value) continue;
      predicateSet.add(pred);
    }
  }
  const predicates = Array.from(predicateSet);
  const priorityPredicates = [
    SCHEMA("name").value,
    DCT("title").value,
    RDFS("label").value,
    SCHEMA("description").value,
    DCT("description").value
  ];
  predicates.sort((a, b) => {
    const aPriority = priorityPredicates.indexOf(a);
    const bPriority = priorityPredicates.indexOf(b);
    if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;
    if (aPriority !== -1) return -1;
    if (bPriority !== -1) return 1;
    return predicateLabel(a).localeCompare(predicateLabel(b));
  });
  const maxColumns = 8;
  const columns = predicates.slice(0, maxColumns);
  const tableWrapper = document.createElement("div");
  tableWrapper.className = "table-scroll";
  const table = document.createElement("table");
  table.className = "table-data";
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  for (const pred of columns) {
    const th = document.createElement("th");
    th.className = "table-header";
    th.textContent = predicateLabel(pred);
    th.setAttribute("data-predicate", pred);
    th.addEventListener("click", () => {
      sortTable(table, columns.indexOf(pred), items, columns, store);
    });
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  for (const item of items) {
    const row = document.createElement("tr");
    row.className = "table-row";
    for (const pred of columns) {
      const td = document.createElement("td");
      td.className = "table-cell";
      const values = store.each(item, sym(pred), null, null);
      if (values.length > 0) {
        const val = values[0].value;
        if (val.startsWith("http://") || val.startsWith("https://")) {
          const link = document.createElement("a");
          link.href = val;
          link.textContent = formatValue(val);
          link.className = "table-link";
          td.appendChild(link);
        } else {
          td.textContent = formatValue(val);
        }
      }
      row.appendChild(td);
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
  tableWrapper.appendChild(table);
  wrapper.appendChild(tableWrapper);
  if (predicates.length > maxColumns) {
    const moreEl = document.createElement("p");
    moreEl.className = "table-more";
    moreEl.textContent = `+ ${predicates.length - maxColumns} more columns hidden`;
    wrapper.appendChild(moreEl);
  }
  container.appendChild(wrapper);
}
function sortTable(table, colIndex, _items, _columns, _store) {
  const tbody = table.querySelector("tbody");
  if (!tbody) return;
  const rows = Array.from(tbody.querySelectorAll("tr"));
  const header = table.querySelectorAll("th")[colIndex];
  const currentDir = header?.getAttribute("data-sort") ?? "none";
  const newDir = currentDir === "asc" ? "desc" : "asc";
  table.querySelectorAll("th").forEach((th) => th.removeAttribute("data-sort"));
  header?.setAttribute("data-sort", newDir);
  rows.sort((a, b) => {
    const aText = a.children[colIndex]?.textContent ?? "";
    const bText = b.children[colIndex]?.textContent ?? "";
    const cmp = aText.localeCompare(bText, void 0, { numeric: true });
    return newDir === "asc" ? cmp : -cmp;
  });
  for (const row of rows) {
    tbody.appendChild(row);
  }
}
export {
  renderTable
};

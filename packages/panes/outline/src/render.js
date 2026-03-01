import { RDFS, FOAF, DCT, DC, SCHEMA, RDF } from "@mashlib-next/utils";
import { labelFromUri, createNavLink } from "@mashlib-next/utils";
function getLabel(node, store) {
  return store.any(node, RDFS("label"), null, null)?.value ?? store.any(node, FOAF("name"), null, null)?.value ?? store.any(node, DCT("title"), null, null)?.value ?? store.any(node, DC("title"), null, null)?.value ?? store.any(node, SCHEMA("name"), null, null)?.value ?? labelFromUri(node.value);
}
function predicateLabel(uri, store) {
  const triples = store.match(null, null, null, null);
  return labelFromUri(uri);
}
function groupTriples(subject, store) {
  const triples = store.match(subject, null, null, null);
  const groups = /* @__PURE__ */ new Map();
  for (const triple of triples) {
    const predUri = triple.predicate.value;
    if (!groups.has(predUri)) {
      groups.set(predUri, {
        predicate: predUri,
        predicateLabel: predicateLabel(predUri, store),
        objects: []
      });
    }
    const group = groups.get(predUri);
    group.objects.push({
      value: triple.object.value,
      termType: triple.object.termType,
      datatype: triple.object.datatype?.value,
      language: triple.object.language
    });
  }
  const sorted = [...groups.values()].sort((a, b) => {
    if (a.predicate === RDF("type").value) return -1;
    if (b.predicate === RDF("type").value) return 1;
    return a.predicateLabel.localeCompare(b.predicateLabel);
  });
  return sorted;
}
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function renderObjectValue(obj) {
  const el = document.createElement("span");
  el.className = "outline-value";
  if (obj.termType === "NamedNode") {
    const link = createNavLink(obj.value, labelFromUri(obj.value));
    link.className = "outline-link";
    link.title = obj.value;
    el.appendChild(link);
  } else if (obj.termType === "BlankNode") {
    el.textContent = `_:${obj.value}`;
    el.className += " outline-blank";
  } else {
    const valueSpan = document.createElement("span");
    valueSpan.className = "outline-literal";
    valueSpan.textContent = obj.value;
    el.appendChild(valueSpan);
    if (obj.language) {
      const langTag = document.createElement("span");
      langTag.className = "outline-lang";
      langTag.textContent = `@${obj.language}`;
      el.appendChild(langTag);
    } else if (obj.datatype && !obj.datatype.includes("XMLSchema#string")) {
      const dtTag = document.createElement("span");
      dtTag.className = "outline-datatype";
      dtTag.textContent = `^^${labelFromUri(obj.datatype)}`;
      el.appendChild(dtTag);
    }
  }
  return el;
}
function renderOutline(subject, store, container) {
  container.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "outline-view";
  const subjectLabel = getLabel(subject, store);
  const header = document.createElement("h2");
  header.className = "outline-title";
  header.textContent = subjectLabel;
  wrapper.appendChild(header);
  const uriEl = document.createElement("p");
  uriEl.className = "outline-uri";
  const uriCode = document.createElement("code");
  uriCode.textContent = subject.value;
  uriEl.appendChild(uriCode);
  wrapper.appendChild(uriEl);
  const groups = groupTriples(subject, store);
  if (groups.length === 0) {
    const empty = document.createElement("p");
    empty.className = "outline-empty";
    empty.textContent = "No triples found for this resource.";
    wrapper.appendChild(empty);
    container.appendChild(wrapper);
    return;
  }
  const totalTriples = groups.reduce((sum, g) => sum + g.objects.length, 0);
  const countEl = document.createElement("p");
  countEl.className = "outline-count";
  countEl.textContent = `${totalTriples} triple${totalTriples !== 1 ? "s" : ""} across ${groups.length} predicate${groups.length !== 1 ? "s" : ""}`;
  wrapper.appendChild(countEl);
  const table = document.createElement("table");
  table.className = "outline-table";
  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  const thPred = document.createElement("th");
  thPred.textContent = "Property";
  const thVal = document.createElement("th");
  thVal.textContent = "Value";
  headRow.appendChild(thPred);
  headRow.appendChild(thVal);
  thead.appendChild(headRow);
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  for (const group of groups) {
    for (let i = 0; i < group.objects.length; i++) {
      const row = document.createElement("tr");
      const predCell = document.createElement("td");
      predCell.className = "outline-predicate";
      if (i === 0) {
        const predLink = document.createElement("a");
        predLink.href = group.predicate;
        predLink.textContent = group.predicateLabel;
        predLink.title = group.predicate;
        predLink.target = "_blank";
        predLink.rel = "noopener";
        predCell.appendChild(predLink);
        if (group.objects.length > 1) {
          predCell.rowSpan = group.objects.length;
        }
        row.appendChild(predCell);
      }
      const objCell = document.createElement("td");
      objCell.className = "outline-object";
      objCell.appendChild(renderObjectValue(group.objects[i]));
      row.appendChild(objCell);
      tbody.appendChild(row);
    }
  }
  table.appendChild(tbody);
  wrapper.appendChild(table);
  container.appendChild(wrapper);
}
export {
  renderOutline
};

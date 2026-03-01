import { labelFromUri } from "@mashlib-next/utils";
const defaultPane = {
  label: "Properties",
  icon: "\u{1F4CB}",
  canHandle(_subject, _store) {
    return true;
  },
  render(subject, store, container) {
    container.innerHTML = "";
    const header = document.createElement("h2");
    header.textContent = labelFromUri(subject.value);
    container.appendChild(header);
    const subtitle = document.createElement("p");
    subtitle.className = "subject-uri";
    const link = document.createElement("a");
    link.href = subject.value;
    link.textContent = subject.value;
    link.target = "_blank";
    link.rel = "noopener";
    subtitle.appendChild(link);
    container.appendChild(subtitle);
    const stmts = store.match(subject, null, null, null);
    if (stmts.length === 0) {
      const empty = document.createElement("p");
      empty.textContent = "No properties found for this subject.";
      container.appendChild(empty);
      return;
    }
    const grouped = /* @__PURE__ */ new Map();
    for (const st of stmts) {
      const predUri = st.predicate.value;
      if (!grouped.has(predUri)) {
        grouped.set(predUri, { predicate: st.predicate, objects: [] });
      }
      grouped.get(predUri).objects.push({
        value: st.object.value,
        isUri: st.object.termType === "NamedNode"
      });
    }
    const table = document.createElement("table");
    table.className = "properties-table";
    const thead = document.createElement("thead");
    thead.innerHTML = "<tr><th>Property</th><th>Value</th></tr>";
    table.appendChild(thead);
    const tbody = document.createElement("tbody");
    for (const [, { predicate, objects }] of grouped) {
      for (const obj of objects) {
        const tr = document.createElement("tr");
        const predTd = document.createElement("td");
        predTd.className = "prop-predicate";
        const predLink = document.createElement("a");
        predLink.href = predicate.value;
        predLink.textContent = labelFromUri(predicate.value);
        predLink.title = predicate.value;
        predLink.target = "_blank";
        predLink.rel = "noopener";
        predTd.appendChild(predLink);
        tr.appendChild(predTd);
        const objTd = document.createElement("td");
        objTd.className = "prop-value";
        if (obj.isUri) {
          const objLink = document.createElement("a");
          objLink.href = obj.value;
          objLink.textContent = labelFromUri(obj.value);
          objLink.title = obj.value;
          objLink.target = "_blank";
          objLink.rel = "noopener";
          objTd.appendChild(objLink);
        } else {
          objTd.textContent = obj.value;
        }
        tr.appendChild(objTd);
        tbody.appendChild(tr);
      }
    }
    table.appendChild(tbody);
    container.appendChild(table);
  }
};
export {
  defaultPane
};

import { serialize } from "rdflib";
const sourcePane = {
  label: "Source",
  icon: "\u{1F4C4}",
  canHandle(_subject, _store) {
    return true;
  },
  render(subject, store, container) {
    container.innerHTML = "";
    const docUri = subject.doc();
    const stmts = store.match(null, null, null, docUri);
    const fetcher = store.fetcher;
    const sourceText = getSourceText(stmts, docUri, store);
    const headerRow = document.createElement("div");
    headerRow.className = "source-header";
    const h2 = document.createElement("h2");
    h2.textContent = "Source";
    headerRow.appendChild(h2);
    if (fetcher) {
      const editBtn = document.createElement("button");
      editBtn.className = "source-edit-btn";
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => {
        showEditor(container, headerRow, sourceText, docUri, fetcher);
      });
      headerRow.appendChild(editBtn);
    }
    container.appendChild(headerRow);
    if (stmts.length === 0) {
      const empty = document.createElement("p");
      empty.textContent = "No triples found in this document.";
      container.appendChild(empty);
      return;
    }
    const pre = document.createElement("pre");
    pre.className = "source-view";
    pre.textContent = sourceText;
    container.appendChild(pre);
  }
};
function getSourceText(stmts, docUri, store) {
  if (stmts.length === 0) return "";
  try {
    return serialize(docUri, store, void 0, "text/turtle") ?? "";
  } catch {
    return stmts.map(
      (st) => `<${st.subject.value}> <${st.predicate.value}> ${st.object.termType === "NamedNode" ? `<${st.object.value}>` : `"${st.object.value}"`} .`
    ).join("\n");
  }
}
function showEditor(container, headerRow, sourceText, docUri, fetcher) {
  while (headerRow.nextSibling) {
    headerRow.nextSibling.remove();
  }
  const editBtn = headerRow.querySelector(".source-edit-btn");
  if (editBtn) editBtn.remove();
  const btnGroup = document.createElement("div");
  btnGroup.className = "source-btn-group";
  const saveBtn = document.createElement("button");
  saveBtn.className = "source-save-btn";
  saveBtn.textContent = "Save";
  const cancelBtn = document.createElement("button");
  cancelBtn.className = "source-cancel-btn";
  cancelBtn.textContent = "Cancel";
  btnGroup.appendChild(saveBtn);
  btnGroup.appendChild(cancelBtn);
  headerRow.appendChild(btnGroup);
  const textarea = document.createElement("textarea");
  textarea.className = "source-editor";
  textarea.value = sourceText;
  textarea.spellcheck = false;
  container.appendChild(textarea);
  textarea.focus();
  const status = document.createElement("p");
  status.className = "source-status";
  container.appendChild(status);
  cancelBtn.addEventListener("click", () => {
    showViewer(container, headerRow, sourceText, docUri, fetcher);
  });
  saveBtn.addEventListener("click", async () => {
    saveBtn.disabled = true;
    cancelBtn.disabled = true;
    status.textContent = "Saving...";
    status.className = "source-status";
    try {
      const response = await fetcher.webOperation("PUT", docUri.value, {
        data: textarea.value,
        contentType: "text/turtle"
      });
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      status.textContent = "Saved!";
      status.className = "source-status source-status-ok";
      setTimeout(() => {
        showViewer(container, headerRow, textarea.value, docUri, fetcher);
      }, 800);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      status.textContent = `Save failed: ${msg}`;
      status.className = "source-status source-status-error";
      saveBtn.disabled = false;
      cancelBtn.disabled = false;
    }
  });
}
function showViewer(container, headerRow, sourceText, docUri, fetcher) {
  while (headerRow.nextSibling) {
    headerRow.nextSibling.remove();
  }
  const btnGroup = headerRow.querySelector(".source-btn-group");
  if (btnGroup) btnGroup.remove();
  const editBtn = document.createElement("button");
  editBtn.className = "source-edit-btn";
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => {
    showEditor(container, headerRow, sourceText, docUri, fetcher);
  });
  headerRow.appendChild(editBtn);
  if (!sourceText) {
    const empty = document.createElement("p");
    empty.textContent = "No triples found in this document.";
    container.appendChild(empty);
  } else {
    const pre = document.createElement("pre");
    pre.className = "source-view";
    pre.textContent = sourceText;
    container.appendChild(pre);
  }
}
export {
  sourcePane
};

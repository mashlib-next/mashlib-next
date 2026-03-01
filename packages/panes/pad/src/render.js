import { PAD, SIOC, DC, DCT, FOAF, SCHEMA } from "@mashlib-next/utils";
import { labelFromUri } from "@mashlib-next/utils";
function getPadTitle(subject, store) {
  return store.any(subject, DCT("title"), null, null)?.value ?? store.any(subject, DC("title"), null, null)?.value ?? store.any(subject, SCHEMA("name"), null, null)?.value ?? "Notepad";
}
function getAuthorName(authorNode, store) {
  return store.any(authorNode, FOAF("name"), null, null)?.value ?? store.any(authorNode, SCHEMA("name"), null, null)?.value ?? labelFromUri(authorNode.value);
}
function getChunks(subject, store) {
  const chunks = [];
  const visited = /* @__PURE__ */ new Set();
  let current = store.any(subject, PAD("next"), null, null);
  while (current && current.termType === "NamedNode" && !visited.has(current.value)) {
    if (current.value === subject.value) break;
    visited.add(current.value);
    const node = current;
    const content = store.any(node, SIOC("content"), null, null)?.value ?? store.any(node, DC("description"), null, null)?.value ?? "";
    const authorNode = store.any(node, DC("author"), null, null) ?? store.any(node, DCT("creator"), null, null) ?? store.any(node, FOAF("maker"), null, null);
    let author = null;
    let authorUri = null;
    if (authorNode) {
      authorUri = authorNode.value;
      if (authorNode.termType === "NamedNode") {
        author = getAuthorName(authorNode, store);
      } else {
        author = authorNode.value;
      }
    }
    chunks.push({ uri: node.value, content, author, authorUri });
    current = store.any(node, PAD("next"), null, null);
  }
  return chunks;
}
function getCreatedDate(subject, store) {
  const dateStr = store.any(subject, DCT("created"), null, null)?.value ?? store.any(subject, DC("date"), null, null)?.value;
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString();
}
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function renderPad(subject, store, container) {
  container.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "pad-view";
  const title = getPadTitle(subject, store);
  const header = document.createElement("h2");
  header.className = "pad-title";
  header.textContent = title;
  wrapper.appendChild(header);
  const meta = document.createElement("div");
  meta.className = "pad-meta";
  const createdDate = getCreatedDate(subject, store);
  if (createdDate) {
    const dateEl = document.createElement("span");
    dateEl.className = "pad-date";
    dateEl.textContent = `Created: ${createdDate}`;
    meta.appendChild(dateEl);
  }
  const padAuthor = store.any(subject, DC("author"), null, null) ?? store.any(subject, DCT("creator"), null, null);
  if (padAuthor && padAuthor.termType === "NamedNode") {
    const authorName = getAuthorName(padAuthor, store);
    const authorEl = document.createElement("span");
    authorEl.className = "pad-author";
    authorEl.textContent = `Author: ${authorName}`;
    meta.appendChild(authorEl);
  }
  if (meta.children.length > 0) {
    wrapper.appendChild(meta);
  }
  const chunks = getChunks(subject, store);
  if (chunks.length === 0) {
    const empty = document.createElement("p");
    empty.className = "pad-empty";
    empty.textContent = "This notepad is empty.";
    wrapper.appendChild(empty);
    container.appendChild(wrapper);
    return;
  }
  const contentArea = document.createElement("div");
  contentArea.className = "pad-content";
  const uniqueAuthors = new Set(chunks.filter((c) => c.author).map((c) => c.authorUri));
  const isMultiAuthor = uniqueAuthors.size > 1;
  for (const chunk of chunks) {
    const chunkEl = document.createElement("div");
    chunkEl.className = "pad-chunk";
    if (isMultiAuthor && chunk.author) {
      const authorTag = document.createElement("span");
      authorTag.className = "pad-chunk-author";
      authorTag.textContent = chunk.author;
      if (chunk.authorUri) authorTag.title = chunk.authorUri;
      chunkEl.appendChild(authorTag);
    }
    const textEl = document.createElement("div");
    textEl.className = "pad-chunk-text";
    const lines = chunk.content.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (i > 0) textEl.appendChild(document.createElement("br"));
      textEl.appendChild(document.createTextNode(lines[i]));
    }
    chunkEl.appendChild(textEl);
    contentArea.appendChild(chunkEl);
  }
  wrapper.appendChild(contentArea);
  const countEl = document.createElement("p");
  countEl.className = "pad-count";
  countEl.textContent = `${chunks.length} chunk${chunks.length !== 1 ? "s" : ""}`;
  wrapper.appendChild(countEl);
  container.appendChild(wrapper);
}
export {
  renderPad
};

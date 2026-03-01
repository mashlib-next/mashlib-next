import { SOLID, DCT } from "@mashlib-next/utils";
import { getLanguage } from "./code-pane.js";
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function renderCode(subject, store, container) {
  container.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "code-view";
  const header = document.createElement("div");
  header.className = "code-header";
  const path = subject.value.split("?")[0].split("#")[0];
  const filename = path.split("/").pop() ?? subject.value;
  const language = getLanguage(subject.value);
  const filenameEl = document.createElement("span");
  filenameEl.className = "code-filename";
  filenameEl.textContent = filename;
  header.appendChild(filenameEl);
  if (language) {
    const langEl = document.createElement("span");
    langEl.className = "code-language";
    langEl.textContent = language;
    header.appendChild(langEl);
  }
  wrapper.appendChild(header);
  const content = store.any(subject, SOLID("content"), null, null)?.value ?? store.any(subject, DCT("content"), null, null)?.value;
  if (content) {
    renderCodeBlock(content, wrapper);
    container.appendChild(wrapper);
    return;
  }
  const loading = document.createElement("p");
  loading.className = "code-loading";
  loading.textContent = "Loading...";
  wrapper.appendChild(loading);
  container.appendChild(wrapper);
  fetch(subject.value).then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.text();
  }).then((text) => {
    loading.remove();
    renderCodeBlock(text, wrapper);
  }).catch((err) => {
    loading.textContent = `Failed to load: ${err.message}`;
    loading.className = "code-error";
  });
}
function renderCodeBlock(code, wrapper) {
  const lines = code.split("\n");
  if (lines.length > 0 && lines[lines.length - 1] === "") {
    lines.pop();
  }
  const pre = document.createElement("pre");
  pre.className = "code-block";
  const table = document.createElement("table");
  table.className = "code-table";
  const gutterWidth = String(lines.length).length;
  for (let i = 0; i < lines.length; i++) {
    const tr = document.createElement("tr");
    tr.className = "code-line";
    const lineNum = document.createElement("td");
    lineNum.className = "code-line-number";
    lineNum.textContent = String(i + 1);
    lineNum.setAttribute("data-line", String(i + 1));
    tr.appendChild(lineNum);
    const lineContent = document.createElement("td");
    lineContent.className = "code-line-content";
    lineContent.innerHTML = escapeHtml(lines[i]) || "\n";
    tr.appendChild(lineContent);
    table.appendChild(tr);
  }
  pre.appendChild(table);
  const footer = document.createElement("div");
  footer.className = "code-footer";
  footer.textContent = `${lines.length} line${lines.length !== 1 ? "s" : ""}`;
  wrapper.appendChild(pre);
  wrapper.appendChild(footer);
}
export {
  renderCode
};

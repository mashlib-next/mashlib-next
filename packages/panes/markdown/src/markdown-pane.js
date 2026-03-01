const MARKDOWN_EXTENSIONS = [".md", ".markdown", ".mdown", ".mkd", ".mkdn"];
function isMarkdownUri(uri) {
  try {
    const path = new URL(uri).pathname.toLowerCase();
    return MARKDOWN_EXTENSIONS.some((ext) => path.endsWith(ext));
  } catch {
    return false;
  }
}
function getSourceText(subject, store) {
  const stmts = store.match(null, null, null, subject.doc());
  if (stmts.length === 0) return void 0;
  for (const st of stmts) {
    if (st.predicate.value === "http://www.w3.org/ns/solid/terms#content" || st.predicate.value === "http://purl.org/dc/terms/content") {
      return st.object.value;
    }
  }
  return void 0;
}
const markdownPane = {
  label: "Markdown",
  icon: "\u{1F4DD}",
  canHandle(subject, _store) {
    return isMarkdownUri(subject.value);
  },
  render(subject, store, container) {
    container.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.className = "markdown-view";
    container.appendChild(wrapper);
    const sourceText = getSourceText(subject, store);
    const textPromise = sourceText ? Promise.resolve(sourceText) : fetch(subject.value).then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.text();
    });
    if (!sourceText) {
      const fallback = document.createElement("p");
      fallback.className = "loading";
      fallback.textContent = "Loading markdown...";
      wrapper.appendChild(fallback);
    }
    Promise.all([textPromise, import("marked")]).then(([text, { marked }]) => {
      wrapper.innerHTML = marked.parse(text);
    }).catch(() => {
      wrapper.innerHTML = "";
      const err = document.createElement("p");
      err.className = "error";
      err.textContent = "Failed to load markdown content.";
      wrapper.appendChild(err);
    });
  }
};
export {
  markdownPane
};

const HTML_EXTENSIONS = [".html", ".htm", ".xhtml"];
function isHtmlUri(uri) {
  try {
    const path = new URL(uri).pathname.toLowerCase();
    return HTML_EXTENSIONS.some((ext) => path.endsWith(ext));
  } catch {
    return false;
  }
}
const htmlPane = {
  label: "HTML",
  icon: "\u{1F310}",
  canHandle(subject, _store) {
    return isHtmlUri(subject.value);
  },
  render(subject, _store, container) {
    container.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.className = "html-view";
    const iframe = document.createElement("iframe");
    iframe.className = "html-frame";
    iframe.src = subject.value;
    iframe.setAttribute("sandbox", "allow-same-origin");
    iframe.title = "HTML content";
    iframe.addEventListener("load", () => {
      try {
        const doc = iframe.contentDocument;
        if (doc) {
          const height = doc.documentElement.scrollHeight;
          iframe.style.height = `${Math.max(height, 200)}px`;
        }
      } catch {
        iframe.style.height = "80vh";
      }
    });
    wrapper.appendChild(iframe);
    container.appendChild(wrapper);
  }
};
export {
  htmlPane
};

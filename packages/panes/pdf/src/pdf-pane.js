import { labelFromUri } from "@mashlib-next/utils";
function isPdfUri(uri) {
  try {
    const path = new URL(uri).pathname.toLowerCase();
    return path.endsWith(".pdf");
  } catch {
    return false;
  }
}
const pdfPane = {
  label: "PDF",
  icon: "\u{1F4C4}",
  canHandle(subject, _store) {
    return isPdfUri(subject.value);
  },
  render(subject, _store, container) {
    container.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.className = "pdf-view";
    const titleEl = document.createElement("h3");
    titleEl.className = "pdf-title";
    titleEl.textContent = labelFromUri(subject.value);
    wrapper.appendChild(titleEl);
    const obj = document.createElement("object");
    obj.className = "pdf-embed";
    obj.data = subject.value;
    obj.type = "application/pdf";
    const fallback = document.createElement("div");
    fallback.className = "pdf-fallback";
    const msg = document.createElement("p");
    msg.textContent = "Unable to display PDF inline.";
    fallback.appendChild(msg);
    const link = document.createElement("a");
    link.href = subject.value;
    link.textContent = "Download PDF";
    link.target = "_blank";
    link.rel = "noopener";
    fallback.appendChild(link);
    obj.appendChild(fallback);
    wrapper.appendChild(obj);
    container.appendChild(wrapper);
  }
};
export {
  pdfPane
};

import { RDF, FOAF, SCHEMA, DCT } from "@mashlib-next/utils";
import { labelFromUri } from "@mashlib-next/utils";
const IMAGE_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".webp",
  ".bmp",
  ".ico",
  ".avif"
];
function hasImageExtension(uri) {
  const path = new URL(uri).pathname.toLowerCase();
  return IMAGE_EXTENSIONS.some((ext) => path.endsWith(ext));
}
function hasImageType(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  const typeUris = types.map((t) => t.value);
  if (typeUris.includes(FOAF("Image").value)) return true;
  if (typeUris.includes(SCHEMA("ImageObject").value)) return true;
  return false;
}
const imagePane = {
  label: "Image",
  icon: "\u{1F5BC}",
  canHandle(subject, store) {
    return hasImageExtension(subject.value) || hasImageType(subject, store);
  },
  render(subject, store, container) {
    container.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.className = "image-view";
    const img = document.createElement("img");
    img.className = "image-main";
    img.src = subject.value;
    img.alt = labelFromUri(subject.value);
    img.addEventListener("error", () => {
      img.style.display = "none";
      const errMsg = document.createElement("p");
      errMsg.className = "error";
      errMsg.textContent = "Failed to load image.";
      wrapper.appendChild(errMsg);
    });
    wrapper.appendChild(img);
    const title = store.any(subject, DCT("title"), null, null)?.value ?? store.any(subject, SCHEMA("name"), null, null)?.value;
    const description = store.any(subject, DCT("description"), null, null)?.value ?? store.any(subject, SCHEMA("description"), null, null)?.value;
    if (title || description) {
      const caption = document.createElement("div");
      caption.className = "image-caption";
      if (title) {
        const titleEl = document.createElement("h3");
        titleEl.textContent = title;
        caption.appendChild(titleEl);
      }
      if (description) {
        const descEl = document.createElement("p");
        descEl.textContent = description;
        caption.appendChild(descEl);
      }
      wrapper.appendChild(caption);
    }
    container.appendChild(wrapper);
  }
};
export {
  imagePane
};

import { RDF, SCHEMA, FOAF } from "@mashlib-next/utils";
import { renderGallery } from "./render.js";
const GALLERY_TYPES = [
  SCHEMA("ImageGallery").value,
  SCHEMA("MediaGallery").value,
  SCHEMA("CollectionPage").value
];
const IMAGE_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".webp",
  ".bmp",
  ".ico",
  ".avif",
  ".tiff"
];
function collectImages(subject, store) {
  const images = /* @__PURE__ */ new Set();
  for (const node of store.each(subject, SCHEMA("image"), null, null)) {
    images.add(node.value);
  }
  for (const node of store.each(subject, FOAF("img"), null, null)) {
    images.add(node.value);
  }
  for (const node of store.each(subject, SCHEMA("hasPart"), null, null)) {
    if (isImageUri(node.value)) {
      images.add(node.value);
    }
    const types = store.each(node, RDF("type"), null, null).map((t) => t.value);
    if (types.includes(SCHEMA("ImageObject").value) || types.includes(FOAF("Image").value)) {
      const url = store.any(node, SCHEMA("contentUrl"), null, null)?.value ?? store.any(node, SCHEMA("url"), null, null)?.value ?? node.value;
      images.add(url);
    }
  }
  for (const node of store.each(subject, SCHEMA("associatedMedia"), null, null)) {
    const types = store.each(node, RDF("type"), null, null).map((t) => t.value);
    if (types.includes(SCHEMA("ImageObject").value)) {
      const url = store.any(node, SCHEMA("contentUrl"), null, null)?.value ?? node.value;
      images.add(url);
    }
  }
  return Array.from(images);
}
function isImageUri(uri) {
  const path = uri.split("?")[0].split("#")[0].toLowerCase();
  return IMAGE_EXTENSIONS.some((ext) => path.endsWith(ext));
}
function isGallery(subject, store) {
  const types = store.each(subject, RDF("type"), null, null).map((t) => t.value);
  for (const t of GALLERY_TYPES) {
    if (types.includes(t)) return true;
  }
  const imageCount = collectImages(subject, store).length;
  if (imageCount >= 2) return true;
  return false;
}
const galleryPane = {
  label: "Gallery",
  icon: "\u{1F5BC}",
  canHandle(subject, store) {
    return isGallery(subject, store);
  },
  render(subject, store, container) {
    renderGallery(subject, store, container);
  }
};
export {
  collectImages,
  galleryPane
};

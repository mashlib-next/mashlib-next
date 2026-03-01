import { SCHEMA, DCT } from "@mashlib-next/utils";
import { labelFromUri } from "@mashlib-next/utils";
import { collectImages } from "./gallery-pane.js";
function renderGallery(subject, store, container) {
  container.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "gallery-view";
  const title = store.any(subject, SCHEMA("name"), null, null)?.value ?? store.any(subject, DCT("title"), null, null)?.value ?? labelFromUri(subject.value);
  const titleEl = document.createElement("h2");
  titleEl.className = "gallery-title";
  titleEl.textContent = title;
  wrapper.appendChild(titleEl);
  const description = store.any(subject, SCHEMA("description"), null, null)?.value ?? store.any(subject, DCT("description"), null, null)?.value;
  if (description) {
    const descEl = document.createElement("p");
    descEl.className = "gallery-description";
    descEl.textContent = description;
    wrapper.appendChild(descEl);
  }
  const images = collectImages(subject, store);
  const countEl = document.createElement("p");
  countEl.className = "gallery-count";
  countEl.textContent = `${images.length} image${images.length !== 1 ? "s" : ""}`;
  wrapper.appendChild(countEl);
  if (images.length === 0) {
    const empty = document.createElement("p");
    empty.className = "gallery-empty";
    empty.textContent = "No images found.";
    wrapper.appendChild(empty);
    container.appendChild(wrapper);
    return;
  }
  const grid = document.createElement("div");
  grid.className = "gallery-grid";
  for (const imageUrl of images) {
    const cell = document.createElement("div");
    cell.className = "gallery-cell";
    const img = document.createElement("img");
    img.className = "gallery-thumb";
    img.src = imageUrl;
    img.alt = filenameFromUrl(imageUrl);
    img.loading = "lazy";
    img.addEventListener("click", () => {
      showLightbox(imageUrl, images, wrapper);
    });
    cell.appendChild(img);
    grid.appendChild(cell);
  }
  wrapper.appendChild(grid);
  container.appendChild(wrapper);
}
function filenameFromUrl(url) {
  const path = url.split("?")[0].split("#")[0];
  return path.split("/").pop() ?? "image";
}
function showLightbox(currentUrl, allImages, wrapper) {
  const existing = wrapper.querySelector(".gallery-lightbox");
  if (existing) existing.remove();
  let currentIndex = allImages.indexOf(currentUrl);
  if (currentIndex === -1) currentIndex = 0;
  const overlay = document.createElement("div");
  overlay.className = "gallery-lightbox";
  const img = document.createElement("img");
  img.className = "gallery-lightbox-img";
  img.src = allImages[currentIndex];
  img.alt = "Full size image";
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
  if (allImages.length > 1) {
    const prev = document.createElement("button");
    prev.className = "gallery-lightbox-prev";
    prev.textContent = "\u276E";
    prev.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
      img.src = allImages[currentIndex];
    });
    overlay.appendChild(prev);
    const next = document.createElement("button");
    next.className = "gallery-lightbox-next";
    next.textContent = "\u276F";
    next.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % allImages.length;
      img.src = allImages[currentIndex];
    });
    overlay.appendChild(next);
  }
  const close = document.createElement("button");
  close.className = "gallery-lightbox-close";
  close.textContent = "\xD7";
  close.addEventListener("click", () => overlay.remove());
  overlay.appendChild(img);
  overlay.appendChild(close);
  wrapper.appendChild(overlay);
}
export {
  renderGallery
};

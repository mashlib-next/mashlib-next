import { RDF, SCHEMA, DCT } from "@mashlib-next/utils";
const VIDEO_EXTENSIONS = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ogg": "video/ogg",
  ".ogv": "video/ogg",
  ".mov": "video/mp4",
  ".m4v": "video/mp4"
};
function getVideoType(uri) {
  try {
    const path = new URL(uri).pathname.toLowerCase();
    for (const [ext, mime] of Object.entries(VIDEO_EXTENSIONS)) {
      if (path.endsWith(ext)) return mime;
    }
  } catch {
  }
  return void 0;
}
function hasVideoType(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  const typeUris = types.map((t) => t.value);
  if (typeUris.includes(SCHEMA("VideoObject").value)) return true;
  return false;
}
const videoPane = {
  label: "Video",
  icon: "\u{1F3AC}",
  canHandle(subject, store) {
    return getVideoType(subject.value) !== void 0 || hasVideoType(subject, store);
  },
  render(subject, store, container) {
    container.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.className = "video-view";
    const video = document.createElement("video");
    video.className = "video-main";
    video.controls = true;
    video.preload = "metadata";
    const mimeType = getVideoType(subject.value);
    if (mimeType) {
      const source = document.createElement("source");
      source.src = subject.value;
      source.type = mimeType;
      video.appendChild(source);
    } else {
      video.src = subject.value;
    }
    const fallback = document.createElement("p");
    fallback.textContent = "Your browser does not support this video format.";
    video.appendChild(fallback);
    wrapper.appendChild(video);
    const title = store.any(subject, DCT("title"), null, null)?.value ?? store.any(subject, SCHEMA("name"), null, null)?.value;
    const description = store.any(subject, DCT("description"), null, null)?.value ?? store.any(subject, SCHEMA("description"), null, null)?.value;
    if (title || description) {
      const caption = document.createElement("div");
      caption.className = "video-caption";
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
  videoPane
};

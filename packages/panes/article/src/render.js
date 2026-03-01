import { SCHEMA, DCT, FOAF } from "@mashlib-next/utils";
import { labelFromUri } from "@mashlib-next/utils";
function formatDate(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString(void 0, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function getAuthorName(authorNode, store) {
  return store.any(authorNode, SCHEMA("name"), null, null)?.value ?? store.any(authorNode, FOAF("name"), null, null)?.value ?? labelFromUri(authorNode.value);
}
function renderArticle(subject, store, container) {
  container.innerHTML = "";
  const wrapper = document.createElement("article");
  wrapper.className = "article-view";
  const title = store.any(subject, SCHEMA("headline"), null, null)?.value ?? store.any(subject, SCHEMA("name"), null, null)?.value ?? store.any(subject, DCT("title"), null, null)?.value ?? labelFromUri(subject.value);
  const titleEl = document.createElement("h1");
  titleEl.className = "article-title";
  titleEl.textContent = title;
  wrapper.appendChild(titleEl);
  const authorNode = store.any(subject, SCHEMA("author"), null, null);
  const datePublished = store.any(subject, SCHEMA("datePublished"), null, null)?.value;
  const dateCreated = store.any(subject, DCT("created"), null, null)?.value;
  const pubDate = datePublished ?? dateCreated;
  if (authorNode || pubDate) {
    const byline = document.createElement("div");
    byline.className = "article-byline";
    if (authorNode) {
      const authorEl = document.createElement("span");
      authorEl.className = "article-author";
      authorEl.textContent = getAuthorName(authorNode, store);
      byline.appendChild(authorEl);
    }
    if (pubDate) {
      const dateEl = document.createElement("time");
      dateEl.className = "article-date";
      dateEl.dateTime = pubDate;
      dateEl.textContent = formatDate(pubDate);
      byline.appendChild(dateEl);
    }
    wrapper.appendChild(byline);
  }
  const imageUrl = store.any(subject, SCHEMA("image"), null, null)?.value ?? store.any(subject, SCHEMA("thumbnailUrl"), null, null)?.value;
  if (imageUrl) {
    const imgEl = document.createElement("img");
    imgEl.className = "article-image";
    imgEl.src = imageUrl;
    imgEl.alt = title;
    wrapper.appendChild(imgEl);
  }
  const description = store.any(subject, SCHEMA("description"), null, null)?.value ?? store.any(subject, SCHEMA("abstract"), null, null)?.value ?? store.any(subject, DCT("abstract"), null, null)?.value;
  if (description) {
    const descEl = document.createElement("p");
    descEl.className = "article-description";
    descEl.textContent = description;
    wrapper.appendChild(descEl);
  }
  const body = store.any(subject, SCHEMA("articleBody"), null, null)?.value;
  if (body) {
    const bodyEl = document.createElement("div");
    bodyEl.className = "article-body";
    const paragraphs = body.split(/\n\n+/);
    for (const para of paragraphs) {
      const trimmed = para.trim();
      if (!trimmed) continue;
      const p = document.createElement("p");
      p.textContent = trimmed;
      bodyEl.appendChild(p);
    }
    wrapper.appendChild(bodyEl);
  }
  const publisherNode = store.any(subject, SCHEMA("publisher"), null, null);
  if (publisherNode) {
    const pubName = store.any(publisherNode, SCHEMA("name"), null, null)?.value ?? labelFromUri(publisherNode.value);
    const pubEl = document.createElement("p");
    pubEl.className = "article-publisher";
    pubEl.textContent = `Published by ${pubName}`;
    wrapper.appendChild(pubEl);
  }
  const keywords = store.each(subject, SCHEMA("keywords"), null, null);
  if (keywords.length > 0) {
    const tagsEl = document.createElement("div");
    tagsEl.className = "article-tags";
    for (const kw of keywords) {
      const tag = document.createElement("span");
      tag.className = "article-tag";
      tag.textContent = kw.value;
      tagsEl.appendChild(tag);
    }
    wrapper.appendChild(tagsEl);
  }
  container.appendChild(wrapper);
}
export {
  renderArticle
};

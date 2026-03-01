import { BOOK, DCT, SCHEMA } from "@mashlib-next/utils";
import { labelFromUri } from "@mashlib-next/utils";
function getCollectionTitle(subject, store) {
  return store.any(subject, DCT("title"), null, null)?.value ?? store.any(subject, SCHEMA("name"), null, null)?.value ?? "Bookmarks";
}
function getBookmarks(subject, store) {
  const members = store.each(subject, BOOK("hasMember"), null, null);
  const bookmarks = [];
  for (const member of members) {
    const node = member;
    const title = store.any(node, DCT("title"), null, null)?.value ?? store.any(node, SCHEMA("name"), null, null)?.value ?? store.any(node, BOOK("title"), null, null)?.value ?? labelFromUri(node.value);
    const recalls = store.any(node, BOOK("recalls"), null, null)?.value ?? null;
    const createdStr = store.any(node, DCT("created"), null, null)?.value;
    const created = createdStr ? new Date(createdStr) : null;
    const description = store.any(node, DCT("description"), null, null)?.value ?? store.any(node, SCHEMA("description"), null, null)?.value ?? null;
    bookmarks.push({ uri: node.value, title, recalls, created, description });
  }
  bookmarks.sort((a, b) => {
    if (a.created && b.created) return b.created.getTime() - a.created.getTime();
    if (a.created) return -1;
    if (b.created) return 1;
    return a.title.localeCompare(b.title);
  });
  return bookmarks;
}
function formatDate(date) {
  return date.toLocaleDateString(void 0, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function renderBookmarks(subject, store, container) {
  container.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "bookmarks-view";
  const title = getCollectionTitle(subject, store);
  const header = document.createElement("h2");
  header.className = "bookmarks-title";
  header.textContent = title;
  wrapper.appendChild(header);
  const bookmarks = getBookmarks(subject, store);
  const countEl = document.createElement("p");
  countEl.className = "bookmarks-count";
  countEl.textContent = `${bookmarks.length} bookmark${bookmarks.length !== 1 ? "s" : ""}`;
  wrapper.appendChild(countEl);
  if (bookmarks.length === 0) {
    const empty = document.createElement("p");
    empty.className = "bookmarks-empty";
    empty.textContent = "No bookmarks saved.";
    wrapper.appendChild(empty);
    container.appendChild(wrapper);
    return;
  }
  const list = document.createElement("ul");
  list.className = "bookmarks-list";
  for (const bm of bookmarks) {
    const li = document.createElement("li");
    li.className = "bookmark-item";
    const titleEl = document.createElement("a");
    titleEl.className = "bookmark-title";
    titleEl.textContent = bm.title;
    if (bm.recalls) {
      titleEl.href = bm.recalls;
      titleEl.target = "_blank";
      titleEl.rel = "noopener";
    } else {
      titleEl.href = bm.uri;
      titleEl.target = "_blank";
      titleEl.rel = "noopener";
    }
    li.appendChild(titleEl);
    if (bm.recalls) {
      const urlEl = document.createElement("span");
      urlEl.className = "bookmark-url";
      urlEl.textContent = bm.recalls;
      li.appendChild(urlEl);
    }
    if (bm.created || bm.description) {
      const meta = document.createElement("div");
      meta.className = "bookmark-meta";
      if (bm.created) {
        const dateEl = document.createElement("span");
        dateEl.className = "bookmark-date";
        dateEl.textContent = formatDate(bm.created);
        meta.appendChild(dateEl);
      }
      if (bm.description) {
        const descEl = document.createElement("span");
        descEl.className = "bookmark-desc";
        descEl.textContent = bm.description;
        meta.appendChild(descEl);
      }
      li.appendChild(meta);
    }
    list.appendChild(li);
  }
  wrapper.appendChild(list);
  container.appendChild(wrapper);
}
export {
  renderBookmarks
};

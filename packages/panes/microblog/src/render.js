import { SIOC, SIOCt, DCT, DC, FOAF, SCHEMA, RDF } from "@mashlib-next/utils";
import { labelFromUri } from "@mashlib-next/utils";
function getTitle(subject, store) {
  return store.any(subject, DCT("title"), null, null)?.value ?? store.any(subject, DC("title"), null, null)?.value ?? store.any(subject, SCHEMA("name"), null, null)?.value ?? store.any(subject, SIOC("name"), null, null)?.value ?? "Microblog";
}
function getCreatorName(creatorNode, store) {
  return store.any(creatorNode, FOAF("name"), null, null)?.value ?? store.any(creatorNode, SCHEMA("name"), null, null)?.value ?? labelFromUri(creatorNode.value);
}
function isSinglePost(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  return types.some((t) => t.value === SIOCt("MicroblogPost").value);
}
function extractPost(node, store) {
  const content = store.any(node, SIOC("content"), null, null)?.value ?? store.any(node, DCT("description"), null, null)?.value ?? store.any(node, DC("description"), null, null)?.value ?? "";
  const createdStr = store.any(node, DCT("created"), null, null)?.value ?? store.any(node, DC("date"), null, null)?.value;
  const created = createdStr ? new Date(createdStr) : null;
  const creatorNode = store.any(node, SIOC("has_creator"), null, null) ?? store.any(node, FOAF("maker"), null, null) ?? store.any(node, DCT("creator"), null, null);
  let creator = null;
  let creatorUri = null;
  if (creatorNode) {
    creatorUri = creatorNode.value;
    if (creatorNode.termType === "NamedNode") {
      creator = getCreatorName(creatorNode, store);
    } else {
      creator = creatorNode.value;
    }
  }
  return { uri: node.value, content, created, creator, creatorUri };
}
function getPosts(subject, store) {
  const postNodes = store.each(subject, SIOC("container_of"), null, null);
  const posts = [];
  for (const node of postNodes) {
    if (node.termType === "NamedNode") {
      posts.push(extractPost(node, store));
    }
  }
  posts.sort((a, b) => {
    if (!a.created && !b.created) return 0;
    if (!a.created) return 1;
    if (!b.created) return -1;
    return b.created.getTime() - a.created.getTime();
  });
  return posts;
}
function formatTimestamp(date) {
  const now = /* @__PURE__ */ new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 6e4);
  const diffHr = Math.floor(diffMs / 36e5);
  const diffDays = Math.floor(diffMs / 864e5);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString(void 0, {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : void 0
  });
}
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function renderContent(content, el) {
  const urlPattern = /(https?:\/\/[^\s<>"]+)/g;
  const parts = content.split(urlPattern);
  for (const part of parts) {
    if (urlPattern.test(part)) {
      urlPattern.lastIndex = 0;
      const link = document.createElement("a");
      link.href = part;
      link.textContent = part;
      link.target = "_blank";
      link.rel = "noopener";
      el.appendChild(link);
    } else if (part) {
      el.appendChild(document.createTextNode(part));
    }
  }
}
function renderPost(post) {
  const postEl = document.createElement("div");
  postEl.className = "microblog-post";
  const headerEl = document.createElement("div");
  headerEl.className = "microblog-post-header";
  if (post.creator) {
    const authorEl = document.createElement("span");
    authorEl.className = "microblog-post-author";
    authorEl.textContent = post.creator;
    if (post.creatorUri) authorEl.title = post.creatorUri;
    headerEl.appendChild(authorEl);
  }
  if (post.created) {
    const timeEl = document.createElement("time");
    timeEl.className = "microblog-post-time";
    timeEl.dateTime = post.created.toISOString();
    timeEl.textContent = formatTimestamp(post.created);
    headerEl.appendChild(timeEl);
  }
  postEl.appendChild(headerEl);
  const contentEl = document.createElement("div");
  contentEl.className = "microblog-post-content";
  renderContent(post.content, contentEl);
  postEl.appendChild(contentEl);
  const charCount = post.content.length;
  if (charCount > 0) {
    const countEl = document.createElement("span");
    countEl.className = "microblog-char-count";
    countEl.textContent = `${charCount}`;
    postEl.appendChild(countEl);
  }
  return postEl;
}
function renderMicroblog(subject, store, container) {
  container.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "microblog-view";
  if (isSinglePost(subject, store)) {
    const post = extractPost(subject, store);
    const header2 = document.createElement("h2");
    header2.className = "microblog-title";
    header2.textContent = "Microblog Post";
    wrapper.appendChild(header2);
    wrapper.appendChild(renderPost(post));
    container.appendChild(wrapper);
    return;
  }
  const title = getTitle(subject, store);
  const header = document.createElement("h2");
  header.className = "microblog-title";
  header.textContent = title;
  wrapper.appendChild(header);
  const description = store.any(subject, DCT("description"), null, null)?.value ?? store.any(subject, DC("description"), null, null)?.value;
  if (description) {
    const descEl = document.createElement("p");
    descEl.className = "microblog-description";
    descEl.textContent = description;
    wrapper.appendChild(descEl);
  }
  const posts = getPosts(subject, store);
  const countEl = document.createElement("p");
  countEl.className = "microblog-count";
  countEl.textContent = `${posts.length} post${posts.length !== 1 ? "s" : ""}`;
  wrapper.appendChild(countEl);
  if (posts.length === 0) {
    const empty = document.createElement("p");
    empty.className = "microblog-empty";
    empty.textContent = "No posts yet.";
    wrapper.appendChild(empty);
    container.appendChild(wrapper);
    return;
  }
  const feed = document.createElement("div");
  feed.className = "microblog-feed";
  for (const post of posts) {
    feed.appendChild(renderPost(post));
  }
  wrapper.appendChild(feed);
  container.appendChild(wrapper);
}
export {
  renderMicroblog
};

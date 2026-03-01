import { WF, SIOC, DCT, FOAF, SCHEMA, DC } from "@mashlib-next/utils";
import { labelFromUri, createNavLink } from "@mashlib-next/utils";

const IMAGE_EXTENSIONS = /\.(png|jpe?g|gif|webp|svg|bmp|ico)(\?.*)?$/i;

function getChatTitle(subject, store) {
  return store.any(subject, DCT("title"), null, null)?.value
    ?? store.any(subject, DC("title"), null, null)?.value
    ?? store.any(subject, SCHEMA("name"), null, null)?.value
    ?? store.any(subject, FOAF("name"), null, null)?.value
    ?? "Chat";
}

function getMakerName(makerNode, store) {
  return store.any(makerNode, FOAF("name"), null, null)?.value
    ?? store.any(makerNode, SCHEMA("name"), null, null)?.value
    ?? labelFromUri(makerNode.value);
}

function getMessages(subject, store) {
  const messageNodes = store.each(subject, WF("message"), null, null);
  const messages = [];
  for (const node of messageNodes) {
    const msg = node;
    const content = store.any(msg, SIOC("content"), null, null)?.value
      ?? store.any(msg, DCT("content"), null, null)?.value
      ?? store.any(msg, DC("description"), null, null)?.value
      ?? "";
    const createdStr = store.any(msg, DCT("created"), null, null)?.value
      ?? store.any(msg, DC("date"), null, null)?.value;
    const created = createdStr ? new Date(createdStr) : null;
    const makerNode = store.any(msg, FOAF("maker"), null, null)
      ?? store.any(msg, DC("creator"), null, null);
    let maker = null;
    let makerUri = null;
    if (makerNode) {
      makerUri = makerNode.value;
      if (makerNode.termType === "NamedNode") {
        maker = getMakerName(makerNode, store);
      } else {
        maker = makerNode.value;
      }
    }
    messages.push({ uri: msg.value, content, created, maker, makerUri });
  }
  messages.sort((a, b) => {
    if (!a.created && !b.created) return 0;
    if (!a.created) return -1;
    if (!b.created) return 1;
    return a.created.getTime() - b.created.getTime();
  });
  return messages;
}

function formatTime(date) {
  return date.toLocaleTimeString(void 0, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateHeader(date) {
  return date.toLocaleDateString(void 0, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

function renderContent(content, contentEl) {
  const urlPattern = /(https?:\/\/[^\s<>"]+)/g;
  const parts = content.split(urlPattern);
  for (const part of parts) {
    if (urlPattern.test(part)) {
      urlPattern.lastIndex = 0;
      if (IMAGE_EXTENSIONS.test(part)) {
        const img = document.createElement("img");
        img.className = "chat-inline-image";
        img.src = part;
        img.alt = "Shared image";
        img.loading = "lazy";
        contentEl.appendChild(img);
      } else {
        const link = document.createElement("a");
        link.href = part;
        link.textContent = part;
        link.target = "_blank";
        link.rel = "noopener";
        contentEl.appendChild(link);
      }
    } else if (part) {
      contentEl.appendChild(document.createTextNode(part));
    }
  }
}

function getInitial(name) {
  return name ? name.charAt(0).toUpperCase() : "?";
}

function renderChat(subject, store, container) {
  container.innerHTML = "";

  const title = getChatTitle(subject, store);

  // Wrapper
  const wrapper = document.createElement("div");
  wrapper.className = "chat-view";
  wrapper.setAttribute("role", "region");
  wrapper.setAttribute("aria-label", title);

  // Header
  const headerEl = document.createElement("header");
  headerEl.className = "chat-header";

  const titleEl = document.createElement("h2");
  titleEl.className = "chat-title";
  titleEl.textContent = title;
  headerEl.appendChild(titleEl);

  // Creator
  const author = store.any(subject, DC("author"), null, null)
    ?? store.any(subject, DCT("creator"), null, null);
  if (author && author.termType === "NamedNode") {
    const authorName = getMakerName(author, store);
    const creatorEl = document.createElement("p");
    creatorEl.className = "chat-creator";
    creatorEl.textContent = `Created by ${authorName}`;
    headerEl.appendChild(creatorEl);
  }

  const messages = getMessages(subject, store);

  const countEl = document.createElement("p");
  countEl.className = "chat-count";
  countEl.textContent = `${messages.length} message${messages.length !== 1 ? "s" : ""}`;
  headerEl.appendChild(countEl);

  wrapper.appendChild(headerEl);

  if (messages.length === 0) {
    const empty = document.createElement("p");
    empty.className = "chat-empty";
    empty.textContent = "No messages yet.";
    wrapper.appendChild(empty);
    container.appendChild(wrapper);
    return;
  }

  // Message list
  const messageList = document.createElement("ul");
  messageList.className = "chat-messages";
  messageList.setAttribute("role", "log");
  messageList.setAttribute("aria-label", "Message history");
  messageList.setAttribute("aria-live", "polite");

  let currentDateKey = null;
  for (const msg of messages) {
    // Date separator
    if (msg.created) {
      const dk = dateKey(msg.created);
      if (dk !== currentDateKey) {
        currentDateKey = dk;
        const dateLi = document.createElement("li");
        dateLi.className = "chat-date-header";
        dateLi.setAttribute("role", "separator");
        const dateTime = document.createElement("time");
        dateTime.dateTime = dk;
        dateTime.textContent = formatDateHeader(msg.created);
        dateLi.appendChild(dateTime);
        messageList.appendChild(dateLi);
      }
    }

    const li = document.createElement("li");
    li.className = "chat-message";

    const article = document.createElement("article");
    article.setAttribute("aria-label", `Message from ${msg.maker || "Unknown"}`);

    // Avatar
    const avatar = document.createElement("div");
    avatar.className = "chat-avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = getInitial(msg.maker);
    article.appendChild(avatar);

    // Content column
    const contentCol = document.createElement("div");
    contentCol.className = "chat-message-body";

    // Header row (author + time)
    const headerRow = document.createElement("div");
    headerRow.className = "chat-message-header";

    if (msg.maker) {
      if (msg.makerUri) {
        const authorEl = createNavLink(msg.makerUri, msg.maker);
        authorEl.className = "chat-author";
        authorEl.title = msg.makerUri;
        headerRow.appendChild(authorEl);
      } else {
        const authorEl = document.createElement("span");
        authorEl.className = "chat-author";
        authorEl.textContent = msg.maker;
        headerRow.appendChild(authorEl);
      }
    }

    if (msg.created) {
      const timeEl = document.createElement("time");
      timeEl.className = "chat-time";
      timeEl.dateTime = msg.created.toISOString();
      timeEl.textContent = formatTime(msg.created);
      headerRow.appendChild(timeEl);
    }

    contentCol.appendChild(headerRow);

    // Message bubble
    const contentEl = document.createElement("div");
    contentEl.className = "chat-content";
    renderContent(msg.content, contentEl);
    contentCol.appendChild(contentEl);

    article.appendChild(contentCol);
    li.appendChild(article);
    messageList.appendChild(li);
  }

  wrapper.appendChild(messageList);
  container.appendChild(wrapper);
}

export { renderChat };

import { WF, SIOC, DCT, FOAF, SCHEMA, DC } from "@mashlib-next/utils";
import { labelFromUri, createNavLink } from "@mashlib-next/utils";
const IMAGE_EXTENSIONS = /\.(png|jpe?g|gif|webp|svg|bmp|ico)(\?.*)?$/i;
function getChatTitle(subject, store) {
  return store.any(subject, DCT("title"), null, null)?.value ?? store.any(subject, DC("title"), null, null)?.value ?? store.any(subject, SCHEMA("name"), null, null)?.value ?? store.any(subject, FOAF("name"), null, null)?.value ?? "Chat";
}
function getMakerName(makerNode, store) {
  return store.any(makerNode, FOAF("name"), null, null)?.value ?? store.any(makerNode, SCHEMA("name"), null, null)?.value ?? labelFromUri(makerNode.value);
}
function getMessages(subject, store) {
  const messageNodes = store.each(subject, WF("message"), null, null);
  const messages = [];
  for (const node of messageNodes) {
    const msg = node;
    const content = store.any(msg, SIOC("content"), null, null)?.value ?? store.any(msg, DCT("content"), null, null)?.value ?? store.any(msg, DC("description"), null, null)?.value ?? "";
    const createdStr = store.any(msg, DCT("created"), null, null)?.value ?? store.any(msg, DC("date"), null, null)?.value;
    const created = createdStr ? new Date(createdStr) : null;
    const makerNode = store.any(msg, FOAF("maker"), null, null) ?? store.any(msg, DC("creator"), null, null);
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
    minute: "2-digit"
  });
}
function formatDateHeader(date) {
  return date.toLocaleDateString(void 0, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function dateKey(date) {
  return date.toISOString().slice(0, 10);
}
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
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
function renderChat(subject, store, container) {
  container.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "chat-view";
  const title = getChatTitle(subject, store);
  const header = document.createElement("h2");
  header.className = "chat-title";
  header.textContent = title;
  wrapper.appendChild(header);
  const author = store.any(subject, DC("author"), null, null) ?? store.any(subject, DCT("creator"), null, null);
  if (author && author.termType === "NamedNode") {
    const authorName = getMakerName(author, store);
    const creatorEl = document.createElement("p");
    creatorEl.className = "chat-creator";
    creatorEl.textContent = `Created by ${authorName}`;
    wrapper.appendChild(creatorEl);
  }
  const messages = getMessages(subject, store);
  const countEl = document.createElement("p");
  countEl.className = "chat-count";
  countEl.textContent = `${messages.length} message${messages.length !== 1 ? "s" : ""}`;
  wrapper.appendChild(countEl);
  if (messages.length === 0) {
    const empty = document.createElement("p");
    empty.className = "chat-empty";
    empty.textContent = "No messages yet.";
    wrapper.appendChild(empty);
    container.appendChild(wrapper);
    return;
  }
  const messageList = document.createElement("div");
  messageList.className = "chat-messages";
  let currentDateKey = null;
  for (const msg of messages) {
    if (msg.created) {
      const dk = dateKey(msg.created);
      if (dk !== currentDateKey) {
        currentDateKey = dk;
        const dateHeader = document.createElement("div");
        dateHeader.className = "chat-date-header";
        dateHeader.textContent = formatDateHeader(msg.created);
        messageList.appendChild(dateHeader);
      }
    }
    const msgEl = document.createElement("div");
    msgEl.className = "chat-message";
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
    msgEl.appendChild(headerRow);
    const contentEl = document.createElement("div");
    contentEl.className = "chat-content";
    renderContent(msg.content, contentEl);
    msgEl.appendChild(contentEl);
    messageList.appendChild(msgEl);
  }
  wrapper.appendChild(messageList);
  container.appendChild(wrapper);
}
export {
  renderChat
};

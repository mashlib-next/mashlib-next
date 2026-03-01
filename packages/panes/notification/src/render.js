import { RDF, LDP, AS, SCHEMA, DCT, RDFS, SOLID } from "@mashlib-next/utils";
import { labelFromUri } from "@mashlib-next/utils";
const VERB_MAP = {
  Create: "created",
  Update: "updated",
  Delete: "deleted",
  Add: "added",
  Remove: "removed",
  Like: "liked",
  Follow: "followed",
  Announce: "shared",
  Accept: "accepted",
  Reject: "rejected",
  Invite: "invited",
  Offer: "offered",
  Undo: "undid",
  Block: "blocked",
  Flag: "flagged",
  Move: "moved",
  Read: "read",
  View: "viewed",
  Listen: "listened to",
  Join: "joined",
  Leave: "left"
};
function collectNotifications(subject, store) {
  const items = [];
  const contained = [
    ...store.each(subject, LDP("contains"), null, null),
    ...store.each(subject, AS("items"), null, null),
    ...store.each(subject, SOLID("notification"), null, null)
  ];
  const seen = /* @__PURE__ */ new Set();
  for (const node of contained) {
    if (seen.has(node.value)) continue;
    seen.add(node.value);
    const n = node;
    const types = store.each(n, RDF("type"), null, null).map((t) => t.value);
    let activityType = "";
    for (const t of types) {
      const fragment = t.split("#").pop() ?? t.split("/").pop() ?? "";
      if (VERB_MAP[fragment]) {
        activityType = fragment;
        break;
      }
    }
    const actorNode = store.any(n, AS("actor"), null, null);
    let actorName = "";
    let actorUri = null;
    if (actorNode) {
      actorUri = actorNode.value;
      actorName = store.any(actorNode, SCHEMA("name"), null, null)?.value ?? store.any(actorNode, AS("name"), null, null)?.value ?? labelFromUri(actorNode.value);
    }
    const objectNode = store.any(n, AS("object"), null, null);
    let objectName = "";
    let objectUri = null;
    if (objectNode) {
      objectUri = objectNode.value;
      objectName = store.any(objectNode, SCHEMA("name"), null, null)?.value ?? store.any(objectNode, AS("name"), null, null)?.value ?? labelFromUri(objectNode.value);
    }
    const content = store.any(n, AS("content"), null, null)?.value ?? store.any(n, AS("summary"), null, null)?.value ?? store.any(n, DCT("description"), null, null)?.value ?? null;
    const timestamp = store.any(n, AS("published"), null, null)?.value ?? store.any(n, DCT("created"), null, null)?.value ?? store.any(n, DCT("date"), null, null)?.value ?? null;
    const verb = VERB_MAP[activityType] ?? (activityType.toLowerCase() || "notified");
    items.push({
      uri: n.value,
      type: activityType,
      actor: actorName,
      actorUri,
      verb,
      object: objectName,
      objectUri,
      content,
      timestamp
    });
  }
  items.sort((a, b) => {
    if (!a.timestamp && !b.timestamp) return 0;
    if (!a.timestamp) return 1;
    if (!b.timestamp) return -1;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
  return items;
}
function formatTime(iso) {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return iso;
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
function renderNotifications(subject, store, container) {
  container.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "notif-view";
  const title = store.any(subject, SCHEMA("name"), null, null)?.value ?? store.any(subject, DCT("title"), null, null)?.value ?? store.any(subject, RDFS("label"), null, null)?.value ?? "Notifications";
  const titleEl = document.createElement("h2");
  titleEl.className = "notif-title";
  titleEl.textContent = title;
  wrapper.appendChild(titleEl);
  const items = collectNotifications(subject, store);
  const countEl = document.createElement("p");
  countEl.className = "notif-count";
  countEl.textContent = `${items.length} notification${items.length !== 1 ? "s" : ""}`;
  wrapper.appendChild(countEl);
  if (items.length === 0) {
    const empty = document.createElement("p");
    empty.className = "notif-empty";
    empty.textContent = "No notifications.";
    wrapper.appendChild(empty);
    container.appendChild(wrapper);
    return;
  }
  const list = document.createElement("div");
  list.className = "notif-list";
  for (const item of items) {
    const card = document.createElement("div");
    card.className = "notif-item";
    const summary = document.createElement("div");
    summary.className = "notif-summary";
    if (item.actor) {
      const actorEl = document.createElement("a");
      actorEl.className = "notif-actor";
      actorEl.textContent = item.actor;
      if (item.actorUri) actorEl.href = item.actorUri;
      summary.appendChild(actorEl);
      summary.appendChild(document.createTextNode(` ${item.verb} `));
    } else {
      summary.appendChild(document.createTextNode(`${item.verb} `));
    }
    if (item.object) {
      const objectEl = document.createElement("a");
      objectEl.className = "notif-object";
      objectEl.textContent = item.object;
      if (item.objectUri) objectEl.href = item.objectUri;
      summary.appendChild(objectEl);
    }
    card.appendChild(summary);
    if (item.content) {
      const contentEl = document.createElement("p");
      contentEl.className = "notif-content";
      contentEl.textContent = item.content;
      card.appendChild(contentEl);
    }
    if (item.timestamp) {
      const timeEl = document.createElement("time");
      timeEl.className = "notif-time";
      timeEl.dateTime = item.timestamp;
      timeEl.textContent = formatTime(item.timestamp);
      card.appendChild(timeEl);
    }
    list.appendChild(card);
  }
  wrapper.appendChild(list);
  container.appendChild(wrapper);
}
export {
  renderNotifications
};

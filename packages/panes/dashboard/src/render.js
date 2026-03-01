import {
  RDF,
  LDP,
  FOAF,
  VCARD,
  SPACE,
  SOLID,
  DCT,
  DC
} from "@mashlib-next/utils";
import { labelFromUri, createNavLink } from "@mashlib-next/utils";
function getOwnerName(subject, store) {
  const owners = store.each(null, SPACE("storage"), subject, null);
  for (const owner of owners) {
    if (owner.termType !== "NamedNode") continue;
    const name = store.any(owner, FOAF("name"), null, null)?.value ?? store.any(owner, VCARD("fn"), null, null)?.value;
    if (name) return name;
  }
  const topic = store.any(subject, FOAF("primaryTopic"), null, null);
  if (topic && topic.termType === "NamedNode") {
    const name = store.any(topic, FOAF("name"), null, null)?.value ?? store.any(topic, VCARD("fn"), null, null)?.value;
    if (name) return name;
  }
  try {
    const url = new URL(subject.value);
    const sub = url.hostname.split(".")[0];
    if (sub && sub !== "www") return sub;
  } catch {
  }
  return null;
}
function getOwnerWebId(subject, store) {
  const owners = store.each(null, SPACE("storage"), subject, null);
  for (const owner of owners) {
    if (owner.termType === "NamedNode") return owner.value;
  }
  const topic = store.any(subject, FOAF("primaryTopic"), null, null);
  if (topic && topic.termType === "NamedNode") return topic.value;
  return null;
}
function getContents(subject, store) {
  const resources = [];
  const contained = store.each(subject, LDP("contains"), null, null);
  for (const item of contained) {
    if (item.termType !== "NamedNode") continue;
    const node = item;
    const types = store.each(node, RDF("type"), null, null);
    const typeUris = types.map((t) => t.value);
    const isContainer = typeUris.includes(LDP("Container").value) || typeUris.includes(LDP("BasicContainer").value) || node.value.endsWith("/");
    const label = store.any(node, DCT("title"), null, null)?.value ?? store.any(node, DC("title"), null, null)?.value ?? labelFromUri(node.value);
    resources.push({
      uri: node.value,
      label,
      type: isContainer ? "container" : "resource"
    });
  }
  resources.sort((a, b) => {
    if (a.type !== b.type) return a.type === "container" ? -1 : 1;
    return a.label.localeCompare(b.label);
  });
  return resources;
}
function getStorageInfo(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  const typeUris = types.map((t) => t.value);
  let typeLabel = null;
  if (typeUris.includes(SOLID("Account").value)) typeLabel = "Solid Account";
  else if (typeUris.includes(SPACE("Storage").value)) typeLabel = "Solid Pod";
  return { typeLabel };
}
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function renderDashboard(subject, store, container) {
  container.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "dashboard-view";
  const ownerName = getOwnerName(subject, store);
  const ownerWebId = getOwnerWebId(subject, store);
  const header = document.createElement("h2");
  header.className = "dashboard-title";
  header.textContent = ownerName ? `${ownerName}'s Pod` : "Solid Pod";
  wrapper.appendChild(header);
  const urlEl = document.createElement("p");
  urlEl.className = "dashboard-url";
  const urlCode = document.createElement("code");
  urlCode.textContent = subject.value;
  urlEl.appendChild(urlCode);
  wrapper.appendChild(urlEl);
  const { typeLabel } = getStorageInfo(subject, store);
  if (typeLabel) {
    const badge = document.createElement("span");
    badge.className = "dashboard-badge";
    badge.textContent = typeLabel;
    wrapper.appendChild(badge);
  }
  if (ownerWebId) {
    const profileSection = document.createElement("div");
    profileSection.className = "dashboard-section";
    const profileTitle = document.createElement("h3");
    profileTitle.textContent = "Profile";
    profileSection.appendChild(profileTitle);
    const profileLink = createNavLink(ownerWebId, ownerName ? `View ${ownerName}'s profile` : "View profile");
    profileLink.className = "dashboard-link";
    profileSection.appendChild(profileLink);
    wrapper.appendChild(profileSection);
  }
  const contents = getContents(subject, store);
  const dataSection = document.createElement("div");
  dataSection.className = "dashboard-section";
  const dataTitle = document.createElement("h3");
  dataTitle.textContent = "Data";
  dataSection.appendChild(dataTitle);
  if (contents.length === 0) {
    const empty = document.createElement("p");
    empty.className = "dashboard-empty";
    empty.textContent = "No visible contents.";
    dataSection.appendChild(empty);
  } else {
    const countEl = document.createElement("p");
    countEl.className = "dashboard-count";
    const folders = contents.filter((c) => c.type === "container").length;
    const files = contents.filter((c) => c.type === "resource").length;
    const parts = [];
    if (folders > 0) parts.push(`${folders} folder${folders !== 1 ? "s" : ""}`);
    if (files > 0) parts.push(`${files} file${files !== 1 ? "s" : ""}`);
    countEl.textContent = parts.join(", ");
    dataSection.appendChild(countEl);
    const list = document.createElement("ul");
    list.className = "dashboard-contents";
    for (const item of contents) {
      const li = document.createElement("li");
      li.className = `dashboard-item dashboard-item-${item.type}`;
      const icon = document.createElement("span");
      icon.className = "dashboard-item-icon";
      icon.textContent = item.type === "container" ? "\u{1F4C1}" : "\u{1F4C4}";
      li.appendChild(icon);
      const link = createNavLink(item.uri, item.label);
      link.className = "dashboard-item-link";
      link.title = item.uri;
      li.appendChild(link);
      list.appendChild(li);
    }
    dataSection.appendChild(list);
  }
  wrapper.appendChild(dataSection);
  container.appendChild(wrapper);
}
export {
  renderDashboard
};

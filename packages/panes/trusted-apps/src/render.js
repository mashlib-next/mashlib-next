import { ACL, FOAF, VCARD } from "@mashlib-next/utils";
import { labelFromUri } from "@mashlib-next/utils";
const ACCESS_MODES = [
  { uri: "Read", label: "Read" },
  { uri: "Write", label: "Write" },
  { uri: "Append", label: "Append" },
  { uri: "Control", label: "Control" }
];
function getProfileName(subject, store) {
  return store.any(subject, FOAF("name"), null, null)?.value ?? store.any(subject, VCARD("fn"), null, null)?.value ?? labelFromUri(subject.value);
}
function getTrustedApps(subject, store) {
  const apps = [];
  const appNodes = store.each(subject, ACL("trustedApp"), null, null);
  for (const appNode of appNodes) {
    const originNode = store.any(appNode, ACL("origin"), null, null);
    if (!originNode) continue;
    const originUri = originNode.value;
    const originLabel = labelFromUri(originUri);
    const modeNodes = store.each(appNode, ACL("mode"), null, null);
    const modes = modeNodes.map((m) => labelFromUri(m.value));
    apps.push({ originUri, originLabel, modes });
  }
  apps.sort((a, b) => a.originUri.localeCompare(b.originUri));
  return apps;
}
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function renderTrustedApps(subject, store, container) {
  container.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "trusted-apps-view";
  const header = document.createElement("h2");
  header.className = "trusted-apps-title";
  header.textContent = "Trusted Applications";
  wrapper.appendChild(header);
  const profileName = getProfileName(subject, store);
  const subtitle = document.createElement("p");
  subtitle.className = "trusted-apps-subtitle";
  subtitle.textContent = `Manage applications trusted by ${profileName}`;
  wrapper.appendChild(subtitle);
  const apps = getTrustedApps(subject, store);
  const countEl = document.createElement("p");
  countEl.className = "trusted-apps-count";
  countEl.textContent = `${apps.length} trusted application${apps.length !== 1 ? "s" : ""}`;
  wrapper.appendChild(countEl);
  if (apps.length === 0) {
    const empty = document.createElement("p");
    empty.className = "trusted-apps-empty";
    empty.textContent = "No trusted applications configured.";
    wrapper.appendChild(empty);
    renderNotes(wrapper);
    container.appendChild(wrapper);
    return;
  }
  const table = document.createElement("table");
  table.className = "trusted-apps-table";
  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  const thOrigin = document.createElement("th");
  thOrigin.textContent = "Application URL";
  const thModes = document.createElement("th");
  thModes.textContent = "Access Modes";
  headRow.appendChild(thOrigin);
  headRow.appendChild(thModes);
  thead.appendChild(headRow);
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  for (const app of apps) {
    const row = document.createElement("tr");
    row.className = "trusted-apps-row";
    const originCell = document.createElement("td");
    originCell.className = "trusted-apps-origin";
    const link = document.createElement("a");
    link.href = app.originUri;
    link.textContent = app.originUri;
    link.target = "_blank";
    link.rel = "noopener";
    originCell.appendChild(link);
    row.appendChild(originCell);
    const modesCell = document.createElement("td");
    modesCell.className = "trusted-apps-modes";
    for (const mode of ACCESS_MODES) {
      const chip = document.createElement("span");
      const hasMode = app.modes.includes(mode.uri);
      chip.className = `trusted-apps-mode ${hasMode ? "trusted-apps-mode-active" : "trusted-apps-mode-inactive"}`;
      chip.textContent = mode.label;
      modesCell.appendChild(chip);
    }
    row.appendChild(modesCell);
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
  wrapper.appendChild(table);
  renderNotes(wrapper);
  container.appendChild(wrapper);
}
function renderNotes(wrapper) {
  const notes = document.createElement("div");
  notes.className = "trusted-apps-notes";
  const notesTitle = document.createElement("h3");
  notesTitle.textContent = "Notes";
  notes.appendChild(notesTitle);
  const notesList = document.createElement("ol");
  const noteItems = [
    "Trusted applications get access to all resources that you have access to.",
    "You can limit which modes they have by default.",
    "They will not gain more access than you have."
  ];
  for (const text of noteItems) {
    const li = document.createElement("li");
    li.textContent = text;
    notesList.appendChild(li);
  }
  notes.appendChild(notesList);
  wrapper.appendChild(notes);
}
export {
  renderTrustedApps
};

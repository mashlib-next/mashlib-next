import { ACL, RDF, LDP, FOAF, VCARD } from "@mashlib-next/utils";
import { labelFromUri } from "@mashlib-next/utils";
const MODES = [
  { uri: "Read", label: "Read", description: "can view the resource" },
  { uri: "Append", label: "Append", description: "can add new content" },
  { uri: "Write", label: "Write", description: "can modify content" },
  { uri: "Control", label: "Control", description: "can manage sharing" }
];
const PERMISSION_LEVELS = [
  { label: "Owners", modes: ["Read", "Write", "Control"], color: "#7b2d8e" },
  { label: "Editors", modes: ["Read", "Write"], color: "#dc3545" },
  { label: "Posters", modes: ["Read", "Append"], color: "#e67e00" },
  { label: "Submitters", modes: ["Append"], color: "#ccaa00" },
  { label: "Viewers", modes: ["Read"], color: "#28a745" }
];
function isContainer(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  const typeUris = types.map((t) => t.value);
  if (typeUris.includes(LDP("Container").value)) return true;
  if (typeUris.includes(LDP("BasicContainer").value)) return true;
  return subject.value.endsWith("/");
}
function agentLabel(agentUri, store) {
  if (agentUri === FOAF("Agent").value) return "Everyone (public)";
  if (agentUri === ACL("AuthenticatedAgent").value) return "Anyone logged in";
  const agentNode = { termType: "NamedNode", value: agentUri };
  const name = store.any(agentNode, FOAF("name"), null, null)?.value ?? store.any(agentNode, VCARD("fn"), null, null)?.value;
  if (name) return name;
  return labelFromUri(agentUri);
}
function getAclEntries(subject, store) {
  const entries = [];
  const authNodes = store.each(null, ACL("accessTo"), subject, null);
  for (const authNode of authNodes) {
    if (authNode.termType !== "NamedNode") continue;
    const auth = authNode;
    const types = store.each(auth, RDF("type"), null, null);
    const isAuth = types.some((t) => t.value === ACL("Authorization").value);
    if (!isAuth && types.length > 0) continue;
    const modeNodes = store.each(auth, ACL("mode"), null, null);
    const modes = modeNodes.map((m) => labelFromUri(m.value));
    for (const agentNode of store.each(auth, ACL("agent"), null, null)) {
      entries.push({
        agentType: "agent",
        agentUri: agentNode.value,
        agentLabel: agentLabel(agentNode.value, store),
        modes
      });
    }
    for (const classNode of store.each(auth, ACL("agentClass"), null, null)) {
      entries.push({
        agentType: "agentClass",
        agentUri: classNode.value,
        agentLabel: agentLabel(classNode.value, store),
        modes
      });
    }
    for (const groupNode of store.each(auth, ACL("agentGroup"), null, null)) {
      entries.push({
        agentType: "agentGroup",
        agentUri: groupNode.value,
        agentLabel: agentLabel(groupNode.value, store),
        modes
      });
    }
  }
  const defaultAuthNodes = store.each(null, ACL("default"), subject, null);
  for (const authNode of defaultAuthNodes) {
    if (authNode.termType !== "NamedNode") continue;
    const auth = authNode;
    const modeNodes = store.each(auth, ACL("mode"), null, null);
    const modes = modeNodes.map((m) => labelFromUri(m.value));
    for (const agentNode of store.each(auth, ACL("agent"), null, null)) {
      const uri = agentNode.value;
      if (entries.some((e) => e.agentUri === uri && e.modes.join() === modes.join())) continue;
      entries.push({
        agentType: "agent",
        agentUri: uri,
        agentLabel: agentLabel(uri, store),
        modes
      });
    }
    for (const classNode of store.each(auth, ACL("agentClass"), null, null)) {
      const uri = classNode.value;
      if (entries.some((e) => e.agentUri === uri && e.modes.join() === modes.join())) continue;
      entries.push({
        agentType: "agentClass",
        agentUri: uri,
        agentLabel: agentLabel(uri, store),
        modes
      });
    }
  }
  return entries;
}
function groupByLevel(entries) {
  const groups = /* @__PURE__ */ new Map();
  for (const entry of entries) {
    const key = entry.modes.sort().join(",");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(entry);
  }
  return groups;
}
function levelLabel(modes) {
  const sorted = [...modes].sort().join(",");
  for (const level of PERMISSION_LEVELS) {
    if ([...level.modes].sort().join(",") === sorted) {
      return { label: level.label, color: level.color };
    }
  }
  return { label: modes.join(" + "), color: "#555" };
}
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function renderSharing(subject, store, container) {
  container.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "sharing-view";
  const resourceType = isContainer(subject, store) ? "folder" : "file";
  const header = document.createElement("h2");
  header.className = "sharing-title";
  header.textContent = `Sharing for ${resourceType}`;
  wrapper.appendChild(header);
  const uriEl = document.createElement("p");
  uriEl.className = "sharing-resource";
  const uriCode = document.createElement("code");
  uriCode.textContent = subject.value;
  uriEl.appendChild(uriCode);
  wrapper.appendChild(uriEl);
  const entries = getAclEntries(subject, store);
  if (entries.length === 0) {
    const info = document.createElement("p");
    info.className = "sharing-no-acl";
    info.textContent = "No specific sharing settings found. This resource may inherit permissions from its parent container.";
    wrapper.appendChild(info);
    renderModeLegend(wrapper);
    container.appendChild(wrapper);
    return;
  }
  const groups = groupByLevel(entries);
  const permSection = document.createElement("div");
  permSection.className = "sharing-permissions";
  for (const [modeKey, groupEntries] of groups) {
    const modes = modeKey.split(",");
    const { label, color } = levelLabel(modes);
    const row = document.createElement("div");
    row.className = "sharing-level";
    const labelEl = document.createElement("div");
    labelEl.className = "sharing-level-name";
    labelEl.style.color = color;
    labelEl.textContent = label;
    row.appendChild(labelEl);
    const agentsEl = document.createElement("div");
    agentsEl.className = "sharing-agents";
    for (const entry of groupEntries) {
      const chip = document.createElement("span");
      chip.className = `sharing-agent sharing-agent-${entry.agentType}`;
      chip.textContent = entry.agentLabel;
      chip.title = entry.agentUri;
      agentsEl.appendChild(chip);
    }
    row.appendChild(agentsEl);
    const descEl = document.createElement("div");
    descEl.className = "sharing-level-desc";
    descEl.style.color = color;
    const modeDescs = modes.map((m) => {
      const mode = MODES.find((md) => md.uri === m);
      return mode ? mode.description : m;
    });
    descEl.textContent = modeDescs.join(", ");
    row.appendChild(descEl);
    permSection.appendChild(row);
  }
  wrapper.appendChild(permSection);
  if (resourceType === "folder") {
    const defaultInfo = document.createElement("p");
    defaultInfo.className = "sharing-default-info";
    defaultInfo.textContent = "Folder permissions may also apply as defaults for new resources created within.";
    wrapper.appendChild(defaultInfo);
  }
  renderModeLegend(wrapper);
  container.appendChild(wrapper);
}
function renderModeLegend(wrapper) {
  const legend = document.createElement("div");
  legend.className = "sharing-legend";
  const legendTitle = document.createElement("h3");
  legendTitle.textContent = "Access Modes";
  legend.appendChild(legendTitle);
  const table = document.createElement("table");
  table.className = "sharing-legend-table";
  for (const mode of MODES) {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    nameCell.className = "sharing-legend-mode";
    nameCell.textContent = mode.label;
    const descCell = document.createElement("td");
    descCell.textContent = mode.description;
    row.appendChild(nameCell);
    row.appendChild(descCell);
    table.appendChild(row);
  }
  legend.appendChild(table);
  wrapper.appendChild(legend);
}
export {
  renderSharing
};

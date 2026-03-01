import { RDF, WF, TRACKER, DCT, SCHEMA, RDFS } from "@mashlib-next/utils";
import { labelFromUri } from "@mashlib-next/utils";
function isTracker(subject, store) {
  const types = store.each(subject, RDF("type"), null, null).map((t) => t.value);
  if (types.includes(WF("Tracker").value)) return true;
  if (types.includes(TRACKER("Tracker").value)) return true;
  if (store.any(subject, WF("issue"), null, null)) return true;
  return false;
}
function stateLabel(uri) {
  const fragment = uri.split("#").pop() ?? uri.split("/").pop() ?? uri;
  return fragment.replace(/([a-z])([A-Z])/g, "$1 $2");
}
function stateClass(uri) {
  const lower = uri.toLowerCase();
  if (lower.includes("open") || lower.includes("new")) return "issue-state-open";
  if (lower.includes("closed") || lower.includes("done") || lower.includes("resolved") || lower.includes("fixed")) return "issue-state-closed";
  if (lower.includes("progress") || lower.includes("active")) return "issue-state-active";
  return "issue-state-default";
}
function renderSingleIssue(subject, store, container) {
  const wrapper = document.createElement("div");
  wrapper.className = "issue-view";
  const title = store.any(subject, DCT("title"), null, null)?.value ?? store.any(subject, SCHEMA("name"), null, null)?.value ?? store.any(subject, RDFS("label"), null, null)?.value ?? labelFromUri(subject.value);
  const titleEl = document.createElement("h2");
  titleEl.className = "issue-title";
  titleEl.textContent = title;
  wrapper.appendChild(titleEl);
  const stateNode = store.any(subject, WF("state"), null, null);
  if (stateNode) {
    const badge = document.createElement("span");
    badge.className = `issue-state ${stateClass(stateNode.value)}`;
    badge.textContent = stateLabel(stateNode.value);
    wrapper.appendChild(badge);
  }
  const details = document.createElement("div");
  details.className = "issue-details";
  const assignee = store.any(subject, WF("assignee"), null, null);
  if (assignee) {
    const assigneeName = store.any(assignee, SCHEMA("name"), null, null)?.value ?? labelFromUri(assignee.value);
    const row = document.createElement("div");
    row.className = "issue-detail";
    row.innerHTML = `<span class="issue-label">Assignee</span><span class="issue-value">${assigneeName}</span>`;
    details.appendChild(row);
  }
  const priority = store.any(subject, WF("priority"), null, null)?.value ?? store.any(subject, SCHEMA("priority"), null, null)?.value;
  if (priority) {
    const row = document.createElement("div");
    row.className = "issue-detail";
    row.innerHTML = `<span class="issue-label">Priority</span><span class="issue-value">${stateLabel(priority)}</span>`;
    details.appendChild(row);
  }
  const created = store.any(subject, DCT("created"), null, null)?.value ?? store.any(subject, SCHEMA("dateCreated"), null, null)?.value;
  if (created) {
    const row = document.createElement("div");
    row.className = "issue-detail";
    const date = new Date(created);
    const formatted = isNaN(date.getTime()) ? created : date.toLocaleDateString(void 0, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
    row.innerHTML = `<span class="issue-label">Created</span><span class="issue-value">${formatted}</span>`;
    details.appendChild(row);
  }
  if (details.children.length > 0) {
    wrapper.appendChild(details);
  }
  const description = store.any(subject, DCT("description"), null, null)?.value ?? store.any(subject, SCHEMA("description"), null, null)?.value ?? store.any(subject, RDFS("comment"), null, null)?.value;
  if (description) {
    const descEl = document.createElement("div");
    descEl.className = "issue-description";
    descEl.textContent = description;
    wrapper.appendChild(descEl);
  }
  container.appendChild(wrapper);
}
function renderTracker(subject, store, container) {
  const wrapper = document.createElement("div");
  wrapper.className = "tracker-view";
  const title = store.any(subject, DCT("title"), null, null)?.value ?? store.any(subject, SCHEMA("name"), null, null)?.value ?? store.any(subject, RDFS("label"), null, null)?.value ?? labelFromUri(subject.value);
  const titleEl = document.createElement("h2");
  titleEl.className = "tracker-title";
  titleEl.textContent = title;
  wrapper.appendChild(titleEl);
  const description = store.any(subject, DCT("description"), null, null)?.value ?? store.any(subject, SCHEMA("description"), null, null)?.value;
  if (description) {
    const descEl = document.createElement("p");
    descEl.className = "tracker-description";
    descEl.textContent = description;
    wrapper.appendChild(descEl);
  }
  const issues = store.each(subject, WF("issue"), null, null);
  const countEl = document.createElement("p");
  countEl.className = "tracker-count";
  countEl.textContent = `${issues.length} issue${issues.length !== 1 ? "s" : ""}`;
  wrapper.appendChild(countEl);
  if (issues.length === 0) {
    const empty = document.createElement("p");
    empty.className = "tracker-empty";
    empty.textContent = "No issues found.";
    wrapper.appendChild(empty);
  } else {
    const list = document.createElement("ul");
    list.className = "tracker-issues";
    for (const issue of issues) {
      const issueNode = issue;
      const li = document.createElement("li");
      li.className = "tracker-issue";
      const state = store.any(issueNode, WF("state"), null, null);
      if (state) {
        const badge = document.createElement("span");
        badge.className = `issue-state ${stateClass(state.value)}`;
        badge.textContent = stateLabel(state.value);
        li.appendChild(badge);
      }
      const issueTitle = store.any(issueNode, DCT("title"), null, null)?.value ?? store.any(issueNode, SCHEMA("name"), null, null)?.value ?? labelFromUri(issueNode.value);
      const link = document.createElement("a");
      link.className = "tracker-issue-title";
      link.href = issueNode.value;
      link.textContent = issueTitle;
      li.appendChild(link);
      const assignee = store.any(issueNode, WF("assignee"), null, null);
      if (assignee) {
        const assigneeName = store.any(assignee, SCHEMA("name"), null, null)?.value ?? labelFromUri(assignee.value);
        const assigneeEl = document.createElement("span");
        assigneeEl.className = "tracker-issue-assignee";
        assigneeEl.textContent = assigneeName;
        li.appendChild(assigneeEl);
      }
      list.appendChild(li);
    }
    wrapper.appendChild(list);
  }
  container.appendChild(wrapper);
}
function renderIssue(subject, store, container) {
  container.innerHTML = "";
  if (isTracker(subject, store)) {
    renderTracker(subject, store, container);
  } else {
    renderSingleIssue(subject, store, container);
  }
}
export {
  renderIssue
};

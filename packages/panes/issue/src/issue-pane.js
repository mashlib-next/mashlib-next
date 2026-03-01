import { RDF, WF, TRACKER } from "@mashlib-next/utils";
import { renderIssue } from "./render.js";
const ISSUE_TYPES = [
  WF("Tracker").value,
  WF("Issue").value,
  TRACKER("Tracker").value,
  TRACKER("Issue").value
];
function isIssue(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  const typeUris = types.map((t) => t.value);
  for (const t of ISSUE_TYPES) {
    if (typeUris.includes(t)) return true;
  }
  if (store.any(subject, WF("issue"), null, null)) return true;
  if (store.any(subject, WF("state"), null, null)) return true;
  return false;
}
const issuePane = {
  label: "Issues",
  icon: "\u{1F4CB}",
  canHandle(subject, store) {
    return isIssue(subject, store);
  },
  render(subject, store, container) {
    renderIssue(subject, store, container);
  }
};
export {
  issuePane
};

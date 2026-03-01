import { RDF, SPACE, LDP, SOLID } from "@mashlib-next/utils";
import { renderDashboard } from "./render.js";
function isPodRoot(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  const typeUris = types.map((t) => t.value);
  if (typeUris.includes(SPACE("Storage").value)) return true;
  if (typeUris.includes(SOLID("Account").value)) return true;
  const isContainerType = typeUris.includes(LDP("Container").value) || typeUris.includes(LDP("BasicContainer").value);
  if (isContainerType) {
    try {
      const url = new URL(subject.value);
      if (url.pathname === "/") return true;
    } catch {
    }
  }
  const storages = store.each(null, SPACE("storage"), subject, null);
  if (storages.length > 0) return true;
  return false;
}
const dashboardPane = {
  label: "Dashboard",
  icon: "\u{1F3E0}",
  canHandle(subject, store) {
    return isPodRoot(subject, store);
  },
  render(subject, store, container) {
    renderDashboard(subject, store, container);
  }
};
export {
  dashboardPane
};

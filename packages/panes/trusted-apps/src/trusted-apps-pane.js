import { ACL } from "@mashlib-next/utils";
import { renderTrustedApps } from "./render.js";
function hasTrustedApps(subject, store) {
  const apps = store.each(subject, ACL("trustedApp"), null, null);
  if (apps.length > 0) return true;
  return false;
}
const trustedAppsPane = {
  label: "Trusted Apps",
  icon: "\u{1F6E1}\uFE0F",
  canHandle(subject, store) {
    return hasTrustedApps(subject, store);
  },
  render(subject, store, container) {
    renderTrustedApps(subject, store, container);
  }
};
export {
  trustedAppsPane
};

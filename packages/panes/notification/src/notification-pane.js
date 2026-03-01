import { RDF, LDP, SOLID, AS } from "@mashlib-next/utils";
import { renderNotifications } from "./render.js";
function isNotificationInbox(subject, store) {
  const types = store.each(subject, RDF("type"), null, null).map((t) => t.value);
  if (types.includes(LDP("Container").value) || types.includes(LDP("BasicContainer").value)) {
    const inboxRefs = store.match(null, LDP("inbox"), subject, null);
    if (inboxRefs.length > 0) return true;
    const solidInboxRefs = store.match(null, SOLID("inbox"), subject, null);
    if (solidInboxRefs.length > 0) return true;
  }
  if (types.includes(AS("OrderedCollection").value)) return true;
  if (types.includes(AS("Collection").value)) {
    if (store.any(subject, AS("items"), null, null)) return true;
    if (store.any(subject, LDP("contains"), null, null)) return true;
  }
  if (store.any(subject, SOLID("notification"), null, null)) return true;
  return false;
}
const notificationPane = {
  label: "Notifications",
  icon: "\u{1F514}",
  canHandle(subject, store) {
    return isNotificationInbox(subject, store);
  },
  render(subject, store, container) {
    renderNotifications(subject, store, container);
  }
};
export {
  notificationPane
};

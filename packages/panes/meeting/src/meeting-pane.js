import { RDF, MEE, SCHEMA } from "@mashlib-next/utils";
import { renderMeeting } from "./render.js";
const MEETING_TYPES = [
  MEE("Meeting").value,
  SCHEMA("Event").value
];
function isMeeting(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  const typeUris = types.map((t) => t.value);
  if (typeUris.includes(MEE("Meeting").value)) return true;
  if (store.any(subject, MEE("participant"), null, null)) return true;
  if (store.any(subject, MEE("agenda"), null, null)) return true;
  return false;
}
const meetingPane = {
  label: "Meeting",
  icon: "\u{1F91D}",
  canHandle(subject, store) {
    return isMeeting(subject, store);
  },
  render(subject, store, container) {
    renderMeeting(subject, store, container);
  }
};
export {
  meetingPane
};

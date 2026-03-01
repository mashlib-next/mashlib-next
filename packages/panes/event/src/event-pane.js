import { RDF, SCHEMA } from "@mashlib-next/utils";
import { renderEvent } from "./render.js";
function isEvent(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  const typeUris = types.map((t) => t.value);
  if (typeUris.includes(SCHEMA("Event").value)) return true;
  if (typeUris.includes(SCHEMA("SocialEvent").value)) return true;
  if (typeUris.includes(SCHEMA("BusinessEvent").value)) return true;
  if (typeUris.includes(SCHEMA("MusicEvent").value)) return true;
  if (typeUris.includes(SCHEMA("EducationEvent").value)) return true;
  if (store.any(subject, SCHEMA("startDate"), null, null)) {
    if (store.any(subject, SCHEMA("name"), null, null)) return true;
  }
  return false;
}
const eventPane = {
  label: "Event",
  icon: "\u{1F4C5}",
  canHandle(subject, store) {
    return isEvent(subject, store);
  },
  render(subject, store, container) {
    renderEvent(subject, store, container);
  }
};
export {
  eventPane
};

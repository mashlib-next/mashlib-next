import { RDF, FOAF, VCARD, SCHEMA } from "@mashlib-next/utils";
import { renderProfile } from "./render.js";
function isPerson(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  const typeUris = types.map((t) => t.value);
  if (typeUris.includes(FOAF("Person").value)) return true;
  if (typeUris.includes(SCHEMA("Person").value)) return true;
  if (typeUris.includes(VCARD("Individual").value)) return true;
  if (store.any(subject, FOAF("name"), null, null)) return true;
  if (store.any(subject, VCARD("fn"), null, null)) return true;
  return false;
}
const profilePane = {
  label: "Profile",
  icon: "\u{1F464}",
  canHandle(subject, store) {
    return isPerson(subject, store);
  },
  render(subject, store, container) {
    renderProfile(subject, store, container);
  }
};
export {
  profilePane
};

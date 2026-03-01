import { RDF, LDP } from "@mashlib-next/utils";
import { renderSharing } from "./render.js";
function isSharable(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  const typeUris = types.map((t) => t.value);
  if (typeUris.includes(LDP("Resource").value)) return true;
  if (typeUris.includes(LDP("Container").value)) return true;
  if (typeUris.includes(LDP("BasicContainer").value)) return true;
  if (subject.value.endsWith("/")) return true;
  return false;
}
const sharingPane = {
  label: "Sharing",
  icon: "\u{1F512}",
  canHandle(subject, store) {
    return isSharable(subject, store);
  },
  render(subject, store, container) {
    renderSharing(subject, store, container);
  }
};
export {
  sharingPane
};

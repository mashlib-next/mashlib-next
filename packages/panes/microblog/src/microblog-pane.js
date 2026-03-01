import { RDF, SIOC, SIOCt } from "@mashlib-next/utils";
import { renderMicroblog } from "./render.js";
function isMicroblog(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  const typeUris = types.map((t) => t.value);
  if (typeUris.includes(SIOCt("Microblog").value)) return true;
  if (typeUris.includes(SIOCt("MessageBoard").value)) return true;
  if (typeUris.includes(SIOC("Forum").value)) return true;
  if (typeUris.includes(SIOCt("MicroblogPost").value)) return true;
  const contained = store.each(subject, SIOC("container_of"), null, null);
  if (contained.length > 0) {
    for (const item of contained) {
      if (item.termType === "NamedNode") {
        if (store.any(item, SIOC("content"), null, null)) return true;
      }
    }
  }
  return false;
}
const microblogPane = {
  label: "Microblog",
  icon: "\u{1F4E2}",
  canHandle(subject, store) {
    return isMicroblog(subject, store);
  },
  render(subject, store, container) {
    renderMicroblog(subject, store, container);
  }
};
export {
  microblogPane
};

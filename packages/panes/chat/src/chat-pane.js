import { RDF, MEE, WF, SIOC, DCT } from "@mashlib-next/utils";
import { renderChat } from "./render.js";
function isChat(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  const typeUris = types.map((t) => t.value);
  if (typeUris.includes(MEE("LongChat").value)) return true;
  if (typeUris.includes(MEE("ShortChat").value)) return true;
  if (typeUris.includes(MEE("Chat").value)) return true;
  if (typeUris.includes(WF("Flow").value)) return true;
  if (typeUris.includes(SIOC("Thread").value)) return true;
  if (store.match(subject, WF("message"), null, null).length > 0) return true;
  if (store.any(subject, SIOC("content"), null, null) && store.any(subject, DCT("created"), null, null)) return true;
  return false;
}
const chatPane = {
  label: "Chat",
  icon: "\u{1F4AC}",
  canHandle(subject, store) {
    return isChat(subject, store);
  },
  render(subject, store, container) {
    renderChat(subject, store, container);
  }
};
export {
  chatPane
};

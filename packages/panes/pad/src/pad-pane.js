import { RDF, PAD } from "@mashlib-next/utils";
import { renderPad } from "./render.js";
function isPad(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  const typeUris = types.map((t) => t.value);
  if (typeUris.includes(PAD("Notepad").value)) return true;
  if (store.any(subject, PAD("next"), null, null)) return true;
  return false;
}
const padPane = {
  label: "Notepad",
  icon: "\u{1F4DD}",
  canHandle(subject, store) {
    return isPad(subject, store);
  },
  render(subject, store, container) {
    renderPad(subject, store, container);
  }
};
export {
  padPane
};

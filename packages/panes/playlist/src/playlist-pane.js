import { RDF, OLO, PBO } from "@mashlib-next/utils";
import { renderPlaylist } from "./render.js";
function isPlaylist(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  const typeUris = types.map((t) => t.value);
  if (typeUris.includes(OLO("OrderedList").value)) return true;
  if (typeUris.includes(PBO("Playlist").value)) return true;
  const slots = store.each(subject, OLO("slot"), null, null);
  return slots.length > 0;
}
const playlistPane = {
  label: "Playlist",
  icon: "\u{1F3B5}",
  canHandle(subject, store) {
    return isPlaylist(subject, store);
  },
  render(subject, store, container) {
    renderPlaylist(subject, store, container);
  }
};
export {
  playlistPane
};

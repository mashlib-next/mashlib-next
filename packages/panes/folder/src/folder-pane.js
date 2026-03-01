import { RDF, LDP } from "@mashlib-next/utils";
import { renderFolder } from "./render.js";
function isContainer(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  const typeUris = types.map((t) => t.value);
  if (typeUris.includes(LDP("Container").value)) return true;
  if (typeUris.includes(LDP("BasicContainer").value)) return true;
  if (subject.value.endsWith("/") && store.match(subject, LDP("contains"), null, null).length > 0) {
    return true;
  }
  return false;
}
const folderPane = {
  label: "Folder",
  icon: "\u{1F4C1}",
  canHandle(subject, store) {
    return isContainer(subject, store);
  },
  render(subject, store, container) {
    renderFolder(subject, store, container);
  }
};
export {
  folderPane
};

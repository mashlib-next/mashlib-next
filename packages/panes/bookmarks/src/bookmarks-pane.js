import { RDF, BOOK } from "@mashlib-next/utils";
import { renderBookmarks } from "./render.js";
function isBookmarkCollection(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  const typeUris = types.map((t) => t.value);
  if (typeUris.includes(BOOK("BookmarkList").value)) return true;
  if (typeUris.includes(BOOK("Topic").value)) return true;
  const members = store.each(subject, BOOK("hasMember"), null, null);
  if (members.length > 0) {
    for (const m of members) {
      const memberTypes = store.each(m, RDF("type"), null, null);
      if (memberTypes.some((t) => t.value === BOOK("Bookmark").value)) return true;
    }
  }
  return false;
}
const bookmarksPane = {
  label: "Bookmarks",
  icon: "\u{1F516}",
  canHandle(subject, store) {
    return isBookmarkCollection(subject, store);
  },
  render(subject, store, container) {
    renderBookmarks(subject, store, container);
  }
};
export {
  bookmarksPane
};

import { renderOutline } from "./render.js";
const outlinePane = {
  label: "Outline",
  icon: "\u{1F50D}",
  canHandle(subject, store) {
    const triples = store.match(subject, null, null, null);
    return triples.length > 0;
  },
  render(subject, store, container) {
    renderOutline(subject, store, container);
  }
};
export {
  outlinePane
};

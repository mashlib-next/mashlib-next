import { RDF, SCHEMA } from "@mashlib-next/utils";
import { renderProduct } from "./render.js";
const PRODUCT_TYPES = [
  "Product",
  "IndividualProduct",
  "SomeProducts",
  "Vehicle",
  "Car",
  "CreativeWork",
  "SoftwareApplication",
  "Book",
  "Movie",
  "MusicAlbum",
  "Game"
];
function isProduct(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  const typeUris = types.map((t) => t.value);
  for (const t of PRODUCT_TYPES) {
    if (typeUris.includes(SCHEMA(t).value)) return true;
  }
  if (store.any(subject, SCHEMA("offers"), null, null)) return true;
  if (store.any(subject, SCHEMA("price"), null, null)) return true;
  return false;
}
const productPane = {
  label: "Product",
  icon: "\u{1F4E6}",
  canHandle(subject, store) {
    return isProduct(subject, store);
  },
  render(subject, store, container) {
    renderProduct(subject, store, container);
  }
};
export {
  productPane
};

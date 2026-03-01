import { RDF, SCHEMA } from "@mashlib-next/utils";
import { renderRecipe } from "./render.js";
const RECIPE_TYPES = [
  "Recipe",
  "HowTo"
];
function isRecipe(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  const typeUris = types.map((t) => t.value);
  for (const t of RECIPE_TYPES) {
    if (typeUris.includes(SCHEMA(t).value)) return true;
  }
  if (store.any(subject, SCHEMA("recipeIngredient"), null, null)) return true;
  if (store.any(subject, SCHEMA("recipeInstructions"), null, null)) return true;
  return false;
}
const recipePane = {
  label: "Recipe",
  icon: "\u{1F373}",
  canHandle(subject, store) {
    return isRecipe(subject, store);
  },
  render(subject, store, container) {
    renderRecipe(subject, store, container);
  }
};
export {
  recipePane
};

import { RDF, UI, RDFS } from "@mashlib-next/utils";
import { renderForm } from "./render.js";
function hasForm(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  const typeUris = types.map((t) => t.value);
  if (typeUris.includes(UI("Form").value)) return true;
  for (const typeNode of types) {
    if (typeNode.termType !== "NamedNode") continue;
    if (store.any(typeNode, UI("creationForm"), null, null)) return true;
    if (store.any(typeNode, UI("annotationForm"), null, null)) return true;
    const supers = store.each(typeNode, RDFS("subClassOf"), null, null);
    for (const sup of supers) {
      if (sup.termType !== "NamedNode") continue;
      if (store.any(sup, UI("creationForm"), null, null)) return true;
      if (store.any(sup, UI("annotationForm"), null, null)) return true;
    }
  }
  return false;
}
const formPane = {
  label: "Form",
  icon: "\u{1F4CB}",
  canHandle(subject, store) {
    return hasForm(subject, store);
  },
  render(subject, store, container) {
    renderForm(subject, store, container);
  }
};
export {
  formPane
};

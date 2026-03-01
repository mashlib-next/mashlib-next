import { RDF, SCHEMA, FOAF } from "@mashlib-next/utils";
import { renderOrganization } from "./render.js";
const ORG_TYPES = [
  SCHEMA("Organization"),
  SCHEMA("Corporation"),
  SCHEMA("GovernmentOrganization"),
  SCHEMA("NGO"),
  SCHEMA("EducationalOrganization"),
  SCHEMA("LocalBusiness"),
  FOAF("Organization"),
  FOAF("Group")
];
function isOrganization(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  const typeUris = types.map((t) => t.value);
  for (const orgType of ORG_TYPES) {
    if (typeUris.includes(orgType.value)) return true;
  }
  return false;
}
const organizationPane = {
  label: "Organization",
  icon: "\u{1F3E2}",
  canHandle(subject, store) {
    return isOrganization(subject, store);
  },
  render(subject, store, container) {
    renderOrganization(subject, store, container);
  }
};
export {
  organizationPane
};

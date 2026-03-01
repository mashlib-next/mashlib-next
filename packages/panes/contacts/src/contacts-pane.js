import { RDF, VCARD } from "@mashlib-next/utils";
import { renderContacts } from "./render.js";
function isAddressBook(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  const typeUris = types.map((t) => t.value);
  if (typeUris.includes(VCARD("AddressBook").value)) return true;
  if (typeUris.includes(VCARD("Group").value)) return true;
  if (store.match(subject, VCARD("hasMember"), null, null).length > 0) return true;
  return false;
}
const contactsPane = {
  label: "Contacts",
  icon: "\u{1F4C7}",
  canHandle(subject, store) {
    return isAddressBook(subject, store);
  },
  render(subject, store, container) {
    renderContacts(subject, store, container);
  }
};
export {
  contactsPane
};

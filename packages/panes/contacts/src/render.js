import { VCARD, FOAF, SCHEMA, RDF } from "@mashlib-next/utils";
import { labelFromUri, createNavLink } from "@mashlib-next/utils";
function getContactName(node, store) {
  return store.any(node, VCARD("fn"), null, null)?.value ?? store.any(node, FOAF("name"), null, null)?.value ?? store.any(node, SCHEMA("name"), null, null)?.value ?? labelFromUri(node.value);
}
function getEmails(node, store) {
  const emails = [];
  const emailNodes = store.each(node, VCARD("hasEmail"), null, null);
  for (const en of emailNodes) {
    const emailValue = store.any(en, VCARD("value"), null, null)?.value;
    if (emailValue) {
      emails.push(emailValue);
    } else if (en.value.startsWith("mailto:")) {
      emails.push(en.value);
    }
  }
  if (emails.length === 0) {
    const mbox = store.any(node, FOAF("mbox"), null, null)?.value;
    if (mbox) emails.push(mbox);
  }
  return emails;
}
function getPhones(node, store) {
  const phones = [];
  const phoneNodes = store.each(node, VCARD("hasTelephone"), null, null);
  for (const pn of phoneNodes) {
    const phoneValue = store.any(pn, VCARD("value"), null, null)?.value;
    if (phoneValue) {
      phones.push(phoneValue);
    } else if (pn.value.startsWith("tel:")) {
      phones.push(pn.value);
    }
  }
  return phones;
}
function getAddress(node, store) {
  const addrNode = store.any(node, VCARD("hasAddress"), null, null);
  if (!addrNode) return void 0;
  const addr = addrNode;
  const street = store.any(addr, VCARD("street-address"), null, null)?.value;
  const locality = store.any(addr, VCARD("locality"), null, null)?.value;
  const region = store.any(addr, VCARD("region"), null, null)?.value;
  const postalCode = store.any(addr, VCARD("postal-code"), null, null)?.value;
  const country = store.any(addr, VCARD("country-name"), null, null)?.value;
  const parts = [street, locality, region, postalCode, country].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : void 0;
}
function getContacts(subject, store) {
  const members = store.each(subject, VCARD("hasMember"), null, null);
  const contacts = [];
  for (const member of members) {
    const node = member;
    if (store.holds(node, RDF("type"), VCARD("Group"))) {
      const nested = getContacts(node, store);
      contacts.push(...nested);
      continue;
    }
    contacts.push({
      uri: node.value,
      name: getContactName(node, store),
      emails: getEmails(node, store),
      phones: getPhones(node, store),
      title: store.any(node, VCARD("title"), null, null)?.value ?? void 0,
      org: store.any(node, VCARD("organization-name"), null, null)?.value ?? void 0,
      photo: store.any(node, VCARD("hasPhoto"), null, null)?.value ?? store.any(node, FOAF("img"), null, null)?.value ?? void 0,
      address: getAddress(node, store),
      note: store.any(node, VCARD("note"), null, null)?.value ?? void 0
    });
  }
  contacts.sort((a, b) => a.name.localeCompare(b.name));
  return contacts;
}
function getGroups(subject, store) {
  const groups = [];
  const members = store.each(subject, VCARD("hasMember"), null, null);
  for (const member of members) {
    const node = member;
    if (store.holds(node, RDF("type"), VCARD("Group"))) {
      const name = getContactName(node, store);
      const count = store.each(node, VCARD("hasMember"), null, null).length;
      groups.push({ name, count, uri: node.value });
    }
  }
  groups.sort((a, b) => a.name.localeCompare(b.name));
  return groups;
}
function getTitle(subject, store) {
  return store.any(subject, VCARD("fn"), null, null)?.value ?? store.any(subject, SCHEMA("name"), null, null)?.value ?? "Address Book";
}
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function renderContacts(subject, store, container) {
  container.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "contacts-view";
  const title = getTitle(subject, store);
  const header = document.createElement("h2");
  header.className = "contacts-title";
  header.textContent = title;
  wrapper.appendChild(header);
  const contacts = getContacts(subject, store);
  const groups = getGroups(subject, store);
  const countEl = document.createElement("p");
  countEl.className = "contacts-count";
  countEl.textContent = `${contacts.length} contact${contacts.length !== 1 ? "s" : ""}`;
  wrapper.appendChild(countEl);
  if (contacts.length > 5) {
    const searchInput = document.createElement("input");
    searchInput.className = "contacts-search";
    searchInput.type = "search";
    searchInput.placeholder = "Filter contacts...";
    searchInput.setAttribute("aria-label", "Filter contacts");
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      const cards = wrapper.querySelectorAll(".contact-card");
      for (const card of cards) {
        const el = card;
        const name = el.getAttribute("data-name") ?? "";
        el.style.display = name.toLowerCase().includes(query) ? "" : "none";
      }
    });
    wrapper.appendChild(searchInput);
  }
  if (groups.length > 0) {
    const groupsSection = document.createElement("div");
    groupsSection.className = "contacts-groups";
    const groupsHeader = document.createElement("h3");
    groupsHeader.textContent = "Groups";
    groupsSection.appendChild(groupsHeader);
    const groupList = document.createElement("ul");
    groupList.className = "contacts-group-list";
    for (const group of groups) {
      const li = document.createElement("li");
      li.className = "contacts-group-item";
      const link = createNavLink(group.uri, `${group.name} (${group.count})`);
      li.appendChild(link);
      groupList.appendChild(li);
    }
    groupsSection.appendChild(groupList);
    wrapper.appendChild(groupsSection);
  }
  if (contacts.length === 0) {
    const empty = document.createElement("p");
    empty.className = "contacts-empty";
    empty.textContent = "No contacts found.";
    wrapper.appendChild(empty);
    container.appendChild(wrapper);
    return;
  }
  const list = document.createElement("ul");
  list.className = "contacts-list";
  for (const contact of contacts) {
    const li = document.createElement("li");
    li.className = "contact-card";
    li.setAttribute("data-name", contact.name);
    if (contact.photo) {
      const photo = document.createElement("img");
      photo.className = "contact-photo";
      photo.src = contact.photo;
      photo.alt = contact.name;
      li.appendChild(photo);
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "contact-photo-placeholder";
      placeholder.textContent = contact.name.charAt(0).toUpperCase();
      li.appendChild(placeholder);
    }
    const info = document.createElement("div");
    info.className = "contact-info";
    const nameLink = createNavLink(contact.uri, contact.name);
    nameLink.className = "contact-name";
    nameLink.title = contact.uri;
    info.appendChild(nameLink);
    if (contact.title) {
      const titleEl = document.createElement("span");
      titleEl.className = "contact-title";
      titleEl.textContent = contact.title;
      info.appendChild(titleEl);
    }
    if (contact.org) {
      const orgEl = document.createElement("span");
      orgEl.className = "contact-org";
      orgEl.textContent = contact.org;
      info.appendChild(orgEl);
    }
    for (const email of contact.emails) {
      const emailEl = document.createElement("a");
      emailEl.className = "contact-email";
      const addr = email.replace("mailto:", "");
      emailEl.href = email.startsWith("mailto:") ? email : `mailto:${addr}`;
      emailEl.textContent = addr;
      info.appendChild(emailEl);
    }
    for (const phone of contact.phones) {
      const phoneEl = document.createElement("a");
      phoneEl.className = "contact-phone";
      const num = phone.replace("tel:", "");
      phoneEl.href = phone.startsWith("tel:") ? phone : `tel:${num}`;
      phoneEl.textContent = num;
      info.appendChild(phoneEl);
    }
    if (contact.address) {
      const addrEl = document.createElement("span");
      addrEl.className = "contact-address";
      addrEl.textContent = contact.address;
      info.appendChild(addrEl);
    }
    if (contact.note) {
      const noteEl = document.createElement("p");
      noteEl.className = "contact-note";
      noteEl.textContent = contact.note;
      info.appendChild(noteEl);
    }
    li.appendChild(info);
    list.appendChild(li);
  }
  wrapper.appendChild(list);
  container.appendChild(wrapper);
}
export {
  renderContacts
};

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
const AVATAR_COLORS = [
  "#7C3AED", "#2563EB", "#0891B2", "#059669", "#D97706",
  "#DC2626", "#DB2777", "#4F46E5", "#0D9488", "#EA580C"
];
function avatarColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}
function makeAvatar(name, photo, size) {
  if (photo) {
    const img = document.createElement("img");
    img.className = `contact-photo contact-photo-${size}`;
    img.src = photo;
    img.alt = name;
    return img;
  }
  const el = document.createElement("div");
  el.className = `contact-photo-placeholder contact-photo-${size}`;
  el.textContent = name.charAt(0).toUpperCase();
  el.style.background = avatarColor(name);
  return el;
}
function showDetail(contact, detailPanel) {
  detailPanel.innerHTML = "";
  const avatar = makeAvatar(contact.name, contact.photo, "lg");
  detailPanel.appendChild(avatar);
  const name = document.createElement("h2");
  name.className = "contact-detail-name";
  name.textContent = contact.name;
  detailPanel.appendChild(name);
  if (contact.title || contact.org) {
    const role = document.createElement("p");
    role.className = "contact-role";
    role.textContent = [contact.title, contact.org].filter(Boolean).join(" \u00B7 ");
    detailPanel.appendChild(role);
  }
  const fields = document.createElement("div");
  fields.className = "contact-fields";
  for (const email of contact.emails) {
    const addr = email.replace("mailto:", "");
    const row = document.createElement("div");
    row.className = "contact-field";
    row.innerHTML = `<span class="contact-field-label">Email</span><a class="contact-field-value contact-email" href="${email.startsWith("mailto:") ? email : "mailto:" + addr}">${escapeHtml(addr)}</a>`;
    fields.appendChild(row);
  }
  for (const phone of contact.phones) {
    const num = phone.replace("tel:", "");
    const row = document.createElement("div");
    row.className = "contact-field";
    row.innerHTML = `<span class="contact-field-label">Phone</span><a class="contact-field-value contact-phone" href="${phone.startsWith("tel:") ? phone : "tel:" + num}">${escapeHtml(num)}</a>`;
    fields.appendChild(row);
  }
  if (contact.address) {
    const row = document.createElement("div");
    row.className = "contact-field";
    row.innerHTML = `<span class="contact-field-label">Address</span><span class="contact-field-value contact-address">${escapeHtml(contact.address)}</span>`;
    fields.appendChild(row);
  }
  if (contact.note) {
    const row = document.createElement("div");
    row.className = "contact-field";
    row.innerHTML = `<span class="contact-field-label">Note</span><span class="contact-field-value contact-note">${escapeHtml(contact.note)}</span>`;
    fields.appendChild(row);
  }
  if (fields.children.length > 0) detailPanel.appendChild(fields);
}
function renderContacts(subject, store, container) {
  container.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "contacts-view";
  const contacts = getContacts(subject, store);
  const groups = getGroups(subject, store);
  const header = document.createElement("div");
  header.className = "contacts-header";
  const title = getTitle(subject, store);
  const titleEl = document.createElement("h2");
  titleEl.className = "contacts-title";
  titleEl.textContent = title;
  header.appendChild(titleEl);
  const countEl = document.createElement("span");
  countEl.className = "contacts-count";
  countEl.textContent = `${contacts.length}`;
  header.appendChild(countEl);
  wrapper.appendChild(header);
  if (groups.length > 0) {
    const chips = document.createElement("div");
    chips.className = "contacts-group-chips";
    const allChip = document.createElement("button");
    allChip.className = "contacts-chip contacts-chip-active";
    allChip.textContent = "All";
    chips.appendChild(allChip);
    for (const group of groups) {
      const chip = document.createElement("button");
      chip.className = "contacts-chip";
      chip.textContent = group.name;
      chips.appendChild(chip);
    }
    wrapper.appendChild(chips);
  }
  const searchInput = document.createElement("input");
  searchInput.className = "contacts-search";
  searchInput.type = "search";
  searchInput.placeholder = "Search by name";
  searchInput.setAttribute("aria-label", "Filter contacts");
  wrapper.appendChild(searchInput);
  if (contacts.length === 0) {
    const empty = document.createElement("p");
    empty.className = "contacts-empty";
    empty.textContent = "No contacts found.";
    wrapper.appendChild(empty);
    container.appendChild(wrapper);
    return;
  }
  const body = document.createElement("div");
  body.className = "contacts-body";
  const listPanel = document.createElement("div");
  listPanel.className = "contacts-list-panel";
  const list = document.createElement("ul");
  list.className = "contacts-list";
  const detailPanel = document.createElement("div");
  detailPanel.className = "contacts-detail-panel";
  let activeRow = null;
  for (const contact of contacts) {
    const li = document.createElement("li");
    li.className = "contact-row";
    li.setAttribute("data-name", contact.name);
    li.setAttribute("data-search", [contact.org ?? "", contact.title ?? "", ...contact.emails].join(" "));
    const avatar = makeAvatar(contact.name, contact.photo, "sm");
    li.appendChild(avatar);
    const nameSpan = document.createElement("span");
    nameSpan.className = "contact-row-name";
    nameSpan.textContent = contact.name;
    li.appendChild(nameSpan);
    const chevron = document.createElement("span");
    chevron.className = "contact-row-chevron";
    chevron.textContent = "\u203A";
    li.appendChild(chevron);
    li.addEventListener("click", () => {
      if (activeRow) activeRow.classList.remove("contact-row-active");
      li.classList.add("contact-row-active");
      activeRow = li;
      showDetail(contact, detailPanel);
    });
    list.appendChild(li);
  }
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    for (const row of list.children) {
      const el = row;
      const text = (el.getAttribute("data-name") ?? "") + " " + (el.getAttribute("data-search") ?? "");
      el.style.display = text.toLowerCase().includes(query) ? "" : "none";
    }
  });
  listPanel.appendChild(list);
  body.appendChild(listPanel);
  body.appendChild(detailPanel);
  wrapper.appendChild(body);
  container.appendChild(wrapper);
  if (contacts.length > 0) {
    list.children[0].click();
  }
}
export {
  renderContacts
};

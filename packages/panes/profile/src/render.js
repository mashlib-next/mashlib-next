import { FOAF, VCARD, SCHEMA, RDF, RDFS, SPACE, SOLID, ORG } from "@mashlib-next/utils";
import { labelFromUri, createNavLink } from "@mashlib-next/utils";
import { lit, Statement as RdfStatement } from "rdflib";
function getName(subject, store) {
  return store.any(subject, VCARD("fn"), null, null)?.value ?? store.any(subject, FOAF("name"), null, null)?.value ?? store.any(subject, SCHEMA("name"), null, null)?.value ?? labelFromUri(subject.value);
}
function getPhoto(subject, store) {
  return store.any(subject, VCARD("hasPhoto"), null, null)?.value ?? store.any(subject, FOAF("img"), null, null)?.value ?? store.any(subject, SCHEMA("image"), null, null)?.value ?? store.any(subject, FOAF("depiction"), null, null)?.value ?? void 0;
}
function getPronouns(subject, store) {
  const subjectPronoun = store.any(subject, SOLID("preferredSubjectPronoun"), null, null)?.value;
  if (!subjectPronoun) return void 0;
  let pronouns = subjectPronoun;
  const objectPronoun = store.any(subject, SOLID("preferredObjectPronoun"), null, null)?.value;
  if (objectPronoun) {
    pronouns += "/" + objectPronoun;
    const relativePronoun = store.any(subject, SOLID("preferredRelativePronoun"), null, null)?.value;
    if (relativePronoun) {
      pronouns += "/" + relativePronoun;
    }
  }
  return pronouns;
}
function getLocation(subject, store) {
  const addressNode = store.any(subject, VCARD("hasAddress"), null, null);
  if (!addressNode) return void 0;
  const addr = addressNode;
  const locality = store.any(addr, VCARD("locality"), null, null)?.value;
  const region = store.any(addr, VCARD("region"), null, null)?.value;
  const country = store.any(addr, VCARD("country-name"), null, null)?.value;
  const parts = [locality, region, country].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : void 0;
}
function getSocialAccounts(subject, store) {
  const accounts = [];
  const accountNodes = store.each(subject, FOAF("account"), null, null);
  for (const node of accountNodes) {
    const acct = node;
    const name = store.any(acct, FOAF("name"), null, null)?.value ?? store.any(acct, RDFS("label"), null, null)?.value ?? labelFromUri(acct.value);
    const homepage = store.any(acct, FOAF("homepage"), null, null)?.value ?? acct.value;
    accounts.push({ name, uri: homepage });
  }
  return accounts;
}
function getPhones(subject, store) {
  const phones = [];
  const phoneNodes = store.each(subject, VCARD("hasTelephone"), null, null);
  for (const node of phoneNodes) {
    const phoneValue = store.any(node, VCARD("value"), null, null)?.value;
    if (phoneValue) {
      phones.push(phoneValue);
    } else if (node.value.startsWith("tel:")) {
      phones.push(node.value);
    }
  }
  return phones;
}
function getEmails(subject, store) {
  const emails = [];
  const emailNodes = store.each(subject, VCARD("hasEmail"), null, null);
  for (const node of emailNodes) {
    const emailValue = store.any(node, VCARD("value"), null, null)?.value;
    if (emailValue) {
      emails.push(emailValue);
    } else if (node.value.startsWith("mailto:")) {
      emails.push(node.value);
    }
  }
  if (emails.length === 0) {
    const mbox = store.any(subject, FOAF("mbox"), null, null)?.value;
    if (mbox) emails.push(mbox);
  }
  return emails;
}
function getRoles(subject, store) {
  const memberships = store.each(null, ORG("member"), subject, null);
  const current = [];
  const past = [];
  for (const membership of memberships) {
    const m = membership;
    const orgNode = store.any(m, ORG("organization"), null, null);
    const orgName = orgNode ? store.any(orgNode, SCHEMA("name"), null, null)?.value ?? store.any(orgNode, FOAF("name"), null, null)?.value ?? labelFromUri(orgNode.value) : "";
    const roleNode = store.any(m, ORG("role"), null, null);
    const roleText0 = store.any(m, VCARD("role"), null, null)?.value;
    const roleName = roleNode ? store.any(roleNode, SCHEMA("name"), null, null)?.value : void 0;
    const roleText = roleText0 && roleName ? `${roleName} - ${roleText0}` : roleText0 || roleName || "";
    const startDate = store.any(m, SCHEMA("startDate"), null, null)?.value;
    const endDate = store.any(m, SCHEMA("endDate"), null, null)?.value;
    const dates = startDate ? `${startDate.slice(0, 10)} \u2013 ${endDate ? endDate.slice(0, 10) : "present"}` : "";
    const role = { orgName, roleText, dates };
    if (store.holds(m, RDF("type"), SOLID("PastRole"))) {
      past.push(role);
    } else {
      current.push(role);
    }
  }
  return { current, past };
}
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function addDetail(parent, label, value, isLink = false) {
  if (!value) return;
  const row = document.createElement("div");
  row.className = "profile-detail";
  const labelEl = document.createElement("span");
  labelEl.className = "profile-label";
  labelEl.textContent = label;
  row.appendChild(labelEl);
  if (isLink && (value.startsWith("http://") || value.startsWith("https://"))) {
    const link = document.createElement("a");
    link.href = value;
    link.textContent = labelFromUri(value);
    link.target = "_blank";
    link.rel = "noopener";
    row.appendChild(link);
  } else if (isLink && value.startsWith("mailto:")) {
    const link = document.createElement("a");
    link.href = value;
    link.textContent = value.replace("mailto:", "");
    row.appendChild(link);
  } else if (isLink && value.startsWith("tel:")) {
    const link = document.createElement("a");
    link.href = value;
    link.textContent = value.replace("tel:", "");
    row.appendChild(link);
  } else {
    const valueEl = document.createElement("span");
    valueEl.className = "profile-value";
    valueEl.textContent = value;
    row.appendChild(valueEl);
  }
  parent.appendChild(row);
}
const EDITABLE_FIELDS = [
  { label: "Name", predicate: VCARD("fn") },
  { label: "Nickname", predicate: FOAF("nick") },
  { label: "Photo URL", predicate: VCARD("hasPhoto"), inputType: "url" },
  { label: "Role", predicate: VCARD("role") },
  { label: "Organization", predicate: VCARD("organization-name") },
  { label: "Bio", predicate: VCARD("note") }
];
function renderProfile(subject, store, container) {
  container.innerHTML = "";
  const updater = store.updater;
  const fetcher = store.fetcher;
  const canEdit = Boolean(updater && fetcher);
  const card = document.createElement("div");
  card.className = "profile-card";
  if (canEdit) {
    const headerRow = document.createElement("div");
    headerRow.className = "profile-edit-row";
    const editBtn = document.createElement("button");
    editBtn.className = "profile-edit-btn";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      showEditForm(subject, store, container, updater);
    });
    headerRow.appendChild(editBtn);
    card.appendChild(headerRow);
  }
  const photoUrl = getPhoto(subject, store);
  if (photoUrl) {
    const photoEl = document.createElement("img");
    photoEl.className = "profile-photo";
    photoEl.src = photoUrl;
    photoEl.alt = "Profile photo";
    card.appendChild(photoEl);
  }
  const name = getName(subject, store);
  const nameEl = document.createElement("h2");
  nameEl.className = "profile-name";
  nameEl.textContent = name;
  card.appendChild(nameEl);
  const pronouns = getPronouns(subject, store);
  if (pronouns) {
    const pronounsEl = document.createElement("p");
    pronounsEl.className = "profile-pronouns";
    pronounsEl.textContent = pronouns;
    card.appendChild(pronounsEl);
  }
  const nick = store.any(subject, FOAF("nick"), null, null)?.value;
  if (nick) {
    const nickEl = document.createElement("p");
    nickEl.className = "profile-nick";
    nickEl.textContent = `@${nick}`;
    card.appendChild(nickEl);
  }
  const location = getLocation(subject, store);
  if (location) {
    const locEl = document.createElement("p");
    locEl.className = "profile-location";
    locEl.textContent = location;
    card.appendChild(locEl);
  }
  const webidEl = document.createElement("p");
  webidEl.className = "profile-webid";
  const webidLink = document.createElement("a");
  webidLink.href = subject.value;
  webidLink.textContent = subject.value;
  webidLink.target = "_blank";
  webidLink.rel = "noopener";
  webidEl.appendChild(webidLink);
  card.appendChild(webidEl);
  const details = document.createElement("div");
  details.className = "profile-details";
  const role = store.any(subject, VCARD("role"), null, null)?.value;
  const org = store.any(subject, VCARD("organization-name"), null, null)?.value;
  if (role && org) {
    addDetail(details, "Role", `${role}, ${org}`);
  } else {
    addDetail(details, "Role", role);
    addDetail(details, "Organization", org);
  }
  addDetail(details, "Birthday", store.any(subject, VCARD("bday"), null, null)?.value);
  const note = store.any(subject, VCARD("note"), null, null)?.value ?? store.any(subject, FOAF("bio"), null, null)?.value;
  addDetail(details, "About", note?.trim());
  const emails = getEmails(subject, store);
  for (const email of emails) {
    addDetail(details, "Email", email, true);
  }
  const phones = getPhones(subject, store);
  for (const phone of phones) {
    addDetail(details, "Phone", phone, true);
  }
  const homepage = store.any(subject, FOAF("homepage"), null, null)?.value;
  addDetail(details, "Homepage", homepage, true);
  const storage = store.any(subject, SPACE("storage"), null, null)?.value;
  addDetail(details, "Pod", storage, true);
  card.appendChild(details);
  const { current, past } = getRoles(subject, store);
  if (current.length > 0 || past.length > 0) {
    const rolesSection = document.createElement("div");
    rolesSection.className = "profile-roles";
    const rolesHeader = document.createElement("h3");
    rolesHeader.textContent = "Experience";
    rolesSection.appendChild(rolesHeader);
    if (current.length > 0) {
      const currentHeader = document.createElement("h4");
      currentHeader.className = "profile-roles-subheader";
      currentHeader.textContent = "Current";
      rolesSection.appendChild(currentHeader);
      for (const r of current) {
        const roleEl = document.createElement("div");
        roleEl.className = "profile-role-item";
        let html = `<strong class="profile-role-org">${escapeHtml(r.orgName)}</strong>`;
        if (r.roleText) html += ` <span class="profile-role-title">${escapeHtml(r.roleText)}</span>`;
        if (r.dates) html += ` <span class="profile-role-dates">${escapeHtml(r.dates)}</span>`;
        roleEl.innerHTML = html;
        rolesSection.appendChild(roleEl);
      }
    }
    if (past.length > 0) {
      const pastHeader = document.createElement("h4");
      pastHeader.className = "profile-roles-subheader";
      pastHeader.textContent = "Past";
      rolesSection.appendChild(pastHeader);
      for (const r of past) {
        const roleEl = document.createElement("div");
        roleEl.className = "profile-role-item";
        let html = `<strong class="profile-role-org">${escapeHtml(r.orgName)}</strong>`;
        if (r.roleText) html += ` <span class="profile-role-title">${escapeHtml(r.roleText)}</span>`;
        if (r.dates) html += ` <span class="profile-role-dates">${escapeHtml(r.dates)}</span>`;
        roleEl.innerHTML = html;
        rolesSection.appendChild(roleEl);
      }
    }
    card.appendChild(rolesSection);
  }
  const socialAccounts = getSocialAccounts(subject, store);
  if (socialAccounts.length > 0) {
    const socialSection = document.createElement("div");
    socialSection.className = "profile-social";
    const socialHeader = document.createElement("h3");
    socialHeader.textContent = "Social Accounts";
    socialSection.appendChild(socialHeader);
    const socialList = document.createElement("ul");
    socialList.className = "profile-social-list";
    for (const acct of socialAccounts) {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = acct.uri;
      link.textContent = acct.name;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      li.appendChild(link);
      socialList.appendChild(li);
    }
    socialSection.appendChild(socialList);
    card.appendChild(socialSection);
  }
  const knows = store.each(subject, FOAF("knows"), null, null);
  if (knows.length > 0) {
    const friendsSection = document.createElement("div");
    friendsSection.className = "profile-friends";
    const friendsHeader = document.createElement("h3");
    friendsHeader.textContent = `Contacts (${knows.length})`;
    friendsSection.appendChild(friendsHeader);
    const friendsList = document.createElement("ul");
    friendsList.className = "profile-friends-list";
    for (const friend of knows) {
      const li = document.createElement("li");
      const link = createNavLink(friend.value, labelFromUri(friend.value));
      link.title = friend.value;
      li.appendChild(link);
      friendsList.appendChild(li);
    }
    friendsSection.appendChild(friendsList);
    card.appendChild(friendsSection);
  }
  container.appendChild(card);
}
function showEditForm(subject, store, container, updater) {
  container.innerHTML = "";
  const form = document.createElement("div");
  form.className = "profile-edit-form";
  const h2 = document.createElement("h2");
  h2.textContent = "Edit Profile";
  form.appendChild(h2);
  const inputs = /* @__PURE__ */ new Map();
  for (const field of EDITABLE_FIELDS) {
    const currentValue = store.any(subject, field.predicate, null, null)?.value ?? "";
    const group = document.createElement("div");
    group.className = "profile-field-group";
    const label = document.createElement("label");
    label.textContent = field.label;
    group.appendChild(label);
    let input;
    if (field.label === "Bio") {
      input = document.createElement("textarea");
      input.rows = 3;
    } else {
      input = document.createElement("input");
      input.type = field.inputType ?? "text";
    }
    input.className = "profile-field-input";
    input.value = currentValue;
    group.appendChild(input);
    inputs.set(field, input);
    form.appendChild(group);
  }
  const btnRow = document.createElement("div");
  btnRow.className = "profile-edit-actions";
  const saveBtn = document.createElement("button");
  saveBtn.className = "profile-save-btn";
  saveBtn.textContent = "Save";
  const cancelBtn = document.createElement("button");
  cancelBtn.className = "profile-cancel-btn";
  cancelBtn.textContent = "Cancel";
  btnRow.appendChild(saveBtn);
  btnRow.appendChild(cancelBtn);
  form.appendChild(btnRow);
  const status = document.createElement("p");
  status.className = "profile-edit-status";
  form.appendChild(status);
  container.appendChild(form);
  cancelBtn.addEventListener("click", () => {
    renderProfile(subject, store, container);
  });
  saveBtn.addEventListener("click", async () => {
    saveBtn.disabled = true;
    cancelBtn.disabled = true;
    status.textContent = "Saving...";
    status.className = "profile-edit-status";
    try {
      const deletions = [];
      const insertions = [];
      const doc = subject.doc();
      for (const field of EDITABLE_FIELDS) {
        const input = inputs.get(field);
        const newValue = input.value.trim();
        const existing = store.any(subject, field.predicate, null, null);
        if (existing && newValue && existing.value !== newValue) {
          const oldSt = store.match(subject, field.predicate, existing, doc);
          if (oldSt.length > 0) deletions.push(oldSt[0]);
          insertions.push(new RdfStatement(subject, field.predicate, lit(newValue), doc));
        } else if (existing && !newValue) {
          const oldSt = store.match(subject, field.predicate, existing, doc);
          if (oldSt.length > 0) deletions.push(oldSt[0]);
        } else if (!existing && newValue) {
          insertions.push(new RdfStatement(subject, field.predicate, lit(newValue), doc));
        }
      }
      if (deletions.length === 0 && insertions.length === 0) {
        renderProfile(subject, store, container);
        return;
      }
      await new Promise((resolve, reject) => {
        updater.update(deletions, insertions, (uri, ok, errBody) => {
          if (ok) resolve();
          else reject(new Error(errBody ?? "Update failed"));
        });
      });
      status.textContent = "Saved!";
      status.className = "profile-edit-status profile-edit-status-ok";
      setTimeout(() => renderProfile(subject, store, container), 800);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      status.textContent = `Save failed: ${msg}`;
      status.className = "profile-edit-status profile-edit-status-error";
      saveBtn.disabled = false;
      cancelBtn.disabled = false;
    }
  });
}
export {
  renderProfile
};

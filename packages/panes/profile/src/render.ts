import type { NamedNode, Store } from '@mashlib-next/store'
import { FOAF, VCARD, SCHEMA, RDF, RDFS, SPACE, SOLID, ORG } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'

/**
 * Get the best display name for a person.
 */
function getName(subject: NamedNode, store: Store): string {
  return (
    store.any(subject, VCARD('fn'), null, null)?.value ??
    store.any(subject, FOAF('name'), null, null)?.value ??
    store.any(subject, SCHEMA('name'), null, null)?.value ??
    labelFromUri(subject.value)
  )
}

/**
 * Get the profile photo URL.
 */
function getPhoto(subject: NamedNode, store: Store): string | undefined {
  return (
    store.any(subject, VCARD('hasPhoto'), null, null)?.value ??
    store.any(subject, FOAF('img'), null, null)?.value ??
    store.any(subject, SCHEMA('image'), null, null)?.value ??
    store.any(subject, FOAF('depiction'), null, null)?.value ??
    undefined
  )
}

/**
 * Get pronouns from solid: namespace predicates.
 */
function getPronouns(subject: NamedNode, store: Store): string | undefined {
  const subjectPronoun = store.any(subject, SOLID('preferredSubjectPronoun'), null, null)?.value
  if (!subjectPronoun) return undefined

  let pronouns = subjectPronoun
  const objectPronoun = store.any(subject, SOLID('preferredObjectPronoun'), null, null)?.value
  if (objectPronoun) {
    pronouns += '/' + objectPronoun
    const relativePronoun = store.any(subject, SOLID('preferredRelativePronoun'), null, null)?.value
    if (relativePronoun) {
      pronouns += '/' + relativePronoun
    }
  }
  return pronouns
}

/**
 * Get location from vcard:hasAddress.
 */
function getLocation(subject: NamedNode, store: Store): string | undefined {
  const addressNode = store.any(subject, VCARD('hasAddress'), null, null)
  if (!addressNode) return undefined

  const addr = addressNode as NamedNode
  const locality = store.any(addr, VCARD('locality'), null, null)?.value
  const region = store.any(addr, VCARD('region'), null, null)?.value
  const country = store.any(addr, VCARD('country-name'), null, null)?.value

  const parts = [locality, region, country].filter(Boolean)
  return parts.length > 0 ? parts.join(', ') : undefined
}

interface SocialAccount {
  name: string
  uri: string
}

/**
 * Get social media accounts from foaf:account.
 */
function getSocialAccounts(subject: NamedNode, store: Store): SocialAccount[] {
  const accounts: SocialAccount[] = []
  const accountNodes = store.each(subject, FOAF('account'), null, null)

  for (const node of accountNodes) {
    const acct = node as NamedNode
    const name =
      store.any(acct, FOAF('name'), null, null)?.value ??
      store.any(acct, RDFS('label'), null, null)?.value ??
      labelFromUri(acct.value)
    const homepage = store.any(acct, FOAF('homepage'), null, null)?.value ?? acct.value
    accounts.push({ name, uri: homepage })
  }

  return accounts
}

/**
 * Get all phone numbers from vcard:hasTelephone.
 */
function getPhones(subject: NamedNode, store: Store): string[] {
  const phones: string[] = []
  const phoneNodes = store.each(subject, VCARD('hasTelephone'), null, null)

  for (const node of phoneNodes) {
    const phoneValue = store.any(node as NamedNode, VCARD('value'), null, null)?.value
    if (phoneValue) {
      phones.push(phoneValue)
    } else if (node.value.startsWith('tel:')) {
      phones.push(node.value)
    }
  }

  return phones
}

/**
 * Get all email addresses from vcard:hasEmail.
 */
function getEmails(subject: NamedNode, store: Store): string[] {
  const emails: string[] = []
  const emailNodes = store.each(subject, VCARD('hasEmail'), null, null)

  for (const node of emailNodes) {
    const emailValue = store.any(node as NamedNode, VCARD('value'), null, null)?.value
    if (emailValue) {
      emails.push(emailValue)
    } else if (node.value.startsWith('mailto:')) {
      emails.push(node.value)
    }
  }

  if (emails.length === 0) {
    const mbox = store.any(subject, FOAF('mbox'), null, null)?.value
    if (mbox) emails.push(mbox)
  }

  return emails
}

interface Role {
  orgName: string
  roleText: string
  dates: string
}

/**
 * Get work roles from org:member / org:Membership triples.
 */
function getRoles(subject: NamedNode, store: Store): { current: Role[]; past: Role[] } {
  const memberships = store.each(null, ORG('member'), subject, null)
  const current: Role[] = []
  const past: Role[] = []

  for (const membership of memberships) {
    const m = membership as NamedNode
    const orgNode = store.any(m, ORG('organization'), null, null)
    const orgName = orgNode
      ? (store.any(orgNode as NamedNode, SCHEMA('name'), null, null)?.value ??
         store.any(orgNode as NamedNode, FOAF('name'), null, null)?.value ??
         labelFromUri(orgNode.value))
      : ''

    const roleNode = store.any(m, ORG('role'), null, null)
    const roleText0 = store.any(m, VCARD('role'), null, null)?.value
    const roleName = roleNode
      ? store.any(roleNode as NamedNode, SCHEMA('name'), null, null)?.value
      : undefined
    const roleText = (roleText0 && roleName)
      ? `${roleName} - ${roleText0}`
      : (roleText0 || roleName || '')

    const startDate = store.any(m, SCHEMA('startDate'), null, null)?.value
    const endDate = store.any(m, SCHEMA('endDate'), null, null)?.value
    const dates = startDate
      ? `${startDate.slice(0, 10)} – ${endDate ? endDate.slice(0, 10) : 'present'}`
      : ''

    const role: Role = { orgName, roleText, dates }

    if (store.holds(m, RDF('type'), SOLID('PastRole'))) {
      past.push(role)
    } else {
      current.push(role)
    }
  }

  return { current, past }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Helper to create a detail row for the profile card.
 */
function addDetail(
  parent: HTMLElement,
  label: string,
  value: string | undefined,
  isLink = false
): void {
  if (!value) return

  const row = document.createElement('div')
  row.className = 'profile-detail'

  const labelEl = document.createElement('span')
  labelEl.className = 'profile-label'
  labelEl.textContent = label
  row.appendChild(labelEl)

  if (isLink && (value.startsWith('http://') || value.startsWith('https://'))) {
    const link = document.createElement('a')
    link.href = value
    link.textContent = labelFromUri(value)
    link.target = '_blank'
    link.rel = 'noopener'
    row.appendChild(link)
  } else if (isLink && value.startsWith('mailto:')) {
    const link = document.createElement('a')
    link.href = value
    link.textContent = value.replace('mailto:', '')
    row.appendChild(link)
  } else if (isLink && value.startsWith('tel:')) {
    const link = document.createElement('a')
    link.href = value
    link.textContent = value.replace('tel:', '')
    row.appendChild(link)
  } else {
    const valueEl = document.createElement('span')
    valueEl.className = 'profile-value'
    valueEl.textContent = value
    row.appendChild(valueEl)
  }

  parent.appendChild(row)
}

/**
 * Render the profile card into the container element.
 */
export function renderProfile(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  container.innerHTML = ''

  const card = document.createElement('div')
  card.className = 'profile-card'

  // Photo
  const photoUrl = getPhoto(subject, store)
  if (photoUrl) {
    const photoEl = document.createElement('img')
    photoEl.className = 'profile-photo'
    photoEl.src = photoUrl
    photoEl.alt = 'Profile photo'
    card.appendChild(photoEl)
  }

  // Name
  const name = getName(subject, store)
  const nameEl = document.createElement('h2')
  nameEl.className = 'profile-name'
  nameEl.textContent = name
  card.appendChild(nameEl)

  // Pronouns
  const pronouns = getPronouns(subject, store)
  if (pronouns) {
    const pronounsEl = document.createElement('p')
    pronounsEl.className = 'profile-pronouns'
    pronounsEl.textContent = pronouns
    card.appendChild(pronounsEl)
  }

  // Nickname
  const nick = store.any(subject, FOAF('nick'), null, null)?.value
  if (nick) {
    const nickEl = document.createElement('p')
    nickEl.className = 'profile-nick'
    nickEl.textContent = `@${nick}`
    card.appendChild(nickEl)
  }

  // Location
  const location = getLocation(subject, store)
  if (location) {
    const locEl = document.createElement('p')
    locEl.className = 'profile-location'
    locEl.textContent = location
    card.appendChild(locEl)
  }

  // WebID
  const webidEl = document.createElement('p')
  webidEl.className = 'profile-webid'
  const webidLink = document.createElement('a')
  webidLink.href = subject.value
  webidLink.textContent = subject.value
  webidLink.target = '_blank'
  webidLink.rel = 'noopener'
  webidEl.appendChild(webidLink)
  card.appendChild(webidEl)

  // Details section
  const details = document.createElement('div')
  details.className = 'profile-details'

  // Role & Organization (from vcard)
  const role = store.any(subject, VCARD('role'), null, null)?.value
  const org = store.any(subject, VCARD('organization-name'), null, null)?.value
  if (role && org) {
    addDetail(details, 'Role', `${role}, ${org}`)
  } else {
    addDetail(details, 'Role', role)
    addDetail(details, 'Organization', org)
  }

  // Birthday
  addDetail(details, 'Birthday', store.any(subject, VCARD('bday'), null, null)?.value)

  // Note / Bio
  const note =
    store.any(subject, VCARD('note'), null, null)?.value ??
    store.any(subject, FOAF('bio'), null, null)?.value
  addDetail(details, 'About', note?.trim())

  // Emails
  const emails = getEmails(subject, store)
  for (const email of emails) {
    addDetail(details, 'Email', email, true)
  }

  // Phones
  const phones = getPhones(subject, store)
  for (const phone of phones) {
    addDetail(details, 'Phone', phone, true)
  }

  // Homepage
  const homepage = store.any(subject, FOAF('homepage'), null, null)?.value
  addDetail(details, 'Homepage', homepage, true)

  // Storage
  const storage = store.any(subject, SPACE('storage'), null, null)?.value
  addDetail(details, 'Pod', storage, true)

  card.appendChild(details)

  // Work history (org:Membership roles)
  const { current, past } = getRoles(subject, store)
  if (current.length > 0 || past.length > 0) {
    const rolesSection = document.createElement('div')
    rolesSection.className = 'profile-roles'

    const rolesHeader = document.createElement('h3')
    rolesHeader.textContent = 'Experience'
    rolesSection.appendChild(rolesHeader)

    if (current.length > 0) {
      const currentHeader = document.createElement('h4')
      currentHeader.className = 'profile-roles-subheader'
      currentHeader.textContent = 'Current'
      rolesSection.appendChild(currentHeader)

      for (const r of current) {
        const roleEl = document.createElement('div')
        roleEl.className = 'profile-role-item'
        let html = `<strong class="profile-role-org">${escapeHtml(r.orgName)}</strong>`
        if (r.roleText) html += ` <span class="profile-role-title">${escapeHtml(r.roleText)}</span>`
        if (r.dates) html += ` <span class="profile-role-dates">${escapeHtml(r.dates)}</span>`
        roleEl.innerHTML = html
        rolesSection.appendChild(roleEl)
      }
    }

    if (past.length > 0) {
      const pastHeader = document.createElement('h4')
      pastHeader.className = 'profile-roles-subheader'
      pastHeader.textContent = 'Past'
      rolesSection.appendChild(pastHeader)

      for (const r of past) {
        const roleEl = document.createElement('div')
        roleEl.className = 'profile-role-item'
        let html = `<strong class="profile-role-org">${escapeHtml(r.orgName)}</strong>`
        if (r.roleText) html += ` <span class="profile-role-title">${escapeHtml(r.roleText)}</span>`
        if (r.dates) html += ` <span class="profile-role-dates">${escapeHtml(r.dates)}</span>`
        roleEl.innerHTML = html
        rolesSection.appendChild(roleEl)
      }
    }

    card.appendChild(rolesSection)
  }

  // Social accounts
  const socialAccounts = getSocialAccounts(subject, store)
  if (socialAccounts.length > 0) {
    const socialSection = document.createElement('div')
    socialSection.className = 'profile-social'

    const socialHeader = document.createElement('h3')
    socialHeader.textContent = 'Social Accounts'
    socialSection.appendChild(socialHeader)

    const socialList = document.createElement('ul')
    socialList.className = 'profile-social-list'

    for (const acct of socialAccounts) {
      const li = document.createElement('li')
      const link = document.createElement('a')
      link.href = acct.uri
      link.textContent = acct.name
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      li.appendChild(link)
      socialList.appendChild(li)
    }

    socialSection.appendChild(socialList)
    card.appendChild(socialSection)
  }

  // Friends / knows
  const knows = store.each(subject, FOAF('knows'), null, null)
  if (knows.length > 0) {
    const friendsSection = document.createElement('div')
    friendsSection.className = 'profile-friends'

    const friendsHeader = document.createElement('h3')
    friendsHeader.textContent = `Contacts (${knows.length})`
    friendsSection.appendChild(friendsHeader)

    const friendsList = document.createElement('ul')
    friendsList.className = 'profile-friends-list'

    for (const friend of knows) {
      const li = document.createElement('li')
      const link = document.createElement('a')
      link.href = `?uri=${encodeURIComponent(friend.value)}`
      link.textContent = labelFromUri(friend.value)
      link.title = friend.value
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const input = document.getElementById('url-input') as HTMLInputElement | null
        if (input) {
          input.value = friend.value
          input.form?.dispatchEvent(new Event('submit', { cancelable: true }))
        }
      })
      li.appendChild(link)
      friendsList.appendChild(li)
    }

    friendsSection.appendChild(friendsList)
    card.appendChild(friendsSection)
  }

  container.appendChild(card)
}

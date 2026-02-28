import type { NamedNode, Store } from '@mashlib-next/store'
import { VCARD, FOAF, SCHEMA, RDF } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'

interface Contact {
  uri: string
  name: string
  emails: string[]
  phones: string[]
  title?: string
  org?: string
  photo?: string
  address?: string
  note?: string
}

/**
 * Extract the display name for a contact node.
 */
function getContactName(node: NamedNode, store: Store): string {
  return (
    store.any(node, VCARD('fn'), null, null)?.value ??
    store.any(node, FOAF('name'), null, null)?.value ??
    store.any(node, SCHEMA('name'), null, null)?.value ??
    labelFromUri(node.value)
  )
}

/**
 * Extract all emails from a contact. Follows vcard:hasEmail → vcard:value pattern.
 */
function getEmails(node: NamedNode, store: Store): string[] {
  const emails: string[] = []
  const emailNodes = store.each(node, VCARD('hasEmail'), null, null)

  for (const en of emailNodes) {
    const emailValue = store.any(en as NamedNode, VCARD('value'), null, null)?.value
    if (emailValue) {
      emails.push(emailValue)
    } else if (en.value.startsWith('mailto:')) {
      emails.push(en.value)
    }
  }

  if (emails.length === 0) {
    const mbox = store.any(node, FOAF('mbox'), null, null)?.value
    if (mbox) emails.push(mbox)
  }

  return emails
}

/**
 * Extract all phones from a contact. Follows vcard:hasTelephone → vcard:value pattern.
 */
function getPhones(node: NamedNode, store: Store): string[] {
  const phones: string[] = []
  const phoneNodes = store.each(node, VCARD('hasTelephone'), null, null)

  for (const pn of phoneNodes) {
    const phoneValue = store.any(pn as NamedNode, VCARD('value'), null, null)?.value
    if (phoneValue) {
      phones.push(phoneValue)
    } else if (pn.value.startsWith('tel:')) {
      phones.push(pn.value)
    }
  }

  return phones
}

/**
 * Extract address from vcard:hasAddress.
 */
function getAddress(node: NamedNode, store: Store): string | undefined {
  const addrNode = store.any(node, VCARD('hasAddress'), null, null)
  if (!addrNode) return undefined

  const addr = addrNode as NamedNode
  const street = store.any(addr, VCARD('street-address'), null, null)?.value
  const locality = store.any(addr, VCARD('locality'), null, null)?.value
  const region = store.any(addr, VCARD('region'), null, null)?.value
  const postalCode = store.any(addr, VCARD('postal-code'), null, null)?.value
  const country = store.any(addr, VCARD('country-name'), null, null)?.value

  const parts = [street, locality, region, postalCode, country].filter(Boolean)
  return parts.length > 0 ? parts.join(', ') : undefined
}

/**
 * Collect all contacts from the address book, including nested groups.
 */
function getContacts(subject: NamedNode, store: Store): Contact[] {
  const members = store.each(subject, VCARD('hasMember'), null, null)
  const contacts: Contact[] = []

  for (const member of members) {
    const node = member as NamedNode

    // Check if this member is itself a group — skip and recurse
    if (store.holds(node, RDF('type'), VCARD('Group'))) {
      const nested = getContacts(node, store)
      contacts.push(...nested)
      continue
    }

    contacts.push({
      uri: node.value,
      name: getContactName(node, store),
      emails: getEmails(node, store),
      phones: getPhones(node, store),
      title: store.any(node, VCARD('title'), null, null)?.value ?? undefined,
      org: store.any(node, VCARD('organization-name'), null, null)?.value ?? undefined,
      photo:
        store.any(node, VCARD('hasPhoto'), null, null)?.value ??
        store.any(node, FOAF('img'), null, null)?.value ??
        undefined,
      address: getAddress(node, store),
      note: store.any(node, VCARD('note'), null, null)?.value ?? undefined,
    })
  }

  contacts.sort((a, b) => a.name.localeCompare(b.name))
  return contacts
}

/**
 * Get contact groups from the address book.
 */
function getGroups(subject: NamedNode, store: Store): { name: string; count: number; uri: string }[] {
  const groups: { name: string; count: number; uri: string }[] = []
  const members = store.each(subject, VCARD('hasMember'), null, null)

  for (const member of members) {
    const node = member as NamedNode
    if (store.holds(node, RDF('type'), VCARD('Group'))) {
      const name = getContactName(node, store)
      const count = store.each(node, VCARD('hasMember'), null, null).length
      groups.push({ name, count, uri: node.value })
    }
  }

  groups.sort((a, b) => a.name.localeCompare(b.name))
  return groups
}

/**
 * Get the address book title.
 */
function getTitle(subject: NamedNode, store: Store): string {
  return (
    store.any(subject, VCARD('fn'), null, null)?.value ??
    store.any(subject, SCHEMA('name'), null, null)?.value ??
    'Address Book'
  )
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Render the contacts list into the container.
 */
export function renderContacts(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  container.innerHTML = ''

  const wrapper = document.createElement('div')
  wrapper.className = 'contacts-view'

  // Header
  const title = getTitle(subject, store)
  const header = document.createElement('h2')
  header.className = 'contacts-title'
  header.textContent = title
  wrapper.appendChild(header)

  const contacts = getContacts(subject, store)
  const groups = getGroups(subject, store)

  // Count
  const countEl = document.createElement('p')
  countEl.className = 'contacts-count'
  countEl.textContent = `${contacts.length} contact${contacts.length !== 1 ? 's' : ''}`
  wrapper.appendChild(countEl)

  // Search/filter
  if (contacts.length > 5) {
    const searchInput = document.createElement('input')
    searchInput.className = 'contacts-search'
    searchInput.type = 'search'
    searchInput.placeholder = 'Filter contacts...'
    searchInput.setAttribute('aria-label', 'Filter contacts')
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase()
      const cards = wrapper.querySelectorAll('.contact-card')
      for (const card of cards) {
        const el = card as HTMLElement
        const name = el.getAttribute('data-name') ?? ''
        el.style.display = name.toLowerCase().includes(query) ? '' : 'none'
      }
    })
    wrapper.appendChild(searchInput)
  }

  // Groups (if any)
  if (groups.length > 0) {
    const groupsSection = document.createElement('div')
    groupsSection.className = 'contacts-groups'

    const groupsHeader = document.createElement('h3')
    groupsHeader.textContent = 'Groups'
    groupsSection.appendChild(groupsHeader)

    const groupList = document.createElement('ul')
    groupList.className = 'contacts-group-list'

    for (const group of groups) {
      const li = document.createElement('li')
      li.className = 'contacts-group-item'
      const link = document.createElement('a')
      link.href = `?uri=${encodeURIComponent(group.uri)}`
      link.textContent = `${group.name} (${group.count})`
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const input = document.getElementById('url-input') as HTMLInputElement | null
        if (input) {
          input.value = group.uri
          input.form?.dispatchEvent(new Event('submit', { cancelable: true }))
        }
      })
      li.appendChild(link)
      groupList.appendChild(li)
    }

    groupsSection.appendChild(groupList)
    wrapper.appendChild(groupsSection)
  }

  if (contacts.length === 0) {
    const empty = document.createElement('p')
    empty.className = 'contacts-empty'
    empty.textContent = 'No contacts found.'
    wrapper.appendChild(empty)
    container.appendChild(wrapper)
    return
  }

  // Contact list
  const list = document.createElement('ul')
  list.className = 'contacts-list'

  for (const contact of contacts) {
    const li = document.createElement('li')
    li.className = 'contact-card'
    li.setAttribute('data-name', contact.name)

    // Photo
    if (contact.photo) {
      const photo = document.createElement('img')
      photo.className = 'contact-photo'
      photo.src = contact.photo
      photo.alt = contact.name
      li.appendChild(photo)
    } else {
      const placeholder = document.createElement('div')
      placeholder.className = 'contact-photo-placeholder'
      placeholder.textContent = contact.name.charAt(0).toUpperCase()
      li.appendChild(placeholder)
    }

    // Info
    const info = document.createElement('div')
    info.className = 'contact-info'

    const nameLink = document.createElement('a')
    nameLink.className = 'contact-name'
    nameLink.href = `?uri=${encodeURIComponent(contact.uri)}`
    nameLink.textContent = contact.name
    nameLink.title = contact.uri
    nameLink.addEventListener('click', (e) => {
      e.preventDefault()
      const input = document.getElementById('url-input') as HTMLInputElement | null
      if (input) {
        input.value = contact.uri
        input.form?.dispatchEvent(new Event('submit', { cancelable: true }))
      }
    })
    info.appendChild(nameLink)

    // Title
    if (contact.title) {
      const titleEl = document.createElement('span')
      titleEl.className = 'contact-title'
      titleEl.textContent = contact.title
      info.appendChild(titleEl)
    }

    if (contact.org) {
      const orgEl = document.createElement('span')
      orgEl.className = 'contact-org'
      orgEl.textContent = contact.org
      info.appendChild(orgEl)
    }

    // Emails
    for (const email of contact.emails) {
      const emailEl = document.createElement('a')
      emailEl.className = 'contact-email'
      const addr = email.replace('mailto:', '')
      emailEl.href = email.startsWith('mailto:') ? email : `mailto:${addr}`
      emailEl.textContent = addr
      info.appendChild(emailEl)
    }

    // Phones
    for (const phone of contact.phones) {
      const phoneEl = document.createElement('a')
      phoneEl.className = 'contact-phone'
      const num = phone.replace('tel:', '')
      phoneEl.href = phone.startsWith('tel:') ? phone : `tel:${num}`
      phoneEl.textContent = num
      info.appendChild(phoneEl)
    }

    // Address
    if (contact.address) {
      const addrEl = document.createElement('span')
      addrEl.className = 'contact-address'
      addrEl.textContent = contact.address
      info.appendChild(addrEl)
    }

    // Note
    if (contact.note) {
      const noteEl = document.createElement('p')
      noteEl.className = 'contact-note'
      noteEl.textContent = contact.note
      info.appendChild(noteEl)
    }

    li.appendChild(info)
    list.appendChild(li)
  }

  wrapper.appendChild(list)
  container.appendChild(wrapper)
}

import type { NamedNode, Store } from '@mashlib-next/store'
import { FOAF, VCARD, SCHEMA, RDF, SPACE } from '@mashlib-next/utils'
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

  // Nickname
  const nick = store.any(subject, FOAF('nick'), null, null)?.value
  if (nick) {
    const nickEl = document.createElement('p')
    nickEl.className = 'profile-nick'
    nickEl.textContent = `@${nick}`
    card.appendChild(nickEl)
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

  // Role & Organization
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

  // Email
  const emailNode = store.any(subject, VCARD('hasEmail'), null, null)
  if (emailNode) {
    const emailValue = store.any(emailNode as NamedNode, VCARD('value'), null, null)?.value
    addDetail(details, 'Email', emailValue, true)
  }

  // Storage
  const storage = store.any(subject, SPACE('storage'), null, null)?.value
  addDetail(details, 'Pod', storage, true)

  card.appendChild(details)

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

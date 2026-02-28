import type { NamedNode, Store } from '@mashlib-next/store'
import { SCHEMA, FOAF, DCT } from '@mashlib-next/utils'
import { labelFromUri, createNavLink } from '@mashlib-next/utils'

/**
 * Helper to create a detail row.
 */
function addDetail(
  parent: HTMLElement,
  label: string,
  value: string | undefined,
  isLink = false
): void {
  if (!value) return

  const row = document.createElement('div')
  row.className = 'org-detail'

  const labelEl = document.createElement('span')
  labelEl.className = 'org-label'
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
    valueEl.className = 'org-value'
    valueEl.textContent = value
    row.appendChild(valueEl)
  }

  parent.appendChild(row)
}

/**
 * Render the organization card into the container.
 */
export function renderOrganization(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  container.innerHTML = ''

  const card = document.createElement('div')
  card.className = 'org-card'

  // Logo
  const logoUrl =
    store.any(subject, SCHEMA('logo'), null, null)?.value ??
    store.any(subject, FOAF('logo'), null, null)?.value ??
    store.any(subject, FOAF('img'), null, null)?.value
  if (logoUrl) {
    const logo = document.createElement('img')
    logo.className = 'org-logo'
    logo.src = logoUrl
    logo.alt = 'Organization logo'
    card.appendChild(logo)
  }

  // Name
  const name =
    store.any(subject, SCHEMA('name'), null, null)?.value ??
    store.any(subject, FOAF('name'), null, null)?.value ??
    store.any(subject, DCT('title'), null, null)?.value ??
    labelFromUri(subject.value)

  const nameEl = document.createElement('h2')
  nameEl.className = 'org-name'
  nameEl.textContent = name
  card.appendChild(nameEl)

  // Description
  const description =
    store.any(subject, SCHEMA('description'), null, null)?.value ??
    store.any(subject, DCT('description'), null, null)?.value
  if (description) {
    const descEl = document.createElement('p')
    descEl.className = 'org-description'
    descEl.textContent = description
    card.appendChild(descEl)
  }

  // Details section
  const details = document.createElement('div')
  details.className = 'org-details'

  // Website
  const url = store.any(subject, SCHEMA('url'), null, null)?.value
  addDetail(details, 'Website', url, true)

  // Email
  const email = store.any(subject, SCHEMA('email'), null, null)?.value
  addDetail(details, 'Email', email, true)

  // Phone
  const phone = store.any(subject, SCHEMA('telephone'), null, null)?.value
  addDetail(details, 'Phone', phone)

  // Address
  const addressNode = store.any(subject, SCHEMA('address'), null, null)
  if (addressNode) {
    // Can be a literal or a structured PostalAddress
    const street = store.any(addressNode as NamedNode, SCHEMA('streetAddress'), null, null)?.value
    const locality = store.any(addressNode as NamedNode, SCHEMA('addressLocality'), null, null)?.value
    const region = store.any(addressNode as NamedNode, SCHEMA('addressRegion'), null, null)?.value
    const country = store.any(addressNode as NamedNode, SCHEMA('addressCountry'), null, null)?.value

    if (street || locality) {
      const parts = [street, locality, region, country].filter(Boolean)
      addDetail(details, 'Address', parts.join(', '))
    } else {
      // Literal address
      addDetail(details, 'Address', addressNode.value)
    }
  }

  // Founded
  const founded = store.any(subject, SCHEMA('foundingDate'), null, null)?.value
  addDetail(details, 'Founded', founded)

  // Number of employees
  const numEmployees = store.any(subject, SCHEMA('numberOfEmployees'), null, null)?.value
  addDetail(details, 'Employees', numEmployees)

  card.appendChild(details)

  // Members / employees
  const members = store.each(subject, SCHEMA('member'), null, null)
  const employees = store.each(subject, SCHEMA('employee'), null, null)
  const allPeople = [...members, ...employees]

  if (allPeople.length > 0) {
    const peopleSection = document.createElement('div')
    peopleSection.className = 'org-people'

    const header = document.createElement('h3')
    header.textContent = `People (${allPeople.length})`
    peopleSection.appendChild(header)

    const list = document.createElement('ul')
    list.className = 'org-people-list'

    for (const person of allPeople) {
      const personName =
        store.any(person as NamedNode, SCHEMA('name'), null, null)?.value ??
        store.any(person as NamedNode, FOAF('name'), null, null)?.value ??
        labelFromUri(person.value)

      const li = document.createElement('li')
      const link = createNavLink(person.value, personName)
      link.title = person.value
      li.appendChild(link)
      list.appendChild(li)
    }

    peopleSection.appendChild(list)
    card.appendChild(peopleSection)
  }

  container.appendChild(card)
}

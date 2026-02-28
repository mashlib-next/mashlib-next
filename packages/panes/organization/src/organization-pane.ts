import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, SCHEMA, FOAF } from '@mashlib-next/utils'
import { renderOrganization } from './render.js'

const ORG_TYPES = [
  SCHEMA('Organization'),
  SCHEMA('Corporation'),
  SCHEMA('GovernmentOrganization'),
  SCHEMA('NGO'),
  SCHEMA('EducationalOrganization'),
  SCHEMA('LocalBusiness'),
  FOAF('Organization'),
  FOAF('Group'),
]

function isOrganization(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)

  for (const orgType of ORG_TYPES) {
    if (typeUris.includes(orgType.value)) return true
  }

  return false
}

export const organizationPane: Pane = {
  label: 'Organization',
  icon: '\u{1F3E2}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isOrganization(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderOrganization(subject, store, container)
  },
}

import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, WF, TRACKER } from '@mashlib-next/utils'
import { renderIssue } from './render.js'

const ISSUE_TYPES = [
  WF('Tracker').value,
  WF('Issue').value,
  TRACKER('Tracker').value,
  TRACKER('Issue').value,
]

function isIssue(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)

  for (const t of ISSUE_TYPES) {
    if (typeUris.includes(t)) return true
  }

  // Duck-typing: has wf:issue (tracker has issues) or wf:state (issue has state)
  if (store.any(subject, WF('issue'), null, null)) return true
  if (store.any(subject, WF('state'), null, null)) return true

  return false
}

export const issuePane: Pane = {
  label: 'Issues',
  icon: '\u{1F4CB}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isIssue(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderIssue(subject, store, container)
  },
}

import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, WF, TRACKER, DCT, SCHEMA, RDFS } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'

/**
 * Determine if the subject is a tracker (container of issues) or a single issue.
 */
function isTracker(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null).map(t => t.value)
  if (types.includes(WF('Tracker').value)) return true
  if (types.includes(TRACKER('Tracker').value)) return true
  // Duck-typing: has wf:issue children
  if (store.any(subject, WF('issue'), null, null)) return true
  return false
}

/**
 * Get a human-readable label for a state URI.
 */
function stateLabel(uri: string): string {
  const fragment = uri.split('#').pop() ?? uri.split('/').pop() ?? uri
  // Convert camelCase to spaced words
  return fragment.replace(/([a-z])([A-Z])/g, '$1 $2')
}

/**
 * Get a CSS class for the state for color coding.
 */
function stateClass(uri: string): string {
  const lower = uri.toLowerCase()
  if (lower.includes('open') || lower.includes('new')) return 'issue-state-open'
  if (lower.includes('closed') || lower.includes('done') || lower.includes('resolved') || lower.includes('fixed')) return 'issue-state-closed'
  if (lower.includes('progress') || lower.includes('active')) return 'issue-state-active'
  return 'issue-state-default'
}

/**
 * Render a single issue.
 */
function renderSingleIssue(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  const wrapper = document.createElement('div')
  wrapper.className = 'issue-view'

  // Title
  const title =
    store.any(subject, DCT('title'), null, null)?.value ??
    store.any(subject, SCHEMA('name'), null, null)?.value ??
    store.any(subject, RDFS('label'), null, null)?.value ??
    labelFromUri(subject.value)

  const titleEl = document.createElement('h2')
  titleEl.className = 'issue-title'
  titleEl.textContent = title
  wrapper.appendChild(titleEl)

  // State badge
  const stateNode = store.any(subject, WF('state'), null, null)
  if (stateNode) {
    const badge = document.createElement('span')
    badge.className = `issue-state ${stateClass(stateNode.value)}`
    badge.textContent = stateLabel(stateNode.value)
    wrapper.appendChild(badge)
  }

  // Details
  const details = document.createElement('div')
  details.className = 'issue-details'

  // Assignee
  const assignee = store.any(subject, WF('assignee'), null, null)
  if (assignee) {
    const assigneeName =
      store.any(assignee as NamedNode, SCHEMA('name'), null, null)?.value ??
      labelFromUri(assignee.value)
    const row = document.createElement('div')
    row.className = 'issue-detail'
    row.innerHTML = `<span class="issue-label">Assignee</span><span class="issue-value">${assigneeName}</span>`
    details.appendChild(row)
  }

  // Priority
  const priority =
    store.any(subject, WF('priority'), null, null)?.value ??
    store.any(subject, SCHEMA('priority'), null, null)?.value
  if (priority) {
    const row = document.createElement('div')
    row.className = 'issue-detail'
    row.innerHTML = `<span class="issue-label">Priority</span><span class="issue-value">${stateLabel(priority)}</span>`
    details.appendChild(row)
  }

  // Created
  const created =
    store.any(subject, DCT('created'), null, null)?.value ??
    store.any(subject, SCHEMA('dateCreated'), null, null)?.value
  if (created) {
    const row = document.createElement('div')
    row.className = 'issue-detail'
    const date = new Date(created)
    const formatted = isNaN(date.getTime()) ? created : date.toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
    })
    row.innerHTML = `<span class="issue-label">Created</span><span class="issue-value">${formatted}</span>`
    details.appendChild(row)
  }

  if (details.children.length > 0) {
    wrapper.appendChild(details)
  }

  // Description
  const description =
    store.any(subject, DCT('description'), null, null)?.value ??
    store.any(subject, SCHEMA('description'), null, null)?.value ??
    store.any(subject, RDFS('comment'), null, null)?.value
  if (description) {
    const descEl = document.createElement('div')
    descEl.className = 'issue-description'
    descEl.textContent = description
    wrapper.appendChild(descEl)
  }

  container.appendChild(wrapper)
}

/**
 * Render a tracker (list of issues).
 */
function renderTracker(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  const wrapper = document.createElement('div')
  wrapper.className = 'tracker-view'

  // Title
  const title =
    store.any(subject, DCT('title'), null, null)?.value ??
    store.any(subject, SCHEMA('name'), null, null)?.value ??
    store.any(subject, RDFS('label'), null, null)?.value ??
    labelFromUri(subject.value)

  const titleEl = document.createElement('h2')
  titleEl.className = 'tracker-title'
  titleEl.textContent = title
  wrapper.appendChild(titleEl)

  // Description
  const description =
    store.any(subject, DCT('description'), null, null)?.value ??
    store.any(subject, SCHEMA('description'), null, null)?.value
  if (description) {
    const descEl = document.createElement('p')
    descEl.className = 'tracker-description'
    descEl.textContent = description
    wrapper.appendChild(descEl)
  }

  // Issues list
  const issues = store.each(subject, WF('issue'), null, null)

  const countEl = document.createElement('p')
  countEl.className = 'tracker-count'
  countEl.textContent = `${issues.length} issue${issues.length !== 1 ? 's' : ''}`
  wrapper.appendChild(countEl)

  if (issues.length === 0) {
    const empty = document.createElement('p')
    empty.className = 'tracker-empty'
    empty.textContent = 'No issues found.'
    wrapper.appendChild(empty)
  } else {
    const list = document.createElement('ul')
    list.className = 'tracker-issues'

    for (const issue of issues) {
      const issueNode = issue as NamedNode
      const li = document.createElement('li')
      li.className = 'tracker-issue'

      // State badge
      const state = store.any(issueNode, WF('state'), null, null)
      if (state) {
        const badge = document.createElement('span')
        badge.className = `issue-state ${stateClass(state.value)}`
        badge.textContent = stateLabel(state.value)
        li.appendChild(badge)
      }

      // Issue title
      const issueTitle =
        store.any(issueNode, DCT('title'), null, null)?.value ??
        store.any(issueNode, SCHEMA('name'), null, null)?.value ??
        labelFromUri(issueNode.value)

      const link = document.createElement('a')
      link.className = 'tracker-issue-title'
      link.href = issueNode.value
      link.textContent = issueTitle
      li.appendChild(link)

      // Assignee inline
      const assignee = store.any(issueNode, WF('assignee'), null, null)
      if (assignee) {
        const assigneeName =
          store.any(assignee as NamedNode, SCHEMA('name'), null, null)?.value ??
          labelFromUri(assignee.value)
        const assigneeEl = document.createElement('span')
        assigneeEl.className = 'tracker-issue-assignee'
        assigneeEl.textContent = assigneeName
        li.appendChild(assigneeEl)
      }

      list.appendChild(li)
    }

    wrapper.appendChild(list)
  }

  container.appendChild(wrapper)
}

/**
 * Render issue or tracker into the container.
 */
export function renderIssue(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  container.innerHTML = ''

  if (isTracker(subject, store)) {
    renderTracker(subject, store, container)
  } else {
    renderSingleIssue(subject, store, container)
  }
}

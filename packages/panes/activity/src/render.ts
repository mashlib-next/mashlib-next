import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, AS, SCHEMA, FOAF } from '@mashlib-next/utils'
import { labelFromUri, navigate } from '@mashlib-next/utils'

interface ActivityItem {
  uri: string
  actorName: string | null
  actorUri: string | null
  verb: string
  objectName: string | null
  objectUri: string | null
  summary: string | null
  content: string | null
  published: Date | null
}

/**
 * Get display name for a node.
 */
function getName(node: NamedNode, store: Store): string {
  return (
    store.any(node, AS('name'), null, null)?.value ??
    store.any(node, SCHEMA('name'), null, null)?.value ??
    store.any(node, FOAF('name'), null, null)?.value ??
    labelFromUri(node.value)
  )
}

/**
 * Derive a human-readable verb from the activity type.
 */
function getVerb(subject: NamedNode, store: Store): string {
  const types = store.each(subject, RDF('type'), null, null)
  for (const t of types) {
    const local = labelFromUri(t.value).toLowerCase()
    switch (local) {
      case 'create': return 'created'
      case 'update': return 'updated'
      case 'delete': return 'deleted'
      case 'follow': return 'followed'
      case 'like': return 'liked'
      case 'announce': return 'shared'
      case 'add': return 'added'
      case 'remove': return 'removed'
      case 'accept': return 'accepted'
      case 'reject': return 'rejected'
      case 'undo': return 'undid'
      case 'invite': return 'invited'
      case 'join': return 'joined'
      case 'leave': return 'left'
      case 'offer': return 'offered'
    }
  }
  return 'did something with'
}

/**
 * Parse a single activity.
 */
function parseActivity(subject: NamedNode, store: Store): ActivityItem {
  const actorNode = store.any(subject, AS('actor'), null, null)
  const objectNode = store.any(subject, AS('object'), null, null)
  const publishedStr = store.any(subject, AS('published'), null, null)?.value

  return {
    uri: subject.value,
    actorName: actorNode ? getName(actorNode as NamedNode, store) : null,
    actorUri: actorNode?.value ?? null,
    verb: getVerb(subject, store),
    objectName: objectNode ? getName(objectNode as NamedNode, store) : null,
    objectUri: objectNode?.value ?? null,
    summary: store.any(subject, AS('summary'), null, null)?.value ?? null,
    content: store.any(subject, AS('content'), null, null)?.value ?? null,
    published: publishedStr ? new Date(publishedStr) : null,
  }
}

/**
 * Get items from a collection.
 */
function getCollectionItems(subject: NamedNode, store: Store): NamedNode[] {
  const items = [
    ...store.each(subject, AS('items'), null, null),
    ...store.each(subject, AS('orderedItems'), null, null),
  ]
  return items as NamedNode[]
}

/**
 * Check if this is a collection type.
 */
function isCollection(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null).map(t => t.value)
  return ['Collection', 'OrderedCollection', 'CollectionPage', 'OrderedCollectionPage']
    .some(t => types.includes(AS(t).value))
}

/**
 * Format a date for display.
 */
function formatTime(date: Date): string {
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Render a single activity item.
 */
function renderItem(activity: ActivityItem): HTMLElement {
  const el = document.createElement('div')
  el.className = 'activity-item'

  // Summary line
  const summaryEl = document.createElement('div')
  summaryEl.className = 'activity-summary'

  if (activity.summary) {
    summaryEl.textContent = activity.summary
  } else {
    // Build "Actor verbed Object" sentence
    if (activity.actorName) {
      const actor = document.createElement('a')
      actor.className = 'activity-actor'
      actor.textContent = activity.actorName
      if (activity.actorUri) {
        actor.href = `?uri=${encodeURIComponent(activity.actorUri)}`
        actor.addEventListener('click', (e) => {
          e.preventDefault()
          navigate(activity.actorUri!)
        })
      }
      summaryEl.appendChild(actor)
      summaryEl.appendChild(document.createTextNode(` ${activity.verb} `))
    }

    if (activity.objectName) {
      const obj = document.createElement('a')
      obj.className = 'activity-object'
      obj.textContent = activity.objectName
      if (activity.objectUri) {
        obj.href = `?uri=${encodeURIComponent(activity.objectUri)}`
        obj.addEventListener('click', (e) => {
          e.preventDefault()
          navigate(activity.objectUri!)
        })
      }
      summaryEl.appendChild(obj)
    }
  }

  el.appendChild(summaryEl)

  // Content
  if (activity.content) {
    const contentEl = document.createElement('p')
    contentEl.className = 'activity-content'
    contentEl.textContent = activity.content
    el.appendChild(contentEl)
  }

  // Time
  if (activity.published) {
    const timeEl = document.createElement('time')
    timeEl.className = 'activity-time'
    timeEl.dateTime = activity.published.toISOString()
    timeEl.textContent = formatTime(activity.published)
    el.appendChild(timeEl)
  }

  return el
}

/**
 * Render the activity/collection into the container.
 */
export function renderActivity(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  container.innerHTML = ''

  const wrapper = document.createElement('div')
  wrapper.className = 'activity-view'

  if (isCollection(subject, store)) {
    // Collection view
    const name = store.any(subject, AS('name'), null, null)?.value ?? 'Activities'
    const header = document.createElement('h2')
    header.className = 'activity-title'
    header.textContent = name
    wrapper.appendChild(header)

    const totalItems = store.any(subject, AS('totalItems'), null, null)?.value
    if (totalItems) {
      const countEl = document.createElement('p')
      countEl.className = 'activity-count'
      countEl.textContent = `${totalItems} item${totalItems !== '1' ? 's' : ''}`
      wrapper.appendChild(countEl)
    }

    const items = getCollectionItems(subject, store)
    const timeline = document.createElement('div')
    timeline.className = 'activity-timeline'

    if (items.length === 0) {
      const empty = document.createElement('p')
      empty.className = 'activity-empty'
      empty.textContent = 'No activities.'
      wrapper.appendChild(empty)
    } else {
      for (const item of items) {
        const activity = parseActivity(item, store)
        timeline.appendChild(renderItem(activity))
      }
      wrapper.appendChild(timeline)
    }
  } else {
    // Single activity view
    const activity = parseActivity(subject, store)
    const timeline = document.createElement('div')
    timeline.className = 'activity-timeline'
    timeline.appendChild(renderItem(activity))
    wrapper.appendChild(timeline)
  }

  container.appendChild(wrapper)
}

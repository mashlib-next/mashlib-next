import type { NamedNode, IndexedFormula } from 'rdflib'
import { RDF, SCHEMA } from '@mashlib-next/utils'
import type { Pane } from '@mashlib-next/pane-registry'
import { renderSchedule } from './render.js'

const SCHEDULE_TYPES = [
  SCHEMA('Schedule'),
  SCHEMA('EventSeries'),
  SCHEMA('EventSchedule'),
]

function collectEvents(subject: NamedNode, store: IndexedFormula): NamedNode[] {
  const seen = new Set<string>()
  const events: NamedNode[] = []

  const predicates = [
    SCHEMA('event'),
    SCHEMA('subEvent'),
  ]

  for (const pred of predicates) {
    for (const node of store.each(subject, pred, null, null)) {
      if (node.termType === 'NamedNode' && !seen.has(node.value)) {
        seen.add(node.value)
        events.push(node as NamedNode)
      }
    }
  }

  return events
}

export const schedulePane: Pane = {
  label: 'Schedule',
  icon: '\u{1F4C5}',

  canHandle(subject: NamedNode, store: IndexedFormula): boolean {
    for (const type of SCHEDULE_TYPES) {
      if (store.holds(subject, RDF('type'), type)) return true
    }

    const events = collectEvents(subject, store)
    return events.length >= 2
  },

  render(subject: NamedNode, store: IndexedFormula, container: HTMLElement): void {
    renderSchedule(subject, store, container)
  },
}

export { collectEvents }

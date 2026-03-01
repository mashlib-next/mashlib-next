import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { schedulePane, collectEvents } from '../schedule-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const SCHEMA = Namespace('https://schema.org/')
const RDFS = Namespace('http://www.w3.org/2000/01/rdf-schema#')

describe('schedulePane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('collectEvents', () => {
    it('collects events from schema:event', () => {
      const schedule = sym('https://example.com/schedule')
      const ev1 = sym('https://example.com/event/1')
      const ev2 = sym('https://example.com/event/2')
      store.add(schedule, SCHEMA('event'), ev1, schedule.doc())
      store.add(schedule, SCHEMA('event'), ev2, schedule.doc())

      const events = collectEvents(schedule, store)
      expect(events).toHaveLength(2)
    })

    it('collects events from schema:subEvent', () => {
      const series = sym('https://example.com/series')
      const ev1 = sym('https://example.com/event/1')
      store.add(series, SCHEMA('subEvent'), ev1, series.doc())

      const events = collectEvents(series, store)
      expect(events).toHaveLength(1)
    })

    it('deduplicates events across predicates', () => {
      const schedule = sym('https://example.com/schedule')
      const ev = sym('https://example.com/event/1')
      store.add(schedule, SCHEMA('event'), ev, schedule.doc())
      store.add(schedule, SCHEMA('subEvent'), ev, schedule.doc())

      const events = collectEvents(schedule, store)
      expect(events).toHaveLength(1)
    })
  })

  describe('canHandle', () => {
    it('matches schema:Schedule type', () => {
      const subject = sym('https://example.com/schedule')
      store.add(subject, RDF('type'), SCHEMA('Schedule'), subject.doc())
      expect(schedulePane.canHandle(subject, store)).toBe(true)
    })

    it('matches schema:EventSeries type', () => {
      const subject = sym('https://example.com/series')
      store.add(subject, RDF('type'), SCHEMA('EventSeries'), subject.doc())
      expect(schedulePane.canHandle(subject, store)).toBe(true)
    })

    it('matches schema:EventSchedule type', () => {
      const subject = sym('https://example.com/sched')
      store.add(subject, RDF('type'), SCHEMA('EventSchedule'), subject.doc())
      expect(schedulePane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with 2+ events', () => {
      const subject = sym('https://example.com/cal')
      const ev1 = sym('https://example.com/event/1')
      const ev2 = sym('https://example.com/event/2')
      store.add(subject, SCHEMA('event'), ev1, subject.doc())
      store.add(subject, SCHEMA('event'), ev2, subject.doc())
      expect(schedulePane.canHandle(subject, store)).toBe(true)
    })

    it('rejects resource with only 1 event', () => {
      const subject = sym('https://example.com/cal')
      const ev1 = sym('https://example.com/event/1')
      store.add(subject, SCHEMA('event'), ev1, subject.doc())
      expect(schedulePane.canHandle(subject, store)).toBe(false)
    })

    it('rejects non-schedule resources', () => {
      const subject = sym('https://example.com/person')
      store.add(subject, RDF('type'), SCHEMA('Person'), subject.doc())
      expect(schedulePane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders schedule title and event count', () => {
      const schedule = sym('https://example.com/schedule')
      store.add(schedule, RDF('type'), SCHEMA('Schedule'), schedule.doc())
      store.add(schedule, SCHEMA('name'), lit('Team Meetings'), schedule.doc())

      const ev1 = sym('https://example.com/event/1')
      const ev2 = sym('https://example.com/event/2')
      const ev3 = sym('https://example.com/event/3')
      store.add(schedule, SCHEMA('event'), ev1, schedule.doc())
      store.add(schedule, SCHEMA('event'), ev2, schedule.doc())
      store.add(schedule, SCHEMA('event'), ev3, schedule.doc())
      store.add(ev1, SCHEMA('name'), lit('Standup'), ev1.doc())
      store.add(ev2, SCHEMA('name'), lit('Retro'), ev2.doc())
      store.add(ev3, SCHEMA('name'), lit('Planning'), ev3.doc())

      const container = document.createElement('div')
      schedulePane.render(schedule, store, container)

      expect(container.querySelector('.sched-title')!.textContent).toBe('Team Meetings')
      expect(container.querySelector('.sched-count')!.textContent).toBe('3 events')
    })

    it('renders description when present', () => {
      const schedule = sym('https://example.com/schedule')
      store.add(schedule, RDF('type'), SCHEMA('Schedule'), schedule.doc())
      store.add(schedule, SCHEMA('name'), lit('My Calendar'), schedule.doc())
      store.add(schedule, SCHEMA('description'), lit('Personal events'), schedule.doc())

      const container = document.createElement('div')
      schedulePane.render(schedule, store, container)

      expect(container.querySelector('.sched-description')!.textContent).toBe('Personal events')
    })

    it('renders calendar grid with day headers', () => {
      const schedule = sym('https://example.com/schedule')
      store.add(schedule, RDF('type'), SCHEMA('Schedule'), schedule.doc())
      store.add(schedule, SCHEMA('name'), lit('Calendar'), schedule.doc())

      const container = document.createElement('div')
      schedulePane.render(schedule, store, container)

      const headers = container.querySelectorAll('.sched-day-header')
      expect(headers).toHaveLength(7)
      expect(headers[0].textContent).toBe('Sun')
      expect(headers[6].textContent).toBe('Sat')
    })

    it('renders navigation controls', () => {
      const schedule = sym('https://example.com/schedule')
      store.add(schedule, RDF('type'), SCHEMA('Schedule'), schedule.doc())
      store.add(schedule, SCHEMA('name'), lit('Calendar'), schedule.doc())

      const container = document.createElement('div')
      schedulePane.render(schedule, store, container)

      expect(container.querySelector('.sched-prev')).not.toBeNull()
      expect(container.querySelector('.sched-next')).not.toBeNull()
      expect(container.querySelector('.sched-month-label')).not.toBeNull()
    })

    it('marks days that have events', () => {
      const schedule = sym('https://example.com/schedule')
      store.add(schedule, RDF('type'), SCHEMA('Schedule'), schedule.doc())
      store.add(schedule, SCHEMA('name'), lit('Calendar'), schedule.doc())

      const ev = sym('https://example.com/event/1')
      store.add(schedule, SCHEMA('event'), ev, schedule.doc())
      store.add(ev, SCHEMA('name'), lit('Conference'), ev.doc())
      store.add(ev, SCHEMA('startDate'), lit('2025-07-15T09:00:00'), ev.doc())

      const container = document.createElement('div')
      schedulePane.render(schedule, store, container)

      // Calendar should show July 2025 (month of the event)
      expect(container.querySelector('.sched-month-label')!.textContent).toBe('July 2025')

      const eventDays = container.querySelectorAll('.sched-has-events')
      expect(eventDays.length).toBeGreaterThanOrEqual(1)

      // The day with the event should have an event dot
      const dot = container.querySelector('.sched-has-events .sched-event-dot')
      expect(dot).not.toBeNull()
      expect(dot!.textContent).toBe('1')
    })

    it('navigates to next month', () => {
      const schedule = sym('https://example.com/schedule')
      store.add(schedule, RDF('type'), SCHEMA('Schedule'), schedule.doc())
      store.add(schedule, SCHEMA('name'), lit('Calendar'), schedule.doc())

      const ev = sym('https://example.com/event/1')
      store.add(schedule, SCHEMA('event'), ev, schedule.doc())
      store.add(ev, SCHEMA('name'), lit('Event'), ev.doc())
      store.add(ev, SCHEMA('startDate'), lit('2025-03-10T10:00:00'), ev.doc())

      const container = document.createElement('div')
      schedulePane.render(schedule, store, container)

      expect(container.querySelector('.sched-month-label')!.textContent).toBe('March 2025')

      const nextBtn = container.querySelector('.sched-next') as HTMLButtonElement
      nextBtn.click()

      expect(container.querySelector('.sched-month-label')!.textContent).toBe('April 2025')
    })

    it('navigates to previous month', () => {
      const schedule = sym('https://example.com/schedule')
      store.add(schedule, RDF('type'), SCHEMA('Schedule'), schedule.doc())
      store.add(schedule, SCHEMA('name'), lit('Calendar'), schedule.doc())

      const ev = sym('https://example.com/event/1')
      store.add(schedule, SCHEMA('event'), ev, schedule.doc())
      store.add(ev, SCHEMA('name'), lit('Event'), ev.doc())
      store.add(ev, SCHEMA('startDate'), lit('2025-06-20T10:00:00'), ev.doc())

      const container = document.createElement('div')
      schedulePane.render(schedule, store, container)

      expect(container.querySelector('.sched-month-label')!.textContent).toBe('June 2025')

      const prevBtn = container.querySelector('.sched-prev') as HTMLButtonElement
      prevBtn.click()

      expect(container.querySelector('.sched-month-label')!.textContent).toBe('May 2025')
    })

    it('shows day detail on click', () => {
      const schedule = sym('https://example.com/schedule')
      store.add(schedule, RDF('type'), SCHEMA('Schedule'), schedule.doc())
      store.add(schedule, SCHEMA('name'), lit('Calendar'), schedule.doc())

      const ev = sym('https://example.com/event/1')
      store.add(schedule, SCHEMA('event'), ev, schedule.doc())
      store.add(ev, SCHEMA('name'), lit('Team Lunch'), ev.doc())
      store.add(ev, SCHEMA('startDate'), lit('2025-08-05T12:00:00'), ev.doc())
      store.add(ev, SCHEMA('location'), lit('Cafeteria'), ev.doc())

      const container = document.createElement('div')
      schedulePane.render(schedule, store, container)

      // Click on day 5
      const dayCell = container.querySelector('.sched-has-events') as HTMLElement
      dayCell.click()

      const detail = container.querySelector('.sched-detail')!
      expect(detail.querySelector('.sched-detail-heading')!.textContent).toContain('August 5, 2025')
      expect(detail.querySelector('.sched-event-name')!.textContent).toBe('Team Lunch')
      expect(detail.querySelector('.sched-event-location')!.textContent).toBe('Cafeteria')
    })

    it('renders empty schedule', () => {
      const schedule = sym('https://example.com/schedule')
      store.add(schedule, RDF('type'), SCHEMA('Schedule'), schedule.doc())
      store.add(schedule, SCHEMA('name'), lit('Empty Calendar'), schedule.doc())

      const container = document.createElement('div')
      schedulePane.render(schedule, store, container)

      expect(container.querySelector('.sched-count')!.textContent).toBe('0 events')
    })

    it('uses rdfs:label as fallback title', () => {
      const schedule = sym('https://example.com/schedule')
      store.add(schedule, RDF('type'), SCHEMA('Schedule'), schedule.doc())
      store.add(schedule, RDFS('label'), lit('My Agenda'), schedule.doc())

      const container = document.createElement('div')
      schedulePane.render(schedule, store, container)

      expect(container.querySelector('.sched-title')!.textContent).toBe('My Agenda')
    })
  })
})

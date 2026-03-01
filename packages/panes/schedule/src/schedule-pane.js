import { RDF, SCHEMA } from "@mashlib-next/utils";
import { renderSchedule } from "./render.js";
const SCHEDULE_TYPES = [
  SCHEMA("Schedule"),
  SCHEMA("EventSeries"),
  SCHEMA("EventSchedule")
];
function collectEvents(subject, store) {
  const seen = /* @__PURE__ */ new Set();
  const events = [];
  const predicates = [
    SCHEMA("event"),
    SCHEMA("subEvent")
  ];
  for (const pred of predicates) {
    for (const node of store.each(subject, pred, null, null)) {
      if (node.termType === "NamedNode" && !seen.has(node.value)) {
        seen.add(node.value);
        events.push(node);
      }
    }
  }
  return events;
}
const schedulePane = {
  label: "Schedule",
  icon: "\u{1F4C5}",
  canHandle(subject, store) {
    for (const type of SCHEDULE_TYPES) {
      if (store.holds(subject, RDF("type"), type)) return true;
    }
    const events = collectEvents(subject, store);
    return events.length >= 2;
  },
  render(subject, store, container) {
    renderSchedule(subject, store, container);
  }
};
export {
  collectEvents,
  schedulePane
};

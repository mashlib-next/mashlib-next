import { RDF, SCHEMA } from "@mashlib-next/utils";
import { renderTrip } from "./render.js";
const TRIP_TYPES = [
  "Trip",
  "TouristTrip",
  "Flight",
  "TrainTrip",
  "BusTrip",
  "BoatTrip",
  "TravelAction"
];
function isTrip(subject, store) {
  const types = store.each(subject, RDF("type"), null, null).map((t) => t.value);
  for (const t of TRIP_TYPES) {
    if (types.includes(SCHEMA(t).value)) return true;
  }
  if (store.any(subject, SCHEMA("itinerary"), null, null)) return true;
  const hasDeparture = store.any(subject, SCHEMA("departureTime"), null, null);
  const hasArrival = store.any(subject, SCHEMA("arrivalTime"), null, null);
  if (hasDeparture && hasArrival) return true;
  return false;
}
const tripPane = {
  label: "Trip",
  icon: "\u2708",
  canHandle(subject, store) {
    return isTrip(subject, store);
  },
  render(subject, store, container) {
    renderTrip(subject, store, container);
  }
};
export {
  tripPane
};

import { RDF, SCHEMA, DCT } from "@mashlib-next/utils";
import { labelFromUri } from "@mashlib-next/utils";
function formatDateTime(iso) {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return iso;
  return date.toLocaleString(void 0, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function formatDate(iso) {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return iso;
  return date.toLocaleDateString(void 0, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function placeName(node, store) {
  const name = store.any(node, SCHEMA("name"), null, null)?.value;
  if (name) return name;
  const address = store.any(node, SCHEMA("address"), null, null)?.value;
  if (address && !address.startsWith("http")) return address;
  if (!node.value.startsWith("http")) return node.value;
  return labelFromUri(node.value);
}
function transportLabel(types) {
  for (const t of types) {
    if (t.includes("Flight")) return "Flight";
    if (t.includes("TrainTrip")) return "Train";
    if (t.includes("BusTrip")) return "Bus";
    if (t.includes("BoatTrip")) return "Boat";
  }
  return "Leg";
}
function renderLeg(leg, store, wrapper) {
  const card = document.createElement("div");
  card.className = "trip-leg";
  const types = store.each(leg, RDF("type"), null, null).map((t) => t.value);
  const mode = transportLabel(types);
  const header = document.createElement("div");
  header.className = "trip-leg-header";
  const modeEl = document.createElement("span");
  modeEl.className = "trip-leg-mode";
  modeEl.textContent = mode;
  const identifier = store.any(leg, SCHEMA("flightNumber"), null, null)?.value ?? store.any(leg, SCHEMA("trainNumber"), null, null)?.value ?? store.any(leg, SCHEMA("busNumber"), null, null)?.value ?? store.any(leg, SCHEMA("name"), null, null)?.value;
  if (identifier) {
    modeEl.textContent += ` ${identifier}`;
  }
  header.appendChild(modeEl);
  const provider = store.any(leg, SCHEMA("provider"), null, null) ?? store.any(leg, SCHEMA("airline"), null, null);
  if (provider) {
    const providerName = store.any(provider, SCHEMA("name"), null, null)?.value ?? (provider.value.startsWith("http") ? null : provider.value);
    if (providerName) {
      const provEl = document.createElement("span");
      provEl.className = "trip-leg-provider";
      provEl.textContent = providerName;
      header.appendChild(provEl);
    }
  }
  card.appendChild(header);
  const route = document.createElement("div");
  route.className = "trip-leg-route";
  const depStation = store.any(leg, SCHEMA("departureStation"), null, null) ?? store.any(leg, SCHEMA("departureAirport"), null, null) ?? store.any(leg, SCHEMA("departureStop"), null, null) ?? store.any(leg, SCHEMA("fromLocation"), null, null);
  const arrStation = store.any(leg, SCHEMA("arrivalStation"), null, null) ?? store.any(leg, SCHEMA("arrivalAirport"), null, null) ?? store.any(leg, SCHEMA("arrivalStop"), null, null) ?? store.any(leg, SCHEMA("toLocation"), null, null);
  if (depStation || arrStation) {
    const depName = depStation ? placeName(depStation, store) : "?";
    const arrName = arrStation ? placeName(arrStation, store) : "?";
    route.innerHTML = `<span class="trip-from">${depName}</span><span class="trip-arrow">\u2192</span><span class="trip-to">${arrName}</span>`;
    card.appendChild(route);
  }
  const depTime = store.any(leg, SCHEMA("departureTime"), null, null)?.value;
  const arrTime = store.any(leg, SCHEMA("arrivalTime"), null, null)?.value;
  if (depTime || arrTime) {
    const times = document.createElement("div");
    times.className = "trip-leg-times";
    if (depTime) {
      const dep = document.createElement("span");
      dep.className = "trip-leg-time";
      dep.textContent = `Departs: ${formatDateTime(depTime)}`;
      times.appendChild(dep);
    }
    if (arrTime) {
      const arr = document.createElement("span");
      arr.className = "trip-leg-time";
      arr.textContent = `Arrives: ${formatDateTime(arrTime)}`;
      times.appendChild(arr);
    }
    card.appendChild(times);
  }
  wrapper.appendChild(card);
}
function renderTrip(subject, store, container) {
  container.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "trip-view";
  const name = store.any(subject, SCHEMA("name"), null, null)?.value ?? store.any(subject, DCT("title"), null, null)?.value ?? labelFromUri(subject.value);
  const titleEl = document.createElement("h2");
  titleEl.className = "trip-title";
  titleEl.textContent = name;
  wrapper.appendChild(titleEl);
  const description = store.any(subject, SCHEMA("description"), null, null)?.value ?? store.any(subject, DCT("description"), null, null)?.value;
  if (description) {
    const descEl = document.createElement("p");
    descEl.className = "trip-description";
    descEl.textContent = description;
    wrapper.appendChild(descEl);
  }
  const startDate = store.any(subject, SCHEMA("departureTime"), null, null)?.value ?? store.any(subject, SCHEMA("startDate"), null, null)?.value;
  const endDate = store.any(subject, SCHEMA("arrivalTime"), null, null)?.value ?? store.any(subject, SCHEMA("endDate"), null, null)?.value;
  if (startDate || endDate) {
    const dateEl = document.createElement("p");
    dateEl.className = "trip-dates";
    if (startDate && endDate) {
      dateEl.textContent = `${formatDate(startDate)} \u2014 ${formatDate(endDate)}`;
    } else if (startDate) {
      dateEl.textContent = formatDate(startDate);
    } else if (endDate) {
      dateEl.textContent = `Until ${formatDate(endDate)}`;
    }
    wrapper.appendChild(dateEl);
  }
  const types = store.each(subject, RDF("type"), null, null).map((t) => t.value);
  const isSingleLeg = types.some(
    (t) => t.includes("Flight") || t.includes("TrainTrip") || t.includes("BusTrip") || t.includes("BoatTrip")
  );
  if (isSingleLeg) {
    renderLeg(subject, store, wrapper);
  }
  const legs = store.each(subject, SCHEMA("itinerary"), null, null);
  if (legs.length > 0) {
    const section = document.createElement("div");
    section.className = "trip-itinerary";
    const heading = document.createElement("h3");
    heading.textContent = `Itinerary (${legs.length} leg${legs.length !== 1 ? "s" : ""})`;
    section.appendChild(heading);
    const sortedLegs = [...legs].sort((a, b) => {
      const aTime = store.any(a, SCHEMA("departureTime"), null, null)?.value ?? "";
      const bTime = store.any(b, SCHEMA("departureTime"), null, null)?.value ?? "";
      return aTime.localeCompare(bTime);
    });
    for (const leg of sortedLegs) {
      renderLeg(leg, store, section);
    }
    wrapper.appendChild(section);
  }
  container.appendChild(wrapper);
}
export {
  renderTrip
};

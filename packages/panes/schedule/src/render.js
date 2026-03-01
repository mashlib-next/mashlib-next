import { RDFS, SCHEMA } from "@mashlib-next/utils";
function collectEvents(subject, store) {
  const seen = /* @__PURE__ */ new Set();
  const events = [];
  const predicates = [SCHEMA("event"), SCHEMA("subEvent")];
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
function extractEvent(node, store) {
  const name = store.any(node, SCHEMA("name"), null, null)?.value ?? store.any(node, RDFS("label"), null, null)?.value ?? "Untitled Event";
  const startStr = store.any(node, SCHEMA("startDate"), null, null)?.value ?? null;
  const endStr = store.any(node, SCHEMA("endDate"), null, null)?.value ?? null;
  const locationNode = store.any(node, SCHEMA("location"), null, null);
  let location = "";
  if (locationNode) {
    if (locationNode.termType === "Literal") {
      location = locationNode.value;
    } else if (locationNode.termType === "NamedNode") {
      location = store.any(locationNode, SCHEMA("name"), null, null)?.value ?? store.any(locationNode, RDFS("label"), null, null)?.value ?? locationNode.value;
    }
  }
  return {
    uri: node.value,
    name,
    startDate: startStr ? new Date(startStr) : null,
    endDate: endStr ? new Date(endStr) : null,
    location
  };
}
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay();
}
function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function eventsOnDay(events, year, month, day) {
  const target = new Date(year, month, day);
  return events.filter((e) => {
    if (!e.startDate) return false;
    if (sameDay(e.startDate, target)) return true;
    if (e.endDate && e.startDate <= target && e.endDate >= target) return true;
    return false;
  });
}
function formatTime(d) {
  return d.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
}
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function renderSchedule(subject, store, container) {
  const title = store.any(subject, SCHEMA("name"), null, null)?.value ?? store.any(subject, RDFS("label"), null, null)?.value ?? "Schedule";
  const description = store.any(subject, SCHEMA("description"), null, null)?.value ?? null;
  const eventNodes = collectEvents(subject, store);
  const events = eventNodes.map((n) => extractEvent(n, store));
  const datedEvents = events.filter((e) => e.startDate !== null);
  datedEvents.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  let currentYear;
  let currentMonth;
  if (datedEvents.length > 0) {
    currentYear = datedEvents[0].startDate.getFullYear();
    currentMonth = datedEvents[0].startDate.getMonth();
  } else {
    const now = /* @__PURE__ */ new Date();
    currentYear = now.getFullYear();
    currentMonth = now.getMonth();
  }
  const wrapper = document.createElement("div");
  wrapper.className = "sched-pane";
  container.appendChild(wrapper);
  const titleEl = document.createElement("h2");
  titleEl.className = "sched-title";
  titleEl.textContent = title;
  wrapper.appendChild(titleEl);
  if (description) {
    const descEl = document.createElement("p");
    descEl.className = "sched-description";
    descEl.textContent = description;
    wrapper.appendChild(descEl);
  }
  const countEl = document.createElement("p");
  countEl.className = "sched-count";
  countEl.textContent = `${events.length} event${events.length !== 1 ? "s" : ""}`;
  wrapper.appendChild(countEl);
  const nav = document.createElement("div");
  nav.className = "sched-nav";
  wrapper.appendChild(nav);
  const prevBtn = document.createElement("button");
  prevBtn.className = "sched-prev";
  prevBtn.textContent = "\u2190";
  prevBtn.setAttribute("aria-label", "Previous month");
  const monthLabel = document.createElement("span");
  monthLabel.className = "sched-month-label";
  const nextBtn = document.createElement("button");
  nextBtn.className = "sched-next";
  nextBtn.textContent = "\u2192";
  nextBtn.setAttribute("aria-label", "Next month");
  nav.appendChild(prevBtn);
  nav.appendChild(monthLabel);
  nav.appendChild(nextBtn);
  const calendarEl = document.createElement("div");
  calendarEl.className = "sched-calendar";
  wrapper.appendChild(calendarEl);
  const detailEl = document.createElement("div");
  detailEl.className = "sched-detail";
  wrapper.appendChild(detailEl);
  function renderCalendar() {
    monthLabel.textContent = `${MONTH_NAMES[currentMonth]} ${currentYear}`;
    calendarEl.innerHTML = "";
    for (const day of DAY_HEADERS) {
      const header = document.createElement("div");
      header.className = "sched-day-header";
      header.textContent = day;
      calendarEl.appendChild(header);
    }
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfWeek(currentYear, currentMonth);
    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement("div");
      empty.className = "sched-day sched-day-empty";
      calendarEl.appendChild(empty);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dayEl = document.createElement("div");
      dayEl.className = "sched-day";
      dayEl.setAttribute("data-day", String(d));
      const dayNum = document.createElement("span");
      dayNum.className = "sched-day-num";
      dayNum.textContent = String(d);
      dayEl.appendChild(dayNum);
      const dayEvents = eventsOnDay(events, currentYear, currentMonth, d);
      if (dayEvents.length > 0) {
        dayEl.classList.add("sched-has-events");
        const dot = document.createElement("span");
        dot.className = "sched-event-dot";
        dot.textContent = String(dayEvents.length);
        dayEl.appendChild(dot);
        dayEl.addEventListener("click", () => {
          showDayDetail(d, dayEvents);
        });
      }
      calendarEl.appendChild(dayEl);
    }
    detailEl.innerHTML = "";
  }
  function showDayDetail(day, dayEvents) {
    detailEl.innerHTML = "";
    const heading = document.createElement("h3");
    heading.className = "sched-detail-heading";
    heading.textContent = `${MONTH_NAMES[currentMonth]} ${day}, ${currentYear}`;
    detailEl.appendChild(heading);
    for (const ev of dayEvents) {
      const item = document.createElement("div");
      item.className = "sched-event-item";
      let html = `<span class="sched-event-name">${escapeHtml(ev.name)}</span>`;
      if (ev.startDate) {
        html += ` <span class="sched-event-time">${escapeHtml(formatTime(ev.startDate))}</span>`;
      }
      if (ev.location) {
        html += ` <span class="sched-event-location">${escapeHtml(ev.location)}</span>`;
      }
      item.innerHTML = html;
      detailEl.appendChild(item);
    }
  }
  prevBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });
  nextBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  });
  renderCalendar();
}
export {
  renderSchedule
};

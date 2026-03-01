import { SCHEMA, DCT, FOAF } from "@mashlib-next/utils";
import { labelFromUri } from "@mashlib-next/utils";
function formatDateTime(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return date.toLocaleDateString(void 0, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
  return date.toLocaleString(void 0, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function formatTimeOnly(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleTimeString(void 0, {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function isSameDay(a, b) {
  const da = new Date(a);
  const db = new Date(b);
  return da.getFullYear() === db.getFullYear() && da.getMonth() === db.getMonth() && da.getDate() === db.getDate();
}
function addRow(parent, label, value, isLink = false) {
  if (!value) return;
  const row = document.createElement("div");
  row.className = "event-detail";
  const labelEl = document.createElement("span");
  labelEl.className = "event-label";
  labelEl.textContent = label;
  row.appendChild(labelEl);
  if (isLink && (value.startsWith("http://") || value.startsWith("https://"))) {
    const link = document.createElement("a");
    link.href = value;
    link.textContent = labelFromUri(value);
    link.target = "_blank";
    link.rel = "noopener";
    row.appendChild(link);
  } else {
    const valueEl = document.createElement("span");
    valueEl.className = "event-value";
    valueEl.textContent = value;
    row.appendChild(valueEl);
  }
  parent.appendChild(row);
}
function renderEvent(subject, store, container) {
  container.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "event-view";
  const name = store.any(subject, SCHEMA("name"), null, null)?.value ?? store.any(subject, DCT("title"), null, null)?.value ?? labelFromUri(subject.value);
  const titleEl = document.createElement("h2");
  titleEl.className = "event-title";
  titleEl.textContent = name;
  wrapper.appendChild(titleEl);
  const startDate = store.any(subject, SCHEMA("startDate"), null, null)?.value;
  const endDate = store.any(subject, SCHEMA("endDate"), null, null)?.value;
  if (startDate) {
    let dateText = formatDateTime(startDate);
    if (endDate) {
      if (isSameDay(startDate, endDate)) {
        dateText += ` \u2013 ${formatTimeOnly(endDate)}`;
      } else {
        dateText += ` \u2013 ${formatDateTime(endDate)}`;
      }
    }
    const dateEl = document.createElement("p");
    dateEl.className = "event-date";
    dateEl.textContent = dateText;
    wrapper.appendChild(dateEl);
  }
  const details = document.createElement("div");
  details.className = "event-details";
  const locationNode = store.any(subject, SCHEMA("location"), null, null);
  let locationText;
  if (locationNode) {
    const placeName = store.any(locationNode, SCHEMA("name"), null, null)?.value;
    locationText = placeName ?? locationNode.value;
  }
  addRow(details, "Location", locationText);
  const organizerNode = store.any(subject, SCHEMA("organizer"), null, null);
  if (organizerNode) {
    const organizerName = store.any(organizerNode, SCHEMA("name"), null, null)?.value ?? store.any(organizerNode, FOAF("name"), null, null)?.value ?? labelFromUri(organizerNode.value);
    addRow(details, "Organizer", organizerName);
  }
  const url = store.any(subject, SCHEMA("url"), null, null)?.value;
  addRow(details, "Link", url, true);
  const status = store.any(subject, SCHEMA("eventStatus"), null, null)?.value;
  if (status) {
    addRow(details, "Status", labelFromUri(status));
  }
  const attendanceMode = store.any(subject, SCHEMA("eventAttendanceMode"), null, null)?.value;
  if (attendanceMode) {
    addRow(details, "Format", labelFromUri(attendanceMode));
  }
  wrapper.appendChild(details);
  const description = store.any(subject, SCHEMA("description"), null, null)?.value ?? store.any(subject, DCT("description"), null, null)?.value;
  if (description) {
    const descEl = document.createElement("div");
    descEl.className = "event-description";
    descEl.textContent = description;
    wrapper.appendChild(descEl);
  }
  container.appendChild(wrapper);
}
export {
  renderEvent
};

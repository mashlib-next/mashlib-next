import { RDF, SCHEMA } from "@mashlib-next/utils";
import { renderMap } from "./render.js";
function getCoordinates(subject, store) {
  const directLat = store.any(subject, SCHEMA("latitude"), null, null)?.value;
  const directLng = store.any(subject, SCHEMA("longitude"), null, null)?.value;
  if (directLat && directLng) {
    const lat = parseFloat(directLat);
    const lng = parseFloat(directLng);
    if (!isNaN(lat) && !isNaN(lng)) return { lat, lng };
  }
  const geoNode = store.any(subject, SCHEMA("geo"), null, null);
  if (geoNode) {
    const geoLat = store.any(geoNode, SCHEMA("latitude"), null, null)?.value;
    const geoLng = store.any(geoNode, SCHEMA("longitude"), null, null)?.value;
    if (geoLat && geoLng) {
      const lat = parseFloat(geoLat);
      const lng = parseFloat(geoLng);
      if (!isNaN(lat) && !isNaN(lng)) return { lat, lng };
    }
  }
  const locationNode = store.any(subject, SCHEMA("location"), null, null);
  if (locationNode) {
    const locGeo = store.any(locationNode, SCHEMA("geo"), null, null);
    if (locGeo) {
      const lat = store.any(locGeo, SCHEMA("latitude"), null, null)?.value;
      const lng = store.any(locGeo, SCHEMA("longitude"), null, null)?.value;
      if (lat && lng) {
        const pLat = parseFloat(lat);
        const pLng = parseFloat(lng);
        if (!isNaN(pLat) && !isNaN(pLng)) return { lat: pLat, lng: pLng };
      }
    }
    const locLat = store.any(locationNode, SCHEMA("latitude"), null, null)?.value;
    const locLng = store.any(locationNode, SCHEMA("longitude"), null, null)?.value;
    if (locLat && locLng) {
      const lat = parseFloat(locLat);
      const lng = parseFloat(locLng);
      if (!isNaN(lat) && !isNaN(lng)) return { lat, lng };
    }
  }
  return null;
}
function isPlace(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  const typeUris = types.map((t) => t.value);
  if (typeUris.includes(SCHEMA("Place").value)) return true;
  if (typeUris.includes(SCHEMA("GeoCoordinates").value)) return true;
  return false;
}
const mapPane = {
  label: "Map",
  icon: "\u{1F5FA}",
  canHandle(subject, store) {
    if (getCoordinates(subject, store)) return true;
    if (isPlace(subject, store)) return true;
    return false;
  },
  render(subject, store, container) {
    renderMap(subject, store, container);
  }
};
export {
  getCoordinates,
  mapPane
};

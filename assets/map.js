/* =========================================================
   SPBE — map.js
   Plots one pin per researcher on a world map, using the
   country centroid lookup in assets/countries.js. Requires
   Leaflet (loaded via CDN in mapa.html) and loadResearchers()
   from assets/directory-data.js.
   ========================================================= */

async function initMap() {
  const mapEl = document.getElementById("map");
  if (!mapEl || typeof L === "undefined") return;

  const map = L.map("map", { scrollWheelZoom: false, minZoom: 2 }).setView([10, -30], 2);

   // Standard OpenStreetMap tiles — free, no API key required.
  // (CARTO's free basemap tiles started requiring a key in Aug 2026; a CSS
  // filter on #map in style.css tints these to match the site palette.)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
    maxZoom: 19,
    subdomains: "abc"
  }).addTo(map);

  const { data, usedSample } = await loadResearchers();
  const notice = document.getElementById("map-sample-notice");
  if (notice) notice.style.display = usedSample ? "block" : "none";

  const pinIcon = L.divIcon({
    className: "spbe-pin",
    html: "<span></span>",
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });

  // Spread out multiple pins that land in the same country so they
  // don't sit exactly on top of each other.
    const seenSpots = {};
  const bounds = [];

  data.forEach((r) => {
    const hasExact = typeof r.lat === "number" && typeof r.lng === "number";
    const base = hasExact ? [r.lat, r.lng] : COUNTRY_COORDS[r.country];
    if (!base) return;

    const spotKey = `${base[0].toFixed(2)},${base[1].toFixed(2)}`;
    const n = (seenSpots[spotKey] = (seenSpots[spotKey] || 0) + 1);
    const angle = n * 47 * (Math.PI / 180);
    const radius = n === 1 ? 0 : (hasExact ? 0.08 : 0.7) * Math.sqrt(n);
    const lat = base[0] + radius * Math.sin(angle);
    const lon = base[1] + radius * Math.cos(angle);

    const taxa = (r.taxa || []).join(", ");
    const place = r.city ? `${r.city}, ${r.country}` : r.country || "";
    const popupHTML = `
      <strong>${escapeHTML(r.name)}</strong><br>
      <span class="map-popup-inst">${escapeHTML(r.institution || "")}</span><br>
      <span class="map-popup-country">${escapeHTML(place)}</span>
      ${taxa ? `<br><em>${escapeHTML(taxa)}</em>` : ""}
    `;

    L.marker([lat, lon], { icon: pinIcon }).addTo(map).bindPopup(popupHTML);
    bounds.push([lat, lon]);
  });

  if (bounds.length > 1) {
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 4 });
  }
}

document.addEventListener("DOMContentLoaded", initMap);

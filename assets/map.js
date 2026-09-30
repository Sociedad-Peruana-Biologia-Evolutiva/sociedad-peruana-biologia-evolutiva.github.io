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

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>',
    maxZoom: 18,
    subdomains: "abcd"
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
  const countByCountry = {};
  const bounds = [];

  data.forEach((r) => {
    const base = COUNTRY_COORDS[r.country];
    if (!base) return;

    const n = (countByCountry[r.country] = (countByCountry[r.country] || 0) + 1);
    const angle = n * 47 * (Math.PI / 180);
    const radius = n === 1 ? 0 : 0.7 * Math.sqrt(n);
    const lat = base[0] + radius * Math.sin(angle);
    const lon = base[1] + radius * Math.cos(angle);

    const taxa = (r.taxa || []).join(", ");
    const popupHTML = `
      <strong>${escapeHTML(r.name)}</strong><br>
      <span class="map-popup-inst">${escapeHTML(r.institution || "")}</span><br>
      <span class="map-popup-country">${escapeHTML(r.country || "")}</span>
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

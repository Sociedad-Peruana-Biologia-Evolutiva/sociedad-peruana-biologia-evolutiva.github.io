/* =========================================================
   SPBE — main.js
   1. Language toggle (ES default, EN optional), remembered via localStorage
   2. Directory rendering (fetches data/researchers.json, falls back to
      a small embedded sample if the fetch fails — e.g. when this file
      is opened without a local server, or previewed standalone)
   ========================================================= */

// >>> EDIT ME: set this to "your-github-username/your-repo-name" once you
// create the repository. It builds the "add yourself" issue-form link.
const REPO = "YOUR-USERNAME/spbe-site";

/* ---------------- Language toggle ---------------- */

(function initLang() {
  const stored = localStorage.getItem("spbe-lang");
  const lang = stored === "en" ? "en" : "es";
  document.documentElement.lang = lang;

  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("lang-toggle");
    if (!btn) return;
    updateToggleLabel(btn, lang);
    btn.addEventListener("click", () => {
      const current = document.documentElement.lang === "en" ? "en" : "es";
      const next = current === "es" ? "en" : "es";
      document.documentElement.lang = next;
      localStorage.setItem("spbe-lang", next);
      updateToggleLabel(btn, next);
      syncDirectoryLabels(next);
    });

    syncDirectoryLabels(lang);
  });

  function syncDirectoryLabels(lang) {
    const search = document.getElementById("dir-search");
    if (search) {
      search.placeholder = lang === "es"
        ? search.dataset.placeholderEs
        : search.dataset.placeholderEn;
    }
    const regionDefault = document.querySelector("#dir-region option[value='']");
    if (regionDefault) {
      regionDefault.textContent = lang === "es"
        ? regionDefault.dataset.labelEs
        : regionDefault.dataset.labelEn;
    }
  }

  function updateToggleLabel(btn, lang) {
    btn.textContent = lang === "es" ? "EN" : "ES";
    btn.setAttribute("aria-label", lang === "es" ? "Switch to English" : "Cambiar a español");
  }
})();

/* ---------------- Directory rendering ---------------- */

const SAMPLE_RESEARCHERS = [
  {
    name: "Ejemplo: María Quispe",
    institution: "Universidad Nacional Mayor de San Marcos",
    region: "Sierra",
    taxa: ["Bombus", "Polinizadores andinos"],
    interests_es: "Biogeografía y especiación en abejorros de altura",
    interests_en: "Biogeography and speciation in high-altitude bumblebees",
    links: [{ label: "Perfil", url: "#" }]
  },
  {
    name: "Ejemplo: Diego Farfán",
    institution: "Universidad Peruana Cayetano Heredia",
    region: "Amazonía",
    taxa: ["Dendrobatidae"],
    interests_es: "Filogeografía de ranas venenosas amazónicas",
    interests_en: "Phylogeography of Amazonian poison frogs",
    links: [{ label: "Google Scholar", url: "#" }]
  },
  {
    name: "Ejemplo: Lucía Osorio",
    institution: "Universidad Científica del Sur",
    region: "Costa",
    taxa: ["Otariidae", "Mamíferos marinos"],
    interests_es: "Genómica de conservación de lobos marinos",
    interests_en: "Conservation genomics of coastal sea lions",
    links: [{ label: "Web", url: "#" }]
  }
];

async function loadResearchers() {
  try {
    const res = await fetch("data/researchers.json", { cache: "no-store" });
    if (!res.ok) throw new Error("no data file yet");
    const data = await res.json();
    return { data, isSample: data.length === 0 ? true : false, usedSample: false };
  } catch (e) {
    return { data: SAMPLE_RESEARCHERS, isSample: true, usedSample: true };
  }
}

function renderCard(r) {
  const taxa = (r.taxa || [])
    .map((t) => `<span class="taxa">${escapeHTML(t)}</span>`)
    .join("");
  const links = (r.links || [])
    .map((l) => `<a href="${escapeAttr(l.url)}" target="_blank" rel="noopener">${escapeHTML(l.label)}</a>`)
    .join("");
  const interestsEs = r.interests_es || r.interests || "";
  const interestsEn = r.interests_en || r.interests || "";

  return `
    <article class="researcher-card">
      <h3>${escapeHTML(r.name)}</h3>
      <div class="inst">${escapeHTML(r.institution || "")}</div>
      <div class="region-tag">${escapeHTML(r.region || "")}</div>
      <p data-lang="es" style="margin-top:0.5rem">${escapeHTML(interestsEs)}</p>
      <p data-lang="en" style="margin-top:0.5rem">${escapeHTML(interestsEn)}</p>
      <div>${taxa}</div>
      <div class="links" style="margin-top:0.6rem">${links}</div>
    </article>
  `;
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}
function escapeAttr(str) { return escapeHTML(str); }

async function initDirectory() {
  const grid = document.getElementById("dir-grid");
  if (!grid) return;

  const { data, usedSample } = await loadResearchers();
  const noticeEl = document.getElementById("dir-sample-notice");
  if (noticeEl) noticeEl.style.display = usedSample ? "block" : "none";

  let current = data;

  function draw(list) {
    grid.innerHTML = list.length
      ? list.map(renderCard).join("")
      : `<div class="empty-state" data-lang="es">No hay resultados. Prueba otro filtro.</div>
         <div class="empty-state" data-lang="en">No results. Try another filter.</div>`;
  }

  draw(current);

  const search = document.getElementById("dir-search");
  const regionFilter = document.getElementById("dir-region");

  function applyFilters() {
    const q = (search?.value || "").toLowerCase().trim();
    const region = regionFilter?.value || "";
    const filtered = current.filter((r) => {
      const matchesQ =
        !q ||
        r.name?.toLowerCase().includes(q) ||
        r.institution?.toLowerCase().includes(q) ||
        (r.taxa || []).join(" ").toLowerCase().includes(q) ||
        (r.interests_es || "").toLowerCase().includes(q) ||
        (r.interests_en || "").toLowerCase().includes(q);
      const matchesRegion = !region || r.region === region;
      return matchesQ && matchesRegion;
    });
    draw(filtered);
  }

  search?.addEventListener("input", applyFilters);
  regionFilter?.addEventListener("change", applyFilters);
}

document.addEventListener("DOMContentLoaded", () => {
  initDirectory();

  // Wire up the "add yourself" issue-form links using the REPO constant.
  document.querySelectorAll("[data-issue-link]").forEach((el) => {
    el.href = `https://github.com/${REPO}/issues/new?template=nuevo_investigador.yml`;
  });
  document.querySelectorAll("[data-repo-link]").forEach((el) => {
    el.href = `https://github.com/${REPO}`;
  });
});

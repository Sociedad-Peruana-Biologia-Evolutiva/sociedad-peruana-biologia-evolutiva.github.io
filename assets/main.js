/* =========================================================
   SPBE — main.js
   1. Language toggle (ES default, EN optional), remembered via localStorage
   2. Directory rendering (fetches data/researchers.json, falls back to
      a small embedded sample if the fetch fails — e.g. when this file
      is opened without a local server, or previewed standalone)
   ========================================================= */

// >>> EDIT ME: set this to "your-github-username/your-repo-name" once you
// create the repository. It builds the "add yourself" issue-form link.
const REPO = "Sociedad-Peruana-Biologia-Evolutiva/sociedad-peruana-biologia-evolutiva.github.io";

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
        const countryDefault = document.querySelector("#dir-country option[value='']");
    if (countryDefault) {
      countryDefault.textContent = lang === "es"
        ? countryDefault.dataset.labelEs
        : countryDefault.dataset.labelEn;
      }
    }

  function updateToggleLabel(btn, lang) {
    btn.textContent = lang === "es" ? "EN" : "ES";
    btn.setAttribute("aria-label", lang === "es" ? "Switch to English" : "Cambiar a español");
  }
})();

/* ---------------- Directory rendering ----------------
   SAMPLE_RESEARCHERS and loadResearchers() live in
   assets/directory-data.js, loaded before this file on
   directorio.html. */

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
      <div class="region-tag">${escapeHTML(r.city ? `${r.city}, ${r.country || ""}` : r.country || "")}${r.region ? " · " + escapeHTML(r.region) : ""}</div>
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
  const countryFilter = document.getElementById("dir-country");

  if (countryFilter) {
    const countries = [...new Set(current.map((r) => r.country).filter(Boolean))].sort(
      (a, b) => a.localeCompare(b, "es")
    );
    countries.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      countryFilter.appendChild(opt);
    });
  }

  function applyFilters() {
    const q = (search?.value || "").toLowerCase().trim();
    const country = countryFilter?.value || "";
    const filtered = current.filter((r) => {
      const matchesQ =
        !q ||
        r.name?.toLowerCase().includes(q) ||
        r.institution?.toLowerCase().includes(q) ||
        (r.taxa || []).join(" ").toLowerCase().includes(q) ||
        (r.interests_es || "").toLowerCase().includes(q) ||
        (r.interests_en || "").toLowerCase().includes(q);
      const matchesCountry = !country || r.country === country;
      return matchesQ && matchesCountry;
    });
    draw(filtered);
  }

  search?.addEventListener("input", applyFilters);
  countryFilter?.addEventListener("change", applyFilters);
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

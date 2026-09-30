/* =========================================================
   SPBE — directory-data.js
   Shared between directorio.html (grid) and mapa.html (map):
   loads data/researchers.json, with a small embedded sample
   used as a fallback while the directory is still empty.
   ========================================================= */

const SAMPLE_RESEARCHERS = [
  {
    name: "Ejemplo: María Quispe",
    institution: "Universidad Nacional Mayor de San Marcos",
    region: "Sierra",
    country: "Perú",
    taxa: ["Bombus", "Polinizadores andinos"],
    interests_es: "Biogeografía y especiación en abejorros de altura",
    interests_en: "Biogeography and speciation in high-altitude bumblebees",
    links: [{ label: "Perfil", url: "#" }]
  },
  {
    name: "Ejemplo: Diego Farfán",
    institution: "Universidad Peruana Cayetano Heredia",
    region: "Amazonía",
    country: "Perú",
    taxa: ["Dendrobatidae"],
    interests_es: "Filogeografía de ranas venenosas amazónicas",
    interests_en: "Phylogeography of Amazonian poison frogs",
    links: [{ label: "Google Scholar", url: "#" }]
  },
  {
    name: "Ejemplo: Lucía Osorio",
    institution: "University of Oxford",
    region: "Costa",
    country: "Reino Unido",
    taxa: ["Otariidae", "Mamíferos marinos"],
    interests_es: "Genómica de conservación de lobos marinos",
    interests_en: "Conservation genomics of coastal sea lions",
    links: [{ label: "Web", url: "#" }]
  },
  {
    name: "Ejemplo: Renzo Palacios",
    institution: "Smithsonian Institution",
    region: "Amazonía",
    country: "Estados Unidos",
    taxa: ["Heliconius"],
    interests_es: "Genómica de la especiación en mariposas neotropicales",
    interests_en: "Speciation genomics in neotropical butterflies",
    links: [{ label: "ORCID", url: "#" }]
  }
];

async function loadResearchers() {
  let data = [];
  try {
    const res = await fetch("data/researchers.json", { cache: "no-store" });
    if (res.ok) data = await res.json();
  } catch (e) {
    // fetch failed (e.g. opened without a local server) — fall through to sample
  }
  if (!Array.isArray(data) || data.length === 0) {
    return { data: SAMPLE_RESEARCHERS, usedSample: true };
  }
  return { data, usedSample: false };
}

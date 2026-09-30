/* =========================================================
   SPBE — country centroid lookup
   Used to place a pin on the world map for each researcher's
   country. Keys MUST match exactly the option text used in
   .github/ISSUE_TEMPLATE/nuevo_investigador.yml (the "country"
   dropdown) and in data/researchers.json ("country" field).
   Approximate geographic centroids — good enough for a
   country-level pin, not meant to be precise.
   ========================================================= */

const COUNTRY_COORDS = {
  // — Sudamérica —
  "Perú": [-9.19, -75.02],
  "Bolivia": [-16.29, -63.59],
  "Ecuador": [-1.83, -78.18],
  "Colombia": [4.57, -74.30],
  "Venezuela": [6.42, -66.59],
  "Chile": [-35.68, -71.54],
  "Argentina": [-38.42, -63.62],
  "Brasil": [-14.24, -51.93],
  "Paraguay": [-23.44, -58.44],
  "Uruguay": [-32.52, -55.77],

  // — Norte y Centroamérica y el Caribe —
  "México": [23.63, -102.55],
  "Guatemala": [15.78, -90.23],
  "Costa Rica": [9.75, -83.75],
  "Panamá": [8.54, -80.78],
  "Cuba": [21.52, -77.78],
  "República Dominicana": [18.74, -70.16],
  "Puerto Rico": [18.22, -66.59],
  "Estados Unidos": [37.09, -95.71],
  "Canadá": [56.13, -106.35],

  // — Europa —
  "Reino Unido": [55.38, -3.44],
  "Irlanda": [53.41, -8.24],
  "España": [40.46, -3.75],
  "Portugal": [39.40, -8.22],
  "Francia": [46.23, 2.21],
  "Alemania": [51.17, 10.45],
  "Países Bajos": [52.13, 5.29],
  "Bélgica": [50.50, 4.47],
  "Suiza": [46.82, 8.23],
  "Austria": [47.52, 14.55],
  "Italia": [41.87, 12.57],
  "Suecia": [60.13, 18.64],
  "Noruega": [60.47, 8.47],
  "Dinamarca": [56.26, 9.50],
  "Finlandia": [61.92, 25.75],
  "Islandia": [64.96, -19.02],
  "Polonia": [51.92, 19.15],
  "República Checa": [49.82, 15.47],
  "Hungría": [47.16, 19.50],
  "Grecia": [39.07, 21.82],
  "Rusia": [61.52, 105.32],
  "Ucrania": [48.38, 31.17],
  "Turquía": [38.96, 35.24],

  // — Asia y Medio Oriente —
  "China": [35.86, 104.20],
  "Japón": [36.20, 138.25],
  "Corea del Sur": [35.91, 127.77],
  "India": [20.59, 78.96],
  "Singapur": [1.35, 103.82],
  "Tailandia": [15.87, 100.99],
  "Malasia": [4.21, 101.98],
  "Indonesia": [-0.79, 113.92],
  "Filipinas": [12.88, 121.77],
  "Israel": [31.05, 34.85],
  "Emiratos Árabes Unidos": [23.42, 53.85],
  "Arabia Saudita": [23.89, 45.08],

  // — Oceanía —
  "Australia": [-25.27, 133.78],
  "Nueva Zelanda": [-40.90, 174.89],

  // — África —
  "Sudáfrica": [-30.56, 22.94],
  "Kenia": [-0.02, 37.91],
  "Nigeria": [9.08, 8.68],
  "Egipto": [26.82, 30.80],
  "Marruecos": [31.79, -7.09]
};

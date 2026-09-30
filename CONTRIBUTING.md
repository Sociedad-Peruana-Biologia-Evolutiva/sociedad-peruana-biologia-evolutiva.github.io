# Cómo revisar y publicar una nueva entrada / How to review and publish a new entry

Este documento es para quien mantiene el repositorio (probablemente tú, al
inicio). Explica el flujo completo, desde que alguien envía el formulario
hasta que aparece en el directorio.

*(This document is for whoever maintains the repository — probably you, at
first. It explains the full flow, from form submission to appearing in the
directory.)*

## 1. Alguien envía el formulario / Someone submits the form

Cuando una persona hace clic en **"Abrir formulario en GitHub"** en
`unirse.html`, se crea un *issue* nuevo en este repositorio con la etiqueta
`nuevo-investigador`, usando la plantilla en
`.github/ISSUE_TEMPLATE/nuevo_investigador.yml`.

Puedes ver todas las solicitudes pendientes en:
`https://github.com/TU-USUARIO/spbe-site/issues?q=is%3Aissue+is%3Aopen+label%3Anuevo-investigador`

## 2. Revisa la solicitud / Review the submission

Antes de publicar, verifica que:

- El nombre y la institución sean razonables (evita spam o entradas de prueba).
- Los enlaces (si los hay) funcionen y correspondan a la persona.
- Se haya marcado la casilla de consentimiento.

Puedes pedir cambios comentando en el mismo issue.

## 3. Agrega la entrada a `data/researchers.json` / Add the entry to the file

Abre `data/researchers.json` y agrega un objeto con esta forma:

```json
{
  "name": "María Quispe",
  "institution": "Universidad Nacional Mayor de San Marcos",
  "country": "Perú",
  "region": "Sierra",
  "taxa": ["Bombus", "Polinizadores andinos"],
  "interests_es": "Biogeografía y especiación en abejorros de altura",
  "interests_en": "Biogeography and speciation in high-altitude bumblebees",
  "links": [
    { "label": "ORCID", "url": "https://orcid.org/0000-0000-0000-0000" }
  ]
}
```

Notas:

- `country` debe coincidir **exactamente** (mismo texto, con tilde) con una
  de las claves de `assets/countries.js` — de eso depende que aparezca en
  el mapa. Si viene del formulario, ya está garantizado porque el
  desplegable usa la misma lista. Si alguien pide un país que no está en la
  lista, agrégalo en `assets/countries.js` (con sus coordenadas
  aproximadas) **y** en las opciones del dropdown `country` en
  `.github/ISSUE_TEMPLATE/nuevo_investigador.yml`, usando el mismo texto en
  ambos lugares.
- `region` debe ser exactamente `"Costa"`, `"Sierra"` o `"Amazonía"` (así
  funciona el filtro del directorio), o puede omitirse para quienes no
  trabajan en el Perú.
- `taxa` y `links` pueden ir vacíos (`[]`) si la persona no los especificó.
- `interests_en` es opcional; si se omite, el texto en español se usa como
  respaldo.

Puedes editar el archivo directamente en GitHub (ícono de lápiz) sin
necesidad de clonar el repositorio localmente.

## 4. Cierra el issue / Close the issue

Comenta algo como "¡Listo, ya apareces en el directorio! 🎉" y cierra el
issue. Listo — el cambio se publica automáticamente en GitHub Pages en uno
o dos minutos.

---

## Publicar cambios en lote / Batch-publishing changes

Si prefieres acumular varias solicitudes y publicarlas juntas una vez por
semana, eso también funciona bien — el directorio simplemente refleja lo que
haya en `data/researchers.json` en cada momento.

# SPBE — Sociedad Peruana de Biología Evolutiva

Sitio web inicial de la Sociedad Peruana de Biología Evolutiva: quiénes
somos, qué queremos construir, y un directorio abierto de investigadores
peruanos en biología evolutiva.

Sitio estático puro — HTML/CSS/JS, sin frameworks ni build step. Pensado
para publicarse gratis con **GitHub Pages**.

## Estructura

```
index.html            → página principal (quiénes somos / qué queremos construir)
directorio.html        → directorio de investigadores (buscable, filtrable)
unirse.html            → instrucciones para sumarse al directorio
assets/style.css       → paleta y tipografía
assets/main.js         → toggle de idioma + renderizado del directorio
assets/logo.svg        → marca (costa · Andes · selva)
data/researchers.json  → datos del directorio (empieza vacío: [])
.github/ISSUE_TEMPLATE/nuevo_investigador.yml → formulario de alta (sin código)
CONTRIBUTING.md        → cómo revisar y publicar una solicitud nueva
```

## Puesta en marcha (una sola vez)

1. **Crea el repositorio** en GitHub (por ejemplo `spbe-site`) y sube estos
   archivos — puedes arrastrarlos directamente en la interfaz web de
   GitHub, sin usar la terminal, si prefieres.

2. **Activa GitHub Pages**: en el repositorio, ve a
   *Settings → Pages → Build and deployment → Source* y elige
   **"Deploy from a branch"**, rama `main`, carpeta `/ (root)`. Guarda.
   Tu sitio quedará en `https://TU-USUARIO.github.io/spbe-site/`.

3. **Configura el enlace del formulario**: abre `assets/main.js` y cambia
   la primera línea:

   ```js
   const REPO = "YOUR-USERNAME/spbe-site";
   ```

   por tu usuario y nombre de repositorio reales. Esto conecta el botón
   "Súmate" con tu formulario de GitHub Issues.

4. **Revisa que el issue template funcione**: ve a la pestaña *Issues* de tu
   repo → *New issue* → deberías ver la plantilla "Nuevo investigador / New
   researcher".

Eso es todo — el sitio ya está en línea y las personas pueden empezar a
sumarse.

## Cómo se agregan investigadores

No hay backend ni base de datos: las personas envían un formulario de
GitHub (un *issue*), y quien mantiene el repositorio copia esa información
a `data/researchers.json`. El paso a paso completo está en
[`CONTRIBUTING.md`](CONTRIBUTING.md).

## Desarrollo local

No requiere instalación. Basta con abrir `index.html` en un navegador, o
para que `fetch()` cargue `data/researchers.json` correctamente, servir la
carpeta con cualquier servidor estático simple, por ejemplo:

```bash
python3 -m http.server 8000
```

y visitar `http://localhost:8000`.

## Próximos pasos posibles

- Añadir un mapa del Perú con la ubicación de cada investigador.
- Exportar el directorio a CSV para análisis.
- Migrar a una sociedad formal con membresía, boletín, y eventos.

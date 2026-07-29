# Nicolas Del Rosario — Portfolio

Portfolio personal bilingüe, estático y construido con Astro. Español en `/` e inglés en `/en/`.

## Requisito

El proyecto requiere Node.js 26.5.0. Si usas nvm, ejecuta `nvm use`.

## Desarrollo

```bash
npm install
npm run dev
npm run build
```

## Estructura

- `src/pages/`: rutas de cada idioma.
- `src/data/content.ts`: copy y datos compartidos; edita aquí el contenido factual.
- `src/components/`: navegación, cambio de idioma y filas de proyectos.
- `src/styles/global.css` y `tokens.css`: sistema visual responsive.
- `public/favicon.svg`: favicon mínimo.

El proyecto no usa framework de UI ni dependencias adicionales aparte de Astro.

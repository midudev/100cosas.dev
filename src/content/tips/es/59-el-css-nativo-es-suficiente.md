---
id: "59"
title: "El CSS nativo es más potente de lo que crees"
category: "CSS"
categoryColor: "text-pink-400 bg-pink-900/20"
author: "lea-verou"
---

Lea Verou, investigadora del W3C y creadora de herramientas CSS esenciales como Prism.js, lleva años demostrando que **el CSS nativo puede hacer más de lo que la mayoría imagina**.

## Lo que JavaScript hacía (y CSS ahora resuelve)

### 1. Scroll-driven animations

```css
/* Antes: IntersectionObserver + JavaScript */
/* Ahora: puro CSS */
.reveal {
  animation: fadeIn linear;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### 2. Tooltips con posicionamiento

```css
/* Antes: librería de positioning (Popper.js, etc.) */
/* Ahora: CSS Anchor Positioning */
.tooltip {
  position: absolute;
  anchor-name: --my-anchor;
  position-anchor: --my-anchor;
  top: anchor(bottom);
  left: anchor(center);
  translate: -50% 8px;
}
```

### 3. Modales

```html
<!-- Antes: JS para abrir/cerrar/backdrop/focus trap -->
<!-- Ahora: HTML + CSS -->
<dialog id="modal">
  <form method="dialog">
    <p>¿Estás seguro?</p>
    <button value="cancel">Cancelar</button>
    <button value="confirm">Confirmar</button>
  </form>
</dialog>

<style>
dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}
</style>
```

### 4. Temas dinámicos

```css
/* Antes: CSS-in-JS, clases dinámicas */
/* Ahora: Custom Properties */
:root {
  --bg: #ffffff;
  --text: #1a1a1a;
  --accent: oklch(65% 0.2 250);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a1a;
    --text: #ffffff;
    --accent: oklch(75% 0.2 250);
  }
}

body {
  background: var(--bg);
  color: var(--text);
}
```

## Features que deberías usar hoy

### Container Queries

```css
/* Responsive al contenedor, no al viewport */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}
```

### :has() - El selector padre

```css
/* "Si el formulario tiene un input inválido, cambia el borde" */
form:has(:invalid) {
  border-color: red;
}

/* "Si la card tiene imagen, cambia el layout" */
.card:has(> img) {
  grid-template-rows: 200px 1fr;
}
```

### Nesting nativo

```css
/* Ya no necesitas Sass solo para esto */
.card {
  padding: 1rem;
  
  & .title {
    font-size: 1.5rem;
  }
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  @media (width > 768px) {
    padding: 2rem;
  }
}
```

### Nuevos espacios de color

```css
/* oklch: perceptualmente uniforme, ideal para paletas */
:root {
  --primary-100: oklch(95% 0.05 250);
  --primary-200: oklch(85% 0.10 250);
  --primary-300: oklch(75% 0.15 250);
  --primary-400: oklch(65% 0.20 250);
  --primary-500: oklch(55% 0.20 250);
}
```

## El principio de Lea

> "Antes de añadir JavaScript para un efecto visual, pregunta: ¿puede CSS hacerlo?"

La respuesta es "sí" mucho más a menudo de lo que crees.

Lea ha dedicado su carrera a expandir lo que CSS puede hacer. Cada año, CSS gana capacidades que antes requerían JavaScript. El navegador optimiza CSS mejor que cualquier librería. Conocer CSS moderno te hace un desarrollador más eficiente y tus apps más rápidas.

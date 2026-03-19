---
id: "36"
title: "El mejor request es el que no se hace"
category: "Rendimiento"
categoryColor: "text-amber-400 bg-amber-900/20"
author: "addy-osmani"
---

Addy Osmani, líder de ingeniería en Google Chrome y una de las mentes detrás de herramientas como Lighthouse, resume décadas de optimización web en una verdad simple: **la forma más rápida de cargar algo es no cargarlo**.

## El coste invisible de cada petición

Cada request HTTP tiene costes ocultos:

- **Latencia de red**: Incluso en conexiones rápidas, cada ida y vuelta al servidor suma
- **Overhead de conexión**: TLS handshakes, DNS lookups, TCP connections
- **Parsing y procesamiento**: El navegador debe interpretar cada recurso
- **Memoria**: Cada asset consume RAM del dispositivo

En redes móviles o conexiones inestables, estos costes se multiplican dramáticamente.

## Estrategias prácticas

### 1. Audita antes de añadir

Antes de instalar esa librería que "solo pesa 2KB gzipped":

```javascript
// ¿Realmente necesitas moment.js para formatear una fecha?
const fecha = new Date().toLocaleDateString('es-ES', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
// "6 de enero de 2026"
```

### 2. Lazy loading nativo

```html
<!-- Las imágenes fuera del viewport no se cargan inicialmente -->
<img src="foto.webp" loading="lazy" alt="...">

<!-- Los iframes también -->
<iframe src="video.html" loading="lazy"></iframe>
```

### 3. Prioriza lo crítico

```html
<!-- Indica al navegador qué es importante -->
<img src="hero.webp" fetchpriority="high" alt="...">
<link rel="preload" href="fuente-principal.woff2" as="font" crossorigin>
```

### 4. Elimina código muerto

```bash
# Analiza qué JavaScript realmente se usa
npx lighthouse --only-categories=performance
npx webpack-bundle-analyzer
```

## Core Web Vitals: medir para mejorar

Osmani ha sido instrumental en definir las métricas que importan:

- **LCP** (Largest Contentful Paint): ¿Cuándo aparece el contenido principal?
- **INP** (Interaction to Next Paint): ¿Responde la página a las interacciones?
- **CLS** (Cumulative Layout Shift): ¿Se mueve el contenido inesperadamente?

Cada request adicional puede afectar negativamente estas métricas.

## La regla del 20%

Osmani sugiere: *"Sé al menos un 20% más rápido que tu competidor más rápido"*. Esto significa:

1. **Mide primero**: No optimices a ciegas
2. **Prioriza el impacto**: El 80% del beneficio viene del 20% de las optimizaciones
3. **Automatiza**: Integra performance budgets en tu CI/CD

En un mundo donde es fácil añadir dependencias con un `npm install`, la disciplina de preguntarse *"¿realmente lo necesito?"* se ha vuelto una habilidad diferenciadora. Cada kilobyte que no envías es tiempo que tus usuarios no esperan.

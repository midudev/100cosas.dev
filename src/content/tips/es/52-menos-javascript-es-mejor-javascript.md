---
id: "52"
title: "Menos JavaScript es mejor JavaScript"
category: "Rendimiento"
categoryColor: "text-amber-400 bg-amber-900/20"
author: "rich-harris"
---

Rich Harris, creador de Svelte y Rollup, ha dedicado su carrera a una idea contraintuitiva: **el mejor framework de JavaScript es el que envía menos JavaScript**.

## El problema del JavaScript moderno

```javascript
// Tu "simple" app React
import React from 'react';           // 42KB
import ReactDOM from 'react-dom';    // 35KB
import { Router } from 'wouter';     // 8KB
import { QueryClient } from 'tanstack/react-query'; // 39KB
// ... y 200KB más de dependencias

// Para mostrar: "Hello, World"
```

El usuario descarga, parsea, compila y ejecuta **cientos de KB** antes de ver algo útil.

## La filosofía de Svelte

Rich creó Svelte con una idea radical: **el framework desaparece en tiempo de compilación**.

```svelte
<!-- App.svelte -->
<script>
  let count = 0;
</script>

<button on:click={() => count++}>
  Clicks: {count}
</button>

<!-- Esto compila a vanilla JS optimizado, no a una librería -->
```

El resultado: **menos de 2KB** para una app interactiva.

## Por qué importa cada kilobyte

### 1. Tiempo de descarga

```markdown
| Bundle | 3G (1.6 Mbps) | 4G (10 Mbps) |
|--------|---------------|--------------|
| 50KB   | 0.25s         | 0.04s        |
| 200KB  | 1.0s          | 0.16s        |
| 500KB  | 2.5s          | 0.4s         |
```

### 2. Tiempo de parsing

JavaScript debe parsearse antes de ejecutarse. En dispositivos lentos:

```javascript
// 1MB de JavaScript ≈ 1 segundo de parsing en un móvil medio
// Eso es ANTES de ejecutar nada
```

### 3. Memoria

Cada byte de JavaScript consume memoria. En dispositivos con RAM limitada, esto significa:

- Tabs que se recargan
- Apps que crashean
- Usuarios frustrados

## Estrategias para menos JavaScript

### Usa la plataforma

Una Kravets, Developer Advocate en Google Chrome, lo tiene claro: **"The best JavaScript is no JavaScript"**. Cada vez que podemos sustituir lógica de JS por una capacidad nativa de HTML o CSS, ganamos en rendimiento, accesibilidad y robustez.

```html
<!-- ❌ JavaScript para un modal -->
<div id="modal" class="hidden">...</div>
<script>/* 50 líneas de código */</script>

<!-- ✅ HTML nativo -->
<dialog id="modal">...</dialog>
<script>
  modal.showModal(); // 1 línea
</script>
```

La nueva **Invoker Commands API** va un paso más allá: permite definir interacciones de forma completamente declarativa, sin una sola línea de JavaScript.

```html
<!-- Sin JavaScript: el navegador se encarga de todo -->
<button commandfor="my-dialog" command="show-modal">
  Abrir Modal
</button>

<dialog id="my-dialog">
  <p>Contenido del modal</p>
  <button commandfor="my-dialog" command="close">Cerrar</button>
</dialog>
```

Los elementos nativos como `<dialog>` o `popover` ya vienen con roles ARIA y comportamiento de teclado correctos "de caja". Menos JS que escribir significa menos JS que mantener y testear.

### Islands Architecture

```astro
---
// Astro: solo hidrata lo interactivo
---
<html>
  <Header />           <!-- HTML estático, 0KB JS -->
  <MainContent />      <!-- HTML estático, 0KB JS -->
  <ShoppingCart client:visible />  <!-- JS solo aquí -->
  <Footer />           <!-- HTML estático, 0KB JS -->
</html>
```

### Lazy loading agresivo

```javascript
// No cargues lo que el usuario no ve
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      {showHeavy && <HeavyComponent />}
    </Suspense>
  );
}
```

## La paradoja de Rich Harris

Rich creó herramientas de JavaScript para que usemos **menos JavaScript**:

- **Rollup**: Bundler que hace tree-shaking agresivo
- **Svelte**: Framework que desaparece
- **SvelteKit**: Meta-framework con SSR por defecto

Cada línea de JavaScript tiene un coste. No en tu MacBook Pro con fibra óptica, sino en el móvil de gama media con 3G de tu usuario real. El mejor JavaScript es el que no existe, y el segundo mejor es el que se ejecuta en el servidor. Abraza la plataforma, usa lo nativo y envía solo el JS imprescindible.

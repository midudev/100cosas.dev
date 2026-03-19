---
id: "29"
title: "La plataforma web es tu mejor framework"
category: "Web Standards"
categoryColor: "text-cyan-400 bg-cyan-900/20"
author: "lea-verou"
---

**Lea Verou**, investigadora en el MIT y miembro del CSS Working Group del W3C, ha pasado años diseñando el futuro de CSS. Su perspectiva es refrescante en una industria obsesionada con frameworks:

> "The web platform is the most powerful framework we have. Learn it first."
> La plataforma web es el framework más potente que tenemos. Apréndela primero.

Antes de añadir otra dependencia de npm, pregúntate: ¿puede el navegador hacer esto de forma nativa?

## La deuda de los frameworks

Cada framework que añades a tu proyecto es:

- **Peso:** KB que tus usuarios descargan.
- **Complejidad:** Documentación que mantener, versiones que actualizar.
- **Riesgo:** ¿Existirá este framework en 5 años?

La plataforma web, en cambio, es **para siempre**. Una página creada en 1995 con HTML básico todavía funciona hoy. ¿Puedes decir lo mismo de tu app de React del año pasado?

## CSS moderno: Más potente de lo que crees

```css
/* ❌ Antes: Necesitabas JavaScript o SASS */
/* Ahora: CSS nativo */

/* Variables CSS (Custom Properties) */
:root {
  --color-primary: #3b82f6;
  --spacing-md: 1rem;
}

.button {
  background: var(--color-primary);
  padding: var(--spacing-md);
}

/* Container Queries: Componentes responsive */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}

/* Nesting nativo */
.nav {
  background: white;
  
  & a {
    color: var(--color-primary);
    
    &:hover {
      text-decoration: underline;
    }
  }
}

/* Subgrid: Control total del layout */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.grid-item {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3;
}
```

## HTML moderno: Interactividad sin JavaScript

```html
<!-- Modales nativos -->
<dialog id="my-dialog">
  <h2>¡Soy un modal nativo!</h2>
  <p>Sin JavaScript para abrir/cerrar. Sin z-index hell.</p>
  <form method="dialog">
    <button>Cerrar</button>
  </form>
</dialog>
<button onclick="document.getElementById('my-dialog').showModal()">
  Abrir modal
</button>

<!-- Popovers nativos -->
<button popovertarget="menu">Abrir menú</button>
<div id="menu" popover>
  <ul>
    <li><a href="/perfil">Perfil</a></li>
    <li><a href="/config">Configuración</a></li>
  </ul>
</div>

<!-- Acordeón nativo -->
<details>
  <summary>¿Qué es la plataforma web?</summary>
  <p>HTML, CSS y JavaScript estándar, sin frameworks.</p>
</details>

<!-- Lazy loading nativo -->
<img src="foto.jpg" loading="lazy" alt="Foto">
```

## El principio de Lea

Lea propone un enfoque en capas:

1. **HTML primero:** ¿Puedo resolver esto con HTML semántico?
2. **CSS después:** ¿Puedo añadir estilo y comportamiento básico con CSS?
3. **JavaScript al final:** Solo cuando realmente necesite interactividad compleja.

```typescript
// ❌ Overengineering común
import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Button = styled(motion.button)`...`;

function AccordionItem({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);
  // 50 líneas más...
}

// ✅ HTML + CSS nativo
// <details><summary>Título</summary>Contenido</details>
// Cero JavaScript. Cero dependencias. Funciona para siempre.
```

## El futuro que Lea ayuda a construir

Como miembro del CSS Working Group, Lea no solo predica; construye. Características como `color-mix()`, los nuevos selectores `:has()`, y mejoras en Custom Properties existen en parte gracias a su trabajo.

Cada vez que aprendes una característica nativa de la plataforma web, estás:

- Reduciendo dependencias
- Mejorando rendimiento
- Construyendo para la longevidad
- Haciéndote un mejor desarrollador

**Los frameworks van y vienen. La plataforma web permanece.**

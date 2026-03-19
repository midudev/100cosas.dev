---
id: "25"
title: "La accesibilidad no es una feature, es un derecho"
category: "Accesibilidad"
categoryColor: "text-violet-400 bg-violet-900/20"
author: "sara-soueidan"
---

**Sara Soueidan**, ingeniera de UI/UX y consultora especializada en accesibilidad web, ha dedicado su carrera a una verdad incómoda para muchos equipos de desarrollo: **la accesibilidad no es un "nice to have"**, es algo que debe estar en el ADN del proyecto desde el principio.

> "Accessibility is not about disabilities. It's about usability for all."
> La accesibilidad no va de discapacidades. Va de usabilidad para todos.

Cada vez que dices "lo haremos accesible después", estás diciendo "algunas personas no importan ahora". Y ese "después" casi nunca llega.

## El mito del 1%

Muchos equipos justifican ignorar la accesibilidad con estadísticas: _"Solo el 1% de nuestros usuarios tienen discapacidades"_. Esta cifra es incorrecta por dos razones:

1. **Las discapacidades son más comunes de lo que crees:** El 15-20% de la población mundial tiene algún tipo de discapacidad (OMS). Muchas son invisibles: daltonismo, dislexia, ansiedad, TDAH.

2. **La accesibilidad beneficia a todos:** ¿Alguna vez has usado subtítulos en un bar ruidoso? ¿Has navegado con una mano mientras sostenías algo? ¿Has entrecerrado los ojos por el brillo del sol? Eso es discapacidad situacional.

3. **Casi todo el mundo pasa por alguna discapacidad temporal a lo largo de su vida.** ¿Una pierna o brazo escayolado? Movilidad reducida. ¿Una otitis? Pérdida auditiva temporal. ¿Una migraña o estrés? Dificultad para concentrarse. Y la lista continúa.

## Accesibilidad desde el diseño

Sara insiste en que la accesibilidad no puede ser un parche porque, además, estamos construyendo algo mal desde la base:

```html
<!-- ❌ HTML que excluye -->
<div onclick="handleClick()" class="button">
  <span class="icon-cart"></span>
</div>
<!-- 
  Problemas:
  - No es navegable con teclado
  - Los lectores de pantalla no saben que es un botón
  - No tiene texto alternativo
  - Estamos usando un elemento que no tiene sentido semántico
-->

<!-- ✅ HTML que incluye -->
<button 
  type="button" 
  aria-label="Añadir al carrito"
>
  <span class="icon-cart" aria-hidden="true"></span>
</button>
<!-- 
  - Navegable con Tab
  - Activable con Enter y Espacio
  - Anunciado correctamente por lectores de pantalla
-->
```

## Los cuatro principios de la accesibilidad (POUR)

Según las WCAG (Web Content Accessibility Guidelines), el contenido web debe ser:

### 1. Perceptible

La información no puede depender de un único sentido, como el color.

#### ❌ Incorrecto - solo color

```css
.error {
  color: red;
}
```

¿Por qué es incorrecto? Porque si el usuario tiene una discapacidad visual, no podrá ver el color rojo.

#### ⚠️ Parcialmente mejor - redundancia solo visual

```css
.error {
  color: red;
  border-left: 4px solid red;
  &::before {
    content: "❌ Error: ";
  }
}
```

Mejora la percepción visual, pero el texto generado por CSS no es fiable para tecnologías de asistencia.

#### ✅ Correcto - información real y perceptible

```html
<p class="error">
  <span aria-hidden="true">⚠️</span>
  <strong>Error:</strong> El email no es válido
</p>
```

```css
.error {
  color: red;
  border-left: 4px solid red;
  padding-left: 0.5rem;
}
```

La información está en el HTML, no depende solo del color y es perceptible por vista, oído y tecnología de apoyo.

### 2. Operable

```html
<!-- ❌ Parece un botón, pero no es operable con teclado (no foco, no Enter/Espacio) -->
<div class="close" onclick="closeModal()">×</div>

<!-- ✅ Botón real: se puede tabular, tiene foco y funciona con teclado -->
<button type="button" class="close" aria-label="Cerrar" onclick="closeModal()">
  ×
</button>
```

### 3. Comprensible

```html
<!-- ❌ Placeholder como etiqueta (y tipo incorrecto) -->
<input type="text" placeholder="Email" />

<!-- ✅ Formulario claro -->
<label for="email">Correo electrónico</label>
<p id="email-hint">Usaremos este correo para enviarte la confirmación.</p>
<input
  type="email"
  id="email"
  name="email"
  autocomplete="email"
  required
  aria-describedby="email-hint"
/>
```

### 4. Robusto

Usa HTML semántico y válido. Los elementos nativos (`<button>`, `<a>`, `<form>`, `<label>`, `<nav>`, `<main>`, `<article>`) ya traen teclado, foco y roles correctos; funcionan mejor con navegadores y tecnologías de asistencia. Usa ARIA para complementar, no para “convertir” un `<div>` en un componente interactivo.

## El coste de la exclusión

Ignorar la accesibilidad tiene consecuencias reales:

- **Legales:** En muchos países, la inaccesibilidad web puede tener implicaciones legales.
- **Económicas:** El 71% de usuarios con discapacidades abandona sitios inaccesibles (Click-Away Pound Survey).
- **Reputacionales:** Las demandas por accesibilidad web son públicas y dañan la marca.
- **Experiencia de usuario:** Normalmente todos los usuarios tienen peor experiencia usando un sitio inaccesible.

## El cambio empieza por ti

No necesitas ser experto en accesibilidad para empezar:

1. **Navega tu app solo con teclado** (Tab, Enter, Escape). ¿Puedes hacer todo?
2. **Usa un lector de pantalla** (VoiceOver en Mac, NVDA en Windows). ¿Tiene sentido lo que escuchas?
3. **Revisa el contraste de colores.** Herramientas como Lighthouse te ayudan.

La próxima vez que alguien sugiera "dejar la accesibilidad para después", recuerda las palabras de Sara: **la accesibilidad no es un extra que añades al final. Es la diferencia entre construir una rampa y obligar a alguien a quedarse fuera.**

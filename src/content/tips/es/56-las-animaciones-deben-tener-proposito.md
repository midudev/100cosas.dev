---
id: "56"
title: "Las animaciones deben tener un propósito, no ser decoración"
category: "UX"
categoryColor: "text-fuchsia-400 bg-fuchsia-900/20"
author: "sarah-drasner"
---

Sarah Drasner, directora de ingeniería en Google y autora del libro sobre animaciones web más influyente, tiene una regla clara: **una animación sin propósito es ruido visual**.

## La trampa de animar "porque podemos"

```css
/* ❌ Animación porque sí */
.card {
  animation: bounce 2s infinite;
}

/* El usuario: "¿Por qué esto no para de moverse?"  */
```

Las animaciones gratuitas:
- Distraen del contenido
- Cansan la vista
- Consumen batería
- Molestan a usuarios con sensibilidad al movimiento

## Cuándo las animaciones aportan

### 1. Feedback de interacción

```css
/* El botón responde al click */
.button:active {
  transform: scale(0.95);
  transition: transform 0.1s ease-out;
}
```

El usuario sabe que su acción fue registrada.

### 2. Guiar la atención

```javascript
// Algo nuevo apareció - guía el ojo hacia ello
function showNotification(message) {
  const notification = createNotification(message);
  notification.animate([
    { opacity: 0, transform: 'translateY(-20px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], { duration: 200, easing: 'ease-out' });
}
```

### 3. Mostrar relaciones espaciales

```css
/* Un modal que "viene de" algún lugar */
.modal {
  animation: slideFromButton 0.3s ease-out;
}

@keyframes slideFromButton {
  from {
    transform: scale(0);
    transform-origin: var(--button-position);
  }
  to {
    transform: scale(1);
  }
}
```

El usuario entiende de dónde vino y cómo volver.

### 4. Reducir la percepción de espera

```css
/* Skeleton loading: mejor que una pantalla congelada */
.skeleton {
  background: linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

## Animaciones que respetan al usuario

```css
/* Respeta prefers-reduced-motion */
.animated-element {
  animation: fadeIn 0.3s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none;
    opacity: 1;
  }
}
```

Algunos usuarios tienen vértigo, migrañas, o simplemente prefieren menos movimiento. Respétalo.

## La regla de Sarah: 200-500ms

```css
/* Demasiado rápido: el usuario no lo percibe */
.too-fast { transition: 0.05s; }

/* Demasiado lento: el usuario espera */
.too-slow { transition: 2s; }

/* El sweet spot */
.just-right { transition: 0.2s; } /* UI rápida */
.emphasis { transition: 0.4s; }   /* Movimientos importantes */
```

## Easing matters

```css
/* ❌ Linear se siente robótico */
.robotic { transition: transform 0.3s linear; }

/* ✅ ease-out se siente natural para entradas */
.natural-in { transition: transform 0.3s ease-out; }

/* ✅ ease-in se siente natural para salidas */
.natural-out { transition: transform 0.3s ease-in; }

/* ✅ custom cubic-bezier para movimientos específicos */
.bouncy { transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
```

## Antes de añadir una animación, pregunta:

1. ¿Qué **problema** resuelve esta animación?
2. ¿El usuario **necesita** esta información?
3. ¿La animación **ayuda** o **distrae**?
4. ¿Funciona sin animación para usuarios que la desactivan?

Sarah nos enseña que las mejores animaciones son las que no notas conscientemente, pero que hacen que la interfaz se sienta viva y natural. Si un usuario nota tu animación, probablemente es demasiado.

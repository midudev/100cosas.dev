---
id: "06"
title: "El código es una responsabilidad, no un activo"
category: "Estrategia"
categoryColor: "text-red-400 bg-red-900/20"
author: "rich-harris"
---

Rich Harris, el creador de Svelte, tiene una visión muy clara sobre el desarrollo: **"El código es una responsabilidad (liability), no un activo (asset)"**.

A menudo pensamos que cuanto más código escribimos, más valor estamos creando. Rich argumenta lo contrario: cada línea de código que escribes es algo que debe ser probado, mantenido, documentado y que, inevitablemente, contiene bugs. El código es "peso" que arrastras durante toda la vida del proyecto.

## Menos código, menos problemas

La mejor forma de reducir esta responsabilidad es usar las herramientas que ya tienes a tu disposición (como las APIs nativas del navegador) en lugar de construir abstracciones complejas.

### El enfoque "pesado": Inventar la rueda

A veces creamos lógica compleja para cosas que el navegador ya sabe hacer, añadiendo código que ahora tenemos que mantener.

```typescript
// Implementación manual de un comportamiento de "scroll to top"
function scrollToTopManual() {
  const duration = 500;
  const start = window.scrollY;
  const startTime = performance.now();

  function animate(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    window.scrollTo(0, start * (1 - progress));

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}
```

### El enfoque "ligero": Usar la plataforma

Aprovechamos lo que ya existe. Cero líneas de lógica propia, cero bugs que mantener.

```typescript
// El navegador ya tiene una API para esto
function scrollToTopNative() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
```

## El dilema: ¿Hacerlo nosotros o usar una librería?

A veces, la tentación de "no añadir dependencias" nos lleva a escribir cientos de líneas de código "personalizado" para resolver problemas comunes (como validación de formularios o manejo de fechas). Aquí es donde entra el **coste de oportunidad**.

Cada hora que pasas depurando tu propio sistema de validación es una hora que no estás dedicando a la funcionalidad que realmente diferencia a tu producto.

### El valor de la comunidad y los tests

Una biblioteca pequeña, bien mantenida y con una suite de tests exhaustiva (como `date-fns` o `zod`) suele ser una **menor responsabilidad** que 500 líneas de código propio sin testear.

- **Seguridad:** Cientos de ojos han revisado ese código.
- **Casos borde:** Las librerías suelen manejar edge-cases que tú ni siquiera has considerado.
- **Documentación:** No tienes que escribir manuales para algo que ya tiene su propia documentación.

## ¿Qué aporta valor realmente?

Tu éxito como desarrollador no se mide por cuántas líneas de código "original" has escrito, sino por cuánto valor has entregado con el **mínimo coste de mantenimiento** posible.

1. **Mantenimiento:** El código que no escribes nunca se rompe.
2. **Carga cognitiva:** Menos código significa que los nuevos desarrolladores pueden entender el proyecto más rápido.
3. **Superficie de error:** Cada línea propia es una oportunidad para un error que solo tú puedes arreglar.

La próxima vez que vayas a escribir una nueva funcionalidad, pregúntate: **"¿Es este código un activo para mi empresa o una carga para mi futuro yo?"**.

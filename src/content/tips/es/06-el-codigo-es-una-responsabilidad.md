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

## Svelte vs. React: Una cuestión de responsabilidad

Esta filosofía es la que dio origen a **Svelte**. Rich Harris cuestionó por qué los frameworks modernos obligaban al usuario a descargar una librería pesada (el "runtime") para gestionar el DOM.

- **React:** Envía una gran cantidad de código al navegador (el Virtual DOM, el sistema de eventos, etc.). Ese código es una responsabilidad: consume memoria, tarda en descargarse y debe ejecutarse en el dispositivo del usuario.
- **Svelte:** Mueve esa responsabilidad al **tiempo de compilación**. Svelte desaparece en producción, dejando solo el código mínimo necesario para actualizar el DOM.

Al reducir la cantidad de código que viaja por el cable y que el navegador debe procesar, Svelte aplica el mantra de que el mejor código es el que no existe (en el cliente).

## El dilema: ¿Hacerlo nosotros o usar una librería?

A veces, la tentación de "no añadir dependencias" nos lleva a escribir cientos de líneas de código "personalizado" para problemas comunes. Aquí entra el **coste de oportunidad**.

Cada hora que pasas depurando tu propio sistema de validación es una hora que no dedicas a lo que realmente diferencia a tu producto.

### El valor de la comunidad y los tests

Una biblioteca pequeña, bien mantenida y con tests (como `date-fns` o `zod`) suele ser una **menor responsabilidad** que 500 líneas de código propio sin testear.

- **Seguridad:** Cientos de ojos han revisado ese código.
- **Casos borde:** Las librerías suelen manejar edge-cases que tú ni has considerado.
- **Documentación:** Ya existe, no tienes que escribirla tú.

## ¿Qué aporta valor realmente?

Tu éxito no se mide por cuántas líneas de código "original" has escrito, sino por cuánto valor has entregado con el **mínimo coste de mantenimiento** posible.

1. **Mantenimiento:** El código que no escribes nunca se rompe.
2. **Carga cognitiva:** Menos código significa que el equipo entiende el proyecto más rápido.
3. **Superficie de error:** Cada línea propia es una oportunidad para un error que solo tú puedes arreglar.

La próxima vez que vayas a escribir una nueva funcionalidad, pregúntate: **"¿Es este código un activo para mi empresa o una carga para mi futuro yo?"**.

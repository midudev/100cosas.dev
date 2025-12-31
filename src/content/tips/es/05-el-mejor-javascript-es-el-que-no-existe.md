---
id: "08"
title: "El mejor JavaScript es el JavaScript que no existe"
category: "Rendimiento"
categoryColor: "text-rose-400 bg-rose-900/20"
author: "una-kravets"
---

Una Kravets, Developer Advocate en Google Chrome, suele decir una frase que parece contradictoria para un desarrollador web: **"The best JavaScript is no JavaScript"** (El mejor JavaScript es el que no existe).

No es que Una odie JavaScript; es que entiende que JavaScript es el recurso más caro que enviamos al navegador. Tiene que ser descargado, parseado, compilado y ejecutado. Cada vez que podemos sustituir una lógica de JS por una capacidad nativa de HTML o CSS, estamos ganando en rendimiento, accesibilidad y robustez.

## La revolución declarativa: Invoker Commands API

Históricamente, para que un botón abriera un modal o un popover, necesitábamos JavaScript para escuchar el evento `click` y llamar al método correspondiente.

La nueva **Invoker Commands API** cambia las reglas del juego permitiendo definir este comportamiento de forma declarativa directamente en el HTML.

### El enfoque "Heredado": JavaScript como pegamento

```typescript
// Necesitamos esperar a que el JS cargue para que el botón funcione
const btn = document.querySelector('#open-dialog');
const dialog = document.querySelector('#my-dialog');

btn.addEventListener('click', () => {
  dialog.showModal();
});
```

### El enfoque "Nativo": Declarativo y sin JS

Con los atributos `commandfor` y `command`, el navegador se encarga de todo. Funciona al instante, incluso antes de que cargue cualquier script.

```html
<!-- Sin una sola línea de JavaScript -->
<button commandfor="my-dialog" command="show-modal">
  Abrir Modal
</button>

<dialog id="my-dialog">
  <p>Contenido del modal</p>
  <button commandfor="my-dialog" command="close">Cerrar</button>
</dialog>
```

## Popover: Adiós a las dependencias pesadas

¿Cuántas veces hemos instalado una librería de 20kb de JavaScript solo para mostrar un tooltip o un menú desplegable? El atributo `popover` nativo resuelve esto de forma espectacular.

```html
<button popovertarget="my-popover">Mostrar menú</button>

<div id="my-popover" popover>
  <p>Este es un popover nativo que maneja:</p>
  <ul>
    <li>Cierre al hacer click fuera (light dismiss)</li>
    <li>Cierre con la tecla Escape</li>
    <li>Gestión automática de capas (z-index infinito)</li>
  </ul>
</div>
```

## ¿Por qué elegir lo nativo?

1. **Rendimiento:** El navegador ejecuta el código nativo (C++) mucho más rápido que cualquier motor de JS.
2. **Resiliencia:** Si el JavaScript de tu página falla o tarda en cargar (por una mala conexión), el HTML nativo sigue funcionando.
3. **Accesibilidad (A11y):** Los elementos nativos como `<dialog>` o `popover` ya vienen con el comportamiento de teclado y roles de ARIA correctos "de caja".
4. **Menos código es menos responsabilidad:** Como diría Rich Harris, si no escribes el JS, no tienes que mantenerlo ni testearlo.

La próxima vez que vayas a escribir algo con JavaScript, detente un segundo. Mira a tu alrededor. Es muy probable que el estándar web ya haya evolucionado para que no necesites ese código.

**Abraza la plataforma. Usa lo nativo. Escribe menos JavaScript.**

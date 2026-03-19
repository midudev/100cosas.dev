---
id: "71"
title: "No optimices lo que no mediste"
category: "Rendimiento"
categoryColor: "text-amber-400 bg-amber-900/20"
author: "donald-knuth"
---

**Tu instinto de programador está equivocado el 97% de las veces cuando se trata de rendimiento.** Esa es la cifra exacta que usó Donald Knuth en su célebre paper de 1974, y décadas de experiencia en la industria le han dado la razón una y otra vez.

Ya hablamos del peligro de la optimización prematura. Pero hay un segundo consejo en la cita completa de Knuth que suele pasar desapercibido: *"Yet we should not pass up our opportunities in that critical 3%."* No debes ignorar el 3% que sí importa. ¿Y cómo encuentras ese 3%? **Midiendo.** Nunca adivinando.

## Tu intuición miente (y hay datos que lo prueban)

En los años 80, un equipo de ingenieros de IBM descubrió que los programadores identificaban correctamente el cuello de botella de sus propios programas solo un 10% de las veces. El 90% restante optimizaban funciones que no tenían impacto real en el rendimiento total.

Esto no ha cambiado. Un caso típico en el desarrollo web moderno:

```javascript
// Un desarrollador "siente" que el .map() es lento
const results = items.map(item => transformItem(item));

// Después de medir con Chrome DevTools:
// - El .map() tarda 0.4ms
// - La llamada fetch a la API tarda 1200ms
// - El parsing del JSON de respuesta tarda 45ms

// El desarrollador pasó 3 horas optimizando el .map()
// cuando el 99.96% del tiempo lo consumía la red
```

La historia de Firefox es reveladora: cuando el equipo de Mozilla decidió mejorar el tiempo de arranque del navegador, su primera reacción fue optimizar el parsing de JavaScript. Tras medir con profilers, descubrieron que el cuello de botella real era la lectura de disco de los archivos de perfil del usuario. Ningún ingeniero lo habría adivinado sin datos.

## El arsenal de medición de un profesional

Medir no es poner un `console.log` con la hora. Existen herramientas diseñadas específicamente para revelar dónde se esconde el rendimiento perdido.

```javascript
// ❌ Medición de amateur: imprecisa y manual
console.log('Inicio:', Date.now());
await procesarDatos();
console.log('Fin:', Date.now());

// ✅ Medición profesional: precisa y con contexto
// 1. Performance API del navegador
performance.mark('proceso-inicio');
await procesarDatos();
performance.mark('proceso-fin');
performance.measure('procesamiento', 'proceso-inicio', 'proceso-fin');

const medida = performance.getEntriesByName('procesamiento')[0];
console.log(`Duración: ${medida.duration.toFixed(2)}ms`);

// 2. Para Node.js: el módulo perf_hooks
import { performance, PerformanceObserver } from 'node:perf_hooks';

const obs = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);
  }
});
obs.observe({ entryTypes: ['measure'] });
```

Más allá del código, las herramientas de profiling visual cambian las reglas del juego. Chrome DevTools tiene el panel Performance que graba flame charts mostrando exactamente dónde pasa tiempo tu aplicación. Node.js tiene el flag `--prof` que genera informes de profiling a nivel de V8. Y herramientas como Clinic.js pueden diagnosticar problemas de event loop, I/O y memoria con un solo comando.

## Los tres pecados de la optimización sin datos

1. **Optimizar lo equivocado:** Pasas horas mejorando un algoritmo de ordenación que se ejecuta una vez al día con 50 elementos, mientras la consulta a base de datos que se ejecuta 10.000 veces por segundo no tiene índice.

2. **Empeorar lo que intentas mejorar:** Sin medir antes y después, no tienes prueba de que tu "optimización" haya mejorado algo. En muchos casos, el código "optimizado" es más lento porque rompe las heurísticas de optimización del motor de JavaScript.

3. **Sacrificar mantenibilidad por nada:** Reemplazas código legible por trucos crípticos que ahorran 0.01ms en una operación que el usuario nunca percibe.

## El ciclo profesional: Mide, Identifica, Actúa, Verifica

El enfoque correcto tiene cuatro pasos, y ninguno es opcional:

1. **Mide** el estado actual con datos reales (no con datos sintéticos en local).
2. **Identifica** el cuello de botella real con un profiler, no con tu intuición.
3. **Actúa** sobre ese punto específico con una optimización dirigida.
4. **Verifica** que la mejora es real midiendo de nuevo en las mismas condiciones.

```javascript
// Ejemplo real: optimización guiada por datos
// Paso 1: Medimos y descubrimos que renderProducts tarda 340ms
// Paso 2: El profiler muestra que el 80% es recálculo de descuentos
// Paso 3: Memoizamos solo los descuentos
const discountCache = new Map();

function getDiscount(productId) {
  if (discountCache.has(productId)) return discountCache.get(productId);
  const discount = calculateComplexDiscount(productId);
  discountCache.set(productId, discount);
  return discount;
}

// Paso 4: Medimos de nuevo → 45ms. Mejora del 87%.
// Y solo tocamos la función que importaba.
```

Knuth no era un enemigo de la optimización. Era un enemigo de la superstición disfrazada de ingeniería. **Medir es lo que transforma una corazonada en una decisión informada.** La próxima vez que sientas la urgencia de "optimizar" algo, abre un profiler antes de abrir el editor. Los datos nunca mienten; tu instinto, casi siempre.

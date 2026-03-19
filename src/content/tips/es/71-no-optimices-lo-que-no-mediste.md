---
id: "71"
title: "No optimices lo que no mediste"
category: "Rendimiento"
categoryColor: "text-amber-400 bg-amber-900/20"
author: "donald-knuth"
---

Donald Knuth, leyenda de la ciencia computacional, nos dio la famosa frase sobre la optimización prematura. Pero el contexto completo es aún más valioso: **mide antes de optimizar, porque tu intuición te engaña**.

## Tu intuición miente

```javascript
// "Este map es lento, debería usar un for clásico"
const result = items.map(x => x * 2);

// Después de medir: map toma 0.3ms
// El fetch a la API toma 800ms

// Optimizaste lo que no importaba
```

## Cómo medir correctamente

```javascript
// Medición básica
console.time('operación');
await tuOperación();
console.timeEnd('operación');

// Medición más precisa
const start = performance.now();
await tuOperación();
const duration = performance.now() - start;
console.log(`Duración: ${duration}ms`);
```

## Qué medir

1. **Tiempo de respuesta de APIs**
2. **Tiempo de renderizado**
3. **Uso de memoria**
4. **Tamaño de bundle**

## Reflexión final

Knuth no dijo "nunca optimices". Dijo "no optimices sin datos". La diferencia entre un optimizador novato y uno experto es que el experto mide primero.

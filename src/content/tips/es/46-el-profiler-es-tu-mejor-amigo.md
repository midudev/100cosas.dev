---
id: "46"
title: "El profiler es tu mejor amigo, no tu intuición"
category: "Rendimiento"
categoryColor: "text-amber-400 bg-amber-900/20"
author: "john-carmack"
---

John Carmack, la leyenda que programó Doom, Quake y revolucionó los gráficos 3D, tiene una regla de oro para la optimización: **"Nunca confíes en tu intuición. Mide primero"**.

## La trampa del "esto debe ser lento"

Los programadores tenemos un sexto sentido para detectar código "lento". El problema es que ese sentido miente constantemente.

```javascript
// "Obviamente" esto es lo lento
const result = items
  .filter(item => item.active)
  .map(item => expensiveTransform(item))
  .reduce((acc, item) => acc + item.value, 0);

// Pero el profiler revela: el 95% del tiempo está en
// una llamada HTTP que ni siquiera sospechábamos
```

## Carmack y la obsesión por medir

Cuando Carmack optimizaba Doom en 1993, cada frame contaba. Su enfoque:

1. **Medir el estado actual** (no adivinar)
2. **Identificar el cuello de botella real**
3. **Optimizar solo eso**
4. **Medir de nuevo**

```c
// Carmack no asumía - medía
// Descubrió que el rendering de paredes era el 60% del frame time
// Se enfocó solo en eso, ignorando lo "obvio"
```

## Herramientas modernas

### Para JavaScript/Web

```javascript
// Chrome DevTools Performance
// 1. Abre DevTools → Performance
// 2. Graba una acción
// 3. Analiza el flame chart

// O programáticamente:
console.time('operación');
await tuOperación();
console.timeEnd('operación');

// Para más detalle:
performance.mark('inicio');
await tuOperación();
performance.mark('fin');
performance.measure('operación', 'inicio', 'fin');
```

### Para Node.js

```bash
# Profiling con clinic.js
npx clinic doctor -- node server.js

# O con el profiler nativo
node --prof app.js
node --prof-process isolate-*.log > processed.txt
```

### Para React

```jsx
// React DevTools Profiler
// O programáticamente:
import { Profiler } from 'react';

<Profiler id="List" onRender={(id, phase, actualDuration) => {
  console.log(`${id} renderizó en ${actualDuration}ms`);
}}>
  <ExpensiveList items={items} />
</Profiler>
```

## El 90/10 real

La regla del 90/10 dice que el 90% del tiempo se gasta en el 10% del código. Pero **no sabes qué 10% es hasta que mides**.

```javascript
// Lo que asumimos que era lento:
function processData(data) {
  return data.map(item => complexCalculation(item)); // ← "Aquí está el problema"
}

// Lo que el profiler reveló:
function processData(data) {
  const result = data.map(item => complexCalculation(item));
  logToRemoteServer(result); // ← El verdadero cuello de botella
  return result;
}
```

## Optimización ciega vs. informada

### ❌ Optimización ciega

```javascript
// "Esto debería ser más rápido"
const result = [];
for (let i = 0; i < items.length; i++) {
  result.push(items[i] * 2);
}

// vs map (que era igual de rápido o más rápido)
```

### ✅ Optimización informada

```javascript
// El profiler mostró: 500ms en JSON.parse de un archivo de 50MB
// Solución real: streaming parsing
const stream = require('stream-json');
```

## Reflexión final

Carmack podría haber asumido dónde estaban los problemas de rendimiento en Doom. Tenía la experiencia para hacerlo. Pero eligió medir. Y eso hizo que Doom corriera en hardware que nadie creía posible. Tu intuición es valiosa para generar hipótesis. El profiler es quien las valida.

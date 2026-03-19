---
id: "88"
title: "Primero que funcione, luego que sea bonito"
category: "Proceso"
categoryColor: "text-blue-400 bg-blue-900/20"
author: "dan-abramov"
---

Dan Abramov recuerda constantemente: **la primera versión de cualquier código será fea, y eso está bien**.

## El proceso real

```javascript
// Versión 1: funciona pero es feo
function stuff(x) {
  let r = [];
  for (let i = 0; i < x.length; i++) {
    if (x[i].a) r.push(x[i]);
  }
  return r;
}

// Versión 2: tiene tests, ahora puedo refactorizar
const getActiveItems = items => items.filter(item => item.isActive);
```

## Reflexión final

El código feo que funciona es infinitamente más valioso que el código bonito que no existe. Refactoriza después, no durante.

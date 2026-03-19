---
id: "76"
title: "El código es comunicación entre humanos"
category: "Legibilidad"
categoryColor: "text-teal-400 bg-teal-900/20"
author: "martin-fowler"
---

Martin Fowler lo resume perfectamente: **"Cualquier tonto puede escribir código que un ordenador entienda. Los buenos programadores escriben código que los humanos entienden"**.

## Código para máquinas vs. humanos

```javascript
// ❌ La máquina lo entiende, el humano no
const r = d.filter(i => i.a && i.b > 5).map(i => ({...i, c: i.b * 2}));

// ✅ Ambos lo entienden
const activeHighValueItems = items
  .filter(item => item.isActive && item.value > 5)
  .map(item => ({
    ...item,
    doubledValue: item.value * 2
  }));
```

## Escribe para tu yo de las 3am

El código que escribes hoy lo leerá alguien (probablemente tú) a las 3am cuando hay un bug en producción. Hazle un favor a esa persona.

## Reflexión final

El código se lee 10 veces más de lo que se escribe. Optimiza para lectura, no para escritura.

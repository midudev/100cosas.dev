---
id: "53"
title: "Las estructuras de datos dominan. Si las eliges bien, los algoritmos son obvios"
category: "Fundamentos"
categoryColor: "text-purple-400 bg-purple-900/20"
author: "linus-torvalds"
---

Linus Torvalds, creador de Linux y Git, tiene una perspectiva que va contra la obsesión por los algoritmos: **"Los malos programadores se preocupan por el código. Los buenos programadores se preocupan por las estructuras de datos"**.

## El problema de pensar en algoritmos primero

```javascript
// Problema: encontrar duplicados en una lista
// Enfoque "algoritmo primero": nested loops
function findDuplicates(arr) {
  const duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j] && !duplicates.includes(arr[i])) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}
// O(n³) - un desastre
```

## El enfoque de Linus: estructura primero

```javascript
// Misma problema, pero eligiendo la estructura correcta
function findDuplicates(arr) {
  const seen = new Set();
  const duplicates = new Set();
  
  for (const item of arr) {
    if (seen.has(item)) {
      duplicates.add(item);
    }
    seen.add(item);
  }
  
  return [...duplicates];
}
// O(n) - el algoritmo "se escribe solo"
```

La elección de usar `Set` hace que el algoritmo sea obvio.

## Ejemplos del mundo real

### Caché de usuarios

```javascript
// ❌ Array - búsqueda O(n)
const usersCache = [];
const findUser = id => usersCache.find(u => u.id === id);

// ✅ Map - búsqueda O(1)
const usersCache = new Map();
const findUser = id => usersCache.get(id);
```

### Máquina de estados con un objeto

Imagina que tienes que gestionar los estados de un pedido y qué transiciones están permitidas. El enfoque típico es llenar el código de condicionales:

```typescript
// ❌ Lógica de control dispersa: crece exponencialmente con cada estado nuevo
function canChangeStatus(current: Status, next: Status): boolean {
  if (current === 'pendiente' && (next === 'pagado' || next === 'cancelado')) {
    return true;
  }
  if (current === 'pagado' && (next === 'enviado' || next === 'cancelado')) {
    return true;
  }
  if (current === 'enviado' && next === 'entregado') {
    return true;
  }
  return false;
}
```

Pero si modelas las reglas de negocio como una estructura de datos, el código se escribe solo:

```typescript
type Status = 'pendiente' | 'pagado' | 'enviado' | 'entregado' | 'cancelado';

const ALLOWED_TRANSITIONS: Record<Status, Status[]> = {
  pendiente: ['pagado', 'cancelado'],
  pagado: ['enviado', 'cancelado'],
  enviado: ['entregado'],
  entregado: [],
  cancelado: []
};

function canChangeStatus(current: Status, next: Status): boolean {
  return ALLOWED_TRANSITIONS[current].includes(next);
}
```

Las reglas del negocio están en un solo lugar, son fáciles de leer y añadir un nuevo estado es cuestión de tocar un objeto, no una cadena de `if`.

## Git: un ejemplo de diseño por estructuras

Git es brillante porque Linus eligió bien las estructuras:

```
Blob     → Contenido de archivo (hash → contenido)
Tree     → Directorio (lista de blobs y trees)
Commit   → Snapshot (apunta a tree + metadata)
Branch   → Puntero a commit (solo eso!)
```

Con estas estructuras simples:
- El diff es comparar trees
- El merge es combinar trees
- El checkout es cambiar un puntero

Los "algoritmos" son triviales porque las estructuras son correctas.

## Cómo pensar en estructuras

1. **¿Qué operaciones necesito?**
   - Búsqueda frecuente → Hash Map
   - Orden importa → Array o Linked List
   - Último en entrar, primero en salir → Stack
   - Primero en entrar, primero en salir → Queue

2. **¿Cuál es el caso común?**
   - ¿Leo más de lo que escribo? → Optimiza lectura
   - ¿Datos ordenados? → Árbol de búsqueda
   - ¿Unicidad importante? → Set

Cuando te enfrentes a un problema complejo, detente y pregunta: **"¿Hay alguna forma de organizar mis datos que haga que este código sea innecesario?"** La respuesta, sorprendentemente a menudo, es sí. La programación no es sobre ser ingenioso con algoritmos; es sobre modelar datos de forma que el código que los manipula sea obvio.

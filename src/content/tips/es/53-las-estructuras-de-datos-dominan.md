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

### Historial con undo/redo

```javascript
// La estructura correcta (stack) hace el código trivial
class History {
  constructor() {
    this.undoStack = [];
    this.redoStack = [];
  }
  
  push(state) {
    this.undoStack.push(state);
    this.redoStack = []; // Clear redo on new action
  }
  
  undo() {
    if (this.undoStack.length === 0) return null;
    const state = this.undoStack.pop();
    this.redoStack.push(state);
    return this.undoStack[this.undoStack.length - 1];
  }
  
  redo() {
    if (this.redoStack.length === 0) return null;
    const state = this.redoStack.pop();
    this.undoStack.push(state);
    return state;
  }
}
```

### Contador de frecuencias

```javascript
// ❌ Enfoque imperativo complejo
function countFrequencies(items) {
  const result = {};
  for (const item of items) {
    if (result[item] === undefined) {
      result[item] = 0;
    }
    result[item] += 1;
  }
  return result;
}

// ✅ Map con valor por defecto
function countFrequencies(items) {
  const counts = new Map();
  for (const item of items) {
    counts.set(item, (counts.get(item) || 0) + 1);
  }
  return counts;
}
```

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

Linus nos enseña que la programación no es sobre ser ingenioso con algoritmos. Es sobre modelar datos de forma que el código que los manipula sea obvio. Elige bien tus estructuras y los algoritmos se escribirán solos.

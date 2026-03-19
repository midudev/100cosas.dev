---
id: "73"
title: "El estado mutable es la raíz de todos los males"
category: "Arquitectura"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "rich-harris"
---

Rich Harris, aunque creó Svelte con estado mutable por simplicidad, reconoce un principio fundamental: **cuanto menos estado mutable tengas, menos bugs tendrás**.

## El problema del estado compartido

```javascript
// ❌ Estado mutable compartido
let cart = [];

function addItem(item) {
  cart.push(item); // Mutación
}

function getTotal() {
  return cart.reduce((sum, item) => sum + item.price, 0);
}

// En otro lugar del código...
cart = []; // Alguien resetea el carrito
// Y ahora getTotal() devuelve 0 inesperadamente
```

## Estado inmutable

```javascript
// ✅ Cada operación devuelve un nuevo estado
function addItem(cart, item) {
  return [...cart, item];
}

function removeItem(cart, itemId) {
  return cart.filter(item => item.id !== itemId);
}

// El estado nunca se modifica, se reemplaza
let cart = [];
cart = addItem(cart, { id: 1, price: 10 });
cart = addItem(cart, { id: 2, price: 20 });
```

## Beneficios

1. **Predecibilidad**: Mismo input = mismo output
2. **Debugging fácil**: Puedes "viajar en el tiempo"
3. **Concurrencia segura**: Sin race conditions

## Reflexión final

No necesitas eliminar todo estado mutable. Pero cada pieza de estado mutable es un lugar donde pueden esconderse bugs. Minimízalo donde puedas.

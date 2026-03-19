---
id: "73"
title: "Mutable state is the root of all evil"
category: "Architecture"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "rich-harris"
---

Rich Harris, although he created Svelte with mutable state for simplicity, recognizes a fundamental principle: **the less mutable state you have, the fewer bugs you'll have**.

## The shared state problem

```javascript
// ❌ Shared mutable state
let cart = [];

function addItem(item) {
  cart.push(item); // Mutation
}

// Somewhere else in the code...
cart = []; // Someone resets the cart unexpectedly
```

## Immutable state

```javascript
// ✅ Each operation returns new state
function addItem(cart, item) {
  return [...cart, item];
}

// State is never modified, it's replaced
let cart = [];
cart = addItem(cart, { id: 1, price: 10 });
```

## Benefits

1. **Predictability**: Same input = same output
2. **Easy debugging**: You can "time travel"
3. **Safe concurrency**: No race conditions

## Final reflection

You don't need to eliminate all mutable state. But each piece of mutable state is a place where bugs can hide. Minimize it where you can.

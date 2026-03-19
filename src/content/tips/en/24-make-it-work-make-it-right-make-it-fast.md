---
id: "24"
title: "Make it work, make it right, make it fast"
category: "Methodology"
categoryColor: "text-violet-400 bg-violet-900/20"
author: "kent-beck"
---

**Kent Beck**, creator of Test-Driven Development (TDD) and Extreme Programming, left us a mantra that should guide every line of code we write: **"Make it work, make it right, make it fast"** — in that exact order.

This order is not arbitrary; it's a deliberate strategy to avoid the most common traps in software development: analysis paralysis, premature optimization, and over-engineering.

## The three phases of professional code

### Phase 1: Make it work

The first objective is for the code to **do what it needs to do**. Nothing more. It doesn't matter if it's ugly, if it has duplication, or if it's not efficient. The only thing that matters is that the tests pass (or if you don't have tests, that the functionality is verified).

```typescript
// PHASE 1: It works, but it's ugly
function calculateTotal(items: Item[]) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i].type === 'product') {
      total = total + items[i].price;
      if (items[i].taxable) {
        total = total + (items[i].price * 0.21);
      }
    }
    if (items[i].type === 'service') {
      total = total + items[i].price;
      total = total + (items[i].price * 0.21); // Services always have VAT
    }
  }
  return total;
}

// ✅ It works. The test passes. Next phase.
```

### Phase 2: Make it right

Now that it works, it's time to **refactor**. Remove duplication, improve names, extract functions, apply patterns where they make sense. The goal is for the code to be readable, maintainable, and clearly express its intention.

```typescript
// PHASE 2: Refactored and clear
const TAX_RATE = 0.21;

interface Item {
  type: 'product' | 'service';
  price: number;
  taxable?: boolean;
}

function calculateItemTax(item: Item): number {
  const isTaxable = item.type === 'service' || item.taxable;
  return isTaxable ? item.price * TAX_RATE : 0;
}

function calculateTotal(items: Item[]): number {
  return items.reduce((total, item) => {
    return total + item.price + calculateItemTax(item);
  }, 0);
}

// ✅ Readable, maintainable, testable. Next phase (if needed).
```

### Phase 3: Make it fast

Only when you have **evidence** that performance is a problem, you optimize. This phase may never come for many functions, and that's fine. Most code doesn't need to be "fast"; it needs to be correct and maintainable.

```typescript
// PHASE 3: Optimized (only if there's evidence it's necessary)
// For example, if we process millions of items and the profiler
// shows this function is a bottleneck

function calculateTotalOptimized(items: Item[]): number {
  let total = 0;
  const len = items.length;
  
  for (let i = 0; i < len; i++) {
    const item = items[i];
    const price = item.price;
    total += price;
    
    if (item.type === 'service' || item.taxable) {
      total += price * 0.21; // Inlined to avoid function call
    }
  }
  
  return total;
}

// ⚠️ Faster, but less readable. 
// Only justified with real performance data.
```

## Why the order matters

### ❌ If you try to make it fast first

You optimize code that might not even work correctly. You introduce unnecessary complexity. You waste time on micro-optimizations that don't matter.

### ❌ If you try to make it right first

You fall into analysis paralysis. You design abstractions for cases that don't exist. You never get to validate if your solution solves the real problem.

### ✅ If you follow the correct order

1. **You validate quickly:** You discover if your approach is viable before investing in polishing it.
2. **You refactor safely:** The tests from phase 1 protect you while improving the code.
3. **You optimize with data:** You only touch performance when you have metrics that justify it.

## TDD: The guardian of the process

Kent Beck created TDD precisely to enforce this order:

1. **Red:** Write a failing test. Define what "working" means.
2. **Green:** Write the minimum code to make the test pass. "Make it work".
3. **Refactor:** Improve the code without breaking the test. "Make it right".

The Red-Green-Refactor cycle is the practical implementation of "Make it work, make it right, make it fast" (with the "fast" phase reserved for when there's evidence).

## The perfectionism trap

Many developers skip phase 1 because they're embarrassed to write "ugly" code. But ugly code that works is infinitely more valuable than beautiful code that doesn't exist.

As Kent Beck says: *"I'm not a great programmer; I'm just a good programmer with great habits."*

The habit of following this order — work, improve, optimize — is what separates professionals from amateurs. **First solve the problem. Then make it pretty. And only at the end, if necessary, make it fast.**

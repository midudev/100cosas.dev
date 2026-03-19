---
id: "60"
title: "Refactor mercilessly, but with tests"
category: "Clean Code"
categoryColor: "text-green-400 bg-green-900/20"
author: "martin-fowler"
---

Martin Fowler, author of the book "Refactoring" that defined the term, has a rule that seems contradictory: **refactor constantly and mercilessly, but never without tests**.

## What refactoring is (and isn't)

```javascript
// ❌ This is NOT refactoring
// You're changing behavior
function calculateTotal(items) {
  return items.reduce((sum, i) => sum + i.price, 0);
}
// Becomes:
function calculateTotal(items) {
  // Now applies discounts (new behavior)
  return items.reduce((sum, i) => sum + i.price * 0.9, 0);
}

// ✅ This IS refactoring
// Same behavior, better structure
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}
// Becomes:
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

Observable behavior is identical. Only internal structure changes.

## Why tests first

Without tests, you don't know if you broke something. With tests, you refactor with confidence. If tests pass, behavior is correct.

## The refactoring cycle

```
1. Run tests (must pass)
2. Make ONE small change
3. Run tests (must pass)
4. Repeat
```

Never make multiple refactorings without verifying tests pass between each one.

## When to refactor

Fowler suggests the "rule of three":

1. **First time**: Just do it
2. **Second time**: Notice the duplication, but continue
3. **Third time**: Refactor

## Final reflection

Fowler transformed refactoring from "something you do when you have time" to "integral part of development". With tests, refactoring stops being risky and becomes code hygiene. Without tests, it's blind surgery.

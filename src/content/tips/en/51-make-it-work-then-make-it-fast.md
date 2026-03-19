---
id: "51"
title: "Make it work, make it right, make it fast (in that order)"
category: "Process"
categoryColor: "text-blue-400 bg-blue-900/20"
author: "kent-beck"
---

Kent Beck, creator of Extreme Programming and TDD pioneer, has a mantra that defines how to approach any programming problem: **"Make it work, make it right, make it fast"** - and the order matters.

## Why the order is crucial

The natural temptation is to try to do all three at once. We want code that works, is elegant, and is fast from the first moment. But this leads to:

- **Analysis paralysis**: We think too much before writing
- **Premature optimization**: We optimize code we might not need
- **Speculative architecture**: We design for cases that never arrive

## Phase 1: Make it work

```javascript
// The ugliest code that solves the problem
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i].type === 'product') {
      total = total + items[i].price;
      if (items[i].discount) {
        total = total - items[i].discount;
      }
    } else if (items[i].type === 'service') {
      total = total + items[i].hourlyRate * items[i].hours;
    }
  }
  if (total > 100) {
    total = total * 0.9; // 10% discount
  }
  return total;
}

// Ugly? Yes. Works? YES.
// We have a passing test. We can continue.
```

This phase is about **validating that you understand the problem**. Ugly code that works is worth more than elegant code that doesn't exist.

## Phase 2: Make it right

```javascript
// Now we refactor with confidence (we have tests)
function calculateTotal(items) {
  const subtotal = items.reduce((sum, item) => {
    return sum + calculateItemPrice(item);
  }, 0);
  
  return applyBulkDiscount(subtotal);
}

function calculateItemPrice(item) {
  switch (item.type) {
    case 'product':
      return item.price - (item.discount || 0);
    case 'service':
      return item.hourlyRate * item.hours;
    default:
      return 0;
  }
}

function applyBulkDiscount(total) {
  const BULK_THRESHOLD = 100;
  const BULK_DISCOUNT = 0.1;
  
  return total > BULK_THRESHOLD 
    ? total * (1 - BULK_DISCOUNT) 
    : total;
}
```

The code is more readable, more testable, more maintainable. And **we know it still works** because the tests pass.

## Phase 3: Make it fast (only if necessary)

```javascript
// The profiler shows this is called 1 million times
// NOW we optimize, not before

function calculateTotal(items) {
  let sum = 0;
  const len = items.length;
  
  // Avoid property access in the loop
  for (let i = 0; i < len; i++) {
    const item = items[i];
    sum += item.type === 'product' 
      ? item.price - (item.discount || 0)
      : item.hourlyRate * item.hours;
  }
  
  return sum > 100 ? sum * 0.9 : sum;
}

// Less readable, but 3x faster
// And we only got here when IT WAS NECESSARY
```

## Why most people skip to phase 3

Premature optimization is seductive because:

1. **It feels productive**: "I'm writing efficient code"
2. **It's technically interesting**: Performance tricks are fun
3. **It avoids the hard part**: Understanding the real problem

## The reality

90% of code never reaches phase 3. It's fast enough as is. Kent Beck knows this, and that's why he insists on the order.

## Final reflection

Next time you find yourself thinking about performance before having something working, remember: the fastest code is the code you don't need to write because the feature was discarded. First make it work.

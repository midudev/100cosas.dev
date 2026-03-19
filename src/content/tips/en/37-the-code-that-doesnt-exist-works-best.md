---
id: "37"
title: "The code that doesn't exist works best"
category: "Craftsmanship"
categoryColor: "text-emerald-400 bg-emerald-900/20"
author: "carlos-ble"
---

Carlos Blé, author of the first book in Spanish about TDD and founder of Lean Mind, has spent over two decades helping teams write better software. His philosophy is summarized in an apparent paradox: **the best code is the code you don't need to write**.

## The productivity trap

We measure programmers by lines of code written, features delivered, commits per day. But these metrics ignore an uncomfortable truth: **every line of code is a liability, not an asset**.

Code that doesn't exist:

- Has no bugs
- Needs no tests
- Requires no documentation
- Needs no maintenance
- Can't become legacy

## TDD: the art of writing just enough

Test-Driven Development isn't just a technique to avoid bugs. It's a discipline for **writing exactly the necessary code and not a line more**:

```javascript
// 1. Write a failing test
test('calculates VAT correctly', () => {
  expect(calculateVAT(100)).toBe(21);
});

// 2. Write the minimum code to make it pass
function calculateVAT(base) {
  return base * 0.21;
}

// 3. Refactor if necessary (not if possible)
```

The Red-Green-Refactor cycle forces you to constantly ask: is this necessary now?

## The "You Aren't Gonna Need It" rule (YAGNI)

Carlos insists: *"Don't build for an imaginary future. Build for the known present"*.

```javascript
// ❌ Anticipated over-engineering
class UserRepositoryFactoryAbstractSingletonProxy {
  // 500 lines for "when we scale"
}

// ✅ What you actually need today
async function getUser(id) {
  return await db.users.findById(id);
}
```

## Agile Design: emerges from tests

Good design isn't planned in UML diagrams for weeks. It **emerges organically** from writing tests first:

1. Tests force you to think about the API before the implementation
2. Tests reveal unnecessary dependencies
3. Tests document expected behavior

## Legacy code starts on day one

> "Legacy code isn't old code. It's code without tests"

This definition by Michael Feathers, which Carlos has adopted and taught, changes the perspective: you can write legacy code on your first day if it's not testable.

## Refactoring: the art of deleting

The best refactors don't add code, **they remove it**:

```javascript
// Before: 47 lines
function processOrder(order, user, config, options, flags) {
  // Tangled logic...
}

// After: the same behavior in 12 lines
function processOrder(order) {
  // Simplicity emerges by eliminating the unnecessary
}
```

## Final reflection

In an industry obsessed with building more, Carlos reminds us that the true craftsman knows when **not** to write code. Technical excellence isn't in the complexity you can create, but in the simplicity you can maintain.

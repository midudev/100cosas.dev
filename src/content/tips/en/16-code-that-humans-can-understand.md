---
id: "16"
title: "Any fool can write code that a computer can understand"
category: "Readability"
categoryColor: "text-teal-400 bg-teal-900/20"
author: "martin-fowler"
---

**Martin Fowler**, author of *Refactoring* and one of the most influential voices in software architecture, left us this devastating reflection: **"Any fool can write code that a computer can understand. Good programmers write code that humans can understand."**

This phrase is a direct blow to the ego of programmers who take pride in their "clever" or "compact" code. The computer doesn't judge your code; it executes it blindly. It's your teammates, your future self, and the poor developers who will inherit your project who will suffer if you prioritize brevity over clarity.

## The myth of "elegant" code

There's a dangerous confusion between *concise* code and *readable* code. A 200-character one-liner might be technically brilliant, but if your colleague needs 20 minutes to decipher it, it's not elegant; it's an obstacle.

```typescript
// ❌ LEVEL 1: "Clever" (the computer understands it, you don't)
const r = d.filter(x => x.a && x.b > 5).reduce((p, c) => ({...p, [c.id]: c.v * (c.d ? 1.1 : 1)}), {});

// ✅ LEVEL 2: Readable (humans understand it)
const TAX_MULTIPLIER = 1.1;

function calculateProductPrices(products: Product[]): Record<string, number> {
  const activeProducts = products.filter(product => product.isActive);
  const expensiveProducts = activeProducts.filter(product => product.price > 5);
  
  const priceMap: Record<string, number> = {};
  
  for (const product of expensiveProducts) {
    const basePrice = product.value;
    const finalPrice = product.hasTax ? basePrice * TAX_MULTIPLIER : basePrice;
    priceMap[product.id] = finalPrice;
  }
  
  return priceMap;
}
```

Does the second example have more lines? Yes. Does it take longer to write? A bit. Does it take less time to understand, modify, and debug? **Infinitely less.** And that's what matters.

## Refactoring as an act of communication

Fowler's book *Refactoring* isn't just about improving code; it's about improving how we communicate through code. Each refactoring (extract method, rename variable, introduce explaining object) is a way to make the code's intention clearer to the next reader.

### Fundamental clarity techniques

1. **Names that reveal intention:**

```typescript
// ❌ Cryptic
const d = new Date().getTime() - u.c;

// ✅ Clear
const millisecondsSinceUserCreation = Date.now() - user.createdAt;
```

2. **Small functions with a single purpose:**

```typescript
// ❌ Function that does "everything"
function processOrder(order) {
  // 50 lines of validation, tax calculation,
  // sending emails, inventory updates...
}

// ✅ Functions that read like a table of contents
function processOrder(order: Order) {
  validateOrder(order);
  const total = calculateTotalWithTax(order);
  updateInventory(order.items);
  sendConfirmationEmail(order.customer, total);
}
```

3. **Eliminate unnecessary comments by writing self-explanatory code:**

```typescript
// ❌ The comment compensates for bad code
// Increment the failed attempts counter
cnt++;

// ✅ The code explains itself
failedLoginAttempts++;
```

## The economic cost of unreadable code

Fowler understands that software is a business asset. Every minute a developer spends deciphering cryptic code is money lost. Every bug introduced because someone didn't understand a "clever" function is money lost. Every developer who abandons a project out of frustration is money lost.

Writing readable code is not a luxury or an aesthetic whim; it's an **economic investment** with guaranteed returns.

## The readable code test

Before committing, ask yourself:

1. Would a junior developer on my team understand this without help?
2. Will I myself understand this in 6 months?
3. Can I read the code out loud and have it sound like a coherent sentence?

If the answer to any of these questions is "no," refactor. Not for the computer. **For the humans who will come after.**

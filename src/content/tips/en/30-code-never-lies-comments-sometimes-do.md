---
id: "30"
title: "Code never lies, comments sometimes do"
category: "Documentation"
categoryColor: "text-amber-400 bg-amber-900/20"
author: "ron-jeffries"
---

**Ron Jeffries**, one of the three founders of Extreme Programming along with Kent Beck and Ward Cunningham, warns us with this uncomfortable truth: **"Code never lies, comments sometimes do."**

This phrase isn't an attack on documentation; it's a reminder that code is the **only source of truth** about what a program does. Comments are opinions, interpretations, or worse, outdated memories of what the code *used to* do.

## The lifecycle of a lying comment

1. **Day 1:** A developer writes a function and adds an explanatory comment.
2. **Day 30:** Another developer modifies the function for a new requirement.
3. **Day 30 (minute 5):** The developer forgets to update the comment.
4. **Day 90:** A third developer reads the comment, trusts it, and writes code based on false information.
5. **Day 91:** Bug in production.

```typescript
// ❌ The comment lies
// Calculates total with 21% VAT
function calculateTotal(price: number): number {
  return price * 1.10; // Someone changed VAT to 10% but not the comment
}

// ✅ The code speaks for itself
const VAT_RATE = 0.10;

function calculateTotalWithVat(price: number): number {
  return price * (1 + VAT_RATE);
}
```

## When are comments useful?

Ron Jeffries doesn't say comments are always bad. There are cases where they're valuable:

### 1. Explain the "why", not the "what"

Code shows *what* it does. The comment can explain *why* that decision was made.

```typescript
// ✅ The comment provides context the code cannot
function processPayment(amount: number): void {
  // Stripe requires amounts in cents, not dollars
  // See: https://stripe.com/docs/currencies#zero-decimal
  const amountInCents = Math.round(amount * 100);
  stripe.charge(amountInCents);
}
```

### 2. Warnings about non-obvious consequences

```typescript
// ✅ Legitimate warning
// CAUTION: This function clears the global cache.
// Only call during the deploy process.
function clearGlobalCache(): void {
  globalCache.flush();
}
```

### 3. References to external documentation

```typescript
// ✅ Useful reference
// Implementation of the Luhn algorithm for card validation
// RFC: https://en.wikipedia.org/wiki/Luhn_algorithm
function isValidCardNumber(cardNumber: string): boolean {
  // ...
}
```

## Comments that should be code

Most comments exist because the code isn't expressive enough. Instead of commenting, **refactor**.

```typescript
// ❌ BEFORE: Comment compensating for cryptic code
function calc(a: number, b: number, t: string): number {
  // If type is 'p', apply premium discount of 20%
  // Otherwise, apply standard discount of 10%
  if (t === 'p') {
    return a * b * 0.8;
  }
  return a * b * 0.9;
}
```

```typescript
// ✅ AFTER: The code explains itself
const PREMIUM_DISCOUNT = 0.20;
const STANDARD_DISCOUNT = 0.10;

type CustomerType = 'premium' | 'standard';

function calculateDiscountedPrice(
  quantity: number,
  unitPrice: number,
  customerType: CustomerType
): number {
  const subtotal = quantity * unitPrice;
  const discountRate = customerType === 'premium' 
    ? PREMIUM_DISCOUNT 
    : STANDARD_DISCOUNT;
  
  return subtotal * (1 - discountRate);
}
```

## The redundant comment test

Before writing a comment, ask yourself:

1. Can I improve the variable/function name so the comment is unnecessary?
2. Can I extract a function with a descriptive name?
3. Can I use a named constant instead of a magic value?

If the answer to any of these is "yes," refactor instead of comment.

## Code as living documentation

The Extreme Programming philosophy, which Ron Jeffries pioneered, promotes the idea that well-written code is its own documentation. Tests are executable documentation. Names are inline documentation. Structure is architectural documentation.

```typescript
// The code tells a clear story
const activeUsers = users.filter(user => user.isActive);
const premiumUsers = activeUsers.filter(user => user.subscription === 'premium');
const eligibleForPromotion = premiumUsers.filter(user => user.purchaseCount > 10);

sendPromotionalEmail(eligibleForPromotion);
```

There are no comments, but anyone understands exactly what's happening.

**The best comment is the one you don't need to write because your code already says it all.**

---
id: "20"
title: "Simplicity is a prerequisite for reliability"
category: "Architecture"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "edsger-dijkstra"
---

**Edsger W. Dijkstra**, Turing Award winner and one of the founding fathers of computer science, once wrote: **"Simplicity is a prerequisite for reliability."**

It's not a "nice to have," it's not an aesthetic preference: it's a **necessary condition**. If your system isn't simple, it cannot be reliable. Period.

Dijkstra dedicated his career to demonstrating that complexity is the mortal enemy of correct software. His handwritten manuscripts (known as EWDs) are a goldmine of wisdom where he argues again and again that the only way to create systems that work is by reducing their complexity to the bare minimum.

## Complexity: The silent enemy

Complexity doesn't arrive all at once. It accumulates line by line, feature by feature, patch by patch. One day you look at your code and realize that:

- No one fully understands the system.
- Small changes cause bugs in unexpected places.
- Onboarding time for new developers is measured in months, not days.
- There are parts of the code that are "better not to touch."

That's not a system; it's a **ticking time bomb**.

## Simple vs. Easy: The crucial distinction

Dijkstra would warn us not to confuse "simple" with "easy." They're different concepts:

- **Easy:** Requires little effort now.
- **Simple:** Has few interconnected parts.

Sometimes the easy solution is complex (add another if, create another exception), while the simple solution requires more initial effort (redesign, refactor).

```typescript
// ❌ LEVEL 1: "Easy" but complex
// Each special case adds complexity to the system
function calculateDiscount(user: User, product: Product, date: Date) {
  let discount = 0;
  
  if (user.isPremium) discount += 10;
  if (user.isPremium && product.category === 'electronics') discount += 5;
  if (date.getMonth() === 11) discount += 15; // December
  if (user.isPremium && date.getMonth() === 11) discount += 5; // Premium in Dec
  if (product.price > 100) discount = Math.min(discount, 20); // Cap for expensive
  if (user.isEmployee) discount = 30; // Employees always 30%
  
  // What happens if they're a premium employee in December with an expensive product?
  // Nobody knows for sure.
  
  return discount;
}
```

```typescript
// ✅ LEVEL 2: Simple and predictable
// We separate the rules and make them composable
interface DiscountRule {
  name: string;
  calculate: (context: DiscountContext) => number;
}

const discountRules: DiscountRule[] = [
  { name: 'premium', calculate: (ctx) => ctx.user.isPremium ? 10 : 0 },
  { name: 'december', calculate: (ctx) => ctx.date.getMonth() === 11 ? 15 : 0 },
  { name: 'employee', calculate: (ctx) => ctx.user.isEmployee ? 30 : 0 },
];

function calculateDiscount(context: DiscountContext): number {
  // If employee, always 30% (priority rule, clear)
  if (context.user.isEmployee) return 30;
  
  // For everyone else, we sum applicable rules (max 25%)
  const total = discountRules
    .filter(rule => rule.name !== 'employee')
    .reduce((sum, rule) => sum + rule.calculate(context), 0);
  
  return Math.min(total, 25);
}
```

## Dijkstra's principles

1. **"The competent programmer is fully aware of the strictly limited size of his own skull."** This is why simplicity matters: our brains can only hold so much complexity at once.

2. **"Testing can show the presence of bugs, but not their absence."** That's why simplicity is so important: in a simple system, you can **reason** about its correctness, not just test it.

3. **"The question of whether computers can think is like asking whether submarines can swim."** Dijkstra reminds us that analogies deceive. Simplicity forces us to be precise.

## How to cultivate simplicity

1. **Say "no" more often:** Every feature adds complexity. Do you really need it?

2. **Delete before adding:** Before writing new code, ask if you can solve the problem by removing existing code.

3. **Look for invariants:** Truths that always hold in your system simplify reasoning about it.

4. **Distrust "flexibility":** "Flexible" code is often complex code in disguise. Build for the real use case, not for every possible case.

Dijkstra left us a profession and a legacy of rigor. Honoring that legacy means resisting the temptation of complexity and seeking, in every decision, **the simplest path that works**. Because if it's not simple, it won't be reliable. And if it's not reliable, it's useless.

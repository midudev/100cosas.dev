---
id: "41"
title: "Technical debt is like financial debt: you have to pay it"
category: "Architecture"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "ward-cunningham"
---

Ward Cunningham coined the term **"technical debt"** in 1992, and it has been constantly misinterpreted ever since. The original metaphor was much more subtle than most people assume.

## What Ward really meant

Technical debt **is not bad code**. Ward defined it as:

> "Shipping code that reflects your current understanding of the problem, knowing that understanding will improve over time"

It's like taking out a loan: you get value now (ship fast) in exchange for future interest (refactoring effort).

## Good debt vs. bad debt

### Intentional debt (good)

```javascript
// "I know this design doesn't scale, but I need to validate 
// the idea with real users before investing more"
function processPayment(amount) {
  // Simple implementation that works for 100 users
  // TODO: Refactor when we have traction
  return stripe.charge(amount);
}
```

### Accidental debt (bad)

```javascript
// "I don't know what I'm doing but it works, don't touch it"
function processPayment(a, b, c, flag1, flag2) {
  if (flag1 && !flag2 || (b > 0 && c !== undefined)) {
    // 500 lines of spaghetti code
  }
}
```

## The interest on debt

Every day you don't pay the debt, interest accumulates:

1. **Reduced velocity**: Every new feature takes longer
2. **Mysterious bugs**: Fragile code breaks in unexpected places
3. **Slow onboarding**: New developers take months to understand the system
4. **Fear of change**: Nobody wants to touch "that part of the code"

## When to take on debt

Technical debt is a **strategic tool**, not an accident:

```markdown
✅ Take on debt when:
- You need to validate a business hypothesis quickly
- The cost of not shipping exceeds the cost of refactoring
- You have a clear plan to pay off the debt

❌ Don't take on debt when:
- It's the path of least resistance
- You don't understand the consequences
- You have no intention of paying it back
```

## How to pay off debt

Ward suggests a continuous approach, not big-bang:

1. **Make debt visible**: Document each conscious decision
2. **Pay small interest constantly**: Refactor while you work
3. **Don't let it accumulate**: A little debt is manageable, a lot is paralyzing

## Final reflection

Ward's metaphor is powerful precisely because it's familiar. We all understand that financial debt can be useful (mortgage for a house) or destructive (maxed-out credit cards). The same applies to code: conscious, planned debt is a tool; ignored debt is a problem.

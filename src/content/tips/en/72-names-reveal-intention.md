---
id: "72"
title: "Names reveal intention"
category: "Readability"
categoryColor: "text-teal-400 bg-teal-900/20"
author: "robert-c-martin"
---

Uncle Bob insists: **a good name eliminates the need for comments**. If you need a comment to explain what a variable does, the name is wrong.

## Names that hide

```javascript
// ❌ What is this?
const d = 7;
const list = getData();

// ✅ Now it's clear
const daysUntilExpiration = 7;
const activeUsers = getActiveUsers();
```

## Practical rules

1. **Use verbs for functions**: `getUser`, `calculateTotal`
2. **Use nouns for variables**: `userName`, `totalAmount`
3. **Booleans with is/has/can**: `isActive`, `hasPermission`

## Final reflection

Naming is one of the hardest things in programming. But it's where investing time pays off the most.

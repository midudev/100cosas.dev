---
id: "76"
title: "Code is communication between humans"
category: "Readability"
categoryColor: "text-teal-400 bg-teal-900/20"
author: "martin-fowler"
---

Martin Fowler sums it up perfectly: **"Any fool can write code that a computer can understand. Good programmers write code that humans can understand"**.

## Code for machines vs. humans

```javascript
// ❌ Machine understands, human doesn't
const r = d.filter(i => i.a && i.b > 5).map(i => ({...i, c: i.b * 2}));

// ✅ Both understand
const activeHighValueItems = items
  .filter(item => item.isActive && item.value > 5)
  .map(item => ({
    ...item,
    doubledValue: item.value * 2
  }));
```

## Final reflection

Code is read 10 times more than it's written. Optimize for reading, not writing.

---
id: "77"
title: "Simplicity is not simplistic"
category: "Architecture"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "edsger-dijkstra"
---

Dijkstra distinguished between **simple** (easy to understand) and **simplistic** (inadequately simple). Real simplicity is hard to achieve.

## Simple vs. simplistic

```javascript
// Simplistic: ignores important cases
function divide(a, b) {
  return a / b; // What if b is 0?
}

// Simple: handles what's necessary, no more
function divide(a, b) {
  if (b === 0) return { ok: false, error: 'Division by zero' };
  return { ok: true, result: a / b };
}
```

## Final reflection

"Make things as simple as possible, but not simpler" - Einstein. Simplicity is the result of eliminating the unnecessary, not ignoring the important.

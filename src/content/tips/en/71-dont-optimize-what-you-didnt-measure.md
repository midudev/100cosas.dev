---
id: "71"
title: "Don't optimize what you didn't measure"
category: "Performance"
categoryColor: "text-amber-400 bg-amber-900/20"
author: "donald-knuth"
---

Donald Knuth, legend of computer science, gave us the famous quote about premature optimization. But the complete context is even more valuable: **measure before optimizing, because your intuition deceives you**.

## Your intuition lies

```javascript
// "This map is slow, I should use a classic for"
const result = items.map(x => x * 2);

// After measuring: map takes 0.3ms
// The API fetch takes 800ms

// You optimized what didn't matter
```

## How to measure correctly

```javascript
// Basic measurement
console.time('operation');
await yourOperation();
console.timeEnd('operation');
```

## What to measure

1. **API response time**
2. **Render time**
3. **Memory usage**
4. **Bundle size**

## Final reflection

Knuth didn't say "never optimize". He said "don't optimize without data". The difference between a novice optimizer and an expert is that the expert measures first.

---
id: "07"
title: "Optimize when it hurts, not before"
category: "Practices"
categoryColor: "text-red-400 bg-red-900/20"
author: "kent-c-dodds"
---

Donald Knuth, one of the fathers of modern computing, once wrote: *"Premature optimization is the root of all evil"*. Decades later, in the era of JavaScript frameworks and real-time applications, this warning by **Kent C. Dodds** remains more relevant than ever.

The seduction of writing the fastest and most efficient code possible from the first minute is a trap for the ego. It makes us feel like elite engineers, but it often turns us into architects of unnecessary complexity.

## The cycle of mastery: 3 Stages

To avoid this trap, Kent C. Dodds and other community leaders propose a sacred order that every developer should tattoo in their memory:

1.  **Make it work:** Solve the problem. Validate your idea. Make sure the tests pass.
2.  **Make it right:** Refactor. Improve variable names. Eliminate duplication. Make it readable for humans.
3.  **Make it fast:** Only if you have evidence (real metrics) that performance is an issue.

## The high cost of premature optimization

Why is it so dangerous to try to be fast before it's time?

*   **Free complexity:** Optimizations usually require more complex algorithms and less intuitive structures. This drastically increases maintenance costs.
*   **Edge bugs:** By pushing the machine, you are more likely to introduce subtle errors that only occur in extreme conditions and are very difficult to debug.
*   **Wasted time:** We often spend hours optimizing a function that only runs once a day or represents 0.01% of the application's loading time.

## A real example in Web development

In the React ecosystem, it is very common to see developers using `useMemo` or `useCallback` in absolutely every component "just in case".

```javascript
// ❌ LEVEL 1: Optimization as a sport
// We are adding cognitive load and wasting memory to save
// a function that is extremely cheap to recreate.
const handleClick = useCallback(() => {
  console.log('Action');
}, []);

// ✅ LEVEL 2: Simplicity by default
// Clean code, easy to read and debug.
// We will only add useCallback if this component causes real rendering issues.
const handleClick = () => {
  console.log('Action');
};
```

The irony is that sometimes the optimization infrastructure itself (like the comparisons React does in `useMemo`) can be more expensive than the task we are trying to optimize.

Optimizing is a transaction. You are exchanging **clarity** for **speed**. As in any business, you should only make the trade if the benefit outweighs the cost.

If you don't have a metric that says something is slow, don't touch it. Simplicity is the ultimate optimization because it reduces development time, the number of bugs, and team stress. As Kent C. Dodds says: *"Make sure your optimizations are necessary before they are permanent"*.

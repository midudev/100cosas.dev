---
id: "06"
title: "Code is a liability, not an asset"
category: "Strategy"
categoryColor: "text-red-400 bg-red-900/20"
author: "rich-harris"
---

Rich Harris, the creator of Svelte, has a very clear vision of development: **"Code is a liability, not an asset"**.

We often think that the more code we write, the more value we are creating. Rich argues the opposite: every line of code you write is something that must be tested, maintained, documented, and inevitably contains bugs. Code is "weight" that you carry throughout the life of the project.

## Less code, fewer problems

The best way to reduce this liability is to use the tools you already have at your disposal (like native browser APIs) instead of building complex abstractions.

### The "Heavy" Approach: Reinventing the wheel

Sometimes we create complex logic for things the browser already knows how to do, adding code that we now have to maintain.

```typescript
// Manual implementation of "scroll to top" behavior
function scrollToTopManual() {
  const duration = 500;
  const start = window.scrollY;
  const startTime = performance.now();

  function animate(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    window.scrollTo(0, start * (1 - progress));

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}
```

### The "Light" Approach: Use the platform

We take advantage of what already exists. Zero lines of our own logic, zero bugs to maintain.

```typescript
// The browser already has an API for this
function scrollToTopNative() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
```

## Svelte vs. React: A Matter of Liability

This philosophy is what gave birth to **Svelte**. Rich Harris questioned why modern frameworks forced users to download a heavy library (the "runtime") to manage the DOM.

- **React:** Ships a significant amount of code to the browser (the Virtual DOM, the event system, etc.). That code is a liability: it consumes memory, takes time to download, and must be executed on the user's device.
- **Svelte:** Moves that liability to **build time**. Svelte disappears in production, leaving only the minimal code necessary to update the DOM.

By reducing the amount of code that travels over the wire and that the browser must process, Svelte applies the mantra that the best code is the one that doesn't exist (on the client).

## The Dilemma: Build vs. Buy (or Use a Library)

Sometimes, the temptation to "avoid dependencies" leads us to write hundreds of lines of "custom" code for common problems. This is where **opportunity cost** comes in.

Every hour you spend debugging your own validation system is an hour you're not spending on the features that actually differentiate your product.

### The Value of Community and Tests

A small, well-maintained library with tests (like `date-fns` or `zod`) is often a **lower liability** than 500 lines of untested custom code.

- **Security:** Hundreds of eyes have reviewed that code.
- **Edge Cases:** Libraries often handle edge cases you haven't even considered.
- **Documentation:** It already exists, you don't have to write it yourself.

## What Really Adds Value?

Your success is not measured by how many lines of "original" code you've written, but by how much value you've delivered with the **minimum maintenance cost** possible.

1. **Maintenance:** The code you don't write never breaks.
2. **Cognitive Load:** Less code means the team understands the project faster.
3. **Error Surface:** Every line of your own code is an opportunity for a bug that only you can fix.

The next time you're about to write a new feature, ask yourself: **"Is this code an asset for my company, or a burden for my future self?"**.

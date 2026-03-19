---
id: "52"
title: "Less JavaScript is better JavaScript"
category: "Performance"
categoryColor: "text-amber-400 bg-amber-900/20"
author: "rich-harris"
---

Rich Harris, creator of Svelte and Rollup, has dedicated his career to a counterintuitive idea: **the best JavaScript framework is the one that ships less JavaScript**.

## The problem with modern JavaScript

```javascript
// Your "simple" React app
import React from 'react';           // 42KB
import ReactDOM from 'react-dom';    // 35KB
import { Router } from 'wouter';     // 8KB
import { QueryClient } from 'tanstack/react-query'; // 39KB
// ... and 200KB more of dependencies

// To show: "Hello, World"
```

The user downloads, parses, compiles, and executes **hundreds of KB** before seeing anything useful.

## Svelte's philosophy

Rich created Svelte with a radical idea: **the framework disappears at compile time**.

```svelte
<!-- App.svelte -->
<script>
  let count = 0;
</script>

<button on:click={() => count++}>
  Clicks: {count}
</button>

<!-- This compiles to optimized vanilla JS, not a library -->
```

The result: **less than 2KB** for an interactive app.

## Why every kilobyte matters

### 1. Download time

```markdown
| Bundle | 3G (1.6 Mbps) | 4G (10 Mbps) |
|--------|---------------|--------------|
| 50KB   | 0.25s         | 0.04s        |
| 200KB  | 1.0s          | 0.16s        |
| 500KB  | 2.5s          | 0.4s         |
```

### 2. Parse time

JavaScript must be parsed before executing. On slow devices:

```javascript
// 1MB of JavaScript ≈ 1 second of parsing on an average mobile
// That's BEFORE executing anything
```

### 3. Memory

Every byte of JavaScript consumes memory. On devices with limited RAM, this means:

- Tabs that reload
- Apps that crash
- Frustrated users

## Strategies for less JavaScript

### Use the platform

```html
<!-- ❌ JavaScript for a modal -->
<div id="modal" class="hidden">...</div>
<script>/* 50 lines of code */</script>

<!-- ✅ Native HTML -->
<dialog id="modal">...</dialog>
<script>
  modal.showModal(); // 1 line
</script>
```

### Islands Architecture

```astro
---
// Astro: only hydrate what's interactive
---
<html>
  <Header />           <!-- Static HTML, 0KB JS -->
  <MainContent />      <!-- Static HTML, 0KB JS -->
  <ShoppingCart client:visible />  <!-- JS only here -->
  <Footer />           <!-- Static HTML, 0KB JS -->
</html>
```

### Aggressive lazy loading

```javascript
// Don't load what the user doesn't see
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      {showHeavy && <HeavyComponent />}
    </Suspense>
  );
}
```

## The Rich Harris paradox

Rich created JavaScript tools so we use **less JavaScript**:

- **Rollup**: Bundler with aggressive tree-shaking
- **Svelte**: Framework that disappears
- **SvelteKit**: Meta-framework with SSR by default

## Final reflection

Every line of JavaScript has a cost. Not on your MacBook Pro with fiber optic - on your real user's mid-range phone with 3G. Rich Harris reminds us that the best code is code that doesn't exist, and the second best is code that runs on the server.

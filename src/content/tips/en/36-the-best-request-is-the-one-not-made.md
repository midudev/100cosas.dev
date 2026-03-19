---
id: "36"
title: "The best request is the one not made"
category: "Performance"
categoryColor: "text-amber-400 bg-amber-900/20"
author: "addy-osmani"
---

Addy Osmani, engineering leader at Google Chrome and one of the minds behind tools like Lighthouse, summarizes decades of web optimization in a simple truth: **the fastest way to load something is not to load it**.

## The hidden cost of every request

Each HTTP request has hidden costs:

- **Network latency**: Even on fast connections, each round trip to the server adds up
- **Connection overhead**: TLS handshakes, DNS lookups, TCP connections
- **Parsing and processing**: The browser must interpret each resource
- **Memory**: Each asset consumes device RAM

On mobile networks or unstable connections, these costs multiply dramatically.

## Practical strategies

### 1. Audit before adding

Before installing that library that's "only 2KB gzipped":

```javascript
// Do you really need moment.js to format a date?
const date = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
// "January 6, 2026"
```

### 2. Native lazy loading

```html
<!-- Images outside the viewport don't load initially -->
<img src="photo.webp" loading="lazy" alt="...">

<!-- Iframes too -->
<iframe src="video.html" loading="lazy"></iframe>
```

### 3. Prioritize what's critical

```html
<!-- Tell the browser what's important -->
<img src="hero.webp" fetchpriority="high" alt="...">
<link rel="preload" href="main-font.woff2" as="font" crossorigin>
```

### 4. Remove dead code

```bash
# Analyze what JavaScript is actually used
npx lighthouse --only-categories=performance
npx webpack-bundle-analyzer
```

## Core Web Vitals: measure to improve

Osmani has been instrumental in defining the metrics that matter:

- **LCP** (Largest Contentful Paint): When does the main content appear?
- **INP** (Interaction to Next Paint): Does the page respond to interactions?
- **CLS** (Cumulative Layout Shift): Does content move unexpectedly?

Each additional request can negatively affect these metrics.

## The 20% rule

Osmani suggests: *"Be at least 20% faster than your fastest competitor"*. This means:

1. **Measure first**: Don't optimize blindly
2. **Prioritize impact**: 80% of the benefit comes from 20% of the optimizations
3. **Automate**: Integrate performance budgets into your CI/CD

## Final reflection

In a world where it's easy to add dependencies with an `npm install`, the discipline of asking *"do I really need this?"* has become a differentiating skill. Every kilobyte you don't send is time your users don't wait.

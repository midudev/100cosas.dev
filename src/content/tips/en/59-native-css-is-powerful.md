---
id: "59"
title: "Native CSS is more powerful than you think"
category: "CSS"
categoryColor: "text-pink-400 bg-pink-900/20"
author: "lea-verou"
---

Lea Verou, W3C researcher and creator of essential CSS tools like Prism.js, has spent years demonstrating that **native CSS can do more than most people imagine**.

## What JavaScript used to do (and CSS now solves)

### 1. Scroll-driven animations

```css
/* Before: IntersectionObserver + JavaScript */
/* Now: pure CSS */
.reveal {
  animation: fadeIn linear;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### 2. Tooltips with positioning

```css
/* Before: positioning library (Popper.js, etc.) */
/* Now: CSS Anchor Positioning */
.tooltip {
  position: absolute;
  anchor-name: --my-anchor;
  position-anchor: --my-anchor;
  top: anchor(bottom);
  left: anchor(center);
  translate: -50% 8px;
}
```

### 3. Modals

```html
<!-- Before: JS for open/close/backdrop/focus trap -->
<!-- Now: HTML + CSS -->
<dialog id="modal">
  <form method="dialog">
    <p>Are you sure?</p>
    <button value="cancel">Cancel</button>
    <button value="confirm">Confirm</button>
  </form>
</dialog>

<style>
dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}
</style>
```

### 4. Dynamic themes

```css
/* Before: CSS-in-JS, dynamic classes */
/* Now: Custom Properties */
:root {
  --bg: #ffffff;
  --text: #1a1a1a;
  --accent: oklch(65% 0.2 250);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a1a;
    --text: #ffffff;
    --accent: oklch(75% 0.2 250);
  }
}

body {
  background: var(--bg);
  color: var(--text);
}
```

## Features you should use today

### Container Queries

```css
/* Responsive to the container, not the viewport */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}
```

### :has() - The parent selector

```css
/* "If the form has an invalid input, change the border" */
form:has(:invalid) {
  border-color: red;
}

/* "If the card has an image, change the layout" */
.card:has(> img) {
  grid-template-rows: 200px 1fr;
}
```

### Native nesting

```css
/* You no longer need Sass just for this */
.card {
  padding: 1rem;
  
  & .title {
    font-size: 1.5rem;
  }
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  @media (width > 768px) {
    padding: 2rem;
  }
}
```

### New color spaces

```css
/* oklch: perceptually uniform, ideal for palettes */
:root {
  --primary-100: oklch(95% 0.05 250);
  --primary-200: oklch(85% 0.10 250);
  --primary-300: oklch(75% 0.15 250);
  --primary-400: oklch(65% 0.20 250);
  --primary-500: oklch(55% 0.20 250);
}
```

## Lea's principle

> "Before adding JavaScript for a visual effect, ask: can CSS do it?"

The answer is "yes" much more often than you think.

## Final reflection

Lea has dedicated her career to expanding what CSS can do. Each year, CSS gains capabilities that previously required JavaScript. The browser optimizes CSS better than any library. Knowing modern CSS makes you a more efficient developer and your apps faster.

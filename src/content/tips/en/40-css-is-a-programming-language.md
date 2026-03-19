---
id: "40"
title: "CSS is a programming language, treat it as such"
category: "CSS"
categoryColor: "text-pink-400 bg-pink-900/20"
author: "una-kravets"
---

Una Kravets, Developer Advocate at Google Chrome, has spent years demonstrating that **CSS is not "just styles"**. It's a complete declarative programming language, and treating it with the respect it deserves transforms how we build interfaces.

## The anti-CSS bias

There's a stigma in the industry: "CSS is easy", "CSS isn't real programming", "anyone can do CSS". This bias has consequences:

- Unmaintainable CSS code in large projects
- Over-dependence on libraries like Tailwind or styled-components
- Developers who avoid learning CSS deeply

## Modern CSS is programming

### Variables (Custom Properties)

```css
:root {
  --color-primary: oklch(65% 0.24 255);
  --spacing-unit: 8px;
  --font-size-base: clamp(1rem, 0.5vw + 0.875rem, 1.25rem);
}

.button {
  background: var(--color-primary);
  padding: calc(var(--spacing-unit) * 2);
  font-size: var(--font-size-base);
}
```

### Mathematical functions

```css
.responsive-grid {
  --columns: 3;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: calc(100vw / 50);
}

.fluid-typography {
  /* Linear interpolation between two sizes */
  font-size: clamp(1rem, 1rem + 2vw, 3rem);
}
```

### Conditional logic (without JavaScript)

```css
/* Container Queries: if/else based on the container */
@container (min-width: 400px) {
  .card { flex-direction: row; }
}

/* Logical selectors */
.card:has(.featured-image) {
  grid-template-rows: 200px 1fr;
}

.form:has(:invalid) .submit-button {
  opacity: 0.5;
  pointer-events: none;
}
```

### Declarative animations

```css
@keyframes slide-in {
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.element {
  /* Scroll-based animation, no JavaScript */
  animation: slide-in linear;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}
```

## The power of the platform

Una insists on a message: **"Less clutter, more power"**. Many libraries solve problems that CSS already solved:

| Instead of...            | Use...                    |
| ------------------------ | ------------------------- |
| JavaScript scroll spy    | `animation-timeline`      |
| Tooltip library          | CSS Anchor Positioning    |
| Modal with JS            | `<dialog>` + `:modal`     |
| Overflow detection       | `@container style()`      |

## CSS Architecture

Like any language, CSS requires architecture:

```css
/* Layers to control specificity */
@layer reset, base, components, utilities;

@layer base {
  body { font-family: system-ui; }
}

@layer components {
  .button { /* component styles */ }
}

@layer utilities {
  .hidden { display: none; }
}
```

## Final reflection

Treating CSS as a second-class language is a costly mistake. The best frontend developers understand that CSS is as deep and requires as much expertise as JavaScript. Una Kravets shows us that mastering CSS is not only possible - it's the key to building faster, more accessible, and maintainable interfaces.

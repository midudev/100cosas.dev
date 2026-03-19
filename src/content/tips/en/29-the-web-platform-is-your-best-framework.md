---
id: "29"
title: "The web platform is your best framework"
category: "Web Standards"
categoryColor: "text-cyan-400 bg-cyan-900/20"
author: "lea-verou"
---

**Lea Verou**, researcher at MIT and member of the W3C CSS Working Group, has spent years designing the future of CSS. Her perspective is refreshing in an industry obsessed with frameworks:

> "The web platform is the most powerful framework we have. Learn it first."

Before adding another npm dependency, ask yourself: can the browser do this natively?

## The debt of frameworks

Every framework you add to your project is:

- **Weight:** KB your users download.
- **Complexity:** Documentation to maintain, versions to update.
- **Risk:** Will this framework exist in 5 years?

The web platform, on the other hand, is **forever**. A page created in 1995 with basic HTML still works today. Can you say the same about your React app from last year?

## Modern CSS: More powerful than you think

```css
/* ❌ Before: You needed JavaScript or SASS */
/* Now: Native CSS */

/* CSS Variables (Custom Properties) */
:root {
  --color-primary: #3b82f6;
  --spacing-md: 1rem;
}

.button {
  background: var(--color-primary);
  padding: var(--spacing-md);
}

/* Container Queries: Responsive components */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}

/* Native Nesting */
.nav {
  background: white;
  
  & a {
    color: var(--color-primary);
    
    &:hover {
      text-decoration: underline;
    }
  }
}

/* Subgrid: Total layout control */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.grid-item {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3;
}
```

## Modern HTML: Interactivity without JavaScript

```html
<!-- Native modals -->
<dialog id="my-dialog">
  <h2>I'm a native modal!</h2>
  <p>No JavaScript for open/close. No z-index hell.</p>
  <form method="dialog">
    <button>Close</button>
  </form>
</dialog>
<button onclick="document.getElementById('my-dialog').showModal()">
  Open modal
</button>

<!-- Native popovers -->
<button popovertarget="menu">Open menu</button>
<div id="menu" popover>
  <ul>
    <li><a href="/profile">Profile</a></li>
    <li><a href="/settings">Settings</a></li>
  </ul>
</div>

<!-- Native accordion -->
<details>
  <summary>What is the web platform?</summary>
  <p>Standard HTML, CSS, and JavaScript, without frameworks.</p>
</details>

<!-- Native lazy loading -->
<img src="photo.jpg" loading="lazy" alt="Photo">
```

## Lea's principle

Lea proposes a layered approach:

1. **HTML first:** Can I solve this with semantic HTML?
2. **CSS second:** Can I add style and basic behavior with CSS?
3. **JavaScript last:** Only when I really need complex interactivity.

```typescript
// ❌ Common overengineering
import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Button = styled(motion.button)`...`;

function AccordionItem({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);
  // 50 more lines...
}

// ✅ Native HTML + CSS
// <details><summary>Title</summary>Content</details>
// Zero JavaScript. Zero dependencies. Works forever.
```

## The future Lea helps build

As a member of the CSS Working Group, Lea doesn't just preach; she builds. Features like `color-mix()`, the new `:has()` selectors, and Custom Properties improvements exist partly thanks to her work.

Every time you learn a native feature of the web platform, you're:

- Reducing dependencies
- Improving performance
- Building for longevity
- Becoming a better developer

**Frameworks come and go. The web platform remains.**

---
id: "56"
title: "Animations should have a purpose, not be decoration"
category: "UX"
categoryColor: "text-fuchsia-400 bg-fuchsia-900/20"
author: "sarah-drasner"
---

Sarah Drasner, engineering director at Google and author of the most influential book on web animations, has a clear rule: **an animation without purpose is visual noise**.

## The trap of animating "because we can"

```css
/* ❌ Animation just because */
.card {
  animation: bounce 2s infinite;
}

/* The user: "Why won't this stop moving?" */
```

Gratuitous animations:
- Distract from content
- Tire the eyes
- Consume battery
- Annoy users with motion sensitivity

## When animations add value

### 1. Interaction feedback

```css
/* The button responds to click */
.button:active {
  transform: scale(0.95);
  transition: transform 0.1s ease-out;
}
```

The user knows their action was registered.

### 2. Guide attention

```javascript
// Something new appeared - guide the eye to it
function showNotification(message) {
  const notification = createNotification(message);
  notification.animate([
    { opacity: 0, transform: 'translateY(-20px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], { duration: 200, easing: 'ease-out' });
}
```

### 3. Show spatial relationships

```css
/* A modal that "comes from" somewhere */
.modal {
  animation: slideFromButton 0.3s ease-out;
}

@keyframes slideFromButton {
  from {
    transform: scale(0);
    transform-origin: var(--button-position);
  }
  to {
    transform: scale(1);
  }
}
```

The user understands where it came from and how to go back.

### 4. Reduce perception of waiting

```css
/* Skeleton loading: better than a frozen screen */
.skeleton {
  background: linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

## Animations that respect the user

```css
/* Respect prefers-reduced-motion */
.animated-element {
  animation: fadeIn 0.3s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none;
    opacity: 1;
  }
}
```

Some users have vertigo, migraines, or simply prefer less motion. Respect that.

## Sarah's rule: 200-500ms

```css
/* Too fast: user doesn't perceive it */
.too-fast { transition: 0.05s; }

/* Too slow: user waits */
.too-slow { transition: 2s; }

/* The sweet spot */
.just-right { transition: 0.2s; } /* Quick UI */
.emphasis { transition: 0.4s; }   /* Important movements */
```

## Easing matters

```css
/* ❌ Linear feels robotic */
.robotic { transition: transform 0.3s linear; }

/* ✅ ease-out feels natural for entries */
.natural-in { transition: transform 0.3s ease-out; }

/* ✅ ease-in feels natural for exits */
.natural-out { transition: transform 0.3s ease-in; }

/* ✅ custom cubic-bezier for specific movements */
.bouncy { transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
```

## Before adding an animation, ask:

1. What **problem** does this animation solve?
2. Does the user **need** this information?
3. Does the animation **help** or **distract**?
4. Does it work without animation for users who disable it?

## Final reflection

Sarah teaches us that the best animations are the ones you don't consciously notice, but that make the interface feel alive and natural. If a user notices your animation, it's probably too much.

---
id: "25"
title: "Accessibility is not a feature, it's a right"
category: "Accessibility"
categoryColor: "text-violet-400 bg-violet-900/20"
author: "sara-soueidan"
---

**Sara Soueidan**, UI/UX engineer and consultant specializing in web accessibility, has dedicated her career to an uncomfortable truth for many development teams: **accessibility is not a "nice to have"**. It must be in the project's DNA from the start.

> "Accessibility is not about disabilities. It's about usability for all."

Every time you say "we'll make it accessible later," you're saying "some people don't matter now." And that "later" almost never comes.

## The 1% myth

Many teams justify ignoring accessibility with statistics: "Only 1% of our users have disabilities." This figure is wrong for two reasons:

1. **Disabilities are more common than you think:** 15-20% of the world's population has some type of disability (WHO). Many are invisible: color blindness, dyslexia, anxiety, ADHD.

2. **Accessibility benefits everyone:** Have you ever used subtitles in a noisy bar? Navigated with one hand while holding something? Squinted because of sun glare? That's situational disability.

3. **Almost everyone experiences temporary disability at some point:** A cast on your arm or leg? Reduced mobility. An ear infection? Temporary hearing loss. A migraine or stress? Harder to focus. The list goes on.

## Accessibility from design

Sara insists that accessibility cannot be a patch. It must be in the project's DNA from the first wireframe.

```html
<!-- ❌ HTML that excludes -->
<div onclick="handleClick()" class="button">
  <span class="icon-cart"></span>
</div>
<!-- 
  Problems:
  - Not keyboard navigable
  - Screen readers don't know it's a button
  - No alternative text
-->

<!-- ✅ HTML that includes -->
<button 
  type="button" 
  onclick="handleClick()"
  aria-label="Add to cart"
>
  <span class="icon-cart" aria-hidden="true"></span>
  <span class="visually-hidden">Add to cart</span>
</button>
<!-- 
  - Navigable with Tab
  - Activatable with Enter and Space
  - Correctly announced by screen readers
-->
```

## The four principles of accessibility (POUR)

According to WCAG (Web Content Accessibility Guidelines), web content must be:

### 1. Perceivable

Information can't rely on a single sense, like color.

#### ❌ Wrong - color only

```css
.error {
  color: red;
}
```

If the user can't perceive red (or can't see the screen well), the message may be lost.

#### ⚠️ Partially better - visual redundancy only

```css
.error {
  color: red;
  border-left: 4px solid red;
}
```

This helps visually, but CSS-generated text is not reliable for assistive technologies.

#### ✅ Correct - real, perceivable information

```html
<p class="error">
  <span aria-hidden="true">⚠️</span>
  <strong>Error:</strong> Email is not valid
</p>
```

```css
.error {
  color: red;
  border-left: 4px solid red;
  padding-left: 0.5rem;
}
```

The information is in the HTML, doesn't rely on color alone, and is perceivable through multiple channels.

### 2. Operable

```html
<!-- ❌ Looks like a button, but it's not operable with keyboard (no focus, no Enter/Space) -->
<div class="close" onclick="closeModal()">×</div>

<!-- ✅ Real button: tabbable, focusable and works with keyboard -->
<button type="button" class="close" aria-label="Close" onclick="closeModal()">
  ×
</button>
```

### 3. Understandable

```html
<!-- ❌ Placeholder as label (and wrong type) -->
<input type="text" placeholder="Email" />

<!-- ✅ Clear form -->
<label for="email">Email address</label>
<p id="email-hint">We'll use this email to send you the confirmation.</p>
<input
  type="email"
  id="email"
  name="email"
  autocomplete="email"
  required
  aria-describedby="email-hint"
/>
```

### 4. Robust

Use semantic, valid HTML. Native elements (`<button>`, `<a>`, `<form>`, `<label>`, `<nav>`, `<main>`, `<article>`) already come with keyboard support, focus behavior, and correct roles; they work better across browsers and assistive technologies. Use ARIA to complement, not to "turn" a `<div>` into an interactive component.

## The cost of exclusion

Ignoring accessibility has real consequences:

- **Legal:** In many countries, web inaccessibility can have legal implications.
- **Economic:** 71% of users with disabilities abandon inaccessible sites (Click-Away Pound Survey).
- **Reputational:** Web accessibility lawsuits are public and damage brands.
- **User experience:** Inaccessible sites usually provide a worse experience for everyone.

## Change starts with you

You don't need to be an accessibility expert to start:

1. **Navigate your app with keyboard only** (Tab, Enter, Escape). Can you do everything?
2. **Use a screen reader** (VoiceOver on Mac, NVDA on Windows). Does what you hear make sense?
3. **Check color contrast.** Tools like Lighthouse help.

The next time someone suggests "leaving accessibility for later," remember Sara's words: **accessibility is not an extra you add at the end. It's the difference between building a ramp and forcing someone to stay outside.**

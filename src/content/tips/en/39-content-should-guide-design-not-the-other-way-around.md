---
id: "39"
title: "Content should guide design, not the other way around"
category: "CSS"
categoryColor: "text-pink-400 bg-pink-900/20"
author: "jen-simmons"
---

Jen Simmons, now Apple Evangelist for Web Developer Experience on Safari and WebKit, coined the term **"Intrinsic Web Design"**. Her philosophy revolutionizes how we think about layouts: **let the content determine the design, not the arbitrary constraints of a grid**.

## The era of hacks is over

For years, we built web layouts with tools that weren't designed for layout:

- **Tables**: Semantics destroyed
- **Floats**: Clearfix, overflow hidden, negative margin
- **CSS Frameworks**: 12 columns because reasons

CSS Grid and Flexbox change the rules of the game.

## Intrinsic Web Design: the 6 principles

### 1. Combine flexible and fixed

```css
.layout {
  /* Columns that adapt AND fixed columns */
  grid-template-columns: auto 1fr 200px;
}
```

### 2. Let content determine the size

```css
.card-grid {
  /* As many columns as fit, minimum 250px */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

### 3. Use space wisely

```css
.container {
  /* gap replaces margin hacks */
  display: grid;
  gap: 2rem;
}
```

### 4. Media queries aren't the only answer

```css
/* Container queries: respond to the container, not the viewport */
@container (min-width: 400px) {
  .card {
    flex-direction: row;
  }
}
```

### 5. Images should be fluid AND have aspect-ratio

```css
img {
  max-width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  object-fit: cover;
}
```

### 6. Two-dimensional layouts with Grid

```css
.magazine-layout {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  /* Content flows naturally */
}
```

## Subgrid: the power of inheritance

One of the features Jen has fought for years:

```css
.card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.card {
  display: grid;
  /* The card inherits the parent's lines */
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
}
```

Now elements inside cards align perfectly with each other.

## The web is not print

> "We stopped trying to make the web look like a printed magazine. We started designing for the medium it actually is: fluid, flexible, and inherently responsive"

Jen reminds us that the web is its own medium, with its own rules. We shouldn't fight against its fluid nature - we should embrace it.

## Final reflection

The tools exist. Grid, Flexbox, Container Queries, Subgrid. The question is no longer "can we do it?" but "do we understand the medium enough to let content guide design?". Jen Simmons has shown us the way.

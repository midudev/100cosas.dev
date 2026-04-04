---
id: "63"
title: "Learn by doing, not by reading"
category: "Learning"
categoryColor: "text-violet-400 bg-violet-900/20"
author: "limor-fried"
---

Limor Fried founded Adafruit Industries with a radical conviction: **the best way to learn technology is by building things with your own hands**. An MIT graduate and the first female engineer on the cover of WIRED, her philosophy is direct: "It's 100 percent teaching. I almost never engineer for the sake of engineering. There's always a project or a goal."

## The infinite tutorial trap

```markdown
Monday: "I'm going to learn React"
- Read the complete documentation
- Watch 3 videos of "React in 2025"
- Compare Next.js vs Remix vs Astro

Friday:
- Still hasn't written a line of code
- Feels "not ready yet"
- Finds another "better" tutorial
```

This is called **Tutorial Hell** and it's procrastination disguised as productivity. Limor compares it to learning to solder by reading a book: you can memorize every technique, but until you touch the iron, you haven't learned anything.

## The Adafruit maker philosophy

Adafruit started in Limor's MIT dorm room, selling electronics kits anyone could assemble. The idea was simple: give someone a concrete project and the pieces to build it, and they'll learn faster than with any textbook.

### The first 15 minutes

Limor says: "Just like DIY electronics, the first 15 minutes are crucial, special and fragile." Those first minutes with a new technology define whether you'll continue or quit.

```markdown
❌ First 15 minutes reading:
- Open official documentation
- Read "Fundamental Concepts"
- Start feeling overwhelmed
- Close the tab

✅ First 15 minutes building:
- Clone a starter template
- Change some text and see the result
- Add a button that does something
- Feel that you CAN do this
```

The difference isn't technical. It's emotional. One path creates paralysis. The other creates momentum.

## Why it works

### 1. Context-driven learning

```javascript
// You remember this because you BUILT it
async function getComponents(category) {
  const response = await fetch(`https://api.adafruit.com/v2/${category}`);

  if (!response.ok) {
    throw new Error(`Category not found: ${category}`);
  }

  const data = await response.json();
  return data.products;
}
```

You didn't read about error handling. You needed it because your fetch failed.

### 2. Errors are the best teacher

At Adafruit, every kit comes with a troubleshooting guide. Not because they expect failure, but because **errors are part of the learning process**.

```javascript
// Error: Cannot read property 'map' of undefined

// After hitting this in a REAL project,
// you'll never forget to protect your data:
const items = data?.products ?? [];
const names = items.map(item => item.name);
```

One error you solve yourself is worth a hundred examples you copy.

## How to apply it

### The minimum viable project

Just like Adafruit designs kits you can finish in an afternoon, your learning projects should be small and completable:

```markdown
Learning React: Build a component catalog (just the list)
Learning Node: Build a REST API for IoT sensors
Learning CSS: Replicate Adafruit's homepage
```

### The 20/80 rule

```markdown
20% reading → Understand basic concepts
80% building → Build, break, fix, iterate
```

### Share what you build

Limor turned Adafruit into a community where people share their projects, however imperfect. Do the same: push your code to GitHub, write a post, record a short video. Teaching is the most powerful way to consolidate knowledge.

## Final reflection

The people who know the most aren't the ones who read the most. They're the ones who built the most. Limor Fried started selling kits from her dorm room. Today Adafruit has over 100 employees. She didn't get there by reading about entrepreneurship. She got there by building, piece by piece, project by project.

Your next step isn't to read more. It's to open your editor and start building. The first 15 minutes are crucial: make them count.

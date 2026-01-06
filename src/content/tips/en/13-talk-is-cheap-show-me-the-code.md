---
id: "13"
title: "Talk is cheap. Show me the code"
category: "Communication"
categoryColor: "text-cyan-400 bg-cyan-900/20"
author: "linus-torvalds"
---

This phrase from **Linus Torvalds**, dropped in a Linux kernel mailing list thread in 2000, has become an industry mantra: **"Talk is cheap. Show me the code."**

It's a call to action, a brutal reminder that in software development, ideas are worthless until they're materialized. You can spend hours in meetings debating architectures, discussing patterns, or designing diagrams on a whiteboard, but at the end of the day, the only thing that matters is working code.

## The original context

The phrase wasn't born as a motivational slogan. It emerged in the middle of a technical discussion where someone was proposing changes to the kernel without providing a concrete implementation. Linus, with his characteristically direct style, cut the debate short:

> "Talk is cheap. Show me the code."

It wasn't contempt for theory; it was a demand for **commitment**. If you believe your idea is better, prove it. Code is the great equalizer: your title, seniority, or eloquence don't matter. What matters is whether your solution works.

## The trap of analysis paralysis

In development teams, it's easy to fall into infinite planning cycles:

- "We need to research more before starting."
- "First we need to properly define the architecture."
- "Let's do another spike to validate the approach."

While planning has its place, it's often a form of **procrastination disguised as professionalism**. Code, even an imperfect prototype, generates real information: you discover hidden dependencies, performance issues, and edge cases that no diagram will ever show you.

## The value of the prototype

A working prototype, no matter how ugly, is worth more than a thousand PowerPoint slides.

```typescript
// ❌ LEVEL 1: The theoretical proposal (weeks of meetings)
// "We should create a distributed caching system
// with eventual invalidation and configurable consistency..."

// ✅ LEVEL 2: The prototype (one afternoon of work)
// A simple Map that demonstrates the concept
const cache = new Map<string, { data: unknown; expiresAt: number }>();

function getCached<T>(key: string, fetcher: () => Promise<T>, ttlMs = 60000): Promise<T> {
  const cached = cache.get(key);
  if (cached && cached.expiresAt > Date.now()) {
    return Promise.resolve(cached.data as T);
  }

  return fetcher().then(data => {
    cache.set(key, { data, expiresAt: Date.now() + ttlMs });
    return data;
  });
}

// Now we can discuss something concrete:
// Does it work? What's missing? How do we scale this?
```

## The "doer" culture

This philosophy doesn't mean you should ignore design or jump into coding without thinking. It means that:

1. **Discussions should be short:** If a technical debate lasts more than 15 minutes without code involved, you're probably going in circles.
2. **Prototypes kill debates:** A 50-line prototype can resolve a discussion that would take weeks of emails.
3. **Code is the contract:** Documentation lies, comments age, but executable code is the absolute truth of the system.

## Open Source: The meritocracy of code

The open-source software world lives by this maxim. It doesn't matter if you're a student or a senior engineer at Google; if your Pull Request is good, it gets accepted. If it's not, it gets rejected. Code is the only resume that matters.

The next time you find yourself in an endless meeting about "how we should do X," remember Linus's words. Leave the meeting, open your editor, and prove your point with code. **Words convince, but code transforms.**

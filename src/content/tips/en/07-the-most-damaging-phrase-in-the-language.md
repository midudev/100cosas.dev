---
id: "07"
title: "The most damaging phrase: 'It's always been done this way'"
category: "Mindset"
categoryColor: "text-emerald-400 bg-emerald-900/20"
author: "grace-hopper"
---

Grace Hopper, nicknamed "Amazing Grace" and an absolute pioneer of computing, had a phrase etched in her mind: **"The most damaging phrase in the language is... 'It's always been done this way'"**.

Hopper loved to challenge the status quo. In fact, she had a clock in her office that ran backwards (counter-clockwise) just to remind visitors that conventions are often arbitrary and that there is always room for innovation.

## The Danger of Technological Inertia

In software development, "It's always been done this way" is the prelude to technical debt and stagnation. It's what keeps obsolete libraries alive, monolithic architectures that no longer scale, and manual deployment processes that people are afraid to touch.

### The "Legacy" Approach: Inertia by Habit

Sometimes we follow old patterns simply because the codebase already has them, ignoring that the language or the platform has evolved to offer better solutions.

```typescript
// A common pattern "from the old days": using callbacks for everything
// because "that's how we learned to handle asynchrony in this project"
function getUserDataLegacy(id: string, callback: (err: any, data?: any) => void) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/api/users/${id}`);
  xhr.onload = () => {
    if (xhr.status === 200) callback(null, JSON.parse(xhr.responseText));
    else callback(new Error('Load failed'));
  };
  xhr.onerror = () => callback(new Error('Network error'));
  xhr.send();
}

// Callback Hell is the result of inertia
getUserDataLegacy('1', (err, user) => {
  if (user) {
    getPostsLegacy(user.id, (err, posts) => {
      // ... this scales very poorly
    });
  }
});
```

### The "Hopper" Approach: Questioning and Evolving

Embracing new tools isn't about "hype", it's about efficiency. Modern APIs are designed to reduce friction and errors.

```typescript
// Using Fetch and Async/Await: cleaner, more readable, and robust
async function getUserDataModern(id: string) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error('Load failed');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Code reads sequentially, just like our mental logic
const user = await getUserDataModern('1');
const posts = await getPostsModern(user.id);
```

## How to Avoid the Damaging Phrase?

1. **The 5 Whys Rule:** When someone says "it's always been done this way," ask "Why?". Keep asking until you reach the root. You'll often discover that the original reason no longer exists.
2. **Constant Experimentation:** Dedicate a small percentage of your time to testing alternatives. Is there a way to build this component with fewer props? Can we automate this manual task?
3. **Proactive Maintenance:** Don't wait for something to break to modernize it. Code that doesn't evolve, dies.

Grace Hopper taught us that ships are safe in harbor, but **that is not what ships are built for**. Get out of your comfort zone and don't let habit dictate your architecture.

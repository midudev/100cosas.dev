---
id: "03"
title: "The most damaging phrase: 'It's always been done this way'"
category: "Mindset"
categoryColor: "text-emerald-400 bg-emerald-900/20"
author: "grace-hopper"
---

Grace Hopper, nicknamed "Amazing Grace" and an absolute pioneer of computing, had a phrase etched in her mind: **"The most damaging phrase in the language is... 'It's always been done this way'"**.

Hopper loved to challenge the status quo. In fact, she had a clock in her office that ran backwards (counter-clockwise) just to remind visitors that conventions are often arbitrary. 

<img src="/images/grace-hopper-clock-counterwise.jpg" alt="Grace Hopper's backwards running clock" style="max-width: 300px; width: 100%; height: auto; margin: 2rem auto; display: block; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);" />

She famously said that **"humans are allergic to change"**, and that our natural tendency is to seek security in the familiar, even when the familiar no longer works.

## The Danger of Technological Inertia

In software development, "It's always been done this way" is the prelude to technical debt and stagnation. It's what keeps obsolete libraries alive, monolithic architectures that no longer scale, and manual deployment processes that people are afraid to touch.

> **The Moment.js Case**
>
> This is the perfect example. Even though its own creators have declared it deprecated and recommend using modern alternatives like **Luxon** (created by them), **Day.js**, or **date-fns**, many people still get angry or defensive when it's mentioned. They prefer to keep using a heavy library with an old architecture simply because "it's what they know."

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

Engineering is about iterating, moving forward, trying things out, making mistakes, learning, and growing. We must seek alternatives, different ways of doing things. This is how, for example, `async/await` in JavaScript was born.

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

## Changing Your Mind is a Superpower

Resistance to change doesn't just affect how we write code, but how we view new tools. It happened to me with **Tailwind CSS**. At first, seeing all those classes in the HTML felt like a mistake, a step back to the days of inline styles. "I don't like it," I used to say.

However, after using it a few times in real projects, my perspective completely shifted. Many saw this as a contradiction: "But didn't you say Tailwind was a bad idea?". It wasn't a contradiction, it was **growth**.

As developers, clinging to an old opinion out of pride is a form of mental "it's always been done this way". If you receive new information or experience a tool and your conclusions change, evolving your opinion is the only logical response. **You are not contradicting yourself; you are updating your mental software with better data.**

## How to Avoid the Damaging Phrase?

1. **The 5 Whys Rule:** When someone says "it's always been done this way," ask "Why?". Keep asking until you reach the root. You'll often discover that the original reason no longer exists.
2. **Constant Experimentation:** Dedicate a small percentage of your time to testing alternatives. Is there a way to build this component with fewer props? Can we use that library we used to criticize?
3. **Proactive Maintenance:** Don't wait for something to break to modernize it. Code that doesn't evolve, dies.

Grace Hopper taught us that ships are safe in harbor, but **that is not what ships are built for**. Get out of your comfort zone and don't let habit dictate your architecture or your opinions.

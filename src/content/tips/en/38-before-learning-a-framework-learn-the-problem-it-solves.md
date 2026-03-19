---
id: "38"
title: "Before learning a framework, learn the problem it solves"
category: "Learning"
categoryColor: "text-violet-400 bg-violet-900/20"
author: "dan-abramov"
---

Dan Abramov, co-creator of Redux and former member of the React team at Meta, is known for his ability to explain complex ideas simply. One of his most valuable pieces of advice: **don't learn frameworks, learn the problems they solve**.

## The tutorial trap

It's tempting to jump straight into the "How to build X with [Framework of the moment]" tutorial. But there's a problem: **you learn to copy patterns without understanding why they exist**.

When problems come (and they always do), you find yourself:

- Searching for solutions you don't understand
- Copying code from Stack Overflow without knowing what it does
- Frustrated because "it should work"

## Dan's approach

In his blog [overreacted.io](https://overreacted.io/), Dan shares a different approach:

### 1. Understand the problem first

Before learning React, ask yourself:
- Why is it hard to keep the DOM synchronized with state?
- What problems does direct DOM manipulation cause?
- Why do frameworks use a virtual DOM?

### 2. Build a simplified version

```javascript
// Try to build a mini-React
function render(element, container) {
  // Your implementation here
  // The process will teach you more than any tutorial
}
```

### 3. Now learn the actual framework

With the problem context, the framework makes sense:

```jsx
// Now you understand why this is powerful
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## Mental models matter more than syntax

Dan constantly talks about "mental models" - the way we conceptualize how something works.

**Correct mental model for useEffect:**

> "useEffect lets you synchronize your component with something external"

It's not "the hook for doing things after render". With the right model, you write better code:

```javascript
// With the correct mental model
useEffect(() => {
  const subscription = subscribe(roomId);
  return () => subscription.unsubscribe();
}, [roomId]);
```

## Documentation is your friend

Dan spent years writing documentation because he understands something: **the best way to learn is through explanations that address the "why"**, not just the "how".

The new React documentation ([react.dev](https://react.dev)) is an example: every concept explains the problem before the solution.

## Final reflection

Frameworks come and go. Vanilla JavaScript has survived jQuery, Backbone, Angular 1, and will survive whatever comes next. When you understand the fundamental problems, learning new tools becomes trivial - because they all solve the same things in slightly different ways.

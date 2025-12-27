---
id: "04"
title: "Good data structures simplify code"
category: "Architecture"
categoryColor: "text-purple-400 bg-purple-900/20"
author: "linus-torvalds"
---

Linus Torvalds shared one of his most famous insights in a 2006 mailing list: **"Bad programmers worry about the code. Good programmers worry about data structures and their relationships"**.

This philosophy is at the core of Git's design. Instead of focusing on complex algorithms for file diffing, Linus focused on how data is stored (objects, commits, trees). If the data structure is right, the code that manages it becomes almost trivial.

## The Problem: Logic-Heavy vs. Structure-First

Imagine you need to manage order statuses and which transitions are allowed.

### The "Bad" Approach: Scattered Control Logic

Here, the programmer focuses on the "code" (the conditions). Every time a new state is added, the complexity grows exponentially.

```typescript
type Status = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

function canChangeStatus(current: Status, next: Status): boolean {
  if (current === 'pending' && (next === 'paid' || next === 'cancelled')) {
    return true;
  }
  if (current === 'paid' && (next === 'shipped' || next === 'cancelled')) {
    return true;
  }
  if (current === 'shipped' && next === 'delivered') {
    return true;
  }
  // ... this becomes a mess that is hard to read and maintain
  return false;
}
```

### The "Good" Approach: Data Structure as the Engine

Here, we define the "relationship" between data first. The code simply queries that structure.

```typescript
type Status = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

// The data structure defines the business rules
const ALLOWED_TRANSITIONS: Record<Status, Status[]> = {
  pending: ['paid', 'cancelled'],
  paid: ['shipped', 'cancelled'],
  shipped: ['delivered'],
  delivered: [],
  cancelled: []
};

function canChangeStatus(current: Status, next: Status): boolean {
  return ALLOWED_TRANSITIONS[current].includes(next);
}
```

## Why is this better?

1.  **Clarity:** Business rules are in one place and easy to read at a glance.
2.  **Maintainability:** If you want to add a rule (e.g., from 'pending' to 'processing'), you just update an array in an object without touching the function's logic.
3.  **Extensibility:** It's easy to add additional validations without breaking the main structure.

When faced with a complex logic problem, stop and ask: **"Is there a way to organize my data that makes this code unnecessary?"**

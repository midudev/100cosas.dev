---
id: "53"
title: "Data structures dominate. If you choose them right, algorithms are obvious"
category: "Fundamentals"
categoryColor: "text-purple-400 bg-purple-900/20"
author: "linus-torvalds"
---

Linus Torvalds, creator of Linux and Git, has a perspective that goes against the obsession with algorithms: **"Bad programmers worry about the code. Good programmers worry about data structures"**.

## The problem with thinking algorithms first

```javascript
// Problem: find duplicates in a list
// "Algorithm first" approach: nested loops
function findDuplicates(arr) {
  const duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j] && !duplicates.includes(arr[i])) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}
// O(n³) - a disaster
```

## Linus's approach: structure first

```javascript
// Same problem, but choosing the right structure
function findDuplicates(arr) {
  const seen = new Set();
  const duplicates = new Set();
  
  for (const item of arr) {
    if (seen.has(item)) {
      duplicates.add(item);
    }
    seen.add(item);
  }
  
  return [...duplicates];
}
// O(n) - the algorithm "writes itself"
```

The choice to use `Set` makes the algorithm obvious.

## Real-world examples

### User cache

```javascript
// ❌ Array - O(n) search
const usersCache = [];
const findUser = id => usersCache.find(u => u.id === id);

// ✅ Map - O(1) search
const usersCache = new Map();
const findUser = id => usersCache.get(id);
```

### History with undo/redo

```javascript
// The right structure (stack) makes the code trivial
class History {
  constructor() {
    this.undoStack = [];
    this.redoStack = [];
  }
  
  push(state) {
    this.undoStack.push(state);
    this.redoStack = []; // Clear redo on new action
  }
  
  undo() {
    if (this.undoStack.length === 0) return null;
    const state = this.undoStack.pop();
    this.redoStack.push(state);
    return this.undoStack[this.undoStack.length - 1];
  }
  
  redo() {
    if (this.redoStack.length === 0) return null;
    const state = this.redoStack.pop();
    this.undoStack.push(state);
    return state;
  }
}
```

### Frequency counter

```javascript
// ❌ Complex imperative approach
function countFrequencies(items) {
  const result = {};
  for (const item of items) {
    if (result[item] === undefined) {
      result[item] = 0;
    }
    result[item] += 1;
  }
  return result;
}

// ✅ Map with default value
function countFrequencies(items) {
  const counts = new Map();
  for (const item of items) {
    counts.set(item, (counts.get(item) || 0) + 1);
  }
  return counts;
}
```

## Git: an example of design by structures

Git is brilliant because Linus chose the structures well:

```
Blob     → File content (hash → content)
Tree     → Directory (list of blobs and trees)
Commit   → Snapshot (points to tree + metadata)
Branch   → Pointer to commit (just that!)
```

With these simple structures:
- Diff is comparing trees
- Merge is combining trees
- Checkout is changing a pointer

The "algorithms" are trivial because the structures are correct.

## How to think in structures

1. **What operations do I need?**
   - Frequent search → Hash Map
   - Order matters → Array or Linked List
   - Last in, first out → Stack
   - First in, first out → Queue

2. **What's the common case?**
   - Do I read more than write? → Optimize reads
   - Sorted data? → Search tree
   - Uniqueness matters? → Set

## Final reflection

Linus teaches us that programming isn't about being clever with algorithms. It's about modeling data in a way that makes the code that manipulates it obvious. Choose your structures well and the algorithms will write themselves.

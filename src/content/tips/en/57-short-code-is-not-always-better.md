---
id: "57"
title: "Short code is not always better code"
category: "Readability"
categoryColor: "text-teal-400 bg-teal-900/20"
author: "sandi-metz"
---

Sandi Metz, author of fundamental books on object-oriented design, challenges the obsession with "clever" code: **"Code is read many more times than it's written. Optimize for reading"**.

## The one-liner trap

```javascript
// ❌ "Look how short it is"
const result = data.filter(x => x.a > 5).reduce((a, b) => ({...a, [b.k]: (a[b.k] || []).concat(b)}), {});

// Question: What does this do?
// Answer: Nobody knows without stopping 5 minutes to analyze it
```

## The same code, readable

```javascript
// ✅ More lines, infinitely clearer
function groupActiveItemsByCategory(items) {
  const activeItems = items.filter(item => item.value > 5);
  
  const groupedByCategory = {};
  
  for (const item of activeItems) {
    const category = item.category;
    
    if (!groupedByCategory[category]) {
      groupedByCategory[category] = [];
    }
    
    groupedByCategory[category].push(item);
  }
  
  return groupedByCategory;
}
```

The code is understood in seconds. Not minutes.

## Sandi's rules

Sandi has specific rules that seem arbitrary but work:

### 1. Classes of maximum 100 lines

```ruby
# If your class has 500 lines, it does too many things
# Split it into smaller collaborators
```

### 2. Methods of maximum 5 lines

```javascript
// ❌ 50-line method
function processOrder(order) {
  // ... 50 lines of mixed logic
}

// ✅ Small methods that call each other
function processOrder(order) {
  validateOrder(order);
  calculateTotals(order);
  applyDiscounts(order);
  saveOrder(order);
  notifyCustomer(order);
}
```

### 3. Maximum 4 parameters

```javascript
// ❌ Too many parameters
function createUser(name, email, age, address, phone, role, permissions, active) {
  // ...
}

// ✅ Options object
function createUser({ name, email, age, address, phone, role, permissions, active }) {
  // ...
}
```

## "Clever" vs. "Clear"

```javascript
// "Clever" - makes you feel smart writing it
const isEven = n => !(n & 1);

// "Clear" - makes anyone understand it
function isEven(number) {
  return number % 2 === 0;
}
```

Clever code impresses on Twitter. Clear code keeps teams productive.

## The new teammate test

Before committing, ask yourself:

> "Would someone who just joined the team understand this?"

If the answer is no, it's probably too clever.

## When TO be concise

Brevity has its place:

```javascript
// Established patterns everyone knows
const doubled = numbers.map(n => n * 2);

// Simple operations
const sum = (a, b) => a + b;

// Destructuring that clarifies
const { name, email } = user;
```

The difference: these are **idiomatic**, not **clever**.

## Final reflection

Sandi reminds us that we write code for humans, not compilers. Compilers understand anything. Humans need clarity. The time you save writing short code, you pay multiplied when someone (including your future self) has to understand it.

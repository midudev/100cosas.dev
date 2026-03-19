---
id: "18"
title: "There are only two hard things in Computer Science"
category: "Fundamentals"
categoryColor: "text-blue-400 bg-blue-900/20"
author: "phil-karlton"
---

**Phil Karlton**, an engineer at Netscape during the golden age of browsers, said a phrase that has become legend: **"There are only two hard things in Computer Science: cache invalidation and naming things."**

This seemingly humorous quote hides a deep truth about the nature of software development. While cache invalidation is a complex technical problem (when does data expire? how do you sync distributed copies?), naming things is a **cognitive** problem that affects every line of code you write.

## Why is naming so hard?

Naming variables, functions, classes, and modules seems trivial, but it's actually an exercise in **semantic compression**: you must capture the essence of what something *does* or *represents* in just a few words.

The problem is that:

1. **Language is ambiguous:** `data`, `info`, `item`, `element`... What do they really mean?
2. **Context changes:** A good name today might be confusing tomorrow when the code evolves.
3. **Abstraction is hard:** Naming a function that does multiple things forces you to admit it does too much.

## The cost of bad names

Poor names have real consequences:

```typescript
// ❌ LEVEL 1: Names that say nothing
function process(d: any[]) {
  const r = [];
  for (const i of d) {
    if (i.f) r.push(i.v * 2);
  }
  return r;
}

// What does it process? What is 'd'? What does 'f' mean?
// Every developer who reads this will waste time deciphering it.
```

```typescript
// ✅ LEVEL 2: Names that reveal intention
function getDoubledPricesForActiveProducts(products: Product[]) {
  const doubledPrices: number[] = [];
  
  for (const product of products) {
    if (product.isActive) {
      doubledPrices.push(product.price * 2);
    }
  }
  
  return doubledPrices;
}

// Now anyone understands what this function does
// without needing to read its implementation.
```

## The golden rule: The name is documentation

A good name eliminates the need for comments. If you need a comment to explain what a variable or function does, the name probably isn't good enough.

```typescript
// ❌ The comment compensates for the bad name
// Time in milliseconds since the user registered
const t = Date.now() - user.createdAt;

// ✅ The name is the comment
const millisecondsSinceRegistration = Date.now() - user.createdAt;
```

## Patterns for better naming

### 1. Functions: Verb + Noun

Functions *do* things. Their names should reflect that.

```typescript
// ❌ Vague nouns
function user(id: string) { ... }
function validation(form: Form) { ... }

// ✅ Clear verbs
function getUserById(id: string) { ... }
function validateForm(form: Form) { ... }
```

### 2. Booleans: Yes/no question

Booleans answer questions. Name them as such.

```typescript
// ❌ Ambiguous
const status = true;
const admin = false;

// ✅ Clear question
const isActive = true;
const hasAdminPrivileges = false;
const canEditPost = true;
```

### 3. Collections: Plural

Lists and arrays contain multiple elements.

```typescript
// ❌ Singular for collection
const user = [user1, user2, user3];

// ✅ Clear plural
const users = [user1, user2, user3];
const activeUserIds = ['1', '2', '3'];
```

## The "newcomer" test

Before confirming a name, imagine a developer new to the project reading it for the first time. Will they understand what it is without additional context? If the answer is no, find a better name.

As Phil Karlton said (and as any experienced developer will confirm), naming well is one of the most undervalued and most valuable skills in our profession. **A good name isn't decoration; it's design.**

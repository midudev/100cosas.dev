---
id: "28"
title: "The best code is no code at all"
category: "Minimalism"
categoryColor: "text-lime-400 bg-lime-900/20"
author: "jeff-atwood"
---

**Jeff Atwood**, co-founder of Stack Overflow, popularized an idea that should be in every developer's DNA: **"The best code is no code at all."**

Every line of code you write is a line that can have bugs, needs tests, requires documentation, and someone will have to maintain. The most effective way to avoid all these problems is simply not to write that code.

## Code as ballast

Atwood, through his blog *Coding Horror*, has argued for years that developers have a dangerous tendency: **writing unnecessary code**. Not because they're bad professionals, but because writing code is what they know how to do, what they enjoy, and what makes them feel productive.

But true productivity isn't measured in lines written, but in **problems solved with the minimum code possible**.

## Questions you should ask yourself

Before writing any new code, go through this mental filter:

### 1. Do I really need this functionality?

```typescript
// ❌ "Just in case" functionality
interface UserSettings {
  theme: 'light' | 'dark' | 'system' | 'high-contrast' | 'sepia';
  fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  reducedMotion: boolean;
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  // ... 20 more options nobody asked for
}

// ✅ What users actually need
interface UserSettings {
  theme: 'light' | 'dark' | 'system';
}

// The rest can be added when there's real demand.
```

### 2. Does a solution already exist?

Before writing your own validation system, have you looked at Zod? Before creating your testing framework, have you tried Vitest? Before implementing authentication from scratch, do you know Auth.js?

```typescript
// ❌ 200 lines of "custom" validation
function validateEmail(email: string): boolean {
  // Complex regex that probably has bugs
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function validatePhone(phone: string): boolean {
  // Another regex that doesn't handle all international cases
  // ...
}

// ... and 200 more lines like this

// ✅ A library tested by thousands of projects
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/), // E.164 format
});
```

### 3. Can I solve the problem by removing code?

Sometimes the best solution is to **delete**. A feature nobody uses, an edge case that never occurs, an abstraction that complicates more than it simplifies.

```typescript
// ❌ BEFORE: Complex permission system
class PermissionManager {
  private roleHierarchy: Map<string, string[]>;
  private permissionCache: Map<string, boolean>;
  private inheritanceRules: InheritanceRule[];
  
  canAccess(user: User, resource: Resource, action: Action): boolean {
    // 150 lines of complex logic
  }
}

// ✅ AFTER: Turns out there are only two roles
function canAccess(user: User, resource: Resource): boolean {
  if (user.role === 'admin') return true;
  return resource.ownerId === user.id;
}

// We deleted 200 lines. The system is faster, safer, and easier to understand.
```

## The hidden cost of code

Jeff Atwood sums it up on his blog:

> "Every line of code you write is a line of code you have to debug. Every line of code you write is a line of code you have to read when you're trying to figure out why something doesn't work. Every line of code you write is a line of code you have to explain to the next developer."

Every line has a cost:

| Aspect | Cost per line |
|--------|---------------|
| **Bugs** | More code = more surface for errors |
| **Tests** | More code = more tests needed |
| **Documentation** | More code = more to explain |
| **Onboarding** | More code = more to learn |
| **Refactoring** | More code = more to change |

## The art of not doing

The best developers aren't those who write the most code, but those who solve the most problems. Sometimes that means writing elegant code. Other times it means convincing the product manager that the feature isn't necessary. And many times it means using an existing library instead of reinventing the wheel.

As Atwood says: **"The best code is code you don't have to maintain."** And the only way not to maintain code is not to write it in the first place.

The next time you're about to create a new file, ask yourself: Do I really need this code? Or is there a way to solve the problem without it?

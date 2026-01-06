---
id: "11"
title: "The Boy Scout Rule"
category: "Maintainability"
categoryColor: "text-emerald-400 bg-emerald-900/20"
author: "robert-c-martin"
---

"Always leave the campsite cleaner than you found it." This is the Boy Scouts' ideal, and Robert C. Martin, better known as **Uncle Bob**, adapted it to software development with a simple yet transformative premise: **always leave the code a little better than you found it.**

It's not about doing a massive refactor every time you open a file. It's about small, continuous victories against disorder and software entropy.

## Software Entropy

Software, by nature, tends toward disorder. Every quick patch, every variable poorly named due to haste, and every obsolete comment increases "technical debt." If we do nothing, the code ends up becoming a swamp where no one wants to enter.

The Boy Scout Rule is the antidote to this degradation. If every time a developer touches a module they improve it even a little bit, the code doesn't just stop degrading—it **improves over time**.

## What does "a little better" mean?

You don't need to rewrite the entire system. "Better" can be something as small as:

1. **Renaming a variable**: Changing `d` to `daysSinceCreation`.
2. **Extracting a function**: If you see a 5-line block inside an `if` that does something specific, extract it into a function with a descriptive name.
3. **Deleting dead code**: If you see a function that is no longer used or a comment that no longer applies, delete it.
4. **Simplifying an expression**: Replacing a complex `if/else` with a ternary operator or a guard clause.

## Practical Example in TypeScript

Imagine you have to add a feature to this order service:

```typescript
// ❌ BEFORE: Functional but improvable code
class OrderService {
  process(o: any) {
    if (o.status === 'pending' && o.items.length > 0) {
      // processing logic
      o.items.forEach((i: any) => {
        console.log('Processing item: ' + i.name);
      });
      o.processedAt = new Date();
      o.status = 'completed';
    }
  }
}
```

By applying the Boy Scout Rule while adding your change, you could leave it like this:

```typescript
// ✅ AFTER: Applying the Boy Scout Rule
// We've typed the object, improved names, and used guard clauses
interface Order {
  id: string;
  status: 'pending' | 'completed';
  items: Array<{ name: string }>;
  processedAt?: Date;
}

class OrderService {
  process(order: Order) {
    const isProcessable = order.status === 'pending' && order.items.length > 0;
    if (!isProcessable) return;

    this.processItems(order.items);
    
    order.processedAt = new Date();
    order.status = 'completed';
  }

  private processItems(items: Order['items']) {
    items.forEach(item => {
      console.log(`Processing item: ${item.name}`);
    });
  }
}
```

## The Accumulated Benefit

Imagine a team of 5 people. If each person makes one small improvement a day, by the end of the year the project will have received over 1,000 small improvements. That's the difference between a project that dies from its own complexity and one that remains young and agile.

---

**Hint for the next tip:** While cleaning is good, sometimes excessive zeal can be dangerous. In the next tip, we'll see the counterpoint: why trying to fix everything can end up being worse than leaving it as it was.

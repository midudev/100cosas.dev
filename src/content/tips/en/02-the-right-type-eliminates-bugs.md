---
id: "02"
title: "The right type eliminates bugs before they exist"
category: "Typing"
categoryColor: "text-sky-400 bg-sky-900/20"
author: "anders-hejlsberg"
---

For decades, the software industry debated between the agility of dynamic languages and the safety of static languages. However, thanks to the work of engineers like **Anders Hejlsberg** (architect of C# and TypeScript), today we understand that a modern type system is not a chain that holds us back, but a co-pilot that guides us.

The premise is radical but effective: **if the type system is rich enough, many of the errors we would normally encounter at runtime become physically impossible to write.**

## Executable documentation

The biggest problem with traditional documentation (comments, diagrams, README files) is that **it lies**. Over time, code evolves and documentation stays behind. Types, however, are documentation that the compiler verifies with every keystroke.

When you define a type, you are not just saying "this is a number"; you are communicating to your peers (and your future self) what the limits of that data are and what operations are valid on it.

## Make impossible states unrepresentable

This is the mindset that separates a junior developer from a senior one. Instead of filling your code with `if (data === null)` or `try-catch` validations, you should design your data structures so that invalid states cannot exist.

If your application has a user who can be "Anonymous" or "Registered", don't use a boolean `isRegistered` and optional fields. Use a **Discriminated Union**. In this way, the compiler will force you to handle each case and prevent you from accessing the email of a user who hasn't registered yet.

## The power of advanced typing

Notice how we move from code that we "hope works" to code that we "guarantee works".

```typescript
// ❌ LEVEL 1: The danger of ambiguity
// What if the status is 'WAITING'? What if we send an empty id?
interface Order {
  id: string;
  status: string; // 'pending', 'shipped', 'delivered'...
}

// ✅ LEVEL 2: Nominal typing and Unions
// Now the compiler knows exactly which values are valid.
type OrderStatus = 'pending' | 'shipped' | 'delivered';

// 🔥 LEVEL 3: Making the impossible unrepresentable
// We design states that only contain the data they need.
interface PendingOrder {
  status: 'pending';
  createdAt: Date;
}

interface ShippedOrder {
  status: 'shipped';
  shippedAt: Date;
  trackingId: string;
}

type Order = PendingOrder | ShippedOrder;

function processOrder(order: Order) {
  if (order.status === 'shipped') {
    // Here the compiler KNOWS order.trackingId exists
    console.log(order.trackingId);
  } else {
    // Here order.trackingId would give a compilation error ❌
    // We prevent an "undefined" bug before it happens.
    console.log(order.createdAt);
  }
}
```

### Conclusion

Typing is not bureaucracy. It is a conversation with the compiler where you explain your business rules and it makes sure no one breaks them by accident. Investing time in designing the right types at the beginning of a feature is probably the cheapest and most effective form of quality control in the history of computing.

As Anders Hejlsberg says: *"Types give you the confidence to refactor without fear"*. And a developer without fear is a much more creative and productive developer.

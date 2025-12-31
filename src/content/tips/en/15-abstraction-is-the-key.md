---
id: "15"
title: "Abstraction is the key to survival"
category: "Architecture"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "barbara-liskov"
---

Computing is not about computers, but about managing complexity. **Barbara Liskov**, one of the brightest minds in software history and a Turing Award winner, left us a lesson that is more relevant today than ever: abstraction is not a luxury, it is our code's defense mechanism against time.

> "Abstraction is the key to building systems that survive change."

## Change is the only constant

In a software project, the only thing we know for sure is that requirements will change. The database that is perfect today will be replaced tomorrow; the external API we use today will change its terms; or simply the business rules will evolve.

If our code knows too many details about how things work inside, it becomes rigid. When a detail changes, everything that depends on it breaks. Abstraction allows us to create an "interface" or a contract that hides those details, allowing us to change the implementation without affecting the rest of the system.

## The Liskov Substitution Principle (LSP)

Barbara Liskov is world-famous for the principle that bears her name (the 'L' in SOLID). This principle states that if you have a base class and a subclass, you should be able to use the subclass anywhere you expect the base class, without anything breaking.

In TypeScript, this means our abstractions must be honest. It's not enough for types to match; **behavior** must also be consistent.

## Practical example in TypeScript

Imagine a notification system. If we design the abstraction poorly, we'll end up with code full of conditionals. If we design it following the Liskov principle, the system will be infinitely extensible.

```typescript
// ❌ THE ERROR: An abstraction that breaks the contract
// Some subtypes require extra steps or behave differently
interface Notifier {
  send(message: string): void;
}

class EmailNotifier implements Notifier {
  send(message: string) {
    console.log(`Sending Email: ${message}`);
  }
}

class SMSNotifier implements Notifier {
  // ⚠️ LISKOV VIOLATION: 
  // We force the client to know a detail (the number)
  // that the general interface does not cover.
  sendWithNumber(message: string, phone: string) {
    console.log(`Sending SMS to ${phone}: ${message}`);
  }
  
  send(message: string) {
    throw new Error("Phone number required");
  }
}

// ✅ THE SOLUTION: Abstracting correctly
// The client doesn't need to know implementation details
interface MessageService {
  send(content: string): Promise<void>;
}

class EmailService implements MessageService {
  constructor(private email: string) {}
  async send(content: string) {
    console.log(`Email sent to ${this.email}: ${content}`);
  }
}

class PushService implements MessageService {
  constructor(private deviceId: string) {}
  async send(content: string) {
    console.log(`Push sent to device ${this.deviceId}: ${content}`);
  }
}

// Now any service can replace MessageService
// without the code using it having to change.
async function notifyUser(service: MessageService, message: string) {
  await service.send(message); // Works for ANY service
}
```

## Why this saves your system

When you apply the correct abstraction:
1. **Decouple the "what" from the "how"**: Your business logic says "notify the user", not "connect to Amazon's SMTP server and send a packet".
2. **Facilitate testing**: You can replace real implementations with "mocks" that follow the same interface.
3. **Reduce fear of change**: If tomorrow you decide to use WhatsApp instead of SMS, you only have to create a new class that implements the interface. The rest of your application won't even notice the change.

Abstraction is not about making code harder to read by adding unnecessary layers; it's about creating the right boundaries so your system doesn't collapse under its own weight when the outside world changes.

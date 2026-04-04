---
id: "03"
title: "Choose boring technology"
category: "Strategy"
categoryColor: "text-red-400 bg-red-900/20"
author: "margaret-hamilton"
---

Margaret Hamilton led the software team for NASA's Apollo program at the MIT Instrumentation Laboratory. When astronauts' lives depended on every line of code, there was no room to experiment with unproven technology. The Apollo Guidance Computer (AGC) was built on well-understood principles, verifiable architecture, and an operating system grounded in ideas that had already proven themselves. **Choosing "boring" technology wasn't a limitation — it was the engineering decision that saved the Apollo 11 mission.**

This philosophy has a modern name: *Choose Boring Technology*. The idea is that every team has a limited capacity to absorb novelty — roughly **three "innovation tokens"** you can spend however you like. Every unfamiliar technology you introduce consumes attention, creates uncertainty, and multiplies failure modes nobody knows how to diagnose. If you spend your tokens replacing PostgreSQL with the trendy new database, you have none left to innovate where it truly matters: your product.

## What does "boring" mean?

"Boring" doesn't mean bad or obsolete. It means **well understood**. A boring technology is one whose failure modes are documented, whose limits are known, and whose solutions to common problems have been refined over years.

Hamilton's team at MIT understood this instinctively. The AGC had just 74 KB of ROM and 4 KB of RAM. They worked within those constraints using proven memory management and task-scheduling techniques. The "boring" parts of their approach — exhaustive verification, manually reviewed code, defensive architecture — are precisely what allowed the software to recover on its own when the computer overloaded during the lunar landing.

## The Apollo 11 lesson

Three minutes before the Eagle touched down on the lunar surface, alarms 1202 and 1203 fired. The computer was overloaded because the rendezvous radar was sending unnecessary data. In that critical moment, Hamilton's software didn't crash. Thanks to its priority-based scheduling — built with well-understood process scheduling techniques — the AGC dropped low-priority tasks and kept the essentials: navigation and descent control.

Had the team experimented with an untested OS or unproven memory architecture, that automatic recovery might never have worked. **Reliability came from choosing the known and executing it flawlessly.**

## Innovation tokens in practice

Imagine you're starting a new project. You have decisions to make:

```text
❌ Spending all your innovation tokens:

- Database: SurrealDB (new, promising, small community)
- Backend: Bun + Hono (fast, but young ecosystem)
- Frontend: Qwik (innovative, but few developers know it)
- Infrastructure: Fly.io with Edge Computing
- Auth: Custom solution with WebAuthn

→ Result: 5 unknowns at once. Any bug could be in any layer
  and nobody has the experience to diagnose it.
```

```text
✅ Spending tokens strategically (the Hamilton approach):

- Database: PostgreSQL (boring, reliable, exhaustively documented)
- Backend: Node.js + Express (boring, millions of answers online)
- Frontend: React (boring by now — and that's a good thing)
- Infrastructure: AWS/Vercel (predictable, well-documented)
- Auth: Auth0/Clerk (solved problem, don't reinvent it)

→ Innovation token spent on: your core differentiating feature

→ Result: 1 controlled unknown. The rest of the stack is predictable.
```

## When to innovate

Hamilton didn't avoid innovation — she concentrated it. Her team invented revolutionary concepts like asynchronous error recovery and fault-tolerant software. But they built those innovations on a foundation of known techniques. Apply the same principle:

1. **Innovate on your differentiator**: If you're a real-time streaming company, that's where you spend your token — not on replacing your relational database.
2. **Innovate when the pain is real**: If PostgreSQL genuinely can't handle your load after optimization, then explore alternatives. But not before.
3. **Innovate one thing at a time**: Never change two things at once. If something breaks, you need to know exactly what caused it — just like in Apollo flight tests.

## The hidden cost of new tech

Every new technology carries costs that don't show up in any benchmark: ramp-up time for the whole team, rare problems not yet on Google, an immature ecosystem with fewer libraries and integrations.

The most dangerous cost is the **bus factor**: only one or two people truly understand the new tool. If one leaves, the knowledge leaves with them. Hamilton addressed this in Apollo by insisting that code be understandable by the entire team, not just the author.

Next time you're tempted to adopt the latest technology, remember Margaret Hamilton's philosophy: focus your innovation where it truly matters and build everything else on solid ground. When lives depend on your software — or when your business does — **boring is your superpower.**

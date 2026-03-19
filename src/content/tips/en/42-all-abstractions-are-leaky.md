---
id: "42"
title: "All abstractions are leaky"
category: "Architecture"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "joel-spolsky"
---

Joel Spolsky, co-founder of Stack Overflow, formulated a law that every developer should know: **"All non-trivial abstractions, to some degree, are leaky"**.

## What is a leaky abstraction?

An abstraction is a simplification that hides complexity. A "leak" occurs when that hidden complexity escapes and forces you to understand the details the abstraction was supposed to hide.

### Classic example: SQL

SQL abstracts how data is physically stored. But when your query is slow:

```sql
-- This should "just work"
SELECT * FROM users WHERE email = 'user@example.com';

-- But you need to know about indexes, which are an implementation detail
CREATE INDEX idx_users_email ON users(email);
```

Suddenly, you need to understand B-trees, disk pages, and execution plans. The abstraction leaks.

### Modern example: ORMs

```javascript
// Looks simple and clean
const users = await User.findAll({
  include: [{ model: Post }, { model: Comment }]
});

// But it generates the N+1 problem, and now you need to understand SQL
// The abstraction that promised you could ignore SQL... forces you to know SQL
```

## Leaks are inevitable

Joel argues that **you can't design a perfect abstraction**:

- **TCP** abstracts the network, but when there's latency, you notice
- **File systems** abstract the disk, but when the disk is full, it fails
- **Garbage collectors** abstract memory, but when there's a GC pause, your app freezes
- **Async/await** abstracts callbacks, but deadlocks still exist

## The "you don't need to know" trap

The danger of good abstractions:

```javascript
// A junior can write this without understanding HTTP
const response = await fetch('/api/users');
const data = await response.json();

// But when it fails, they need to understand:
// - HTTP status codes
// - CORS
// - Headers
// - Timeouts
// - Retries
// - Cache
```

The abstraction lets you start without knowledge, but **demands that knowledge when it fails**.

## How to survive leaks

### 1. Learn one layer below

You don't need to know assembly, but you should understand:
- JavaScript → How the event loop works
- React → How the DOM works
- Kubernetes → How containers work

### 2. Read error messages carefully

Cryptic errors often come from lower layers leaking through:

```
ECONNREFUSED 127.0.0.1:5432
```

Your ORM won't tell you "PostgreSQL isn't running". It just leaks the TCP error.

### 3. Have debugging tools for each layer

```bash
# Network
curl, wget, tcpdump

# Database
EXPLAIN ANALYZE

# Containers
docker logs, kubectl describe
```

## Final reflection

Abstractions are essential - we couldn't build modern software without them. But the illusion that you can ignore what's underneath is exactly that: an illusion. The best developers understand multiple layers of the stack, not because they want to, but because leaks forced them to learn.

---
id: "44"
title: "Don't design for the worst case, design for the real case"
category: "Architecture"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "radia-perlman"
---

Radia Perlman, inventor of the Spanning Tree protocol that makes Ethernet networks work, has a unique perspective on system design: **solve the problem you have, not the one you imagine you might have**.

## The "What if...?" syndrome

Engineers love hypothetical scenarios:

- "What if we have a million users?"
- "What if we need to support 50 languages?"
- "What if the client wants to change the database?"

The result: overcomplicated systems for problems that never arrive.

```javascript
// What we build "just in case"
class AbstractFactoryProviderManagerSingletonProxy {
  // 2000 lines of "flexible" code
}

// What we actually needed
function getUser(id) {
  return db.users.findById(id);
}
```

## Radia's approach

When designing Spanning Tree, Radia didn't try to solve all possible network problems. She focused on **one specific problem**: preventing loops in Ethernet networks.

The protocol:
- Is simple (fits on a napkin)
- Solves exactly what it needs to solve
- Has worked for 40 years

## Pragmatic design in practice

### Appropriate scale

```javascript
// You don't need Redis when you have 100 users
const cache = new Map();

function getUser(id) {
  if (cache.has(id)) return cache.get(id);
  
  const user = await db.users.findById(id);
  cache.set(id, user);
  return user;
}

// When you really need Redis, migration is trivial
```

### Appropriate database

```sql
-- PostgreSQL does all this well for 99% of cases:
-- - Relational data ✓
-- - JSON ✓
-- - Full text search ✓
-- - Geolocation ✓

-- You don't need 5 specialized databases
```

### Appropriate architecture

```
# For most projects:
One server → One process → One database

# Premature "microservices":
12 services → 12 deploys → 12 failure points → 1 developer crying
```

## The cost of unnecessary flexibility

Every "just in case" abstraction has costs:

1. **Complexity**: More code to maintain
2. **Performance**: More layers to traverse
3. **Understanding**: More concepts to learn
4. **Bugs**: More places where things can fail

## When TO design for the future

Radia doesn't say "never plan". She says "**plan for probable changes, not possible ones**":

```javascript
// Probable change: adding fields to user
// Design: flexible schema, automatic migrations
const userSchema = {
  name: String,
  email: String,
  // Easy to add more fields
};

// Possible but unlikely change: switch from PostgreSQL to Oracle
// Design: DON'T abstract the entire database
// If that moment comes, you refactor
```

## Final reflection

Radia's protocol has survived decades not because it anticipated all changes, but because it solved one specific problem well. The best systems aren't the most flexible - they're the ones that do one thing well. You can always add complexity later; removing it is much harder.

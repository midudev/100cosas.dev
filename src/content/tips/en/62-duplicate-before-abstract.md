---
id: "62"
title: "Duplicate code before creating the wrong abstraction"
category: "Architecture"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "sandi-metz"
---

Sandi Metz has advice that seems to go against everything we're taught: **"Duplication is far cheaper than the wrong abstraction"**.

## The premature DRY impulse

```javascript
// You see two similar functions
function formatUserEmail(user) {
  return `${user.firstName} ${user.lastName} <${user.email}>`;
}

function formatAdminEmail(admin) {
  return `[ADMIN] ${admin.firstName} ${admin.lastName} <${admin.email}>`;
}

// Your instinct: "There's duplication! I must abstract"
function formatEmail(person, prefix = '') {
  return `${prefix}${person.firstName} ${person.lastName} <${person.email}>`;
}
```

Looks better, right? Until...

## When the abstraction breaks

```javascript
// New requirements: admins need to show their department
// Users need to show their plan (free/pro)
// Some users are companies, not people

function formatEmail(entity, options = {}) {
  const prefix = options.prefix || '';
  const suffix = options.suffix || '';
  const name = entity.companyName || 
    `${entity.firstName || ''} ${entity.lastName || ''}`.trim();
  const extra = entity.department || entity.plan || '';
  
  return `${prefix}${name}${extra ? ` (${extra})` : ''} <${entity.email}>${suffix}`;
}

// 😱 Now we have a function that does too much
// Hard to understand, test, and modify
```

## Sandi's rule of three

```markdown
1. First time: just write the code
2. Second time: notice the duplication, but allow it to exist
3. Third time: NOW consider abstracting

Why wait? Because by the third case:
- You know the real patterns better
- You see what's truly common and what's not
- The abstraction emerges naturally
```

## Duplicated code vs. forced abstraction

```javascript
// ✅ Honest duplication (easy to change)
function formatUserForEmail(user) {
  return `${user.name} <${user.email}>`;
}

function formatUserForDisplay(user) {
  return `${user.name} (${user.role})`;
}

function formatUserForLog(user) {
  return `[User:${user.id}] ${user.name}`;
}

// Each function is simple and clear
// When one changes, the others aren't affected
```

## Signs of premature abstraction

1. **The function has many boolean parameters**
2. **There are many `if/else` based on "type"**
3. **The name is generic**: `handleThing`, `processData`
4. **You need to read the implementation to understand what it does**

## Signs it's time to abstract

1. **The pattern has repeated 3+ times**
2. **The cases are genuinely identical** (not just similar)
3. **The abstraction has a clear name**
4. **Tests would be simpler with the abstraction**

## Final reflection

Sandi reminds us that the goal isn't eliminating all duplication - it's writing maintainable code. Sometimes, three simple duplicated functions are more maintainable than one "clever" abstract function.

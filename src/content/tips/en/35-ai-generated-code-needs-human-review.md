---
id: "35"
title: "AI-generated code needs human review"
category: "AI"
categoryColor: "text-red-400 bg-red-900/20"
author: "andrej-karpathy"
---

Vibe coding is liberating. You write a description, AI generates code, it works on the first try. But **Andrej Karpathy**, the one who coined the term, constantly warns about its dark side:

> "Vibe coding is amazing for prototypes, but for production you need to actually understand and review what the AI generates."

## The problem: Code that "works"

AI is very good at generating code that compiles, passes basic tests, and seems to work. The problem is that "works" doesn't mean "is secure" or "is correct".

```typescript
// AI-generated code that "works"
async function getUserData(userId: string) {
  const query = `SELECT * FROM users WHERE id = '${userId}'`;
  return await db.query(query);
}

// ⚠️ Problem 1: SQL Injection
// An attacker can send: userId = "'; DROP TABLE users; --"

// ⚠️ Problem 2: SELECT * exposes sensitive data
// Do you really want to return the password hash?

// ⚠️ Problem 3: No input validation
// What happens if userId is undefined?
```

## The studies are alarming

Recent research shows that a significant percentage of AI-generated code contains vulnerabilities:

- **SQL Injection:** AI concatenates strings in queries
- **XSS:** Generates unsanitized HTML
- **Hardcoded secrets:** Sometimes includes example API keys that look real
- **Insecure dependencies:** Suggests libraries with known vulnerabilities

## The AI code review checklist

Before merging AI-generated code, ask yourself:

```typescript
interface AICodeReviewChecklist {
  // Security
  "Are there unvalidated inputs?": boolean;
  "Are there queries built with concatenation?": boolean;
  "Are there hardcoded secrets or API keys?": boolean;
  "Is HTML output sanitized?": boolean;
  
  // Correctness
  "Do I understand what each line does?": boolean;
  "Does it handle edge cases?": boolean;
  "What happens with null/undefined?": boolean;
  "Are there tests for edge cases?": boolean;
  
  // Maintainability
  "Are names descriptive?": boolean;
  "Can I debug this at 3 AM?": boolean;
  "Does it follow project conventions?": boolean;
}
```

## AI code patterns you should always review

### 1. Error handling

```typescript
// ❌ AI often ignores errors
const data = await fetch(url).then(r => r.json());

// ✅ Explicit handling
const response = await fetch(url);
if (!response.ok) {
  throw new FetchError(`HTTP ${response.status}: ${response.statusText}`);
}
const data = await response.json();
```

### 2. Input validation

```typescript
// ❌ AI trusts everything
function processOrder(order: Order) {
  return order.items.reduce((sum, item) => sum + item.price, 0);
}

// ✅ Validate before processing
function processOrder(order: unknown) {
  const validated = orderSchema.parse(order);
  return validated.items.reduce((sum, item) => sum + item.price, 0);
}
```

### 3. Data access

```typescript
// ❌ AI doesn't think about authorization
async function getDocument(docId: string) {
  return await db.documents.findById(docId);
}

// ✅ Verify permissions
async function getDocument(docId: string, userId: string) {
  const doc = await db.documents.findById(docId);
  if (doc.ownerId !== userId && !doc.isPublic) {
    throw new ForbiddenError('No access to this document');
  }
  return doc;
}
```

## The golden rule

**If you don't understand the code, don't merge it.**

It doesn't matter how much of a hurry you're in. It doesn't matter if it "works". Code you don't understand is code you can't:

- Debug when it fails
- Modify when requirements change
- Protect when there's a vulnerability

Vibe coding is a powerful tool. But like any powerful tool, it can cause harm if used carelessly. **AI generates the code; the responsibility is yours.**

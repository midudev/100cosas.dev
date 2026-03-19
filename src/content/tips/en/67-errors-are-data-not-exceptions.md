---
id: "67"
title: "Errors are data, not exceptions"
category: "Clean Code"
categoryColor: "text-green-400 bg-green-900/20"
author: "rich-harris"
---

Rich Harris, besides creating Svelte, has promoted a shift in how we think about errors: **errors aren't unexpected exceptions, they're possible results you should handle**.

## The problem with try/catch

```javascript
// ❌ Try/catch hides the error flow
async function getUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    return user;
  } catch (error) {
    // What failed? The fetch? The JSON? Something else?
    console.error(error);
    return null;
  }
}
```

## Errors as data

```javascript
// ✅ The error is part of the result
async function getUser(id) {
  const response = await fetch(`/api/users/${id}`);
  
  if (!response.ok) {
    return { 
      ok: false, 
      error: { 
        type: 'http', 
        status: response.status,
        message: `Failed to fetch user: ${response.statusText}`
      } 
    };
  }
  
  try {
    const user = await response.json();
    return { ok: true, data: user };
  } catch {
    return { 
      ok: false, 
      error: { type: 'parse', message: 'Invalid JSON response' } 
    };
  }
}
```

## The Result pattern

```typescript
// Define a generic Result type
type Result<T, E = Error> = 
  | { ok: true; data: T }
  | { ok: false; error: E };

// Use it in your functions
async function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return { ok: false, error: 'Cannot divide by zero' };
  }
  return { ok: true, data: a / b };
}
```

## Why it's better

### 1. Visible errors

With try/catch, errors are invisible in the signature. With Result, errors are explicit.

### 2. Forced handling

Try/catch allows ignoring errors silently. Result forces you to handle them.

## Final reflection

Rich and others have brought this idea from languages like Rust and Go. Treating errors as data, not exceptions, makes your code more predictable, easier to test, and harder to accidentally ignore.

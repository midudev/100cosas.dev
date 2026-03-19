---
id: "75"
title: "Don't reinvent the wheel (unless you're learning about wheels)"
category: "Productivity"
categoryColor: "text-lime-400 bg-lime-900/20"
author: "kent-c-dodds"
---

Kent C. Dodds is pragmatic: **use existing solutions for production, reinvent for learning**. The distinction is crucial.

## When to use existing

```javascript
// ❌ Reinventing email validation
const emailRegex = /^[a-zA-Z0-9... // 200 chars of regex

// ✅ Use proven library
import { isEmail } from 'validator';
```

## When to reinvent

```javascript
// To learn how React works:
function useState(initialValue) {
  // Your basic implementation
  // Now you understand hooks
}

// For production:
import { useState } from 'react';
```

## Final reflection

The best solutions to common problems already exist. Your time is better invested in solving your business's unique problems, not rewriting what others have solved.

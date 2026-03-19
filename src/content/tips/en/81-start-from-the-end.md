---
id: "81"
title: "Start from the end: write first how you want to use the code"
category: "Process"
categoryColor: "text-blue-400 bg-blue-900/20"
author: "kent-beck"
---

Kent Beck has a trick for designing APIs: **write first the code that will use your function, then implement the function**.

## Design from usage

```javascript
// 1. First I write how I WANT to use it
const user = await User.findByEmail('user@example.com');
const orders = await user.getRecentOrders({ limit: 5 });
```

## Why it works

When you start from implementation, you create awkward APIs. When you start from usage, you create natural APIs.

## Final reflection

TDD takes this idea to the extreme: you write the test (usage) before the code. Even without strict TDD, thinking about usage first improves your design.

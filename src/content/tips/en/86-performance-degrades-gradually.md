---
id: "86"
title: "Performance degrades gradually: always monitor"
category: "DevOps"
categoryColor: "text-orange-400 bg-orange-900/20"
author: "addy-osmani"
---

Addy Osmani warns: **performance doesn't break suddenly, it degrades little by little until it's a problem**.

## Solution: Performance budgets

```javascript
// In your CI
const budget = {
  maxBundleSize: 250 * 1024, // 250KB
  maxLCP: 2500, // 2.5s
};
```

## Final reflection

What you don't measure degrades. Automate performance alerts before it becomes a problem.

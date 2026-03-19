---
id: "84"
title: "The first step to fixing a bug is reproducing it"
category: "Debugging"
categoryColor: "text-red-400 bg-red-900/20"
author: "julia-evans"
---

Julia Evans has a methodical process for debugging: **if you can't reproduce the bug, you can't fix it with confidence**.

## Julia's process

```markdown
1. Reproduce the bug locally
2. Write a test that fails because of the bug
3. Fix the bug
4. The test now passes
5. The bug can't come back
```

## Final reflection

A bug you can't reproduce is a bug that will return. Invest time in reproducing it before trying to fix it.

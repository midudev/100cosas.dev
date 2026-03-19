---
id: "83"
title: "Every dependency is debt you'll have to pay"
category: "Architecture"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "dhh"
---

DHH is known for minimizing dependencies: **every npm install is a promise of future maintenance**.

## Before installing, ask

1. Can I do this with native JavaScript?
2. How much of the package will I actually use?
3. Is it actively maintained?

## Final reflection

I'm not saying "don't use dependencies". I'm saying "evaluate the cost". Sometimes 20 lines of your own code is better than a 2000-line dependency.

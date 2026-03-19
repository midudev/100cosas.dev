---
id: "70"
title: "The best bug is the one that never reaches production"
category: "Testing"
categoryColor: "text-yellow-400 bg-yellow-900/20"
author: "guillermo-rauch"
---

Guillermo Rauch, with his philosophy of continuous CI/CD at Vercel, promotes a simple principle: **every layer of prevention you add before production multiplies your peace of mind**.

## The layers of defense

```
                    PRODUCTION
                         ↑
              ┌──────────────────┐
              │    Monitoring     │  ← Detects after the fact
              └──────────────────┘
                         ↑
              ┌──────────────────┐
              │  Preview Deploys  │  ← Detects before merge
              └──────────────────┘
                         ↑
              ┌──────────────────┐
              │     E2E Tests     │  ← Detects broken flows
              └──────────────────┘
                         ↑
              ┌──────────────────┐
              │    Unit Tests     │  ← Detects broken logic
              └──────────────────┘
                         ↑
              ┌──────────────────┐
              │    Type Check     │  ← Detects type errors
              └──────────────────┘
                         ↑
              ┌──────────────────┐
              │      Linting      │  ← Detects obvious errors
              └──────────────────┘
                         ↑
                    YOUR CODE
```

Each layer catches different types of errors.

## The cost of each layer

```markdown
| Layer          | Time      | Cost of bug found       |
|----------------|-----------|-------------------------|
| Linting        | Seconds   | $0 - just fix           |
| TypeScript     | Seconds   | $0 - doesn't compile    |
| Unit Tests     | Minutes   | $10 - local fix         |
| E2E Tests      | Minutes   | $100 - debugging        |
| Preview        | Hours     | $1,000 - PR blocked     |
| Production     | N/A       | $10,000+ - users affected |
```

## Final reflection

Guillermo designed Vercel so the path to production has multiple checkpoints. Every bug you catch before production is an incident you don't have to manage at 3am. Invest in prevention, not reaction.

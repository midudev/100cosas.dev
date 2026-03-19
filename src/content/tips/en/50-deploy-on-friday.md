---
id: "50"
title: "If your system is good, deploy on Friday"
category: "DevOps"
categoryColor: "text-orange-400 bg-orange-900/20"
author: "guillermo-rauch"
---

Guillermo Rauch, CEO of Vercel and creator of Next.js, challenges one of the most accepted "truths" in the industry: **"Don't deploy on Friday"**. His argument: if your system needs that rule, your system has problems.

## Institutionalized fear

```markdown
# Typical development calendar

| Day       | Deploy allowed? |
|-----------|-----------------|
| Monday    | Yes             |
| Tuesday   | Yes             |
| Wednesday | Yes             |
| Thursday  | ⚠️ Careful     |
| Friday    | ❌ NEVER        |
| Weekends  | 🔒 Forbidden    |

# Why? "Because if something fails, no one's there to fix it"
```

But this reveals a deeper problem: **your deploy process is dangerous**.

## Vercel's philosophy

Rauch built Vercel with a principle: **deploys should be so safe that the day doesn't matter**.

```bash
# At Vercel, every push is a deploy
git push origin main

# And every PR has a preview URL
# You can test before merging
# Rollback is one click
```

If Friday is dangerous, every day is dangerous. You just accept the risk Monday through Thursday.

## What you need to deploy any day

### 1. Atomic and instant deploys

```javascript
// Bad: 20-minute deploys where something can fail
// Good: immutable deploys that activate in milliseconds

// Vercel/Netlify/etc. build the new version
// And do atomic switch when ready
```

### 2. Immediate rollback

```bash
# If something fails, going back should be trivial
vercel rollback

# Or automatic
if (errorRate > threshold) {
  autoRollback();
}
```

### 3. Feature flags

```javascript
// Separate deploy from release
if (featureFlags.newCheckout) {
  return <NewCheckout />;
} else {
  return <OldCheckout />;
}

// You can deploy new code
// And activate it gradually (canary release)
```

### 4. Observability

```javascript
// Know immediately if something's wrong
Sentry.init({ dsn: '...' });

// Real-time business metrics
analytics.track('checkout_completed', { value });

// Alerts that wake the right person
```

### 5. Automated testing

```yaml
# CI that prevents broken deploys
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: npm test
      - run: npm run e2e
      # Only deploy if everything passes
```

## The hidden benefit

When you can deploy any day:

- **Fast fixes**: A Friday bug gets fixed on Friday
- **Less stress**: No "deploy windows"
- **More iterations**: More deploys = more feedback = better product

## The counterargument

"But if it fails on Friday, no one's there to fix it"

Rauch's response:

1. If your system requires frequent human intervention, it's fragile
2. Emergencies don't respect calendars - they can happen any day
3. Automation should handle common cases

## Final reflection

"No Friday deploys" is a symptom, not a solution. It's admitting that your deploys are dangerous and your system is fragile. The real solution is building systems where the day is irrelevant. If Vercel, serving millions of sites, can do it, so can you.

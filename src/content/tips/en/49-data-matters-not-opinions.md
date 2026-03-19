---
id: "49"
title: "Data matters, not opinions"
category: "Diversity"
categoryColor: "text-rose-400 bg-rose-900/20"
author: "tracy-chou"
---

Tracy Chou, an engineer who worked at Pinterest and Quora, did something that changed the conversation about diversity in tech: **she asked for data, not opinions**.

## The moment that changed everything

In 2013, Tracy published a simple post: "Where is the data on gender diversity in tech?" The industry talked a lot about diversity, but nobody showed numbers.

She created a public spreadsheet asking companies to share how many women engineers they had. The response was revealing:

- Many companies **didn't know** their own numbers
- Those who knew **didn't want to share** them
- The numbers that emerged were **worse than expected**

## Why data matters

```javascript
// Opinion without data
"I think we're pretty diverse"

// Real data
const stats = {
  totalEngineers: 500,
  women: 45,           // 9%
  underrepresentedMinorities: 23,  // 4.6%
  latinx: 8,           // 1.6%
  black: 5             // 1%
};

// Data forces honest conversations
```

## Applying the principle beyond diversity

Tracy's approach applies to any problem:

### 1. "Our code is good quality"

```bash
# Opinion vs. data
eslint . --format json | jq '.length'  # 847 errors
npm run test:coverage                   # 23% coverage
```

### 2. "Users love our app"

```javascript
const realMetrics = {
  nps: 23,              // "Love" = -100 to +100
  churnRate: '8%/month', // You lose 8% users each month
  avgSessionTime: '47s'  // Less than 1 minute
};
```

### 3. "Our team is productive"

```markdown
| Metric | Value |
|--------|-------|
| Lead time (idea → production) | 6 weeks |
| Deploy frequency | 1/month |
| Mean time to recovery | 4 hours |
| Change failure rate | 30% |
```

## How to collect data without being invasive

### For diversity

```javascript
// Voluntary and anonymous surveys
// Aggregates, never individual
// Trends over time, not snapshots

const survey = {
  voluntary: true,
  anonymous: true,
  reportThreshold: 5,  // Don't report groups < 5 people
  categories: ['Prefer not to say', ...options]
};
```

### For technical performance

```yaml
# Automate collection
# DORA metrics
name: Collect Metrics
on:
  schedule:
    - cron: '0 0 * * 1'  # Every Monday
jobs:
  metrics:
    runs-on: ubuntu-latest
    steps:
      - run: ./scripts/collect-dora-metrics.sh
```

## The change Tracy generated

After her initiative:

1. **Pinterest** published their diversity numbers (first companies to do so)
2. **Other companies followed**: Google, Facebook, etc.
3. **The conversation changed**: From "we think we're fine" to "these are the data, this is what we're going to improve"

## Final reflection

Tracy demonstrated that opinions without data are smoke. When you have numbers, you have accountability. When you have accountability, you have real progress. Apply this principle to any area: if you can't measure it, you're probably not improving it.

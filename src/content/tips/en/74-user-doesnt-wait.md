---
id: "74"
title: "The user doesn't wait: every millisecond counts"
category: "Performance"
categoryColor: "text-amber-400 bg-amber-900/20"
author: "addy-osmani"
---

Addy Osmani has extensively documented how speed affects user experience: **100ms is instant, 1 second is noticeable, 10 seconds is abandonment**.

## Perception thresholds

```markdown
| Time       | User perception           |
|------------|---------------------------|
| 0-100ms    | Instant                   |
| 100-300ms  | Slightly noticeable       |
| 300-1000ms | App feels slow            |
| 1-10s      | Loses focus               |
| 10s+       | Abandons                  |
```

## High-impact optimizations

```html
<!-- Prioritize LCP image -->
<img src="hero.jpg" fetchpriority="high" />

<!-- Lazy load what's not visible -->
<img src="footer.jpg" loading="lazy" />
```

## Final reflection

Perceived speed is as important as actual speed. Sometimes optimizing perceived experience is more effective than optimizing code.

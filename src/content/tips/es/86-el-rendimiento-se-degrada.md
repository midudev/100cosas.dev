---
id: "86"
title: "El rendimiento se degrada gradualmente: monitoriza siempre"
category: "DevOps"
categoryColor: "text-orange-400 bg-orange-900/20"
author: "addy-osmani"
---

Addy Osmani advierte: **el rendimiento no se rompe de golpe, se degrada poco a poco hasta que es un problema**.

## El problema del "funciona en mi máquina"

```markdown
Semana 1: Bundle = 200KB, LCP = 1.2s ✓
Semana 5: Bundle = 300KB, LCP = 1.8s (nadie nota)
Semana 12: Bundle = 600KB, LCP = 4.2s 😱
```

## Solución: Performance budgets

```javascript
// En tu CI
const budget = {
  maxBundleSize: 250 * 1024, // 250KB
  maxLCP: 2500, // 2.5s
};

if (currentBundle > budget.maxBundleSize) {
  throw new Error('Bundle size exceeded!');
}
```

## Reflexión final

Lo que no mides se degrada. Automatiza las alertas de rendimiento antes de que sea un problema.

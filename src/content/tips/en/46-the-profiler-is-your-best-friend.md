---
id: "46"
title: "The profiler is your best friend, not your intuition"
category: "Performance"
categoryColor: "text-amber-400 bg-amber-900/20"
author: "john-carmack"
---

John Carmack, the legend who programmed Doom, Quake, and revolutionized 3D graphics, has a golden rule for optimization: **"Never trust your intuition. Measure first"**.

## The "this must be slow" trap

Programmers have a sixth sense for detecting "slow" code. The problem is that sense constantly lies.

```javascript
// "Obviously" this is the slow part
const result = items
  .filter(item => item.active)
  .map(item => expensiveTransform(item))
  .reduce((acc, item) => acc + item.value, 0);

// But the profiler reveals: 95% of the time is in
// an HTTP call we didn't even suspect
```

## Carmack and the obsession with measuring

When Carmack was optimizing Doom in 1993, every frame counted. His approach:

1. **Measure current state** (don't guess)
2. **Identify the real bottleneck**
3. **Optimize only that**
4. **Measure again**

```c
// Carmack didn't assume - he measured
// He discovered wall rendering was 60% of frame time
// He focused only on that, ignoring the "obvious"
```

## Modern tools

### For JavaScript/Web

```javascript
// Chrome DevTools Performance
// 1. Open DevTools → Performance
// 2. Record an action
// 3. Analyze the flame chart

// Or programmatically:
console.time('operation');
await yourOperation();
console.timeEnd('operation');

// For more detail:
performance.mark('start');
await yourOperation();
performance.mark('end');
performance.measure('operation', 'start', 'end');
```

### For Node.js

```bash
# Profiling with clinic.js
npx clinic doctor -- node server.js

# Or with native profiler
node --prof app.js
node --prof-process isolate-*.log > processed.txt
```

### For React

```jsx
// React DevTools Profiler
// Or programmatically:
import { Profiler } from 'react';

<Profiler id="List" onRender={(id, phase, actualDuration) => {
  console.log(`${id} rendered in ${actualDuration}ms`);
}}>
  <ExpensiveList items={items} />
</Profiler>
```

## The real 90/10

The 90/10 rule says 90% of time is spent in 10% of the code. But **you don't know which 10% until you measure**.

```javascript
// What we assumed was slow:
function processData(data) {
  return data.map(item => complexCalculation(item)); // ← "Here's the problem"
}

// What the profiler revealed:
function processData(data) {
  const result = data.map(item => complexCalculation(item));
  logToRemoteServer(result); // ← The real bottleneck
  return result;
}
```

## Blind vs. informed optimization

### ❌ Blind optimization

```javascript
// "This should be faster"
const result = [];
for (let i = 0; i < items.length; i++) {
  result.push(items[i] * 2);
}

// vs map (which was equally fast or faster)
```

### ✅ Informed optimization

```javascript
// The profiler showed: 500ms in JSON.parse of a 50MB file
// Real solution: streaming parsing
const stream = require('stream-json');
```

## Final reflection

Carmack could have assumed where the performance problems in Doom were. He had the experience to do it. But he chose to measure. And that made Doom run on hardware nobody thought possible. Your intuition is valuable for generating hypotheses. The profiler is what validates them.

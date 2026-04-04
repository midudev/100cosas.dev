---
id: "28"
title: "Question everything you take for granted"
category: "Mindset"
categoryColor: "text-emerald-400 bg-emerald-900/20"
author: "lynn-conway"
---

In 1964, a young engineer at IBM invented **dynamic instruction scheduling** — a technique that allows processors to execute instructions out of order for maximum performance. It was revolutionary. Then IBM fired her, erased her name from the records, and took credit for her work for decades.

Lynn Conway lost everything. She had to rebuild her career from scratch, unable to mention her most important contribution. Most people would have given up. She chose to question again.

At Xerox PARC in the 1970s, Conway asked a question nobody in the industry dared to ask: **"Why does designing a chip have to be so hard?"** At the time, creating an integrated circuit required years of artisanal work by highly specialized engineers. Conway, together with Carver Mead, radically simplified the process. Their book *Introduction to VLSI Systems* democratized chip design, and her **MOSIS** system let universities worldwide prototype chips over the internet. What once cost millions and took years could now be done by a student in weeks.

Her philosophy: **"Why not question everything?"**

## The danger of "that's how it's always been done"

In programming, past decisions solidify into absolute truths. Nobody remembers why that database, that architecture pattern, or that naming convention was chosen. They only know "that's how it's always been done."

```javascript
// ❌ Code nobody questions because "it's always worked"
const config = {
  maxRetries: 3,       // Why 3? Who decided this?
  timeout: 5000,       // Is 5 seconds optimal or just made up?
  batchSize: 100,      // Was 50 or 200 ever tested?
};

// ✅ Decisions backed by evidence and open to challenge
const config = {
  maxRetries: 3,       // Measured: 97% of transient errors resolve in 3 retries
  timeout: 2000,       // Reduced from 5s after measuring real p95 latency: 800ms
  batchSize: 250,      // Benchmarked: 250 optimal for our payload size
};
```

Every "magic number" in your code is an assumption someone made once. Conway teaches us that questioning those assumptions is where innovation begins.

## Failure as creative fuel

Conway believed deeply that **failure is a necessary part of creativity**. Not an obstacle to avoid, but an essential learning mechanism. Her own life is proof: she lost her career, her professional identity, and her work — and from those ashes built something that transformed an entire industry.

In software development, fear of failure produces conservative code, rigid architectures, and teams that never experiment. Conway proposed the opposite: **fail fast, fail cheap, fail often**.

```javascript
// A search system evolving through failure

// Attempt 1: Exact match → fails (nobody types exact names)
// Attempt 2: includes() → fails (too many irrelevant results)
// Attempt 3: Relevance scoring ✅
function search(query, items) {
  const normalize = str => str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const q = normalize(query);

  return items
    .map(item => {
      const name = normalize(item.name);
      let score = 0;
      if (name === q) score = 100;
      else if (name.startsWith(q)) score = 75;
      else if (name.includes(q)) score = 50;
      return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);
}
// Each previous failure made this code better
```

None of the intermediate versions were "mistakes." Each was a necessary step. As Conway said: failure isn't the opposite of success — it's the path to it.

## "If you want to change the future, start living as if you're already there"

This quote from Conway is more than motivational. It's an engineering strategy. When she designed MOSIS so any university could fabricate chips, she wasn't solving a present-day problem — she was building the infrastructure for the future she imagined.

Apply this to your code:

```typescript
// ❌ Code for today: "we only have one language right now"
function getGreeting() {
  return "Hello, welcome";
}

// ✅ Code for the future: "let's live as if it's already international"
function getGreeting(locale: string = 'en') {
  const greetings: Record<string, string> = {
    en: "Hello, welcome",
    es: "Hola, bienvenido",
    pt: "Olá, bem-vindo",
  };
  return greetings[locale] ?? greetings.en;
}
```

This isn't over-engineering. It's **designing in the right direction** from the start, leaving room to grow without rewriting everything.

## The courage to ask "why?"

Questioning everything takes courage. In a team, asking "why do we do it this way?" can be read as ignorance or attack. But Conway proved that uncomfortable questions generate the most important breakthroughs.

Next time you open a code file and see something that's "always been this way," stop for a moment. Ask why. There might be a good reason. That reason might have ceased to exist years ago. And your question might be, like Lynn Conway's, the beginning of something that changes the rules of the game.

The greatest enemy of innovation isn't lack of talent or resources. It's lack of questions. **Question everything. Fail with intention. Build the future you imagine.**

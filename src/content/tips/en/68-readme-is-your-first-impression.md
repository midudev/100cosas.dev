---
id: "68"
title: "The README is your first impression"
category: "Documentation"
categoryColor: "text-slate-400 bg-slate-900/20"
author: "tania-rascia"
---

Tania Rascia, known for her clear and accessible documentation, has a rule for her projects: **if someone can't understand and run your project in 5 minutes reading the README, you've failed**.

## The minimum viable README

```markdown
# Project Name

One line explaining what it does.

## Installation

\`\`\`bash
npm install my-project
\`\`\`

## Quick usage

\`\`\`javascript
import { thing } from 'my-project';
thing.doSomething();
\`\`\`

## License

MIT
```

This is better than nothing. But you can do more.

## The README that converts

A good README should have:

### 1. Immediate hook

```markdown
❌ "This is a project for..."
✅ "Authentication that works. No pain."

The first line sells the project.
```

### 2. Copy-pasteable installation

```markdown
❌ "First make sure you have Node 18+, then..."
✅ 
\`\`\`bash
npm install thing
\`\`\`

One line that works.
```

### 3. Working example

```markdown
❌ Pseudocode that no one can run
✅ Real code that you copy-paste and it works
```

## For personal/portfolio projects

```markdown
# 🌟 My Project

> A Twitter clone built to learn React and Node.

## Live Demo

👉 [See demo](https://my-project.vercel.app)

## Technologies

- React 18 + TypeScript
- Node.js + Express
- PostgreSQL + Prisma
```

## Final reflection

Tania treats every README as if it were a product landing page. The README is the first thing recruiters, collaborators, and users see. Invest time in it: it's your cover letter.

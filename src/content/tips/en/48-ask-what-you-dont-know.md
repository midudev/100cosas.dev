---
id: "48"
title: "Ask what you don't know, even if it seems obvious"
category: "Learning"
categoryColor: "text-violet-400 bg-violet-900/20"
author: "julia-evans"
---

Julia Evans, creator of Wizard Zines and engineer at Stripe, has built a career doing something many avoid: **asking "dumb" questions in public and documenting what she learns**.

## The fear of appearing incompetent

In tech there's enormous pressure to "already know". Admitting you don't understand something feels dangerous:

- "How can a senior not know what a B-tree is?"
- "You should know this after 5 years of experience"
- "It's basic, just Google it"

Julia does the opposite: she publishes her questions and her learning process. And millions of people discover they had the same doubts.

## Learning in public

Julia's approach:

### 1. Admit what you don't know

```markdown
# A real Julia post:
"I always get confused about how DNS works. Let me finally learn it properly."

# 50 pages of zine later: one of the most popular resources on DNS
```

### 2. Ask concrete questions

```
❌ "How does Linux work?"
✅ "What exactly happens when I type 'ls' and press Enter?"
```

The second question leads to useful answers and deep learning.

### 3. Document while learning

```markdown
# My current understanding of containers:
- They're like isolated processes? ✓
- They use Linux namespaces? ✓
- They share kernel with host? ✓ (this surprised me)
- They're VMs? ✗ (now I understand the difference)
```

## Why it works

When you ask in public:

1. **Others confirm or correct**: "Actually, it's not exactly like that..."
2. **You discover you weren't alone**: "I had that same doubt!"
3. **You create resources for others**: Your question becomes documentation
4. **Experts get involved**: They love explaining things well

## Examples of "dumb" questions that revealed insights

```markdown
❓ "Why does git have a staging area? Couldn't it just commit directly?"
💡 Insight: Allows partial commits and review before committing

❓ "Why isn't setTimeout(fn, 0) immediate?"
💡 Insight: The event loop, task queue, how JavaScript handles async

❓ "Why does HTTPS need certificates?"
💡 Insight: Asymmetric cryptography, chain of trust, CAs
```

## How to start

### In your team

```markdown
In code review:
"I don't understand this part. Can you explain why we use this pattern?"

In meetings:
"Sorry, can you explain that acronym? I don't know it."
```

### In public

- Write a blog post about something you just learned
- Tweet your technical questions
- Ask questions in community Discord/Slack channels

## The secret superpower

Julia has turned "not knowing" into a strength. Her zines are popular precisely because they address the things everyone wanted to ask but didn't dare. By normalizing questions, she created an invaluable resource for the community.

## Final reflection

The next time you don't understand something, resist the temptation to pretend you do. Ask. Document. Share. You're probably helping more people than you imagine, starting with your future self.

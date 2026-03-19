---
id: "17"
title: "Vibe Coding: Forget that the code even exists"
category: "AI"
categoryColor: "text-fuchsia-400 bg-fuchsia-900/20"
author: "andrej-karpathy"
---

In February 2025, **Andrej Karpathy**, co-founder of OpenAI and former Director of AI at Tesla, coined a term that captures a seismic shift in how we program: **"Vibe Coding"**.

> "There's a new kind of coding I call 'vibe coding', where you fully give in to the vibes, embrace exponentials, and forget that the code even exists."

## The paradigm shift

For decades, programming has meant writing code: memorizing syntax, fighting with semicolons, understanding the difference between `==` and `===`. Vibe coding proposes something radical: **you describe what you want in natural language and AI generates the code for you**.

It's not assisted programming. It's not autocomplete. It's a fundamental change in the relationship between human and machine.

## How does it work in practice?

```typescript
// BEFORE: You write every line
function getActiveUserEmails(users: User[]): string[] {
  return users
    .filter(user => user.isActive && user.emailVerified)
    .map(user => user.email)
    .filter((email): email is string => email !== null);
}

// NOW: You describe, AI implements
// "Give me emails from active users who have verified email,
// excluding nulls"

// AI generates the code. You review and adjust.
```

## The three levels of vibe coding

### Level 1: Intelligent autocomplete

AI completes lines based on context. This is what Copilot and Cursor do in their basic mode. You're still writing code, just faster.

### Level 2: Instruction-based generation

You describe a complete function or component in natural language. AI generates a code block that you review. It's "pair programming" with an AI.

### Level 3: Pure vibe coding

You forget about code. You talk to the AI as if it were a very fast junior developer. You tell it what you want, it implements, you correct course. You iterate until it works.

## The rules of vibe coding according to Karpathy

1. **Accept imperfection:** Generated code won't be perfect. Your job is to guide, not dictate every character.

2. **Think high-level:** Instead of "make a for loop," think "process all users and return a summary."

3. **Iterate fast:** The first attempt won't be right. Ask for changes, adjust, refine. The conversation IS the development process.

4. **Read the code (at least once):** It's not magic. It's code that must be correct, secure, and maintainable.

## The risks you should know

Vibe coding has a dark side that Karpathy also acknowledges:

```typescript
// ⚠️ DANGER: Code that "works" but you don't understand
// AI generated this. Do you know exactly what it does?
const result = data.reduce((acc, item) => 
  item.type === 'A' 
    ? { ...acc, a: [...(acc.a || []), transform(item)] }
    : item.type === 'B'
      ? { ...acc, b: [...(acc.b || []), process(item)] }
      : acc
, {} as Record<string, unknown[]>);

// If you don't understand it, you can't debug it.
// If you can't debug it, you can't maintain it.
```

## When to use vibe coding

✅ **Ideal for:**

- Prototypes and MVPs
- Automation scripts
- Idea exploration
- Learning new frameworks
- Boilerplate and repetitive code

⚠️ **With caution for:**

- Security-critical systems
- Production code without review
- Financial or medical algorithms
- Anything you can't verify

## The future according to Karpathy

Karpathy predicts that in a few years, most code will be AI-generated. Developers will be "orchestra conductors" who guide and supervise, not "musicians" playing every note.

But that doesn't mean programming is irrelevant. On the contrary: **understanding code becomes more important when you're not the one writing it**. You must be able to read, evaluate, and correct what AI generates.

Vibe coding isn't the end of programming. It's its evolution. And like any powerful tool, its value depends on how you use it.

**Embrace the vibes, but don't lose control.**

---
id: "12"
title: "Don't be a good Boy Scout, be a good professional"
category: "Teamwork"
categoryColor: "text-sky-400 bg-sky-900/20"
author: "braulio-diez"
---

Do you know the **Boy Scout Rule**? It's a very famous principle that says: "Always leave the campsite cleaner than you found it." In programming, this translates to fixing any mess you find while working on a task, even if it's unrelated.

In theory, it sounds noble, but **Braulio Diez** proposes a different and more pragmatic perspective: **Don't be a good Boy Scout, be a good professional.**

## The Problem with the Uncontrolled "Boy Scout"

Imagine you have to implement a simple feature, like "Create Client." While exploring the code, you see that the Login component has an ugly style, or the Stock service uses an old library. You decide to "clean it up" since you're already there.

Although your intentions are good, you've just created a **time bomb** for your team:

1. **Unmanageable PRs**: Your Pull Request (PR) now has 20 modified files instead of 3. The reviewer will wonder: "Why does creating a client touch the login?".
2. **Merge Conflicts**: By touching code that isn't yours to touch, you exponentially increase the probability of clashing with a teammate's work.
3. **Delivery Delays**: What was a one-hour task becomes a whole afternoon. If a bug arises from your "cleaning," you block the main functionality.

## The Good Professional's Rule

Being a professional doesn't mean ignoring the trash; it means **managing it correctly**. Instead of cleaning on impulse, follow this strategy:

1. **Refactor with Focus**: If the change directly improves the implementation of your current task, go ahead. If it's something external, **stop**.
2. **Document and Communicate**: If you find something that smells bad outside your scope, write it down. Open a "Technical Debt" ticket or mention it in the team channel.
3. **Small and Manageable PRs**: A focused PR is reviewed quickly, integrated without fear, and provides immediate value.

## Example: The "Boy Scout" vs. The "Professional"

### ❌ The Boy Scout (Mixed PR)

```typescript
// PR: "Feature: Create Client"
// Files modified: 15
// Changes: 
// - Client form (OK)
// - Global validation refactor (RISK: affects the whole app)
// - Color change in Login buttons (UNRELATED)
// - Console log removal in Footer (NOISE)
```

### ✅ The Professional (Focused PR + Note)

```typescript
// PR: "Feature: Create Client"
// Files modified: 3
// Changes: Only what's necessary for the feature.

// Additional action:
// "Team, I noticed global validation is a mess. 
// I've opened this ticket [DEBT-123] to tackle it 
// in a separate PR tomorrow."
```

## Team Value

As Braulio says, developing a product is about squaring the circle: you have to deliver value, on time, with limited cost, and maintaining quality.

If you treat refactoring or testing as something optional that you do "if you have time left," it will be rejected. If you include it as part of your professional standard, focused and communicated, you will raise the level of the entire team without causing chaos.

---

**Summary:** Focus on your task, deliver clean PRs, and document improvements to address them strategically. That's what distinguishes a professional from a simple cleaning enthusiast.

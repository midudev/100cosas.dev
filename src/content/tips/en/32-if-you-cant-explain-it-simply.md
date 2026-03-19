---
id: "32"
title: "If you can't explain it simply, you don't understand it"
category: "Simplicity"
categoryColor: "text-pink-400 bg-pink-900/20"
author: "richard-feynman"
---

**Richard Feynman**, Nobel Prize winner in Physics and one of the most brilliant scientists of the 20th century, had a principle he applied to all his work: **"If you can't explain it simply, you don't understand it well enough."**

Although Feynman wasn't a programmer, this maxim has become a pillar of software development. The ability to reduce complex problems to simple explanations isn't just a communication skill; it's a **sign of deep mastery**.

## The Feynman Technique applied to code

Feynman developed a learning method that bears his name. Applied to software development, it works like this:

1. **Choose a concept:** For example, "How does JavaScript's event loop work?"
2. **Explain it as if talking to a 12-year-old:** No jargon, no assumed prior knowledge.
3. **Identify the gaps:** Where you stumble or use technical jargon, that's where you don't really understand.
4. **Go back to the source:** Study until you can explain it simply.

## Code as explanation

If your code needs extensive comments to be understood, you probably don't understand it enough. Truly understood code is written in a way that **explains itself**.

```typescript
// ❌ LEVEL 1: The author doesn't understand their own code
// This function processes user data applying the necessary transformations
// according to the system state and current business rules
// to determine if the user meets the eligibility criteria
// based on multiple interrelated factors
function proc(u: any, s: any, r: any[]): boolean {
  return r.some(x => x.t === 'e' && x.v > s.th && u.a > x.m);
}

// ✅ LEVEL 2: Deep understanding = simple code
interface User {
  age: number;
}

interface EligibilityRule {
  type: 'age' | 'membership' | 'purchase';
  minimumAge: number;
  threshold: number;
}

function isUserEligible(
  user: User,
  systemThreshold: number,
  rules: EligibilityRule[]
): boolean {
  const ageRules = rules.filter(rule => rule.type === 'age');
  
  return ageRules.some(rule => 
    rule.threshold > systemThreshold && 
    user.age > rule.minimumAge
  );
}

// No comment needed because the code IS the explanation
```

## The "explain it to a junior" test

Feynman said that if you couldn't explain something to a first-year student, you didn't understand it. In programming, the equivalent is:

**Can a junior developer on your team understand your code without your help?**

If the answer is no, you have two options:

1. The code is too complex (refactor).
2. You don't understand what it does well enough (study before modifying).

## Simple architecture = Understood architecture

Simplicity isn't just for individual functions. It applies to the entire architecture.

```typescript
// ❌ Architecture nobody can explain in one sentence
// "Well, data comes in through the API Gateway, passes through the Event Bus,
// gets processed in the Lambda Orchestrator, cached in Redis,
// persisted in DynamoDB except metadata which goes to S3,
// and then CDC replicates it to the Data Lake for the ML pipeline..."

// ✅ Architecture explainable in one sentence
// "Users make requests to the API, which reads/writes to the database."

// If you need more than that, ask yourself: is it essential or accidental complexity?
```

## Symptoms of not understanding

Signs that you don't understand something well enough:

1. **You use many conditionals:** You probably don't understand the problem well enough to model it properly.
2. **You copy and paste code:** You don't understand the underlying pattern.
3. **Your explanation has lots of "basically" and "kind of":** You're camouflaging gaps.
4. **You need documentation open to make changes:** You haven't internalized the mental model.

## The humility of the expert

Feynman was known for admitting what he didn't know. The best developers do the same. They say "I don't understand this" and then do the work to understand it before writing code.

```typescript
// The Feynman approach in a code review:

// ❌ "This works but I'm not really sure why"
// 🚨 ALERT: Don't deploy this code to production

// ✅ "This works because X causes Y, which results in Z"
// ✅ Now you can maintain it, debug it, and improve it
```

## The end result

When you truly understand something:

- Your code is shorter.
- Your functions have fewer parameters.
- Your names are more precise.
- Your architectures have fewer layers.
- Your explanations take less time.

As Feynman said, nature isn't complicated; we're the ones who complicate things when we don't understand them. **Simplicity isn't the starting point; it's the reward of deep understanding.**

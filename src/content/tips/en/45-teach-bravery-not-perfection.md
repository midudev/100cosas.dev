---
id: "45"
title: "Teach bravery, not perfection"
category: "Mindset"
categoryColor: "text-cyan-400 bg-cyan-900/20"
author: "reshma-saujani"
---

Reshma Saujani, founder of Girls Who Code, has observed a pattern in thousands of students learning to code. Her conclusion changed how we think about tech education: **"We teach girls to be perfect, and boys to be brave"**.

## The blank screen syndrome

In Girls Who Code courses, Reshma noticed something:

> "A teacher told me that girls came to her desk saying 'I don't know what code to write'. But when she looked at their screens, they weren't blank. They had written code, but deleted it because it wasn't perfect the first time."

Boys, on the other hand, showed their incomplete code without problem. They were used to trying, failing, and continuing.

## Perfection paralyzes

```javascript
// The code we delete for "not being perfect"
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

// But this WORKS. It's a starting point.
// Later you can refactor:
const calculateTotal = items => items.reduce((sum, item) => sum + item.price, 0);
```

The first code isn't elegant. But it exists. And code that exists can be improved. Code you delete because "it's not good enough" can't be improved.

## Bravery in programming

Being brave in code means:

### 1. Showing work in progress

```javascript
// TODO: This is incomplete but I want feedback
function processPayment(amount) {
  // Basic implementation
  console.log(`Processing ${amount}...`);
  // Missing: validation, errors, Stripe integration
}
```

### 2. Asking "obvious" questions

In code reviews, in meetings, in Slack:
- "What does this function do?"
- "Why do we use this pattern?"
- "I don't understand this part"

"Dumb" questions often reveal real problems.

### 3. Publishing imperfect code

Your first GitHub project doesn't have to be perfect. Your first technical article doesn't have to be exhaustive. **Perfection is the enemy of progress**.

## The cost of waiting for perfection

```markdown
Scenario A: You wait until your app is "ready"
- Months of development without feedback
- Discover late that nobody needs it
- Burnout from working in a vacuum

Scenario B: You launch something basic
- Real users from day one
- Feedback that guides development
- Motivation from seeing impact
```

## Beyond gender

Although Reshma speaks specifically about girls, the advice applies to everyone:

- Impostor syndrome affects all developers
- The "10x developer" culture intimidates
- Perfect tutorial code makes us feel inadequate

## How to practice bravery

1. **Share before you're ready**: Small, frequent pull requests
2. **Fail in public**: Talk about your mistakes on your blog or social media
3. **Celebrate attempts**: Not just successes
4. **Mentor**: Helping others normalizes not knowing everything

## Final reflection

Programming isn't about writing perfect code the first time. It's about iterating, failing, learning, and improving. The best programmers I know aren't the ones who never make mistakes - they're the ones who aren't afraid to make them.

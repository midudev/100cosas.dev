---
id: "05"
title: "Clean code is not the end goal"
category: "Philosophy"
categoryColor: "text-amber-400 bg-amber-900/20"
author: "dan-abramov"
---

Dan Abramov, in his famous essay *Goodbye, Clean Code*, reminds us of a truth often forgotten in the pursuit of perfection: **"Clean code is not a goal. It’s a tool to help us deal with complexity"**.

Many developers, especially early in their careers, become obsessed with principles like **DRY** (Don't Repeat Yourself) or perfect abstraction. The problem arises when "cleaning" the code makes it so abstract that it becomes impossible to understand or change.

## The Premature Abstraction Trap

Imagine you have two components that look somewhat similar. The "clean" impulse is to merge them into one.

### The "Obsessive" Approach: Over-abstraction

Trying to make an ultra-generic component so everything is "clean" and there's no repetition.

```tsx
// A component that tries to do too much just to be "DRY"
interface GenericCardProps {
  title: string;
  type: 'user' | 'product';
  onAction: () => void;
  showPrice?: boolean; // Product only
  avatarUrl?: string;  // User only
}

const GenericCard = ({ title, type, ...props }: GenericCardProps) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      {type === 'product' && <span>{props.showPrice}</span>}
      {type === 'user' && <img src={props.avatarUrl} />}
      <button onClick={props.onAction}>Click</button>
    </div>
  );
};
```

*Problem:* As the requirements for 'user' and 'product' diverge, this component fills up with `ifs` and optional props. It's "clean" because there's no repeated code, but it's a maintenance nightmare.

### The Pragmatic Approach: Code as a Tool

Accepting a bit of repetition to gain clarity and flexibility. Use clean code only where it actually reduces mental load.

```tsx
// Simple, specific components
const UserCard = ({ name, avatarUrl, onProfileClick }: UserProps) => (
  <div className="card">
    <h2>{name}</h2>
    <img src={avatarUrl} alt={name} />
    <button onClick={onProfileClick}>View Profile</button>
  </div>
);

const ProductCard = ({ title, price, onBuy }: ProductProps) => (
  <div className="card">
    <h2>{title}</h2>
    <span>${price}</span>
    <button onClick={onBuy}>Buy Now</button>
  </div>
);
```

## Key Takeaways

1. **Avoid Dogmatic Clean Code:** If a refactor makes the code harder to follow for a teammate, it's not an improvement.
2. **Accept Duplication:** It is much better to duplicate some code than to create the wrong abstraction.
3. **Measure Value:** Ask yourself: "Does this cleanup help me understand the system better, or does it just make me feel like a better programmer?"

Code is a means to an end (delivering value), not a work of art that must be immutable.

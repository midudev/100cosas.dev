---
id: "58"
title: "Prefer composition over inheritance"
category: "Architecture"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "dan-abramov"
---

Dan Abramov, co-creator of Redux, has repeatedly explained a principle that React adopted as central philosophy: **"Composition gives you everything inheritance promises, without the problems"**.

## The problem with inheritance

```javascript
// The typical class hierarchy that seemed like a good idea
class Animal {
  eat() { /* ... */ }
  sleep() { /* ... */ }
}

class Bird extends Animal {
  fly() { /* ... */ }
}

class Penguin extends Bird {
  // Oops... penguins don't fly
  fly() { throw new Error("I can't fly!"); }
}

// Now you have a method you shouldn't have
// And you break the Liskov Substitution Principle
```

## The solution: composition

```javascript
// Instead of "is a", think "has a" or "can do"
const canEat = (state) => ({
  eat: () => { /* ... */ }
});

const canSleep = (state) => ({
  sleep: () => { /* ... */ }
});

const canFly = (state) => ({
  fly: () => { /* ... */ }
});

const canSwim = (state) => ({
  swim: () => { /* ... */ }
});

// Now you compose what you need
function createPenguin(name) {
  const state = { name };
  return {
    ...canEat(state),
    ...canSleep(state),
    ...canSwim(state)
    // No fly - penguins swim, not fly
  };
}

function createEagle(name) {
  const state = { name };
  return {
    ...canEat(state),
    ...canSleep(state),
    ...canFly(state)
  };
}
```

## In React: composition is king

```jsx
// ❌ "Inheritance" in components (antipattern)
class SpecialButton extends Button {
  render() {
    return <button className="special">{this.props.children}</button>;
  }
}

// ✅ Composition
function SpecialButton({ children, ...props }) {
  return <Button className="special" {...props}>{children}</Button>;
}

// Even better: render props or children
function Card({ header, children, footer }) {
  return (
    <div className="card">
      <div className="card-header">{header}</div>
      <div className="card-body">{children}</div>
      <div className="card-footer">{footer}</div>
    </div>
  );
}
```

## Hooks: behavior composition

```javascript
// Each hook is a composable unit of behavior
function useAuth() {
  const [user, setUser] = useState(null);
  // ... auth logic
  return { user, login, logout };
}

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  });
  // ... storage logic
  return [value, setValue];
}

// You compose behaviors in your component
function Dashboard() {
  const { user } = useAuth();
  const [preferences] = useLocalStorage('prefs', {});
  const [data] = useFetch(`/api/data/${user.id}`);
  
  // Your component is a composition of behaviors
}
```

## Why it works better

### 1. Flexibility

```javascript
// With inheritance: you're trapped in the hierarchy
// With composition: you mix what you need

const hybridCreature = {
  ...canFly(state),
  ...canSwim(state),
  ...canBreatheUnderwater(state)
};
```

### 2. Testing

```javascript
// Each behavior is tested in isolation
test('canSwim', () => {
  const swimmer = canSwim({ energy: 100 });
  swimmer.swim();
  expect(state.energy).toBe(90);
});
```

### 3. No coupling

Inheritance creates rigid dependencies. Composition creates independent pieces.

## Final reflection

Dan and the React team chose composition as the central pattern because it's more flexible, testable, and easier to reason about. Inheritance seems natural at first ("a dog IS an animal"), but quickly becomes restrictive. Composition gives you freedom to combine behaviors like Lego pieces.

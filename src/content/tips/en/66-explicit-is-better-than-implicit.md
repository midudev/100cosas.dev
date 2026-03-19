---
id: "66"
title: "Explicit is better than implicit"
category: "Fundamentals"
categoryColor: "text-purple-400 bg-purple-900/20"
author: "guido-van-rossum"
---

Guido van Rossum, creator of Python, included this gem in the Zen of Python: **"Explicit is better than implicit"**. And it applies to all code, not just Python.

## Implicit is magical (and dangerous)

```javascript
// ❌ Implicit magic
function processUser(user) {
  // Where does LOCALE come from? And API_URL?
  const name = formatName(user.name, LOCALE);
  const response = await fetch(API_URL + '/users');
}

// What does this function need? You don't know without reading all the code
```

## Explicit is clear

```javascript
// ✅ Explicit dependencies
function processUser(user, { locale, apiUrl }) {
  const name = formatName(user.name, locale);
  const response = await fetch(`${apiUrl}/users`);
}

// Usage:
processUser(user, {
  locale: 'en-US',
  apiUrl: 'https://api.example.com'
});

// Now you know exactly what the function needs
```

## Examples in different contexts

### Imports

```javascript
// ❌ Implicit: what am I importing?
import * as utils from './utils';
utils.something();

// ✅ Explicit: clear what I use
import { formatDate, parseJSON } from './utils';
```

### Props in React

```jsx
// ❌ Implicit: spread of unknown props
function Button(props) {
  return <button {...props} />;
}

// ✅ Explicit: documented props
function Button({ onClick, disabled, children, variant = 'primary' }) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
}
```

## The cost of implicit

1. **Harder debugging**: "Where does this value come from?"
2. **Slower onboarding**: New devs don't understand conventions
3. **Fragile tests**: Hidden dependencies break tests
4. **Dangerous refactoring**: You don't know what depends on what

## Final reflection

Guido created Python with readability as priority. Explicit requires more characters but saves hours of debugging and confusion. When in doubt between being clever and implicit or verbose and explicit, choose explicit.

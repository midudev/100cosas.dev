---
id: "54"
title: "A function should do one thing and do it well"
category: "Clean Code"
categoryColor: "text-green-400 bg-green-900/20"
author: "robert-c-martin"
---

Robert C. Martin, known as "Uncle Bob", has spent decades teaching a seemingly simple principle: **functions should do one thing**. Sounds obvious, but the reality is we violate it constantly.

## What does "one thing" mean?

It's not the number of lines. It's the level of abstraction.

```javascript
// ❌ This function does "one thing" but it's really several
function processUserRegistration(userData) {
  // Validation
  if (!userData.email || !userData.password) {
    throw new Error('Missing fields');
  }
  if (userData.password.length < 8) {
    throw new Error('Password too short');
  }
  
  // Hashing
  const salt = crypto.randomBytes(16);
  const hash = crypto.pbkdf2Sync(userData.password, salt, 1000, 64, 'sha512');
  
  // Persistence
  const user = {
    email: userData.email,
    passwordHash: hash.toString('hex'),
    salt: salt.toString('hex'),
    createdAt: new Date()
  };
  database.users.insert(user);
  
  // Notification
  emailService.send({
    to: userData.email,
    subject: 'Welcome!',
    body: 'Thanks for registering...'
  });
  
  return user;
}
```

## The same code, refactored

```javascript
// ✅ Each function does ONE thing
function registerUser(userData) {
  validateUserData(userData);
  const user = createUser(userData);
  saveUser(user);
  sendWelcomeEmail(user);
  return user;
}

function validateUserData(data) {
  if (!data.email || !data.password) {
    throw new ValidationError('Missing required fields');
  }
  if (data.password.length < 8) {
    throw new ValidationError('Password must be at least 8 characters');
  }
}

function createUser(data) {
  return {
    email: data.email,
    ...hashPassword(data.password),
    createdAt: new Date()
  };
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512');
  return {
    passwordHash: hash.toString('hex'),
    salt: salt.toString('hex')
  };
}

function saveUser(user) {
  database.users.insert(user);
}

function sendWelcomeEmail(user) {
  emailService.send({
    to: user.email,
    subject: 'Welcome!',
    body: 'Thanks for registering...'
  });
}
```

## Why does it matter?

### 1. Testability

```javascript
// Now you can test each part independently
describe('validateUserData', () => {
  it('throws on missing email', () => {
    expect(() => validateUserData({ password: '12345678' }))
      .toThrow('Missing required fields');
  });
});

describe('hashPassword', () => {
  it('returns hash and salt', () => {
    const result = hashPassword('mypassword');
    expect(result).toHaveProperty('passwordHash');
    expect(result).toHaveProperty('salt');
  });
});
```

### 2. Reusability

```javascript
// hashPassword can now be used in:
// - Registration
// - Password change
// - Password reset
```

### 3. Readability

```javascript
// The main function is now a "table of contents"
function registerUser(userData) {
  validateUserData(userData);  // Step 1
  const user = createUser(userData);  // Step 2
  saveUser(user);  // Step 3
  sendWelcomeEmail(user);  // Step 4
  return user;
}
```

## The "AND" rule

If you can describe what your function does using "AND", it does too much:

```markdown
❌ "This function validates the data AND hashes the password AND saves the user AND sends the email"

✅ "This function validates user data"
✅ "This function hashes a password"
✅ "This function saves a user"
✅ "This function sends the welcome email"
```

## The counterargument

"But I have 20 small functions instead of 1 large one"

Yes, and each one:
- Has a descriptive name
- Does exactly what it says
- Is easy to test
- Is easy to modify
- Is easy to reuse

## Final reflection

Uncle Bob says "the first draft is always bad". It's normal to write large functions first. The discipline is in refactoring them afterwards. Every time you use "and" to describe what a function does, consider splitting it.

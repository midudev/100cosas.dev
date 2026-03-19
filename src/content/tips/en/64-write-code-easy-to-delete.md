---
id: "64"
title: "Write code that's easy to delete, not easy to extend"
category: "Architecture"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "tania-rascia"
---

Tania Rascia, developer and technical writer, promotes a liberating idea: **the best code isn't the most extensible, it's the code you can delete without fear**.

## The extensibility obsession

```javascript
// "Just in case we need more notification types"
class NotificationFactory {
  static create(type, options) {
    switch(type) {
      case 'email': return new EmailNotification(options);
      case 'sms': return new SMSNotification(options);
      case 'push': return new PushNotification(options);
      // Ready for 10 more types we'll never use
    }
  }
}

// 6 months later: we only use email
// But we have 500 lines of "infrastructure"
```

## Code you can delete

```javascript
// Simple, direct, deletable
async function sendEmailNotification(user, message) {
  await emailService.send({
    to: user.email,
    subject: 'Notification',
    body: message
  });
}

// If tomorrow you need SMS:
// 1. Create sendSMSNotification
// 2. Use it where you need it
// 3. You didn't touch existing code
```

## Why being able to delete matters

### 1. Code is temporary

```markdown
Real codebase statistics:
- 50% of code is rewritten in 2 years
- 20% is never used (dead code)
- 30% stays the same

If 70% will change or die, why optimize for extension?
```

## Signs of hard-to-delete code

1. **Many circular dependencies**
2. **"Core" module that everything uses**
3. **Hidden side effects**
4. **Global state everywhere**

## How to write deletable code

### Independent modules

```javascript
// Each feature is self-contained
/features
  /auth
    - login.js
    - signup.js
  /payments
    - checkout.js
    - paymentService.js

// Deleting /payments doesn't affect /auth
```

## Final reflection

Tania reminds us that code isn't a monument. It's a temporary tool that solves today's problems. When you write code thinking that someday you'll delete it, you write simpler, cleaner, and paradoxically, more lasting code.

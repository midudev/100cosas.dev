---
id: "82"
title: "Logs are your best friend in production"
category: "DevOps"
categoryColor: "text-orange-400 bg-orange-900/20"
author: "kelsey-hightower"
---

Kelsey Hightower insists: **in production, logs are your only window into what's happening**.

## Useful vs. useless logs

```javascript
// ❌ Useless
console.log('here');

// ✅ Useful
logger.info('Payment processed', {
  userId: user.id,
  amount: payment.amount,
  transactionId: payment.id
});
```

## Final reflection

Well-structured logs save you hours of debugging. Invest time in making them useful.

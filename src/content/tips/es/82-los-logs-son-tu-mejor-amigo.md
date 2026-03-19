---
id: "82"
title: "Los logs son tu mejor amigo en producción"
category: "DevOps"
categoryColor: "text-orange-400 bg-orange-900/20"
author: "kelsey-hightower"
---

Kelsey Hightower insiste: **en producción, los logs son tu única ventana a lo que está pasando**.

## Logs útiles vs. inútiles

```javascript
// ❌ Inútil
console.log('here');
console.log(data);

// ✅ Útil
logger.info('Payment processed', {
  userId: user.id,
  amount: payment.amount,
  transactionId: payment.id,
  duration: Date.now() - startTime
});
```

## Niveles de log

```javascript
logger.debug('Entering function X'); // Desarrollo
logger.info('User logged in');       // Eventos normales
logger.warn('Retry attempt 2/3');    // Algo raro
logger.error('Payment failed', err); // Algo malo
```

## Reflexión final

Los logs bien estructurados te ahorran horas de debugging. Invierte tiempo en hacerlos útiles.

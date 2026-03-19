---
id: "82"
title: "Los logs son tu mejor amigo en producción"
category: "DevOps"
categoryColor: "text-orange-400 bg-orange-900/20"
author: "kelsey-hightower"
---

**En producción no puedes poner un breakpoint.** Kelsey Hightower, una de las voces más influyentes en el ecosistema de Kubernetes y la nube, lo resume así: *"The best debugging tool in production is good logging."* No hay IDE que te salve cuando el error ocurre a las 3 AM en un pod que ya fue reciclado.

Hightower pasó años evangelizando Kubernetes en Google, y una de sus lecciones más repetidas es que la observabilidad no es un lujo: es un requisito. En un mundo de sistemas distribuidos, microservicios y contenedores efímeros, los logs son a menudo la única pista que tienes de lo que salió mal.

## Logs que salvan vs. logs que estorban

La diferencia entre un log útil y uno inútil puede ser la diferencia entre resolver una incidencia en 5 minutos o en 5 horas:

```javascript
// ❌ Logs que no ayudan a nadie
console.log('here');
console.log('data:', data);
console.log('something went wrong');
console.log(JSON.stringify(user));

// ✅ Logs estructurados con contexto
logger.info('payment_processed', {
  userId: user.id,
  amount: payment.amount,
  currency: payment.currency,
  transactionId: payment.id,
  provider: 'stripe',
  duration: Date.now() - startTime
});
```

Los logs estructurados (en formato JSON) permiten filtrar, buscar y agregar. Si tu sistema procesa 10.000 pagos al día y uno falla, necesitas poder buscar por `transactionId` o `userId`, no leer miles de líneas con `console.log('here')`.

## Los niveles de log existen por algo

Cada nivel tiene un propósito. Usarlos mal es como poner todas las alarmas al mismo volumen:

```javascript
// DEBUG: solo para desarrollo, muy detallado
logger.debug('Cache lookup', { key: 'user:123', hit: false });

// INFO: eventos normales del negocio
logger.info('User logged in', { userId: '123', method: 'oauth' });

// WARN: algo inesperado que no rompe nada (todavía)
logger.warn('Rate limit approaching', { current: 85, max: 100 });

// ERROR: algo falló y necesita atención
logger.error('Payment failed', {
  error: err.message,
  stack: err.stack,
  userId: user.id,
  retryCount: 2
});
```

En producción, normalmente configuras el nivel en `info` o `warn`. Si necesitas investigar un problema concreto, bajas temporalmente a `debug` para ese servicio. Si usas `error` para todo, tus alertas se convierten en ruido y nadie las mira.

## La tríada de la observabilidad

Hightower insiste en que los logs solos no son suficientes. La observabilidad moderna se apoya en tres pilares:

1. **Logs**: qué pasó exactamente (eventos discretos)
2. **Métricas**: cuánto está pasando (contadores, latencias, percentiles)
3. **Trazas**: cómo fluye una petición a través de múltiples servicios

```javascript
// Una petición bien instrumentada combina las tres
async function processOrder(order) {
  const span = tracer.startSpan('processOrder');

  logger.info('order_processing_started', { orderId: order.id });
  metrics.increment('orders.processing');

  const start = Date.now();
  try {
    const result = await chargePayment(order);
    metrics.histogram('order.duration', Date.now() - start);
    logger.info('order_completed', { orderId: order.id });
    return result;
  } catch (err) {
    metrics.increment('orders.failed');
    logger.error('order_failed', { orderId: order.id, error: err.message });
    throw err;
  } finally {
    span.end();
  }
}
```

## Lecciones del mundo real

Kelsey contaba una historia recurrente de sus días debuggeando clusters de Kubernetes: un servicio empezaba a fallar intermitentemente, pero los logs solo decían `"Error: connection refused"`. Sin contexto —sin saber qué servicio intentaba conectar a cuál, cuántas veces lo había reintentado, o cuánta latencia acumulaba— el equipo tardó horas en descubrir que un sidecar de red se estaba reiniciando silenciosamente.

La lección: **un log sin contexto es solo ruido**. Cada log debería responder: qué pasó, a quién le pasó, cuándo, y qué estaba haciendo el sistema en ese momento.

Invierte tiempo en diseñar tus logs como si fueran una API. Porque en producción, son la API que usará tu "yo del futuro" a las 3 AM para salvar el sistema.

---
id: "23"
title: "Observa tu código en producción"
category: "DevOps"
categoryColor: "text-orange-400 bg-orange-900/20"
author: "charity-majors"
---

Charity Majors, co-fundadora de Honeycomb y una de las voces más influyentes en el mundo DevOps, tiene una frase que incomoda a muchos: **"Testing in production is not a crime. Not testing in production is negligence."** No es provocación gratuita. Es la conclusión lógica de décadas trabajando con sistemas distribuidos.

Tu entorno de staging miente. Tiene datos de prueba, carga artificial y comportamientos que nunca se parecen a lo que hacen tus usuarios reales. La única verdad está en producción.

## Monitorizar no es observar

La mayoría de equipos confunden **monitorización** con **observabilidad**, y esa confusión cuesta incidentes. La monitorización te dice QUÉ está roto: CPU al 95%, latencia alta, errores 500. La observabilidad te dice POR QUÉ está roto: qué usuario, qué request, qué ruta de código provocó el problema.

```javascript
// ❌ Monitorización: sabes que algo falla, pero no qué
console.log('Error processing request');
console.log('Database timeout');
console.log('User action failed');

// ✅ Observabilidad: logging estructurado con contexto
logger.error('Payment processing failed', {
  userId: user.id,
  orderId: order.id,
  amount: order.total,
  paymentProvider: 'stripe',
  errorCode: err.code,
  errorMessage: err.message,
  latencyMs: Date.now() - startTime,
  retryCount: attempt,
  environment: process.env.NODE_ENV
});
```

La diferencia parece sutil en el código, pero es abismal cuando tienes un incidente a las 3 de la madrugada. Con `console.log` tienes que adivinar. Con logging estructurado puedes filtrar, correlacionar y encontrar el problema en minutos.

## Los tres pilares de la observabilidad

La industria habla de tres pilares de la observabilidad que, combinados, te dan una visión completa de tu sistema:

![Los tres pilares de la observabilidad: Logs, Métricas y Trazas sobre una base de Observabilidad](/images/diagrams/tip-23-observability.svg)

### 1. Logs estructurados

No son `console.log`. Son eventos con contexto que puedes buscar y agregar:

```javascript
import pino from 'pino';
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

function processOrder(order, user) {
  const start = Date.now();
  logger.info({ event: 'order_started', orderId: order.id, userId: user.id });

  try {
    const result = chargePayment(order);
    logger.info({
      event: 'order_completed',
      orderId: order.id,
      durationMs: Date.now() - start
    });
    return result;
  } catch (error) {
    logger.error({
      event: 'order_failed',
      orderId: order.id,
      durationMs: Date.now() - start,
      error: error.message
    });
    throw error;
  }
}
```

### 2. Métricas

Números agregados que te dicen la salud general del sistema:

```javascript
import { metrics } from '@opentelemetry/api';

const meter = metrics.getMeter('api-server');
const requestDuration = meter.createHistogram('http_request_duration_ms');
const activeRequests = meter.createUpDownCounter('http_active_requests');

function metricsMiddleware(req, res, next) {
  const start = Date.now();
  activeRequests.add(1);

  res.on('finish', () => {
    activeRequests.add(-1);
    requestDuration.record(Date.now() - start, {
      method: req.method,
      route: req.route?.path || 'unknown',
      statusCode: res.statusCode
    });
  });

  next();
}
```

### 3. Trazas distribuidas

El superpoder que te permite seguir una petición a través de múltiples servicios:

```javascript
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('order-service');

async function handleCheckout(req, res) {
  return tracer.startActiveSpan('checkout', async (span) => {
    span.setAttribute('user.id', req.user.id);
    span.setAttribute('cart.items', req.body.items.length);

    try {
      await tracer.startActiveSpan('check-inventory', async (child) => {
        await checkInventory(req.body.items);
        child.end();
      });

      await tracer.startActiveSpan('process-payment', async (child) => {
        await processPayment(req.body);
        child.end();
      });

      res.json({ success: true });
    } catch (error) {
      span.recordException(error);
      res.status(500).json({ error: 'Checkout failed' });
    } finally {
      span.end();
    }
  });
}
```

Con trazas puedes ver que una petición tardó 3 segundos porque el servicio de inventario tardó 2.8 segundos en responder, y dentro de ese servicio la query a la base de datos fue la culpable. Sin trazas, solo sabrías que "el checkout es lento".

## La pregunta que deberías hacerte

Charity plantea un test revelador: **"Si tu servicio tiene un problema ahora mismo, ¿cuánto tardarías en enterarte? ¿Y cuánto en entender por qué?"**

Si la respuesta a la primera pregunta es "cuando un usuario se queje" y la respuesta a la segunda es "horas de revisar logs con grep", tienes un problema de observabilidad. La buena noticia es que no necesitas una plataforma sofisticada para empezar: logs estructurados con contexto suficiente ya marcan una diferencia enorme frente al `console.log` desnudo.

El código no termina cuando pasa los tests. Termina cuando puedes observarlo en producción, entender su comportamiento real y actuar rápido cuando algo va mal. Como dice Charity: **los tests te dicen que tu código funciona en un entorno controlado; la observabilidad te dice que funciona donde importa**.

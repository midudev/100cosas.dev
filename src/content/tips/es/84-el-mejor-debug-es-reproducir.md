---
id: "84"
title: "El primer paso para arreglar un bug es reproducirlo"
category: "Debugging"
categoryColor: "text-red-400 bg-red-900/20"
author: "julia-evans"
---

**Si no puedes reproducir el bug, no lo entiendes.** Julia Evans, ingeniera de software y creadora de los famosos *zines* sobre programación, tiene un enfoque metódico para la depuración: *"The most important thing you can do when debugging is to reproduce the bug."* No adivines, no supongas, no cambies cosas al azar esperando que se arregle.

Evans ha dedicado años a desmitificar herramientas como `strace`, `tcpdump` y los debuggers de sistemas operativos, demostrando que el debugging no es magia ni intuición: es un proceso sistemático. Y ese proceso siempre empieza por el mismo paso: hacer que el bug ocurra frente a ti, de forma predecible.

## El proceso de Julia

El flujo de debugging que Evans propone es tan elegante como disciplinado:

```markdown
1. Observa el comportamiento inesperado
2. Formula una hipótesis sobre la causa
3. Reproduce el bug de forma consistente
4. Escribe un test que falle por ese bug
5. Arregla el código
6. El test ahora pasa
7. El bug no puede volver nunca
```

El paso 3 es el crucial. Un bug que "a veces pasa" no es un bug entendido. Puede ser una condición de carrera, un problema de estado, o algo que depende de datos específicos. Hasta que no lo reproduces de forma consistente, estás disparando a ciegas.

## De reporte vago a test concreto

Los reportes de bugs en el mundo real rara vez son precisos. Tu trabajo es convertir "no funciona" en un test que falla:

```javascript
// ❌ El reporte: "El descuento no se aplica bien"
// Demasiado vago. ¿Qué descuento? ¿Qué producto? ¿Qué cantidad?

// ✅ Reproduce con datos concretos
test('aplica descuento del 20% solo a pedidos mayores de 100€', () => {
  const cart = createCart([
    { name: 'Libro', price: 45 },
    { name: 'Curso', price: 60 }
  ]);
  // Total: 105€ → debería aplicar descuento
  cart.applyPromoCode('SAVE20');

  expect(cart.total).toBe(84); // 105 * 0.8
});

test('NO aplica descuento si el pedido es menor de 100€', () => {
  const cart = createCart([
    { name: 'Libro', price: 45 }
  ]);
  cart.applyPromoCode('SAVE20');

  expect(cart.total).toBe(45); // sin descuento
});
```

Ahora tienes algo tangible. El test falla porque el descuento se aplicaba sin comprobar el mínimo. Arreglas la condición, el test pasa, y ese bug concreto está blindado para siempre.

## Cuando el bug es "imposible" de reproducir

Algunos bugs solo ocurren en producción, bajo carga, con datos específicos o en dispositivos concretos. Evans recomienda un enfoque investigativo:

```javascript
// 1. Añade contexto al error para entender las condiciones
async function processPayment(payment) {
  try {
    return await gateway.charge(payment);
  } catch (error) {
    logger.error('payment_failed', {
      error: error.message,
      stack: error.stack,
      paymentId: payment.id,
      amount: payment.amount,
      currency: payment.currency,
      userId: payment.userId,
      timestamp: new Date().toISOString(),
      retryCount: payment.retries || 0,
      gatewayResponse: error.response?.data
    });
    throw error;
  }
}
```

```javascript
// 2. Intenta reproducir localmente con los datos del log
test('reproduce error de pago con cantidad decimal larga', () => {
  const payment = {
    amount: 19.999999999999998, // ← dato real del log
    currency: 'EUR',
    userId: 'user_123'
  };

  // ¡Aquí está! El redondeo de punto flotante
  expect(() => validateAmount(payment.amount)).toThrow();
});
```

La clave está en recoger suficiente información del entorno donde el bug ocurre. Cada campo que añades al log es una pista futura. Evans lo llama "dejar migas de pan para tu yo del futuro".

## Herramientas que Julia recomienda

Evans ha popularizado herramientas que muchos desarrolladores ignoran:

1. **`git bisect`**: Encuentra automáticamente el commit que introdujo el bug. Si el bug existía hace 2 semanas pero no hace 3, `bisect` lo encuentra en minutos.
2. **Tests de regresión**: Cada bug arreglado debería dejar un test como guardián permanente.
3. **Logs de reproducción**: Graba las peticiones que llegan a tu servidor para poder "replayearlas" localmente.
4. **Snapshots de estado**: Serializa el estado de tu aplicación cuando ocurre el error para reconstruir la situación exacta.

## El bug que "no puede existir"

Hay una historia clásica en debugging: un equipo tenía un bug que solo ocurría los martes. Parecía absurdo, pero tras investigar descubrieron que un cronjob de los martes limpiaba una caché que otro servicio asumía que siempre existía. El bug era real, predecible y reproducible... una vez que entendieron las condiciones.

Todo bug tiene una causa. Todo bug es reproducible si entiendes su contexto. La tentación de cambiar código al azar y "ver si se arregla" es enorme, pero es la forma más lenta y peligrosa de trabajar. Reproduce primero, entiende después, arregla con confianza. Como dice Julia: *"You can't fix what you can't see."*

---
id: "77"
title: "Simplicidad no es simpleza"
category: "Arquitectura"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "edsger-dijkstra"
---

**Edsger Dijkstra, el científico que nos regaló el algoritmo de caminos más cortos, la programación estructurada y una colección legendaria de manuscritos escritos a mano, trazó una distinción que muchos programadores ignoran: lo simple y lo simplista son enemigos, no aliados.**

Ya hablamos de que Dijkstra consideraba la simplicidad un prerrequisito de la fiabilidad. Pero hay un matiz crucial que merece su propio capítulo: la simplicidad genuina es el resultado de un esfuerzo intelectual enorme, mientras que la simpleza (lo simplista) es el resultado de la pereza o la ignorancia. Como él mismo escribió: *"Simplicity is a great virtue but it requires hard work to achieve it and education to appreciate it. And to make matters worse: complexity sells better."*

## Lo simplista ignora; lo simple comprende

Un código simplista no es simple: es incompleto. Parece sencillo porque ha eliminado la complejidad real del problema escondiéndola debajo de la alfombra. La complejidad sigue ahí, pero ahora está en forma de bugs que aparecerán en producción.

```typescript
// ❌ SIMPLISTA: parece sencillo, pero ignora la realidad
function transferMoney(from: Account, to: Account, amount: number) {
  from.balance -= amount;
  to.balance += amount;
}
// ¿Y si from.balance < amount? ¿Y si from === to?
// ¿Y si la segunda operación falla después de la primera?
// ¿Y si amount es negativo? ¿Y si las cuentas están en divisas distintas?
// Este código "simple" es una fábrica de bugs.

// ✅ SIMPLE: maneja la complejidad real sin añadir complejidad artificial
function transferMoney(
  from: Account,
  to: Account,
  amount: Money
): TransferResult {
  if (amount.isNegativeOrZero()) {
    return { ok: false, error: 'INVALID_AMOUNT' };
  }

  if (from.id === to.id) {
    return { ok: false, error: 'SAME_ACCOUNT' };
  }

  if (!from.hasSufficientFunds(amount)) {
    return { ok: false, error: 'INSUFFICIENT_FUNDS' };
  }

  from.debit(amount);
  to.credit(amount);

  return { ok: true, transactionId: generateId() };
}
```

La segunda versión tiene más líneas, pero es **más simple** conceptualmente. Cada caso está contemplado, cada camino tiene un resultado definido y cualquier desarrollador puede razonar sobre su comportamiento sin sorpresas. La primera versión parece más corta, pero su complejidad real está oculta en todos los estados inválidos que permite silenciosamente.

## La paradoja de Blaise Pascal

Hay una cita atribuida a Blaise Pascal que Dijkstra habría apreciado: *"He escrito esta carta más larga de lo habitual porque no he tenido tiempo de hacerla más corta."* La brevedad real requiere más esfuerzo que la verbosidad. Y en código, la simplicidad real requiere más pensamiento que la complejidad.

```typescript
// Primera iteración (30 minutos): 150 líneas, 12 ifs anidados
function processOrder(order: Order): Result {
  if (order.status === 'pending') {
    if (order.items.length > 0) {
      if (order.customer.isVerified) {
        // ... 10 niveles más de anidamiento
      }
    }
  }
}

// Después de refactorizar (2 horas): 40 líneas, flujo lineal
function processOrder(order: Order): Result {
  const validation = validateOrder(order);
  if (!validation.ok) return validation;

  const pricing = calculatePricing(order.items);
  const payment = processPayment(order.customer, pricing.total);

  if (!payment.ok) return { ok: false, error: payment.error };

  return confirmOrder(order, payment.transactionId);
}
```

La segunda versión tardó más en escribirse pero es infinitamente más fácil de leer, testear, depurar y modificar. Dijkstra diría que la primera versión no es "sencilla" sino "primitiva". La segunda es el resultado del verdadero trabajo intelectual.

## Las señales de la simpleza disfrazada

¿Cómo distinguir código genuinamente simple de código peligrosamente simplista? Estas son las señales de alarma:

1. **"Funciona en mi máquina":** Si tu código solo funciona con datos perfectos, no es simple; es frágil. El mundo real es caótico: conexiones que fallan, datos corruptos, usuarios que hacen lo inesperado.

2. **Ausencia de manejo de errores:** Si no hay un solo `try-catch` o comprobación de resultado en un flujo que interactúa con I/O, el código no es simple; está incompleto.

3. **Todo en una sola función:** "Es más simple tenerlo todo junto" es la excusa favorita de la simpleza. La verdadera simplicidad emerge de la separación de responsabilidades, no de amontonarlo todo en un sitio.

4. **Optimismo ciego:** Asumir que la red siempre responde, que la base de datos siempre está disponible y que el usuario siempre envía datos correctos no es simplicidad; es negligencia.

## La complejidad esencial vs. la accidental

Dijkstra distinguía implícitamente entre dos tipos de complejidad que Fred Brooks formalizó después: la **esencial** (inherente al problema que resuelves) y la **accidental** (introducida por tus decisiones técnicas).

La simplicidad genuina elimina la complejidad accidental sin negar la esencial. Si tu dominio es complejo (finanzas, medicina, logística), tu código reflejará esa complejidad. Pretender que no existe creando funciones "sencillas" que ignoran casos reales es autoengaño.

Dijkstra pasó su carrera demostrando que la complejidad en el software no es inevitable; es, en gran medida, una elección. Pero la simplicidad que él defendía no era la del atajo, sino la de la disciplina. **Escribir código simple es difícil. Requiere pensar más, cuestionar más y resistir la tentación de "ya lo arreglaremos después". Lo simplista se escribe en minutos y se paga durante años. Lo simple se piensa durante horas y ahorra tiempo durante décadas.**

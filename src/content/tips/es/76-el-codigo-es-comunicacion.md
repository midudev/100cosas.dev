---
id: "76"
title: "El código es comunicación entre humanos"
category: "Legibilidad"
categoryColor: "text-teal-400 bg-teal-900/20"
author: "martin-fowler"
---

**Martin Fowler escribió una vez: "Cualquier tonto puede escribir código que un ordenador entienda. Los buenos programadores escriben código que los humanos entienden."** Ya hablamos de esa idea en el contexto de la legibilidad individual. Pero Fowler va mucho más allá: para él, el código es un **medio de comunicación entre personas**, y cada decisión que tomas al escribirlo es un acto comunicativo.

Fowler no ve el código como instrucciones para la máquina que también leen humanos. Lo ve al revés: el código es una conversación entre desarrolladores que, por cierto, también ejecuta una máquina. Esta inversión de perspectiva cambia radicalmente cómo escribes, organizas y refactorizas tu software.

## El código cuenta la historia de tus decisiones

Cada base de código es un registro histórico. No solo de lo que el software hace, sino de por qué lo hace así. Cuando un nuevo desarrollador se une al equipo, lo primero que hace es leer el código. No lee la wiki (que probablemente esté desactualizada). No lee los tickets de Jira (que probablemente estén cerrados). Lee el código. Y ese código le está contando una historia.

```typescript
// ❌ Este código funciona, pero no comunica nada sobre el negocio
function calc(u: any, d: number) {
  if (d > 30) return u.b * 0.8;
  if (u.t === 'p') return u.b * 0.9;
  return u.b;
}

// ✅ Este código es una conversación sobre las reglas del negocio
const LOYALTY_DISCOUNT = 0.8;
const PREMIUM_DISCOUNT = 0.9;
const LOYALTY_THRESHOLD_DAYS = 30;

function calculateSubscriptionPrice(
  user: SubscriptionUser,
  daysSinceSignup: number
): number {
  if (daysSinceSignup > LOYALTY_THRESHOLD_DAYS) {
    return user.basePrice * LOYALTY_DISCOUNT;
  }

  if (user.tier === 'premium') {
    return user.basePrice * PREMIUM_DISCOUNT;
  }

  return user.basePrice;
}
```

La segunda versión no solo es más legible; es más **comunicativa**. Un desarrollador nuevo puede leer esa función y entender las reglas de descuento del negocio sin hablar con nadie. El código se ha convertido en documentación viva.

## Refactoring: mejorar la conversación

En su libro *Refactoring*, Fowler define refactorizar como "cambiar la estructura interna del software sin alterar su comportamiento externo". Pero la motivación real no es técnica: es comunicativa. Cada refactorización es una forma de decir algo con más claridad.

```typescript
// ❌ Antes del refactoring: una función que "habla a gritos"
async function handlePurchase(cart: Cart, user: User) {
  if (!cart.items.length) throw new Error('Empty cart');
  if (!user.paymentMethod) throw new Error('No payment');
  let total = 0;
  for (const item of cart.items) {
    total += item.price * item.quantity;
    if (item.quantity > item.stock) throw new Error('No stock');
  }
  if (user.credits > 0) total = Math.max(0, total - user.credits);
  const payment = await chargeCard(user.paymentMethod, total);
  if (!payment.success) throw new Error('Payment failed');
  await updateStock(cart.items);
  await sendReceipt(user.email, payment);
  return payment;
}

// ✅ Después del refactoring: una conversación ordenada
async function handlePurchase(cart: Cart, user: User) {
  validateCart(cart);
  validatePaymentMethod(user);
  await verifyStockAvailability(cart.items);

  const total = calculateTotalWithCredits(cart, user.credits);
  const payment = await processPayment(user.paymentMethod, total);

  await updateInventory(cart.items);
  await notifyCustomer(user.email, payment);

  return payment;
}
```

La segunda versión se lee como un índice. Cualquier desarrollador del equipo puede entender el flujo completo de una compra en 10 segundos. Y si necesita detalles, sabe exactamente en qué función buscar.

## El código como vocabulario compartido

Fowler es uno de los grandes defensores del "Ubiquitous Language" que propone Eric Evans en *Domain-Driven Design*: la idea de que el equipo técnico y el equipo de negocio deben usar las mismas palabras. Si el equipo de producto habla de "suscripciones", "renovaciones" y "cancelaciones", el código debe usar exactamente esos términos.

```typescript
// ❌ El código y el negocio hablan idiomas diferentes
function proc(u: any, f: boolean) {
  if (f) { u.s = 0; u.d = new Date(); }
  else { u.s = 1; u.d = null; }
}

// ✅ El código habla el idioma del negocio
function cancelSubscription(subscription: Subscription): void {
  subscription.status = 'cancelled';
  subscription.cancelledAt = new Date();
}

function renewSubscription(subscription: Subscription): void {
  subscription.status = 'active';
  subscription.renewedAt = new Date();
  subscription.nextBillingDate = addMonths(new Date(), 1);
}
```

Cuando el product manager dice "el usuario cancela su suscripción", el desarrollador busca `cancelSubscription` y lo encuentra inmediatamente. No hay traducción mental. No hay ambigüedad. El código **es** la especificación.

## Code reviews: la conversación explícita

Si el código es comunicación pasiva (lo escribes y otros lo leen después), las code reviews son la comunicación activa. Fowler las considera esenciales no como herramienta de control de calidad, sino como **mecanismo de alineación del equipo**. En una code review no solo buscas bugs; verificas que el código comunica lo mismo que el autor pretendía.

Las preguntas que transforman una review mediocre en una conversación productiva son: ¿Entiendo la intención de este cambio sin leer el ticket? ¿Los nombres elegidos reflejan nuestro vocabulario de dominio? ¿Un desarrollador nuevo entendería este flujo?

Programar no es darle instrucciones a una máquina. Es escribir una carta a tus compañeros del futuro: a los que llegarán al equipo dentro de un año, a los que depurarán un bug un viernes a las seis, a tu yo de dentro de tres meses que ya habrá olvidado por qué tomaste esa decisión. **Cada línea de código es una oportunidad de comunicar con claridad o de sembrar confusión. Elige la claridad, siempre.**

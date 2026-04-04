---
id: "30"
title: "El código nunca miente, los comentarios a veces sí"
category: "Documentación"
categoryColor: "text-amber-400 bg-amber-900/20"
author: "ron-jeffries"
---

**Ron Jeffries**, uno de los tres fundadores de Extreme Programming junto a Kent Beck y Ward Cunningham, nos advierte con esta verdad incómoda: **"Code never lies, comments sometimes do."**

Esta frase no es un ataque contra la documentación; es un recordatorio de que el código es la **única fuente de verdad** sobre lo que hace un programa. Los comentarios son opiniones, interpretaciones o, peor aún, recuerdos desactualizados de lo que el código *solía* hacer.

## El ciclo de vida del comentario mentiroso

1. **Día 1:** Un desarrollador escribe una función y añade un comentario explicativo.
2. **Día 30:** Otro desarrollador modifica la función para un nuevo requisito.
3. **Día 30 (minuto 5):** El desarrollador olvida actualizar el comentario.
4. **Día 90:** Un tercer desarrollador lee el comentario, confía en él, y escribe código basándose en información falsa.
5. **Día 91:** Bug en producción.

```typescript
// ❌ El comentario miente
// Calcula el total con IVA del 21%
function calculateTotal(price: number): number {
  return price * 1.10; // Alguien cambió el IVA al 10% pero no el comentario
}

// ✅ El código habla por sí mismo
const VAT_RATE = 0.10;

function calculateTotalWithVat(price: number): number {
  return price * (1 + VAT_RATE);
}
```

## ¿Cuándo son útiles los comentarios?

Ron Jeffries no dice que los comentarios sean siempre malos. Hay casos donde son valiosos:

### 1. Explicar el "por qué", no el "qué"

El código muestra *qué* hace. El comentario puede explicar *por qué* se tomó esa decisión.

```typescript
// ✅ El comentario aporta contexto que el código no puede
function processPayment(amount: number): void {
  // Stripe requiere importes en céntimos, no en euros
  // Ver: https://stripe.com/docs/currencies#zero-decimal
  const amountInCents = Math.round(amount * 100);
  stripe.charge(amountInCents);
}
```

### 2. Advertencias sobre consecuencias no obvias

```typescript
// ✅ Advertencia legítima
// CUIDADO: Esta función borra el caché global.
// Solo llamar durante el proceso de deploy.
function clearGlobalCache(): void {
  globalCache.flush();
}
```

### 3. Referencias a documentación externa

```typescript
// ✅ Referencia útil
// Implementación del algoritmo de Luhn para validación de tarjetas
// RFC: https://en.wikipedia.org/wiki/Luhn_algorithm
function isValidCardNumber(cardNumber: string): boolean {
  // ...
}
```

### 4. APIs públicas

Quien consume tu API no debería leer tu implementación para saber cómo usarla:

```typescript
/**
 * Envía un email de bienvenida al usuario recién registrado.
 *
 * @param userId - ID del usuario (debe existir en la base de datos)
 * @throws {UserNotFoundError} Si el usuario no existe
 * @throws {EmailServiceError} Si falla el envío
 */
async function sendWelcomeEmail(userId: string): Promise<void>
```

## Los comentarios que deberían ser código

La mayoría de los comentarios existen porque el código no es lo suficientemente expresivo. En lugar de comentar, **refactoriza**.

```typescript
// ❌ ANTES: Comentario que compensa código críptico
function calc(a: number, b: number, t: string): number {
  // Si el tipo es 'p', aplicamos descuento premium del 20%
  // Si no, aplicamos descuento estándar del 10%
  if (t === 'p') {
    return a * b * 0.8;
  }
  return a * b * 0.9;
}
```

```typescript
// ✅ DESPUÉS: El código se explica solo
const PREMIUM_DISCOUNT = 0.20;
const STANDARD_DISCOUNT = 0.10;

type CustomerType = 'premium' | 'standard';

function calculateDiscountedPrice(
  quantity: number,
  unitPrice: number,
  customerType: CustomerType
): number {
  const subtotal = quantity * unitPrice;
  const discountRate = customerType === 'premium' 
    ? PREMIUM_DISCOUNT 
    : STANDARD_DISCOUNT;
  
  return subtotal * (1 - discountRate);
}
```

## El test del comentario redundante

Antes de escribir un comentario, pregúntate:

1. ¿Puedo mejorar el nombre de la variable/función para que el comentario sea innecesario?
2. ¿Puedo extraer una función con un nombre descriptivo?
3. ¿Puedo usar una constante con nombre en lugar de un valor mágico?

Si la respuesta a cualquiera de estas es "sí", refactoriza en lugar de comentar. Los tests son documentación ejecutable. Los nombres son documentación inline. La estructura es documentación arquitectónica.

**El mejor comentario es el que no necesitas escribir porque tu código ya lo dice todo.**

---
id: "16"
title: "Cualquier tonto puede escribir código que entienda un ordenador"
category: "Legibilidad"
categoryColor: "text-teal-400 bg-teal-900/20"
author: "martin-fowler"
---

**Martin Fowler**, el autor de *Refactoring* y una de las voces más influyentes en arquitectura de software, nos dejó esta reflexión demoledora: **"Any fool can write code that a computer can understand. Good programmers write code that humans can understand."**

La traducción es directa: cualquier tonto puede escribir código que un ordenador entienda. Los buenos programadores escriben código que los humanos pueden entender.

Esta frase es un golpe directo al ego del programador que se enorgullece de su código "ingenioso" o "compacto". El ordenador no juzga tu código; lo ejecuta ciegamente. Son tus compañeros de equipo, tu futuro yo y los pobres desarrolladores que heredarán tu proyecto quienes sufrirán si priorizas la brevedad sobre la claridad.

## El mito del código "elegante"

Hay una confusión peligrosa entre código *conciso* y código *legible*. Un one-liner de 200 caracteres puede ser técnicamente brillante, pero si tu compañero necesita 20 minutos para descifrarlo, no es elegante; es un obstáculo.

```typescript
// ❌ NIVEL 1: "Ingenioso" (el ordenador lo entiende, tú no)
const r = d.filter(x => x.a && x.b > 5).reduce((p, c) => ({...p, [c.id]: c.v * (c.d ? 1.1 : 1)}), {});

// ✅ NIVEL 2: Legible (los humanos lo entienden)
const TAX_MULTIPLIER = 1.1;

function calculateProductPrices(products: Product[]): Record<string, number> {
  const activeProducts = products.filter(product => product.isActive);
  const expensiveProducts = activeProducts.filter(product => product.price > 5);
  
  const priceMap: Record<string, number> = {};
  
  for (const product of expensiveProducts) {
    const basePrice = product.value;
    const finalPrice = product.hasTax ? basePrice * TAX_MULTIPLIER : basePrice;
    priceMap[product.id] = finalPrice;
  }
  
  return priceMap;
}
```

¿El segundo ejemplo tiene más líneas? Sí. ¿Tardas más en escribirlo? Un poco. ¿Tardas menos en entenderlo, modificarlo y depurarlo? **Infinitamente menos.** Y eso es lo que importa.

## El refactoring como acto de comunicación

El libro *Refactoring* de Fowler no trata solo de mejorar el código; trata de mejorar cómo nos comunicamos a través del código. Cada refactorización (extraer método, renombrar variable, introducir objeto explicativo) es una forma de hacer que la intención del código sea más clara para el siguiente lector.

### Técnicas fundamentales de claridad

1. **Nombres que revelan intención:**

```typescript
// ❌ Críptico
const d = new Date().getTime() - u.c;

// ✅ Claro
const millisecondsSinceUserCreation = Date.now() - user.createdAt;
```

2. **Funciones pequeñas con un solo propósito:**

```typescript
// ❌ Función que hace "todo"
function processOrder(order) {
  // 50 líneas de validación, cálculo de impuestos,
  // envío de emails, actualización de inventario...
}

// ✅ Funciones que se leen como un índice
function processOrder(order: Order) {
  validateOrder(order);
  const total = calculateTotalWithTax(order);
  updateInventory(order.items);
  sendConfirmationEmail(order.customer, total);
}
```

3. **Eliminar comentarios innecesarios escribiendo código autoexplicativo:**

```typescript
// ❌ El comentario compensa el mal código
// Incrementa el contador de intentos fallidos
cnt++;

// ✅ El código se explica solo
failedLoginAttempts++;
```

## El coste económico del código ilegible

Fowler entiende que el software es un activo empresarial. Cada minuto que un desarrollador pasa descifrando código críptico es dinero perdido. Cada bug introducido porque alguien no entendió una función "inteligente" es dinero perdido. Cada desarrollador que abandona un proyecto por frustración es dinero perdido.

Escribir código legible no es un lujo ni un capricho estético; es una **inversión económica** con retorno garantizado.

## La prueba del código legible

Antes de hacer commit, pregúntate:

1. ¿Un desarrollador junior de mi equipo entendería esto sin ayuda?
2. ¿Yo mismo lo entenderé dentro de 6 meses?
3. ¿Puedo leer el código en voz alta y que suene como una frase coherente?

Si la respuesta a alguna de estas preguntas es "no", refactoriza. No para el ordenador. **Para los humanos que vendrán después.**

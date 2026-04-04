---
id: "20"
title: "La simplicidad es prerrequisito de la fiabilidad"
category: "Arquitectura"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "edsger-dijkstra"
---

**Edsger W. Dijkstra**, ganador del Premio Turing y uno de los padres fundadores de la informática, escribió una vez: **"Simplicity is a prerequisite for reliability."**

No es una preferencia estética ni un "nice to have": la simplicidad es una **condición necesaria** para la fiabilidad. Dijkstra dedicó su carrera a demostrarlo. Sus manuscritos escritos a mano (conocidos como EWDs) argumentan una y otra vez que la única forma de crear sistemas que funcionen es reduciendo su complejidad al mínimo indispensable.

## La complejidad: El enemigo silencioso

La complejidad no llega de golpe. Se acumula línea a línea, feature a feature, parche a parche. Un día miras tu código y te das cuenta de que:

- Nadie entiende completamente el sistema.
- Los cambios pequeños causan bugs en lugares inesperados.
- El tiempo de onboarding de nuevos desarrolladores se mide en meses, no en días.
- Hay partes del código que "mejor no tocar".

Eso no es un sistema; es una **bomba de relojería**.

## Simple vs. Fácil: La distinción crucial

Dijkstra nos advertiría que no confundamos "simple" con "fácil". Son conceptos diferentes:

- **Fácil:** Requiere poco esfuerzo ahora.
- **Simple:** Tiene pocas partes interconectadas.

A veces la solución fácil es compleja (añadir un if más, crear otra excepción), mientras que la solución simple requiere más esfuerzo inicial (rediseñar, refactorizar).

```typescript
// ❌ NIVEL 1: "Fácil" pero complejo
// Cada caso especial añade complejidad al sistema
function calculateDiscount(user: User, product: Product, date: Date) {
  let discount = 0;
  
  if (user.isPremium) discount += 10;
  if (user.isPremium && product.category === 'electronics') discount += 5;
  if (date.getMonth() === 11) discount += 15; // Diciembre
  if (user.isPremium && date.getMonth() === 11) discount += 5; // Premium en Dic
  if (product.price > 100) discount = Math.min(discount, 20); // Tope para caros
  if (user.isEmployee) discount = 30; // Empleados siempre 30%
  
  // ¿Qué pasa si es empleado premium en diciembre con producto caro?
  // Nadie lo sabe con certeza.
  
  return discount;
}
```

```typescript
// ✅ NIVEL 2: Simple y predecible
// Separamos las reglas y las hacemos composables
interface DiscountRule {
  name: string;
  calculate: (context: DiscountContext) => number;
}

const discountRules: DiscountRule[] = [
  { name: 'premium', calculate: (ctx) => ctx.user.isPremium ? 10 : 0 },
  { name: 'december', calculate: (ctx) => ctx.date.getMonth() === 11 ? 15 : 0 },
  { name: 'employee', calculate: (ctx) => ctx.user.isEmployee ? 30 : 0 },
];

function calculateDiscount(context: DiscountContext): number {
  // Si es empleado, siempre 30% (regla prioritaria y clara)
  if (context.user.isEmployee) return 30;
  
  // Para el resto, sumamos las reglas aplicables (máx 25%)
  const total = discountRules
    .filter(rule => rule.name !== 'employee')
    .reduce((sum, rule) => sum + rule.calculate(context), 0);
  
  return Math.min(total, 25);
}
```

## Simplicidad no es simpleza

Hay un matiz crucial: la simplicidad genuina es el resultado de un esfuerzo intelectual enorme, mientras que lo simplista es el resultado de la pereza. En código, la simplicidad real requiere más pensamiento que la complejidad.

```typescript
// ❌ SIMPLISTA: parece sencillo, pero ignora la realidad
function transferMoney(from: Account, to: Account, amount: number) {
  from.balance -= amount;
  to.balance += amount;
}
// ¿Y si from.balance < amount? ¿Y si from === to?
// ¿Y si la segunda operación falla después de la primera?
// ¿Y si amount es negativo? Este código "simple" es una fábrica de bugs.

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

La segunda versión tiene más líneas, pero es **más simple** conceptualmente. Cada caso está contemplado y cualquier desarrollador puede razonar sobre su comportamiento sin sorpresas. Si tu código solo funciona con datos perfectos, no es simple; es frágil.

## Complejidad esencial vs. accidental

Existe una distinción clave: la complejidad **esencial** (inherente al problema que resuelves) y la **accidental** (introducida por tus decisiones técnicas). La simplicidad genuina elimina la accidental sin negar la esencial.

Si tu dominio es complejo (finanzas, medicina, logística), tu código reflejará esa complejidad. Pretender que no existe creando funciones "sencillas" que ignoran casos reales es autoengaño. Lo simplista se escribe en minutos y se paga durante años. Lo simple se piensa durante horas y ahorra tiempo durante décadas.

![Diagrama de complejidad esencial vs. accidental: la simplicidad elimina lo accidental sin negar lo esencial](/images/diagrams/tip-20-complexity.svg)

## Los principios de Dijkstra

1. **"La competencia del programador es una función decreciente de la densidad de sentencias goto en sus programas."** Traducido a hoy: la competencia se mide por la claridad del flujo de control, no por su ingenio.

2. **"Los tests pueden demostrar la presencia de bugs, pero nunca su ausencia."** Por eso la simplicidad es tan importante: en un sistema simple, puedes **razonar** sobre su corrección, no solo testearla.

## Cómo cultivar la simplicidad

1. **Di "no" más a menudo:** Cada feature añade complejidad. ¿Realmente la necesitas?

2. **Elimina antes de añadir:** Antes de escribir código nuevo, pregunta si puedes resolver el problema eliminando código existente.

3. **Busca invariantes:** Las verdades que siempre se cumplen en tu sistema simplifican el razonamiento sobre él.

4. **Desconfía de la "flexibilidad":** El código "flexible" suele ser código complejo disfrazado. Construye para el caso de uso real, no para todos los casos posibles.

Dijkstra nos dejó una profesión y un legado de rigor. Honrar ese legado significa resistir la tentación de la complejidad y buscar, en cada decisión, **el camino más simple que funcione**. Porque si no es simple, no será fiable. Y si no es fiable, no sirve.

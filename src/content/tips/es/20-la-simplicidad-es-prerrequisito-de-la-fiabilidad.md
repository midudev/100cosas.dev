---
id: "20"
title: "La simplicidad es prerrequisito de la fiabilidad"
category: "Arquitectura"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "edsger-dijkstra"
---

**Edsger W. Dijkstra**, ganador del Premio Turing y uno de los padres fundadores de la informática, escribió una vez: **"Simplicity is a prerequisite for reliability."**

La simplicidad es prerrequisito de la fiabilidad. No es un "nice to have", no es una preferencia estética: es una **condición necesaria**. Si tu sistema no es simple, no puede ser fiable. Punto.

Dijkstra dedicó su carrera a demostrar que la complejidad es el enemigo mortal del software correcto. Sus manuscritos escritos a mano (conocidos como EWDs) son una mina de sabiduría donde argumenta una y otra vez que la única forma de crear sistemas que funcionen es reduciendo su complejidad al mínimo indispensable.

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

## Los principios de Dijkstra

1. **"La competencia del programador es una función decreciente de la densidad de sentencias goto en sus programas."** Traducido a hoy: la competencia se mide por la claridad del flujo de control, no por su ingenio.

2. **"Los tests pueden demostrar la presencia de bugs, pero nunca su ausencia."** Por eso la simplicidad es tan importante: en un sistema simple, puedes **razonar** sobre su corrección, no solo testearla.

3. **"La pregunta de si los ordenadores pueden pensar es como preguntarse si los submarinos pueden nadar."** Dijkstra nos recuerda que las analogías engañan. La simplicidad nos obliga a ser precisos.

## Cómo cultivar la simplicidad

1. **Di "no" más a menudo:** Cada feature añade complejidad. ¿Realmente la necesitas?

2. **Elimina antes de añadir:** Antes de escribir código nuevo, pregunta si puedes resolver el problema eliminando código existente.

3. **Busca invariantes:** Las verdades que siempre se cumplen en tu sistema simplifican el razonamiento sobre él.

4. **Desconfía de la "flexibilidad":** El código "flexible" suele ser código complejo disfrazado. Construye para el caso de uso real, no para todos los casos posibles.

Dijkstra nos dejó una profesión y un legado de rigor. Honrar ese legado significa resistir la tentación de la complejidad y buscar, en cada decisión, **el camino más simple que funcione**. Porque si no es simple, no será fiable. Y si no es fiable, no sirve.

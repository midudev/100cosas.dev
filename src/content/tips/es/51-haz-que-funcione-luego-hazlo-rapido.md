---
id: "51"
title: "Haz que funcione, hazlo bien, hazlo rápido (en ese orden)"
category: "Proceso"
categoryColor: "text-blue-400 bg-blue-900/20"
author: "kent-beck"
---

Kent Beck, creador de Extreme Programming y pionero de TDD, tiene un mantra que define cómo abordar cualquier problema de programación: **"Make it work, make it right, make it fast"** - y el orden importa.

## Por qué el orden es crucial

La tentación natural es intentar hacer las tres cosas a la vez. Queremos código que funcione, sea elegante y sea rápido desde el primer momento. Pero esto lleva a:

- **Parálisis por análisis**: Pensamos demasiado antes de escribir
- **Optimización prematura**: Optimizamos código que quizás no necesitamos
- **Arquitectura especulativa**: Diseñamos para casos que nunca llegan

![Diagrama del proceso: Funciona, Correcto, Rápido](/images/diagrams/tip-51-make-it-work.svg)

## Fase 1: Make it work

```javascript
// El código más feo que resuelve el problema
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i].type === 'product') {
      total = total + items[i].price;
      if (items[i].discount) {
        total = total - items[i].discount;
      }
    } else if (items[i].type === 'service') {
      total = total + items[i].hourlyRate * items[i].hours;
    }
  }
  if (total > 100) {
    total = total * 0.9; // 10% descuento
  }
  return total;
}

// ¿Feo? Sí. ¿Funciona? SÍ.
// Tenemos un test que pasa. Podemos continuar.
```

Esta fase es sobre **validar que entiendes el problema**. El código feo que funciona vale más que el código elegante que no existe.

## Fase 2: Make it right

```javascript
// Ahora refactorizamos con confianza (tenemos tests)
function calculateTotal(items) {
  const subtotal = items.reduce((sum, item) => {
    return sum + calculateItemPrice(item);
  }, 0);
  
  return applyBulkDiscount(subtotal);
}

function calculateItemPrice(item) {
  switch (item.type) {
    case 'product':
      return item.price - (item.discount || 0);
    case 'service':
      return item.hourlyRate * item.hours;
    default:
      return 0;
  }
}

function applyBulkDiscount(total) {
  const BULK_THRESHOLD = 100;
  const BULK_DISCOUNT = 0.1;
  
  return total > BULK_THRESHOLD 
    ? total * (1 - BULK_DISCOUNT) 
    : total;
}
```

El código es más legible, más testeable, más mantenible. Y **sabemos que sigue funcionando** porque los tests pasan.

## Fase 3: Make it fast (solo si es necesario)

```javascript
// El profiler muestra que esto se llama 1 millón de veces
// AHORA optimizamos, no antes

function calculateTotal(items) {
  let sum = 0;
  const len = items.length;
  
  // Evitamos acceso a propiedades en el loop
  for (let i = 0; i < len; i++) {
    const item = items[i];
    sum += item.type === 'product' 
      ? item.price - (item.discount || 0)
      : item.hourlyRate * item.hours;
  }
  
  return sum > 100 ? sum * 0.9 : sum;
}

// Menos legible, pero 3x más rápido
// Y solo llegamos aquí cuando ERA NECESARIO
```

## TDD: el guardián del proceso

Kent Beck creó TDD precisamente para forzar este orden:

1. **Red:** Escribe un test que falla. Define qué significa "funcionar".
2. **Green:** Escribe el código mínimo para que el test pase. "Make it work".
3. **Refactor:** Mejora el código sin romper el test. "Make it right".

El ciclo Red-Green-Refactor es la implementación práctica de "Make it work, make it right, make it fast" (con la fase "fast" reservada para cuando haya evidencia de que el rendimiento es un problema real).

## Por qué la mayoría salta a la fase 3

La optimización prematura es seductora porque se siente productivo ("estoy haciendo código eficiente"), porque los trucos de rendimiento son técnicamente interesantes, y porque evita la parte difícil: entender el problema real.

Pero el 90% del código nunca necesita la fase 3. Es lo suficientemente rápido tal cual. Kent Beck lo sabe, y por eso insiste en el orden.

## El peligro simétrico: la abstracción prematura

El mismo principio aplica a la limpieza del código. Dan Abramov lo cuenta en su ensayo *"Goodbye, Clean Code"*: siendo junior, encontró código duplicado de un compañero y lo refactorizó en abstracciones elegantes. Se fue a casa orgulloso. Al día siguiente, el compañero senior deshizo todos los cambios. Dan estaba furioso, pero años después entendió: las abstracciones prematuras habían hecho el código más difícil de modificar, no más fácil.

La lección es la misma que el mantra de Beck: el código feo que funciona es infinitamente más valioso que el código elegante que no existe. Envía la versión fea, demuestra que funciona, y luego —solo si merece la pena— refactoriza con la red de seguridad de los tests.

**Primero haz que funcione.** El código más rápido es el que no necesitas escribir porque el feature fue descartado.

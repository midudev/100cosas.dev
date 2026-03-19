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

## Por qué la mayoría salta a la fase 3

La optimización prematura es seductora porque:

1. **Se siente productivo**: "Estoy haciendo código eficiente"
2. **Es técnicamente interesante**: Los trucos de rendimiento son divertidos
3. **Evita la parte difícil**: Entender el problema real

## La realidad

El 90% del código nunca llega a la fase 3. Es lo suficientemente rápido tal cual. Kent Beck lo sabe, y por eso insiste en el orden.

La próxima vez que te encuentres pensando en rendimiento antes de tener algo funcionando, recuerda: el código más rápido es el que no necesitas escribir porque el feature fue descartado. Primero haz que funcione.

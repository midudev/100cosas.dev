---
id: "24"
title: "Hazlo funcionar, hazlo bien, hazlo rápido"
category: "Metodología"
categoryColor: "text-violet-400 bg-violet-900/20"
author: "kent-beck"
---

**Kent Beck**, creador del Test-Driven Development (TDD) y de Extreme Programming, nos legó un mantra que debería guiar cada línea de código que escribimos: **"Make it work, make it right, make it fast"** — en ese orden exacto.

Hazlo funcionar. Hazlo bien. Hazlo rápido.

Este orden no es arbitrario; es una estrategia deliberada para evitar las trampas más comunes del desarrollo de software: la parálisis por análisis, la optimización prematura y la sobreingeniería.

## Las tres fases del código profesional

### Fase 1: Make it work (Hazlo funcionar)

El primer objetivo es que el código **haga lo que tiene que hacer**. Nada más. No importa si es feo, si tiene duplicación o si no es eficiente. Lo único que importa es que los tests pasen (o si no tienes tests, que la funcionalidad esté verificada).

```typescript
// FASE 1: Funciona, pero es feo
function calculateTotal(items: Item[]) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i].type === 'product') {
      total = total + items[i].price;
      if (items[i].taxable) {
        total = total + (items[i].price * 0.21);
      }
    }
    if (items[i].type === 'service') {
      total = total + items[i].price;
      total = total + (items[i].price * 0.21); // Servicios siempre tienen IVA
    }
  }
  return total;
}

// ✅ Funciona. El test pasa. Siguiente fase.
```

### Fase 2: Make it right (Hazlo bien)

Ahora que funciona, es momento de **refactorizar**. Elimina duplicación, mejora nombres, extrae funciones, aplica patrones donde tengan sentido. El objetivo es que el código sea legible, mantenible y que exprese claramente su intención.

```typescript
// FASE 2: Refactorizado y claro
const TAX_RATE = 0.21;

interface Item {
  type: 'product' | 'service';
  price: number;
  taxable?: boolean;
}

function calculateItemTax(item: Item): number {
  const isTaxable = item.type === 'service' || item.taxable;
  return isTaxable ? item.price * TAX_RATE : 0;
}

function calculateTotal(items: Item[]): number {
  return items.reduce((total, item) => {
    return total + item.price + calculateItemTax(item);
  }, 0);
}

// ✅ Legible, mantenible, testeable. Siguiente fase (si es necesaria).
```

### Fase 3: Make it fast (Hazlo rápido)

Solo cuando tienes **evidencia** de que el rendimiento es un problema, optimizas. Esta fase puede que nunca llegue para muchas funciones, y eso está bien. La mayoría del código no necesita ser "rápido"; necesita ser correcto y mantenible.

```typescript
// FASE 3: Optimizado (solo si hay evidencia de que es necesario)
// Por ejemplo, si procesamos millones de items y el profiler
// muestra que esta función es un cuello de botella

function calculateTotalOptimized(items: Item[]): number {
  let total = 0;
  const len = items.length;
  
  for (let i = 0; i < len; i++) {
    const item = items[i];
    const price = item.price;
    total += price;
    
    if (item.type === 'service' || item.taxable) {
      total += price * 0.21; // Inline para evitar llamada a función
    }
  }
  
  return total;
}

// ⚠️ Más rápido, pero menos legible. 
// Solo justificado con datos de rendimiento reales.
```

## Por qué el orden importa

### ❌ Si intentas hacerlo rápido primero

Optimizas código que quizás ni funciona correctamente. Introduces complejidad innecesaria. Pierdes tiempo en micro-optimizaciones que no importan.

### ❌ Si intentas hacerlo bien primero

Caes en la parálisis por análisis. Diseñas abstracciones para casos que no existen. Nunca llegas a validar si tu solución resuelve el problema real.

### ✅ Si sigues el orden correcto

1. **Validas rápido:** Descubres si tu enfoque es viable antes de invertir en pulirlo.
2. **Refactorizas con seguridad:** Los tests de la fase 1 te protegen mientras mejoras el código.
3. **Optimizas con datos:** Solo tocas el rendimiento cuando tienes métricas que lo justifiquen.

## TDD: El guardián del proceso

Kent Beck creó TDD precisamente para forzar este orden:

1. **Red:** Escribe un test que falla. Define qué significa "funcionar".
2. **Green:** Escribe el código mínimo para que el test pase. "Make it work".
3. **Refactor:** Mejora el código sin romper el test. "Make it right".

El ciclo Red-Green-Refactor es la implementación práctica de "Make it work, make it right, make it fast" (con la fase "fast" reservada para cuando haya evidencia).

## La trampa del perfeccionismo

Muchos desarrolladores se saltan la fase 1 porque les da vergüenza escribir código "feo". Pero el código feo que funciona es infinitamente más valioso que el código hermoso que no existe.

Como dice Kent Beck: *"I'm not a great programmer; I'm just a good programmer with great habits."* (No soy un gran programador; soy un buen programador con grandes hábitos.)

El hábito de seguir este orden —funcionar, mejorar, optimizar— es lo que separa a los profesionales de los aficionados. **Primero resuelve el problema. Luego hazlo bonito. Y solo al final, si es necesario, hazlo rápido.**

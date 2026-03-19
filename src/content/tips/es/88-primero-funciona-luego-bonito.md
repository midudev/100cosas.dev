---
id: "88"
title: "Primero que funcione, luego que sea bonito"
category: "Proceso"
categoryColor: "text-blue-400 bg-blue-900/20"
author: "dan-abramov"
---

**El perfeccionismo es el enemigo más disfrazado de la productividad.** Dan Abramov, co-creador de Redux y miembro del equipo de React, escribió un ensayo que resonó en toda la comunidad: *"Goodbye, Clean Code"*. En él confesaba algo que muchos desarrolladores sienten pero pocos admiten: la obsesión por el código bonito puede hacer más daño que bien.

Abramov cuenta que, siendo desarrollador junior, encontró código duplicado de un compañero y lo refactorizó en abstracciones elegantes. Se fue a casa orgulloso. Al día siguiente, su compañero senior deshizo todos los cambios. Dan estaba furioso, pero años después entendió: las abstracciones prematuras habían hecho el código más difícil de modificar, no más fácil. El código "feo" era más adaptable.

## La trampa de la primera versión perfecta

Cuando intentas que tu primera versión sea elegante, ocurren varias cosas:

1. **Tardas el triple**: Optimizas antes de saber si funciona
2. **Creas abstracciones prematuras**: Generalizas sin saber qué va a cambiar
3. **Te frustras**: Nada sale "perfecto" a la primera, y eso te paraliza
4. **No envías**: El código bonito en tu rama local no aporta nada a nadie

```javascript
// ❌ Intentar que sea perfecto desde el principio
// (Llevas 3 horas y aún no funciona)
const createOptimizedDataPipeline = (config) => {
  const memoizedTransform = memoize(
    compose(
      validateSchema(config.schema),
      normalizeEntities,
      deduplicateByKey(config.primaryKey),
      applyTransformations(config.transforms)
    )
  );
  return createBatchProcessor(memoizedTransform, config.batchSize);
};

// ✅ Primero que funcione (30 minutos)
function processData(items) {
  const results = [];
  for (const item of items) {
    if (isValid(item)) {
      results.push(transform(item));
    }
  }
  return results;
}
```

La segunda versión no es elegante. No usa composición funcional ni memoización. Pero **funciona**, y puedes iterar sobre ella con confianza.

## El proceso real de escribir código

Abramov describe el proceso real —no el idealizado— de escribir buen código:

```markdown
Fase 1: Haz que funcione
  → Código feo, variables mal nombradas, duplicación
  → Pero los tests pasan y el comportamiento es correcto

Fase 2: Haz que sea correcto
  → Añade edge cases, manejo de errores
  → Los tests cubren los caminos importantes

Fase 3: Haz que sea bonito (si merece la pena)
  → Renombra, extrae funciones, elimina duplicación
  → Los tests te dan confianza para refactorizar

Fase 4: Haz que sea rápido (solo si es necesario)
  → Profiler primero, optimiza después
  → Los tests verifican que no rompiste nada
```

El orden importa. Cada fase se apoya en la anterior. Sin la fase 1, no hay nada sobre lo que trabajar. Sin tests, la fase 3 es peligrosa.

## "Goodbye, Clean Code"

En su ensayo, Abramov cuestiona una creencia fundamental: que el código "limpio" y DRY es siempre mejor. Su argumento:

```javascript
// Código "sucio" pero flexible
function PriceTag({ product }) {
  if (product.type === 'digital') {
    return <span>{product.price}€</span>;
  }
  if (product.type === 'physical') {
    return <span>{product.price}€ + {product.shippingCost}€ envío</span>;
  }
  if (product.type === 'subscription') {
    return <span>{product.price}€/mes</span>;
  }
}
```

Un purista del clean code extraería la lógica en un patrón Strategy, crearía una jerarquía de clases, eliminaría los `if`. Pero Dan pregunta: ¿y si la semana que viene el equipo de producto pide que los precios de suscripción se muestren completamente diferente? Con el código "feo", solo tocas un `if`. Con la abstracción elegante, tienes que entender y modificar toda la jerarquía.

## El valor del código que puedes borrar

El código feo tiene una virtud que el código bonito suele perder: **es fácil de borrar**. Cuando no has invertido horas en crear una abstracción perfecta, no tienes apego emocional. Puedes tirarlo y empezar de nuevo sin dolor.

Abramov lo dice así: *"Clean code is not a goal. It's a tool. And like any tool, it can be misused."*

El código feo que funciona es infinitamente más valioso que el código elegante que no existe. Envía la versión fea, demuestra que funciona, y luego —solo si merece la pena— refactoriza con la red de seguridad de los tests. El perfeccionismo no te hace mejor programador; te hace más lento. Y en esta industria, el código que no se envía es el que menos valor tiene.

---
id: "02"
title: "El tipo correcto elimina bugs antes de existir"
category: "Tipado"
categoryColor: "text-sky-400 bg-sky-900/20"
author: "anders-hejlsberg"
---

Durante décadas, la industria del software se debatió entre la agilidad de los lenguajes dinámicos y la seguridad de los lenguajes estáticos. Sin embargo, gracias al trabajo de ingenieros como **Anders Hejlsberg** (arquitecto de C# y TypeScript), hoy entendemos que un sistema de tipos moderno no es una cadena que nos frena, sino un copiloto que nos guía.

La premisa es radical pero efectiva: **si el sistema de tipos es lo suficientemente rico, muchos de los errores que normalmente encontraríamos en tiempo de ejecución se vuelven físicamente imposibles de escribir.**

## Documentación ejecutable

El mayor problema de la documentación tradicional (comentarios, diagramas, archivos README) es que **miente**. Con el tiempo, el código evoluciona y la documentación se queda atrás. Los tipos, sin embargo, son documentación que el compilador verifica en cada pulsación de tecla.

Cuando defines un tipo, no solo estás diciendo "esto es un número"; estás comunicando a tus compañeros (y a tu futuro yo) cuáles son los límites de ese dato y qué operaciones son válidas sobre él.

## Haz que lo imposible sea inexpresable

Esta es la mentalidad que separa a un desarrollador junior de uno senior. En lugar de llenar tu código de validaciones `if (data === null)` o `try-catch`, debes diseñar tus estructuras de datos de modo que los estados inválidos no puedan existir.

Si tu aplicación tiene un usuario que puede ser "Anónimo" o "Registrado", no uses un booleano `isRegistered` y campos opcionales. Usa una **Unión Discriminada**. De este modo, el compilador te obligará a manejar cada caso y te impedirá acceder al email de un usuario que todavía no se ha registrado.

## El poder del tipado avanzado

Observa cómo pasamos de un código que "esperamos que funcione" a uno que "garantizamos que funciona".

```typescript
// ❌ NIVEL 1: El peligro de la ambigüedad
// ¿Qué pasa si el estado es 'WAITING'? ¿Y si enviamos un id vacío?
interface Order {
  id: string;
  status: string; // 'pending', 'shipped', 'delivered'...
}

// ✅ NIVEL 2: Tipado nominal y Uniones
// Ahora el compilador sabe exactamente qué valores son válidos.
type OrderStatus = 'pending' | 'shipped' | 'delivered';

// 🔥 NIVEL 3: Haciendo lo imposible inexpresable
// Diseñamos estados que solo contienen los datos que necesitan.
interface PendingOrder {
  status: 'pending';
  createdAt: Date;
}

interface ShippedOrder {
  status: 'shipped';
  shippedAt: Date;
  trackingId: string;
}

type Order = PendingOrder | ShippedOrder;

function processOrder(order: Order) {
  if (order.status === 'shipped') {
    // Aquí el compilador SABE que existe order.trackingId
    console.log(order.trackingId);
  } else {
    // Aquí order.trackingId daría error de compilación ❌
    // Evitamos un bug de "undefined" antes de que ocurra.
    console.log(order.createdAt);
  }
}
```

El tipado no es burocracia. Es una conversación con el compilador donde tú le explicas las reglas de tu negocio y él se encarga de que nadie las rompa por accidente. Invertir tiempo en diseñar los tipos correctos al principio de una funcionalidad es, probablemente, la forma más barata y efectiva de hacer control de calidad en toda la historia de la informática.

Como dice Anders Hejlsberg: *"Los tipos te dan la confianza necesaria para refactorizar sin miedo"*. Y un desarrollador sin miedo es un desarrollador mucho más creativo y productivo.

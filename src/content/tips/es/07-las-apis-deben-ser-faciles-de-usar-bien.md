---
id: "07"
title: "Las APIs deben ser fáciles de usar correctamente y difíciles de usar mal"
category: "Arquitectura"
categoryColor: "text-purple-400 bg-purple-900/20"
author: "joshua-bloch"
---

Joshua Bloch, arquitecto jefe de Java en Google y autor de *Effective Java*, dio una charla que se convirtió en referencia obligada del diseño de software: *How to Design a Good API and Why it Matters*. Su principio rector es tan simple como difícil de implementar: **"Las APIs deben ser fáciles de usar y difíciles de usar mal"**.

Este principio va mucho más allá de las APIs REST. Se aplica a cualquier interfaz que otro desarrollador tenga que usar: funciones, clases, componentes, módulos, CLIs. Cada vez que escribes código que otro va a consumir, estás diseñando una API. Y la calidad de esa API determina si tus usuarios (otros desarrolladores) caerán en el **pit of success** (el pozo del éxito) o en el pozo de los bugs.

## El pozo del éxito

El concepto es brillante en su simplicidad: un buen diseño hace que **el camino correcto sea el más fácil**. No necesitas leer documentación de 50 páginas para usarlo bien. El uso correcto es el uso obvio. Y el uso incorrecto debería ser difícil, idealmente imposible.

Piénsalo así: si tu API permite que alguien pase los argumentos en el orden equivocado y compile sin errores, tu API tiene un defecto de diseño.

## No hagas al usuario hacer lo que el módulo podría hacer

Bloch insiste: si puedes hacer algo por el usuario de tu API, hazlo. No le obligues a recordar pasos, a inicializar cosas manualmente ni a llamar métodos en un orden específico.

```typescript
// ❌ La API que obliga al usuario a hacer trabajo extra
class ImageProcessor {
  private initialized = false;

  init(): void {
    this.initialized = true;
  }

  process(image: Buffer): Buffer {
    if (!this.initialized) {
      throw new Error('Must call init() first');
    }
    return this.applyFilters(image);
  }

  private applyFilters(image: Buffer): Buffer {
    return image;
  }
}

// El usuario DEBE recordar llamar init() antes de process()
const processor = new ImageProcessor();
processor.init();
processor.process(myImage);
```

```typescript
// ✅ La API que hace el trabajo por el usuario
class ImageProcessor {
  process(image: Buffer): Buffer {
    return this.applyFilters(image);
  }

  private applyFilters(image: Buffer): Buffer {
    return image;
  }
}

// Funciona directamente. No hay paso que olvidar.
const processor = new ImageProcessor();
processor.process(myImage);
```

Si `init()` es necesario internamente, que se llame automáticamente. El usuario no debería saber ni preocuparse por los detalles de inicialización.

## Haz que los estados ilegales sean irrepresentables

Esta es quizás la técnica más poderosa del diseño de APIs: usar el sistema de tipos para que **sea imposible construir datos inválidos**. Considera un sistema de pedidos donde el estado determina qué campos tienen sentido:

```typescript
// ❌ Estados inconsistentes son posibles
interface Order {
  status: 'draft' | 'paid' | 'shipped';
  paidAt?: Date;
  shippedAt?: Date;
  trackingNumber?: string;
}

// Nada impide crear: { status: 'draft', shippedAt: new Date() }
// Un pedido borrador con fecha de envío no tiene sentido.
```

```typescript
// ✅ Uniones discriminadas: cada estado solo tiene los campos que le corresponden
type Order =
  | { status: 'draft' }
  | { status: 'paid'; paidAt: Date }
  | { status: 'shipped'; paidAt: Date; shippedAt: Date; trackingNumber: string };

// Es IMPOSIBLE crear un pedido 'draft' con trackingNumber.
// El compilador te protege de ti mismo.
```

## El patrón Builder: claridad en la configuración

Cuando un objeto tiene muchos parámetros opcionales, un constructor largo se convierte en una trampa de legibilidad:

```typescript
// ❌ ¿Qué significa cada argumento? Imposible saberlo sin leer la firma.
const server = new Server(8080, '0.0.0.0', true, false, true, 30000);

// ✅ Builder pattern: cada paso es explícito y autodocumentado
const server = Server.create()
  .port(8080)
  .host('0.0.0.0')
  .enableSSL()
  .enableCORS()
  .timeout(30_000)
  .build();
```

Con el Builder, cada parámetro tiene nombre y es imposible confundir el orden. Si un parámetro es obligatorio, `build()` puede validarlo en tiempo de ejecución — o mejor aún, el sistema de tipos puede exigirlo en compilación.

## La regla de Bloch en una frase

Cada decisión de diseño de API se reduce a esta pregunta: **¿qué pasa si el usuario hace lo incorrecto?** Si la respuesta es "compila y falla silenciosamente en producción", tu diseño necesita mejorar. Si la respuesta es "lanza un error claro e inmediato", vas por buen camino. Y si la respuesta es "no puede, el sistema de tipos no se lo permite", estás en el pozo del éxito.

Diseñar buenas APIs es un acto de empatía. Es ponerte en los zapatos del desarrollador que va a usar tu código a las 11 de la noche, cansado, con prisa, sin leer la documentación. Como enseñó Bloch, **tu API debería guiarle al éxito incluso en esas condiciones**.

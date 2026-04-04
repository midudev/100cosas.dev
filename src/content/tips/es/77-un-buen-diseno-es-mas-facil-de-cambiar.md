---
id: "77"
title: "Un buen diseño es más fácil de cambiar"
category: "Arquitectura"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "dave-thomas"
---

Dave Thomas, co-autor de *The Pragmatic Programmer*, reformuló en la edición del 20 aniversario algo que llevaba décadas incomodándole: todos hablamos de "buen diseño", pero nadie tenía una definición operativa. Su respuesta fue brutal en su simplicidad: **"Un buen diseño es más fácil de cambiar que un mal diseño. Eso es todo. Esa es la definición."**

## ETC: el meta-principio

ETC — *Easy To Change* — no es un principio más. Es **el principio que explica todos los demás**. Cada regla de diseño que has aprendido existe porque hace que el código sea más fácil de cambiar:

```markdown
Principio                  | Por qué funciona (ETC)
-----------------------------------------------------------------
SRP (Responsabilidad Única)| Cada clase tiene una sola razón para cambiar
DIP (Inversión de Depend.) | Dependes de abstracciones, no de detalles concretos
DRY (No te repitas)        | Cambias las cosas en un solo lugar
Desacoplamiento            | Cambiar un módulo no rompe otros
Cohesión alta              | Las cosas que cambian juntas, viven juntas
```

Si alguna vez te cuesta decidir entre dos enfoques de diseño, **pregúntate cuál de los dos será más fácil de cambiar después**. Es el filtro universal.

![Diagrama ETC: el meta-principio que explica SRP, DIP, DRY, OCP y LSP](/images/diagrams/tip-77-etc-principle.svg)

## Acoplamiento: el enemigo del cambio

Imagina un `PaymentService` que instancia directamente Stripe, calcula impuestos con un literal `0.21`, y ejecuta SQL crudo para actualizar el estado del pedido. Todo en una sola función. ¿Qué pasa cuando necesitas cambiar a otro proveedor de pagos? ¿Cuando cambia la tasa de IVA? ¿Cuando migras la base de datos? Cada cambio requiere tocar esta función y rezar para no romper nada.

```typescript
// ✅ Desacoplado: cada pieza cambia independientemente
interface PaymentGateway {
  charge(amount: number, currency: string, token: string): Promise<string>;
}

class PaymentService {
  constructor(
    private gateway: PaymentGateway,
    private taxCalculator: TaxCalculator,
    private orderRepository: OrderRepository
  ) {}

  async processPayment(order: Order) {
    const subtotal = order.calculateSubtotal();
    const total = this.taxCalculator.apply(subtotal);
    const transactionId = await this.gateway.charge(
      total, 'eur', order.paymentToken
    );
    await this.orderRepository.markAsPaid(order.id, transactionId);
  }
}
```

Ahora cambiar de Stripe a PayPal es implementar una interfaz. Cambiar la tasa de impuestos es tocar `TaxCalculator`. Migrar la base de datos es modificar `OrderRepository`. Cada cambio es **quirúrgico** y no afecta a los demás.

## Feature flags: cambiar comportamiento sin cambiar código

Las feature flags son ETC llevado al extremo: cambiar el comportamiento de producción sin tocar código. Un mapa de flags con porcentajes de rollout permite activar un nuevo flujo de checkout solo para el 25% de usuarios, y si algo sale mal, cambias un flag y vuelves al comportamiento anterior. Sin deploys de emergencia, sin rollbacks, sin drama.

```typescript
async function checkout(cart: Cart, userId: string) {
  if (isFeatureEnabled('newCheckout', userId)) {
    return newCheckoutFlow(cart);
  }
  return legacyCheckoutFlow(cart);
}
```

## Strategy Pattern: comportamiento intercambiable

Imagina una función `exportReport` con un `if/else` para cada formato: PDF, CSV, Excel… Cada formato nuevo añade más líneas al mismo bloque. El Strategy Pattern invierte esa estructura:

```typescript
interface ReportExporter {
  export(data: ReportData): Buffer;
}

const exporters: Record<string, ReportExporter> = {
  pdf: new PdfExporter(),
  csv: new CsvExporter()
};

function exportReport(data: ReportData, format: string) {
  const exporter = exporters[format];
  if (!exporter) throw new Error(`Formato no soportado: ${format}`);
  return exporter.export(data);
}
```

Añadir un nuevo formato es crear una clase que implemente `ReportExporter` y registrarla en el mapa. El resto del sistema ni se entera. Eso es ETC en acción.

## Las cosas que cambian juntas deben vivir juntas

```
❌ Organización por tipo (controllers/, models/, services/)
   → Cambiar "usuarios" requiere tocar tres carpetas distintas

✅ Organización por dominio:
  user/
    controller.ts, model.ts, service.ts, user.test.ts
  product/
    controller.ts, model.ts, service.ts, product.test.ts
```

Cuando necesitas cambiar algo del módulo de usuarios, todo está en una carpeta. No saltas entre tres directorios buscando las piezas. La colocación reduce la fricción del cambio.

## La pregunta antes de cada decisión

Dave Thomas propone convertir ETC en un hábito diario. Antes de cada decisión de diseño, hazte una sola pregunta: *"¿Cuál de estas opciones hace que el código sea más fácil de cambiar en el futuro?"*. Y cuando no sabes qué va a cambiar —que es lo normal— favorece la opción más reversible, la que te deje más puertas abiertas.

No se trata de predecir el futuro. Se trata de **no cerrarte puertas**. Cada decisión irreversible es un riesgo. Cada decisión fácil de revertir es una opción que conservas.

Dave Thomas y Andy Hunt lo resumen así: el software se llama *soft* por algo. Está diseñado para ser maleable, para adaptarse, para cambiar. Si tu diseño se resiste al cambio, no es un buen diseño, por muchos patrones que aplique. El software que no se puede modificar es software muerto, sin importar lo elegante que sea.

La próxima vez que debatas si usar herencia o composición, si extraer una interfaz o mantenerlo simple, si crear una abstracción o repetir código, aplica el filtro ETC. La respuesta suele ser sorprendentemente clara.

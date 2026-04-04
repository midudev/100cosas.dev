---
id: "06"
title: "El código legacy es código sin tests"
category: "Artesanía"
categoryColor: "text-emerald-400 bg-emerald-900/20"
author: "michael-feathers"
---

Michael Feathers, autor de *Working Effectively with Legacy Code*, redefinió para siempre lo que significa "código legacy" con una sola frase: **"Para mí, código legacy es simplemente código sin tests"**. No importa si fue escrito ayer o hace diez años. No importa si usa tecnología moderna o antigua. Si no tiene tests, es legacy.

Esta redefinición fue un terremoto. De repente, ese microservicio en Go que tu equipo escribió el mes pasado pero nadie testeó ya es código legacy. Y aquel viejo monolito en Java con una suite de tests exhaustiva y bien mantenida... no lo es.

## ¿Por qué los tests definen lo que es legacy?

La razón es profundamente práctica: **el código sin tests es código que da miedo cambiar**. Cada vez que necesitas modificar algo, no tienes ninguna red de seguridad que te diga si has roto algo. Así que o bien no lo tocas (y la deuda crece), o lo cambias rezando (y a veces la producción se cae).

Los tests no son documentación ni formalismo burocrático. Son la diferencia entre cambiar código con confianza y cambiar código con miedo. Y el miedo es lo que convierte un proyecto en un pantano donde nadie quiere entrar.

## El algoritmo de cambio de código legacy

Feathers propone un método sistemático para trabajar con código sin tests. No es glamuroso, pero funciona:

1. **Identifica los puntos de cambio**: ¿Qué parte del código necesitas modificar?
2. **Encuentra los puntos de test**: ¿Dónde puedes observar el comportamiento actual?
3. **Rompe dependencias**: Aísla el código que necesitas testear.
4. **Escribe tests de caracterización**: Tests que documentan lo que el código hace *ahora*, no lo que debería hacer.
5. **Haz los cambios**: Ahora sí, con la red de seguridad en su sitio.

![Diagrama del algoritmo de cambio de código legacy de Feathers](/images/diagrams/tip-06-legacy-change-algorithm.svg)

El orden es crucial. No empiezas cambiando — empiezas **entendiendo y protegiendo**.

## Tests de caracterización: documentar la realidad

Un test de caracterización no verifica que el código sea correcto. Verifica que el código siga haciendo lo que hace ahora. Es una fotografía del comportamiento actual que te avisa si algo cambia.

```typescript
// Imagina esta función legacy sin documentación ni tests
function calculateDiscount(price: number, customerType: string): number {
  if (customerType === 'vip') {
    return price * 0.8;
  } else if (customerType === 'regular' && price > 100) {
    return price * 0.95;
  }
  return price;
}
```

```typescript
// ✅ Tests de caracterización: documentamos lo que hace HOY
describe('calculateDiscount (characterization)', () => {
  test('VIP customers get 20% off', () => {
    expect(calculateDiscount(100, 'vip')).toBe(80);
  });

  test('regular customers get 5% off above 100', () => {
    expect(calculateDiscount(200, 'regular')).toBe(190);
  });

  test('regular customers pay full price at 100 or below', () => {
    expect(calculateDiscount(100, 'regular')).toBe(100);
  });

  test('unknown customer types pay full price', () => {
    expect(calculateDiscount(100, 'enterprise')).toBe(100);
  });
});
```

Ahora puedes refactorizar `calculateDiscount` con confianza. Si cambias algo y un test falla, sabes exactamente qué comportamiento se ha alterado.

## Romper dependencias: la técnica del seam

El mayor obstáculo para testear código legacy es que suele estar acoplado a todo: bases de datos, APIs externas, el reloj del sistema, archivos del disco. Feathers introdujo el concepto de **seam** (costura): un punto donde puedes alterar el comportamiento sin modificar el código original.

```typescript
// ❌ Código imposible de testear: acoplado a la base de datos
class OrderProcessor {
  async processOrder(orderId: string) {
    const db = new DatabaseConnection('production-url');
    const order = await db.query(`SELECT * FROM orders WHERE id = '${orderId}'`);
    const total = order.items.reduce((sum, i) => sum + i.price, 0);
    await db.query(`UPDATE orders SET total = ${total} WHERE id = '${orderId}'`);
    return total;
  }
}
```

```typescript
// ✅ Extraer la dependencia para crear un seam testeable
interface OrderRepository {
  findById(id: string): Promise<Order>;
  updateTotal(id: string, total: number): Promise<void>;
}

class OrderProcessor {
  constructor(private repository: OrderRepository) {}

  async processOrder(orderId: string): Promise<number> {
    const order = await this.repository.findById(orderId);
    const total = order.items.reduce((sum, item) => sum + item.price, 0);
    await this.repository.updateTotal(orderId, total);
    return total;
  }
}

// En el test, inyectamos un repositorio falso
const fakeRepo: OrderRepository = {
  findById: async () => ({
    id: '1',
    items: [{ price: 10 }, { price: 20 }]
  }),
  updateTotal: async () => {}
};

const processor = new OrderProcessor(fakeRepo);
const total = await processor.processOrder('1');
expect(total).toBe(30);
```

La lógica de negocio no ha cambiado, pero ahora es testeable. Hemos creado una costura entre el procesador y la base de datos.

## El método sprout: crecer sin contaminar

Cuando necesitas añadir funcionalidad a código legacy, Feathers recomienda el **método sprout** (brote): en lugar de modificar el código existente — arriesgado sin tests —, escribe la nueva funcionalidad en una función o clase separada que sí tenga tests desde el primer momento. Luego, conéctala al código legacy con el mínimo cambio posible. Así el nuevo código nace sano y protegido, mientras el viejo código recibe el mínimo impacto.

## El cambio de mentalidad

La definición de Feathers no es solo técnica — es cultural. Cambia la conversación de "este código es viejo, hay que reescribirlo" a "este código no tiene tests, hay que protegerlo". La reescritura total es casi siempre una fantasía. Lo que funciona es la mejora incremental, protegida por tests, paso a paso.

Cada vez que escribes un test para código existente, estás sacándolo del pantano del legacy. Cada función que proteges es una función que ya no da miedo cambiar. Como demostró Feathers, **la línea entre código legacy y código vivo no es la edad — es la confianza para cambiarlo**.

---
id: "79"
title: "Los tests son la mejor documentación"
category: "Testing"
categoryColor: "text-yellow-400 bg-yellow-900/20"
author: "kent-beck"
---

**Kent Beck, el padre de Extreme Programming y creador de TDD (Test-Driven Development), cambió para siempre la forma en que pensamos sobre los tests con una simple inversión de perspectiva: los tests no son solo verificación; son la forma más fiable de documentar cómo funciona tu software.**

La documentación tradicional tiene un defecto fatal: **miente**. Con el tiempo, el código evoluciona pero los comentarios se quedan atrás, los READMEs se desactualizan y las wikis del equipo reflejan el sistema tal como era hace seis meses. Los tests, en cambio, tienen una propiedad única: si el código cambia y la documentación (el test) no se actualiza, **el test falla**. Es documentación que se auto-verifica.

## Tests que cuentan historias

Beck no ve los tests como una red de seguridad (aunque también lo son). Los ve como **ejemplos ejecutables** de cómo usar el código. Un buen test responde tres preguntas: ¿con qué datos empiezo? ¿Qué acción ejecuto? ¿Qué resultado espero?

```typescript
describe('ShoppingCart', () => {
  it('calculates total with multiple items', () => {
    const cart = new ShoppingCart();
    cart.add({ name: 'Teclado mecánico', price: 89.99 });
    cart.add({ name: 'Ratón ergonómico', price: 45.50 });

    expect(cart.total).toBe(135.49);
  });

  it('applies percentage discount to the total', () => {
    const cart = new ShoppingCart();
    cart.add({ name: 'Monitor 4K', price: 400 });
    cart.applyDiscount({ type: 'percentage', value: 10 });

    expect(cart.total).toBe(360);
  });

  it('does not allow negative totals after discount', () => {
    const cart = new ShoppingCart();
    cart.add({ name: 'Cable USB', price: 5 });
    cart.applyDiscount({ type: 'fixed', value: 20 });

    expect(cart.total).toBe(0);
  });
});
```

Un desarrollador nuevo que lea estos tests entiende en segundos cómo funciona `ShoppingCart`: cómo añadir productos, cómo aplicar descuentos, y qué pasa con los edge cases. No necesita leer la implementación. No necesita buscar en una wiki. Los tests **son** la especificación.

## TDD: diseñar a través de la documentación

Beck inventó TDD no como técnica de testing, sino como técnica de **diseño**. El ciclo Red-Green-Refactor es un diálogo con el código:

1. **Red:** Escribes un test que describe lo que *quieres* que haga el código. Es como escribir la documentación antes de la implementación.
2. **Green:** Escribes el código mínimo para que el test pase. Solo lo necesario.
3. **Refactor:** Mejoras la implementación sin cambiar el comportamiento (los tests te garantizan que no rompes nada).

```typescript
// Paso 1: RED - Escribimos la "documentación" primero
it('parses a price string into cents', () => {
  expect(parsePriceToCents('€12.50')).toBe(1250);
  expect(parsePriceToCents('€0.99')).toBe(99);
  expect(parsePriceToCents('€1,234.56')).toBe(123456);
});

// Paso 2: GREEN - Implementación mínima
function parsePriceToCents(priceString: string): number {
  const cleaned = priceString.replace(/[€,]/g, '');
  return Math.round(parseFloat(cleaned) * 100);
}

// Paso 3: REFACTOR - ¿Puedo mejorar sin romper los tests?
// Los tests me dan la confianza para refactorizar
```

La magia de TDD es que el test, al escribirse primero, te obliga a pensar en la **interfaz pública** antes que en la implementación. ¿Qué nombre tendrá la función? ¿Qué parámetros recibe? ¿Qué devuelve? Estás diseñando la API desde la perspectiva del usuario del código, no del implementador.

## La diferencia entre un test útil y un test inútil

No todos los tests sirven como documentación. Beck distingue entre tests que comunican y tests que solo verifican mecánicamente.

```typescript
// ❌ Test que no documenta nada: solo repite la implementación
it('returns true when value is greater than threshold', () => {
  const result = isAboveThreshold(5, 3);
  expect(result).toBe(true);
});
// ¿Qué es "threshold"? ¿En qué contexto? ¿Por qué importa?

// ✅ Test que cuenta una historia del dominio
it('flags an order as high-value when it exceeds $500', () => {
  const order = createOrder({ items: [
    { name: 'Laptop', price: 599 }
  ]});

  expect(order.isHighValue).toBe(true);
});

it('does not flag orders below the high-value threshold', () => {
  const order = createOrder({ items: [
    { name: 'Funda', price: 29.99 }
  ]});

  expect(order.isHighValue).toBe(false);
});
// Ahora sé qué significa "high value", cuál es el umbral,
// y cómo se usa. Esto es documentación.
```

La regla de Beck es simple: si un desarrollador puede leer el nombre del test y el cuerpo del test sin mirar la implementación, y entiende qué hace el sistema, el test está bien escrito.

## Tests como contrato de equipo

Hay una dimensión social de los tests que Beck enfatiza: los tests son un **contrato entre los miembros del equipo**. Cuando escribes un test, estás diciéndole a tu equipo: "esto es lo que el código promete hacer, y si alguien cambia ese comportamiento, el test lo detectará".

```typescript
describe('User Registration', () => {
  it('requires email and password', () => { /* ... */ });
  it('rejects passwords shorter than 8 characters', () => { /* ... */ });
  it('sends a verification email after registration', () => { /* ... */ });
  it('does not allow duplicate emails', () => { /* ... */ });
  it('hashes the password before storing', () => { /* ... */ });
});
```

Solo leyendo los nombres de estos tests, cualquier miembro del equipo puede entender las reglas de negocio del registro de usuarios. Si un nuevo desarrollador necesita cambiar el registro, estos tests le dicen exactamente qué comportamientos debe preservar. Son el contrato que protege al equipo de romper funcionalidad por accidente.

Kent Beck transformó los tests de una tarea tediosa de "control de calidad" en una herramienta de pensamiento, diseño y comunicación. **Los mejores tests no son los que tienen más cobertura; son los que, leídos en secuencia, cuentan la historia completa de tu sistema como si fuera un libro. Un libro que, a diferencia de cualquier documentación tradicional, se corrige solo cuando la realidad cambia.**

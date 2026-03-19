---
id: "81"
title: "Empieza por el final: escribe primero cómo quieres usar el código"
category: "Proceso"
categoryColor: "text-blue-400 bg-blue-900/20"
author: "kent-beck"
---

**Antes de escribir una sola línea de implementación, escribe el código que la va a usar.** Kent Beck, creador de Extreme Programming y padre del TDD moderno, lleva décadas repitiendo esta idea: *"I'm not a great programmer; I'm just a good programmer with great habits."* Y uno de esos hábitos es diseñar desde el consumidor.

La técnica es engañosamente simple. En lugar de empezar por las entrañas de tu función —la base de datos, el algoritmo, la estructura interna—, empiezas por el código que la llamará. Escribes el uso ideal, como si la implementación ya existiera. Y luego haces que exista.

## El README antes que el código

Beck popularizó lo que muchos llaman *README-driven development*: antes de abrir el editor, describe cómo se usará tu módulo. No es documentación retroactiva; es diseño proactivo.

```markdown
# PaymentProcessor

## Uso

const processor = new PaymentProcessor({ currency: 'EUR' });
const result = await processor.charge(user, { amount: 29.99 });

if (result.succeeded) {
  await sendReceipt(user.email, result.receipt);
}
```

Este README ficticio ya te dice muchas cosas: la API es fluida, el resultado tiene una propiedad `succeeded`, hay un objeto `receipt` listo para enviar. No has escrito nada de implementación, pero ya sabes **qué forma tendrá**.

## Diseño desde el uso vs. desde la implementación

La diferencia entre empezar por el uso y empezar por la implementación es la diferencia entre una API cómoda y una API que parece diseñada por alguien que odia a sus usuarios:

```javascript
// ❌ Diseñado desde la implementación
const db = new Database('postgres://...');
const query = db.createQuery('SELECT * FROM users WHERE email = $1');
query.addParameter(0, email);
query.setFetchMode('single');
const row = await query.execute();
const user = new User(row.id, row.name, row.email, row.created_at);

// ✅ Diseñado desde el uso
const user = await User.findByEmail('dev@example.com');
```

La versión de arriba expone toda la complejidad interna. La de abajo esconde los detalles y ofrece exactamente lo que el consumidor necesita. La primera se diseñó pensando en "¿cómo funciona la base de datos?". La segunda se diseñó pensando en "¿qué necesita quien llame a esto?".

## La conexión con TDD

TDD lleva esta filosofía al extremo. Cuando escribes un test antes que el código, estás literalmente escribiendo el uso antes que la implementación:

```javascript
// El test ES el primer consumidor de tu API
test('calcula el total con descuento', () => {
  const cart = new ShoppingCart();
  cart.add({ name: 'Camiseta', price: 25 });
  cart.add({ name: 'Pantalón', price: 40 });

  cart.applyDiscount('VERANO20');

  expect(cart.total).toBe(52); // 65 * 0.8
});
```

Antes de escribir `ShoppingCart`, ya sabes que necesita `add()`, `applyDiscount()` y una propiedad `total`. El test te obligó a diseñar la interfaz pública. Y si el test resulta incómodo de escribir, es señal de que la API será incómoda de usar.

## Aplícalo en el día a día

No necesitas hacer TDD estricto para beneficiarte de esta idea. Basta con un cambio de mentalidad:

1. Antes de crear una función, escribe tres líneas que la llamen
2. Antes de diseñar una API REST, escribe las llamadas `fetch` que harán los clientes
3. Antes de crear un componente React, escribe el JSX que lo renderizará
4. Antes de diseñar una tabla SQL, escribe las queries que la consultarán

Cada vez que empiezas por la implementación, corres el riesgo de crear algo técnicamente correcto pero humanamente hostil. Cada vez que empiezas por el uso, diseñas algo que encaja naturalmente en el código que lo rodea. Como decía Beck: el mejor diseño no es el más ingenioso, sino el que hace que el código del consumidor sea aburrido de tan obvio.

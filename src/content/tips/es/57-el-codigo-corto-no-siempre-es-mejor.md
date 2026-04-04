---
id: "57"
title: "El código corto no siempre es mejor código"
category: "Legibilidad"
categoryColor: "text-teal-400 bg-teal-900/20"
author: "sandi-metz"
---

Sandi Metz, autora de libros fundamentales sobre diseño orientado a objetos, desafía la obsesión con el código "clever": **"El código se lee muchas más veces de las que se escribe. Optimiza para lectura"**.

## La trampa del one-liner

```javascript
// ❌ "Mira lo corto que es"
const result = data.filter(item => item.value > 5).reduce((a, b) => ({...a, [b.k]: (a[b.k] || []).concat(b)}), {});

// Pregunta: ¿Qué hace esto?
// Respuesta: Nadie sabe sin parar 5 minutos a analizarlo
```

## El mismo código, legible

```javascript
// ✅ Más líneas, infinitamente más claro
function groupActiveItemsByCategory(items) {
  const activeItems = items.filter(item => item.value > 5);

  const groupedByCategory = {};

  for (const item of activeItems) {
    const category = item.category;

    if (!groupedByCategory[category]) {
      groupedByCategory[category] = [];
    }

    groupedByCategory[category].push(item);
  }

  return groupedByCategory;
}
```

El código se entiende en segundos. No en minutos.

## Las reglas de Sandi

Sandi tiene reglas específicas que parecen arbitrarias pero funcionan:

### 1. Clases de máximo 100 líneas

```ruby
# Si tu clase tiene 500 líneas, hace demasiadas cosas
# Divídela en colaboradores más pequeños
```

### 2. Métodos de máximo 5 líneas

```javascript
// ❌ Método de 50 líneas
function processOrder(order) {
  // ... 50 líneas de lógica mezclada
}

// ✅ Métodos pequeños que se llaman entre sí
function processOrder(order) {
  validateOrder(order);
  calculateTotals(order);
  applyDiscounts(order);
  saveOrder(order);
  notifyCustomer(order);
}
```

### 3. Máximo 4 parámetros

```javascript
// ❌ Demasiados parámetros
function createUser(name, email, age, address, phone, role, permissions, active) {
  // ...
}

// ✅ Objeto de opciones
function createUser({ name, email, age, address, phone, role, permissions, active }) {
  // ...
}
```

## "Clever" vs. "Claro"

```javascript
// "Clever" - te hace sentir listo escribiéndolo
const isEven = n => !(n & 1);

// "Claro" - hace que cualquiera lo entienda
function isEven(number) {
  return number % 2 === 0;
}
```

El código clever impresiona en Twitter. El código claro mantiene equipos productivos.

## El test del compañero nuevo

Antes de commitear, pregúntate:

> "¿Entendería esto alguien que acaba de unirse al equipo?"

Si la respuesta es no, probablemente es demasiado clever.

## Cuándo SÍ ser conciso

La brevedad tiene su lugar:

```javascript
// Patterns establecidos que todos conocen
const doubled = numbers.map(n => n * 2);

// Operaciones simples
const sum = (a, b) => a + b;

// Destructuring que clarifica
const { name, email } = user;
```

La diferencia: estos son **idiomáticos**, no **clever**.

Sandi nos recuerda que escribimos código para humanos, no para compiladores. Los compiladores entienden cualquier cosa. Los humanos necesitan claridad. El tiempo que ahorras escribiendo código corto lo pagas multiplicado cuando alguien (incluyendo tu yo del futuro) tiene que entenderlo.

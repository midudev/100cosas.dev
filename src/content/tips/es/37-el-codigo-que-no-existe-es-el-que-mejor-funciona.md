---
id: "37"
title: "El código que no existe es el que mejor funciona"
category: "Artesanía"
categoryColor: "text-emerald-400 bg-emerald-900/20"
author: "carlos-ble"
---

Carlos Blé, autor del primer libro en español sobre TDD y fundador de Lean Mind, lleva más de dos décadas ayudando a equipos a escribir mejor software. Su filosofía se resume en una paradoja aparente: **el mejor código es el que no necesitas escribir**.

## La trampa de la productividad

Medimos a los programadores por líneas de código escritas, funcionalidades entregadas, commits por día. Pero estas métricas ignoran una verdad incómoda: **cada línea de código es un pasivo, no un activo**.

Código que no existe:

- No tiene bugs
- No necesita tests
- No requiere documentación
- No necesita mantenimiento
- No puede volverse legacy

## TDD: el arte de escribir lo justo

El Test-Driven Development no es solo una técnica para evitar bugs. Es una disciplina para **escribir exactamente el código necesario y ni una línea más**:

```javascript
// 1. Escribe un test que falle
test('calcula el IVA correctamente', () => {
  expect(calcularIVA(100)).toBe(21);
});

// 2. Escribe el código mínimo para que pase
function calcularIVA(base) {
  return base * 0.21;
}

// 3. Refactoriza si es necesario (no si es posible)
```

El ciclo Red-Green-Refactor te obliga a preguntarte constantemente: ¿esto es necesario ahora?

## La regla del "no lo vas a necesitar" (YAGNI)

Carlos insiste: *"No construyas para el futuro imaginario. Construye para el presente conocido"*.

```javascript
// ❌ Sobreingeniería anticipada
class UserRepositoryFactoryAbstractSingletonProxy {
  // 500 líneas para "cuando escalemos"
}

// ✅ Lo que realmente necesitas hoy
async function getUser(id) {
  return await db.users.findById(id);
}
```

## Diseño Ágil: emerge de los tests

El buen diseño no se planifica en diagramas UML durante semanas. **Emerge orgánicamente** de escribir tests primero:

1. Los tests te obligan a pensar en la API antes que en la implementación
2. Los tests revelan dependencias innecesarias
3. Los tests documentan el comportamiento esperado

## El código legacy empieza el día uno

> "El código legacy no es código viejo. Es código sin tests"

Esta definición de Michael Feathers, que Carlos ha adoptado y enseñado, cambia la perspectiva: puedes escribir legacy code en tu primer día si no es testeable.

## Refactoring: el arte de borrar

Los mejores refactors no añaden código, **lo eliminan**:

```javascript
// Antes: 47 líneas
function processOrder(order, user, config, options, flags) {
  // Lógica enredada...
}

// Después: el mismo comportamiento en 12 líneas
function processOrder(order) {
  // La simplicidad emerge al eliminar lo innecesario
}
```

## Reflexión final

En una industria obsesionada con construir más, Carlos nos recuerda que el verdadero craftsman sabe cuándo **no** escribir código. La excelencia técnica no está en la complejidad que puedes crear, sino en la simplicidad que puedes mantener.

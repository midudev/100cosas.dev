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

No es una idea nueva. Jeff Atwood lo resumió como **"The best code is no code at all"** y Rich Harris insiste en que **el código es una responsabilidad (liability), no un activo (asset)**. Cada línea que escribes debe ser probada, mantenida y documentada; y, casi inevitablemente, contiene bugs.

Código que no existe:

- No tiene bugs
- No necesita tests
- No requiere documentación
- No necesita mantenimiento
- No puede volverse legacy

Y tiene un coste oculto que se acumula:

| Aspecto | Coste por línea |
|---------|-----------------|
| **Bugs** | Más código = más superficie para errores |
| **Tests** | Más código = más tests necesarios |
| **Documentación** | Más código = más que explicar |
| **Onboarding** | Más código = más que aprender |
| **Refactoring** | Más código = más que cambiar |

![Gráfico que muestra cómo Bugs, Mantenimiento y Tests necesarios aumentan con las líneas de código](/images/diagrams/tip-37-code-liability.svg)

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

## El filtro de las tres preguntas (Jeff Atwood)

Antes de escribir cualquier código nuevo, pásalo por este filtro mental:

1. **¿Realmente necesito esta funcionalidad?** — No construyas "por si acaso". Si nadie la ha pedido, probablemente nadie la necesite.
2. **¿Ya existe una solución?** — Antes de escribir tu propio sistema de validación, ¿has mirado Zod? Antes de implementar autenticación desde cero, ¿conoces Auth.js? Una librería bien mantenida suele ser menor responsabilidad que 500 líneas propias sin testear.
3. **¿Puedo resolver el problema eliminando código?** — A veces la mejor solución es borrar. Una feature que nadie usa, un caso borde que nunca ocurre, una abstracción que complica más de lo que simplifica.

```javascript
// ❌ ANTES: Sistema complejo de permisos (200 líneas)
class PermissionManager {
  // roleHierarchy, permissionCache, inheritanceRules...
  canAccess(user, resource, action) { /* 150 líneas */ }
}

// ✅ DESPUÉS: Resulta que solo hay dos roles
function canAccess(user, resource) {
  if (user.role === 'admin') return true;
  return resource.ownerId === user.id;
}
```

## La compilación como filosofía

Svelte es la demostración técnica de este principio: mueve la responsabilidad del framework al **tiempo de compilación**, de modo que en producción solo queda el código mínimo necesario. El framework literalmente no existe en el cliente. Menos código enviado, menos que puede fallar.

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

En una industria obsesionada con construir más, el verdadero craftsman sabe cuándo **no** escribir código. La excelencia técnica no está en la complejidad que puedes crear, sino en la simplicidad que puedes mantener. Y la única forma de no mantener código es no escribirlo en primer lugar.

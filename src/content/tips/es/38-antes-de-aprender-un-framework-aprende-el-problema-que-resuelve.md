---
id: "38"
title: "Antes de aprender un framework, aprende el problema que resuelve"
category: "Aprendizaje"
categoryColor: "text-violet-400 bg-violet-900/20"
author: "dan-abramov"
---

Dan Abramov, co-creador de Redux y ex-miembro del equipo de React en Meta, es conocido por su capacidad de explicar ideas complejas de forma simple. Uno de sus consejos más valiosos: **no aprendas frameworks, aprende los problemas que resuelven**.

## La trampa del tutorial

Es tentador saltar directamente al tutorial de "Cómo construir X con [Framework del momento]". Pero hay un problema: **aprendes a copiar patrones sin entender por qué existen**.

Cuando llegan los problemas (y siempre llegan), te encuentras:

- Buscando soluciones que no entiendes
- Copiando código de Stack Overflow sin saber qué hace
- Frustrado porque "debería funcionar"

## El camino de Dan

En su blog [overreacted.io](https://overreacted.io/), Dan comparte un enfoque diferente:

### 1. Entiende el problema primero

Antes de aprender React, pregúntate:
- ¿Por qué es difícil mantener el DOM sincronizado con el estado?
- ¿Qué problemas causa manipular el DOM directamente?
- ¿Por qué los frameworks usan un DOM virtual?

### 2. Construye una versión simplificada

```javascript
// Intenta construir un mini-React
function render(element, container) {
  // Tu implementación aquí
  // El proceso te enseñará más que cualquier tutorial
}
```

### 3. Ahora aprende el framework real

Con el contexto del problema, el framework tiene sentido:

```jsx
// Ahora entiendes por qué esto es poderoso
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## Los modelos mentales importan más que la sintaxis

Dan habla constantemente de "modelos mentales" - la forma en que conceptualizamos cómo funciona algo.

**Modelo mental correcto de useEffect:**

> "useEffect te permite sincronizar tu componente con algo externo"

No es "el hook para hacer cosas después del render". Con el modelo correcto, escribes mejor código:

```javascript
// Con modelo mental correcto
useEffect(() => {
  const subscription = subscribe(roomId);
  return () => subscription.unsubscribe();
}, [roomId]);
```

## La documentación es tu amiga

Dan pasó años escribiendo documentación porque entiende algo: **la mejor forma de aprender es a través de explicaciones que abordan el "por qué"**, no solo el "cómo".

La nueva documentación de React ([react.dev](https://react.dev)) es un ejemplo: cada concepto explica el problema antes de la solución.

## Reflexión final

Los frameworks vienen y van. JavaScript vanilla ha sobrevivido a jQuery, Backbone, Angular 1, y sobrevivirá a lo que venga después. Cuando entiendes los problemas fundamentales, aprender nuevas herramientas se vuelve trivial - porque todas resuelven las mismas cosas de formas ligeramente diferentes.

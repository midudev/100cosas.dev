---
id: "04"
title: "Los programas deben escribirse para que los lean las personas"
category: "Fundamentos"
categoryColor: "text-blue-400 bg-blue-900/20"
author: "harold-abelson"
---

En el prefacio de *Structure and Interpretation of Computer Programs* (SICP), considerado uno de los libros más influyentes en la historia de la informática, Harold Abelson y Gerald Jay Sussman escribieron una frase que lleva décadas resonando en la comunidad: **"Los programas deben escribirse para que los lean las personas, y solo incidentalmente para que los ejecuten las máquinas"**.

Abelson, profesor del MIT durante más de 40 años, dedicó su carrera a enseñar que la programación no es simplemente dar instrucciones a un ordenador. Es un acto de **comunicación entre humanos** que usa código como medio de expresión. El ordenador, que ejecuta lo que le pongas delante sin quejarse, es el lector menos exigente. El verdadero desafío es que otro ser humano — o tú mismo dentro de seis meses — entienda lo que quisiste decir.

## La diferencia entre programar e informática

SICP no enseña un lenguaje de programación. Enseña a **pensar**. Abelson siempre insistió en que la informática no trata sobre ordenadores, del mismo modo que la astronomía no trata sobre telescopios. Los lenguajes, los frameworks y las herramientas son instrumentos. Lo que importa es la capacidad de expresar ideas complejas de forma clara a través de abstracciones.

Esta distinción es crucial. Puedes aprender la sintaxis de JavaScript en una semana, pero aprender a expresar soluciones de forma legible y elegante lleva toda una carrera.

## El código como literatura

Si un programa está bien escrito, leerlo debería parecerse a leer un ensayo bien estructurado: tiene una introducción (las declaraciones e imports), un desarrollo (la lógica principal) y una conclusión (el resultado o efecto). Cada función debería contar una pequeña historia coherente.

```typescript
// ❌ El código como puzzle: funciona, pero ¿qué historia cuenta?
function proc(d: number[], t: number): number[] {
  return d.filter(x => {
    const r = x * 0.21;
    const n = x + r;
    return n <= t;
  }).sort((a, b) => (b + b * 0.21) - (a + a * 0.21));
}
```

```typescript
// ✅ El código como prosa: se lee casi como lenguaje natural
const TAX_RATE = 0.21;

function calculatePriceWithTax(price: number): number {
  return price + price * TAX_RATE;
}

function findAffordableProducts(
  prices: number[],
  maxBudget: number
): number[] {
  const isAffordable = (price: number) =>
    calculatePriceWithTax(price) <= maxBudget;

  const byPriceDescending = (a: number, b: number) =>
    calculatePriceWithTax(b) - calculatePriceWithTax(a);

  return prices
    .filter(isAffordable)
    .sort(byPriceDescending);
}
```

Ambas funciones hacen exactamente lo mismo. Pero la segunda se puede leer en voz alta y tiene sentido. Cada nombre revela la intención, cada paso sigue una narrativa lógica. No necesitas descifrar qué hace `proc` con `d`, `t`, `x` y `r` — la segunda versión te lo cuenta directamente.

## Abstracciones que comunican

SICP enseña que las buenas abstracciones son como un buen vocabulario: permiten expresar ideas complejas con precisión. Cuando creas una función llamada `findAffordableProducts`, estás inventando un nuevo "término" que tu equipo puede usar sin necesidad de entender los detalles internos.

```typescript
// ❌ Sin abstracción: el lector debe reconstruir tu intención
const result = users
  .filter(u => u.lastLogin !== null &&
    (Date.now() - new Date(u.lastLogin).getTime()) < 86400000 &&
    u.role !== 'admin')
  .map(u => ({ id: u.id, name: u.name }));
```

```typescript
// ✅ Con abstracciones expresivas: la intención es evidente
const oneDayInMs = 24 * 60 * 60 * 1000;

const wasActiveRecently = (user: User) =>
  user.lastLogin !== null &&
  Date.now() - new Date(user.lastLogin).getTime() < oneDayInMs;

const isRegularUser = (user: User) =>
  user.role !== 'admin';

const toSummary = (user: User) =>
  ({ id: user.id, name: user.name });

const recentActiveUsers = users
  .filter(wasActiveRecently)
  .filter(isRegularUser)
  .map(toSummary);
```

En la segunda versión, el flujo se lee como una frase: "De todos los usuarios, quédate con los que estuvieron activos recientemente, que sean usuarios regulares, y conviértelos en un resumen". El código **cuenta lo que hace**.

## El test de la lectura en voz alta

Una regla práctica que se desprende de la filosofía de Abelson: si no puedes leer tu código en voz alta y que tenga sentido para alguien que no lo escribió, probablemente necesita reescribirse.

1. **Los nombres deben formar frases con sentido**: `if (user.isActive())` se lee como una oración natural. `if (u.a)` no dice nada.
2. **Las funciones deben responder a "¿qué hace esto?"**: Si la respuesta requiere más de una frase, la función hace demasiado.
3. **El flujo debe ser predecible**: El lector no debería necesitar saltar entre archivos para entender un bloque de código.
4. **Los comentarios no deberían ser muletas**: Si necesitas un comentario para explicar qué hace el código, el código no es suficientemente claro.

## Más allá de la sintaxis

Abelson demostró durante décadas en sus clases del MIT que aprender a programar bien es aprender a comunicar bien. Un programa es un texto que será leído decenas, cientos, quizás miles de veces. Será leído bajo presión, a las 2 de la madrugada buscando un bug, por alguien que no lo escribió y que necesita entenderlo rápido.

Escribe para esa persona. Escribe para el ser humano que vendrá después, no para el compilador que lo ejecutará ahora. Como nos enseñó Abelson, **el código es, ante todo, un acto de comunicación humana**. Las máquinas lo ejecutan; las personas lo viven.

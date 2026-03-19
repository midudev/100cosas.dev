---
id: "83"
title: "Cada dependencia es deuda que tendrás que pagar"
category: "Arquitectura"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "dhh"
---

**Cada `npm install` es una firma en un contrato que no has leído.** David Heinemeier Hansson (DHH), creador de Ruby on Rails, ha sido uno de los críticos más vocales de la cultura de las dependencias: *"Every dependency you add is a liability, not an asset."*

DHH construyó Rails con la filosofía de incluir todo lo necesario en el framework. No porque fuera arrogante, sino porque entendía que cada dependencia externa es un punto de fallo fuera de tu control: un mantenedor que abandona el proyecto, una actualización que rompe tu código, o peor, alguien que inyecta código malicioso en una librería que medio internet utiliza.

## El incidente que cambió npm para siempre

El 22 de marzo de 2016, un desarrollador llamado Azer Koçulu despublicó todos sus paquetes de npm por una disputa de nombres. Uno de ellos era **left-pad**, un módulo de 11 líneas que rellenaba strings por la izquierda. Ese día, miles de builds se rompieron en todo el mundo, incluyendo proyectos de Facebook, Spotify y Netflix.

```javascript
// left-pad: las 11 líneas que rompieron internet
function leftPad(str, len, ch) {
  str = String(str);
  ch = ch || ' ';
  let i = len - str.length;
  while (i > 0) {
    str = ch + str;
    i--;
  }
  return str;
}
```

Once líneas. Eso era todo. Miles de proyectos dependían de once líneas que cualquier desarrollador podría haber escrito en dos minutos. El incidente reveló algo incómodo: la industria había externalizado hasta las funciones más triviales.

## Ataques a la cadena de suministro

Desde left-pad, las cosas han empeorado. Los ataques de *supply chain* son ahora una de las amenazas más serias:

- **event-stream (2018)**: Un mantenedor cedió su paquete popular a un desconocido que inyectó código para robar Bitcoin de una wallet específica. 8 millones de descargas semanales comprometidas.
- **ua-parser-js (2021)**: Un paquete con 7 millones de descargas semanales fue secuestrado para instalar mineros de criptomonedas.
- **colors/faker (2022)**: Su propio creador saboteó los paquetes como protesta, rompiendo miles de proyectos que usaban sus librerías.

Cada dependencia que añades amplía tu **superficie de ataque**. No es paranoia; es gestión de riesgo.

## Evalúa antes de instalar

Antes de añadir una dependencia, hazte estas preguntas:

```markdown
1. ¿Puedo hacerlo con la API nativa del lenguaje?
   - fetch() en vez de axios
   - Intl.DateTimeFormat en vez de moment
   - structuredClone() en vez de lodash.cloneDeep
   - Array.prototype.flat() en vez de lodash.flatten

2. ¿Cuánto del paquete voy a usar?
   - Si solo necesitas 1 función de lodash, cópiala

3. ¿Está activamente mantenido?
   - ¿Último commit? ¿Issues abiertos sin respuesta?

4. ¿Cuántas dependencias transitivas trae?
   - npm ls --all | wc -l te dará una sorpresa

5. ¿Tiene alternativas más ligeras?
   - date-fns en vez de moment (tree-shakeable)
   - ky en vez de axios (900B vs 13KB)
```

## El arte de las 20 líneas

A veces la mejor dependencia es la que no instalas:

```javascript
// ❌ npm install is-even (sí, existe y tiene 130K descargas/semana)
const isEven = require('is-even');

// ✅ 1 línea que nadie necesita importar
const isEven = n => n % 2 === 0;
```

```javascript
// ❌ npm install uuid (si solo necesitas IDs únicos simples)
import { v4 as uuid } from 'uuid';

// ✅ API nativa del navegador y Node.js
const id = crypto.randomUUID();
```

No se trata de reinventar la rueda ni de escribir tu propio framework HTTP. Se trata de evaluar honestamente si esa dependencia aporta más valor del que cuesta. Una librería de criptografía, un ORM maduro, un framework de testing: esas son dependencias que justifican su peso. Un paquete para comprobar si un número es par no lo es.

Como dice DHH: la mejor dependencia es la que no tienes. Y las 20 líneas de código que controlas siempre serán más fiables que las 2.000 que no puedes ni auditar.

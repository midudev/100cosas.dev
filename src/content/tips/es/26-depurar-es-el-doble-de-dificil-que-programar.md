---
id: "26"
title: "Depurar es el doble de difícil que escribir el código"
category: "Debugging"
categoryColor: "text-red-400 bg-red-900/20"
author: "brian-kernighan"
---

**Brian Kernighan**, co-autor del legendario libro *"The C Programming Language"* y co-creador de herramientas fundamentales como AWK, escribió una de las advertencias más importantes de nuestra profesión:

> **"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."**

Depurar es el doble de difícil que escribir el código en primer lugar. Por lo tanto, si escribes el código de la forma más inteligente posible, por definición no eres lo suficientemente inteligente como para depurarlo.

Esta observación, aparentemente humorística, esconde una verdad matemática brutal sobre los límites de nuestra capacidad cognitiva.

## La aritmética del ingenio

Supongamos que tu nivel de "inteligencia de programación" es X. Cuando escribes código, usas una porción de X. Cuando depuras ese código, necesitas el **doble** de capacidad mental porque debes:

1. **Entender qué hace el código** (igual que escribirlo).
2. **Entender qué debería hacer** (el requisito original).
3. **Encontrar la discrepancia** entre ambos.

Si escribes código que usa el 100% de tu capacidad (el código más "ingenioso" que puedes crear), necesitarías el 200% de tu capacidad para depurarlo. Pero solo tienes el 100%. **Estás matemáticamente condenado.**

## El código "inteligente" en la práctica

```typescript
// ❌ NIVEL 1: El programador "ingenioso"
// Esto funciona, pero ¿puedes encontrar el bug?
const r = (a: number[]) => a.reduce((p, c, i) =>
  i % 2 ? p : [...p, a.slice(i, i + 2).reduce((x, y) => x + y)], [] as number[]);

// Cuando falle en producción a las 3 AM, buena suerte depurándolo.
```

```typescript
// ✅ NIVEL 2: El programador profesional
// El mismo algoritmo, pero depurable
function sumPairs(numbers: number[]): number[] {
  const result: number[] = [];

  for (let i = 0; i < numbers.length; i += 2) {
    const first = numbers[i];
    const second = numbers[i + 1] ?? 0; // Maneja arrays impares
    const pairSum = first + second;
    result.push(pairSum);
  }

  return result;
}

// Cuando falle, puedo poner un breakpoint en cualquier línea
// y entender exactamente qué está pasando.
```

## Las tres leyes del código depurable

### 1. Escribe código para tu "yo" de las 3 AM

Tu capacidad cognitiva a las 3 de la mañana, con un incidente en producción y el teléfono sonando, es aproximadamente el 30% de tu capacidad normal. Escribe código que puedas entender en ese estado.

### 2. Cada línea debe tener un solo propósito

Si una línea hace múltiples cosas, encontrar cuál de ellas falla es exponencialmente más difícil.

```typescript
// ❌ Una línea, múltiples operaciones
const result = users.filter(u => u.active).map(u => u.email).join(', ');

// ✅ Operaciones separadas, fáciles de inspeccionar
const activeUsers = users.filter(user => user.active);
const emails = activeUsers.map(user => user.email);
const result = emails.join(', ');

// Si el resultado es incorrecto, ¿es el filtro? ¿El map? ¿El join?
// Con la segunda versión, puedes inspeccionar cada paso.
```

### 3. Los nombres son tu primera línea de defensa

Cuando algo falla, lo primero que miras son los nombres. Buenos nombres te guían hacia el problema; malos nombres te confunden.

```typescript
// ❌ ¿Qué significa 'd'? ¿Por qué es negativo?
if (d < 0) throw new Error('Invalid');

// ✅ El nombre explica el contexto
if (daysUntilExpiration < 0) throw new Error('Subscription has expired');
```

## El coste real del código "elegante"

Cada vez que eliges la solución "inteligente" sobre la solución "obvia", estás tomando un préstamo contra tu futuro tiempo de debugging. Y ese préstamo tiene intereses compuestos:

- **Tiempo de comprensión:** Cada desarrollador que toque ese código perderá minutos (u horas) descifrándolo.
- **Bugs latentes:** El código complejo tiene más lugares donde esconderse los errores.
- **Refactorización bloqueada:** Nadie quiere tocar código que no entiende.

## La humildad como estrategia

La cita de Kernighan no es solo técnica; es filosófica. Nos invita a la **humildad**. Por muy bueno que seas, hay un límite a lo que puedes manejar mentalmente. Los mejores programadores no son los que escriben el código más sofisticado, sino los que escriben código que **cualquiera** (incluido su yo agotado del futuro) puede entender y arreglar.

La próxima vez que estés tentado a escribir una solución "elegante" de una sola línea, recuerda las palabras de Kernighan. Si usas toda tu inteligencia para escribir el código, no te quedará nada para arreglarlo cuando falle. **Y siempre falla.**

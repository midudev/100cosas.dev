---
id: "18"
title: "Solo hay dos cosas difíciles en informática"
category: "Fundamentos"
categoryColor: "text-blue-400 bg-blue-900/20"
author: "phil-karlton"
---

**Phil Karlton**, ingeniero de Netscape durante la época dorada de los navegadores, pronunció una frase que se ha convertido en leyenda: **"There are only two hard things in Computer Science: cache invalidation and naming things."**

Solo hay dos cosas difíciles en informática: la invalidación de caché y nombrar las cosas.

Esta cita, aparentemente humorística, esconde una verdad profunda sobre la naturaleza del desarrollo de software. Mientras que la invalidación de caché es un problema técnico complejo (¿cuándo caduca un dato? ¿cómo sincronizas copias distribuidas?), nombrar las cosas es un problema **cognitivo** que afecta a cada línea de código que escribes.

## ¿Por qué es tan difícil nombrar?

Nombrar variables, funciones, clases y módulos parece trivial, pero en realidad es un ejercicio de **compresión semántica**: debes capturar la esencia de lo que algo *hace* o *representa* en unas pocas palabras.

El problema es que:

1. **El lenguaje es ambiguo:** `data`, `info`, `item`, `element`... ¿Qué significan realmente?
2. **El contexto cambia:** Un buen nombre hoy puede ser confuso mañana cuando el código evolucione.
3. **La abstracción es difícil:** Nombrar una función que hace múltiples cosas te obliga a admitir que hace demasiado.

## El coste de los malos nombres

Los nombres pobres tienen consecuencias reales:

```typescript
// ❌ NIVEL 1: Nombres que no dicen nada
function process(d: any[]) {
  const r = [];
  for (const i of d) {
    if (i.f) r.push(i.v * 2);
  }
  return r;
}

// ¿Qué procesa? ¿Qué es 'd'? ¿Qué significa 'f'?
// Cada desarrollador que lea esto perderá tiempo descifrándolo.
```

```typescript
// ✅ NIVEL 2: Nombres que revelan intención
function getDoubledPricesForActiveProducts(products: Product[]) {
  const doubledPrices: number[] = [];

  for (const product of products) {
    if (product.isActive) {
      doubledPrices.push(product.price * 2);
    }
  }

  return doubledPrices;
}

// Ahora cualquiera entiende qué hace esta función
// sin necesidad de leer su implementación.
```

## La regla de oro: El nombre es documentación

Un buen nombre elimina la necesidad de comentarios. Si necesitas un comentario para explicar qué hace una variable o función, probablemente el nombre no sea lo suficientemente bueno.

```typescript
// ❌ El comentario compensa el mal nombre
// Tiempo en milisegundos desde que el usuario se registró
const t = Date.now() - user.createdAt;

// ✅ El nombre es el comentario
const millisecondsSinceRegistration = Date.now() - user.createdAt;
```

## Patrones para nombrar mejor

### 1. Funciones: Verbo + Sustantivo

Las funciones *hacen* cosas. Sus nombres deben reflejarlo.

```typescript
// ❌ Sustantivos vagos
function user(id: string) { ... }
function validation(form: Form) { ... }

// ✅ Verbos claros
function getUserById(id: string) { ... }
function validateForm(form: Form) { ... }
```

### 2. Booleanos: Pregunta sí/no

Los booleanos responden preguntas. Nómbralos como tal.

```typescript
// ❌ Ambiguo
const status = true;
const admin = false;

// ✅ Pregunta clara
const isActive = true;
const hasAdminPrivileges = false;
const canEditPost = true;
```

### 3. Colecciones: Plural

Las listas y arrays contienen múltiples elementos.

```typescript
// ❌ Singular para colección
const user = [user1, user2, user3];

// ✅ Plural claro
const users = [user1, user2, user3];
const activeUserIds = ['1', '2', '3'];
```

## El test del "recién llegado"

Antes de confirmar un nombre, imagina que un desarrollador nuevo en el proyecto lo lee por primera vez. ¿Entenderá qué es sin contexto adicional? Si la respuesta es no, busca un nombre mejor.

Como dijo Phil Karlton (y como confirmará cualquier desarrollador con experiencia), nombrar bien es una de las habilidades más infravaloradas y más valiosas de nuestra profesión. **Un buen nombre no es decoración; es diseño.**

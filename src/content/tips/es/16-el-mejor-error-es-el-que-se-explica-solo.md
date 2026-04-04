---
id: "16"
title: "El mejor error es el que se explica solo"
category: "Legibilidad"
categoryColor: "text-teal-400 bg-teal-900/20"
author: "evan-czaplicki"
---

Evan Czaplicki creó Elm con una obsesión poco común entre diseñadores de lenguajes: **los mensajes de error son una feature de primera clase**. Mientras la mayoría de compiladores tratan los errores como un mal necesario, Elm los trata como la interfaz de usuario más importante del lenguaje.

El resultado habla por sí solo: los mensajes de error de Elm son considerados los mejores de cualquier lenguaje de programación. Y la lección que hay detrás aplica a todo el código que escribas.

## El error más inútil del mundo

Todos hemos visto esto:

```javascript
// ❌ El error que no dice nada
Error: invalid input
```

¿Qué input? ¿Por qué es inválido? ¿Qué se esperaba? Este mensaje te deja exactamente donde empezaste: sin idea de qué hacer.

Compara con lo que Elm hace en su compilador:

```
-- TYPE MISMATCH -----------------------------------------------

The 2nd argument to `viewUser` is not what I expect:

45|   viewUser model user.age
                      ^^^^^^^^
This `age` field is a:

    Int

But `viewUser` needs the 2nd argument to be:

    String

Hint: Try using String.fromInt to convert it!
```

Tres cosas en un solo mensaje: **qué pasó**, **por qué** y **cómo arreglarlo**. Evan lo diseñó así porque entiende algo fundamental: cuando un desarrollador ve un error, está atascado. Tu trabajo es desatascarlo lo más rápido posible.

## Las tres preguntas que todo error debe responder

Un buen mensaje de error es una conversación, no un grito. Debe responder:

1. **¿Qué pasó?** — Describe el problema de forma concreta
2. **¿Por qué pasó?** — Da contexto sobre la causa
3. **¿Cómo lo arreglo?** — Sugiere el siguiente paso

```javascript
// ❌ Solo dice QUÉ (y mal)
throw new Error('Validation failed');

// ❌ Dice qué pero no ayuda
throw new Error('Invalid email');

// ✅ Responde las tres preguntas
throw new ValidationError(
  'El email debe contener un símbolo @. ' +
  'Valor recibido: "john.doe". ' +
  'Ejemplo válido: "john.doe@email.com"'
);
```

La diferencia entre el segundo y el tercer ejemplo son unos pocos caracteres más de código. Pero para quien recibe el error, es la diferencia entre 30 segundos y 30 minutos de debugging.

## Errores con contexto en tu código

No necesitas crear un lenguaje de programación para aplicar esta filosofía. Empieza con tus propias funciones:

```javascript
// ❌ Error genérico que pierde contexto
function getUser(id) {
  const user = db.users.find(u => u.id === id);
  if (!user) {
    throw new Error('Not found');
  }
  return user;
}

// ✅ Error que cuenta la historia completa
function getUser(id) {
  const user = db.users.find(u => u.id === id);
  if (!user) {
    throw new NotFoundError(
      `Usuario con id "${id}" no encontrado. ` +
      `Verifica que el id sea correcto o que el usuario no haya sido eliminado.`
    );
  }
  return user;
}
```

La clave está en **incluir los valores concretos** que causaron el error. No digas "id inválido", di cuál era el id. No digas "tipo incorrecto", di qué tipo se esperaba y qué tipo llegó.

## Errores en APIs: tu documentación más leída

Este principio cobra especial importancia en las APIs. Tus respuestas HTTP de error son, literalmente, la documentación que más van a leer tus consumidores:

```javascript
// ❌ Lo que muchas APIs devuelven
{ "error": "Bad request" }

// ✅ Lo que deberían devolver
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "El campo 'email' no tiene un formato válido",
    "field": "email",
    "received": "john.doe",
    "expected": "Un email válido (ejemplo: john@email.com)",
    "docs": "https://api.example.com/docs/users#create"
  }
}
```

Cada error de API que obliga al consumidor a abrir un ticket de soporte es un fracaso de diseño. Si el mensaje hubiera explicado el problema, ese ticket nunca habría existido. Lo mismo aplica a la validación de formularios: no le digas al usuario "contraseña inválida" y le obligues a adivinar qué falta. Dile exactamente qué requisitos no cumple y cuánto le queda para cumplirlos.

## La regla del "mensaje a las 3 AM"

Evan tiene una forma de pensar sobre esto que es brillante: imagina que recibes este error a las 3 de la madrugada, medio dormido, con un incidente en producción. ¿El mensaje te dice qué hacer o te obliga a investigar durante una hora?

Si tu mensaje de error necesita que alguien lea el código fuente para entenderlo, no es un buen mensaje de error. Es un acertijo.

Los mensajes de error son la documentación más leída que jamás escribirás. Nadie lee tu README cuando todo funciona. Pero **todo el mundo** lee tus errores cuando algo falla. Trátalos con el mismo cariño con el que Evan trata los errores de Elm: como una oportunidad de ayudar, no como un castigo por equivocarse.

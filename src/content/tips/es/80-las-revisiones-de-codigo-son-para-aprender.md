---
id: "80"
title: "Las code reviews son para aprender, no para criticar"
category: "Equipo"
categoryColor: "text-orange-400 bg-orange-900/20"
author: "sarah-drasner"
---

Una sola code review destructiva puede hacer que un desarrollador junior deje de contribuir durante semanas. Una sola review constructiva puede cambiarle la carrera. **Sarah Drasner**, referente en experiencia de desarrollo y liderazgo técnico, lo tiene claro: *"Las code reviews no son para demostrar quién sabe más, sino para que todo el equipo crezca junto"*.

Drasner ha liderado equipos en Netlify, Google y Microsoft, y en todos ellos ha defendido la misma idea: el código que revisamos es un medio, no un fin. El verdadero objetivo de una review es que el autor aprenda, que el revisor entienda, y que el producto final sea mejor que la suma de sus partes.

## El problema del ego disfrazado de exigencia

Todos hemos visto (o sufrido) reviews que parecen más un tribunal que una conversación. Comentarios secos, sin contexto, que señalan errores sin ofrecer alternativas. Este tipo de feedback no solo es inútil, es corrosivo.

Cuando alguien escribe "esto está mal" sin más, el autor no aprende *qué* está mal ni *por qué*. Solo recibe el mensaje de que su trabajo no es suficiente. Y lo peor: deja de arriesgarse a probar soluciones creativas por miedo al juicio.

La diferencia entre una review tóxica y una constructiva no es de contenido, es de intención y forma:

```markdown
❌ "Este código es malo"
✅ "¿Qué te parece si extraemos esta lógica a una función?
    Sería más fácil de testear y reutilizar en el módulo de pagos"

❌ "No uses var"
✅ "Aquí usaría const porque el valor no cambia después de
    la asignación. Así dejamos claro que es inmutable. ¿Qué opinas?"

❌ "Esto no va a funcionar"
✅ "Me preocupa que esto falle cuando el array viene vacío.
    ¿Has podido probar ese caso? Si quieres, lo miramos juntos"
```

La clave está en los detalles: ofrecer una razón, proponer una alternativa y cerrar con una pregunta abierta. Eso transforma un juicio en un diálogo.

## Código que enseña: el arte de sugerir

Las mejores reviews no solo corrigen, enseñan. Mira la diferencia entre señalar un problema y convertirlo en una oportunidad de aprendizaje:

```typescript
// ❌ Review: "Esto es muy verboso. Refactoriza."
function getActiveUsers(users: User[]): User[] {
  const result: User[] = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].isActive === true) {
      result.push(users[i]);
    }
  }
  return result;
}

// ✅ Review: "Podríamos simplificarlo con filter().
// Además, comparar con === true es redundante
// cuando isActive ya es booleano."
function getActiveUsers(users: User[]): User[] {
  return users.filter(user => user.isActive);
}
```

La segunda review no solo sugiere un cambio, explica *por qué* es mejor. El autor sale de esa revisión habiendo aprendido algo que aplicará en todo su código futuro.

## Cómo ser un buen revisor (y un buen autor)

El proceso tiene dos lados, y ambos requieren habilidades concretas:

**Como revisor:**

1. **Empieza por lo positivo.** Antes de señalar mejoras, reconoce lo que está bien hecho. "Me gusta cómo has separado la lógica de validación" cuesta cinco segundos y cambia el tono de toda la conversación.
2. **Haz preguntas, no afirmaciones.** "¿Has considerado usar un Map aquí?" invita a pensar. "Usa un Map" impone sin enseñar.
3. **Distingue lo crítico de lo cosmético.** Marca claramente qué es un blocker, qué es una sugerencia y qué es una preferencia personal. No todo tiene la misma urgencia.
4. **Ofrece contexto.** Enlaza documentación, PRs anteriores o ejemplos del propio codebase. Una sugerencia con referencia vale diez veces más.

**Como autor:**

1. **Escribe descripciones claras en tus PRs.** Explica el *qué* y el *por qué*. Si el revisor tiene que adivinar tu intención, la review será peor.
2. **No tomes el feedback como algo personal.** El código no eres tú. Separar tu identidad de tus líneas de código es una de las habilidades más difíciles y más valiosas de esta profesión.
3. **Agradece las buenas reviews.** Cuando alguien invierte tiempo en darte feedback útil, reconócelo. Eso refuerza la cultura positiva.

## El checklist invisible

Las mejores reviews van más allá de la sintaxis. Antes de aprobar o comentar, hazte estas preguntas:

1. **¿El código hace lo que el ticket pide?** No lo que yo haría, sino lo que se necesita.
2. **¿Podría entender esto alguien nuevo en el equipo?** Si la respuesta es no, hay que simplificar.
3. **¿Hay tests que cubran los casos importantes?** No el 100% de cobertura, sino los caminos críticos.
4. **¿He aprendido algo leyendo este código?** Si la respuesta es sí, dilo. Eso motiva más que cualquier aprobación automática.

Las mejores code reviews que he visto en mi carrera no eran las más exigentes ni las más permisivas. Eran conversaciones donde dos personas intentaban, juntas, escribir el mejor código posible. Donde un "no entiendo esta parte" no era un insulto, sino una oportunidad. Donde el revisor salía habiendo aprendido tanto como el autor. Esa es la cultura que transforma equipos buenos en equipos extraordinarios.

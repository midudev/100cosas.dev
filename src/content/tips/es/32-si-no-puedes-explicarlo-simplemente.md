---
id: "32"
title: "Si no puedes explicarlo de forma simple, no lo entiendes"
category: "Simplicidad"
categoryColor: "text-pink-400 bg-pink-900/20"
author: "richard-feynman"
---

**Richard Feynman**, Premio Nobel de Física y uno de los científicos más brillantes del siglo XX, tenía un principio que aplicaba a todo su trabajo: **"If you can't explain it simply, you don't understand it well enough."**

Si no puedes explicarlo de forma simple, es que no lo entiendes lo suficientemente bien.

Aunque Feynman no era programador, esta máxima se ha convertido en un pilar del desarrollo de software. La capacidad de reducir problemas complejos a explicaciones simples no es solo una habilidad de comunicación; es una **señal de dominio profundo**.

## La Técnica Feynman aplicada al código

Feynman desarrolló un método de aprendizaje que lleva su nombre. Aplicado al desarrollo de software, funciona así:

1. **Elige un concepto:** Por ejemplo, "¿Cómo funciona el event loop de JavaScript?"
2. **Explícalo como si hablaras con un niño de 12 años:** Sin jerga, sin asumir conocimientos previos.
3. **Identifica los huecos:** Donde te trabas o usas jerga técnica, ahí no entiendes realmente.
4. **Vuelve a la fuente:** Estudia hasta poder explicarlo de forma simple.

## El código como explicación

Si tu código necesita comentarios extensos para ser entendido, probablemente no lo entiendes lo suficiente. El código verdaderamente comprendido se escribe de forma que **se explica solo**.

```typescript
// ❌ NIVEL 1: El autor no entiende su propio código
// Esta función procesa los datos del usuario aplicando las transformaciones
// necesarias según el estado del sistema y las reglas de negocio vigentes
// para determinar si el usuario cumple los criterios de elegibilidad
// basándose en múltiples factores interrelacionados
function proc(u: any, s: any, r: any[]): boolean {
  return r.some(x => x.t === 'e' && x.v > s.th && u.a > x.m);
}

// ✅ NIVEL 2: Entendimiento profundo = código simple
interface User {
  age: number;
}

interface EligibilityRule {
  type: 'age' | 'membership' | 'purchase';
  minimumAge: number;
  threshold: number;
}

function isUserEligible(
  user: User,
  systemThreshold: number,
  rules: EligibilityRule[]
): boolean {
  const ageRules = rules.filter(rule => rule.type === 'age');

  return ageRules.some(rule =>
    rule.threshold > systemThreshold &&
    user.age > rule.minimumAge
  );
}

// No hay comentario porque el código ES la explicación
```

## El test del "explícaselo a un junior"

Feynman decía que si no podías explicar algo a un estudiante de primer año, es que no lo entendías. En programación, el equivalente es:

**¿Puede un desarrollador junior de tu equipo entender tu código sin tu ayuda?**

Si la respuesta es no, tienes dos opciones:

1. El código es demasiado complejo (refactoriza).
2. Tú no entiendes bien lo que hace (estudia antes de modificar).

## Arquitectura simple = Arquitectura entendida

La simplicidad no es solo para funciones individuales. Aplica a la arquitectura completa.

```typescript
// ❌ Arquitectura que nadie puede explicar en una frase
// "Bueno, los datos entran por el API Gateway, pasan por el Event Bus,
// se procesan en el Lambda Orchestrator, se cachean en Redis,
// se persisten en DynamoDB excepto los metadatos que van a S3,
// y luego el CDC los replica al Data Lake para el ML pipeline..."

// ✅ Arquitectura explicable en una frase
// "Los usuarios hacen peticiones a la API, que lee/escribe en la base de datos."

// Si necesitas más que eso, pregúntate: ¿es complejidad esencial o accidental?
```

## Los síntomas de no entender

Señales de que no entiendes algo lo suficiente:

1. **Usas muchos condicionales:** Probablemente no entiendes el problema lo suficiente para modelarlo bien.
2. **Copias y pegas código:** No entiendes el patrón subyacente.
3. **Tu explicación tiene muchos "básicamente" y "más o menos":** Estás camuflando lagunas.
4. **Necesitas la documentación abierta para hacer cambios:** No has internalizado el modelo mental.

## La humildad del experto

Feynman era conocido por admitir lo que no sabía. Los mejores desarrolladores hacen lo mismo. Dicen "no entiendo esto" y luego hacen el trabajo de entenderlo antes de escribir código.

```typescript
// El enfoque Feynman en una code review:

// ❌ "Esto funciona pero no sé muy bien por qué"
// 🚨 ALERTA: No subas este código a producción

// ✅ "Esto funciona porque X causa Y, lo que resulta en Z"
// ✅ Ahora puedes mantenerlo, depurarlo y mejorarlo
```

## El resultado final

Cuando realmente entiendes algo:

- Tu código es más corto.
- Tus funciones tienen menos parámetros.
- Tus nombres son más precisos.
- Tus arquitecturas tienen menos capas.
- Tus explicaciones toman menos tiempo.

Como decía Feynman, la naturaleza no es complicada; somos nosotros los que complicamos las cosas cuando no las entendemos. **La simplicidad no es el punto de partida; es la recompensa del entendimiento profundo.**

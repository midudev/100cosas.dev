---
id: "13"
title: "Talk is cheap. Show me the code"
category: "Comunicación"
categoryColor: "text-cyan-400 bg-cyan-900/20"
author: "linus-torvalds"
---

Esta frase de **Linus Torvalds**, lanzada en un hilo de la lista de correo del kernel de Linux en 2000, se ha convertido en un mantra de la industria: **"Talk is cheap. Show me the code"** (Hablar es barato. Enséñame el código).

Es una llamada a la acción, un recordatorio brutal de que en el desarrollo de software las ideas no valen nada hasta que se materializan. Puedes pasarte horas en reuniones debatiendo arquitecturas, discutiendo patrones o diseñando diagramas en una pizarra, pero al final del día, lo único que importa es el código que funciona.

## El contexto original

La frase no nació como un eslogan motivacional. Surgió en medio de una discusión técnica donde alguien proponía cambios al kernel pero sin aportar una implementación concreta. Linus, con su estilo característicamente directo, cortó el debate:

> "Talk is cheap. Show me the code."

No era desprecio por la teoría; era una demanda de **compromiso**. Si crees que tu idea es mejor, demuéstralo. El código es el gran igualador: no importa tu título, tu antigüedad o tu elocuencia. Lo que importa es si tu solución funciona.

## La trampa de la parálisis por análisis

En equipos de desarrollo, es fácil caer en ciclos infinitos de planificación:

- "Necesitamos investigar más antes de empezar."
- "Primero hay que definir bien la arquitectura."
- "Hagamos otro spike para validar el enfoque."

Aunque la planificación tiene su lugar, muchas veces es una forma de **procrastinación disfrazada de profesionalismo**. El código, aunque sea un prototipo imperfecto, genera información real: descubres dependencias ocultas, problemas de rendimiento y casos borde que ningún diagrama te mostrará.

## El valor del prototipo

Un prototipo funcional, por feo que sea, vale más que mil slides de PowerPoint.

```typescript
// ❌ NIVEL 1: La propuesta teórica (semanas de reuniones)
// "Deberíamos crear un sistema de caché distribuido
// con invalidación eventual y consistencia configurable..."

// ✅ NIVEL 2: El prototipo (una tarde de trabajo)
// Un Map simple que demuestra el concepto
const cache = new Map<string, { data: unknown; expiresAt: number }>();

function getCached<T>(key: string, fetcher: () => Promise<T>, ttlMs = 60000): Promise<T> {
  const cached = cache.get(key);
  if (cached && cached.expiresAt > Date.now()) {
    return Promise.resolve(cached.data as T);
  }

  return fetcher().then(data => {
    cache.set(key, { data, expiresAt: Date.now() + ttlMs });
    return data;
  });
}

// Ahora podemos discutir sobre algo concreto:
// ¿Funciona? ¿Qué le falta? ¿Cómo escalamos esto?
```

## La cultura del "hacedor"

Esta filosofía no significa que debas ignorar el diseño o lanzarte a codificar sin pensar. Significa que:

1. **Las discusiones deben ser cortas:** Si un debate técnico dura más de 15 minutos sin código de por medio, probablemente estéis dando vueltas en círculos.
2. **Los prototipos matan debates:** Un prototipo de 50 líneas puede resolver una discusión que llevaría semanas de emails.
3. **El código es el contrato:** La documentación miente, los comentarios envejecen, pero el código ejecutable es la verdad absoluta del sistema.

## Open Source: La meritocracia del código

El mundo del software de código abierto vive por esta máxima. No importa si eres un estudiante o un ingeniero senior de Google; si tu Pull Request es buena, se acepta. Si no lo es, se rechaza. El código es el único currículum que importa.

La próxima vez que te encuentres en una reunión interminable sobre "cómo deberíamos hacer X", recuerda las palabras de Linus. Sal de la reunión, abre tu editor y demuestra tu punto con código. **Las palabras convencen, pero el código transforma.**

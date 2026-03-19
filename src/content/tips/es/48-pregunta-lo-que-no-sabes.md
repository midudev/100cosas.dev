---
id: "48"
title: "Pregunta lo que no sabes, aunque parezca obvio"
category: "Aprendizaje"
categoryColor: "text-violet-400 bg-violet-900/20"
author: "julia-evans"
---

Julia Evans, creadora de Wizard Zines y ingeniera en Stripe, ha construido una carrera haciendo algo que muchos evitan: **preguntar cosas "tontas" en público y documentar lo que aprende**.

## El miedo a parecer incompetente

En tech hay una presión enorme por "ya saber". Admitir que no entiendes algo se siente peligroso:

- "¿Cómo puede un senior no saber qué es un B-tree?"
- "Deberías saber esto después de 5 años de experiencia"
- "Es básico, búscalo en Google"

Julia hace lo contrario: publica sus preguntas y su proceso de aprendizaje. Y millones de personas descubren que tenían las mismas dudas.

## Aprender en público

El enfoque de Julia:

### 1. Admite lo que no sabes

```markdown
# Mi post real de Julia:
"Siempre me confundo con how DNS works. Let me finally learn it properly."

# 50 páginas de zine después: uno de los recursos más populares sobre DNS
```

### 2. Haz preguntas concretas

```
❌ "¿Cómo funciona Linux?"
✅ "¿Qué pasa exactamente cuando escribo 'ls' y presiono Enter?"
```

La segunda pregunta lleva a respuestas útiles y aprendizaje profundo.

### 3. Documenta mientras aprendes

```markdown
# Mi entendimiento actual de containers:
- Son como procesos aislados? ✓
- Usan namespaces de Linux? ✓
- Comparten kernel con el host? ✓ (esto me sorprendió)
- Son VMs? ✗ (ahora entiendo la diferencia)
```

## Por qué funciona

Cuando preguntas en público:

1. **Otros confirman o corrigen**: "En realidad, no es exactamente así..."
2. **Descubres que no eras el único**: "¡Yo también tenía esa duda!"
3. **Creas recursos para otros**: Tu pregunta se vuelve documentación
4. **Los expertos se involucran**: Les encanta explicar bien

## Ejemplos de preguntas "tontas" que revelaron insights

```markdown
❓ "¿Por qué git tiene staging area? ¿No podría hacer commit directo?"
💡 Insight: Permite commits parciales y revisión antes de commitear

❓ "¿Por qué setTimeout(fn, 0) no es inmediato?"
💡 Insight: El event loop, la cola de tareas, cómo JavaScript maneja asincronía

❓ "¿Por qué HTTPS necesita certificados?"
💡 Insight: Criptografía asimétrica, chain of trust, CAs
```

## Cómo empezar

### En tu equipo

```markdown
En code review:
"No entiendo esta parte. ¿Puedes explicar por qué usamos este patrón?"

En reuniones:
"Perdón, ¿puedes explicar ese acrónimo? No lo conozco."
```

### En público

- Escribe un blog post sobre algo que acabas de aprender
- Tweetea tus preguntas técnicas
- Haz preguntas en Discord/Slack de comunidades

## El superpoder secreto

Julia ha convertido "no saber" en una fortaleza. Sus zines son populares precisamente porque abordan las cosas que todos querían preguntar pero no se atrevían. Al normalizar las preguntas, creó un recurso invaluable para la comunidad.

La próxima vez que no entiendas algo, resiste la tentación de fingir que sí. Pregunta. Documenta. Comparte. Probablemente estés ayudando a más personas de las que imaginas, empezando por tu yo del futuro.

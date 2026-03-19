---
id: "12"
title: "No seas un buen Boy Scout, sé un buen profesional"
category: "Trabajo en Equipo"
categoryColor: "text-sky-400 bg-sky-900/20"
author: "braulio-diez"
---

¿Conoces la **Regla del Boy Scout**? Es un principio muy famoso que dice: "Deja el lugar de acampada más limpio de como lo encontraste". En programación, esto se traduce en arreglar cualquier desorden que encuentres mientras trabajas en una tarea, aunque no esté relacionado.

En la teoría suena noble, pero **Braulio Diez** nos propone una perspectiva diferente y más pragmática: **No seas un buen Boy Scout, sé un buen profesional.**

## El problema del "Boy Scout" descontrolado

Imagina que tienes que implementar una funcionalidad sencilla, como "Crear Cliente". Mientras exploras el código, ves que el componente de Login tiene un estilo feo, o que el servicio de Stock usa una librería antigua. Decides "limpiarlo" ya que estás ahí.

Aunque tus intenciones son buenas, acabas de crear una **bomba de relojería** para tu equipo:

1. **PRs inabarcables**: Tu revisión de código (PR) ahora tiene 20 archivos modificados en lugar de 3. El revisor se preguntará: "¿Por qué un alta de cliente toca el login?".
2. **Conflictos de merge**: Al tocar código que no te corresponde, aumentas exponencialmente la probabilidad de chocar con el trabajo de un compañero.
3. **Retrasos en la entrega**: Lo que era una tarea de una hora se convierte en una tarde entera. Si surge un bug en tu "limpieza", bloqueas la funcionalidad principal.

## La Regla del Buen Profesional

Ser profesional no significa ignorar la basura, significa **gestionarla correctamente**. En lugar de limpiar por impulso, sigue esta estrategia:

1. **Refactoriza con enfoque**: Si el cambio mejora directamente la implementación de tu tarea actual, adelante. Si es algo externo, **detente**.
2. **Documenta y comunica**: Si encuentras algo que huele mal fuera de tu alcance, anótalo. Abre un ticket de "Deuda Técnica" o coméntalo en el canal del equipo.
3. **PRs pequeñas y manejables**: Una PR enfocada se revisa rápido, se integra sin miedo y aporta valor inmediato.

## Ejemplo: El "Boy Scout" vs. El "Profesional"

### ❌ El Boy Scout (PR Mezclada)

```typescript
// PR: "Feature: Crear Cliente"
// Archivos modificados: 15
// Cambios: 
// - Formulario de cliente (OK)
// - Refactor de validación global (RIESGO: afecta a toda la app)
// - Cambio de color en botones de Login (NO RELACIONADO)
// - Eliminación de consola en el Footer (RUIDO)
```

### ✅ El Profesional (PR Enfocada + Nota)

```typescript
// PR: "Feature: Crear Cliente"
// Archivos modificados: 3
// Cambios: Solo lo necesario para la feature.

// Acción adicional:
// "Equipo, he visto que la validación global es un lío. 
// He abierto este ticket [DEUDA-123] para atacarlo 
// en una PR separada mañana."
```

## El valor del equipo

Como bien dice Braulio, desarrollar un producto es cuadrar el círculo: hay que entregar valor, en tiempo, con coste limitado y manteniendo la calidad.

Si planteas el refactor o el testing como algo opcional que haces "si te sobra tiempo", te lo rechazarán. Si lo incluyes como parte de tu estándar profesional, enfocado y comunicado, elevarás el nivel de todo el equipo sin causar el caos.

Desarrollar software profesionalmente es encontrar el equilibrio entre entregar valor hoy y no hipotecar el mañana. Céntrate en tu tarea, entrega PRs limpias y documenta las mejoras para abordarlas de forma estratégica. Eso es lo que distingue a un profesional de un simple entusiasta de la limpieza. Como dice Braulio: **no se trata de ignorar los problemas, sino de atacarlos en el momento y la forma correctos**.

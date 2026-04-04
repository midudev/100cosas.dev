---
id: "88"
title: "La documentación es un acto de empatía"
category: "Documentación"
categoryColor: "text-amber-400 bg-amber-900/20"
author: "daniele-procida"
---

Daniele Procida, creador del framework de documentación Diátaxis, lleva años defendiendo una idea que incomoda a muchos desarrolladores: **la documentación no falla por falta de esfuerzo, sino por falta de empatía**. Escribimos documentación pensando en lo que nosotros sabemos, no en lo que el lector necesita.

## El problema de mezclar todo

Abre cualquier README de un proyecto open source medio. Probablemente encuentres instalación, tres párrafos de teoría sobre el modelo reactivo, un quick start, referencia de API y un ensayo filosófico de 500 palabras sobre las decisiones de diseño. Parece completo, ¿no? El problema es que **mezcla cuatro tipos de contenido completamente diferentes**, cada uno dirigido a un lector en un momento distinto. Y al mezclarlos, ninguno funciona bien.

## Los cuatro tipos de documentación

Procida identificó que toda documentación técnica útil cae en una de cuatro categorías, organizadas en dos ejes: **teoría vs práctica** y **aprendizaje vs trabajo**.

```markdown
                  | Aprendizaje        | Trabajo
------------------|--------------------|-------------------
Práctica          | TUTORIALES         | GUÍAS HOW-TO
                  | "Llévame de la     | "Ayúdame a
                  |  mano"             |  hacer X"
------------------|--------------------|-------------------
Teoría            | EXPLICACIÓN        | REFERENCIA
                  | "Ayúdame a         | "Dame los
                  |  entender por qué" |  hechos"
```

Cada tipo tiene un lector diferente, en un momento diferente, con una necesidad diferente.

![Marco Diátaxis: cuatro tipos de documentación](/images/diagrams/tip-88-diataxis.svg)

### 1. Tutoriales: aprendizaje guiado

El tutorial es para alguien que **no sabe nada** de tu herramienta. No quiere entender la teoría. Quiere una experiencia de éxito rápida. Un mal tutorial empieza explicando qué es una "primitiva reactiva". Un buen tutorial empieza con: "Vamos a crear un contador que se actualiza en tiempo real. Al terminar, tendrás una app funcionando en 5 minutos."

Las reglas de un buen tutorial: el lector debe poder seguirlo **sin pensar**. Cada paso produce un resultado visible. Nunca explicas el "por qué", solo el "qué hacer ahora".

### 2. Guías How-to: resolver problemas concretos

La guía how-to asume que ya sabes usar la herramienta y necesitas hacer algo específico. No empieza con "Para autenticar con OAuth, primero necesitas entender qué es OAuth 2.0…". Empieza con: "Cómo añadir autenticación OAuth. Prerequisitos: proyecto configurado. Paso 1: instala el plugin."

La guía no enseña, no explica, no teoriza. **Resuelve**. Si el lector quiere saber *por qué* OAuth funciona así, lo buscará en la sección de explicación.

### 3. Referencia: los hechos, solo los hechos

La referencia es un diccionario, no una novela. Es lo que consultas cuando ya sabes lo que buscas:

```typescript
// ✅ Buena referencia de API:

/**
 * signal<T>(initialValue: T): Signal<T>
 *
 * Crea un signal reactivo.
 *
 * @param initialValue - Valor inicial del signal
 * @returns Signal con métodos get() y set()
 *
 * @example
 * const name = signal('Ada')
 * name()          // 'Ada'
 * name.set('Bob') // Notifica a los efectos
 *
 * @since 1.0.0
 * @see effect() para suscribirse a cambios
 */
```

La referencia debe ser **exhaustiva, consistente y parseable**. Cada función documentada con el mismo formato. Sin opiniones, sin historias, sin tutoriales intercalados.

### 4. Explicación: el "por qué" detrás de las decisiones

La explicación es para cuando el lector quiere **entender**, no hacer. Es el lugar para la teoría, las decisiones de diseño y las comparaciones. "¿Por qué signals y no un virtual DOM?" es una pregunta de explicación perfecta: compara modelos, analiza trade-offs y ayuda al lector a formar criterio propio.

## Un README con estructura Diátaxis

Aplicar Diátaxis a un README es sencillo: cuatro secciones que apuntan a la documentación correspondiente. Un enlace al tutorial para principiantes, una lista de guías how-to para usuarios con experiencia, un enlace a la referencia API para consultas rápidas, y una sección de explicación para quienes quieren entender el "por qué". Cada lector encuentra lo que necesita en segundos, sin tener que desplazarse por un documento monolítico.

## La conexión con la empatía

Escribir buena documentación requiere el mismo músculo que escribir buen código: **ponerte en el lugar de otro**. Pero con una dificultad adicional: necesitas imaginar lo que alguien **no sabe**.

La maldición del conocimiento es real. Una vez que entiendes cómo funciona tu API, es casi imposible recordar cómo era no entenderla. Por eso los mejores momentos para escribir documentación son:

1. **Cuando acabas de aprender algo** — todavía recuerdas la confusión
2. **Cuando alguien te hace una pregunta** — esa pregunta es un bug de documentación
3. **Cuando un nuevo miembro se une** — su experiencia de onboarding es tu test de usabilidad

## La documentación como código

Si la documentación no está en el CI, no es documentación: es un deseo. Trátala con el mismo rigor que el código: valida los enlaces automáticamente, lintea el markdown, verifica que los ejemplos de la API están actualizados. Revísala en los PRs como revisarías un cambio de código. La documentación que nadie mantiene se pudre más rápido que el código al que documenta.

Daniele Procida nos enseña que la documentación no es un mal necesario ni un favor que le haces al siguiente desarrollador. Es un **acto de empatía**: el esfuerzo consciente de imaginar qué necesita otra persona y dárselo en el formato correcto, en el momento correcto. No escribes documentación porque te lo piden. La escribes porque recuerdas lo que es estar perdido.

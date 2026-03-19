---
id: "91"
title: "No asumas que el siguiente lo sabe: documenta las decisiones"
category: "Documentación"
categoryColor: "text-slate-400 bg-slate-900/20"
author: "sarah-drasner"
---

Sarah Drasner, VP of Developer Experience en Netflix y antes directora de ingeniería en Google, ha dedicado buena parte de su carrera a una causa que muchos ignoran: la experiencia del desarrollador. Y dentro de esa causa, hay una batalla que considera fundamental: **"La documentación no es un favor que haces al futuro. Es una responsabilidad que tienes con el presente"**.

Cuando un equipo toma una decisión técnica —elegir una base de datos, adoptar un framework, diseñar una API de cierta manera— esa decisión tiene un contexto: restricciones de tiempo, requisitos del negocio, limitaciones técnicas, alternativas descartadas. Seis meses después, ese contexto desaparece de la memoria de todos. Y el nuevo desarrollador que llega al proyecto se encuentra ante una arquitectura que no entiende, sin saber si es brillante o un error histórico que nadie se atrevió a cambiar.

## ADRs: la memoria del equipo

Los **Architecture Decision Records** (ADRs) son documentos breves que capturan el "por qué" detrás de cada decisión importante. No son documentación exhaustiva ni manuales de 50 páginas. Son registros concisos que responden a una pregunta simple: *¿por qué hicimos esto así?*

```markdown
# ADR-007: Migrar de REST a GraphQL en el BFF

## Estado
Aceptado — 2026-01-15

## Contexto
El frontend necesita datos de 4 microservicios distintos para renderizar
la página de perfil. Esto genera 4 llamadas HTTP en cascada,
aumentando el Time to Interactive en ~800ms.

## Decisión
Implementar un Backend for Frontend (BFF) con GraphQL que agregue
las llamadas y devuelva exactamente los datos que el frontend necesita.

## Alternativas consideradas
- **REST con endpoint agregado**: Descartado porque cada vista nueva
  requeriría un endpoint nuevo, acoplando backend y frontend.
- **Server-Side Rendering**: Descartado porque el equipo no tiene
  experiencia y el timeline es de 3 semanas.

## Consecuencias
- (+) Reducción de llamadas de red de 4 a 1
- (+) El frontend pide exactamente lo que necesita
- (-) Nuevo servicio que mantener y monitorizar
- (-) Curva de aprendizaje de GraphQL para 2 miembros del equipo
```

La diferencia entre un equipo que documenta decisiones y uno que no es brutal. En el primero, un desarrollador nuevo puede leer los ADRs y en una tarde entender la arquitectura completa del sistema. En el segundo, necesita semanas de arqueología en Slack y reuniones con veteranos que "se acuerdan más o menos".

## El coste invisible de no documentar

Sarah Drasner cuenta que en un equipo anterior, encontró un microservicio que nadie se atrevía a tocar. Lo llamaban "el monolito sagrado". Nadie sabía por qué estaba separado del resto, ni por qué usaba una versión antigua de Node, ni por qué tenía una configuración de CORS tan permisiva. El desarrollador original se había ido hacía dos años.

El equipo gastó **tres semanas** investigando antes de poder hacer un cambio que debería haber tomado dos días. Tres semanas que se habrían reducido a treinta minutos si alguien hubiera escrito un documento de media página explicando las decisiones originales.

Este patrón se repite en toda la industria. Los equipos gastan entre un 20% y un 30% de su tiempo entendiendo decisiones que nadie documentó.

## Qué documentar (y qué no)

No todo merece un ADR. Documentar que usas `const` en vez de `let` sería absurdo. La regla es simple:

1. **Documenta** decisiones que serían difíciles de revertir: elección de base de datos, arquitectura de servicios, patrones de autenticación.
2. **Documenta** decisiones que descartaron alternativas obvias: si elegiste MongoDB teniendo datos altamente relacionales, alguien va a preguntar por qué.
3. **No documentes** lo que el código ya dice: si una función se llama `validateUserEmail`, no necesitas un documento explicando que valida emails.
4. **No documentes** decisiones triviales o fácilmente reversibles: la elección de una librería de iconos no necesita un ADR.

## El RFC como evolución natural

Cuando las decisiones son lo suficientemente grandes, Sarah recomienda dar un paso más allá de los ADRs: los **RFCs** (Request for Comments). Un RFC se escribe *antes* de tomar la decisión, no después. Se comparte con el equipo, se recoge feedback, y la decisión final se documenta junto con las objeciones y sus respuestas.

```markdown
# RFC: Sistema de caché para el catálogo de productos

## Problema
Las consultas al catálogo generan ~2000 queries/segundo a PostgreSQL.
El tiempo de respuesta p99 es de 1.2s. Necesitamos bajar a <200ms.

## Propuesta
Implementar Redis como capa de caché con invalidación basada en eventos.

## Preguntas abiertas
- ¿Cómo manejamos la consistencia entre caché y DB?
- ¿Qué TTL usamos para cada tipo de producto?
- ¿Quién mantiene la infraestructura de Redis?

## Feedback recibido
@maria: "Considerar usar CDN para productos que cambian poco"
@carlos: "Redis añade un punto de fallo. ¿Tenemos plan de fallback?"
```

El RFC convierte decisiones solitarias en decisiones colectivas. Y eso no solo produce mejores decisiones, sino que genera un registro invaluable del razonamiento del equipo.

Dentro de dos años, nadie recordará por qué se eligió Redis en vez de Memcached, ni por qué la API usa paginación por cursor en vez de offset. Pero si está documentado, el siguiente equipo no repetirá la investigación, no cometerá los mismos errores descartados, y no perderá semanas adivinando intenciones. Como dice Sarah Drasner: la mejor documentación no describe lo que el código hace, sino lo que el equipo *pensó* cuando lo escribió.

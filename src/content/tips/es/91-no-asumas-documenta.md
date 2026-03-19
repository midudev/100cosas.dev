---
id: "91"
title: "No asumas que el siguiente lo sabe: documenta las decisiones"
category: "Documentación"
categoryColor: "text-slate-400 bg-slate-900/20"
author: "sarah-drasner"
---

Sarah Drasner promueve la documentación de decisiones, no solo de código: **el "por qué" es más valioso que el "qué"**.

## ADRs: Architecture Decision Records

```markdown
# ADR-001: Usar PostgreSQL en lugar de MongoDB

## Contexto
Necesitamos una base de datos para el nuevo proyecto.

## Decisión
PostgreSQL porque necesitamos transacciones ACID 
y nuestro modelo de datos es relacional.

## Consecuencias
- (+) Transacciones robustas
- (+) Tooling maduro
- (-) Menos flexible para esquemas cambiantes

## Fecha: 2026-01-06
## Estado: Aceptado
```

## Reflexión final

Dentro de 2 años, nadie recordará por qué se eligió PostgreSQL. Pero si está documentado, el siguiente equipo no repetirá la investigación.

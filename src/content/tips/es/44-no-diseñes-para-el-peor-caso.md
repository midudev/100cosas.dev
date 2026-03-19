---
id: "44"
title: "No diseñes para el peor caso, diseña para el caso real"
category: "Arquitectura"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "radia-perlman"
---

Radia Perlman, inventora del protocolo Spanning Tree que hace funcionar las redes Ethernet, tiene una perspectiva única sobre diseño de sistemas: **resuelve el problema que tienes, no el que imaginas que podrías tener**.

## El síndrome del "¿Y si...?"

Los ingenieros adoramos los escenarios hipotéticos:

- "¿Y si tenemos un millón de usuarios?"
- "¿Y si necesitamos soportar 50 idiomas?"
- "¿Y si el cliente quiere cambiar la base de datos?"

El resultado: sistemas sobrecomplicados para problemas que nunca llegan.

```javascript
// Lo que construimos "por si acaso"
class AbstractFactoryProviderManagerSingletonProxy {
  // 2000 líneas de código "flexible"
}

// Lo que realmente necesitábamos
function getUser(id) {
  return db.users.findById(id);
}
```

## El enfoque de Radia

Cuando diseñó Spanning Tree, Radia no intentó resolver todos los problemas de redes posibles. Se enfocó en **un problema específico**: evitar bucles en redes Ethernet.

El protocolo:
- Es simple (cabe en una servilleta)
- Resuelve exactamente lo que necesita resolver
- Ha funcionado durante 40 años

## Diseño pragmático en la práctica

### Escala apropiada

```javascript
// No necesitas Redis cuando tienes 100 usuarios
const cache = new Map();

function getUser(id) {
  if (cache.has(id)) return cache.get(id);
  
  const user = await db.users.findById(id);
  cache.set(id, user);
  return user;
}

// Cuando realmente necesites Redis, la migración es trivial
```

### Base de datos apropiada

```sql
-- PostgreSQL hace todo esto bien para el 99% de casos:
-- - Datos relacionales ✓
-- - JSON ✓
-- - Full text search ✓
-- - Geolocalización ✓

-- No necesitas 5 bases de datos especializadas
```

### Arquitectura apropiada

```
# Para la mayoría de proyectos:
Un servidor → Un proceso → Una base de datos

# "Microservicios" prematuros:
12 servicios → 12 deploys → 12 puntos de fallo → 1 desarrollador llorando
```

## El coste de la flexibilidad innecesaria

Cada abstracción "por si acaso" tiene costes:

1. **Complejidad**: Más código que mantener
2. **Rendimiento**: Más capas que atravesar
3. **Comprensión**: Más conceptos que aprender
4. **Bugs**: Más lugares donde las cosas pueden fallar

## Cuándo SÍ diseñar para el futuro

Radia no dice "nunca planifiques". Dice "**planifica para cambios probables, no posibles**":

```javascript
// Cambio probable: añadir campos al usuario
// Diseño: esquema flexible, migraciones automáticas
const userSchema = {
  name: String,
  email: String,
  // Fácil añadir más campos
};

// Cambio posible pero improbable: cambiar de PostgreSQL a Oracle
// Diseño: NO abstraer toda la base de datos
// Si llega ese momento, refactorizas
```

## Reflexión final

El protocolo de Radia ha sobrevivido décadas no porque anticipó todos los cambios, sino porque resolvió bien un problema específico. Los mejores sistemas no son los más flexibles - son los que hacen una cosa bien. La complejidad siempre puedes añadirla después; quitarla es mucho más difícil.

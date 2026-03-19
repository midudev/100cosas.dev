---
id: "62"
title: "Duplica código antes de crear la abstracción incorrecta"
category: "Arquitectura"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "sandi-metz"
---

Sandi Metz tiene un consejo que parece ir contra todo lo que nos enseñan: **"La duplicación es mucho más barata que la abstracción incorrecta"**.

## El impulso de DRY prematuro

```javascript
// Ves dos funciones similares
function formatUserEmail(user) {
  return `${user.firstName} ${user.lastName} <${user.email}>`;
}

function formatAdminEmail(admin) {
  return `[ADMIN] ${admin.firstName} ${admin.lastName} <${admin.email}>`;
}

// Tu instinto: "¡Hay duplicación! Debo abstraer"
function formatEmail(person, prefix = '') {
  return `${prefix}${person.firstName} ${person.lastName} <${person.email}>`;
}
```

Parece mejor, ¿verdad? Hasta que...

## Cuando la abstracción se rompe

```javascript
// Nuevos requisitos: los admins necesitan mostrar su departamento
// Los usuarios necesitan mostrar su plan (free/pro)
// Algunos usuarios son empresas, no personas

function formatEmail(entity, options = {}) {
  const prefix = options.prefix || '';
  const suffix = options.suffix || '';
  const name = entity.companyName || 
    `${entity.firstName || ''} ${entity.lastName || ''}`.trim();
  const extra = entity.department || entity.plan || '';
  
  return `${prefix}${name}${extra ? ` (${extra})` : ''} <${entity.email}>${suffix}`;
}

// 😱 Ahora tenemos una función que hace demasiado
// Es difícil de entender, testear y modificar
```

## La regla del tres de Sandi

```markdown
1. Primera vez: solo escribe el código
2. Segunda vez: nota la duplicación, pero permite que exista
3. Tercera vez: AHORA considera abstraer

¿Por qué esperar? Porque en el tercer caso:
- Conoces mejor los patrones reales
- Ves qué es realmente común y qué no
- La abstracción emerge naturalmente
```

## Código duplicado vs. abstracción forzada

```javascript
// ✅ Duplicación honesta (fácil de cambiar)
function formatUserForEmail(user) {
  return `${user.name} <${user.email}>`;
}

function formatUserForDisplay(user) {
  return `${user.name} (${user.role})`;
}

function formatUserForLog(user) {
  return `[User:${user.id}] ${user.name}`;
}

// Cada función es simple y clara
// Cuando una cambia, las otras no se ven afectadas
```

```javascript
// ❌ Abstracción forzada (difícil de cambiar)
function formatUser(user, context) {
  switch(context) {
    case 'email': return `${user.name} <${user.email}>`;
    case 'display': return `${user.name} (${user.role})`;
    case 'log': return `[User:${user.id}] ${user.name}`;
    default: throw new Error('Unknown context');
  }
}

// Ahora un cambio en 'email' puede romper 'log'
// Los tests son más complicados
// Añadir un nuevo contexto modifica código existente
```

## Señales de abstracción prematura

1. **La función tiene muchos parámetros booleanos**
2. **Hay muchos `if/else` basados en "tipo"**
3. **El nombre es genérico**: `handleThing`, `processData`
4. **Necesitas leer la implementación para entender qué hace**

## Señales de que es hora de abstraer

1. **El patrón se ha repetido 3+ veces**
2. **Los casos son genuinamente idénticos** (no solo similares)
3. **La abstracción tiene un nombre claro**
4. **Los tests serían más simples con la abstracción**

## Reflexión final

Sandi nos recuerda que el objetivo no es eliminar toda duplicación - es escribir código mantenible. A veces, tres funciones simples y duplicadas son más mantenibles que una función "clever" y abstracta.

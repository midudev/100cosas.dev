---
id: "72"
title: "Los nombres revelan intención"
category: "Legibilidad"
categoryColor: "text-teal-400 bg-teal-900/20"
author: "robert-c-martin"
---

Uncle Bob insiste: **un buen nombre elimina la necesidad de comentarios**. Si necesitas un comentario para explicar qué hace una variable, el nombre está mal.

## Nombres que ocultan

```javascript
// ❌ ¿Qué es esto?
const d = 7;
const list = getData();
const flag = check();

// ✅ Ahora se entiende
const daysUntilExpiration = 7;
const activeUsers = getActiveUsers();
const isValidEmail = validateEmail(email);
```

## Funciones que se explican solas

```javascript
// ❌ Necesita comentario
// Comprueba si el usuario puede acceder a la funcionalidad premium
function check(u) {
  return u.plan === 'pro' && u.active;
}

// ✅ El nombre ES el comentario
function canAccessPremiumFeatures(user) {
  return user.plan === 'pro' && user.active;
}
```

## Reglas prácticas

1. **Usa verbos para funciones**: `getUser`, `calculateTotal`, `validateInput`
2. **Usa sustantivos para variables**: `userName`, `totalAmount`, `validationResult`
3. **Booleanos con is/has/can**: `isActive`, `hasPermission`, `canEdit`

## Reflexión final

Nombrar es una de las cosas más difíciles en programación. Pero es donde más vale la pena invertir tiempo. Un buen nombre hace que el código se lea como prosa.

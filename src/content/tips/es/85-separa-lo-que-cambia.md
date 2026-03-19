---
id: "85"
title: "Separa lo que cambia de lo que permanece igual"
category: "Arquitectura"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "sandi-metz"
---

Sandi Metz identifica un patrón en código bien diseñado: **el código que cambia junto debería vivir junto**.

## Ejemplo práctico

```javascript
// ❌ Mezclado: lógica de negocio y presentación
function UserProfile({ user }) {
  const isActive = user.lastLogin > Date.now() - 30 * 24 * 60 * 60 * 1000;
  const formattedDate = new Intl.DateTimeFormat('es').format(user.createdAt);
  
  return <div>/* UI que usa isActive y formattedDate */</div>;
}

// ✅ Separado: la lógica cambia independiente de la UI
function isUserActive(user) {
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  return user.lastLogin > thirtyDaysAgo;
}

function UserProfile({ user }) {
  return <UserProfileView 
    user={user} 
    isActive={isUserActive(user)} 
  />;
}
```

## Reflexión final

Cuando algo cambia, ¿cuántos archivos tienes que modificar? Si son muchos, algo está acoplado que no debería.

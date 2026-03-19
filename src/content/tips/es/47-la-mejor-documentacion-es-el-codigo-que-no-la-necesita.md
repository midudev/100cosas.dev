---
id: "47"
title: "La mejor documentación es el código que no la necesita"
category: "Legibilidad"
categoryColor: "text-teal-400 bg-teal-900/20"
author: "kelsey-hightower"
---

Kelsey Hightower, ingeniero principal en Google Cloud y una de las voces más respetadas en DevOps, es famoso por sus demos minimalistas y su filosofía directa: **si tu código necesita mucha documentación para entenderse, probablemente el problema es el código**.

## El problema de la documentación separada

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
# Ver docs/deployment-guide.md para entender estos valores
# Última actualización: hace 6 meses (probablemente desactualizado)
metadata:
  name: my-app
  labels:
    # No cambiar este label, rompe el servicio (ver JIRA-1234)
    app: legacy-name-dont-change
```

La documentación separada tiene un problema fundamental: **se desincroniza del código**.

## El enfoque de Kelsey

En sus demos legendarias, Kelsey muestra sistemas complejos de Kubernetes sin diapositivas. El código habla por sí mismo:

```yaml
# Auto-explicativo
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-frontend
  labels:
    app: web-frontend
    team: platform
    environment: production
spec:
  replicas: 3  # Mismo número que availability zones
  selector:
    matchLabels:
      app: web-frontend
```

Los nombres, la estructura, los valores - todo cuenta una historia clara.

## Código que se documenta solo

### Variables con significado

```javascript
// ❌ Necesita comentario
const d = 7; // días hasta expiración

// ✅ Se explica solo
const daysUntilExpiration = 7;
```

### Funciones que describen su propósito

```javascript
// ❌ ¿Qué hace esto?
function proc(u, f) {
  if (f) return u.filter(x => x.a);
  return u;
}

// ✅ El nombre es la documentación
function getActiveUsers(users, includeInactiveUsers = false) {
  if (includeInactiveUsers) return users;
  return users.filter(user => user.isActive);
}
```

### Configuración declarativa

```javascript
// ❌ Config críptica
const config = {
  rt: 3,
  to: 5000,
  mx: 100
};

// ✅ Config que se explica
const config = {
  maxRetries: 3,
  timeoutMs: 5000,
  maxConcurrentRequests: 100
};
```

## Cuándo SÍ documentar

Kelsey no dice "nunca documentes". Documenta:

### 1. El "por qué", no el "qué"

```javascript
// El "qué" es obvio del código
// El "por qué" necesita explicación
const TIMEOUT_MS = 30000; // Stripe webhook puede tardar hasta 25s en casos extremos

// Workaround para bug en librería X (issue #1234)
// TODO: Eliminar cuando actualicemos a v3.0
```

### 2. Decisiones de arquitectura

```markdown
# ADR-001: Usamos PostgreSQL sobre MongoDB

## Contexto
Necesitamos persistencia para datos de usuario...

## Decisión
PostgreSQL porque...

## Consecuencias
- Positivas: ACID, tooling maduro...
- Negativas: Menos flexible para esquemas cambiantes...
```

### 3. APIs públicas

```typescript
/**
 * Envía un email de bienvenida al usuario recién registrado.
 *
 * @param userId - ID del usuario (debe existir en la base de datos)
 * @throws {UserNotFoundError} Si el usuario no existe
 * @throws {EmailServiceError} Si falla el envío
 */
async function sendWelcomeEmail(userId: string): Promise<void>
```

La documentación es un parche. A veces necesario, pero un parche. El código claro, los nombres descriptivos, y la estructura obvia son la cura real. Kelsey demuestra en cada demo que los sistemas más complejos pueden ser comprensibles si están bien diseñados.

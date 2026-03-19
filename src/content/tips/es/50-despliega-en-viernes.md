---
id: "50"
title: "Si tu sistema es bueno, despliega en viernes"
category: "DevOps"
categoryColor: "text-orange-400 bg-orange-900/20"
author: "guillermo-rauch"
---

Guillermo Rauch, CEO de Vercel y creador de Next.js, desafía una de las "verdades" más aceptadas de la industria: **"No despliegues en viernes"**. Su argumento: si tu sistema necesita esa regla, tu sistema tiene problemas.

## El miedo institucionalizado

```markdown
# Calendario típico de desarrollo

| Día       | Permitido desplegar? |
|-----------|---------------------|
| Lunes     | Sí                  |
| Martes    | Sí                  |
| Miércoles | Sí                  |
| Jueves    | ⚠️ Cuidado         |
| Viernes   | ❌ NUNCA           |
| Fines     | 🔒 Prohibido        |

# ¿Por qué? "Porque si algo falla, no hay nadie para arreglarlo"
```

Pero esto revela un problema más profundo: **tu proceso de deploy es peligroso**.

## La filosofía de Vercel

Rauch construyó Vercel con un principio: **los deploys deben ser tan seguros que el día no importe**.

```bash
# En Vercel, cada push es un deploy
git push origin main

# Y cada PR tiene un preview URL
# Puedes probar antes de mergear
# El rollback es un click
```

Si el viernes es peligroso, todos los días lo son. Solo que aceptas el riesgo de lunes a jueves.

## Qué necesitas para desplegar cualquier día

### 1. Deploys atómicos e instantáneos

```javascript
// Mal: deploys de 20 minutos donde algo puede fallar
// Bien: deploys inmutables que se activan en milisegundos

// Vercel/Netlify/etc. construyen la nueva versión
// Y hacen switch atómico cuando está lista
```

### 2. Rollback inmediato

```bash
# Si algo falla, volver atrás debe ser trivial
vercel rollback

# O automático
if (errorRate > threshold) {
  autoRollback();
}
```

### 3. Feature flags

```javascript
// Separar deploy de release
if (featureFlags.newCheckout) {
  return <NewCheckout />;
} else {
  return <OldCheckout />;
}

// Puedes desplegar código nuevo
// Y activarlo gradualmente (canary release)
```

### 4. Observabilidad

```javascript
// Saber inmediatamente si algo va mal
Sentry.init({ dsn: '...' });

// Métricas de negocio en tiempo real
analytics.track('checkout_completed', { value });

// Alertas que despiertan a quien corresponda
```

### 5. Testing automatizado

```yaml
# CI que previene deploys rotos
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: npm test
      - run: npm run e2e
      # Solo despliega si pasa todo
```

## El beneficio oculto

Cuando puedes desplegar cualquier día:

- **Fixes rápidos**: Un bug el viernes se arregla el viernes
- **Menos estrés**: No hay "ventanas de deploy"
- **Más iteraciones**: Más deploys = más feedback = mejor producto

## El contraargumento

"Pero si falla el viernes, nadie está para arreglarlo"

La respuesta de Rauch:

1. Si tu sistema requiere intervención humana frecuente, es frágil
2. Las emergencias no respetan calendario - pueden pasar cualquier día
3. La automatización debería manejar los casos comunes

## Reflexión final

"No deploys en viernes" es un síntoma, no una solución. Es admitir que tus deploys son peligrosos y que tu sistema es frágil. La solución real es construir sistemas donde el día sea irrelevante. Si Vercel, que sirve millones de sitios, puede hacerlo, tú también.

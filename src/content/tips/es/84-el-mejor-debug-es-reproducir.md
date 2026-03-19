---
id: "84"
title: "El primer paso para arreglar un bug es reproducirlo"
category: "Debugging"
categoryColor: "text-red-400 bg-red-900/20"
author: "julia-evans"
---

Julia Evans tiene un proceso metódico para debugging: **si no puedes reproducir el bug, no puedes arreglarlo con confianza**.

## El proceso de Julia

```markdown
1. Reproduce el bug localmente
2. Escribe un test que falle por el bug
3. Arregla el bug
4. El test ahora pasa
5. El bug no puede volver
```

## Cuando no puedes reproducir

```javascript
// Añade más información al error
try {
  riskyOperation();
} catch (error) {
  logger.error('Operation failed', {
    error: error.message,
    stack: error.stack,
    input: safeStringify(input),
    userId: user?.id,
    timestamp: new Date().toISOString()
  });
  throw error;
}
```

## Reflexión final

Un bug que no puedes reproducir es un bug que volverá. Invierte tiempo en reproducirlo antes de intentar arreglarlo.

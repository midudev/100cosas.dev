---
id: "75"
title: "No reinventes la rueda (a menos que estés aprendiendo sobre ruedas)"
category: "Productividad"
categoryColor: "text-lime-400 bg-lime-900/20"
author: "kent-c-dodds"
---

Kent C. Dodds es pragmático: **usa soluciones existentes para producción, reinventa para aprender**. La distinción es crucial.

## Cuándo usar lo existente

```javascript
// ❌ Reinventar validación de emails
const emailRegex = /^[a-zA-Z0-9... // 200 caracteres de regex

// ✅ Usar librería probada
import { isEmail } from 'validator';
```

## Cuándo reinventar

```javascript
// Para aprender cómo funciona React:
function useState(initialValue) {
  // Tu implementación básica
  // Ahora entiendes los hooks
}

// Para producción:
import { useState } from 'react';
```

## La regla de Kent

```markdown
Pregunta: ¿Es para producción o para aprender?

Producción → Usa la solución probada
Aprendizaje → Reinventa y luego tíralo
```

## Reflexión final

Las mejores soluciones a problemas comunes ya existen. Tu tiempo es mejor invertido en resolver los problemas únicos de tu negocio, no en reescribir lo que otros ya resolvieron.

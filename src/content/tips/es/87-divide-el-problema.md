---
id: "87"
title: "Divide el problema hasta que cada parte sea trivial"
category: "Proceso"
categoryColor: "text-blue-400 bg-blue-900/20"
author: "edsger-dijkstra"
---

Dijkstra era maestro en descomponer problemas: **un problema difícil es simplemente muchos problemas fáciles juntos**.

## El enfoque

```markdown
Problema: "Construir un sistema de autenticación"

Dividir:
1. Validar formato de email
2. Hash de contraseña
3. Almacenar en base de datos
4. Generar token JWT
5. Verificar token en requests

Cada parte es trivial por separado.
```

## Reflexión final

Cuando estés atascado, no intentes resolver todo a la vez. Divide hasta que cada parte sea obvia.

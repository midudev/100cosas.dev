---
id: "83"
title: "Cada dependencia es deuda que tendrás que pagar"
category: "Arquitectura"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "dhh"
---

DHH es conocido por minimizar dependencias: **cada npm install es una promesa de mantenimiento futuro**.

## El coste oculto

```bash
# Parece inocente
npm install left-pad moment lodash

# Pero implica:
# - Actualizaciones de seguridad
# - Breaking changes
# - Supply chain attacks
# - Mayor tamaño de bundle
```

## Antes de instalar, pregunta

1. ¿Puedo hacerlo con JavaScript nativo?
2. ¿Cuánto del paquete voy a usar realmente?
3. ¿Está activamente mantenido?
4. ¿Cuántas dependencias transitivas trae?

## Reflexión final

No digo "no uses dependencias". Digo "evalúa el coste". A veces 20 líneas de código propio son mejor que una dependencia de 2000.

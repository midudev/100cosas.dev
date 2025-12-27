---
id: "04"
title: "Las buenas estructuras de datos simplifican el código"
category: "Arquitectura"
categoryColor: "text-purple-400 bg-purple-900/20"
author: "linus-torvalds"
---

Linus Torvalds soltó una de sus frases más célebres en una lista de correo en 2006: **"Los malos programadores se preocupan por el código. Los buenos programadores se preocupan por las estructuras de datos y sus relaciones"**.

Esta idea es el corazón del diseño de Git. En lugar de centrarse en algoritmos complejos para comparar archivos, Linus se centró en cómo se almacenan los datos (objetos, commits, árboles). Si la estructura de los datos es la correcta, el código que la maneja se vuelve casi trivial.

## El problema: Lógica pesada vs. Estructura inteligente

Imagina que tienes que gestionar los estados de un pedido y qué transiciones están permitidas.

### El enfoque "malo": Lógica de control dispersa

Aquí el programador se centra en el "código" (las condiciones). Cada vez que añades un estado, la complejidad crece exponencialmente.

```typescript
type Status = 'pendiente' | 'pagado' | 'enviado' | 'entregado' | 'cancelado';

function canChangeStatus(current: Status, next: Status): boolean {
  if (current === 'pendiente' && (next === 'pagado' || next === 'cancelado')) {
    return true;
  }
  if (current === 'pagado' && (next === 'enviado' || next === 'cancelado')) {
    return true;
  }
  if (current === 'enviado' && next === 'entregado') {
    return true;
  }
  // ... esto se vuelve un lío difícil de leer y mantener
  return false;
}
```

### El enfoque "bueno": Estructura de datos como motor

Aquí definimos la "relación" entre los datos primero. El código simplemente consulta esa estructura.

```typescript
type Status = 'pendiente' | 'pagado' | 'enviado' | 'entregado' | 'cancelado';

// La estructura de datos define las reglas del negocio
const ALLOWED_TRANSITIONS: Record<Status, Status[]> = {
  pendiente: ['pagado', 'cancelado'],
  pagado: ['enviado', 'cancelado'],
  enviado: ['entregado'],
  entregado: [],
  cancelado: []
};

function canChangeStatus(current: Status, next: Status): boolean {
  return ALLOWED_TRANSITIONS[current].includes(next);
}
```

## ¿Por qué esto es mejor?

1.  **Claridad:** Las reglas del negocio están en un solo lugar y son fáciles de leer de un vistazo.
2.  **Mantenibilidad:** Si quieres añadir una regla (ej. de 'pendiente' a 'procesando'), solo cambias un array en un objeto, no tocas la lógica de la función.
3.  **Extensibilidad:** Es fácil añadir validaciones adicionales sin romper la estructura principal.

Cuando te enfrentes a un problema complejo de lógica, detente y pregunta: **"¿Hay alguna forma de organizar mis datos que haga que este código sea innecesario?"**

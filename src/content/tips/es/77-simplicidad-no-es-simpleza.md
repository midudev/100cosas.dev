---
id: "77"
title: "Simplicidad no es simpleza"
category: "Arquitectura"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "edsger-dijkstra"
---

Dijkstra distinguía entre **simple** (fácil de entender) y **simplista** (inadecuadamente simple). La simplicidad real es difícil de lograr.

## Simple vs. simplista

```javascript
// Simplista: ignora casos importantes
function divide(a, b) {
  return a / b; // ¿Y si b es 0?
}

// Simple: maneja lo necesario, sin más
function divide(a, b) {
  if (b === 0) return { ok: false, error: 'Division by zero' };
  return { ok: true, result: a / b };
}
```

## La paradoja de la simplicidad

Lo simple requiere más pensamiento:

```markdown
Primera versión: 500 líneas, compleja
Después de refactorizar: 200 líneas, simple

La segunda versión tardó más tiempo en escribir.
```

## Reflexión final

"Haz las cosas tan simples como sea posible, pero no más simples" - Einstein. La simplicidad es el resultado de eliminar lo innecesario, no de ignorar lo importante.

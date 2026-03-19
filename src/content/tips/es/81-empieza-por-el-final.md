---
id: "81"
title: "Empieza por el final: escribe primero cómo quieres usar el código"
category: "Proceso"
categoryColor: "text-blue-400 bg-blue-900/20"
author: "kent-beck"
---

Kent Beck tiene un truco para diseñar APIs: **escribe primero el código que usará tu función, luego implementa la función**.

## Diseño desde el uso

```javascript
// 1. Primero escribo cómo QUIERO usarlo
const user = await User.findByEmail('user@example.com');
const orders = await user.getRecentOrders({ limit: 5 });
const total = orders.calculateTotal();

// 2. Ahora implemento para que esto funcione
class User {
  static async findByEmail(email) { /* ... */ }
  async getRecentOrders(options) { /* ... */ }
}
```

## Por qué funciona

Cuando empiezas por la implementación, creas APIs incómodas. Cuando empiezas por el uso, creas APIs naturales.

## Reflexión final

TDD lleva esta idea al extremo: escribes el test (uso) antes que el código. Aunque no hagas TDD estricto, pensar en el uso primero mejora tu diseño.

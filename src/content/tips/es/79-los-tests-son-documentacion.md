---
id: "79"
title: "Los tests son la mejor documentación"
category: "Testing"
categoryColor: "text-yellow-400 bg-yellow-900/20"
author: "kent-beck"
---

Kent Beck ve los tests como algo más que verificación: **son ejemplos ejecutables de cómo usar tu código**.

## Tests como documentación

```javascript
describe('Cart', () => {
  it('adds items and calculates total', () => {
    const cart = new Cart();
    cart.add({ name: 'Laptop', price: 1000 });
    cart.add({ name: 'Mouse', price: 50 });
    
    expect(cart.total).toBe(1050);
  });
  
  it('applies discount codes', () => {
    const cart = new Cart();
    cart.add({ name: 'Laptop', price: 1000 });
    cart.applyDiscount('SAVE10'); // 10% off
    
    expect(cart.total).toBe(900);
  });
});

// Estos tests te dicen exactamente cómo usar Cart
// Y a diferencia de los comentarios, siempre están actualizados
```

## Por qué funciona mejor que comentarios

Los comentarios se desactualizan. Los tests fallan si el código cambia.

## Reflexión final

La próxima vez que escribas tests, piensa: "¿Esto ayudaría a un desarrollador nuevo a entender cómo usar este módulo?"

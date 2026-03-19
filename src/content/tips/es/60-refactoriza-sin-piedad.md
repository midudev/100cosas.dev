---
id: "60"
title: "Refactoriza sin piedad, pero con tests"
category: "Código Limpio"
categoryColor: "text-green-400 bg-green-900/20"
author: "martin-fowler"
---

Martin Fowler, autor del libro "Refactoring" que definió el término, tiene una regla que parece contradictoria: **refactoriza constantemente y sin piedad, pero nunca sin tests**.

## Qué es refactorizar (y qué no es)

```javascript
// ❌ Esto NO es refactoring
// Estás cambiando comportamiento
function calculateTotal(items) {
  return items.reduce((sum, i) => sum + i.price, 0);
}
// Se convierte en:
function calculateTotal(items) {
  // Ahora aplica descuentos (comportamiento nuevo)
  return items.reduce((sum, i) => sum + i.price * 0.9, 0);
}

// ✅ Esto SÍ es refactoring
// Mismo comportamiento, mejor estructura
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}
// Se convierte en:
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

El comportamiento observable es idéntico. Solo la estructura interna cambia.

## Por qué tests primero

```javascript
// Sin tests, no sabes si rompiste algo
function processOrder(order) {
  // 200 líneas de lógica compleja
  // ¿Cómo sabes que sigue funcionando después de refactorizar?
}

// Con tests, refactorizas con confianza
describe('processOrder', () => {
  it('calculates subtotal correctly', () => {
    const order = { items: [{ price: 10 }, { price: 20 }] };
    expect(processOrder(order).subtotal).toBe(30);
  });
  
  it('applies discount for orders over 100', () => {
    const order = { items: [{ price: 150 }] };
    expect(processOrder(order).total).toBe(135);
  });
  
  // Ahora puedes refactorizar las 200 líneas
  // Si los tests pasan, el comportamiento es correcto
});
```

## El catálogo de refactorings de Fowler

### Extract Function

```javascript
// Antes
function printOwing(invoice) {
  console.log("***********************");
  console.log("**** Customer Owes ****");
  console.log("***********************");
  
  let outstanding = 0;
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
}

// Después
function printOwing(invoice) {
  printBanner();
  const outstanding = calculateOutstanding(invoice);
  printDetails(invoice, outstanding);
}
```

### Inline Function (el reverso)

```javascript
// A veces, funciones muy pequeñas oscurecen más que ayudan
// Antes
function moreThanFiveLateDeliveries(driver) {
  return driver.numberOfLateDeliveries > 5;
}

function getRating(driver) {
  return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}

// Después (si la función solo se usa una vez)
function getRating(driver) {
  return driver.numberOfLateDeliveries > 5 ? 2 : 1;
}
```

### Replace Conditional with Polymorphism

```javascript
// Antes
function calculatePay(employee) {
  switch (employee.type) {
    case 'engineer': return employee.salary;
    case 'salesman': return employee.salary + employee.commission;
    case 'manager': return employee.salary + employee.bonus;
  }
}

// Después
class Engineer {
  calculatePay() { return this.salary; }
}

class Salesman {
  calculatePay() { return this.salary + this.commission; }
}
```

## El ciclo de refactoring

```
1. Ejecuta los tests (deben pasar)
2. Haz UN cambio pequeño
3. Ejecuta los tests (deben pasar)
4. Repite
```

Nunca hagas múltiples refactorings sin verificar que los tests pasan entre cada uno.

## Cuándo refactorizar

Fowler sugiere la "regla del tres":

1. **Primera vez**: Solo hazlo
2. **Segunda vez**: Notas la duplicación, pero continúa
3. **Tercera vez**: Refactoriza

Fowler transformó el refactoring de "algo que haces cuando tienes tiempo" a "parte integral del desarrollo". Con tests, refactorizar deja de ser arriesgado y se convierte en higiene de código. Sin tests, es cirugía a ciegas.

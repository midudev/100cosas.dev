---
id: "79"
title: "Tests are the best documentation"
category: "Testing"
categoryColor: "text-yellow-400 bg-yellow-900/20"
author: "kent-beck"
---

Kent Beck sees tests as more than verification: **they're executable examples of how to use your code**.

## Tests as documentation

```javascript
describe('Cart', () => {
  it('adds items and calculates total', () => {
    const cart = new Cart();
    cart.add({ name: 'Laptop', price: 1000 });
    cart.add({ name: 'Mouse', price: 50 });
    
    expect(cart.total).toBe(1050);
  });
});

// These tests tell you exactly how to use Cart
// And unlike comments, they're always up to date
```

## Final reflection

Next time you write tests, think: "Would this help a new developer understand how to use this module?"

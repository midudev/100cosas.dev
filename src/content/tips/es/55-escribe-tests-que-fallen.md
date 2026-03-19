---
id: "55"
title: "Escribe tests que fallen, no tests que pasen"
category: "Testing"
categoryColor: "text-yellow-400 bg-yellow-900/20"
author: "kent-c-dodds"
---

Kent C. Dodds, creador de Testing Library y una de las voces más influyentes en testing de JavaScript, tiene un consejo que parece contradictorio: **"El valor de un test está en su capacidad de fallar"**.

## El problema de los tests que siempre pasan

```javascript
// ❌ Este test SIEMPRE pasa, incluso si el código está roto
test('user can login', () => {
  expect(true).toBe(true);
});

// ❌ Este test parece real pero no prueba nada útil
test('renders component', () => {
  render(<LoginForm />);
  expect(document.body).toBeTruthy();
});
```

Los tests inútiles dan falsa confianza. Es peor que no tener tests.

## El enfoque de Kent

Un buen test debe:
1. **Fallar cuando el código está roto**
2. **Pasar cuando el código funciona**
3. **Probar comportamiento, no implementación**

```javascript
// ✅ Test que prueba comportamiento real
test('user can fill and submit login form', async () => {
  const handleSubmit = jest.fn();
  render(<LoginForm onSubmit={handleSubmit} />);
  
  // Interactúa como lo haría un usuario
  await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
  await userEvent.type(screen.getByLabelText(/password/i), 'password123');
  await userEvent.click(screen.getByRole('button', { name: /log in/i }));
  
  // Verifica el comportamiento esperado
  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'user@example.com',
    password: 'password123'
  });
});
```

Si el botón deja de funcionar, el test falla. Si el email no se envía, el test falla. **El test falla cuando debe fallar**.

## La trampa del snapshot testing

```javascript
// ❌ Snapshot sin contexto
test('renders correctly', () => {
  const { container } = render(<UserProfile user={mockUser} />);
  expect(container).toMatchSnapshot();
});

// El problema: cuando cambia algo (incluso un espacio),
// el dev hace "u" para actualizar sin pensar
```

Los snapshots no te dicen **qué** debería pasar. Solo que algo cambió.

## Testing de implementación vs. comportamiento

```javascript
// ❌ Testing de implementación (frágil)
test('calls fetchUsers with correct params', () => {
  const spy = jest.spyOn(api, 'fetchUsers');
  renderHook(() => useUsers());
  expect(spy).toHaveBeenCalledWith({ page: 1, limit: 10 });
});
// Si refactorizas la implementación, el test rompe

// ✅ Testing de comportamiento (robusto)
test('displays users list', async () => {
  server.use(
    rest.get('/api/users', (req, res, ctx) => {
      return res(ctx.json([{ id: 1, name: 'Alice' }]));
    })
  );
  
  render(<UsersList />);
  
  expect(await screen.findByText('Alice')).toBeInTheDocument();
});
// El test pasa si los usuarios se muestran, sin importar cómo
```

## La pirámide de tests que fallan bien

```
       /\
      /E2E\      ← Pocos, pero fallan si la app está rota
     /------\
    /Integra-\   ← Prueban que las partes trabajan juntas
   /ción      \
  /------------\
 /   Unitarios  \  ← Muchos, rápidos, prueban lógica aislada
/----------------\
```

## Cómo verificar que tu test es útil

Antes de commitear un test, **rómpelo intencionalmente**:

```javascript
test('calculates total correctly', () => {
  // 1. Escribe el test
  expect(calculateTotal([10, 20, 30])).toBe(60);
  
  // 2. Cambia temporalmente la implementación
  // function calculateTotal(items) { return 0; }
  
  // 3. Verifica que el test FALLA
  
  // 4. Restaura la implementación
});
```

Si el test no falla cuando rompes el código, el test es inútil.

Kent nos recuerda que los tests no son un checkbox para marcar. Son guardias que protegen tu código. Un guardia que deja pasar a todos no sirve de nada. Escribe tests que fallen cuando las cosas van mal - ese es su trabajo.

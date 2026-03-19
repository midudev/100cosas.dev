---
id: "55"
title: "Write tests that fail, not tests that pass"
category: "Testing"
categoryColor: "text-yellow-400 bg-yellow-900/20"
author: "kent-c-dodds"
---

Kent C. Dodds, creator of Testing Library and one of the most influential voices in JavaScript testing, has advice that seems contradictory: **"The value of a test is in its ability to fail"**.

## The problem with tests that always pass

```javascript
// ❌ This test ALWAYS passes, even if the code is broken
test('user can login', () => {
  expect(true).toBe(true);
});

// ❌ This test looks real but doesn't test anything useful
test('renders component', () => {
  render(<LoginForm />);
  expect(document.body).toBeTruthy();
});
```

Useless tests give false confidence. It's worse than having no tests.

## Kent's approach

A good test should:
1. **Fail when the code is broken**
2. **Pass when the code works**
3. **Test behavior, not implementation**

```javascript
// ✅ Test that tests real behavior
test('user can fill and submit login form', async () => {
  const handleSubmit = jest.fn();
  render(<LoginForm onSubmit={handleSubmit} />);
  
  // Interact like a user would
  await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
  await userEvent.type(screen.getByLabelText(/password/i), 'password123');
  await userEvent.click(screen.getByRole('button', { name: /log in/i }));
  
  // Verify expected behavior
  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'user@example.com',
    password: 'password123'
  });
});
```

If the button stops working, the test fails. If the email isn't sent, the test fails. **The test fails when it should fail**.

## The snapshot testing trap

```javascript
// ❌ Snapshot without context
test('renders correctly', () => {
  const { container } = render(<UserProfile user={mockUser} />);
  expect(container).toMatchSnapshot();
});

// The problem: when something changes (even a space),
// the dev hits "u" to update without thinking
```

Snapshots don't tell you **what** should happen. Only that something changed.

## Implementation vs. behavior testing

```javascript
// ❌ Implementation testing (fragile)
test('calls fetchUsers with correct params', () => {
  const spy = jest.spyOn(api, 'fetchUsers');
  renderHook(() => useUsers());
  expect(spy).toHaveBeenCalledWith({ page: 1, limit: 10 });
});
// If you refactor the implementation, the test breaks

// ✅ Behavior testing (robust)
test('displays users list', async () => {
  server.use(
    rest.get('/api/users', (req, res, ctx) => {
      return res(ctx.json([{ id: 1, name: 'Alice' }]));
    })
  );
  
  render(<UsersList />);
  
  expect(await screen.findByText('Alice')).toBeInTheDocument();
});
// The test passes if users are displayed, regardless of how
```

## The test pyramid that fails well

```
       /\
      /E2E\      ← Few, but fail if the app is broken
     /------\
    /Integra-\   ← Test that parts work together
   /tion      \
  /------------\
 /    Unit      \  ← Many, fast, test isolated logic
/----------------\
```

## How to verify your test is useful

Before committing a test, **break it intentionally**:

```javascript
test('calculates total correctly', () => {
  // 1. Write the test
  expect(calculateTotal([10, 20, 30])).toBe(60);
  
  // 2. Temporarily change the implementation
  // function calculateTotal(items) { return 0; }
  
  // 3. Verify the test FAILS
  
  // 4. Restore the implementation
});
```

If the test doesn't fail when you break the code, the test is useless.

## Final reflection

Kent reminds us that tests aren't a checkbox to tick. They're guards that protect your code. A guard that lets everyone through is worthless. Write tests that fail when things go wrong - that's their job.

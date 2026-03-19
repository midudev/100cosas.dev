---
id: "67"
title: "Los errores son datos, no excepciones"
category: "Código Limpio"
categoryColor: "text-green-400 bg-green-900/20"
author: "rich-harris"
---

Rich Harris, además de crear Svelte, ha promovido un cambio en cómo pensamos sobre errores: **los errores no son excepciones inesperadas, son resultados posibles que debes manejar**.

## El problema de try/catch

```javascript
// ❌ Try/catch esconde el flujo de errores
async function getUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    return user;
  } catch (error) {
    // ¿Qué falló? ¿El fetch? ¿El JSON? ¿Algo más?
    console.error(error);
    return null;
  }
}

// El código que llama no sabe qué puede fallar
const user = await getUser(1);
if (!user) {
  // ¿No existe? ¿Error de red? ¿Servidor caído?
}
```

## Errores como datos

```javascript
// ✅ El error es parte del resultado
async function getUser(id) {
  const response = await fetch(`/api/users/${id}`);
  
  if (!response.ok) {
    return { 
      ok: false, 
      error: { 
        type: 'http', 
        status: response.status,
        message: `Failed to fetch user: ${response.statusText}`
      } 
    };
  }
  
  try {
    const user = await response.json();
    return { ok: true, data: user };
  } catch {
    return { 
      ok: false, 
      error: { type: 'parse', message: 'Invalid JSON response' } 
    };
  }
}

// Ahora el código que llama puede manejar cada caso
const result = await getUser(1);

if (!result.ok) {
  switch (result.error.type) {
    case 'http':
      if (result.error.status === 404) showNotFound();
      else showServerError();
      break;
    case 'parse':
      showCorruptDataError();
      break;
  }
  return;
}

// Aquí result.data existe con certeza
displayUser(result.data);
```

## El patrón Result

```typescript
// Define un tipo Result genérico
type Result<T, E = Error> = 
  | { ok: true; data: T }
  | { ok: false; error: E };

// Úsalo en tus funciones
async function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return { ok: false, error: 'Cannot divide by zero' };
  }
  return { ok: true, data: a / b };
}

// Type-safe: TypeScript sabe cuándo existe data
const result = await divide(10, 2);
if (result.ok) {
  console.log(result.data); // TypeScript sabe que es number
} else {
  console.log(result.error); // TypeScript sabe que es string
}
```

## Por qué es mejor

### 1. Errores visibles

```javascript
// Con try/catch, los errores son invisibles en la firma
function riskyOperation(): User  // ¿Puede fallar? No sabes

// Con Result, los errores son explícitos
function riskyOperation(): Result<User, NetworkError | ParseError>
```

### 2. Manejo forzado

```javascript
// Try/catch permite ignorar errores
try {
  doSomething();
} catch {} // 🙈 Error silenciado

// Result obliga a manejar
const result = doSomething();
if (!result.ok) {
  // Tienes que hacer algo con el error
}
```

### 3. Composición

```javascript
// Encadenar operaciones que pueden fallar
const result = await validateInput(input)
  .andThen(processData)
  .andThen(saveToDatabase)
  .andThen(sendNotification);

if (!result.ok) {
  // Sabes exactamente dónde falló
}
```

## Reflexión final

Rich y otros han traído esta idea de lenguajes como Rust y Go. Tratar errores como datos, no como excepciones, hace que tu código sea más predecible, más fácil de testear, y más difícil de ignorar accidentalmente.

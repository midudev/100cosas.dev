---
id: "66"
title: "Explícito es mejor que implícito"
category: "Fundamentos"
categoryColor: "text-purple-400 bg-purple-900/20"
author: "guido-van-rossum"
---

Guido van Rossum, creador de Python, incluyó esta perla en el Zen de Python: **"Explicit is better than implicit"**. Y aplica a todo código, no solo Python.

## Lo implícito es mágico (y peligroso)

```javascript
// ❌ Magia implícita
import { magicConfig } from './config';

function processUser(user) {
  // ¿De dónde viene LOCALE? ¿Y API_URL?
  const name = formatName(user.name, LOCALE);
  const response = await fetch(API_URL + '/users');
  // ...
}

// ¿Qué necesita esta función? No lo sabes sin leer todo el código
```

## Lo explícito es claro

```javascript
// ✅ Dependencias explícitas
function processUser(user, { locale, apiUrl }) {
  const name = formatName(user.name, locale);
  const response = await fetch(`${apiUrl}/users`);
  // ...
}

// Uso:
processUser(user, {
  locale: 'es-ES',
  apiUrl: 'https://api.example.com'
});

// Ahora sabes exactamente qué necesita la función
```

## Ejemplos en diferentes contextos

### Imports

```javascript
// ❌ Implícito: ¿qué estoy importando?
import * as utils from './utils';
utils.something();

// ✅ Explícito: claro qué uso
import { formatDate, parseJSON } from './utils';
```

### Props en React

```jsx
// ❌ Implícito: spread de props desconocidas
function Button(props) {
  return <button {...props} />;
}

// ✅ Explícito: props documentadas
function Button({ onClick, disabled, children, variant = 'primary' }) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
}
```

### Tipos

```typescript
// ❌ Implícito: any silencioso
function process(data) {
  return data.map(item => item.value);
}

// ✅ Explícito: tipos claros
interface Item {
  id: string;
  value: number;
}

function process(data: Item[]): number[] {
  return data.map(item => item.value);
}
```

### Return values

```javascript
// ❌ Implícito: ¿qué devuelve esto?
async function getUser(id) {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) return;  // undefined implícito
  return res.json();
}

// ✅ Explícito: todos los casos claros
async function getUser(id): Promise<User | null> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) {
    return null;  // Caso de error explícito
  }
  return res.json();
}
```

## El coste de lo implícito

1. **Debugging más difícil**: "¿De dónde viene este valor?"
2. **Onboarding más lento**: Nuevos devs no entienden las convenciones
3. **Tests más frágiles**: Dependencias ocultas rompen tests
4. **Refactoring peligroso**: No sabes qué depende de qué

## El beneficio de lo explícito

1. **El código se documenta solo**
2. **Los errores son obvios**
3. **IDE autocomplete funciona**
4. **Tests son más fáciles de escribir**

Guido creó Python con la legibilidad como prioridad. Lo explícito requiere más caracteres pero ahorra horas de debugging y confusion. Cuando dudas entre ser clever e implícito o ser verbose y explícito, elige explícito.

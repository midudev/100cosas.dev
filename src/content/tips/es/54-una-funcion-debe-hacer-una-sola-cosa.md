---
id: "54"
title: "Una función debe hacer una sola cosa y hacerla bien"
category: "Código Limpio"
categoryColor: "text-green-400 bg-green-900/20"
author: "robert-c-martin"
---

Robert C. Martin, conocido como "Uncle Bob", ha pasado décadas enseñando un principio aparentemente simple: **las funciones deben hacer una sola cosa**. Suena obvio, pero la realidad es que lo violamos constantemente.

## ¿Qué significa "una sola cosa"?

No es el número de líneas. Es el nivel de abstracción.

```javascript
// ❌ Esta función hace "una cosa" pero son realmente varias
function processUserRegistration(userData) {
  // Validación
  if (!userData.email || !userData.password) {
    throw new Error('Missing fields');
  }
  if (userData.password.length < 8) {
    throw new Error('Password too short');
  }
  
  // Hashing
  const salt = crypto.randomBytes(16);
  const hash = crypto.pbkdf2Sync(userData.password, salt, 1000, 64, 'sha512');
  
  // Persistencia
  const user = {
    email: userData.email,
    passwordHash: hash.toString('hex'),
    salt: salt.toString('hex'),
    createdAt: new Date()
  };
  database.users.insert(user);
  
  // Notificación
  emailService.send({
    to: userData.email,
    subject: 'Welcome!',
    body: 'Thanks for registering...'
  });
  
  return user;
}
```

## El mismo código, refactorizado

```javascript
// ✅ Cada función hace UNA cosa
function registerUser(userData) {
  validateUserData(userData);
  const user = createUser(userData);
  saveUser(user);
  sendWelcomeEmail(user);
  return user;
}

function validateUserData(data) {
  if (!data.email || !data.password) {
    throw new ValidationError('Missing required fields');
  }
  if (data.password.length < 8) {
    throw new ValidationError('Password must be at least 8 characters');
  }
}

function createUser(data) {
  return {
    email: data.email,
    ...hashPassword(data.password),
    createdAt: new Date()
  };
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512');
  return {
    passwordHash: hash.toString('hex'),
    salt: salt.toString('hex')
  };
}

function saveUser(user) {
  database.users.insert(user);
}

function sendWelcomeEmail(user) {
  emailService.send({
    to: user.email,
    subject: 'Welcome!',
    body: 'Thanks for registering...'
  });
}
```

## ¿Por qué importa?

### 1. Testeabilidad

```javascript
// Ahora puedes testear cada parte independientemente
describe('validateUserData', () => {
  it('throws on missing email', () => {
    expect(() => validateUserData({ password: '12345678' }))
      .toThrow('Missing required fields');
  });
});

describe('hashPassword', () => {
  it('returns hash and salt', () => {
    const result = hashPassword('mypassword');
    expect(result).toHaveProperty('passwordHash');
    expect(result).toHaveProperty('salt');
  });
});
```

### 2. Reusabilidad

```javascript
// hashPassword ahora se puede usar en:
// - Registro
// - Cambio de contraseña
// - Reset de contraseña
```

### 3. Legibilidad

```javascript
// La función principal ahora es una "tabla de contenidos"
function registerUser(userData) {
  validateUserData(userData);  // Paso 1
  const user = createUser(userData);  // Paso 2
  saveUser(user);  // Paso 3
  sendWelcomeEmail(user);  // Paso 4
  return user;
}
```

## La regla del "AND"

Si puedes describir lo que hace tu función usando "AND", hace demasiado:

```markdown
❌ "Esta función valida los datos AND hashea la contraseña AND guarda el usuario AND envía el email"

✅ "Esta función valida los datos del usuario"
✅ "Esta función hashea una contraseña"
✅ "Esta función guarda un usuario"
✅ "Esta función envía el email de bienvenida"
```

## El contraargumento

"Pero tengo 20 funciones pequeñas en vez de 1 grande"

Sí, y cada una:
- Tiene un nombre descriptivo
- Hace exactamente lo que dice
- Es fácil de testear
- Es fácil de modificar
- Es fácil de reusar

Uncle Bob dice que "el primer borrador es siempre malo". Es normal escribir funciones grandes primero. La disciplina está en refactorizarlas después. Cada vez que uses "and" para describir lo que hace una función, considera dividirla.

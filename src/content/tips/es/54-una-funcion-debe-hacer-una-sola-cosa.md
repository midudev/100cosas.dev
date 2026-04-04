---
id: "54"
title: "Una función debe hacer una sola cosa y hacerla bien"
category: "Código Limpio"
categoryColor: "text-green-400 bg-green-900/20"
author: "robert-c-martin"
---

Robert C. Martin, conocido como "Uncle Bob", ha pasado décadas enseñando un principio aparentemente simple: **las funciones deben hacer una sola cosa**. Suena obvio, pero la realidad es que lo violamos constantemente, muchas veces sin darnos cuenta.

Este principio no es capricho. Es probablemente la técnica más efectiva para escribir código que se pueda leer, testear y mantener a lo largo del tiempo. Si solo pudieras aplicar una regla de código limpio, que sea esta.

## ¿Qué significa "una sola cosa"?

Aquí es donde la mayoría se confunde. **No es el número de líneas**. Una función de 3 líneas puede hacer demasiado, y una de 15 puede hacer exactamente una cosa.

La clave está en el **nivel de abstracción**. Una función hace "una sola cosa" cuando todas sus operaciones están al mismo nivel de abstracción y sirven a un único propósito.

```javascript
// ❌ Esta función hace "una cosa" pero son realmente varias
function processUserRegistration(userData) {
  // Validación (nivel bajo)
  if (!userData.email || !userData.password) {
    throw new Error('Missing fields');
  }
  if (userData.password.length < 8) {
    throw new Error('Password too short');
  }

  // Hashing (nivel muy bajo, criptográfico)
  const salt = crypto.randomBytes(16);
  const hash = crypto.pbkdf2Sync(
    userData.password, salt, 1000, 64, 'sha512'
  );

  // Persistencia (nivel medio, infraestructura)
  const user = {
    email: userData.email,
    passwordHash: hash.toString('hex'),
    salt: salt.toString('hex'),
    createdAt: new Date()
  };
  database.users.insert(user);

  // Notificación (nivel medio, servicio externo)
  emailService.send({
    to: userData.email,
    subject: 'Welcome!',
    body: 'Thanks for registering...'
  });

  return user;
}
```

¿Ves el problema? La función mezcla **cuatro niveles de abstracción** distintos: validación de datos, criptografía, persistencia en base de datos y envío de emails. Cada bloque requiere un contexto mental completamente diferente para entenderlo.

## La metáfora del periódico

Uncle Bob usa una metáfora brillante: tu código debe leerse como un **artículo de periódico**. Arriba, el titular (la función principal) te da una visión general. Debajo, cada sección profundiza en los detalles.

```javascript
// ✅ El "titular": se lee en 5 segundos y lo entiendes todo
function registerUser(userData) {
  validateUserData(userData);
  const user = createUser(userData);
  saveUser(user);
  sendWelcomeEmail(user);
  return user;
}
```

Leyendo solo esta función ya sabes exactamente qué hace el registro: validar, crear, guardar, notificar. No necesitas leer más a menos que quieras saber **cómo** se hace cada paso.

## Los detalles, cada uno en su sitio

```javascript
function validateUserData({ email, password }) {
  if (!email) {
    throw new ValidationError('Email is required');
  }
  if (!password) {
    throw new ValidationError('Password is required');
  }
  if (password.length < 8) {
    throw new ValidationError(
      'Password must be at least 8 characters'
    );
  }
}

function createUser({ email, password }) {
  return {
    email,
    ...hashPassword(password),
    createdAt: new Date()
  };
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.pbkdf2Sync(
    password, salt, 1000, 64, 'sha512'
  );
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

Cada función opera en **un solo nivel de abstracción**. `validateUserData` solo valida. `hashPassword` solo hashea. No hay mezcla, no hay sorpresas.

## ¿Por qué importa tanto?

### 1. Testeabilidad

Con la función monolítica, para testear la validación necesitas montar la base de datos, un servicio de email y la librería de criptografía. Con funciones separadas, cada test es quirúrgico:

```javascript
describe('validateUserData', () => {
  it('throws on missing email', () => {
    expect(() => validateUserData({ password: '12345678' }))
      .toThrow('Email is required');
  });

  it('throws on short password', () => {
    expect(() => validateUserData({
      email: 'a@b.com',
      password: '123'
    })).toThrow('at least 8 characters');
  });

  it('passes with valid data', () => {
    expect(() => validateUserData({
      email: 'a@b.com',
      password: '12345678'
    })).not.toThrow();
  });
});

describe('hashPassword', () => {
  it('returns different hashes for same password', () => {
    const a = hashPassword('mypassword');
    const b = hashPassword('mypassword');
    expect(a.passwordHash).not.toBe(b.passwordHash);
  });

  it('returns hash and salt as hex strings', () => {
    const result = hashPassword('mypassword');
    expect(result.passwordHash).toMatch(/^[a-f0-9]+$/);
    expect(result.salt).toMatch(/^[a-f0-9]+$/);
  });
});
```

Sin mocks complejos, sin setup de infraestructura. Tests rápidos, fiables y fáciles de escribir.

### 2. Reusabilidad real

Cuando `hashPassword` es su propia función, de repente la puedes usar en sitios que ni imaginabas cuando la escribiste:

```javascript
// En el registro
const user = createUser(userData);

// En el cambio de contraseña
function changePassword(userId, newPassword) {
  const hashed = hashPassword(newPassword);
  database.users.update(userId, hashed);
}

// En el reset de contraseña
function resetPassword(token, newPassword) {
  const userId = verifyResetToken(token);
  const hashed = hashPassword(newPassword);
  database.users.update(userId, hashed);
}
```

Si `hashPassword` estuviera enterrada dentro de `processUserRegistration`, tendrías que duplicar la lógica de hashing en cada sitio. O peor: copiar y pegar.

### 3. Legibilidad como documentación

La función principal se convierte en una **tabla de contenidos** que cualquier persona del equipo puede leer en segundos:

```javascript
function registerUser(userData) {
  validateUserData(userData);
  const user = createUser(userData);
  saveUser(user);
  sendWelcomeEmail(user);
  return user;
}
```

No necesitas comentarios explicando qué hace cada bloque. **Los nombres de las funciones son los comentarios.** Esto es especialmente valioso cuando alguien nuevo se une al equipo: puede entender el flujo completo sin leer los detalles de implementación.

### 4. Cambios sin miedo

Un día tu equipo decide migrar de `pbkdf2` a `argon2`. Con funciones separadas, tocas **un solo archivo** y el resto del sistema ni se entera:

```javascript
// Antes
function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.pbkdf2Sync(
    password, salt, 1000, 64, 'sha512'
  );
  return { passwordHash: hash.toString('hex'), salt: salt.toString('hex') };
}

// Después
async function hashPassword(password) {
  const hash = await argon2.hash(password);
  return { passwordHash: hash };
}
```

Con la función monolítica, ese cambio sería como hacer una operación a corazón abierto: tocarías una función enorme con miedo a romper la validación o el envío de emails.

## La regla del "AND"

Si puedes describir lo que hace tu función usando **"AND"**, hace demasiado:

```markdown
❌ "Esta función valida los datos AND hashea la contraseña
    AND guarda el usuario AND envía el email"

✅ "Esta función registra un usuario" (alto nivel, orquesta)
✅ "Esta función valida los datos del usuario"
✅ "Esta función hashea una contraseña"
✅ "Esta función guarda un usuario en la base de datos"
✅ "Esta función envía el email de bienvenida"
```

Hay una excepción importante: la función que **orquesta** (como `registerUser`) sí hace "varias cosas", pero todas al mismo nivel de abstracción. Su responsabilidad es **coordinar**, y eso es "una sola cosa".

## Un ejemplo más cotidiano

No todo es registro de usuarios. Mira este código típico en un componente:

```javascript
// ❌ Función que hace demasiado
function renderDashboard(data) {
  const filtered = data.filter(item => item.active && !item.deleted);
  const sorted = filtered.sort((a, b) => b.date - a.date);
  const grouped = {};
  for (const item of sorted) {
    const key = item.category;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  }
  const html = Object.entries(grouped).map(([cat, items]) =>
    `<section><h2>${cat}</h2>${items.map(i =>
      `<div class="${i.priority > 5 ? 'urgent' : ''}">${i.name}</div>`
    ).join('')}</section>`
  ).join('');
  document.getElementById('dashboard').innerHTML = html;
}
```

Compara con:

```javascript
// ✅ Cada función tiene un propósito claro
function renderDashboard(data) {
  const activeItems = getActiveItems(data);
  const sorted = sortByDate(activeItems);
  const grouped = groupByCategory(sorted);
  const html = buildDashboardHTML(grouped);
  mountHTML('dashboard', html);
}

function getActiveItems(items) {
  return items.filter(item => item.active && !item.deleted);
}

function sortByDate(items) {
  return [...items].sort((a, b) => b.date - a.date);
}

function groupByCategory(items) {
  return Object.groupBy(items, item => item.category);
}
```

La segunda versión no solo es más legible. Si mañana cambias el criterio de "activo", tocas una función. Si cambias el orden, tocas otra. Cada cambio es **quirúrgico**.

## Cuándo NO dividir

Esto es igual de importante. No caigas en el extremo opuesto:

```javascript
// ❌ Sobre-ingeniería absurda
function addOne(n) {
  return n + 1;
}

function isGreaterThanZero(n) {
  return n > 0;
}

function getLength(arr) {
  return arr.length;
}
```

No extraigas una función si:

- Solo se usa una vez y la operación es trivial
- El nombre de la función no aporta más claridad que el código en sí
- Genera un nivel de indirección que dificulta seguir el flujo

La pregunta clave es: **¿el nombre de la función comunica mejor la intención que el código que reemplaza?** Si la respuesta es no, déjalo inline.

## El primer borrador siempre es grande

Uncle Bob dice algo liberador: **"el primer borrador es siempre malo"**. Es perfectamente normal escribir una función grande y desordenada cuando estás pensando en el problema. La creatividad necesita libertad.

La disciplina no está en escribir funciones perfectas de entrada. Está en **volver después y refactorizar**. Escribe la función grande, haz que funcione, y luego pregúntate: "¿puedo describir esto sin usar AND?"

Cada vez que la respuesta sea sí, ya sabes qué hacer.

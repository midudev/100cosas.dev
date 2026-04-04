---
id: "98"
title: "Haz que el camino correcto sea el camino fácil"
category: "Arquitectura"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "jeff-atwood"
---

Jeff Atwood, co-fundador de Stack Overflow y autor del blog *Coding Horror*, popularizó un concepto que Rico Mariani acuñó en Microsoft: **el "Pit of Success"** (el pozo del éxito). La idea es sencilla pero transformadora: diseña tus sistemas para que los usuarios caigan naturalmente en hacer lo correcto, sin esfuerzo extra.

## El pozo del éxito vs el pozo del fracaso

La mayoría de sistemas están diseñados al revés. Hacer las cosas correctamente requiere esfuerzo, disciplina y conocimiento. Hacer las cosas mal es el camino de menor resistencia. En un sistema bien diseñado, la gravedad trabaja a tu favor: el estado por defecto es seguro, y hacer algo incorrecto requiere un esfuerzo deliberado.

## Defaults seguros: la primera línea de defensa

Una cookie de sesión creada como template literal no tiene `HttpOnly`, `Secure` ni `SameSite`. Una consulta SQL con interpolación de strings es vulnerable a inyección. En ambos casos, hacer lo inseguro es el camino más corto. La solución es invertir la ecuación:

```javascript
// ✅ La función segura es la más fácil de usar
function createSessionCookie(token) {
  return `session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/`;
}

// ✅ Un ORM donde la inyección SQL es imposible
function getUser(id) {
  return prisma.user.findUnique({ where: { id } });
}
```

Cuando la API segura es tan fácil (o más) que la insegura, la gente la usa sin pensarlo.

## TypeScript: errores por defecto

TypeScript es un ejemplo brillante de Pit of Success. Con `strict: true`, el compilador te obliga a manejar los casos que normalmente ignorarías:

```typescript
// ❌ JavaScript: el camino feliz compila siempre
function getDiscount(user) {
  return user.membership.discount;
  // ¿Y si user es null? ¿Y si membership no existe?
  // Lo descubrirás en producción a las 3 AM
}

// ✅ TypeScript strict: te obliga a pensar en los edge cases
function getDiscount(user: User | null): number {
  return user?.membership?.discount ?? 0;
}
```

El compilador es tu red de seguridad. No te deja caer en el pozo del fracaso sin una decisión consciente (un `as any` o un `@ts-ignore` que es fácil de detectar en code review).

## Linters y formatters: automatiza las reglas

```json
{
  "rules": {
    "no-console": "error",
    "eqeqeq": "error",
    "no-eval": "error",
    "prefer-const": "error",
    "no-var": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/strict-boolean-expressions": "error"
  }
}
```

Con estas reglas, hacer lo incorrecto genera un error inmediato. No hace falta que el desarrollador "recuerde" no usar `var` o `eval`. El tooling lo impide automáticamente.

## Pre-commit hooks: la última barrera

Un pre-commit hook con `lint-staged` ejecuta ESLint y Prettier automáticamente sobre cada archivo antes del commit. El código que no pasa lint **no puede entrar al repositorio**. No es una sugerencia, es una barrera física. El camino fácil —hacer commit— solo funciona si el código cumple las reglas.

## Operaciones peligrosas: hazlas explícitas

```typescript
// ❌ Borrar es tan fácil como crear
async function deleteUser(id: string) {
  await db.users.delete({ where: { id } });
}

// ✅ Requiere confirmación explícita, registra auditoría, usa soft delete
async function deleteUser(
  id: string,
  confirmation: { confirm: true; reason: string }
) {
  if (!confirmation.confirm) {
    throw new Error('Deletion requires explicit confirmation');
  }
  await db.auditLog.create({
    data: { action: 'USER_DELETED', targetId: id, reason: confirmation.reason }
  });
  await db.users.update({
    where: { id },
    data: { deletedAt: new Date(), deletedReason: confirmation.reason }
  });
}
```

El borrado "real" no existe. Es un soft delete con audit log. Para hacer un hard delete tendrías que ir directamente a la base de datos, que es exactamente el nivel de fricción que una operación irreversible merece.

## CI como guardián: código malo no pasa

El pipeline de CI extiende esa misma filosofía a la rama principal: type checking con `tsc --noEmit`, lint con cero warnings, tests con umbral de cobertura y auditoría de seguridad. Cada check que añades es un guardarraíl más. No confías en que la gente haga lo correcto por disciplina. Confías en que **el sistema no les deja hacer lo incorrecto** sin un esfuerzo deliberado.

## Diseño de APIs: guía al usuario hacia el éxito

```typescript
// ❌ API que permite errores silenciosos
function createServer(port: number, host?: string, ssl?: boolean,
  cert?: string, key?: string, timeout?: number) {
  // ¿Qué pasa si pones ssl=true pero no pasas cert?
  // Silenciosamente no usa SSL. Sorpresa.
}

// ✅ API que hace imposible los estados inválidos
type ServerConfig =
  | { ssl: false; port: number; host?: string }
  | { ssl: true; port: number; host?: string; cert: string; key: string };

function createServer(config: ServerConfig) {
  // Si ssl es true, TypeScript GARANTIZA que cert y key existen
}
```

Este patrón — **hacer que los estados inválidos sean irrepresentables** — es una de las aplicaciones más potentes del Pit of Success. Si el tipo no permite una combinación incorrecta, nadie puede usarla por accidente.

## El principio en la vida real

Jeff Atwood lo resume así: si un error es posible, alguien lo cometerá. No es pesimismo, es estadística. Con suficientes desarrolladores y suficiente tiempo, todo lo que pueda salir mal, saldrá mal. Tu trabajo como arquitecto no es escribir documentación diciendo "no hagas esto". Tu trabajo es **diseñar sistemas donde "esto" sea imposible**, o al menos muy difícil.

No confíes en la disciplina. No confíes en la documentación. No confíes en la memoria. Confía en el diseño. Haz que el camino correcto sea el camino fácil, y la gente lo recorrerá sin siquiera darse cuenta de que estás guiándoles.

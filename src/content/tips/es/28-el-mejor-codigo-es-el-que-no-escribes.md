---
id: "28"
title: "El mejor código es el que no tienes que escribir"
category: "Minimalismo"
categoryColor: "text-lime-400 bg-lime-900/20"
author: "jeff-atwood"
---

**Jeff Atwood**, co-fundador de Stack Overflow, popularizó una idea que debería estar en el ADN de todo desarrollador: **"The best code is no code at all."**

El mejor código es el que no existe. Cada línea de código que escribes es una línea que puede tener bugs, que necesita tests, que requiere documentación y que alguien tendrá que mantener. La forma más efectiva de evitar todos estos problemas es, simplemente, no escribir ese código.

## El código como lastre

Atwood, a través de su blog *Coding Horror*, ha argumentado durante años que los desarrolladores tienen una tendencia peligrosa: **escribir código innecesario**. No porque sean malos profesionales, sino porque escribir código es lo que saben hacer, es lo que les gusta y es lo que les hace sentir productivos.

Pero la verdadera productividad no se mide en líneas escritas, sino en **problemas resueltos con el mínimo código posible**.

## Las preguntas que deberías hacerte

Antes de escribir cualquier código nuevo, pasa por este filtro mental:

### 1. ¿Realmente necesito esta funcionalidad?

```typescript
// ❌ Funcionalidad "por si acaso"
interface UserSettings {
  theme: 'light' | 'dark' | 'system' | 'high-contrast' | 'sepia';
  fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  reducedMotion: boolean;
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  // ... 20 opciones más que nadie ha pedido
}

// ✅ Lo que realmente necesitan los usuarios
interface UserSettings {
  theme: 'light' | 'dark' | 'system';
}

// El resto se puede añadir cuando haya demanda real.
```

### 2. ¿Ya existe una solución?

Antes de escribir tu propio sistema de validación, ¿has mirado Zod? Antes de crear tu framework de testing, ¿has probado Vitest? Antes de implementar autenticación desde cero, ¿conoces Auth.js?

```typescript
// ❌ 200 líneas de validación "personalizada"
function validateEmail(email: string): boolean {
  // Regex complejo que probablemente tiene bugs
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function validatePhone(phone: string): boolean {
  // Otra regex que no maneja todos los casos internacionales
  // ...
}

// ... y así 200 líneas más

// ✅ Una librería probada por miles de proyectos
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/), // E.164 format
});
```

### 3. ¿Puedo resolver el problema eliminando código?

A veces la mejor solución es **borrar**. Una feature que nadie usa, un caso borde que nunca ocurre, una abstracción que complica más de lo que simplifica.

```typescript
// ❌ ANTES: Sistema complejo de permisos
class PermissionManager {
  private roleHierarchy: Map<string, string[]>;
  private permissionCache: Map<string, boolean>;
  private inheritanceRules: InheritanceRule[];
  
  canAccess(user: User, resource: Resource, action: Action): boolean {
    // 150 líneas de lógica compleja
  }
}

// ✅ DESPUÉS: Resulta que solo hay dos roles
function canAccess(user: User, resource: Resource): boolean {
  if (user.role === 'admin') return true;
  return resource.ownerId === user.id;
}

// Borramos 200 líneas. El sistema es más rápido, más seguro y más fácil de entender.
```

## El coste oculto del código

Jeff Atwood lo resume así en su blog:

> "Every line of code you write is a line of code you have to debug. Every line of code you write is a line of code you have to read when you're trying to figure out why something doesn't work. Every line of code you write is a line of code you have to explain to the next developer."

Cada línea tiene un coste:

| Aspecto | Coste por línea |
|---------|-----------------|
| **Bugs** | Más código = más superficie para errores |
| **Tests** | Más código = más tests necesarios |
| **Documentación** | Más código = más que explicar |
| **Onboarding** | Más código = más que aprender |
| **Refactoring** | Más código = más que cambiar |

## El arte de no hacer

Los mejores desarrolladores no son los que escriben más código, sino los que resuelven más problemas. A veces eso significa escribir código elegante. Otras veces significa convencer al product manager de que esa feature no es necesaria. Y muchas veces significa usar una librería existente en lugar de reinventar la rueda.

Como dice Atwood: **"El mejor código es el código que no tienes que mantener."** Y la única forma de no mantener código es no escribirlo en primer lugar.

La próxima vez que estés a punto de crear un nuevo archivo, pregúntate: ¿Realmente necesito este código? ¿O hay una forma de resolver el problema sin él?

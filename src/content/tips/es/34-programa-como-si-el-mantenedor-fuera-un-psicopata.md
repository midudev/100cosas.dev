---
id: "34"
title: "Programa como si el mantenedor fuera un psicópata que sabe dónde vives"
category: "Mantenibilidad"
categoryColor: "text-emerald-400 bg-emerald-900/20"
author: "john-woods"
---

Esta frase, atribuida a **John Woods** y popularizada en los foros de Usenet en los años 90, es quizás la advertencia más visceral sobre la importancia del código mantenible: **"Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live."**

Programa siempre como si la persona que va a mantener tu código fuera un psicópata violento que sabe dónde vives.

Es humor negro, sí. Pero bajo la superficie hay una verdad profunda: **el código que escribes hoy será el problema de alguien mañana**. Y ese "alguien" tiene todo el derecho de estar furioso si le dejas un desastre.

## El mantenedor eres tú (probablemente)

La ironía es que, estadísticamente, el "psicópata violento" que mantendrá tu código serás tú mismo dentro de seis meses. Serás tú a las 2 de la mañana con un incidente en producción. Serás tú intentando recordar qué demonios hacía esa función que escribiste "temporalmente" hace un año.

```typescript
// ❌ Código que te hará querer cometer un crimen
function x(a: any[], b: number, c?: boolean) {
  return c ? a.filter((_, i) => i % b === 0).map(x => x * 2) 
           : a.reduce((p, c, i) => i % b ? p : [...p, c], []);
}

// Dentro de 6 meses: "¿Qué es 'a'? ¿Qué hace 'b'? ¿Por qué existe 'c'?"
// Tu yo del futuro quiere palabras contigo.
```

```typescript
// ✅ Código que preserva tu integridad física
type FilterStrategy = 'doubled' | 'raw';

function getEveryNthElement<T extends number>(
  items: T[],
  interval: number,
  strategy: FilterStrategy = 'raw'
): T[] {
  const filteredItems = items.filter((_, index) => index % interval === 0);
  
  if (strategy === 'doubled') {
    return filteredItems.map(item => (item * 2) as T);
  }
  
  return filteredItems;
}

// Tu yo del futuro te lo agradecerá. Y no sabrá tu dirección.
```

## Las señales del código "asesino"

El código que invita a la violencia tiene características reconocibles:

### 1. Nombres que requieren un decodificador

```typescript
// ❌ Crímenes contra la humanidad
const d = new Date();
const x = u.p - d.getTime();
const r = x > 0 ? 'v' : 'e';

// ✅ Paz y armonía
const now = new Date();
const timeUntilExpiration = user.premiumExpiresAt - now.getTime();
const subscriptionStatus = timeUntilExpiration > 0 ? 'valid' : 'expired';
```

### 2. Funciones que hacen 47 cosas

```typescript
// ❌ Un atentado en forma de función
function processUserData(user: User) {
  // 200 líneas que validan, transforman, guardan en BD,
  // envían emails, actualizan caché, llaman a 3 APIs externas,
  // generan reportes y hacen café
}

// ✅ Funciones que no provocan ira
function validateUser(user: User): ValidationResult { /* ... */ }
function saveUser(user: User): Promise<void> { /* ... */ }
function notifyUser(user: User): Promise<void> { /* ... */ }
```

### 3. Efectos secundarios ocultos

```typescript
// ❌ Sorpresa... te he mutado todo
function getFormattedName(user: User): string {
  user.lastAccessed = new Date(); // ¿¡QUÉ?!
  globalCache.invalidate(user.id); // ¿¡POR QUÉ AQUÍ?!
  return `${user.firstName} ${user.lastName}`;
}

// ✅ Sin sorpresas desagradables
function getFormattedName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}

function recordUserAccess(userId: string): void {
  // Claramente separado, claramente intencionado
}
```

## La empatía como práctica profesional

Escribir código mantenible no es solo una habilidad técnica; es un acto de **empatía**. Es pensar en la persona que vendrá después (que podrías ser tú) y preguntarte:

1. ¿Entenderá qué hace esto?
2. ¿Podrá modificarlo sin romper algo?
3. ¿Sabrá por qué tomé esta decisión?
4. ¿Querrá hacerme daño después de leerlo?

Si la respuesta a la última pregunta es "sí", refactoriza.

## El código como legado

Cada línea que escribes es un mensaje al futuro. Puede ser un regalo o puede ser una maldición. Los desarrolladores profesionales eligen conscientemente dejar un legado que no avergüence.

```typescript
// El código cuenta una historia
// ¿Cuál quieres que sea la tuya?

// Historia A: "El desarrollador anterior era un genio incomprendido 
// cuyo código es tan críptico que nadie puede tocarlo"

// Historia B: "El desarrollador anterior era un profesional 
// cuyo código es tan claro que cualquiera puede mejorarlo"
```

## La regla de oro del mantenedor

Antes de hacer commit, lee tu código como si fueras otra persona. Mejor aún: imagina que eres alguien que acaba de unirse al equipo, es viernes a las 5 de la tarde, hay un bug crítico en producción, y este código es lo único que tienes para resolverlo.

Si en esa situación querrías golpear al autor, **eres tú quien debe cambiar el código ahora**.

Porque recuerda: **el psicópata violento que sabe dónde vives puede que seas tú mismo dentro de seis meses**. Trátate bien.

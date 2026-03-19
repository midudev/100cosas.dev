---
id: "73"
title: "El estado mutable es la raíz de todos los males"
category: "Arquitectura"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "rich-harris"
---

**Rich Harris, el creador de Svelte y Rollup, tiene una relación fascinante con el estado mutable: lo usa con maestría en sus herramientas, pero advierte constantemente sobre su peligro.** Como dijo en una de sus charlas: *"La mutabilidad no es el enemigo. El enemigo es la mutabilidad que no puedes rastrear."*

Harris no es un purista funcional que predique la inmutabilidad absoluta. Su enfoque es más pragmático y, por eso, más útil: entiende que el estado mutable es inevitable en las aplicaciones del mundo real, pero que cada pieza de estado mutable que añades es un vector de bugs potenciales. La clave no es eliminarlo, sino **controlarlo con mano de hierro**.

## Por qué el estado mutable genera bugs

El problema fundamental del estado mutable es que rompe la capacidad de razonar localmente sobre el código. Cuando una variable puede ser modificada desde cualquier parte del programa, necesitas entender *todo* el programa para predecir su valor en un momento dado.

```typescript
// ❌ Estado mutable compartido: una receta para el desastre
let currentUser: User | null = null;
let isLoading = false;
let errorMessage = '';
let notifications: Notification[] = [];

async function login(credentials: Credentials) {
  isLoading = true;
  errorMessage = '';
  try {
    currentUser = await authService.login(credentials);
    notifications = await fetchNotifications(currentUser.id);
  } catch (e) {
    errorMessage = e.message;
    currentUser = null;
  }
  isLoading = false;
}

// Mientras login() se ejecuta, otro evento llama a:
function clearSession() {
  currentUser = null;
  notifications = [];
}

// Resultado: login() completa, sobreescribe el null de clearSession,
// y ahora hay un usuario "logueado" con una sesión supuestamente cerrada.
```

Este tipo de bug no aparece en tus tests unitarios. Aparece a las 3 de la mañana en producción cuando dos acciones del usuario se solapan en el tiempo. Y como el estado mutó en un orden inesperado, el sistema queda en un estado que **ninguna de tus funciones pretendía crear**.

## El enfoque de Svelte: reactividad con control

Lo brillante de Svelte es cómo aborda este problema. En lugar de prohibir la mutación (como hace React con su modelo de setState), Svelte permite mutar estado directamente pero lo **rastrea** mediante su compilador. Cada asignación se convierte en una señal que actualiza la UI de forma predecible.

```javascript
// En Svelte 5, las "runes" hacen explícito qué es estado reactivo
let count = $state(0);
let doubled = $derived(count * 2);

// La mutación está permitida, pero es RASTREADA
function increment() {
  count++; // Svelte sabe que esto cambió y actualiza solo lo necesario
}

// Esto es radicalmente diferente a mutar una variable global
// sin que nadie sepa que cambió
```

La lección de Harris es que el problema no es la mutación en sí, sino la **mutación invisible**. Si tu framework o tu arquitectura saben exactamente cuándo y dónde muta el estado, puedes tener las ventajas de la mutabilidad (simplicidad, rendimiento) sin el caos.

## Estrategias para domesticar el estado

En lugar de declarar la guerra a toda mutación, aplica estas estrategias que combinan pragmatismo con seguridad:

```typescript
// ❌ Estado esparcido por todo el módulo
let items: Item[] = [];
let filter = 'all';
let sortBy = 'date';

function addItem(item: Item) { items.push(item); }
function setFilter(f: string) { filter = f; }
function getVisibleItems() {
  return items.filter(/* usa filter */).sort(/* usa sortBy */);
}

// ✅ Estado encapsulado: una sola fuente de verdad
function createStore(initialItems: Item[]) {
  let items = [...initialItems];
  let filter: 'all' | 'active' | 'completed' = 'all';

  return {
    addItem(item: Item) {
      items = [...items, item];
    },
    setFilter(newFilter: typeof filter) {
      filter = newFilter;
    },
    getVisibleItems() {
      const filtered = filter === 'all'
        ? items
        : items.filter(i => i.status === filter);
      return [...filtered]; // Devuelve copia, no referencia
    }
  };
}

// La mutación existe, pero está CONTENIDA.
// Nadie fuera del store puede tocar items directamente.
```

1. **Minimiza la superficie:** Cada variable de estado que añades es un compromiso. Pregúntate siempre: ¿puedo derivar este valor en lugar de almacenarlo?

2. **Encapsula la mutación:** Si algo debe mutar, que sea dentro de una función o módulo con una API controlada. Nadie debería poder modificar estado directamente desde fuera.

3. **Haz los cambios predecibles:** Cada transición de estado debería poder explicarse con una frase: "cuando el usuario hace X, el estado cambia de A a B".

4. **Prefiere datos derivados:** Si puedes calcular un valor a partir de otro estado existente, no lo almacenes como estado nuevo. Menos estado = menos oportunidades de inconsistencia.

Rich Harris demostró con Svelte que no necesitas renunciar al estado mutable para escribir software robusto. Pero también demostró que el estado sin control es el terreno donde crecen los bugs más difíciles de reproducir, diagnosticar y corregir. **Cada pieza de estado en tu aplicación es una promesa que le haces al sistema: "yo me encargo de mantener esto coherente". Asegúrate de poder cumplir esa promesa antes de crearla.**

---
id: "72"
title: "Los nombres revelan intención"
category: "Legibilidad"
categoryColor: "text-teal-400 bg-teal-900/20"
author: "robert-c-martin"
---

**Robert C. Martin (Uncle Bob) lleva décadas repitiendo una idea que parece simple pero transforma la forma en que escribimos software: el nombre de una variable, función o clase debe responder al *porqué* existe, *qué* hace y *cómo* se usa.** Si un nombre necesita un comentario que lo explique, el nombre está mal elegido.

En *Clean Code*, Uncle Bob dedica su primer capítulo técnico exclusivamente a los nombres. No al diseño de clases, no a la arquitectura, no a los patrones. A los *nombres*. Porque entiende que nombrar bien es el acto más fundamental de comunicación en el código. Phil Karlton bromeaba con que nombrar es una de las dos cosas difíciles en informática; Uncle Bob fue más allá y convirtió esa dificultad en un sistema con reglas claras.

## Nombres que revelan intención vs. nombres que desinforman

La primera regla de Uncle Bob es que un nombre debe revelar intención. Si tienes que mirar la implementación para saber qué hace una función, su nombre ha fracasado. Pero hay algo peor que un nombre vacío: un nombre que **miente**.

```typescript
// ❌ Desinformación: 'accountList' no es una lista, es un Set
const accountList = new Set<string>();

// ❌ Desinformación: 'hp' podría ser "hit points", "horsepower" o "Hewlett-Packard"
const hp = calculateResult();

// ❌ Desinformación sutil: nombres que difieren en poco
const controllerForEfficientHandlingOfStrings = '...';
const controllerForEfficientStorageOfStrings = '...';
// ¿Cuál es cuál? A las 11 de la noche, imposible distinguirlos.

// ✅ Intención clara sin ambigüedad
const activeAccountIds = new Set<string>();
const horsePower = calculateEngineOutput();
const stringParser = '...';
const stringStorage = '...';
```

Uncle Bob llama a esto "evitar la desinformación". Un nombre no solo debe ser descriptivo; debe ser **honesto**. Si algo no es una lista, no lo llames `list`. Si algo no procesa datos genéricos, no lo llames `processData`.

## Distinciones significativas: Di algo con cada nombre

Otro principio clave de *Clean Code* es que si dos cosas son distintas, sus nombres deben explicar **en qué** se distinguen. Los nombres como `data1` y `data2`, o `productInfo` y `productData`, son lo que Uncle Bob llama "distinciones sin significado".

```typescript
// ❌ Distinciones vacías: ¿cuál es la diferencia entre estos?
function getActiveAccount() { /* ... */ }
function getActiveAccountData() { /* ... */ }
function getActiveAccountInfo() { /* ... */ }

// El desarrollador que llame a estas funciones
// no sabrá cuál usar sin leer la implementación de las tres.

// ✅ Cada nombre explica exactamente qué devuelve
function getActiveAccountSummary(): AccountSummary { /* ... */ }
function getActiveAccountTransactions(): Transaction[] { /* ... */ }
function getActiveAccountBalance(): Money { /* ... */ }
```

## El contexto como brújula del nombre

Uncle Bob enseña que el contexto determina la longitud óptima de un nombre. En un bucle corto, `i` está bien. En una función de 200 líneas, necesitas algo más expresivo. El alcance (scope) del nombre dicta cuánto detalle necesita.

```typescript
// ✅ Contexto reducido: nombre corto está bien
const users = getUsers();
users.forEach(u => console.log(u.name));

// ✅ Contexto amplio: el nombre necesita más precisión
class OrderProcessingService {
  private readonly pendingOrderNotificationThresholdInHours = 24;
  private readonly maxRetryAttemptsForPaymentGateway = 3;

  async processOverdueOrders(overdueOrders: Order[]): Promise<void> {
    for (const order of overdueOrders) {
      const hoursSinceCreation = this.calculateHoursSince(order.createdAt);

      if (hoursSinceCreation > this.pendingOrderNotificationThresholdInHours) {
        await this.notifyCustomerAboutPendingOrder(order);
      }
    }
  }
}
```

## El nombre como detector de mal diseño

Hay una técnica que Uncle Bob no menciona explícitamente pero que se desprende de sus principios: si no puedes encontrar un buen nombre para una función, probablemente la función hace demasiadas cosas. El nombre es un termómetro del diseño.

```typescript
// ❌ Si no puedes nombrarlo bien, probablemente hace demasiado
function handleUserStuff(user: User) {
  validateUser(user);
  updateDatabase(user);
  sendWelcomeEmail(user);
  syncWithAnalytics(user);
  clearCache();
}

// ✅ Funciones con un solo propósito se nombran solas
function registerNewUser(user: User) {
  const validatedUser = validateRegistrationData(user);
  const savedUser = saveUserToDatabase(validatedUser);
  await sendWelcomeEmail(savedUser);
  trackRegistrationEvent(savedUser.id);
}
```

Cuando pasas cinco minutos buscando un nombre y ninguno encaja, no es un problema de vocabulario. Es una señal de que estás intentando describir algo que no debería existir como una sola unidad. Escucha esa señal.

La diferencia entre un programador junior y uno senior no está en el algoritmo que eligen ni en el framework que dominan. Está en los nombres que ponen. Un senior sabe que un buen nombre ahorra horas de lectura, evita bugs por malentendidos y sirve de documentación viva que nunca se desactualiza. **Nombrar bien no es un detalle cosmético; es la primera y más importante decisión de diseño que tomas cada vez que escribes una línea de código.**

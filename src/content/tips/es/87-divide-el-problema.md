---
id: "87"
title: "Divide el problema hasta que cada parte sea trivial"
category: "Proceso"
categoryColor: "text-blue-400 bg-blue-900/20"
author: "edsger-dijkstra"
---

**Un problema difícil es simplemente un conjunto de problemas fáciles que aún no has separado.** Edsger W. Dijkstra, ganador del Premio Turing en 1972 y uno de los padres de la ciencia de la computación, dedicó su carrera a defender esta idea: *"The art of programming is the art of organizing complexity."*

Dijkstra fue pionero de la programación estructurada, inventó el algoritmo de camino más corto que lleva su nombre, y escribió más de 1.300 manuscritos (los famosos *EWD*) sobre cómo pensar rigurosamente sobre software. Su contribución más duradera no fue un algoritmo específico, sino una forma de pensar: **descompón hasta que cada parte sea obvia**.

## Descomposición top-down

El enfoque de Dijkstra es descendente: empieza con el problema completo y divídelo en subproblemas, luego divide cada subproblema hasta que cada pieza sea trivial.

```markdown
Problema: "Construir un sistema de autenticación"

Nivel 1 - Dividir en subproblemas:
├── Registro de usuario
├── Inicio de sesión
├── Gestión de sesiones
└── Recuperación de contraseña

Nivel 2 - Dividir cada subproblema:
├── Registro de usuario
│   ├── Validar formato de email
│   ├── Verificar que no exista duplicado
│   ├── Hashear contraseña
│   └── Almacenar en base de datos
├── Inicio de sesión
│   ├── Buscar usuario por email
│   ├── Comparar hash de contraseña
│   ├── Generar token JWT
│   └── Devolver token al cliente
└── ...

Nivel 3 - Cada hoja es trivial:
    "Validar formato de email" → una regex o una librería
    "Hashear contraseña" → bcrypt.hash(password, 10)
    "Generar token JWT" → jwt.sign(payload, secret)
```

A nivel 3, cada tarea se puede implementar en minutos. El problema original parecía enorme; dividido, es una colección de piezas manejables.

## La analogía con la recursión

Dijkstra veía la descomposición como un proceso recursivo, y no es casualidad. La recursión **es** dividir un problema hasta llegar a un caso base trivial:

```javascript
// La recursión es divide-y-vencerás hecho código
function mergeSort(arr) {
  // Caso base: trivial
  if (arr.length <= 1) return arr;

  // Dividir el problema en dos mitades
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  // Combinar las soluciones parciales
  return merge(left, right);
}
```

Ordenar un millón de elementos es intimidante. Ordenar un elemento es trivial. MergeSort transforma el primer problema en muchas instancias del segundo. Eso es exactamente lo que Dijkstra propone para cualquier problema de software.

## Aplícalo a problemas reales

Esta técnica no es solo para algoritmos de libro de texto. Funciona en el día a día:

```javascript
// ❌ Intentar resolver todo a la vez
async function processOrder(order) {
  // 200 líneas de lógica entrelazada:
  // validación, stock, pago, envío, email, analytics...
}

// ✅ Dividir hasta que cada parte sea obvia
async function processOrder(order) {
  const validOrder = validateOrder(order);
  const reserved = await reserveStock(validOrder);
  const payment = await chargePayment(reserved);
  const shipment = await createShipment(payment);
  await sendConfirmationEmail(shipment);
  await trackOrderAnalytics(shipment);
}
```

Cada función hace una sola cosa. Cada una se puede testear por separado. Si falla el pago, sabes exactamente dónde mirar. Si mañana cambias de proveedor de envío, solo tocas `createShipment`.

## Cuando estás atascado, divide más

Dijkstra observaba que cuando un programador se "atasca", casi siempre es porque está intentando pensar en demasiadas cosas a la vez. La solución no es pensar más fuerte; es **pensar en menos cosas a la vez**.

Si una función te parece compleja, divídela en dos. Si un módulo es difícil de entender, sepáralo en partes con responsabilidades claras. Si un proyecto te abruma, haz una lista de las partes y trabaja en una cada vez.

```markdown
¿Atascado? Hazte estas preguntas:

1. ¿Puedo dividir esto en pasos secuenciales?
2. ¿Hay partes que son independientes entre sí?
3. ¿Cuál es la parte más pequeña que puedo resolver ahora?
4. ¿Puedo ignorar temporalmente algún detalle?
```

La programación es el arte de gestionar la complejidad, y la herramienta más poderosa para gestionar la complejidad es la descomposición. No se trata de ser más inteligente que el problema; se trata de hacerlo más pequeño que tu capacidad de resolverlo. Como escribió Dijkstra: *"Simplicity is a prerequisite for reliability."* Divide hasta que cada parte sea tan simple que no pueda estar mal.

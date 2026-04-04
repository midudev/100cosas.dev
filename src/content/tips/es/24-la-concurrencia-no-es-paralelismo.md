---
id: "24"
title: "La concurrencia no es paralelismo"
category: "Fundamentos"
categoryColor: "text-blue-400 bg-blue-900/20"
author: "rob-pike"
---

Rob Pike, co-creador de Go, UTF-8 y Plan 9, dio en 2012 una charla que debería ser obligatoria para cualquier programador: **"Concurrency is not Parallelism"**. Una distinción que suena académica pero que tiene consecuencias prácticas enormes en el código que escribes cada día.

Su frase clave: **"Concurrency is about dealing with lots of things at once. Parallelism is about doing lots of things at once."** Tratar con muchas cosas no es lo mismo que hacer muchas cosas. Y confundirlas es la raíz de algunos de los bugs más difíciles de depurar.

## La analogía de los gophers

Rob usa una analogía brillante en su charla. Imagina que tienes una pila de libros que mover y un carrito:

- **Sin concurrencia ni paralelismo**: Un gopher carga libros, los lleva al destino, los descarga, vuelve. Secuencial.
- **Concurrencia**: Un gopher carga libros mientras otro transporta y un tercero descarga. Hay estructura, hay coordinación, pero solo un carrito (un recurso compartido).
- **Paralelismo**: Dos carritos, dos rutas, dos equipos trabajando **simultáneamente**.

La concurrencia es un **patrón de diseño**: cómo estructuras tu programa para manejar múltiples tareas. El paralelismo es un **modo de ejecución**: múltiples cosas sucediendo al mismo tiempo en diferentes procesadores.

Puedes tener concurrencia sin paralelismo (JavaScript). Puedes tener paralelismo sin buena concurrencia (threads mal coordinados). Y puedes tener ambos (Go, Erlang).

![Diagrama comparando concurrencia y paralelismo](/images/diagrams/tip-24-concurrency-vs-parallelism.svg)

## JavaScript: concurrencia sin paralelismo

El event loop de Node.js es el ejemplo perfecto de concurrencia sin paralelismo. Un solo hilo gestionando miles de operaciones:

```javascript
// JavaScript es CONCURRENTE pero NO paralelo (hilo principal)
// Estas tres peticiones se lanzan "a la vez"
// pero no se ejecutan simultáneamente en el hilo de JS

const [users, products, orders] = await Promise.all([
  fetch('/api/users'),
  fetch('/api/products'),
  fetch('/api/orders')
]);
```

Las tres peticiones HTTP se lanzan sin esperar a que termine la anterior. Pero el código JavaScript que gestiona las respuestas se ejecuta en un solo hilo, una callback a la vez. La concurrencia está en la **estructura** (no bloqueamos esperando), no en la ejecución simultánea.

## Secuencial vs concurrente: el impacto real

La diferencia práctica es dramática:

```javascript
// ❌ Secuencial: cada petición espera a la anterior
async function loadDashboard() {
  const users = await fetch('/api/users');       // 200ms
  const products = await fetch('/api/products'); // 300ms
  const orders = await fetch('/api/orders');     // 250ms
  // Total: ~750ms
  return { users, products, orders };
}

// ✅ Concurrente: todas las peticiones en vuelo a la vez
async function loadDashboard() {
  const [users, products, orders] = await Promise.all([
    fetch('/api/users'),       // 200ms ─┐
    fetch('/api/products'),    // 300ms ─┤ en paralelo (I/O)
    fetch('/api/orders')       // 250ms ─┘
  ]);
  // Total: ~300ms (la más lenta)
  return { users, products, orders };
}
```

Con `Promise.all` no estás haciendo paralelismo en JavaScript. Estás usando concurrencia para que el **sistema operativo** haga las peticiones de red en paralelo mientras tu hilo de JS queda libre.

## Cuando necesitas paralelismo real

El event loop es perfecto para I/O (red, disco, bases de datos). Pero para tareas CPU-intensive, un solo hilo te bloquea todo:

```javascript
// ❌ Esto bloquea el event loop completo
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

app.get('/fib/:n', (req, res) => {
  const result = fibonacci(parseInt(req.params.n));
  res.json({ result });
});
```

Mientras `fibonacci(45)` calcula (varios segundos), **ninguna otra petición** se procesa. El servidor entero se congela.

La solución: **Web Workers** (navegador) o **Worker Threads** (Node.js) para paralelismo real:

```javascript
// ✅ Paralelismo real con Worker Threads
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

if (isMainThread) {
  app.get('/fib/:n', async (req, res) => {
    const result = await runInWorker(parseInt(req.params.n));
    res.json({ result });
  });

  function runInWorker(n) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(new URL(import.meta.url), {
        workerData: { n }
      });
      worker.on('message', resolve);
      worker.on('error', reject);
    });
  }
} else {
  function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }

  parentPort.postMessage(fibonacci(workerData.n));
}
```

Ahora `fibonacci` corre en un hilo separado. El event loop principal sigue respondiendo peticiones sin problema.

## Los peligros del estado compartido

Cuando introduces paralelismo real, aparece el enemigo más traicionero de la programación: el **estado mutable compartido**. En lenguajes con hilos reales, dos hilos pueden leer y modificar la misma variable simultáneamente, produciendo resultados impredecibles. Si ambos leen `counter = 5` al mismo tiempo, ambos escriben 6. El resultado es 6 en vez de 7.

La solución que Rob Pike incorporó en Go es elegante: **"Don't communicate by sharing memory; share memory by communicating."** En vez de que dos hilos accedan a la misma variable, se envían mensajes. Node.js sigue este principio por defecto con sus Worker Threads:

```javascript
// ✅ Workers se comunican por mensajes, sin estado compartido
const worker = new Worker('./processor.js');

worker.postMessage({ task: 'process', payload: items });
worker.on('message', (result) => {
  console.log('Procesado:', result);
});
```

Sin estado compartido, sin race conditions. JavaScript adopta este modelo por diseño.

La distinción de Rob Pike no es un detalle académico. Es la brújula que te dice cuándo `Promise.all` es suficiente y cuándo necesitas un Worker Thread. Cuándo tu código es lento por diseño secuencial y cuándo está bloqueado por falta de paralelismo real. Si trabajas con múltiples peticiones HTTP, la concurrencia con `Promise.all` resuelve el problema. Si tienes tareas CPU-intensive, necesitas Worker Threads en el servidor o Web Workers en el navegador.

Entender la diferencia entre **estructurar** tu programa para manejar muchas cosas y **ejecutar** muchas cosas a la vez es lo que separa el código que "funciona en mi máquina" del código que escala.

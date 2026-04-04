---
id: "47"
title: "Entiende la red: cada milisegundo importa"
category: "Rendimiento"
categoryColor: "text-amber-400 bg-amber-900/20"
author: "ilya-grigorik"
---

Ilya Grigorik, ingeniero de rendimiento web en Google y autor de *High Performance Browser Networking*, lleva años insistiendo en una verdad incómoda: **la latencia es el nuevo cuello de botella, no el ancho de banda**. Puedes tener una conexión de gigabit, pero si el servidor está a 200ms de distancia, ninguna optimización de código lo compensa.

## Lo que ocurre antes del primer byte

La mayoría de desarrolladores piensan que una petición HTTP es algo simple: envías una URL, recibes datos. Pero antes de que tu navegador reciba un solo byte de respuesta, ocurre una ceremonia invisible:

```markdown
1. DNS Lookup     (~20-120ms)  → Resolver el dominio a una IP
2. TCP Handshake  (~1 RTT)     → SYN → SYN-ACK → ACK
3. TLS Handshake  (~1-2 RTT)   → Negociación de cifrado
4. HTTP Request   (~1 RTT)     → Enviar la petición
5. Server Think   (variable)   → Procesar la respuesta
6. HTTP Response  (~1+ RTT)    → Recibir los datos
```

![Diagrama waterfall de las fases de una petición HTTPS](/images/diagrams/tip-47-http-waterfall.svg)

Un solo RTT (Round Trip Time) entre Madrid y Nueva York son unos **85ms**. Eso significa que una primera conexión HTTPS puede consumir **300-400ms antes de recibir datos**. Y la velocidad de la luz impone un límite duro: no puedes hacer que los fotones viajen más rápido.

## Resource hints: anticipa lo que el navegador necesitará

```html
<!-- ✅ Anticipa conexiones con resource hints -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="/fonts/inter.woff2" as="font"
      type="font/woff2" crossorigin>
```

Sin estos hints, el navegador descubre las conexiones necesarias demasiado tarde: parsea HTML, encuentra el link, resuelve DNS, conecta, descarga CSS, descubre las URLs de las fuentes y vuelve a resolver DNS. Los resource hints adelantan ese trabajo.

Cada hint tiene un propósito específico:

| Hint | Qué hace | Cuándo usarlo |
|------|----------|---------------|
| `dns-prefetch` | Solo resuelve DNS | Dominios que usarás pronto |
| `preconnect` | DNS + TCP + TLS | Orígenes críticos de terceros |
| `preload` | Descarga inmediata | Recursos críticos del render path |
| `prefetch` | Descarga en idle | Recursos de la siguiente navegación |

## HTTP/2 y HTTP/3: la evolución del protocolo

HTTP/1.1 tenía un problema brutal: **head-of-line blocking**. Solo podías enviar una petición a la vez por conexión. Los navegadores abrían 6 conexiones paralelas como workaround.

```markdown
HTTP/1.1:
  Conexión 1: [--CSS--][--JS--][--IMG--]  ← secuencial
  Conexión 2: [--IMG--][--IMG--]
  Conexión 3: [--FONT-][--IMG--]
  (máximo 6 conexiones por dominio)

HTTP/2:
  Conexión única: [CSS|JS|IMG|IMG|FONT|IMG]  ← multiplexado
  → Una sola conexión, múltiples streams en paralelo

HTTP/3 (QUIC):
  → Mismo multiplexing, pero sobre UDP
  → Elimina head-of-line blocking a nivel de transporte
  → 0-RTT en reconexiones (conexión "instantánea")
```

## Caching: la petición más rápida es la que no se hace

El caching más potente no ocurre en tu código JavaScript, sino a nivel de cabeceras HTTP. El navegador ya sabe cachear: solo necesitas decirle cómo:

```
# Recursos estáticos inmutables (con hash en el nombre)
Cache-Control: public, max-age=31536000, immutable

# API con revalidación (datos que pueden cambiar)
Cache-Control: private, max-age=0, must-revalidate
ETag: "a1b2c3d4"

# HTML de la página (siempre revalidar)
Cache-Control: no-cache
```

La combinación de `ETag` con `must-revalidate` permite respuestas `304 Not Modified` que evitan transferir el cuerpo de la respuesta: el servidor solo confirma que nada cambió.

## AbortController: no esperes lo que ya no necesitas

`AbortController` permite cancelar peticiones que ya no necesitas. Creas un controlador, pasas su `signal` al `fetch`, y llamas a `abort()` cuando lanzas una nueva petición. Esto es crítico en búsquedas en tiempo real: si el usuario escribe "react", no quieres que las respuestas de "r", "re", "rea" y "reac" lleguen después y sobrescriban el resultado correcto.

```javascript
let currentController = null;

async function search(query) {
  currentController?.abort();
  currentController = new AbortController();

  try {
    const res = await fetch(`/api/search?q=${query}`, {
      signal: currentController.signal
    });
    return await res.json();
  } catch (err) {
    if (err.name === 'AbortError') return null;
    throw err;
  }
}
```

## El impacto real de la latencia

Grigorik cita datos demoledores: **Amazon descubrió que cada 100ms de latencia adicional les costaba un 1% en ventas**. Google encontró que añadir 500ms de retraso artificial a sus resultados de búsqueda reducía el tráfico un 20%. Estos no son casos extremos: son la norma. Cada milisegundo cuenta, y la Navigation Timing API del navegador te permite medir exactamente dónde se pierden.

## Reduce la distancia: CDNs y menos round trips

Si la velocidad de la luz impone un límite, la solución es reducir la distancia. Un CDN coloca copias de tu contenido en servidores distribuidos por todo el mundo, convirtiendo un RTT de 170ms (Madrid → Virginia) en uno de 10ms (Madrid → nodo local). El edge computing va más allá: ejecuta tu lógica de servidor a pocos milisegundos del usuario.

Pero la distancia no es el único factor. El número de viajes también importa:

```javascript
// ❌ Tres peticiones secuenciales = 3 RTTs
const user = await fetch('/api/user/1').then(r => r.json());
const posts = await fetch('/api/posts?author=1').then(r => r.json());
const comments = await fetch('/api/comments?author=1').then(r => r.json());

// ✅ En paralelo = 1 RTT
const [user, posts, comments] = await Promise.all([
  fetch('/api/user/1').then(r => r.json()),
  fetch('/api/posts?author=1').then(r => r.json()),
  fetch('/api/comments?author=1').then(r => r.json())
]);

// ✅✅ Un solo endpoint agregado = 1 RTT y menos overhead
const dashboard = await fetch('/api/dashboard/1').then(r => r.json());
```

Ilya Grigorik nos recuerda que la física es innegociable. No puedes hacer que los fotones viajen más rápido, pero sí puedes minimizar los viajes, anticipar lo que necesitas, cachear lo que ya tienes y acercar los datos al usuario. Cada milisegundo que ahorras es un milisegundo más que tu usuario dedica a lo que realmente importa: usar tu aplicación.

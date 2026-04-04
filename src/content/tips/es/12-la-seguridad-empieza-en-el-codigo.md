---
id: "12"
title: "La seguridad empieza en el código"
category: "Seguridad"
categoryColor: "text-red-400 bg-red-900/20"
author: "parisa-tabriz"
---

En 2007, una joven ingeniera de seguridad fue contratada por Google como "hacker a sueldo". Su trabajo: encontrar vulnerabilidades en las aplicaciones web de Google antes de que lo hicieran los atacantes. Esa persona era **Parisa Tabriz**, quien años después se convertiría en VP de Chrome y la persona detrás de una de las transformaciones más importantes de la seguridad en Internet.

Su título en la tarjeta de visita decía **"Security Princess"** — un nombre que eligió ella misma para desmitificar la seguridad y hacerla más accesible. Su filosofía es clara: **la seguridad no se añade al final, se construye desde la primera línea de código.**

## La lección de HTTPS: cambiar la web entera

Cuando Parisa empezó a liderar la seguridad de Chrome, menos de la mitad de las páginas web usaban HTTPS. La mayoría del tráfico viajaba en texto plano — contraseñas, datos bancarios, mensajes privados, todo visible para cualquiera que interceptara la conexión.

En lugar de esperar a que los sitios migraran voluntariamente, Parisa tomó una decisión audaz: hacer que Chrome mostrara una advertencia de "No es seguro" junto a la barra de direcciones en páginas HTTP. La industria protestó, pero funcionó. En pocos años, la adopción de HTTPS pasó del 50% a más del 90%.

La lección es profunda: **hacer que el camino seguro sea el camino fácil** es más efectivo que cualquier auditoría. Si tu framework, tu linter o tu CI/CD detectan problemas de seguridad automáticamente, tu equipo los evitará sin esfuerzo.

## Piensa como un atacante: modelado de amenazas

Parisa gestiona **Project Zero**, el equipo de investigación ofensiva de Google que busca vulnerabilidades zero-day en todo tipo de software. Su enfoque no es "esperar a que pase algo malo", sino **atacar tu propio sistema antes de que lo haga alguien más**.

No necesitas ser un experto en seguridad para aplicar esto. Antes de escribir una feature, hazte tres preguntas:

1. **¿Qué datos manejo?** Si son datos personales, financieros o de autenticación, el nivel de protección debe ser máximo.
2. **¿Quién podría querer acceder a esto?** Un usuario curioso, un bot automatizado, un atacante con experiencia — cada uno requiere una defensa diferente.
3. **¿Qué es lo peor que puede pasar?** Si la respuesta es "se filtran todas las contraseñas de mis usuarios", invierte más tiempo en esa parte del código.

## CSRF: el ataque que se disfraza de ti

Mientras que la inyección SQL y el XSS son los ataques más conocidos, el **Cross-Site Request Forgery (CSRF)** es igual de peligroso y mucho más sutil. El atacante no necesita robar tu contraseña — hace que tu propio navegador ejecute acciones en tu nombre.

```html
<!-- ❌ Un email "inocente" con una imagen oculta -->
<img src="https://tu-banco.com/api/transfer?to=atacante&amount=5000" />
<!-- Tu navegador envía la petición con tu cookie de sesión activa -->
```

```javascript
// ✅ Protección con tokens CSRF
app.use((req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const token = req.headers['x-csrf-token'];
    if (!token || token !== req.session.csrfToken) {
      return res.status(403).json({ error: 'Invalid CSRF token' });
    }
  }
  next();
});

// Generar token único por sesión
app.use((req, res, next) => {
  if (!req.session.csrfToken) {
    req.session.csrfToken = crypto.randomUUID();
  }
  next();
});
```

El atributo `SameSite` en cookies es otra barrera efectiva que cuesta una sola línea:

```javascript
// ✅ Cookies con SameSite para prevenir CSRF
res.cookie('session', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict'
});
```

## Haz que lo seguro sea lo predeterminado

La filosofía de Parisa se reduce a una idea: **si la opción segura requiere esfuerzo extra, nadie la usará**. Por eso su mayor impacto no fue encontrar bugs, sino cambiar los valores predeterminados de Chrome para millones de usuarios.

Aplica el mismo principio en tu código:

```javascript
// ❌ Función que deja la seguridad como parámetro opcional
function createServer(port, { https = false } = {}) {
  // La mayoría de los developers ni se enteran de esta opción
}

// ✅ Seguro por defecto, inseguro solo si lo pides explícitamente
function createServer(port, { disableHTTPS = false } = {}) {
  if (disableHTTPS) {
    console.warn('⚠️ Running without HTTPS. Only use in development.');
  }
}
```

```javascript
// ❌ fetch sin validación, confía en cualquier respuesta
const data = await fetch(url).then(r => r.json());

// ✅ Wrapper que valida status, tipo y tamaño por defecto
async function safeFetch(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    throw new Error('Unexpected content type');
  }

  return response.json();
}
```

## La seguridad es responsabilidad de todos

Parisa insiste en algo que muchas empresas ignoran: **la seguridad no es solo responsabilidad del equipo de seguridad**. Cada desarrollador que escribe un formulario, cada persona que configura un servidor, cada diseñador que decide qué datos pedir — todos son parte de la cadena de seguridad.

Esto se traduce en hábitos concretos:

1. Valida en el servidor, nunca solo en el cliente. La validación del frontend es UX, la del backend es seguridad.
2. Usa `Content-Security-Policy` para controlar qué scripts se ejecutan en tu página.
3. Configura `Strict-Transport-Security` para forzar HTTPS sin excepciones.
4. Revisa tus dependencias periódicamente: `npm audit` o `pnpm audit` no son opcionales.
5. Limita los intentos de login y usa rate limiting en tus APIs.

No necesitas ser la "Security Princess" de Google para escribir código seguro. Solo necesitas aceptar que cada línea de código es una decisión de seguridad — y que la mejor defensa empieza en el momento en que abres tu editor. Como demostró Parisa transformando la web entera: **cuando haces que lo seguro sea lo fácil, todo el mundo gana.**

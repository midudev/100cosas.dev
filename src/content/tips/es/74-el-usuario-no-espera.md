---
id: "74"
title: "El usuario no espera: cada milisegundo cuenta"
category: "Rendimiento"
categoryColor: "text-amber-400 bg-amber-900/20"
author: "addy-osmani"
---

**Addy Osmani, Engineering Manager en Google Chrome, ha dedicado su carrera a demostrar una verdad incómoda: tus usuarios no juzgan tu aplicación por lo rápida que es, sino por lo rápida que *sienten* que es.** Y esa percepción se forma en milisegundos.

Google publicó estudios internos que revelaron que un retraso de 100ms en los resultados de búsqueda reducía el tráfico un 20%. Amazon calculó que cada 100ms extra de latencia les costaba un 1% de ventas. No son cifras teóricas: son millones de euros evaporándose por fracciones de segundo que ningún usuario podría medir con un cronómetro pero que su cerebro registra perfectamente.

## Los umbrales de percepción humana

Osmani ha documentado extensamente los umbrales psicológicos que determinan cómo percibimos la velocidad de una interfaz. Estos no son arbitrarios: están respaldados por décadas de investigación en psicología cognitiva.

- **0-100ms:** El cerebro lo interpreta como instantáneo. La acción y la respuesta parecen una misma cosa. Este es el objetivo para responder a clicks y toques.
- **100-300ms:** El usuario nota un ligero retraso pero lo acepta como natural. Aceptable para transiciones y animaciones.
- **300-1000ms:** La aplicación se siente "pesada". El usuario todavía espera, pero empieza a preguntarse si algo va mal.
- **1-5 segundos:** Se pierde el flujo mental. El usuario ya está pensando en otra cosa. Necesitas un indicador de progreso.
- **Más de 10 segundos:** Abandono. El usuario cierra la pestaña y se va a la competencia.

## El arte de la velocidad percibida

La revelación más poderosa de Osmani es que a menudo **no necesitas hacer tu app más rápida; necesitas hacer que se *sienta* más rápida**. La percepción es más importante que los milisegundos reales.

```typescript
// ❌ Esperar a que todo termine antes de mostrar algo
async function loadDashboard() {
  const [user, posts, analytics, notifications] = await Promise.all([
    fetchUser(),        // 200ms
    fetchPosts(),       // 800ms
    fetchAnalytics(),   // 1500ms
    fetchNotifications() // 300ms
  ]);

  // El usuario ve una pantalla en blanco durante 1500ms
  renderDashboard({ user, posts, analytics, notifications });
}

// ✅ Optimistic UI: muestra contenido progresivamente
async function loadDashboard() {
  renderSkeleton(); // Inmediato: el usuario ve "algo" al instante

  const user = await fetchUser(); // 200ms
  renderHeader(user); // El usuario ya ve su nombre

  const [posts, notifications] = await Promise.all([
    fetchPosts(),
    fetchNotifications()
  ]);
  renderContent(posts, notifications); // A los 800ms ya tiene contenido útil

  const analytics = await fetchAnalytics(); // Lo más pesado, al final
  renderAnalytics(analytics);
}
```

## Skeleton screens: la ilusión de velocidad

Los skeleton screens (pantallas esqueleto) son uno de los patrones que Osmani más recomienda. Estudios de UX han demostrado que los usuarios perciben que una página con skeletons carga más rápido que una con un spinner, aunque el tiempo real sea el mismo.

```html
<!-- ❌ Spinner genérico: el usuario no sabe qué esperar -->
<div class="loading">
  <div class="spinner"></div>
  <p>Cargando...</p>
</div>

<!-- ✅ Skeleton: el usuario "ve" la estructura antes del contenido -->
<article class="post-skeleton">
  <div class="skeleton-avatar"></div>
  <div class="skeleton-line" style="width: 60%"></div>
  <div class="skeleton-line" style="width: 80%"></div>
  <div class="skeleton-line" style="width: 45%"></div>
</article>
```

La razón psicológica es clara: un spinner dice "estoy trabajando, pero no sé cuánto falta". Un skeleton dice "esto es lo que vas a ver, solo falta rellenarlo". El usuario siente progreso en lugar de incertidumbre.

## Optimistic UI: actúa antes de confirmar

La técnica más agresiva de velocidad percibida es la Optimistic UI: asumes que la operación va a funcionar y actualizas la interfaz inmediatamente, antes de que el servidor responda.

```typescript
// ❌ Enfoque pesimista: esperar confirmación del servidor
async function handleLike(postId: string) {
  setButtonDisabled(true);
  const response = await api.likePost(postId);
  if (response.ok) {
    setLikeCount(prev => prev + 1);
    setIsLiked(true);
  }
  setButtonDisabled(false);
  // El usuario espera 300-800ms viendo un botón deshabilitado
}

// ✅ Enfoque optimista: actualizar inmediatamente
async function handleLike(postId: string) {
  setLikeCount(prev => prev + 1); // Inmediato
  setIsLiked(true);               // Inmediato

  try {
    await api.likePost(postId);
  } catch {
    setLikeCount(prev => prev - 1); // Revertir solo si falla
    setIsLiked(false);
    showToast('No se pudo dar like. Inténtalo de nuevo.');
  }
}
```

Instagram, Twitter y prácticamente toda red social moderna usa este patrón. El "like" se ve instantáneo aunque el servidor tarde 500ms en procesarlo. El 99% de las veces la operación tiene éxito, así que ¿por qué castigar al usuario con una espera innecesaria?

## Prioriza lo que el usuario ve primero

Osmani popularizó el concepto de "Critical Rendering Path": cargar primero lo que el usuario necesita ver, y diferir todo lo demás.

```html
<!-- Prioriza la imagen principal (LCP) -->
<img src="hero.webp" fetchpriority="high" alt="Imagen principal" />

<!-- Lazy load para lo que está fuera de pantalla -->
<img src="gallery-1.webp" loading="lazy" alt="Galería" />
<img src="gallery-2.webp" loading="lazy" alt="Galería" />

<!-- Preconnect a orígenes de terceros que necesitarás pronto -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://api.analytics.com" />
```

La velocidad real importa, por supuesto. Pero Osmani nos enseña que la batalla por la atención del usuario se gana en la percepción. **Un milisegundo no es solo una unidad de tiempo; es una unidad de confianza.** Cada milisegundo que reduces le dice al usuario: "esta aplicación respeta tu tiempo". Y un usuario que siente que su tiempo es respetado es un usuario que se queda.

---
id: "74"
title: "El usuario no espera: cada milisegundo cuenta"
category: "Rendimiento"
categoryColor: "text-amber-400 bg-amber-900/20"
author: "addy-osmani"
---

Addy Osmani ha documentado extensamente cómo la velocidad afecta la experiencia del usuario: **100ms es instantáneo, 1 segundo es notable, 10 segundos es abandono**.

## Los umbrales de percepción

```markdown
| Tiempo     | Percepción del usuario      |
|------------|----------------------------|
| 0-100ms    | Instantáneo               |
| 100-300ms  | Ligeramente perceptible   |
| 300-1000ms | La app se siente lenta    |
| 1-10s      | Pierde el foco            |
| 10s+       | Abandona                  |
```

## Optimizaciones de alto impacto

```html
<!-- Prioriza la imagen LCP -->
<img src="hero.jpg" fetchpriority="high" />

<!-- Lazy load lo que no se ve -->
<img src="footer.jpg" loading="lazy" />

<!-- Preconnect a dominios de terceros -->
<link rel="preconnect" href="https://api.example.com" />
```

## El truco del feedback instantáneo

```javascript
// Aunque la operación tarde, da feedback inmediato
async function handleSubmit() {
  setLoading(true); // Feedback inmediato
  await submitForm(); // Operación real
  setLoading(false);
}
```

## Reflexión final

La percepción de velocidad es tan importante como la velocidad real. A veces optimizar la experiencia percibida es más efectivo que optimizar el código.

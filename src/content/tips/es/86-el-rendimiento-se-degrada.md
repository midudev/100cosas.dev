---
id: "86"
title: "El rendimiento se degrada gradualmente: monitoriza siempre"
category: "DevOps"
categoryColor: "text-orange-400 bg-orange-900/20"
author: "addy-osmani"
---

**Ningún equipo decide conscientemente hacer su aplicación lenta.** Addy Osmani, Engineering Manager en Google Chrome y uno de los mayores referentes en rendimiento web, lo explica así: *"Performance is not a one-time fix, it's a continuous process."* La degradación no ocurre de golpe; es la suma silenciosa de cientos de pequeñas decisiones.

Osmani lideró el desarrollo de herramientas como Lighthouse y fue clave en la definición de los Core Web Vitals. Su obsesión con el rendimiento no es teórica: durante años vio cómo equipos lanzaban productos rápidos que, semana tras semana, se iban ralentizando hasta que alguien decía "¿por qué tarda tanto en cargar?" Y para entonces ya era tarde.

## La muerte por mil commits

Ningún commit individual "rompe" el rendimiento. Es la acumulación lo que mata:

```markdown
Semana 1:  Bundle = 180KB | LCP = 1.1s | ✅ Todo genial
Semana 4:  Bundle = 220KB | LCP = 1.4s | "Apenas se nota"
Semana 8:  Bundle = 310KB | LCP = 2.1s | "En mi máquina va bien"
Semana 12: Bundle = 450KB | LCP = 3.2s | "Hmm, ¿siempre fue así?"
Semana 20: Bundle = 680KB | LCP = 5.1s | 😱 "¿Qué ha pasado?"
```

Cada PR añadía una librería "pequeña", un componente "ligero", una imagen "optimizada". Nadie fue culpable individualmente, pero el resultado colectivo fue desastroso. Es la rana en agua tibia: cuando notas que hierve, ya es tarde.

## Performance budgets: la solución automática

Osmani defiende los *performance budgets* como la primera línea de defensa. Un presupuesto de rendimiento es un límite que, si se supera, rompe el build:

```javascript
// lighthouse-ci.config.js
module.exports = {
  ci: {
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-byte-weight': ['error', { maxNumericValue: 300000 }],
      },
    },
  },
};
```

```yaml
# En tu CI: el PR no se puede mergear si supera el presupuesto
- name: Lighthouse CI
  run: |
    npm run build
    npx @lhci/cli autorun
```

Cuando un desarrollador añade una dependencia de 80KB, el CI le avisa antes de que llegue a `main`. No es una regla burocrática; es una red de seguridad automática.

## Qué monitorizar y cómo

No puedes mejorar lo que no mides. Estos son los indicadores que Osmani considera esenciales:

```javascript
// Mide Core Web Vitals en usuarios reales (RUM)
import { onLCP, onINP, onCLS } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,    // 'good', 'needs-improvement', 'poor'
    page: window.location.pathname,
    connection: navigator.connection?.effectiveType
  });
  navigator.sendBeacon('/api/metrics', body);
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
```

La clave es medir en **usuarios reales**, no en tu MacBook Pro con fibra óptica. El percentil 75 de tus usuarios en un móvil con 3G es la métrica que importa.

## El caso real del "funciona en mi máquina"

Un equipo lanzó una feature con un carousel de imágenes. En local: carga instantánea. En producción, para usuarios con conexiones lentas, el LCP pasó de 1.8s a 4.5s. ¿Por qué? Las imágenes no tenían `loading="lazy"`, no usaban formatos modernos (WebP/AVIF), y el carousel cargaba todas las imágenes al inicio, no solo la primera.

```html
<!-- ❌ Todas las imágenes se cargan de golpe -->
<div class="carousel">
  <img src="hero-1.jpg" />
  <img src="hero-2.jpg" />
  <img src="hero-3.jpg" />
</div>

<!-- ✅ Solo la primera se carga inmediatamente -->
<div class="carousel">
  <img src="hero-1.webp" fetchpriority="high" />
  <img src="hero-2.webp" loading="lazy" />
  <img src="hero-3.webp" loading="lazy" />
</div>
```

Si hubieran tenido un performance budget en CI, la PR habría sido flaggeada antes de llegar a producción.

## Integra el rendimiento en tu cultura

El rendimiento no es responsabilidad de "alguien". Es responsabilidad del equipo:

1. **Performance budgets en CI**: que nadie pueda degradar sin enterarse
2. **Dashboards visibles**: métricas de rendimiento reales en un monitor del equipo
3. **Revisiones de rendimiento**: igual que se hace code review, hacer perf review
4. **Alertas proactivas**: si el p75 del LCP sube un 20%, que salte una alarma antes de que los usuarios lo noten

Lo que no mides se degrada. Lo que no automatizas se olvida. El rendimiento no es un proyecto con fecha de fin; es un hábito que se construye commit a commit. Como dice Osmani: no dejes que tu aplicación se convierta en la rana que no notó que el agua estaba hirviendo.

---
id: "49"
title: "Los datos importan, no las opiniones"
category: "Diversidad"
categoryColor: "text-rose-400 bg-rose-900/20"
author: "tracy-chou"
---

Tracy Chou, ingeniera que trabajó en Pinterest y Quora, hizo algo que cambió la conversación sobre diversidad en tech: **pidió datos, no opiniones**.

## El momento que cambió todo

En 2013, Tracy publicó un post simple: "¿Dónde están los datos sobre diversidad de género en tech?" La industria hablaba mucho de diversidad, pero nadie mostraba números.

Creó una hoja de cálculo pública pidiendo a las empresas que compartieran cuántas mujeres ingenieras tenían. La respuesta fue reveladora:

- Muchas empresas **no sabían** sus propios números
- Las que sí sabían **no querían compartirlos**
- Los números que emergieron eran **peores de lo esperado**

## Por qué los datos importan

```javascript
// Opinión sin datos
"Creo que somos bastante diversos"

// Datos reales
const stats = {
  totalEngineers: 500,
  women: 45,           // 9%
  underrepresentedMinorities: 23,  // 4.6%
  latinx: 8,           // 1.6%
  black: 5             // 1%
};

// Los datos fuerzan conversaciones honestas
```

## Aplicando el principio más allá de diversidad

El enfoque de Tracy aplica a cualquier problema:

### 1. "Nuestro código es de buena calidad"

```bash
# Opinión vs. datos
eslint . --format json | jq '.length'  # 847 errores
npm run test:coverage                   # 23% cobertura
```

### 2. "Los usuarios aman nuestra app"

```javascript
const realMetrics = {
  nps: 23,              // "Amor" = -100 a +100
  churnRate: '8%/mes',  // Pierdes 8% usuarios cada mes
  avgSessionTime: '47s' // Menos de 1 minuto
};
```

### 3. "Nuestro equipo es productivo"

```markdown
| Métrica | Valor |
|---------|-------|
| Lead time (idea → producción) | 6 semanas |
| Frecuencia de deploy | 1/mes |
| Tiempo medio de recuperación | 4 horas |
| Tasa de cambios fallidos | 30% |
```

## Cómo recopilar datos sin ser invasivo

### Para diversidad

```javascript
// Encuestas voluntarias y anónimas
// Agregados, nunca individuales
// Tendencias sobre tiempo, no snapshots

const survey = {
  voluntary: true,
  anonymous: true,
  reportThreshold: 5,  // No reportar grupos < 5 personas
  categories: ['Prefiero no decir', ...options]
};
```

### Para rendimiento técnico

```yaml
# Automatiza la recopilación
# DORA metrics
name: Collect Metrics
on:
  schedule:
    - cron: '0 0 * * 1'  # Cada lunes
jobs:
  metrics:
    runs-on: ubuntu-latest
    steps:
      - run: ./scripts/collect-dora-metrics.sh
```

## El cambio que generó Tracy

Después de su iniciativa:

1. **Pinterest** publicó sus números de diversidad (primeras empresas en hacerlo)
2. **Otras empresas siguieron**: Google, Facebook, etc.
3. **La conversación cambió**: De "creemos que estamos bien" a "estos son los datos, esto es lo que vamos a mejorar"

Tracy demostró que las opiniones sin datos son humo. Cuando tienes números, tienes accountability. Cuando tienes accountability, tienes progreso real. Aplica este principio a cualquier área: si no puedes medirlo, probablemente no lo estés mejorando.

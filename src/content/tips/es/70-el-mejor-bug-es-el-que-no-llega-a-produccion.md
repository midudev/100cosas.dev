---
id: "70"
title: "El mejor bug es el que no llega a producción"
category: "Testing"
categoryColor: "text-yellow-400 bg-yellow-900/20"
author: "guillermo-rauch"
---

Guillermo Rauch, con su filosofía de CI/CD continuo en Vercel, promueve un principio simple: **cada capa de prevención que añades antes de producción multiplica tu tranquilidad**.

## Las capas de defensa

```
                    PRODUCCIÓN
                         ↑
              ┌──────────────────┐
              │   Monitorización  │  ← Detecta después del hecho
              └──────────────────┘
                         ↑
              ┌──────────────────┐
              │  Preview Deploys  │  ← Detecta antes del merge
              └──────────────────┘
                         ↑
              ┌──────────────────┐
              │     E2E Tests     │  ← Detecta flujos rotos
              └──────────────────┘
                         ↑
              ┌──────────────────┐
              │ Integration Tests │  ← Detecta APIs rotas
              └──────────────────┘
                         ↑
              ┌──────────────────┐
              │    Unit Tests     │  ← Detecta lógica rota
              └──────────────────┘
                         ↑
              ┌──────────────────┐
              │    Type Check     │  ← Detecta errores de tipos
              └──────────────────┘
                         ↑
              ┌──────────────────┐
              │      Linting      │  ← Detecta errores obvios
              └──────────────────┘
                         ↑
                    TU CÓDIGO
```

Cada capa atrapa diferentes tipos de errores.

## Implementando las capas

### 1. Linting (gratis, instantáneo)

```bash
# ESLint + Prettier en cada save
npm run lint

# Prettier en pre-commit
npx lint-staged
```

### 2. TypeScript (gratis, segundos)

```typescript
// Esto NUNCA llega a producción
function greet(name: string) {
  console.log(name.toUpperCase());
}

greet(123); // ❌ Error en tiempo de compilación
```

### 3. Tests (minutos, alta confianza)

```javascript
// Unit: lógica aislada
test('calculates discount correctly', () => {
  expect(calculateDiscount(100, 0.1)).toBe(90);
});

// Integration: partes juntas
test('API returns user data', async () => {
  const response = await request(app).get('/api/users/1');
  expect(response.status).toBe(200);
});

// E2E: flujos completos
test('user can complete checkout', async ({ page }) => {
  await page.goto('/products');
  await page.click('[data-product="1"]');
  await page.click('button:text("Buy")');
  await expect(page.locator('.success')).toBeVisible();
});
```

### 4. Preview Deploys (la joya de Vercel)

```yaml
# Cada PR tiene su propio entorno
# QA, diseño, y el equipo pueden probar ANTES del merge

Pull Request #42
├── Preview URL: https://pr-42.preview.vercel.app
├── Tests: ✓ Passed
├── Lighthouse: 95/100
└── Bundle size: +2.3kb (within budget)
```

### 5. Monitorización (cuando todo lo demás falla)

```javascript
// Sentry para errores
Sentry.init({ dsn: '...' });

// Analytics para métricas de negocio
analytics.track('checkout_completed');

// Alertas para anomalías
if (errorRate > threshold) {
  alert.notify('pager');
}
```

## El coste de cada capa

```markdown
| Capa           | Tiempo    | Coste de bug encontrado |
|----------------|-----------|-------------------------|
| Linting        | Segundos  | $0 - solo arreglas      |
| TypeScript     | Segundos  | $0 - ni compila         |
| Unit Tests     | Minutos   | $10 - arreglo local     |
| E2E Tests      | Minutos   | $100 - debugging        |
| Preview        | Horas     | $1,000 - PR bloqueado   |
| Producción     | N/A       | $10,000+ - usuarios afectados |
```

Guillermo diseñó Vercel para que el camino a producción tenga múltiples checkpoints. Cada bug que atrapas antes de producción es un incidente que no tienes que gestionar a las 3am. Invierte en prevención, no en reacción.

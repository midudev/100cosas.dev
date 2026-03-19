---
id: "35"
title: "El código generado por IA necesita revisión humana"
category: "IA"
categoryColor: "text-red-400 bg-red-900/20"
author: "andrej-karpathy"
---

El vibe coding es liberador. Escribes una descripción, la IA genera código, funciona a la primera. Pero **Andrej Karpathy**, el mismo que acuñó el término, advierte constantemente sobre su lado oscuro:

> "Vibe coding is amazing for prototypes, but for production you need to actually understand and review what the AI generates."

El vibe coding es increíble para prototipos, pero para producción necesitas realmente entender y revisar lo que genera la IA.

## El problema: Código que "funciona"

La IA es muy buena generando código que compila, pasa los tests básicos, y parece funcionar. El problema es que "funciona" no significa "es seguro" ni "es correcto".

```typescript
// Código generado por IA que "funciona"
async function getUserData(userId: string) {
  const query = `SELECT * FROM users WHERE id = '${userId}'`;
  return await db.query(query);
}

// ⚠️ Problema 1: SQL Injection
// Un atacante puede enviar: userId = "'; DROP TABLE users; --"

// ⚠️ Problema 2: SELECT * expone datos sensibles
// ¿Realmente quieres devolver el hash de la contraseña?

// ⚠️ Problema 3: Sin validación de entrada
// ¿Qué pasa si userId es undefined?
```

## Los estudios son alarmantes

Investigaciones recientes muestran que un porcentaje significativo del código generado por IA contiene vulnerabilidades:

- **SQL Injection:** La IA concatena strings en queries
- **XSS:** Genera HTML sin sanitizar
- **Secrets hardcodeados:** A veces incluye API keys de ejemplo que parecen reales
- **Dependencias inseguras:** Sugiere librerías con vulnerabilidades conocidas

## El checklist de revisión de código IA

Antes de mergear código generado por IA, pregúntate:

```typescript
interface AICodeReviewChecklist {
  // Seguridad
  "¿Hay inputs sin validar?": boolean;
  "¿Hay queries construidas con concatenación?": boolean;
  "¿Hay secrets o API keys hardcodeadas?": boolean;
  "¿Se sanitiza la salida HTML?": boolean;
  
  // Corrección
  "¿Entiendo lo que hace cada línea?": boolean;
  "¿Maneja los casos borde?": boolean;
  "¿Qué pasa con null/undefined?": boolean;
  "¿Tiene tests que prueben los edge cases?": boolean;
  
  // Mantenibilidad
  "¿Los nombres son descriptivos?": boolean;
  "¿Podré depurar esto a las 3 AM?": boolean;
  "¿Sigue las convenciones del proyecto?": boolean;
}
```

## Patrones de código IA que debes revisar siempre

### 1. Manejo de errores

```typescript
// ❌ La IA suele ignorar errores
const data = await fetch(url).then(r => r.json());

// ✅ Manejo explícito
const response = await fetch(url);
if (!response.ok) {
  throw new FetchError(`HTTP ${response.status}: ${response.statusText}`);
}
const data = await response.json();
```

### 2. Validación de entrada

```typescript
// ❌ La IA confía en todo
function processOrder(order: Order) {
  return order.items.reduce((sum, item) => sum + item.price, 0);
}

// ✅ Validación antes de procesar
function processOrder(order: unknown) {
  const validated = orderSchema.parse(order);
  return validated.items.reduce((sum, item) => sum + item.price, 0);
}
```

### 3. Acceso a datos

```typescript
// ❌ La IA no piensa en autorización
async function getDocument(docId: string) {
  return await db.documents.findById(docId);
}

// ✅ Verificar permisos
async function getDocument(docId: string, userId: string) {
  const doc = await db.documents.findById(docId);
  if (doc.ownerId !== userId && !doc.isPublic) {
    throw new ForbiddenError('No access to this document');
  }
  return doc;
}
```

## La regla de oro

**Si no entiendes el código, no lo mergees.**

No importa cuánta prisa tengas. No importa si "funciona". El código que no entiendes es código que no puedes:

- Depurar cuando falle
- Modificar cuando cambien los requisitos
- Proteger cuando haya una vulnerabilidad

El vibe coding es una herramienta poderosa. Pero como toda herramienta poderosa, puede causar daño si se usa sin cuidado. **La IA genera el código; la responsabilidad es tuya.**

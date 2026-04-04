---
id: "31"
title: "Los modelos grandes tienen grandes responsabilidades"
category: "IA"
categoryColor: "text-rose-400 bg-rose-900/20"
author: "timnit-gebru"
---

**Timnit Gebru**, fundadora del Distributed AI Research Institute (DAIR) y una de las investigadoras más influyentes en ética de IA, fue despedida de Google en 2020 por un paper que advertía sobre los peligros de los modelos de lenguaje grandes (LLMs). Ese paper se ha convertido en profético.

Su mensaje central es claro:

> "We need to ask: Who benefits from this AI? Who is harmed? Who decides?"
> Necesitamos preguntar: ¿Quién se beneficia de esta IA? ¿Quién resulta dañado? ¿Quién decide?

## Los costes ocultos de los LLMs

Cuando usas ChatGPT, Claude o cualquier LLM, hay costes que no ves:

### 1. Coste ambiental

Entrenar GPT-4 consumió energía equivalente a cientos de hogares durante un año. Cada query que haces tiene una huella de carbono.

```typescript
// Lo que ves
const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "Hola" }]
});

// Lo que no ves
// - Servidores consumiendo megawatios
// - Refrigeración de centros de datos
// - Emisiones de CO2
// - Uso de agua para enfriamiento
```

### 2. Coste laboral invisible

Los modelos son "alineados" por trabajadores en países en desarrollo que revisan contenido traumático por sueldos mínimos. La IA "limpia" que usamos se construye sobre trabajo humano invisible.

### 3. Coste de los datos

Los LLMs se entrenan con datos de internet, incluyendo:
- Tu código en GitHub (sin tu consentimiento explícito)
- Artículos de periodistas y escritores (sin compensación)
- Arte de creadores (sin atribución)

## Las preguntas que Timnit nos obliga a hacer

Antes de desplegar cualquier sistema de IA, pregúntate:

```typescript
interface AIEthicsChecklist {
  // ¿Quién se beneficia?
  beneficiaries: {
    primary: string[];      // ¿La empresa? ¿Los usuarios? ¿La sociedad?
    secondary: string[];
  };

  // ¿Quién puede ser dañado?
  potentialHarms: {
    directHarms: string[];   // Discriminación, pérdida de empleo
    indirectHarms: string[]; // Impacto ambiental, concentración de poder
    invisibleLabor: string[]; // ¿Quién mantiene el sistema funcionando?
  };

  // ¿Quién decide?
  governance: {
    whoDecides: string[];    // ¿Solo ingenieros? ¿Afectados?
    appealProcess: boolean;  // ¿Pueden los afectados apelar decisiones?
    transparency: 'full' | 'partial' | 'none';
  };
}
```

## El problema de la escala

Timnit advierte que los errores en IA se multiplican por millones:

```typescript
// Un bug en una app tradicional
// Afecta a: usuarios de esa app
// Solución: desplegar un fix

// Un sesgo en un LLM usado globalmente
// Afecta a: millones de personas
// Perpetúa: estereotipos a escala masiva
// Solución: ¿? (mucho más complejo)
```

Cuando GPT genera contenido sesgado sobre un grupo, no afecta a una persona; **afecta a la percepción global de ese grupo**.

## Qué puedes hacer como desarrollador

1. **Audita antes de integrar:** No asumas que los LLMs son neutrales. Prueba con casos extremos y grupos marginados.

2. **Documenta las limitaciones:** Cuando uses IA en producción, sé transparente sobre lo que puede y no puede hacer.

3. **Mantén humanos en el loop:** Para decisiones importantes, la IA sugiere, el humano decide.

4. **Cuestiona la necesidad:** ¿Realmente necesitas un LLM para esto? A veces una búsqueda en base de datos es mejor (y más ética).

```typescript
// ❌ Usar LLM por defecto
const response = await llm.generate("¿Cuál es el horario de apertura?");

// ✅ Usar la herramienta apropiada
const hours = await database.getStoreHours(storeId);
// Más rápido, más preciso, más barato, más ético
```

## El legado de Timnit

Timnit pagó un precio alto por decir la verdad. Pero su trabajo ha cambiado cómo la industria habla de IA. Gracias a ella, preguntas que antes se ignoraban ahora son centrales en la conversación.

**Con grandes modelos vienen grandes responsabilidades.** Y esas responsabilidades son tuyas también, desarrollador.

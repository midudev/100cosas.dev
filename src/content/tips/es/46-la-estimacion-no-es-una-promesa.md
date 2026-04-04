---
id: "46"
title: "La estimación no es una promesa, es una predicción"
category: "Proceso"
categoryColor: "text-blue-400 bg-blue-900/20"
author: "robert-c-martin"
---

Robert C. Martin, conocido como Uncle Bob, dedica un capítulo entero de *The Clean Coder* a un tema que genera más conflictos en equipos de software que cualquier decisión técnica: **las estimaciones**. Su mensaje es claro: una estimación no es un número, es una distribución de probabilidad.

## Estimar no es comprometerse

Aquí es donde empieza el caos. Un desarrollador dice "esto me lleva 2 días". El project manager escucha "estará listo el jueves". El cliente escucha "el jueves a las 9:00 AM sin falta". Tres personas, tres interpretaciones completamente diferentes de la misma frase.

Uncle Bob distingue tres conceptos que solemos mezclar:

| Concepto | Significado | Ejemplo |
|----------|-------------|---------|
| **Estimación** | Predicción probabilística | "Entre 2 y 5 días, probablemente 3" |
| **Compromiso** | Promesa que debes cumplir | "Lo entrego el jueves sin falta" |
| **Deadline** | Fecha inamovible del negocio | "La campaña lanza el viernes" |

```markdown
❌ "Esto tarda 2 días"
   → ¿Es una estimación? ¿Un compromiso? ¿Una esperanza?

✅ "Estimo entre 2 y 5 días. Lo más probable son 3.
    Si necesitas un compromiso firme, puedo comprometer 5."
```

La diferencia es enorme. Cuando conviertes una estimación en un compromiso, te estás mintiendo a ti mismo y al equipo.

## Por qué somos terribles estimando

No es un defecto de carácter: es psicología humana.

**Sesgo de optimismo:** Nuestro cerebro tiende a imaginar el escenario ideal. "Si todo va bien, tardo 2 días". Pero todo nunca va bien. Hay reuniones, bugs inesperados, la API externa que cambia, el deploy que falla.

**Falacia de planificación:** Daniel Kahneman demostró que las personas consistentemente subestiman el tiempo necesario para tareas futuras, incluso cuando recuerdan que subestimaron tareas similares en el pasado. Sabemos que siempre nos quedamos cortos y aun así lo seguimos haciendo.

**Anclaje:** Si alguien dice "¿crees que esto lleva una semana?", tu estimación ya está contaminada. Tu cerebro se ancla a ese número y ajusta desde ahí, en lugar de estimar desde cero.

## La estimación de tres puntos

Uncle Bob propone un enfoque que abraza la incertidumbre en lugar de esconderla:

```markdown
Para cada tarea, estima tres valores:

O (Optimista)  → Si todo sale perfecto → 1 día
N (Nominal)    → El caso más probable  → 3 días
P (Pesimista)  → Si todo sale mal      → 8 días

Media estimada = (O + 4N + P) / 6 = (1 + 12 + 8) / 6 ≈ 3.5 días
Desviación     = (P - O) / 6 = (8 - 1) / 6 ≈ 1.2 días
```

Esto te da algo mucho más honesto que un número: **un rango con confianza**. "Estimo 3.5 días, con una desviación de 1.2 días" comunica la incertidumbre de forma explícita.

## El cono de incertidumbre

Al inicio de un proyecto, tus estimaciones pueden estar desviadas hasta un **factor de 4x** en cualquier dirección. Es decir, algo que estimas en 1 mes puede tardar entre 1 semana y 4 meses.

```markdown
Fase del proyecto     | Rango de desviación
--------------------------------------------------
Concepto inicial      | 0.25x - 4x
Requisitos aprobados  | 0.5x  - 2x
Diseño detallado      | 0.67x - 1.5x
Código completo       | 0.8x  - 1.25x
```

A medida que avanzas y reduces incertidumbre, tus estimaciones mejoran. Esto significa que **la estimación más precisa es la que haces cuando ya casi has terminado** — una paradoja frustrante pero real.

## Comunicar incertidumbre a stakeholders

El problema no es solo estimar: es comunicar. Los stakeholders no quieren rangos, quieren fechas. Aquí es donde necesitas ser honesto sin ser inútil:

```markdown
❌ "No tengo idea de cuánto va a tardar"
   → Inútil para quien necesita planificar

❌ "Estará listo en 2 semanas"
   → Falsa precisión que generará conflictos

✅ "Hay un 90% de probabilidad de que esté listo en 3 semanas.
    Si solo necesitamos la funcionalidad core, en 2 semanas.
    El caso optimista es 10 días."
   → Honesto y accionable
```

## Story points como tamaño relativo

Los story points no son horas disfrazadas. Son una medida **relativa** de complejidad. La diferencia es crucial: no estás diciendo "esto tarda 3 días", sino "esto es 3 veces más complejo que nuestra tarea de referencia".

```markdown
❌ Story points como horas encubiertas:
   "1 punto = 1 día de trabajo"

✅ Story points como comparación relativa:
   "Si el login básico es un 3,
    integrar OAuth con tres proveedores es un 8"
```

La ventaja es que los humanos somos mucho mejores comparando que estimando en absoluto. No sé cuánto pesa esta piedra, pero sé que pesa el doble que aquella. Al eliminar las unidades de tiempo, también eliminas la tentación de convertir puntos en horas — que es exactamente lo que los managers intentarán hacer.

## Divide y vencerás

La técnica más efectiva para mejorar estimaciones es **descomponer**:

```javascript
// ❌ "Implementar sistema de pagos: 3 semanas"

// ✅ Descomposición:
// - Integrar pasarela de pagos (Stripe API)     → 2-3 días
// - Modelo de datos para transacciones          → 1 día
// - Flujo de checkout en el frontend            → 2-3 días
// - Webhooks para confirmación                  → 1-2 días
// - Gestión de errores y reintentos             → 1-2 días
// - Tests de integración                        → 1-2 días
// - Entorno de sandbox y pruebas manuales       → 1 día
// Total estimado: 9-14 días laborables
```

Las tareas pequeñas son más fáciles de estimar porque tienen menos incógnitas. Y cuando sumas las estimaciones individuales, los errores tienden a cancelarse entre sí.

## El movimiento #NoEstimates

Existe un enfoque alternativo que cuestiona si deberíamos estimar en absoluto. En lugar de gastar horas debatiendo si algo es un 5 o un 8, divide el trabajo en piezas lo suficientemente pequeñas como para que todas tarden aproximadamente lo mismo (1-2 días), y simplemente cuenta las piezas.

La idea no es que las estimaciones carezcan de valor. Es que el esfuerzo de estimar con precisión a menudo no compensa el coste de hacerlo. Si tu equipo entrega consistentemente 10 historias por sprint, ya conoces tu velocidad sin estimar nada.

## La honestidad como práctica profesional

Uncle Bob insiste: **un profesional sabe decir "no sé"**. Presionar a un desarrollador para que dé una fecha exacta no hace que la fecha sea más precisa — hace que sea más falsa.

La estimación honesta requiere coraje. Decir "no puedo comprometerme a menos de 3 semanas" cuando tu jefe quiere oír "1 semana" es incómodo. Pero es infinitamente menos incómodo que explicar, una semana después, por qué no está listo.

La próxima vez que alguien te pida una estimación, recuerda que no te están pidiendo una promesa. Te están pidiendo tu mejor predicción. Y la mejor predicción incluye siempre un rango, nunca un número exacto.

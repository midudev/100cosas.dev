---
id: "22"
title: "Añadir más gente a un proyecto retrasado lo retrasa más"
category: "Gestión"
categoryColor: "text-orange-400 bg-orange-900/20"
author: "fred-brooks"
---

En 1975, **Fred Brooks** publicó *The Mythical Man-Month*, un libro que cambió para siempre la forma de entender la gestión de proyectos de software. Su observación más demoledora se conoce como **la Ley de Brooks**: **"Adding manpower to a late software project makes it later."**

Añadir más gente a un proyecto retrasado lo retrasa más.

Esta afirmación, contraintuitiva para cualquier manager que piense en términos de "recursos", se ha demostrado cierta una y otra vez durante más de 50 años. Brooks ganó el Premio Turing en 1999, en parte por esta contribución que sigue siendo dolorosamente relevante.

## ¿Por qué más gente = más retraso?

### 1. El coste de la comunicación

Cuando añades una persona a un equipo, no solo añades capacidad de trabajo; añades **canales de comunicación**. La fórmula es brutal:

```
Canales = n × (n - 1) / 2
```

- 3 personas = 3 canales
- 5 personas = 10 canales
- 10 personas = 45 canales
- 20 personas = 190 canales

Cada canal es una oportunidad para malentendidos, reuniones de sincronización y decisiones que requieren consenso.

### 2. El tiempo de formación (ramp-up)

Los nuevos miembros del equipo no son productivos desde el día uno. Necesitan:

- Entender el dominio del negocio
- Aprender la arquitectura del sistema
- Familiarizarse con las convenciones del código
- Integrarse en la dinámica del equipo

Durante este período, **consumen tiempo de los desarrolladores existentes** que podrían estar trabajando en el proyecto.

### 3. La división del trabajo tiene límites

No todas las tareas se pueden paralelizar. Como dice Brooks con una analogía memorable:

> "Nueve mujeres no pueden tener un bebé en un mes."

Algunas partes del software tienen dependencias secuenciales. Añadir más gente no acelera esas partes; solo añade overhead.

## El antipatrón en acción

```typescript
// ❌ Pensamiento de manager tradicional
interface Project {
  deadline: Date;
  estimatedEffort: number; // en persona-días
  teamSize: number;
}

function calculateNewDeadline(project: Project, additionalPeople: number): Date {
  // "Si añadimos 3 personas más, acabaremos antes"
  const newTeamSize = project.teamSize + additionalPeople;
  const daysRemaining = project.estimatedEffort / newTeamSize;
  
  // INCORRECTO: Esto ignora la Ley de Brooks
  return addDays(new Date(), daysRemaining);
}
```

```typescript
// ✅ La realidad según Brooks
function calculateRealDeadline(project: Project, additionalPeople: number): Date {
  const newTeamSize = project.teamSize + additionalPeople;
  
  // Coste de comunicación crece cuadráticamente
  const communicationOverhead = (newTeamSize * (newTeamSize - 1)) / 2;
  
  // Tiempo perdido en onboarding (2-4 semanas típicamente)
  const onboardingCost = additionalPeople * 15; // días
  
  // El trabajo efectivo se reduce por la coordinación
  const effectiveCapacity = newTeamSize * 0.7; // 30% se va en coordinación
  
  const adjustedDaysRemaining = 
    (project.estimatedEffort + onboardingCost) / effectiveCapacity;
  
  // Probablemente peor que antes
  return addDays(new Date(), adjustedDaysRemaining);
}
```

## ¿Qué hacer cuando un proyecto va retrasado?

Brooks no dice que no puedas hacer nada. Propone alternativas:

1. **Reducir el alcance:** ¿Qué features son realmente imprescindibles para el lanzamiento?

2. **Mover la fecha:** A veces la honestidad es la mejor política. Un retraso admitido es mejor que un desastre negado.

3. **Mejorar las herramientas y procesos:** ¿Hay cuellos de botella que se pueden eliminar sin añadir gente?

4. **Proteger al equipo:** Elimina interrupciones, reuniones innecesarias y cambios de prioridades constantes.

5. **Si debes añadir gente, hazlo temprano:** La ley de Brooks es más cruel cuanto más avanzado está el proyecto. Si vas a crecer el equipo, hazlo al principio, no al final.

## El "hombre-mes mítico"

El título del libro se refiere a la falacia de medir el trabajo en "persona-mes" o "persona-día", como si el trabajo humano fuera fungible e intercambiable. Brooks demostró que esta métrica es **un mito**.

Un mes de trabajo de un desarrollador experimentado no equivale a un mes de un recién llegado. Dos desarrolladores trabajando un mes no equivalen a un desarrollador trabajando dos meses. **Las personas no son unidades intercambiables.**

La próxima vez que alguien sugiera "meter más gente" para salvar un proyecto, recuerda las palabras de Fred Brooks. La solución rara vez está en añadir recursos; está en **gestionar mejor los que tienes y ser realista sobre lo que es posible**.

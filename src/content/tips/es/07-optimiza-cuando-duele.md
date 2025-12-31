---
id: "07"
title: "Optimiza cuando duele, no antes"
category: "Prácticas"
categoryColor: "text-red-400 bg-red-900/20"
author: "kent-c-dodds"
---

Donald Knuth, uno de los padres de la computación moderna, escribió una vez: *"La optimización prematura es la raíz de todos los males"*. Décadas después, en la era de los frameworks de JavaScript y las aplicaciones en tiempo real, esta advertencia de **Kent C. Dodds** sigue siendo más relevante que nunca.

La seducción de escribir el código más rápido y eficiente posible desde el primer minuto es una trampa para el ego. Nos hace sentir como ingenieros de élite, pero a menudo nos convierte en arquitectos de la complejidad innecesaria.

## El ciclo de la maestría: 3 Etapas

Para evitar esta trampa, Kent C. Dodds y otros líderes de la comunidad proponen un orden sagrado que todo desarrollador debería tatuarse en la memoria:

1.  **Haz que funcione:** Resuelve el problema. Valida tu idea. Asegúrate de que los tests pasan.
2.  **Haz que sea correcto:** Refactoriza. Mejora los nombres de las variables. Elimina la duplicidad. Hazlo legible para humanos.
3.  **Haz que sea rápido:** Solo si tienes evidencias (métricas reales) de que el rendimiento es un problema.

## El alto coste de la optimización prematura

¿Por qué es tan peligroso intentar ser rápido antes de tiempo?

*   **Complejidad gratuita:** Las optimizaciones suelen requerir algoritmos más complejos y estructuras menos intuitivas. Esto aumenta drásticamente el coste de mantenimiento.
*   **Bugs de "borde":** Al forzar la máquina, es más probable que introduzcas errores sutiles que solo ocurren en condiciones extremas y que son dificilísimos de depurar.
*   **Tiempo perdido:** A menudo pasamos horas optimizando una función que solo se ejecuta una vez al día o que representa el 0.01% del tiempo de carga de la aplicación.

## Un ejemplo real en el desarrollo Web

En el ecosistema de React, es muy común ver a desarrolladores usando `useMemo` o `useCallback` en absolutamente todos los componentes "por si acaso".

```javascript
// ❌ NIVEL 1: Optimización por deporte
// Estamos añadiendo carga cognitiva y gastando memoria para guardar
// una función que es extremadamente barata de recrear.
const handleClick = useCallback(() => {
  console.log('Action');
}, []);

// ✅ NIVEL 2: Simplicidad por defecto
// Código limpio, fácil de leer y de depurar.
// Solo añadiremos useCallback si este componente causa problemas de renderizado reales.
const handleClick = () => {
  console.log('Action');
};
```

La ironía es que, a veces, la propia infraestructura de la optimización (como las comparaciones que hace React en `useMemo`) puede ser más costosa que la propia tarea que intentamos optimizar.

Optimizar es una transacción. Estás intercambiando **claridad** por **velocidad**. Como en cualquier negocio, solo debes realizar el intercambio si el beneficio compensa el coste. 

Si no tienes una métrica que diga que algo va lento, no lo toques. La simplicidad es la optimización definitiva porque reduce el tiempo de desarrollo, el número de bugs y el estrés del equipo. Como dice Kent C. Dodds: *"Asegúrate de que tus optimizaciones son necesarias antes de que sean permanentes"*.

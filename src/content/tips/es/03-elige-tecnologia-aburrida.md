---
id: "03"
title: "Elige tecnología aburrida"
category: "Estrategia"
categoryColor: "text-red-400 bg-red-900/20"
author: "margaret-hamilton"
---

Margaret Hamilton lideró el equipo de software del programa Apollo en el MIT Instrumentation Laboratory. Cuando las vidas de los astronautas dependían de cada línea de código, no había espacio para experimentar con tecnología no probada. El Apollo Guidance Computer (AGC) usaba principios bien entendidos, arquitectura verificable y un sistema operativo construido sobre ideas que ya habían demostrado funcionar. **Elegir tecnología "aburrida" no fue una limitación: fue una decisión de ingeniería que salvó la misión Apollo 11.**

Esta filosofía tiene un nombre moderno: *Choose Boring Technology*. La idea es que cada equipo tiene una capacidad limitada para absorber novedad — unos **tres "tokens de innovación"** que puedes gastar como quieras. Cada tecnología desconocida que introduces consume atención, genera incertidumbre y multiplica los modos de fallo que nadie sabe diagnosticar. Si gastas tus tokens en reemplazar PostgreSQL por la base de datos de moda, no te quedan tokens para innovar donde realmente importa: tu producto.

## ¿Qué significa "aburrida"?

"Aburrida" no significa mala ni obsoleta. Significa **bien entendida**. Una tecnología aburrida es aquella cuyos modos de fallo ya están documentados, cuyos límites son conocidos y cuyas soluciones a problemas comunes llevan años refinándose.

Hamilton y su equipo en el MIT lo sabían intuitivamente. El AGC tenía apenas 74 KB de memoria ROM y 4 KB de RAM. No eligieron esas restricciones por gusto, pero trabajaron dentro de ellas usando técnicas probadas de gestión de memoria y priorización de tareas. Lo "aburrido" de su enfoque — verificación exhaustiva, código revisado manualmente, arquitectura defensiva — es exactamente lo que permitió que el software se recuperara solo cuando la computadora se sobrecargó durante el alunizaje.

PostgreSQL es aburrida. MySQL es aburrido. Redis es aburrido. Y eso es exactamente lo que los hace tan valiosos.

## La lección del Apollo 11

Tres minutos antes de que el Eagle tocara la superficie lunar, las alarmas 1202 y 1203 saltaron. La computadora estaba sobrecargada porque el radar de encuentro enviaba datos innecesarios. En ese momento crítico, el software de Hamilton no se bloqueó. Gracias a su sistema de prioridades — construido con técnicas bien entendidas de planificación de procesos — el AGC descartó las tareas de baja prioridad y mantuvo las esenciales: navegación y control de descenso.

Si el equipo hubiera experimentado con un sistema operativo novedoso o una arquitectura de memoria no probada, esa recuperación automática podría no haber funcionado. **La fiabilidad vino de elegir lo conocido y ejecutarlo impecablemente.**

## Los tokens de innovación en la práctica

![Diagrama de tokens de innovación: sin estrategia vs con estrategia](/images/diagrams/tip-03-innovation-tokens.svg)

Imagina que estás arrancando un proyecto nuevo. Tienes decisiones que tomar:

```text
❌ Gastando todos los tokens de innovación:

- Base de datos: SurrealDB (nuevo, prometedor, poca comunidad)
- Backend: Bun + Hono (rápido, pero ecosistema joven)
- Frontend: Qwik (innovador, pero pocos desarrolladores lo conocen)
- Infraestructura: Fly.io con Edge Computing
- Autenticación: Solución propia con WebAuthn

→ Resultado: 5 incógnitas simultáneas. Cualquier bug puede estar
  en cualquier capa y nadie tiene experiencia para diagnosticarlo.
```

```text
✅ Usando los tokens con estrategia (el enfoque Hamilton):

- Base de datos: PostgreSQL (aburrida, fiable, documentadísima)
- Backend: Node.js + Express (aburrido, millones de respuestas online)
- Frontend: React (ya es aburrido — y eso es bueno)
- Infraestructura: AWS/Vercel (predecible, bien documentada)
- Autenticación: Auth0/Clerk (problema resuelto, no reinventes)

→ Token de innovación gastado en: tu funcionalidad core diferencial

→ Resultado: 1 incógnita controlada. El resto del stack es predecible.
```

Hamilton lo expresó así: su equipo no tenía el lujo de depurar tecnología experimental en pleno vuelo. Toda la innovación se concentró donde realmente importaba — la lógica de control de misión y la recuperación de errores — mientras el resto se construyó sobre cimientos probados.

## Aburrido no significa estático

Elegir tecnología aburrida no significa quedarse anclado para siempre. Significa elegir conscientemente dónde poner la complejidad. React fue una tecnología arriesgada en 2014. Hoy es la opción "aburrida" y segura. Las tecnologías aburridas de hoy fueron las innovaciones arriesgadas de ayer que **sobrevivieron**.

La pregunta no es "¿cuál es la tecnología más moderna?" sino **"¿dónde quiero gastar mi capacidad limitada de gestionar lo desconocido?"**.

## Cuándo sí innovar

Hamilton no evitó la innovación — la concentró. Su equipo inventó conceptos revolucionarios como la recuperación asíncrona de errores y el software tolerante a fallos. Pero lo hizo sobre una base de técnicas conocidas. Aplica el mismo principio:

1. **Innova en tu diferencial**: Si eres una empresa de streaming en tiempo real, ahí es donde gastas tu token. No en reemplazar tu base de datos relacional.
2. **Innova cuando el dolor es real**: Si PostgreSQL genuinamente no puede con tu carga después de optimizar, entonces sí, explora alternativas. Pero no antes.
3. **Innova de una en una**: Nunca cambies dos cosas a la vez. Si algo falla, necesitas saber exactamente qué lo causó — igual que en las pruebas de vuelo del Apollo.

## El coste oculto de lo nuevo

Cada tecnología nueva que adoptas tiene un coste que no aparece en ningún benchmark. Todo el equipo necesita horas para ser productivo. Los problemas raros no están en Google todavía. El ecosistema es inmaduro: menos librerías, menos herramientas, menos integraciones probadas. Y siempre acecha la misma pregunta incómoda: ¿seguirá existiendo esta tecnología en tres años?

Pero quizás el coste más peligroso es el **bus factor**: solo una o dos personas del equipo dominan realmente la nueva herramienta. Si una de ellas se va, el conocimiento se va con ella. Hamilton resolvió esto en el Apollo insistiendo en que el código fuera comprensible por todo el equipo, no solo por quien lo escribió. Estos costes son invisibles en una presentación de arquitectura, pero muy reales a las 3 de la madrugada cuando el sistema se cae.

La próxima vez que sientas la tentación de adoptar la última tecnología del momento, recuerda la filosofía de Margaret Hamilton: concentra tu innovación donde realmente importa y construye todo lo demás sobre terreno firme. Cuando las vidas dependen de tu software — o cuando tu negocio depende de él — **lo aburrido es tu superpoder.**

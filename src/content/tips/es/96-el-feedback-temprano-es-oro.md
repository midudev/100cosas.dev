---
id: "96"
title: "El feedback temprano vale oro"
category: "Proceso"
categoryColor: "text-blue-400 bg-blue-900/20"
author: "guillermo-rauch"
---

Guillermo Rauch, creador de Next.js, Socket.io y CEO de Vercel, ha construido toda su carrera alrededor de una obsesión: **"El tiempo entre que escribes código y ves el resultado define la calidad de tu trabajo. Reduce ese tiempo a cero y todo mejora"**.

Esta idea no nació de la nada. Guillermo creció en Argentina programando desde adolescente, y su frustración con los ciclos de desarrollo lentos —escribir, compilar, esperar, descubrir un error, repetir— lo llevó a crear herramientas que eliminaran esa espera. Primero Socket.io, que trajo comunicación en tiempo real a la web. Después Next.js, que simplificó el desarrollo full-stack. Y finalmente Vercel, cuya propuesta central es que cada push a git genere una URL con tu cambio en producción en segundos.

## El coste del feedback tardío

Hay una regla que se repite en toda la ingeniería de software: cuanto más tarde descubres un error, más caro es arreglarlo. Un bug detectado mientras escribes el código se corrige en segundos. El mismo bug descubierto en un code review se corrige en minutos. En QA, en horas. En producción, puede costar días y la confianza de los usuarios.

```markdown
❌ Ciclo de feedback lento:
Escribir código → Hacer commit → Esperar CI (15 min) →
Merge a staging → Esperar deploy (10 min) → QA manual →
Descubrir bug → Volver a empezar
Tiempo total: horas o días

✅ Ciclo de feedback rápido:
Escribir código → Ver resultado al instante (HMR) →
Push → Preview deploy en 30s → Compartir URL con el equipo →
Feedback inmediato
Tiempo total: minutos
```

La diferencia no es solo de velocidad. Es de calidad de pensamiento. Cuando el feedback es instantáneo, experimentas más. Pruebas variaciones. Iteras. Cuando el feedback tarda 20 minutos, dejas de experimentar y empiezas a adivinar.

## La revolución del Hot Reloading

Antes de que herramientas como Vite o Webpack Dev Server existieran, cada cambio en el frontend requería recargar toda la página. Perdías el estado, tenías que volver a navegar hasta la pantalla que estabas probando, rellenar formularios de nuevo. Era como escribir un libro teniendo que releerlo entero cada vez que corriges una coma.

El Hot Module Replacement cambió las reglas: modificas un componente y ves el cambio al instante, sin perder el estado de la aplicación. Parece un detalle técnico menor, pero su impacto en la productividad es enorme. Los desarrolladores que usan HMR no solo son más rápidos; escriben mejor código, porque cada decisión visual se valida en el momento.

## Preview deploys: el feedback que cambió los equipos

La gran innovación de Vercel no fue técnica en el sentido tradicional. Fue de flujo de trabajo. Cada pull request genera automáticamente una URL única con esa versión del sitio desplegada. Cualquier persona del equipo —diseñadores, product managers, QA— puede ver los cambios en un entorno real sin necesidad de clonar el repo, instalar dependencias ni ejecutar nada.

Esto transformó la forma en que los equipos colaboran:

- **Los diseñadores** revisan el resultado visual directamente, sin capturas de pantalla desactualizadas.
- **Los product managers** validan que la feature cumple los requisitos antes del merge.
- **Los testers** detectan problemas en un entorno idéntico a producción.

El feedback que antes llegaba después del merge (cuando ya era caro de corregir) ahora llega antes, cuando el cambio todavía es barato de modificar.

## Feedback en tests: la red de seguridad invisible

El mismo principio de feedback rápido aplica a los tests. Un equipo que ejecuta tests en cada commit tiene un ciclo de feedback de minutos. Un equipo que solo testea manualmente antes de release tiene un ciclo de feedback de semanas.

La diferencia en calidad es brutal. Con tests automáticos, cada desarrollador sabe en minutos si su cambio rompió algo. Sin ellos, los bugs se acumulan silenciosamente y explotan todos juntos en la fase de QA, cuando el coste de corregirlos es máximo.

Los tests en watch mode —que se ejecutan automáticamente cada vez que guardas un archivo— llevan esta idea al extremo: escribes código y ves al instante si funciona. Es como programar con una red de seguridad permanente que te dice "tranquilo, todo sigue funcionando" o "cuidado, rompiste algo" en tiempo real.

## Más allá del código: el prototipo como conversación

Guillermo Rauch defiende algo que va más allá de las herramientas: la idea de que **un prototipo funcional vale más que cien páginas de especificación**. No porque las especificaciones sean inútiles, sino porque un prototipo genera preguntas que un documento no puede anticipar.

Cuando muestras un prototipo a un stakeholder, las reacciones son inmediatas y honestas: "Esto no es lo que imaginaba", "¿Y si el botón estuviera aquí?", "No había pensado en este caso". Esas reacciones valen oro porque llegan cuando todavía es barato cambiar de dirección.

El desarrollo basado en prototipos no reemplaza la planificación. La complementa. Planificas lo suficiente para tener dirección, y luego construyes lo suficiente para validar que la dirección es correcta.

Cuanto más rápido veas el resultado de tu código, más rápido aprendes, mejor es tu código y menos costosos son tus errores. No es solo una cuestión de herramientas: es una filosofía de desarrollo. Como dice Guillermo: *"La mejor forma de predecir si algo funciona no es discutirlo en una reunión. Es desplegarlo y verlo"*.

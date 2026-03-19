---
id: "95"
title: "Antes de cómo, pregunta para qué"
category: "Proceso"
categoryColor: "text-blue-400 bg-blue-900/20"
author: "barbara-liskov"
---

Barbara Liskov, ganadora del Premio Turing en 2008 por sus contribuciones fundamentales a los lenguajes de programación y al diseño de software, ha dedicado su vida a un principio que muchos desarrolladores olvidan en el día a día: **"La solución correcta al problema equivocado sigue siendo incorrecta. Antes de preguntarte cómo resolver algo, pregúntate para qué lo estás resolviendo"**.

Liskov es famosa por el Principio de Sustitución que lleva su nombre, pero su contribución más profunda va más allá de la herencia de clases. Su trabajo sobre abstracción de datos enseñó al mundo a separar el *qué* del *cómo*: definir claramente qué problema resuelve un módulo antes de pensar en su implementación. Y esa lección se aplica no solo al diseño de software, sino a cada decisión que tomamos como desarrolladores.

## El Problema XY: resolver lo que no se preguntó

Hay un antipatrón tan común en foros de programación que tiene nombre propio: el **Problema XY**. Funciona así: un desarrollador tiene un problema X. Piensa en una solución Y. Se atasca implementando Y. Pide ayuda con Y. Y nadie puede ayudarle porque Y era una mala solución para X desde el principio.

Un ejemplo real:

```markdown
Desarrollador: "¿Cómo parseo los últimos 3 caracteres de un filename?"
Comunidad: "¿Para qué necesitas los últimos 3 caracteres?"
Desarrollador: "Para saber la extensión del archivo."
Comunidad: "Usa path.extname(), que maneja extensiones de
cualquier longitud, puntos dobles, y archivos sin extensión."
```

El desarrollador había asumido que las extensiones siempre tienen 3 caracteres. Si hubiera preguntado "¿cómo obtengo la extensión de un archivo?", habría encontrado la solución correcta en segundos. Pero al saltar directamente al *cómo*, se perdió en una implementación frágil de un problema que ya estaba resuelto.

## La trampa de la solución prematura

Los desarrolladores somos solucionadores por naturaleza. Nos dan un problema y nuestro cerebro empieza a escribir código antes de terminar de escuchar. Pero esa urgencia por resolver es exactamente lo que nos lleva a construir cosas que nadie necesita.

```markdown
❌ Lo que pasa cuando no preguntas "para qué":

Cliente: "Necesitamos exportar los datos a Excel."
Dev: *Construye sistema completo de exportación a Excel con
formatos, estilos, múltiples hojas y fórmulas.*
Tiempo: 2 semanas.

Lo que el cliente necesitaba: ver los datos en una tabla para
filtrarlos por fecha.
Lo que habría funcionado: una tabla HTML con filtros. Tiempo: 2 días.
```

Dos semanas invertidas en la solución perfecta al problema equivocado. Y esto no es un ejemplo exagerado: ocurre a diario en equipos de todo el mundo.

## La técnica de los 5 Porqués

Toyota popularizó esta técnica en su sistema de producción, y es brutalmente efectiva para llegar a la raíz de cualquier problema:

```markdown
1. ¿Por qué se cayó la web? → Porque el servidor se quedó sin memoria.
2. ¿Por qué se quedó sin memoria? → Porque un proceso acumulaba conexiones a la DB.
3. ¿Por qué acumulaba conexiones? → Porque no cerraba las conexiones tras cada query.
4. ¿Por qué no las cerraba? → Porque no usábamos connection pooling.
5. ¿Por qué no usábamos connection pooling? → Porque nadie revisó la config por defecto.

Solución real: configurar connection pooling (30 minutos).
Solución superficial: aumentar la RAM del servidor (caro y temporal).
```

Sin los 5 Porqués, el equipo habría escalado el servidor y el problema habría vuelto en una semana. Con los 5 Porqués, resolvieron la causa raíz en media hora.

## Las preguntas que todo desarrollador debería hacer

Antes de escribir la primera línea de código, antes de abrir el editor, antes de pensar en la arquitectura, haz estas preguntas:

1. **"¿Qué problema estamos resolviendo exactamente?"**: No la solución que nos pidieron, sino el problema subyacente.
2. **"¿Cómo lo resuelven actualmente?"**: Entender el flujo actual revela restricciones y oportunidades que un requisito formal no captura.
3. **"¿Qué pasa si no hacemos nada?"**: A veces la respuesta es "nada grave", y eso reordena prioridades radicalmente.
4. **"¿Cómo sabremos que lo resolvimos?"**: Si no puedes definir el criterio de éxito, no entiendes el problema lo suficiente.

Barbara Liskov dedicó su carrera a enseñar que la abstracción correcta empieza por entender el problema correcto. La mitad de tu trabajo como desarrollador es entender qué construir. La otra mitad es construirlo. Y si te equivocas en la primera mitad, la segunda no importa. Como ella dijo en su conferencia del Turing Award: *"La clave de un buen diseño no es la elegancia de la solución, sino la claridad con la que se entiende el problema"*.

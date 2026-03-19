---
id: "93"
title: "Si lo haces tres veces, automatízalo"
category: "Productividad"
categoryColor: "text-lime-400 bg-lime-900/20"
author: "jeff-atwood"
---

Jeff Atwood, cofundador de Stack Overflow, formuló una observación que se convirtió en ley del desarrollo: la **Ley de Atwood** dice que *"cualquier aplicación que pueda ser escrita en JavaScript, eventualmente será escrita en JavaScript"*. Pero hay otra regla suya, menos citada y más práctica, que ha salvado millones de horas a desarrolladores de todo el mundo: **"Si haces algo más de tres veces a mano, estás malgastando tu tiempo. Automatízalo"**.

La primera vez que haces algo, aprendes. La segunda, confirmas el patrón. La tercera, ya es hora de que lo haga una máquina.

## La automatización que cambió la industria

Hace no tanto tiempo, desplegar una aplicación significaba conectarse por SSH a un servidor, subir archivos manualmente, reiniciar servicios y rezar para que nada se rompiera. Era un proceso tenso, lento y propenso a errores humanos. Un viernes por la tarde, nadie quería hacer un deploy.

Entonces llegó la integración continua. Y todo cambió.

```yaml
# ❌ ANTES: Deploy manual con lista de pasos en un documento
# 1. Conectar a producción por SSH
# 2. Hacer git pull
# 3. Instalar dependencias
# 4. Compilar el proyecto
# 5. Reiniciar el servicio
# 6. Verificar que funciona
# 7. Rezar

# ✅ DESPUÉS: GitHub Actions que se ejecuta en cada push a main
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm test
      - run: npm run build
      - run: npx deploy-to-production
```

El deploy manual tardaba 20 minutos y generaba ansiedad. El automatizado tarda 3 minutos y no necesita intervención humana. Multiplicado por los cientos de deploys que hace un equipo al año, la diferencia es abismal.

## Los candidatos perfectos para automatizar

No todo merece automatización, pero hay tareas que prácticamente gritan que las automatices:

1. **Setup de proyectos**: Si cada vez que empiezas un proyecto repites los mismos 15 pasos, crea un script o un template.
2. **Formateo y linting**: Pre-commit hooks que formatean el código automáticamente. Nunca más discusiones sobre tabs vs spaces en un code review.
3. **Tests antes del merge**: Que ningún PR se pueda fusionar sin pasar los tests. Sin excepciones.
4. **Backups de base de datos**: Cron jobs que ejecutan backups cada noche. Cuando los necesites, será demasiado tarde para configurarlos.
5. **Rotación de logs y limpieza**: Scripts que evitan que el disco se llene a las 3 de la madrugada.

## Cuándo NO automatizar

Aquí es donde muchos desarrolladores caen en la trampa. Hay un cómic clásico de xkcd que muestra a un programador automatizando una tarea de 5 minutos durante 3 días. La automatización tiene un coste, y a veces el coste es mayor que el beneficio.

No automatices cuando:

- **La tarea cambia cada vez**: Si el proceso es diferente en cada ejecución, un script rígido será más problema que solución.
- **Solo lo harás una o dos veces más**: El umbral de "tres veces" existe por algo. No inviertas 4 horas en automatizar algo que harás 2 veces más en tu vida.
- **El coste de error es altísimo**: Automatizar un borrado masivo de datos en producción sin supervisión humana es una receta para el desastre.

## El ROI de la automatización

Jeff Atwood propone un cálculo simple: ¿cuánto tiempo te ahorra la automatización en un año?

```markdown
Tarea manual: configurar entorno de desarrollo
Tiempo por ejecución: 45 minutos
Frecuencia: 2 veces al mes (nuevos miembros, nuevos proyectos)
Tiempo anual: 45min × 24 = 18 horas

Script de automatización: 3 horas de desarrollo
Tiempo por ejecución con script: 5 minutos
Tiempo anual con script: 5min × 24 = 2 horas

Ahorro anual: 16 horas
ROI en el primer año: 433%
```

Y esto es solo para una tarea. Un equipo que adopta la cultura de la automatización puede recuperar cientos de horas al año. Horas que se pueden dedicar a resolver problemas reales en lugar de repetir pasos mecánicos.

El mejor código que puedes escribir es el que elimina trabajo repetitivo para siempre. No se trata de automatizar por automatizar, sino de reconocer cuándo tu tiempo vale más que el de una máquina. La primera vez, hazlo manual y aprende. La segunda, toma notas. La tercera, escribe el script. Como dice Atwood: *"Los desarrolladores más productivos no son los que escriben más código, sino los que eliminan más trabajo innecesario"*.

---
id: "09"
title: "Haz cosas que no escalen"
category: "Estrategia"
categoryColor: "text-red-400 bg-red-900/20"
author: "paul-graham"
---

Paul Graham, cofundador de **Y Combinator** y una de las mentes más influyentes del ecosistema startup, publicó en 2013 un ensayo que se convirtió en evangelio para emprendedores: *Do Things That Don't Scale*. Su argumento central desarma una de las obsesiones más peligrosas del mundo tech: **la escalabilidad prematura**.

La idea es incómodamente simple: al principio, haz todo a mano. Habla con cada usuario personalmente. Resuelve problemas uno a uno. Escribe scripts chapuceros. Haz cosas que serían ridículas a gran escala. Porque al principio **no estás a gran escala**, y fingir que lo estás es la forma más rápida de fracasar.

## Los fundadores que fueron puerta a puerta

Graham cuenta historias que se han convertido en leyendas de Silicon Valley. Los fundadores de **Airbnb** iban literalmente puerta a puerta en Nueva York, visitando a sus primeros anfitriones para fotografiar sus apartamentos con cámaras profesionales. No escalaba. Era absurdo para una empresa de tecnología. Pero funcionó: las fotos profesionales dispararon las reservas.

**Stripe**, en sus inicios, hacía algo que llamaban "instalación Collison": en lugar de decir "visita nuestra web y regístrate", los fundadores Patrick y John Collison se ofrecían a instalar la integración de pagos ahí mismo, en el portátil del potencial cliente. No escalaba. Pero cada instalación manual les daba feedback directo y un cliente comprometido.

## La escalabilidad prematura mata más proyectos que la falta de ella

Este es el punto que muchos desarrolladores no entienden: **no necesitas escalar lo que aún no existe**. Si tu producto no tiene usuarios, no necesitas microservicios. Si tu base de datos tiene 500 filas, no necesitas sharding. Si tu equipo son dos personas, no necesitas Kubernetes.

La escalabilidad prematura consume tres recursos que son escasos al principio: tiempo, atención y dinero. Cada hora que pasas configurando infraestructura para un millón de usuarios es una hora que no pasas hablando con tus primeros diez.

## En código: empieza simple, escala cuando duela

La tentación del desarrollador es construir "la arquitectura correcta" desde el día uno. Graham nos dice: resiste esa tentación.

```typescript
// ❌ Día 1 con 0 usuarios: arquitectura para un millón
// api-gateway/src/routes/userRoutes.ts
// user-service/src/handlers/createUser.ts
// notification-service/src/workers/emailWorker.ts
// auth-service/src/middleware/jwtValidator.ts
// shared/src/events/userCreatedEvent.ts
// docker-compose.yml (5 servicios, Redis, RabbitMQ, PostgreSQL)

// 6 repositorios, 3 bases de datos, una cola de mensajes,
// un API gateway... para 0 usuarios.
```

```typescript
// ✅ Día 1 con 0 usuarios: un archivo que funciona
import express from 'express';
import Database from 'better-sqlite3';

const app = express();
const db = new Database('app.db');

app.use(express.json());

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

app.post('/users', (req, res) => {
  const { email, name } = req.body;
  const result = db.prepare(
    'INSERT INTO users (email, name) VALUES (?, ?)'
  ).run(email, name);
  res.json({ id: result.lastInsertRowid, email, name });
});

app.listen(3000);
// 1 archivo, SQLite, Express. Funciona. Despliega en 5 minutos.
// Cuando tengas 1.000 usuarios, migra a PostgreSQL.
// Cuando tengas 100.000, considera separar servicios.
```

El primer enfoque tiene una arquitectura elegante para un producto que quizás nadie quiere. El segundo tiene un producto funcionando que puedes poner delante de usuarios reales hoy.

## La regla de Graham aplicada al desarrollo

El principio se extiende más allá de startups. Aplica a cualquier proyecto nuevo:

1. **Base de datos**: Empieza con SQLite o incluso un archivo JSON. Migra a PostgreSQL cuando el rendimiento lo exija, no antes.
2. **Despliegues**: `git push` + un script de 3 líneas. CI/CD sofisticado cuando tengas un equipo que lo necesite.
3. **Monitorización**: `console.log` al principio. Datadog cuando tengas tráfico real que monitorizar.
4. **Autenticación**: Una cookie con sesión. OAuth y SSO cuando tengas clientes enterprise que lo pidan.

## ¿Cuándo escalar entonces?

Graham es claro: **cuando duela**. No cuando "podría" doler. No cuando leas un artículo sobre cómo Netflix maneja millones de requests. Cuando tu sistema real, con tus usuarios reales, se quede corto.

Las señales son inconfundibles:

1. La base de datos tarda más de lo aceptable en responder.
2. Los despliegues manuales causan errores recurrentes.
3. Un solo archivo de 2.000 líneas es imposible de navegar.
4. Dos desarrolladores están editando el mismo módulo constantemente.

Esas son señales de que es hora de escalar **esa parte específica**. No todo el sistema — solo lo que duele.

## El coraje de lo simple

Hacer cosas que no escalan requiere coraje. En una industria obsesionada con la arquitectura perfecta, elegir lo simple se siente como hacer trampa. Pero como Graham lleva años demostrando con las startups de Y Combinator, los ganadores no son los que tenían la mejor arquitectura al principio — son los que pusieron algo real delante de usuarios reales lo antes posible.

Tu trabajo al principio no es construir un sistema perfecto. Es **aprender qué sistema necesitas construir**. Y eso solo lo descubres haciendo cosas que no escalan, hablando con usuarios, y dejando que la realidad te guíe. Como dice Graham, **la escalabilidad es un problema del éxito. Primero consigue el éxito.**

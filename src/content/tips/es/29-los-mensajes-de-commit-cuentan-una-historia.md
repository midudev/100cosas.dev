---
id: "29"
title: "Los mensajes de commit son cartas a tu futuro yo"
category: "Prácticas"
categoryColor: "text-emerald-400 bg-emerald-900/20"
author: "linus-torvalds"
---

Linus Torvalds creó Git en 2005 para gestionar el kernel de Linux, uno de los proyectos de software más grandes y longevos del mundo. Con más de 15.000 contribuidores y décadas de historial, Linus aprendió algo que muchos desarrolladores descubren demasiado tarde: **un mensaje de commit es la única explicación que tendrás dentro de seis meses**.

Y Linus no se anda con rodeos. Es famoso por rechazar patches con malos mensajes de commit, sin importar la calidad del código. Para él, un commit sin contexto es código que nadie podrá mantener.

## El commit que no dice nada

Abre el log de casi cualquier proyecto y encontrarás un cementerio de mensajes inútiles:

```bash
# ❌ El historial del horror
git log --oneline

a3f2d1c fix
b8e4a2f update
c7d3e5a fix bug
d1f8b3c changes
e5a2c4d WIP
f9b6d7e asdf
g2c8a1f final fix (mentira, habrá más)
h4d9e2a fix fix
```

Seis meses después, algo se rompe. Haces `git blame` para entender qué cambió y por qué. Y todo lo que encuentras es "fix". Fix de qué. Cuándo. Por qué. Para quién. Nadie lo sabe. El autor tampoco se acuerda.

## Las reglas de Linus para el kernel de Linux

El estándar de mensajes de commit del kernel de Linux es estricto por una razón: miles de personas dependen de poder entender cada cambio:

1. **Subject line de máximo 50 caracteres** — Es el titular, debe caber en un `git log --oneline`
2. **Modo imperativo** — "Fix memory leak", no "Fixed memory leak" ni "Fixes memory leak"
3. **Línea en blanco** entre subject y body
4. **Body que explica el POR QUÉ**, no el QUÉ — El diff ya muestra qué cambió; el mensaje debe explicar la motivación

```bash
# ❌ Solo dice QUÉ (el diff ya lo muestra)
Fix null pointer in user service

Changed the getUser function to check for null
before accessing properties.

# ✅ Explica POR QUÉ (lo que el diff no puede decir)
Fix null pointer when fetching deleted users

Users deleted via the admin panel kept their session
tokens active for up to 30 minutes (token TTL).
During that window, API calls with valid tokens
referenced user records that no longer existed,
causing null pointer exceptions in getUser().

The fix adds a null check with a specific error
that triggers token invalidation, preventing
cascading failures in downstream services.

Reported-by: ops-team (incident #4521)
```

El segundo mensaje es una mini-historia. Dentro de un año, cuando alguien se pregunte por qué hay un null check ahí, no tendrá que adivinar. La respuesta está en el commit.

## Conventional Commits: estructura para equipos

Para proyectos donde no eres Linus dirigiendo el kernel, **Conventional Commits** ofrece una convención práctica:

```bash
# Formato: <tipo>(<scope>): <descripción>

feat(auth): add OAuth2 login with Google
fix(cart): prevent duplicate items on rapid clicks
refactor(api): extract validation middleware from routes
docs(readme): add deployment instructions for Docker
perf(images): lazy-load below-the-fold images
test(payments): add integration tests for Stripe webhook
chore(deps): update dependencies to fix security advisories
```

La ventaja no es solo legibilidad. Con Conventional Commits puedes automatizar la generación del CHANGELOG y el versionado semántico: cada `feat` sube la versión minor, cada `fix` la patch, y un `BREAKING CHANGE` la major.

## El poder de git blame

Con buenos mensajes de commit, `git blame` se convierte en una máquina del tiempo:

```bash
$ git blame src/auth/session.js

a1b2c3d4 (Ana López  2024-03-15) function validateSession(token) {
d5e6f7a8 (Carlos Ruiz 2024-06-22)   if (!token || token.expired) {
d5e6f7a8 (Carlos Ruiz 2024-06-22)     revokeAllUserSessions(token.userId);
d5e6f7a8 (Carlos Ruiz 2024-06-22)     throw new SessionExpiredError();
d5e6f7a8 (Carlos Ruiz 2024-06-22)   }
```

Ves que Carlos modificó esas líneas en junio. Haces `git show d5e6f7a8` y encuentras:

```
fix(auth): revoke all sessions on expired token access

After the security audit (SEC-2024-031), we discovered
that expired tokens were only invalidated individually,
allowing attackers to use parallel sessions. Now we
revoke ALL sessions for the user when any expired token
is detected, forcing re-authentication.
```

En 30 segundos entiendes: fue un fix de seguridad, hay una auditoría asociada, y hay una razón específica para el comportamiento "agresivo" de revocar todas las sesiones. Sin ese mensaje, alguien podría pensar que es un bug y "arreglarlo" quitando la revocación masiva.

## Commits atómicos: una idea, un commit

Un commit debe contener **un solo cambio lógico**. No tres features, un fix y un refactor todo junto:

```bash
# ❌ El commit monstruo
git add .
git commit -m "update everything"
# 47 archivos cambiados, 3 features, 2 fixes, 1 refactor

# ✅ Commits atómicos
git add src/auth/
git commit -m "feat(auth): add rate limiting to login endpoint"

git add src/components/LoginForm.*
git commit -m "fix(login): show remaining attempts after failed login"

git add src/middleware/
git commit -m "refactor(middleware): extract auth logic to dedicated module"
```

¿Por qué importa? Porque `git bisect` es tu mejor amigo para encontrar cuándo se introdujo un bug:

```bash
$ git bisect start
$ git bisect bad HEAD
$ git bisect good v2.1.0
# Git hace búsqueda binaria entre esos puntos
# Con commits atómicos, encuentra el culpable exacto
```

Antes de cada commit, hazte una pregunta simple: **¿mi mensaje explica por qué hice este cambio?** Si solo describe el qué, el diff ya cuenta esa historia mejor que tú. Un historial de commits bien escrito no es vanidad. Es infraestructura. El revisor en code review entiende la intención antes de leer el código. `git bisect` encuentra bugs en minutos en vez de horas. Un nuevo miembro del equipo lee el log y entiende las decisiones que tomó el equipo antes de su llegada. Y a diferencia de la documentación tradicional, los commits se escriben en el mismo momento que el cambio, así que nunca quedan desactualizados.

Linus Torvalds rechaza patches de los mejores programadores del mundo si el mensaje de commit no es bueno. No porque sea exigente por gusto, sino porque el kernel de Linux debe ser mantenido por miles de personas durante décadas. Tu proyecto puede ser más pequeño, pero el principio es el mismo: **el código explica el cómo, el commit explica el por qué, y sin el por qué, el cómo no tiene sentido**.

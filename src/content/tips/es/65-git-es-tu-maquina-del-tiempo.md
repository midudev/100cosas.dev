---
id: "65"
title: "Git es tu máquina del tiempo, úsala bien"
category: "Herramientas"
categoryColor: "text-slate-400 bg-slate-900/20"
author: "julia-evans"
---

Julia Evans ha explicado Git mejor que nadie con sus zines visuales. Su consejo: **Git no es solo para guardar código, es para entender la historia de tu proyecto**.

## Commits que cuentan historias

```bash
# ❌ Commits inútiles
git commit -m "fix"
git commit -m "update"
git commit -m "changes"
git commit -m "asdasd"

# ✅ Commits que documentan
git commit -m "fix: prevent double-submit on payment form"
git commit -m "feat: add email validation to signup"
git commit -m "refactor: extract auth logic to separate module"
```

Dentro de 6 meses, `git log` será tu mejor documentación.

## Comandos que cambian todo

### Entender qué pasó

```bash
# ¿Quién escribió esta línea y por qué?
git blame src/components/Auth.js

# ¿Cuándo se introdujo este bug?
git bisect start
git bisect bad HEAD
git bisect good v1.0.0
# Git encuentra automáticamente el commit problemático
```

### Deshacer con confianza

```bash
# "Quiero ver cómo era este archivo ayer"
git show HEAD~1:src/app.js

# "Necesito revertir el último commit"
git revert HEAD

# "Quiero descartar cambios locales en un archivo"
git checkout -- src/file.js

# "Guardé cambios que no debía en este commit"
git reset --soft HEAD~1
# Ahora los cambios están de vuelta en staging
```

### Trabajo en progreso

```bash
# Guarda tu trabajo sin commitear
git stash push -m "WIP: feature de pagos"

# Lista lo que tienes guardado
git stash list

# Recupera tu trabajo
git stash pop
```

## El flujo que funciona

```bash
# 1. Crea rama para tu feature
git checkout -b feature/nueva-funcionalidad

# 2. Commits pequeños y frecuentes
git add -p  # Añade cambios interactivamente
git commit -m "add: button component structure"
git commit -m "add: button styles"
git commit -m "add: button click handler"

# 3. Antes de mergear, limpia
git rebase -i main
# Combina commits relacionados
# Reordena si tiene sentido
# Reescribe mensajes confusos

# 4. Mergea con historia limpia
git checkout main
git merge feature/nueva-funcionalidad
```

## Los errores más comunes

### 1. Commits gigantes

```bash
# ❌ 50 archivos cambiados, "implement everything"
# Imposible de revisar, imposible de revertir parcialmente

# ✅ Commits atómicos
# Cada commit es una unidad lógica que puede revertirse independientemente
```

### 2. Nunca usar branches

```bash
# ❌ Todo en main
# Un error y todo el equipo sufre

# ✅ Feature branches
# Experimentas libremente, merges cuando funciona
```

### 3. Force push sin pensar

```bash
# 😱 Esto puede destruir el trabajo de otros
git push --force

# 😌 Esto es seguro
git push --force-with-lease
# Solo fuerza si nadie más ha pusheado
```

Julia nos muestra que Git es más que `add-commit-push`. Es un sistema de viaje en el tiempo que te permite entender, experimentar y deshacer sin miedo. Invertir tiempo en aprenderlo bien te ahorra horas de frustración.

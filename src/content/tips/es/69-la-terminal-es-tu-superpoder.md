---
id: "69"
title: "La terminal es tu superpoder"
category: "Herramientas"
categoryColor: "text-slate-400 bg-slate-900/20"
author: "jessie-frazelle"
---

Jessie Frazelle fue mantenedora del core de Docker, contribuyó a Kubernetes y al lenguaje Go, y añadió el perfil Seccomp por defecto a Docker. Es famosa por ejecutar **absolutamente todo** en contenedores desde la terminal: Chrome, Spotify, LibreOffice, hasta aplicaciones de escritorio. Su filosofía: **la terminal no es solo una herramienta, es tu entorno operativo completo, y los contenedores son la capa que lo hace seguro y reproducible**.

## La filosofía de Jessie: todo es un contenedor

¿Por qué ejecutar un navegador dentro de Docker? Porque cada aplicación debería correr aislada, con los mínimos permisos necesarios, sin contaminar tu sistema. Jessie llevó esta idea al extremo y demostró que funciona.

```bash
# Ejecutar Chrome en un contenedor
docker run -d \
  --memory 512mb \
  --net host \
  --cpuset-cpus 0 \
  --security-opt seccomp=chrome.json \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -e DISPLAY=unix$DISPLAY \
  -v $HOME/Downloads:/home/user/Downloads \
  --name chrome \
  jess/chrome

# Ejecutar LibreOffice aislado
docker run -d \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -e DISPLAY=unix$DISPLAY \
  -v $HOME/Documents:/home/user/Documents \
  --name libreoffice \
  jess/libreoffice
```

La ventaja es clara: si Chrome se compromete, no tiene acceso a tus claves SSH, tus tokens de API ni tus archivos de trabajo. **Seguridad por defecto, no por esfuerzo.**

## Comandos esenciales de terminal

### Navegación y búsqueda

```bash
# Encuentra archivos por nombre
find . -name "*.js" -type f

# Busca texto en archivos (rápido y moderno)
rg "TODO" --type js

# Busca un proceso y mátalo
ps aux | grep node
kill -9 <PID>

# Historial de comandos con búsqueda
history | grep "docker"
Ctrl+R  # Búsqueda interactiva
```

### Manipulación de archivos

```bash
# Ver diferencias con colores
diff --color file1.js file2.js

# Seguir un log en tiempo real
tail -f /var/log/app.log

# Contar líneas de código
find . -name "*.ts" -not -path "*/node_modules/*" | xargs wc -l

# Renombrar archivos en lote
for f in *.jpeg; do mv "$f" "${f%.jpeg}.jpg"; done
```

### Procesos y red

```bash
# ¿Qué está usando el puerto 3000?
lsof -i :3000

# Liberar un puerto
kill $(lsof -t -i:3000)

# Ver uso de disco ordenado por tamaño
du -sh * | sort -rh | head -20

# Comprobar conectividad
curl -sI https://example.com | head -5
```

## Docker desde la terminal: el flujo de Jessie

### Entornos de desarrollo desechables

```bash
# Entorno Node.js temporal para probar algo rápido
docker run --rm -it -v $(pwd):/app -w /app node:20 bash

# Entorno Python aislado
docker run --rm -it -v $(pwd):/app -w /app python:3.12 bash

# Base de datos para desarrollo local
docker run --rm -d \
  --name dev-postgres \
  -e POSTGRES_PASSWORD=dev123 \
  -p 5432:5432 \
  postgres:16
```

### Seguridad multi-capa

Jessie añadió los perfiles Seccomp a Docker para limitar las syscalls que un contenedor puede ejecutar. Esto es seguridad multi-capa en acción:

```bash
# Ejecutar con perfil Seccomp personalizado
docker run --rm \
  --security-opt seccomp=custom-profile.json \
  --read-only \
  --cap-drop ALL \
  --cap-add NET_BIND_SERVICE \
  my-app

# Inspeccionar qué capabilities tiene un contenedor
docker inspect --format='{{.HostConfig.CapAdd}}' my-container

# Ejecutar sin acceso a red
docker run --rm --network none alpine wget http://example.com
# Falla: exactamente lo que queremos
```

## Alias que cambian todo

```bash
# ~/.zshrc o ~/.bashrc

# Git
alias gs="git status"
alias gc="git commit -m"
alias gp="git push"
alias gl="git log --oneline -15"
alias gd="git diff"

# Navegación
alias ..="cd .."
alias ...="cd ../.."
alias ll="ls -la"

# Docker (al estilo Jessie)
alias dps="docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'"
alias dimg="docker images --format 'table {{.Repository}}\t{{.Tag}}\t{{.Size}}'"
alias drm="docker rm -f"
alias dprune="docker system prune -af --volumes"
alias dlog="docker logs -f"
alias dex="docker exec -it"

# Desarrollo
alias nr="npm run"
alias nrd="npm run dev"
alias nrb="npm run build"

# Limpiar rápido
alias rmnode="find . -name 'node_modules' -type d -prune -exec rm -rf {} +"
```

## Scripts que automatizan tu flujo

### Levantar un entorno de desarrollo completo

```bash
#!/bin/bash
# ~/scripts/dev-up.sh

PROJECT_DIR=${1:-.}
cd "$PROJECT_DIR" || exit 1

echo "🐳 Levantando servicios..."
docker compose up -d

echo "📦 Instalando dependencias..."
npm install --silent

echo "🔍 Verificando puertos..."
for port in 3000 5432 6379; do
  if lsof -i :$port > /dev/null 2>&1; then
    echo "  ✅ Puerto $port activo"
  else
    echo "  ⚠️  Puerto $port no responde"
  fi
done

echo "🚀 Arrancando dev server..."
npm run dev
```

### Limpiar contenedores huérfanos

```bash
#!/bin/bash
# ~/scripts/docker-cleanup.sh

echo "Contenedores parados:"
docker ps -a --filter "status=exited" --format "{{.Names}} ({{.Image}})"

echo ""
read -p "¿Eliminar todo? (s/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Ss]$ ]]; then
  docker container prune -f
  docker image prune -f
  docker volume prune -f
  echo "✅ Limpieza completa"
fi
```

## Herramientas modernas de terminal

```bash
# fzf: búsqueda fuzzy para archivos, historial, ramas...
Ctrl+T  # Buscar archivos
Ctrl+R  # Buscar en historial

# bat: cat con syntax highlighting y números de línea
bat Dockerfile

# eza: ls moderno con info de git
eza -la --git --icons

# httpie: HTTP para humanos
http GET api.example.com/users Authorization:"Bearer $TOKEN"

# jq: manipular JSON como un profesional
docker inspect my-container | jq '.[0].NetworkSettings.IPAddress'

# lazydocker: dashboard de Docker en la terminal
lazydocker
```

## La lección de Jessie

Jessie Frazelle demostró que no necesitas salir de la terminal para nada. Su enfoque va más allá de la productividad: cada proceso aislado en un contenedor es una capa de seguridad adicional, cada alias es un segundo ahorrado que se multiplica miles de veces, y cada script es una tarea que nunca tendrás que repetir manualmente.

La terminal no es "old school". Es tu entorno operativo, tu sistema de seguridad y tu multiplicador de productividad, todo en uno.

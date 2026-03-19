---
id: "69"
title: "La terminal es tu superpoder"
category: "Herramientas"
categoryColor: "text-slate-400 bg-slate-900/20"
author: "mislav-marohnic"
---

Mislav Marohnić, mantenedor de la CLI de GitHub, vive en la terminal. Su consejo: **dominar la terminal multiplica tu productividad de formas que ningún IDE puede igualar**.

## Comandos que deberías conocer

### Navegación y búsqueda

```bash
# Encuentra archivos por nombre
find . -name "*.js" -type f

# Busca texto en archivos
grep -r "TODO" ./src

# Busca texto (versión moderna)
rg "function" --type js

# Historial de comandos
history | grep "docker"
Ctrl+R  # Búsqueda interactiva en historial
```

### Manipulación de archivos

```bash
# Ver diferencias
diff file1.js file2.js
# O con colores
diff --color file1.js file2.js

# Últimas líneas de un log (en vivo)
tail -f server.log

# Contar líneas de código
find . -name "*.ts" | xargs wc -l

# Renombrar múltiples archivos
for f in *.jpeg; do mv "$f" "${f%.jpeg}.jpg"; done
```

### Procesos y red

```bash
# ¿Qué usa el puerto 3000?
lsof -i :3000

# Matar proceso por puerto
kill $(lsof -t -i:3000)

# Ver uso de disco
du -sh *

# Descargar algo
curl -O https://example.com/file.zip
```

## Alias que cambian todo

```bash
# ~/.zshrc o ~/.bashrc

# Git shortcuts
alias gs="git status"
alias gc="git commit -m"
alias gp="git push"
alias gl="git log --oneline -10"

# Navegación
alias ..="cd .."
alias ...="cd ../.."
alias ll="ls -la"

# Desarrollo
alias nr="npm run"
alias nrd="npm run dev"
alias nrb="npm run build"

# Proyectos frecuentes
alias proj="cd ~/projects"
alias work="cd ~/work/main-project && code ."
```

## Scripts que automatizan

```bash
#!/bin/bash
# ~/scripts/new-component.sh

NAME=$1
mkdir -p "src/components/$NAME"
cat > "src/components/$NAME/$NAME.tsx" << EOF
export function $NAME() {
  return <div>$NAME component</div>;
}
EOF

cat > "src/components/$NAME/$NAME.test.tsx" << EOF
import { render } from '@testing-library/react';
import { $NAME } from './$NAME';

test('renders', () => {
  render(<$NAME />);
});
EOF

echo "✅ Created component $NAME"
```

Uso:

```bash
./new-component.sh Button
```

## Herramientas modernas

```bash
# fzf - fuzzy finder
# Navega archivos, historial, todo con búsqueda fuzzy
Ctrl+T  # Buscar archivos
Ctrl+R  # Buscar en historial

# bat - cat con syntax highlighting
bat package.json

# exa/eza - ls moderno
exa -la --git

# httpie - curl más amigable
http GET api.example.com/users

# jq - manipular JSON
cat data.json | jq '.users[].name'
```

## El flujo de Mislav

```bash
# Abrir proyecto
cd ~/projects/my-app
git pull
npm run dev &

# En otra pestaña
gh pr list        # Ver PRs pendientes
gh pr checkout 42 # Checkout de un PR
npm test         # Correr tests
gh pr merge      # Mergear desde terminal
```

## Reflexión final

Mislav demuestra que la terminal no es "old school" - es la herramienta más poderosa que tienes. Cada hora invertida aprendiendo comandos y creando alias te ahorra días a lo largo del año.

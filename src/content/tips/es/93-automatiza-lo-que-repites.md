---
id: "93"
title: "Si lo haces tres veces, automatízalo"
category: "Productividad"
categoryColor: "text-lime-400 bg-lime-900/20"
author: "jeff-atwood"
---

Jeff Atwood, co-fundador de Stack Overflow, aplica una regla simple: **si haces algo más de tres veces, automatízalo**.

## Candidatos a automatización

```bash
# Deploy manual → GitHub Actions
# Setup de proyecto → Template o script
# Formateo de código → Pre-commit hooks
# Review de PRs → Linters automáticos
# Backup de datos → Cron jobs
```

## El script de 5 minutos

```bash
#!/bin/bash
# setup-project.sh

mkdir -p src/{components,utils,hooks}
npm init -y
npm install typescript eslint prettier
npx tsc --init
echo "✅ Proyecto listo"
```

## Reflexión final

El tiempo invertido en automatización se recupera exponencialmente. Pero no automatices antes de tiempo: primero hazlo 3 veces manual.

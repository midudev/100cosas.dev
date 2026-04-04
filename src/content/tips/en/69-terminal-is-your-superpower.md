---
id: "69"
title: "The terminal is your superpower"
category: "Tools"
categoryColor: "text-slate-400 bg-slate-900/20"
author: "jessie-frazelle"
---

Jessie Frazelle was a core maintainer of Docker, contributed to Kubernetes and Go, and added the default Seccomp profile to Docker. She's famous for running **everything** in containers from the terminal: Chrome, Spotify, LibreOffice, even desktop apps. Her philosophy: **the terminal is your complete operating environment, and containers are the layer that makes it secure and reproducible**.

## Everything is a container

Why run a browser inside Docker? Because every application should run isolated, with minimal permissions, without polluting your system.

```bash
# Run Chrome in a container
docker run -d \
  --memory 512mb \
  --net host \
  --security-opt seccomp=chrome.json \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -e DISPLAY=unix$DISPLAY \
  -v $HOME/Downloads:/home/user/Downloads \
  --name chrome \
  jess/chrome
```

If Chrome gets compromised, it has no access to your SSH keys, API tokens, or work files. **Security by default, not by effort.**

## Essential commands

```bash
# Fast text search
rg "TODO" --type js

# Follow a log in real time
tail -f /var/log/app.log

# What's using port 3000?
lsof -i :3000

# Kill process by port
kill $(lsof -t -i:3000)

# Disk usage sorted by size
du -sh * | sort -rh | head -20
```

## Docker-first development

```bash
# Disposable Node.js environment
docker run --rm -it -v $(pwd):/app -w /app node:20 bash

# Run with multi-layer security
docker run --rm \
  --security-opt seccomp=custom-profile.json \
  --read-only \
  --cap-drop ALL \
  --cap-add NET_BIND_SERVICE \
  my-app

# Inspect container capabilities
docker inspect --format='{{.HostConfig.CapAdd}}' my-container
```

## Aliases that change everything

```bash
# Git
alias gs="git status"
alias gc="git commit -m"
alias gl="git log --oneline -15"

# Docker (Jessie-style)
alias dps="docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'"
alias dprune="docker system prune -af --volumes"
alias dlog="docker logs -f"
alias dex="docker exec -it"

# Quick cleanup
alias rmnode="find . -name 'node_modules' -type d -prune -exec rm -rf {} +"
```

## Modern terminal tools

```bash
# fzf: fuzzy search for files, history, branches
# bat: cat with syntax highlighting
# eza: modern ls with git info
# jq: manipulate JSON like a pro
docker inspect my-container | jq '.[0].NetworkSettings.IPAddress'
# lazydocker: Docker dashboard in your terminal
```

## Jessie's lesson

Jessie Frazelle proved you never need to leave the terminal. Her approach goes beyond productivity: every process isolated in a container is an extra security layer, every alias is a second saved that multiplies thousands of times, and every script is a task you'll never have to repeat manually.

The terminal isn't "old school". It's your operating environment, your security system, and your productivity multiplier, all in one.

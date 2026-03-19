---
id: "69"
title: "The terminal is your superpower"
category: "Tools"
categoryColor: "text-slate-400 bg-slate-900/20"
author: "mislav-marohnic"
---

Mislav Marohnić, maintainer of GitHub's CLI, lives in the terminal. His advice: **mastering the terminal multiplies your productivity in ways no IDE can match**.

## Commands you should know

### Navigation and search

```bash
# Find files by name
find . -name "*.js" -type f

# Search text in files
grep -r "TODO" ./src

# Search text (modern version)
rg "function" --type js

# Command history
history | grep "docker"
Ctrl+R  # Interactive history search
```

### File manipulation

```bash
# See differences
diff file1.js file2.js

# Last lines of a log (live)
tail -f server.log

# Count lines of code
find . -name "*.ts" | xargs wc -l
```

### Processes and network

```bash
# What's using port 3000?
lsof -i :3000

# Kill process by port
kill $(lsof -t -i:3000)
```

## Aliases that change everything

```bash
# ~/.zshrc or ~/.bashrc

# Git shortcuts
alias gs="git status"
alias gc="git commit -m"
alias gp="git push"

# Development
alias nr="npm run"
alias nrd="npm run dev"
```

## Modern tools

```bash
# fzf - fuzzy finder
# bat - cat with syntax highlighting
# httpie - friendlier curl
# jq - manipulate JSON
```

## Final reflection

Mislav shows that the terminal isn't "old school" - it's the most powerful tool you have. Every hour invested learning commands and creating aliases saves you days throughout the year.

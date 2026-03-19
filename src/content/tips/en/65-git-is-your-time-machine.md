---
id: "65"
title: "Git is your time machine, use it well"
category: "Tools"
categoryColor: "text-slate-400 bg-slate-900/20"
author: "julia-evans"
---

Julia Evans has explained Git better than anyone with her visual zines. Her advice: **Git isn't just for saving code, it's for understanding your project's history**.

## Commits that tell stories

```bash
# ❌ Useless commits
git commit -m "fix"
git commit -m "update"
git commit -m "changes"

# ✅ Commits that document
git commit -m "fix: prevent double-submit on payment form"
git commit -m "feat: add email validation to signup"
git commit -m "refactor: extract auth logic to separate module"
```

In 6 months, `git log` will be your best documentation.

## Commands that change everything

### Understanding what happened

```bash
# Who wrote this line and why?
git blame src/components/Auth.js

# When was this bug introduced?
git bisect start
git bisect bad HEAD
git bisect good v1.0.0
# Git automatically finds the problematic commit
```

### Undoing with confidence

```bash
# "I want to see how this file was yesterday"
git show HEAD~1:src/app.js

# "I need to revert the last commit"
git revert HEAD

# "I want to discard local changes in a file"
git checkout -- src/file.js
```

### Work in progress

```bash
# Save your work without committing
git stash push -m "WIP: payments feature"

# List what you have saved
git stash list

# Recover your work
git stash pop
```

## The workflow that works

```bash
# 1. Create branch for your feature
git checkout -b feature/new-functionality

# 2. Small, frequent commits
git add -p  # Add changes interactively
git commit -m "add: button component structure"

# 3. Before merging, clean up
git rebase -i main

# 4. Merge with clean history
git checkout main
git merge feature/new-functionality
```

## Final reflection

Julia shows us that Git is more than `add-commit-push`. It's a time travel system that lets you understand, experiment, and undo without fear. Investing time in learning it well saves you hours of frustration.

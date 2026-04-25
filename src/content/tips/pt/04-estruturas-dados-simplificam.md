---
id: "04"
title: "Boas estruturas de dados simplificam o código"
category: "architecture"
categoryColor: "text-purple-400 bg-purple-900/20"
author: "linus-torvalds"
---

Linus Torvalds compartilhou um de seus insights mais famosos numa lista de discussão em 2006: **"Programadores ruins se preocupam com o código. Bons programadores se preocupam com estruturas de dados e suas relações"**.

Esta filosofia está no coração do design do Git. Em vez de focar em algoritmos complexos para diff de arquivos, Linus focou em como dados são armazenados (objetos, commits, árvores). Se a estrutura de dados está correta, o código que a gerencia se torna quase trivial.

## O Problema: Lógica-Pesada vs. Estrutura-Primeiro

Imagine que você precisa gerenciar status de pedidos e quais transições são permitidas.

### A Abordagem "Ruim": Lógica de Controle Espalhada

Aqui, o programador foca no "código" (as condições). Cada vez que um novo estado é adicionado, a complexidade cresce exponencialmente.

```typescript
type Status = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

function canChangeStatus(current: Status, next: Status): boolean {
  if (current === 'pending' && (next === 'paid' || next === 'cancelled')) {
    return true;
  }
  if (current === 'paid' && (next === 'shipped' || next === 'cancelled')) {
    return true;
  }
  if (current === 'shipped' && next === 'delivered') {
    return true;
  }
  // ... isto se torna uma bagunça que é difícil ler e manter
  return false;
}
```

### A Abordagem "Boa": Estrutura de Dados Como o Motor

Aqui, definimos a "relação" entre dados primeiro. O código simplesmente consulta essa estrutura.

```typescript
type Status = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

// A estrutura de dados define as regras de negócio
const ALLOWED_TRANSITIONS: Record<Status, Status[]> = {
  pending: ['paid', 'cancelled'],
  paid: ['shipped', 'cancelled'],
  shipped: ['delivered'],
  delivered: [],
  cancelled: []
};

function canChangeStatus(current: Status, next: Status): boolean {
  return ALLOWED_TRANSITIONS[current].includes(next);
}
```

## Por que isto é melhor?

Quando você mudança a estrutura de dados, o código pode ficar 10 vezes mais simples porque a lógica não precisa estar no código — ela está nos dados. Você apenas itera a estrutura.

Este é o verdadeiro segredo de bons programadores: eles não pensam em algoritmos complexos, eles pensam em como organizar dados para que a solução seja óbvia.

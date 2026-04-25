---
id: "06"
title: "Código é um passivo, não um ativo"
category: "fundamentals"
categoryColor: "text-red-400 bg-red-900/20"
author: "rich-harris"
---

Rich Harris, criador do Svelte, tem uma visão muito clara de desenvolvimento: **"Código é um passivo, não um ativo"**.

Frequentemente pensamos que quanto mais código escrevemos, mais valor estamos criando. Rich argumenta o oposto: cada linha de código que você escreve é algo que deve ser testado, mantido, documentado e inevitavelmente contém bugs. Código é "peso" que você carrega ao longo da vida do projeto.

## Menos código, menos problemas

A melhor forma de reduzir este passivo é usar as ferramentas que você já tem à sua disposição (como APIs nativas do navegador) em vez de construir abstrações complexas.

### A Abordagem "Pesada": Reinventando a Roda

Às vezes criamos lógica complexa para coisas que o navegador já sabe fazer, adicionando código que agora temos que manter.

```typescript
// Implementação manual do comportamento "scroll para o topo"
function scrollToTopManual() {
  const duration = 500;
  const start = window.scrollY;
  const startTime = performance.now();

  function animate(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    window.scrollTo(0, start * (1 - progress));

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}
```

### A Abordagem "Leve": Use a Plataforma

Aproveitamos o que já existe. Zero linhas de nossa própria lógica, zero bugs para manter.

```typescript
// O navegador já tem uma API para isto
function scrollToTopNative() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
```

## Svelte vs. React: Uma Questão de Passivo

Esta filosofia é o que deu origem ao **Svelte**. Rich Harris questionou por que frameworks modernos forçavam usuários a baixar uma biblioteca pesada (o "runtime") para gerenciar o DOM.

- **React:** Envia uma quantidade significativa de código para o navegador (o Virtual DOM, o sistema de eventos, etc.). Esse código é um passivo: consome memória, leva tempo para baixar e deve ser executado no dispositivo do usuário.
- **Svelte:** Move esse passivo para **tempo de build**. Svelte desaparece em produção, deixando apenas o código mínimo necessário para atualizar o DOM.

Ao reduzir a quantidade de código que viaja pela rede e que o navegador deve processar, Svelte aplica o mantra de que o melhor código é aquele que não existe (no cliente).

## O Dilema: Construir vs. Comprar (ou Usar uma Biblioteca)

Às vezes, a tentação de "evitar dependências" nos leva a escrever centenas de linhas de código "customizado" para problemas comuns. É aqui que entra o **custo de oportunidade**.

Cada hora que você gasta debugando seu próprio sistema de validação é uma hora que não está passando em funcionalidades que realmente diferenciam seu produto.

### O Valor da Comunidade e Testes

Uma pequena biblioteca bem mantida com testes (como `date-fns` ou `zod`) é frequentemente um **passivo menor** do que 500 linhas de código customizado sem testes.

- **Segurança:** Centenas de olhos já revisaram esse código.
- **Casos Extremos:** Bibliotecas frequentemente lidam com casos extremos que você nem considerou.
- **Documentação:** Já existe, você não precisa escrever.

## O Que Realmente Adiciona Valor?

Seu sucesso não é medido por quantas linhas de código "original" você escreveu, mas por quanto valor você entregou com o **mínimo custo de manutenção** possível.

1. **Manutenção:** O código que você não escreve nunca quebra.
2. **Carga Cognitiva:** Menos código significa que o time entende o projeto mais rápido.
3. **Superfície de Erro:** Cada linha de seu próprio código é uma oportunidade para um bug que apenas você pode corrigir.

Na próxima vez que você estiver prestes a escrever uma nova funcionalidade, pergunte-se: **"Este código é um ativo para minha empresa, ou um fardo para meu eu do futuro?"**.

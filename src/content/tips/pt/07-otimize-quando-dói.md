---
id: "07"
title: "Otimize quando dói, não antes"
category: "practices"
categoryColor: "text-red-400 bg-red-900/20"
author: "kent-c-dodds"
---

Donald Knuth, um dos pais da computação moderna, uma vez escreveu: *"Otimização prematura é a raiz de todos os males"*. Décadas depois, na era dos frameworks JavaScript e aplicações em tempo real, este aviso de **Kent C. Dodds** continua mais relevante do que nunca.

A sedução de escrever o código mais rápido e eficiente possível desde o primeiro minuto é uma armadilha para o ego. Nos faz sentir como engenheiros de elite, mas frequentemente nos torna arquitetos de complexidade desnecessária.

## O Ciclo de Maestria: 3 Estágios

Para evitar esta armadilha, Kent C. Dodds e outros líderes da comunidade propõem uma ordem sagrada que todo desenvolvedor deveria tatuar em sua memória:

1.  **Faça funcionar:** Resolva o problema. Valide sua ideia. Certifique-se de que os testes passam.
2.  **Faça correto:** Refatore. Melhore nomes de variáveis. Elimine duplicação. Torne legível para humanos.
3.  **Faça rápido:** Apenas se você tiver evidência (métricas reais) de que performance é um problema.

## O Alto Custo da Otimização Prematura

Por que é tão perigoso tentar ser rápido antes da hora?

*   **Complexidade Gratuita:** Otimizações geralmente requerem algoritmos mais complexos e estruturas menos intuitivas. Isto aumenta drasticamente os custos de manutenção.
*   **Bugs de Borda:** Ao empurrar a máquina, você tem mais probabilidade de introduzir erros sutis que só ocorrem em condições extremas e são muito difíceis de debugar.
*   **Tempo Desperdiçado:** Frequentemente passamos horas otimizando uma função que roda apenas uma vez por dia ou representa 0.01% do tempo de carregamento da aplicação.

## Um Exemplo Real em Desenvolvimento Web

No ecossistema React, é muito comum ver desenvolvedores usando `useMemo` ou `useCallback` em absolutamente todo componente "por precaução".

```javascript
// ❌ NÍVEL 1: Otimização como um esporte
// Estamos adicionando carga cognitiva e desperdiçando memória para economizar
// uma função que é extremamente barata de recriar.
const handleClick = useCallback(() => {
  console.log('Action');
}, []);

// ✅ NÍVEL 2: Simplicidade por padrão
// Código limpo, fácil de ler e debugar.
// Apenas adicionaremos useCallback se este componente causar problemas reais de renderização.
const handleClick = () => {
  console.log('Action');
};
```

A ironia é que às vezes a própria infraestrutura de otimização (como as comparações que React faz em `useMemo`) pode ser mais cara do que a tarefa que estamos tentando otimizar.

Otimizar é uma transação. Você está trocando **clareza** por **velocidade**. Como em qualquer negócio, você deveria fazer a troca apenas se o benefício supera o custo.

Se você não tem uma métrica que diz que algo é lento, não toque. Simplicidade é a melhor otimização porque reduz o tempo de desenvolvimento, o número de bugs e o stress do time. Como Kent C. Dodds diz: *"Certifique-se de que suas otimizações são necessárias antes de serem permanentes"*.

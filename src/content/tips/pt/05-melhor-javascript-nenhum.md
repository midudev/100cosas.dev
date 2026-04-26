---
id: "05"
title: "O melhor JavaScript é nenhum JavaScript"
category: "performance"
categoryColor: "text-rose-400 bg-rose-900/20"
author: "una-kravets"
---

Una Kravets, Developer Advocate do Google Chrome, frequentemente diz uma frase que pode soar contraditória para um desenvolvedor web: **"O melhor JavaScript é nenhum JavaScript"**.

Não é que Una odeie JavaScript; ela entende que JavaScript é o recurso mais caro que enviamos para o navegador. Ele precisa ser baixado, analisado, compilado e executado. Toda vez que podemos substituir lógica JS com uma capacidade nativa de HTML ou CSS, ganhamos em performance, acessibilidade e robustez.

## A Revolução Declarativa: API de Comandos Invocadores

Historicamente, para um botão abrir um modal ou um popover, precisávamos de JavaScript para ouvir o evento `click` e chamar o método correspondente.

A nova **API de Comandos Invocadores** muda o jogo ao permitir que definamos esse comportamento declarativamente diretamente em HTML.

### A Abordagem "Legado": JavaScript como Cola

```typescript
// Precisamos esperar o JS carregar para o botão funcionar
const btn = document.querySelector('#open-dialog');
const dialog = document.querySelector('#my-dialog');

btn.addEventListener('click', () => {
  dialog.showModal();
});
```

### A Abordagem "Nativa": Declarativa e sem JS

Com os atributos `commandfor` e `command`, o navegador cuida de tudo. Funciona instantaneamente, mesmo antes de qualquer script carregar.

```html
<!-- Sem uma única linha de JavaScript -->
<button commandfor="my-dialog" command="show-modal">
  Abrir Modal
</button>

<dialog id="my-dialog">
  <p>Conteúdo do Modal</p>
  <button commandfor="my-dialog" command="close">Fechar</button>
</dialog>
```

## Popover: Adeus às Dependências Pesadas

Quantas vezes instalamos uma biblioteca de 20kb apenas para mostrar um tooltip ou um menu suspenso? O atributo nativo `popover` resolve isto brilhantemente.

```html
<button popovertarget="my-popover">Mostrar menu</button>

<div id="my-popover" popover>
  <p>Este é um popover nativo que cuida de:</p>
  <ul>
    <li>Fechar leve (fechando ao clicar fora)</li>
    <li>Fechando com a tecla Escape</li>
    <li>Layering automático (gerenciamento infinito de z-index)</li>
  </ul>
</div>
```

## A Filosofia Por Trás

Toda linha de JavaScript que você não envia é uma linha que:

- ✅ Não precisa ser baixada
- ✅ Não precisa ser analisada e compilada
- ✅ Não precisa ser executada
- ✅ Nunca terá um bug de runtime

O navegador é notavelmente bom no que faz — renderizar HTML e aplicar CSS. Deixe-o fazer isso. Reserve JavaScript para o que realmente precisa: lógica interativa complexa e estado aplicativo.

---
id: "02"
title: "O tipo correto elimina bugs antes de existirem"
category: "typing"
categoryColor: "text-sky-400 bg-sky-900/20"
author: "anders-hejlsberg"
---

Por décadas, a indústria de software debateu entre a agilidade das linguagens dinâmicas e a segurança das linguagens estáticas. Porém, graças ao trabalho de engenheiros como **Anders Hejlsberg** (arquiteto de C# e TypeScript), hoje entendemos que um sistema de tipos moderno não é uma corrente que nos segura, mas um co-piloto que nos guia.

A premissa é radical mas eficaz: **se o sistema de tipos é rico o suficiente, muitos dos erros que normalmente encontraríamos em tempo de execução se tornam fisicamente impossíveis de escrever.**

## Documentação executável

O maior problema com a documentação tradicional (comentários, diagramas, arquivos README) é que **ela mente**. Com o tempo, o código evolui e a documentação fica para trás. Tipos, porém, são documentação que o compilador verifica a cada tecla pressionada.

Quando você define um tipo, você não está apenas dizendo "isto é um número"; você está comunicando aos seus colegas (e seu eu do futuro) quais são os limites desse dado e quais operações são válidas sobre ele.

## Torne os estados impossíveis inrepresentáveis

Esta é a mentalidade que separa um desenvolvedor júnior de um sênior. Em vez de preencher seu código com validações `if (data === null)` ou `try-catch`, você deveria projetar suas estruturas de dados de modo que estados inválidos não possam existir.

Se sua aplicação tem um usuário que pode ser "Anônimo" ou "Registrado", não use um booleano `isRegistered` e campos opcionais. Use uma **União Discriminada**. Dessa forma, o compilador o forçará a lidar com cada caso e o impedirá de acessar o email de um usuário que ainda não se registrou.

## O poder da tipagem avançada

Observe como nos movemos de código que "esperamos que funcione" para código que "garantimos que funciona".

```typescript
// ❌ NÍVEL 1: O perigo da ambiguidade
// E se o status for 'WAITING'? E se enviarmos um id vazio?
interface Order {
  id: string;
  status: string; // 'pending', 'shipped', 'delivered'...
}

// ✅ NÍVEL 2: Tipagem nominal e Uniões
// Agora o compilador sabe exatamente quais valores são válidos.
type OrderStatus = 'pending' | 'shipped' | 'delivered';

// 🔥 NÍVEL 3: Tornando o impossível inrepresentável
// Projetamos estados que contêm apenas os dados que precisam.
interface PendingOrder {
  status: 'pending';
  createdAt: Date;
}

interface ShippedOrder {
  status: 'shipped';
  shippedAt: Date;
  trackingId: string;
}

type Order = PendingOrder | ShippedOrder;

function processOrder(order: Order) {
  if (order.status === 'shipped') {
    // Aqui o compilador SABE que order.trackingId existe
    console.log(order.trackingId);
  } else {
    // Aqui order.trackingId daria um erro de compilação ❌
    // Prevenimos um bug de "undefined" antes que aconteça.
    console.log(order.createdAt);
  }
}
```

Tipagem não é burocracia. É uma conversa com o compilador onde você explica suas regras de negócio e ele garante que ninguém as quebre por acidente. Investir tempo em projetar os tipos corretos no início de uma funcionalidade é provavelmente a forma mais barata e eficaz de controle de qualidade na história da computação.

Como Anders Hejlsberg diz: *"Tipos te dão a confiança para refatorar sem medo"*. E um desenvolvedor sem medo é um desenvolvedor muito mais criativo e produtivo.

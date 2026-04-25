---
id: "03"
title: "Escolha tecnologia entediante"
category: "fundamentals"
categoryColor: "text-red-400 bg-red-900/20"
author: "margaret-hamilton"
---

Margaret Hamilton liderou o time de software para o programa Apollo da NASA no Laboratório de Instrumentação do MIT. Quando as vidas dos astronautas dependiam de cada linha de código, não havia espaço para experimentar com tecnologia não testada. O Apollo Guidance Computer (AGC) foi construído sobre princípios bem compreendidos, arquitetura verificável e um sistema operacional baseado em ideias que já haviam se provado. **Escolher tecnologia "entediante" não era uma limitação — era a decisão de engenharia que salvou a missão Apollo 11.**

Esta filosofia tem um nome moderno: *Escolha Tecnologia Entediante*. A ideia é que cada equipe tem uma capacidade limitada de absorver novidades — aproximadamente **três "tokens de inovação"** que você pode gastar como quiser. Cada tecnologia desconhecida que você introduz consome atenção, cria incerteza e multiplica modos de falha que ninguém sabe como diagnosticar. Se você gasta seus tokens substituindo PostgreSQL pelo trendy novo banco de dados, não fica nenhum para inovar onde realmente importa: seu produto.

## O que "entediante" significa?

"Entediante" não significa ruim ou obsoleto. Significa **bem compreendido**. Uma tecnologia entediante é aquela cujos modos de falha são documentados, cujos limites são conhecidos e cujas soluções para problemas comuns foram refinadas ao longo dos anos.

O time de Hamilton no MIT entendia isto instintivamente. O AGC tinha apenas 74 KB de ROM e 4 KB de RAM. Trabalhavam dentro desses limites usando técnicas provadas de gerenciamento de memória e agendamento de tarefas. As partes "entediantes" de sua abordagem — verificação exaustiva, código revisado manualmente, arquitetura defensiva — são precisamente o que permitiu o software se recuperar sozinho quando o computador sobrecarregou durante o pouso lunar.

## A lição do Apollo 11

Três minutos antes da Eagle tocar a superfície lunar, os alarmes 1202 e 1203 acionaram. O computador estava sobrecarregado porque o radar de rendezvous estava enviando dados desnecessários. Naquele momento crítico, o software de Hamilton não travou. Graças ao seu agendamento baseado em prioridade — construído com técnicas bem compreendidas de agendamento de processos — o AGC descartou tarefas de baixa prioridade e manteve o essencial: navegação e controle de descida.

Se o time tivesse experimentado um OS não testado ou uma arquitetura de memória não provada, essa recuperação automática talvez nunca tivesse funcionado. **Confiabilidade veio de escolher o conhecido e executá-lo impecavelmente.**

## Tokens de inovação na prática

Imagine que você está começando um novo projeto. Você tem decisões a tomar:

```text
❌ Gastando todos seus tokens de inovação:

- Banco de dados: SurrealDB (novo, promissor, comunidade pequena)
- Backend: Bun + Hono (rápido, mas ecossistema jovem)
- Frontend: Qwik (inovador, mas poucos devs conhecem)
- Infraestrutura: Fly.io com Edge Computing
- Auth: Solução customizada com WebAuthn

→ Resultado: 5 incógnitas de uma vez. Qualquer bug pode estar em qualquer camada
  e ninguém tem experiência para diagnosticá-lo.
```

```text
✅ Gastando tokens estrategicamente (a abordagem Hamilton):

- Banco de dados: PostgreSQL (entediante, confiável, documentado exaustivamente)
- Backend: Node.js + Express (entediante, milhões de respostas online)
- Frontend: React (entediante agora — e isso é bom)
- Infraestrutura: AWS/Vercel (previsível, bem documentado)
- Auth: Auth0/Clerk (problema resolvido, não reinvente)

→ Token de inovação gasto em: sua funcionalidade diferenciadora

→ Resultado: 1 incógnita controlada. O resto do stack é previsível.
```

## Quando inovar

Hamilton não evitava inovação — ela a concentrava. Seu time inventou conceitos revolucionários como recuperação de erro assíncrona e software tolerante a falhas. Mas construíram essas inovações sobre uma base de técnicas conhecidas. Aplique o mesmo princípio:

1. **Inove em seu diferencial**: Se você é uma empresa de streaming em tempo real, é ali que você gasta seu token — não substituindo seu banco de dados relacional.

# Contribuindo para o 100cosas.dev - Português

Obrigado por contribuir para o projeto 100cosas.dev em português! Este guia vai ajudá-lo a adicionar novas dicas e conteúdo em português.

## 📋 Estrutura do Projeto

O projeto está organizado por idioma:

```
src/
├── content/
│   ├── authors/          # Dados de autores (JSON)
│   └── tips/
│       ├── es/          # Dicas em espanhol
│       ├── en/          # Dicas em inglês
│       └── pt/          # Dicas em português (adicione aqui!)
├── pages/
│   ├── es/              # Páginas em espanhol
│   ├── en/              # Páginas em inglês
│   └── pt/              # Páginas em português
└── i18n/
    └── ui.ts            # Traduções da interface
```

## ✍️ Como Adicionar uma Dica em Português

### 1. Criar o arquivo da dica

Crie um arquivo Markdown em `src/content/tips/pt/` seguindo o padrão de nomenclatura:

```
src/content/tips/pt/numero-titulo-dica.md
```

**Exemplo:** `src/content/tips/pt/001-nomeie-bem-suas-variaveis.md`

### 2. Estrutura do arquivo Markdown

```yaml
---
id: "001"
title: "Nomeie bem suas variáveis"
category: "clean_code"
author: "john-woods"
---

Sua dica em português vai aqui...

## Introdução

Escreva um parágrafo introdutório...

## Desenvolvimento

Explique o conceito...

## Conclusão

Resumir a dica...
```

### 3. Campos obrigatórios

- **id**: Número sequencial da dica (deve corresponder a uma dica existente em espanhol/inglês)
- **title**: Título da dica em português
- **category**: Categoria da dica (veja a lista abaixo)
- **author**: ID do autor (deve existir em `src/content/authors/`)
- **categoryColor**: (Opcional) Cor personalizada em hex

### 4. Categorias disponíveis

```
clean_code
principles
architecture
professionalism
design
testing
practices
soft_skills
paradigm
tools
automation
fundamentals
typing
ux_ui
refactor
ddd
dry
learning
```

## 👤 Autores

Os autores estão em `src/content/authors/` como arquivos JSON. Você pode referenciá-los pelo seu ID (nome do arquivo sem a extensão `.json`).

**Exemplo:** Para usar o autor Ada Lovelace, use `"author": "ada-lovelace"`

## 🔤 Convenções de Tradução

Para manter a consistência com o projeto:

- **Clean Code**, **Testing**, **Soft Skills**, etc. - Mantém em inglês (são conceitos técnicos consolidados)
- Use "você" (informal) ou "o programador" conforme apropriado
- Use termos técnicos em inglês quando fizerem sentido (ex: "code smells", "refactoring")
- Traduza conceitos gerais (ex: "limpeza de código" para "Clean Code")

## 📝 Exemplo Completo

```markdown
---
id: "001"
title: "Nomeie bem suas variáveis"
category: "clean_code"
author: "john-woods"
---

O nome de uma variável comunica sua intenção e escopo. Um bom nome economiza tempo
de leitura e compreensão do código.

## Por que nomes importam?

Quando você lê um código, frequentemente passa mais tempo lendo do que escrevendo.
Nomes claros reduzem a carga cognitiva e diminuem bugs.

## Boas práticas

- Use nomes descritivos
- Evite abreviações desnecessárias
- Use nomes positivos para booleanos (`isActive` em vez de `isNotInactive`)

## Conclusão

Investir tempo em bons nomes é investir na legibilidade e manutenibilidade do seu código.
```

## 🔍 Verificação antes de enviar

Certifique-se de que:

- [ ] O arquivo está em `src/content/tips/pt/`
- [ ] O frontmatter está correto (YAML)
- [ ] O `id` corresponde a uma dica existente
- [ ] O `category` é válido
- [ ] O `author` existe em `src/content/authors/`
- [ ] O Markdown está formatado corretamente
- [ ] Não há erros de digitação

## 🚀 Enviando sua contribuição

1. Faça um fork do repositório
2. Crie uma branch para sua dica: `git checkout -b feat/pt-dica-nova`
3. Adicione seus arquivos
4. Faça commit com mensagem descritiva: `git commit -m "feat(pt): adiciona dica sobre nomeação de variáveis"`
5. Faça push da sua branch
6. Abra um Pull Request

## ❓ Dúvidas?

Se tiver dúvidas sobre como contribuir, abra uma issue no repositório ou veja o README.md principal.

## 📄 Licença

Todas as contribuições são licenciadas sob CC BY-NC 4.0.

Obrigado por contribuir! 🎉

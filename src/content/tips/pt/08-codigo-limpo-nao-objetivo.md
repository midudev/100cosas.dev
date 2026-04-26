---
id: "08"
title: "Código limpo não é o objetivo final"
category: "philosophy"
categoryColor: "text-amber-400 bg-amber-900/20"
author: "dan-abramov"
---

Dan Abramov, em seu famoso ensaio *Adeus, Código Limpo*, nos lembra de uma verdade frequentemente esquecida na busca pela perfeição: **"Código limpo não é um objetivo. É uma ferramenta para nos ajudar a lidar com complexidade"**.

Muitos desenvolvedores, especialmente no início de suas carreiras, ficam obcecados com princípios como **DRY** (Não se Repita) ou abstração perfeita. O problema surge quando "limpar" o código o torna tão abstrato que fica impossível de entender ou modificar.

## A Armadilha da Abstração Prematura

Imagine que você tem dois componentes que parecem um pouco semelhantes. O impulso "limpo" é mesclá-los em um.

### A Abordagem "Obsessiva": Sobre-abstração

Tentando fazer um componente ultra-genérico para que tudo seja "limpo" e não haja repetição.

```tsx
// Um componente que tenta fazer muito apenas para ser "DRY"
interface GenericCardProps {
  title: string;
  type: 'user' | 'product';
  onAction: () => void;
  showPrice?: boolean; // Apenas para product
  avatarUrl?: string;  // Apenas para user
}

const GenericCard = ({ title, type, ...props }: GenericCardProps) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      {type === 'product' && <span>{props.showPrice}</span>}
      {type === 'user' && <img src={props.avatarUrl} />}
      <button onClick={props.onAction}>Clique</button>
    </div>
  );
};
```

*Problema:* Conforme os requisitos para 'user' e 'product' divergem, este componente se enche de `ifs` e props opcionais. É "limpo" porque não há código repetido, mas é um pesadelo de manutenção.

### A Abordagem Pragmática: Código Como Ferramenta

Aceitando um pouco de repetição para ganhar clareza e flexibilidade. Use código limpo apenas onde realmente reduz a carga mental.

```tsx
// Componentes simples e específicos
const UserCard = ({ name, avatarUrl, onProfileClick }: UserProps) => (
  <div className="card">
    <h2>{name}</h2>
    <img src={avatarUrl} alt={name} />
    <button onClick={onProfileClick}>Ver Perfil</button>
  </div>
);

const ProductCard = ({ title, price, onBuy }: ProductProps) => (
  <div className="card">
    <h2>{title}</h2>
    <span>${price}</span>
    <button onClick={onBuy}>Comprar Agora</button>
  </div>
);
```

## Pontos-Chave

1. **Evite Código Limpo Dogmático:** Se uma refatoração torna o código mais difícil de seguir para um colega, não é uma melhoria.
2. **Aceite Duplicação:** É muito melhor duplicar algum código do que criar a abstração errada.
3. **Meça Valor:** Pergunte-se: "Esta limpeza me ajuda a entender o sistema melhor, ou apenas me faz parecer um programador melhor?"

Código é um meio para um fim (entregar valor), não uma obra de arte que deve ser imutável.

---
id: "05"
title: "El código limpio no es el objetivo final"
category: "Filosofía"
categoryColor: "text-amber-400 bg-amber-900/20"
author: "dan-abramov"
---

Dan Abramov, en su famoso ensayo *Goodbye, Clean Code*, nos recuerda una verdad que a menudo olvidamos en la búsqueda de la perfección: **"El código limpio no es un objetivo. Es una herramienta para ayudarnos a lidiar con la complejidad"**.

Muchos desarrolladores, especialmente en sus primeros años, se obsesionan con principios como **DRY** (Don't Repeat Yourself) o la abstracción perfecta. El problema surge cuando "limpiar" el código lo vuelve tan abstracto que es imposible de entender o cambiar.

## La trampa de la abstracción prematura

Imagina que tienes dos componentes que se parecen un poco. El impulso "limpio" es unirlos en uno solo.

### El enfoque "obsesivo": Abstracción excesiva

Intentamos hacer un componente ultra-genérico para que todo sea "limpio" y no haya repetición.

```tsx
// Un componente que intenta hacer demasiado para ser "DRY"
interface GenericCardProps {
  title: string;
  type: 'user' | 'product';
  onAction: () => void;
  showPrice?: boolean; // Solo para productos
  avatarUrl?: string;  // Solo para usuarios
}

const GenericCard = ({ title, type, ...props }: GenericCardProps) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      {type === 'product' && <span>{props.showPrice}</span>}
      {type === 'user' && <img src={props.avatarUrl} />}
      <button onClick={props.onAction}>Click</button>
    </div>
  );
};
```

*Problema:* A medida que los requisitos de 'user' y 'product' divergen, este componente se llena de `ifs` y props opcionales. Es "limpio" porque no hay código repetido, pero es una pesadilla de mantener.

### El enfoque pragmático: Código como herramienta

Aceptamos un poco de repetición para ganar claridad y flexibilidad. Usamos el código limpio solo donde realmente reduce la carga mental.

```tsx
// Componentes simples y específicos
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
    <span>{price}€</span>
    <button onClick={onBuy}>Comprar</button>
  </div>
);
```

## Lecciones clave

1. **Evita el "Clean Code" dogmático:** Si una refactorización hace que el código sea más difícil de seguir para un compañero, no es una mejora.
2. **Acepta la duplicación:** Es mucho mejor duplicar un poco de código que crear la abstracción incorrecta.
3. **Mide el valor:** Pregúntate: "¿Esta limpieza me ayuda a entender mejor el sistema o solo me hace sentir mejor programador?"

El código es un medio para un fin (entregar valor), no una obra de arte que deba ser inmutable.

---
id: "08"
title: "El código limpio no es el objetivo final"
category: "Filosofía"
categoryColor: "text-amber-400 bg-amber-900/20"
author: "dan-abramov"
---

Dan Abramov, cocreador de Redux y miembro del equipo de React, escribió un ensayo que sacudió a la comunidad: *Goodbye, Clean Code*. En él confesaba cómo, siendo un desarrollador más joven, había refactorizado el código de un compañero para hacerlo "más limpio"... y terminó rompiéndolo todo. La lección que extrajo es poderosa: **"El código limpio no es un objetivo. Es una herramienta para ayudarnos a lidiar con la complejidad del sistema"**.

Muchos desarrolladores, especialmente en sus primeros años, se obsesionan con principios como **DRY** (Don't Repeat Yourself) o la abstracción perfecta. El problema surge cuando "limpiar" el código lo vuelve tan abstracto que es imposible de entender o cambiar. Ahí es donde lo "limpio" se convierte en lo "frágil".

## La historia que lo empezó todo

En su ensayo, Dan cuenta que un día llegó al trabajo, vio código duplicado entre varios componentes y decidió refactorizarlo en una abstracción genérica. Se sintió orgulloso: menos líneas, cero repetición. Código "limpio" de manual.

Pero su compañero, el autor original, le explicó que esa duplicación era **intencional**. Cada componente iba a divergir en requisitos distintos. La abstracción de Dan había creado un acoplamiento invisible: ahora, cambiar uno obligaba a considerar todos los demás.

Dan revirtió sus cambios y aprendió algo que cambió su forma de programar para siempre.

## La trampa de la abstracción prematura

El impulso "limpio" es fusionar todo lo que se parezca. Pero parecerse no es lo mismo que ser igual.

```tsx
// ❌ El enfoque "obsesivo": Un componente ultra-genérico para ser "DRY"
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

// ✅ El enfoque pragmático: Componentes claros y específicos
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

El `GenericCard` parece "limpio" porque elimina la repetición, pero a medida que los requisitos de usuario y producto divergen, se llena de `ifs` y props opcionales. Los componentes específicos, aunque tengan algo de repetición, permiten que cada uno evolucione de forma independiente.

## El verdadero enemigo: La abstracción incorrecta

Sandi Metz, otra de las grandes voces del diseño de software, lo resume así: *"La duplicación es mucho más barata que la abstracción incorrecta"*.

Una abstracción incorrecta es como un pegamento industrial: une cosas que no deberían estar unidas, y separarlas después duele muchísimo. La duplicación, en cambio, es solo un poco de trabajo extra que te da libertad total para cambiar cada parte de forma independiente.

## ¿Cuándo limpiar y cuándo dejarlo?

No se trata de renunciar al código limpio, sino de usarlo con criterio:

1. **Limpia cuando reduce la carga mental:** Si una refactorización hace que el sistema sea más fácil de entender para todo el equipo, adelante.
2. **Para si solo te hace sentir bien:** Si la motivación principal es "queda más bonito" o "cumple con el principio X", cuestiona si realmente aporta valor.
3. **Acepta la duplicación temprana:** Dos o tres copias similares de código no son una emergencia. Son una oportunidad para descubrir qué patrón real emerge antes de abstraer.
4. **Pregúntate: "¿Qué pasa si los requisitos divergen?"** Si la respuesta es "tendría que romper la abstracción", entonces no la crees todavía.

El código es un medio para un fin: entregar valor al usuario. No es una obra de arte que deba ser inmutable ni un examen de principios SOLID. Como aprendió Dan Abramov aquella mañana, a veces el código más "sucio" es el que mejor sirve a tu equipo y a tu producto.

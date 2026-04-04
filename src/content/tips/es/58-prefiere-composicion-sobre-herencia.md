---
id: "58"
title: "Prefiere composición sobre herencia"
category: "Arquitectura"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "dan-abramov"
---

Dan Abramov, co-creador de Redux, ha explicado repetidamente un principio que React adoptó como filosofía central: **"La composición te da todo lo que la herencia promete, sin los problemas"**.

## El problema de la herencia

```javascript
// La típica jerarquía de clases que parecía buena idea
class Animal {
  eat() { /* ... */ }
  sleep() { /* ... */ }
}

class Bird extends Animal {
  fly() { /* ... */ }
}

class Penguin extends Bird {
  // Ups... los pingüinos no vuelan
  fly() { throw new Error("I can't fly!"); }
}

// Ahora tienes un método que no deberías tener
// Y rompes el Principio de Sustitución de Liskov
```

## La solución: composición

```javascript
// En lugar de "es un", piensa en "tiene un" o "puede hacer"
const canEat = (state) => ({
  eat: () => { /* ... */ }
});

const canSleep = (state) => ({
  sleep: () => { /* ... */ }
});

const canFly = (state) => ({
  fly: () => { /* ... */ }
});

const canSwim = (state) => ({
  swim: () => { /* ... */ }
});

// Ahora compones lo que necesitas
function createPenguin(name) {
  const state = { name };
  return {
    ...canEat(state),
    ...canSleep(state),
    ...canSwim(state)
    // Sin fly - los pingüinos nadan, no vuelan
  };
}

function createEagle(name) {
  const state = { name };
  return {
    ...canEat(state),
    ...canSleep(state),
    ...canFly(state)
  };
}
```

## En React: la composición es rey

```jsx
// ❌ "Herencia" en componentes (antipatrón)
class SpecialButton extends Button {
  render() {
    return <button className="special">{this.props.children}</button>;
  }
}

// ✅ Composición
function SpecialButton({ children, ...props }) {
  return <Button className="special" {...props}>{children}</Button>;
}

// Aún mejor: render props o children
function Card({ header, children, footer }) {
  return (
    <div className="card">
      <div className="card-header">{header}</div>
      <div className="card-body">{children}</div>
      <div className="card-footer">{footer}</div>
    </div>
  );
}
```

## Hooks: composición de comportamiento

```javascript
// Cada hook es una unidad de comportamiento componible
function useAuth() {
  const [user, setUser] = useState(null);
  // ... lógica de auth
  return { user, login, logout };
}

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  });
  // ... lógica de storage
  return [value, setValue];
}

// Compones comportamientos en tu componente
function Dashboard() {
  const { user } = useAuth();
  const [preferences] = useLocalStorage('prefs', {});
  const [data] = useFetch(`/api/data/${user.id}`);

  // Tu componente es una composición de comportamientos
}
```

## Por qué funciona mejor

### 1. Flexibilidad

```javascript
// Con herencia: estás atrapado en la jerarquía
// Con composición: mezclas lo que necesitas

const hybridCreature = {
  ...canFly(state),
  ...canSwim(state),
  ...canBreatheUnderwater(state)
};
```

### 2. Testing

```javascript
// Cada comportamiento se testea aislado
test('canSwim', () => {
  const state = { energy: 100 };
  const swimmer = canSwim(state);
  expect(swimmer).toHaveProperty('swim');
});
```

### 3. Sin acoplamiento

La herencia crea dependencias rígidas. La composición crea piezas independientes.

Dan y el equipo de React eligieron composición como el patrón central porque es más flexible, testeable y fácil de razonar. La herencia parece natural al principio ("un perro ES un animal"), pero rápidamente se vuelve restrictiva. La composición te da libertad para combinar comportamientos como piezas de Lego.

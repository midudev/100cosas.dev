---
id: "63"
title: "Aprende haciendo, no leyendo"
category: "Aprendizaje"
categoryColor: "text-violet-400 bg-violet-900/20"
author: "wes-bos"
---

Wes Bos ha enseñado desarrollo web a cientos de miles de personas con un principio simple: **deja de leer documentación infinita y empieza a escribir código**.

## La trampa del tutorial infinito

```markdown
Lunes: "Voy a aprender React"
- Lee la documentación completa
- Ve 3 videos de "React en 2024"
- Compara Next.js vs Remix vs Astro

Viernes: 
- Sigue sin haber escrito una línea de código
- Siente que "todavía no está listo"
- Encuentra otro tutorial "mejor"
```

Esto se llama **Tutorial Hell** y es una forma de procrastinación disfrazada de productividad.

## El método de Wes

### JavaScript30

El curso gratuito JavaScript30 de Wes tiene una premisa simple:

```markdown
30 días → 30 proyectos → Sin frameworks

Día 1: Drum Kit
- No lees sobre eventos
- HACES un drum kit con eventos

Día 2: Clock
- No estudias Date()
- HACES un reloj que funciona
```

Aprendes haciendo, no preparándote para hacer.

## Por qué funciona mejor

### 1. Memoria muscular

```javascript
// Después de escribir esto 50 veces:
document.querySelector('.elemento').addEventListener('click', () => {
  // ...
});

// Ya no necesitas pensarlo. Es automático.
```

### 2. Contexto real

Leer sobre `async/await` en la documentación es abstracto. Usarlo para hacer un fetch a una API real te da contexto:

```javascript
// Esto lo recuerdas porque LO HICISTE funcionar
async function getWeather(city) {
  const response = await fetch(`https://api.weather.com/${city}`);
  const data = await response.json();
  return data;
}
```

### 3. Errores como maestros

Los errores que encuentras haciendo te enseñan más que cualquier tutorial:

```javascript
// Error: Cannot read property 'map' of undefined

// Ahora SIEMPRE verificarás:
const items = data?.items || [];
items.map(...)
```

## Cómo aplicarlo

### La regla 20/80

```markdown
20% leyendo → Entender los conceptos básicos
80% haciendo → Aplicar, fallar, arreglar, repetir
```

### Proyectos mínimos

No necesitas ideas originales. Clona cosas que existen:

```markdown
Aprendo React: Hago un clon de Twitter (solo el feed)
Aprendo Node: Hago una API REST de TODOs
Aprendo CSS: Replico la home de Stripe
```

### Timeboxing

```markdown
Máximo 30 minutos de investigación
Luego: código

Si te atascas:
- 10 minutos intentando solo
- Luego busca ayuda específica
- Implementa la solución TÚ MISMO
```

## El antídoto al síndrome del impostor

Los que más saben no son los que más leyeron. Son los que más hicieron. Cada proyecto terminado (aunque sea feo) es más valioso que 10 tutoriales vistos.

Wes dice: "El mejor momento para empezar un proyecto es ahora, no cuando sepas más". Nunca sabrás "suficiente". El conocimiento viene de hacer, no de prepararse para hacer.

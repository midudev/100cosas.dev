---
id: "28"
title: "Cuestiona todo lo que das por hecho"
category: "Mentalidad"
categoryColor: "text-emerald-400 bg-emerald-900/20"
author: "lynn-conway"
---

En 1964, una joven ingeniera de IBM inventó una técnica que cambiaría para siempre la arquitectura de los procesadores: el **dynamic instruction scheduling**, un mecanismo que permite ejecutar instrucciones fuera de orden para maximizar el rendimiento. Era revolucionario. Y entonces IBM la despidió, borró su nombre de los registros y se atribuyó su trabajo durante décadas.

Lynn Conway lo perdió todo. Tuvo que reconstruir su carrera desde cero, sin poder mencionar su contribución más importante. Muchas personas se habrían rendido. Ella eligió cuestionar de nuevo.

En los años 70, en Xerox PARC, Conway se hizo una pregunta que nadie en la industria se atrevía a formular: **"¿Por qué diseñar un chip tiene que ser tan difícil?"**. En aquella época, crear un circuito integrado requería años de trabajo artesanal por parte de ingenieros altamente especializados. Era un proceso opaco, caro y accesible solo para un puñado de empresas. Conway, junto a Carver Mead, lo simplificó radicalmente. Su libro *Introduction to VLSI Systems* democratizó el diseño de chips y su sistema **MOSIS** permitió a universidades de todo el mundo fabricar prototipos por internet. Lo que antes costaba millones y tardaba años, ahora lo hacía un estudiante en semanas.

Su filosofía se resume en una frase que debería colgar en la pared de todo equipo de desarrollo: **"Why not question everything?"**

## El peligro de "así se ha hecho siempre"

En programación, las decisiones del pasado se solidifican hasta convertirse en verdades absolutas. Nadie recuerda por qué se eligió esa base de datos, ese patrón de arquitectura o esa convención de nombres. Solo saben que "así se ha hecho siempre". Y cuando alguien pregunta "¿por qué?", la respuesta suele ser un silencio incómodo o un "porque sí".

```javascript
// ❌ Código que nadie cuestiona porque "siempre ha funcionado"
const config = {
  maxRetries: 3,           // ¿Por qué 3? ¿Quién lo decidió?
  timeout: 5000,           // ¿5 segundos es óptimo o es un número inventado?
  batchSize: 100,          // ¿Se probó alguna vez con 50? ¿Con 200?
  cacheExpiry: 3600,       // ¿1 hora? ¿Basado en qué datos?
};

// ✅ Código con decisiones documentadas y cuestionables
const config = {
  maxRetries: 3,           // Medido: 97% de errores transitorios se resuelven en 3 intentos
  timeout: 2000,           // Reducido de 5s tras medir p95 de latencia real: 800ms
  batchSize: 250,          // Benchmarked: 250 es óptimo para nuestro tamaño de payload
  cacheExpiry: 900,        // 15min: el contenido cambia ~4 veces/hora en producción
};
```

Cada "número mágico" en tu código es una suposición que alguien hizo una vez. Lynn Conway nos enseña que el acto de cuestionar esas suposiciones es donde nace la innovación.

## El fracaso como motor creativo

Conway creía profundamente que **el fracaso es una parte necesaria de la creatividad**. No como un obstáculo a evitar, sino como un mecanismo de aprendizaje esencial. Su propia vida es la prueba: perdió su carrera, su identidad profesional y su trabajo — y de esas cenizas construyó algo que transformó toda una industria.

En desarrollo de software, el miedo al fracaso genera código conservador, arquitecturas rígidas y equipos que nunca experimentan. Conway proponía lo contrario: **falla rápido, falla barato, falla a menudo**.

```javascript
// La evolución de un sistema de búsqueda — aprendiendo del fracaso

// Intento 1: Búsqueda exacta
function search(query, items) {
  return items.filter(item => item.name === query);
}
// ❌ Fracaso: nadie escribe el nombre exacto

// Intento 2: includes()
function search(query, items) {
  return items.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
}
// ❌ Fracaso: demasiados resultados irrelevantes

// Intento 3: Scoring por relevancia
function search(query, items) {
  const normalize = str => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const q = normalize(query);

  return items
    .map(item => {
      const name = normalize(item.name);
      let score = 0;
      if (name === q) score = 100;
      else if (name.startsWith(q)) score = 75;
      else if (name.includes(q)) score = 50;
      return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);
}
// ✅ Cada fracaso anterior hizo este código mejor
```

Ninguna de las versiones intermedias fue un "error". Cada una fue un paso necesario. Como decía Conway: el fracaso no es lo opuesto al éxito — es el camino hacia él.

## Cuestiona tu arquitectura

Las decisiones de arquitectura son las más difíciles de cuestionar porque tienen el mayor coste de cambio. Pero también son las que más se benefician de ser cuestionadas.

```text
Preguntas incómodas que deberías hacer en tu próxima reunión de equipo:

1. "¿Seguimos necesitando microservicios o un monolito sería más simple?"
2. "¿Realmente necesitamos esta base de datos NoSQL o estamos evitando aprender SQL?"
3. "¿Este servicio externo nos ahorra tiempo o nos crea una dependencia crítica?"
4. "¿Nuestros tests prueban comportamiento o solo cubren métricas de cobertura?"
5. "¿Esta abstracción simplifica o solo mueve la complejidad de sitio?"
```

Lynn Conway no cuestionó la existencia de los chips — cuestionó el proceso para crearlos. No dijo "los circuitos integrados son innecesarios", sino **"¿por qué solo un puñado de expertos puede diseñarlos?"**. Cuestionar no significa destruir. Significa preguntar si hay una forma mejor.

## "Si quieres cambiar el futuro, empieza a vivir como si ya estuvieras ahí"

Esta frase de Conway es más que una cita motivacional. Es una estrategia de ingeniería. Cuando ella diseñó el sistema MOSIS para que cualquier universidad pudiera fabricar chips, no estaba resolviendo un problema del presente — estaba construyendo la infraestructura del futuro que ella imaginaba.

Aplica esto a tu código:

```typescript
// ❌ Código para el presente: "ahora mismo solo tenemos un idioma"
function getGreeting() {
  return "Hola, bienvenido";
}

// ✅ Código para el futuro: "viviremos como si ya fuera internacional"
function getGreeting(locale: string = 'es') {
  const greetings: Record<string, string> = {
    es: "Hola, bienvenido",
    en: "Hello, welcome",
    pt: "Olá, bem-vindo",
  };
  return greetings[locale] ?? greetings.es;
}
```

No se trata de sobre-ingeniería. Se trata de **diseñar con la dirección correcta** desde el principio, dejando espacio para crecer sin tener que reescribirlo todo.

## El coraje de preguntar "¿por qué?"

Cuestionar todo requiere coraje. En un equipo, preguntar "¿por qué hacemos esto así?" puede interpretarse como ignorancia o como ataque. Pero Conway demostró que las preguntas incómodas son las que generan los avances más importantes.

La próxima vez que abras un archivo de código y veas algo que "siempre ha sido así", párate un momento. Pregunta por qué. Puede que haya una buena razón. Puede que esa razón haya dejado de existir hace años. Y puede que, como Lynn Conway, tu pregunta sea el inicio de algo que cambie las reglas del juego.

El mayor enemigo de la innovación no es la falta de talento ni la falta de recursos. Es la falta de preguntas. **Cuestiona todo. Falla con intención. Construye el futuro que imaginas.**

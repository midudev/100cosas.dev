---
id: "39"
title: "El contenido debería guiar el diseño, no al revés"
category: "CSS"
categoryColor: "text-pink-400 bg-pink-900/20"
author: "jen-simmons"
---

Jen Simmons, ahora Apple Evangelist para la experiencia del desarrollador web en Safari y WebKit, acuñó el término **"Intrinsic Web Design"**. Su filosofía revoluciona cómo pensamos sobre layouts: **deja que el contenido determine el diseño, no las restricciones arbitrarias de una grilla**.

## La era de los hacks terminó

Durante años, maquetamos la web con herramientas que no fueron diseñadas para layout:

- **Tables**: Semántica destruida
- **Floats**: Clearfix, overflow hidden, margin negativo
- **Frameworks CSS**: 12 columnas porque sí

CSS Grid y Flexbox cambian las reglas del juego.

## Intrinsic Web Design: los 6 principios

### 1. Combina flexible y fijo

```css
.layout {
  /* Columnas que se adaptan Y columnas fijas */
  grid-template-columns: auto 1fr 200px;
}
```

### 2. Deja que el contenido determine el tamaño

```css
.card-grid {
  /* Tantas columnas como quepan, mínimo 250px */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

### 3. Usa el espacio sabiamente

```css
.container {
  /* gap reemplaza margin hacks */
  display: grid;
  gap: 2rem;
}
```

### 4. Los media queries no son la única respuesta

```css
/* Container queries: responde al contenedor, no al viewport */
@container (min-width: 400px) {
  .card {
    flex-direction: row;
  }
}
```

### 5. Las imágenes deben ser fluidas Y tener aspect-ratio

```css
img {
  max-width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  object-fit: cover;
}
```

### 6. Layouts bidimensionales con Grid

```css
.magazine-layout {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  /* El contenido fluye naturalmente */
}
```

## Subgrid: el poder de la herencia

Una de las características por las que Jen ha luchado años:

```css
.card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.card {
  display: grid;
  /* La card hereda las líneas del padre */
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
}
```

Ahora los elementos dentro de las cards se alinean perfectamente entre sí.

## La web no es print

> "Dejamos de intentar hacer que la web se vea como una revista impresa. Empezamos a diseñar para el medio que realmente es: fluido, flexible, e inherentemente responsivo"

Jen nos recuerda que la web es su propio medio, con sus propias reglas. No debemos pelear contra su naturaleza fluida - debemos abrazarla.

## Reflexión final

Las herramientas existen. Grid, Flexbox, Container Queries, Subgrid. La pregunta ya no es "¿podemos hacerlo?" sino "¿entendemos el medio lo suficiente para dejar que el contenido guíe el diseño?". Jen Simmons nos ha mostrado el camino.

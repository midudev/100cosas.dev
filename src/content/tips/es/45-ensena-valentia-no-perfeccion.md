---
id: "45"
title: "Enseña valentía, no perfección"
category: "Mentalidad"
categoryColor: "text-cyan-400 bg-cyan-900/20"
author: "reshma-saujani"
---

Reshma Saujani, fundadora de Girls Who Code, ha observado un patrón en miles de estudiantes que aprenden a programar. Su conclusión cambió cómo pensamos sobre la educación en tecnología: **"Enseñamos a las chicas a ser perfectas, y a los chicos a ser valientes"**.

## El síndrome de la pantalla en blanco

En los cursos de Girls Who Code, Reshma notó algo:

> "Una profesora me dijo que las chicas venían a su escritorio diciendo 'no sé qué código escribir'. Pero cuando miraba sus pantallas, no estaban en blanco. Habían escrito código, pero lo habían borrado porque no era perfecto a la primera."

Los chicos, en cambio, mostraban su código incompleto sin problema. Estaban acostumbrados a intentar, fallar, y seguir.

## La perfección paraliza

```javascript
// El código que borramos por "no ser perfecto"
function calcularTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

// Pero esto FUNCIONA. Es un punto de partida.
// Después puedes refactorizar:
const calcularTotal = items => items.reduce((sum, item) => sum + item.price, 0);
```

El primer código no es elegante. Pero existe. Y el código que existe se puede mejorar. El código que borras porque "no es suficientemente bueno" no puede mejorar.

## La valentía en programación

Ser valiente en código significa:

### 1. Mostrar trabajo en progreso

```javascript
// TODO: Esto está incompleto pero quiero feedback
function procesarPago(cantidad) {
  // Implementación básica
  console.log(`Procesando ${cantidad}...`);
  // Falta: validación, errores, integración con Stripe
}
```

### 2. Hacer preguntas "obvias"

En code reviews, en reuniones, en Slack:
- "¿Qué hace esta función?"
- "¿Por qué usamos este patrón?"
- "No entiendo esta parte"

Las preguntas "tontas" suelen revelar problemas reales.

### 3. Publicar código imperfecto

Tu primer proyecto en GitHub no tiene que ser perfecto. Tu primer artículo técnico no tiene que ser exhaustivo. **La perfección es el enemigo del progreso**.

## El coste de esperar la perfección

```markdown
Escenario A: Esperas a que tu app esté "lista"
- Meses de desarrollo sin feedback
- Descubres tarde que nadie la necesita
- Burnout por trabajar en el vacío

Escenario B: Lanzas algo básico
- Usuarios reales desde el día uno
- Feedback que guía el desarrollo
- Motivación por ver impacto
```

## Más allá del género

Aunque Reshma habla específicamente de niñas, el consejo aplica a todos:

- El síndrome del impostor afecta a todos los desarrolladores
- La cultura de "10x developers" intimida
- El código perfecto de tutoriales nos hace sentir inadecuados

## Cómo practicar la valentía

1. **Comparte antes de estar listo**: Pull requests pequeños y frecuentes
2. **Falla en público**: Habla de tus errores en tu blog o redes
3. **Celebra los intentos**: No solo los éxitos
4. **Mentoriza**: Ayudar a otros normaliza no saber todo

La programación no es sobre escribir código perfecto a la primera. Es sobre iterar, fallar, aprender, y mejorar. Los mejores programadores que conozco no son los que nunca cometen errores - son los que no tienen miedo de cometerlos.

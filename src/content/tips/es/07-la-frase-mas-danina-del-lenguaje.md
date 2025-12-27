---
id: "07"
title: "La frase más dañina: 'Siempre se ha hecho así'"
category: "Mentalidad"
categoryColor: "text-emerald-400 bg-emerald-900/20"
author: "grace-hopper"
---

Grace Hopper, apodada "Amazing Grace" y pionera absoluta de la computación, tenía una frase grabada a fuego: **"La frase más dañina en el lenguaje es... 'siempre se ha hecho así'"**.

A Hopper le encantaba desafiar el status quo. De hecho, tenía un reloj en su oficina que funcionaba al revés (en sentido contrario a las agujas del reloj) solo para recordar a sus visitantes que las convenciones son a menudo arbitrarias y que siempre hay espacio para la innovación.

## El peligro de la inercia tecnológica

En el desarrollo de software, "siempre se ha hecho así" es el preludio de la deuda técnica y el estancamiento. Es lo que mantiene vivas librerías obsoletas, arquitecturas monolíticas que ya no escalan y procesos de despliegue manuales que dan miedo tocar.

### El enfoque "Heredado": Inercia por costumbre

A veces seguimos patrones antiguos simplemente porque el código base ya los tiene, ignorando que el lenguaje o la plataforma han evolucionado para ofrecer soluciones mejores.

```typescript
// Un patrón común "de siempre": usar callbacks para todo
// porque "así es como aprendimos a manejar la asincronía en este proyecto"
function getUserDataLegacy(id: string, callback: (err: any, data?: any) => void) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/api/users/${id}`);
  xhr.onload = () => {
    if (xhr.status === 200) callback(null, JSON.parse(xhr.responseText));
    else callback(new Error('Falló la carga'));
  };
  xhr.onerror = () => callback(new Error('Error de red'));
  xhr.send();
}

// El infierno de los callbacks (Callback Hell) es el resultado de la inercia
getUserDataLegacy('1', (err, user) => {
  if (user) {
    getPostsLegacy(user.id, (err, posts) => {
      // ... esto escala muy mal
    });
  }
});
```

### El enfoque "Hopper": Cuestionar y evolucionar

Como ya tenemos los callbacks y _funcionan_ entonces no hace falta hacer nada más. ¿No? No. En ingeniería hay que iterar, hay que avanzar, hay que probar cosas, equivocarse, aprender y crecer.

Debemos buscar alternativas, formas distintas de hacer las cosas. De ahí nació, por ejemplo, `async/await` en JavaScript. ¿Esto significa que los `callback` desaparecen? No. Pero tenemos una nueva forma de hacer lo mismo que habíamos hecho siempre, pero de una forma más sencilla.

```typescript
// Usando Fetch y Async/Await: más limpio, legible y robusto
async function getUserDataModern(id: string) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error('Falló la carga');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// El código se lee de forma secuencial, como nuestra lógica mental
const user = await getUserDataModern('1');
const posts = await getPostsModern(user.id);
```

## ¿Cómo evitar la frase dañina?

1. **La regla de los 5 porqués:** Cuando alguien diga "siempre se ha hecho así", pregunta "¿Por qué?". Sigue preguntando hasta llegar a la raíz. A menudo descubrirás que la razón original ya no existe.
2. **Experimentación constante:** Dedica un pequeño porcentaje de tu tiempo a probar alternativas. ¿Hay una forma de hacer este componente con menos props? ¿Podemos automatizar esta tarea manual?
3. **Mantenimiento proactivo:** No esperes a que algo se rompa para modernizarlo. El código que no evoluciona, muere.

Grace Hopper nos enseñó que los barcos están seguros en el puerto, pero que **no es para eso para lo que se construyen los barcos**. Sal de tu zona de confort y no dejes que la costumbre dicte tu arquitectura.

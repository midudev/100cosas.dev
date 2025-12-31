---
id: "03"
title: "'Siempre se ha hecho así'"
category: "Mentalidad"
categoryColor: "text-emerald-400 bg-emerald-900/20"
author: "grace-hopper"
---

Grace Hopper, apodada "Amazing Grace" y pionera absoluta de la computación, tenía una frase grabada a fuego: **"La frase más dañina en el lenguaje es... 'siempre se ha hecho así'"**.

A Hopper le encantaba desafiar el status quo. De hecho, tenía un reloj en su oficina que funcionaba al revés (en sentido contrario a las agujas del reloj) solo para recordar a sus visitantes que las convenciones son a menudo arbitrarias. 

<img src="/images/grace-hopper-clock-counterwise.jpg" alt="Reloj de Grace Hopper funcionando al revés" style="max-width: 300px; width: 100%; height: auto; margin: 2rem auto; display: block; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);" />

Ella misma decía que **"los humanos son alérgicos al cambio"**, y que nuestra tendencia natural es buscar la seguridad en lo conocido, incluso cuando lo conocido ya no funciona.

## El peligro de la inercia tecnológica

En el desarrollo de software, "siempre se ha hecho así" es el preludio de la deuda técnica y el estancamiento. Es lo que mantiene vivas librerías obsoletas, arquitecturas monolíticas que ya no escalan y procesos de despliegue manuales que dan miedo tocar.

> **El caso de Moment.js**
>
> Es el ejemplo perfecto. A pesar de que sus propios creadores la han declarado como deprecada y recomiendan usar alternativas modernas como **Luxon** (creada por ellos mismos), **Day.js** o **date-fns**, todavía hay mucha gente que se enfada o se pone a la defensiva cuando se menciona. Prefieren seguir usando una librería pesada y con una arquitectura antigua solo porque "es la que conocen".

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

En ingeniería hay que iterar, hay que avanzar, hay que probar cosas, equivocarse, aprender y crecer. Debemos buscar alternativas, formas distintas de hacer las cosas. De ahí nació, por ejemplo, `async/await` en JavaScript. 

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

## Cambiar de opinión es un superpoder

La resistencia al cambio no solo afecta a cómo escribimos código, sino a cómo vemos las nuevas herramientas. A mí mismo me pasó con **Tailwind CSS**. Al principio, ver todas esas clases en el HTML me parecía un error, una vuelta atrás a los tiempos de los estilos en línea. "No me gusta", decía.

Sin embargo, tras usarlo unas cuantas veces en proyectos reales, mi perspectiva cambió por completo. Muchos vieron esto como una contradicción: "¿Pero no decías que Tailwind era una mala idea?". No era una contradicción, era **crecimiento**. 

Como desarrolladores, aferrarnos a una opinión antigua por orgullo es una forma de "siempre se ha hecho así" mental. Si recibes nueva información o experimentas una herramienta y tus conclusiones cambian, evolucionar tu opinión es la única respuesta lógica. **No estás contradiciéndote, estás actualizando tu software mental con mejores datos.**

## ¿Cómo evitar la frase dañina?

1. **La regla de los 5 porqués:** Cuando alguien diga "siempre se ha hecho así", pregunta "¿Por qué?". Sigue preguntando hasta llegar a la raíz. A menudo descubrirás que la razón original ya no existe.
2. **Experimentación constante:** Dedica un pequeño porcentaje de tu tiempo a probar alternativas. ¿Hay una forma de hacer este componente con menos props? ¿Podemos usar esa librería que antes criticábamos?
3. **Mantenimiento proactivo:** No esperes a que algo se rompa para modernizarlo. El código que no evoluciona, muere.

Grace Hopper nos enseñó que los barcos están seguros en el puerto, pero que **no es para eso para lo que se construyen los barcos**. Sal de tu zona de confort y no dejes que la costumbre dicte tu arquitectura ni tus opiniones.

---
id: "85"
title: "Separa lo que cambia de lo que permanece igual"
category: "Arquitectura"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "sandi-metz"
---

**Si dos cosas cambian por motivos diferentes, no deberían estar en el mismo lugar.** Sandi Metz, autora de *Practical Object-Oriented Design in Ruby* (POODR) y una de las voces más respetadas en diseño de software, resume décadas de experiencia en esta idea: *"The goal of design is to allow you to do design later."*

Metz no habla de sobre-ingeniería ni de predecir el futuro. Habla de algo mucho más práctico: organizar tu código de forma que, cuando el cambio inevitable llegue, solo tengas que tocar un lugar. Si cada vez que cambian los requisitos de negocio tienes que modificar cinco archivos, tu código tiene un problema de diseño, no de complejidad.

## La pregunta que revela el acoplamiento

Metz propone un ejercicio simple: **cuando algo cambia, ¿cuántos archivos tienes que modificar?** Si la respuesta es "más de uno", probablemente estés mezclando cosas que deberían estar separadas.

```javascript
// ❌ Mezclado: lógica de negocio, formato y presentación juntos
function UserProfile({ user }) {
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  const isActive = user.lastLogin > Date.now() - thirtyDays;
  const memberSince = new Intl.DateTimeFormat('es', {
    year: 'numeric', month: 'long'
  }).format(user.createdAt);

  const badgeColor = isActive ? 'green' : 'gray';

  return (
    <div className="profile">
      <span style={{ color: badgeColor }}>
        {isActive ? 'Activo' : 'Inactivo'}
      </span>
      <p>Miembro desde {memberSince}</p>
    </div>
  );
}
```

¿Qué pasa si "activo" pasa a significar 60 días en vez de 30? Tocas el componente. ¿Si el formato de fecha cambia? Tocas el componente. ¿Si el color del badge cambia? Tocas el componente. Todo cambia por motivos distintos, pero vive en el mismo lugar.

```javascript
// ✅ Separado: cada cosa cambia independientemente
function isUserActive(user, thresholdDays = 30) {
  const threshold = thresholdDays * 24 * 60 * 60 * 1000;
  return user.lastLogin > Date.now() - threshold;
}

function formatMemberDate(date) {
  return new Intl.DateTimeFormat('es', {
    year: 'numeric', month: 'long'
  }).format(date);
}

function UserProfile({ user }) {
  const active = isUserActive(user);
  return (
    <div className="profile">
      <ActivityBadge active={active} />
      <p>Miembro desde {formatMemberDate(user.createdAt)}</p>
    </div>
  );
}
```

Ahora la regla de negocio, el formato y la presentación pueden evolucionar por separado. Cada cambio toca exactamente un lugar.

## El Principio Abierto/Cerrado en la práctica

Esta idea conecta directamente con uno de los principios SOLID: **abierto para extensión, cerrado para modificación**. En lugar de modificar código existente cada vez que hay un nuevo requisito, diseñas para que los nuevos casos se *añadan* sin tocar lo anterior:

```javascript
// ❌ Cada nuevo tipo de notificación modifica la función existente
function sendNotification(user, type, message) {
  if (type === 'email') {
    emailService.send(user.email, message);
  } else if (type === 'sms') {
    smsService.send(user.phone, message);
  } else if (type === 'push') {
    pushService.send(user.deviceToken, message);
  }
  // ¿Nuevo canal? Hay que modificar esta función
}

// ✅ Extensible sin modificar
const notificationChannels = {
  email: (user, msg) => emailService.send(user.email, msg),
  sms: (user, msg) => smsService.send(user.phone, msg),
  push: (user, msg) => pushService.send(user.deviceToken, msg),
};

function sendNotification(user, type, message) {
  const channel = notificationChannels[type];
  if (!channel) throw new Error(`Unknown channel: ${type}`);
  return channel(user, message);
}

// Nuevo canal: solo añades una entrada, sin tocar la función
notificationChannels.slack = (user, msg) =>
  slackService.send(user.slackId, msg);
```

## Identifica qué cambia junto

Metz ofrece una heurística poderosa: **el código que cambia por el mismo motivo debería vivir junto, y el que cambia por motivos diferentes debería estar separado**.

Esto suena abstracto, pero se concreta en preguntas muy prácticas:

1. Si cambian las reglas de precios, ¿cuántos archivos tocas?
2. Si el diseño visual cambia, ¿afecta a la lógica de negocio?
3. Si migras de base de datos, ¿tienen que cambiar tus controladores?
4. Si añades un nuevo rol de usuario, ¿cuántos `if` hay que modificar?

Si la respuesta a cualquiera de estas es "demasiados", tu código está acoplando cosas que cambian por razones distintas.

La elegancia del código no está en lo sofisticado de sus patrones, sino en lo predecible que es el impacto de cada cambio. Cuando separas lo que cambia de lo que permanece, cada modificación se convierte en algo quirúrgico: preciso, localizado y sin efectos secundarios. Eso es lo que Sandi Metz quiere decir cuando dice que el objetivo del diseño es *permitirte diseñar después*.

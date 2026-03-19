---
id: "64"
title: "Escribe código que sea fácil de borrar, no fácil de extender"
category: "Arquitectura"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "tania-rascia"
---

Tania Rascia, desarrolladora y escritora técnica, promueve una idea liberadora: **el mejor código no es el más extensible, es el que puedes borrar sin miedo**.

## La obsesión con la extensibilidad

```javascript
// "Por si acaso necesitamos añadir más tipos de notificación"
class NotificationFactory {
  static create(type, options) {
    switch(type) {
      case 'email': return new EmailNotification(options);
      case 'sms': return new SMSNotification(options);
      case 'push': return new PushNotification(options);
      // Preparado para 10 tipos más que nunca usaremos
    }
  }
}

// 6 meses después: solo usamos email
// Pero tenemos 500 líneas de "infraestructura"
```

## Código que puedes borrar

```javascript
// Simple, directo, borrable
async function sendEmailNotification(user, message) {
  await emailService.send({
    to: user.email,
    subject: 'Notification',
    body: message
  });
}

// Si mañana necesitas SMS:
// 1. Crea sendSMSNotification
// 2. Úsala donde la necesites
// 3. No tocaste el código existente
```

## Por qué importa poder borrar

### 1. El código es temporal

```markdown
Estadística real de una codebase:
- 50% del código se reescribe en 2 años
- 20% nunca se usa (código muerto)
- 30% se mantiene igual

Si el 70% va a cambiar o morir, ¿por qué optimizar para extensión?
```

### 2. Los requisitos cambian

```javascript
// Lo que el cliente pidió: carrito de compras básico
// Lo que construiste: sistema de e-commerce enterprise-ready

// 3 meses después:
// Cliente: "Vamos a pivotar a un modelo de suscripción"
// Tú: "Tengo que reescribir todo"
```

### 3. Menos dependencias = más borrable

```javascript
// ❌ Difícil de borrar
// Este componente usa 5 servicios, 3 stores, 2 contextos
function ComplexComponent() {
  const { user } = useAuth();
  const { cart } = useCart();
  const { theme } = useTheme();
  const notifications = useNotifications();
  const analytics = useAnalytics();
  // ...
}

// ✅ Fácil de borrar
// Props in, render out
function SimpleCard({ title, description, onAction }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onAction}>Action</button>
    </div>
  );
}
```

## Señales de código difícil de borrar

1. **Muchas dependencias circulares**
2. **Módulo "core" que todo usa**
3. **Efectos secundarios ocultos**
4. **Estado global en todas partes**

## Cómo escribir código borrable

### Módulos independientes

```javascript
// Cada feature es auto-contenida
/features
  /auth
    - login.js
    - signup.js
    - authService.js
  /payments
    - checkout.js
    - paymentService.js

// Borrar /payments no afecta /auth
```

### Props sobre context

```jsx
// Fácil de testear, mover, o borrar
<UserCard user={user} onEdit={handleEdit} />

// vs. dependencias implícitas
<UserCard /> // ¿De dónde viene el user? ¿Qué contextos necesita?
```

## Reflexión final

Tania nos recuerda que el código no es un monumento. Es una herramienta temporal que resuelve problemas de hoy. Cuando escribes código pensando en que algún día lo borrarás, escribes código más simple, más limpio, y paradójicamente, más duradero.

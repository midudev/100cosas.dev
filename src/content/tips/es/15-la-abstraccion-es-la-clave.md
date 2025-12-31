---
id: "15"
title: "La abstracción es la clave para la supervivencia"
category: "Arquitectura"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "barbara-liskov"
---

La informática no trata sobre los ordenadores, sino sobre la gestión de la complejidad. **Barbara Liskov**, una de las mentes más brillantes en la historia del software y ganadora del Premio Turing, nos dejó una lección que hoy es más relevante que nunca: la abstracción no es un lujo, es el mecanismo de defensa de nuestro código contra el tiempo.

> "La abstracción es la clave para construir sistemas que sobrevivan al cambio".

## El cambio es la única constante

En un proyecto de software, lo único que sabemos con certeza es que los requisitos van a cambiar. La base de datos que hoy es perfecta será reemplazada mañana; la API externa que usamos hoy cambiará sus términos; o simplemente las reglas de negocio evolucionarán.

Si nuestro código conoce demasiados detalles sobre cómo funcionan las cosas por dentro, se vuelve rígido. Cuando un detalle cambia, todo lo que depende de él se rompe. La abstracción nos permite crear una "interfaz" o un contrato que oculta esos detalles, permitiéndonos cambiar la implementación sin afectar al resto del sistema.

## El Principio de Sustitución de Liskov (LSP)

Barbara Liskov es mundialmente famosa por el principio que lleva su nombre (la 'L' de SOLID). Este principio establece que si tienes una clase base y una subclase, deberías poder usar la subclase en cualquier lugar donde esperes la clase base, sin que nada se rompa.

En TypeScript, esto significa que nuestras abstracciones deben ser honestas. No basta con que los tipos coincidan; el **comportamiento** también debe ser consistente.

## Ejemplo práctico en TypeScript

Imagina un sistema de notificaciones. Si diseñamos mal la abstracción, acabaremos con un código lleno de condicionales. Si la diseñamos siguiendo el principio de Liskov, el sistema será infinitamente extensible.

```typescript
// ❌ EL ERROR: Una abstracción que rompe el contrato
// Algunos subtipos requieren pasos extra o se comportan diferente
interface Notificador {
  enviar(mensaje: string): void;
}

class EmailNotificador implements Notificador {
  enviar(mensaje: string) {
    console.log(`Enviando Email: ${mensaje}`);
  }
}

class SMSNotificador implements Notificador {
  // ⚠️ VIOLACIÓN DE LISKOV: 
  // Obligamos al cliente a conocer un detalle (el número)
  // que la interfaz general no contempla.
  enviarConNumero(mensaje: string, telefono: string) {
    console.log(`Enviando SMS a ${telefono}: ${mensaje}`);
  }
  
  enviar(mensaje: string) {
    throw new Error("Necesito un número de teléfono");
  }
}

// ✅ LA SOLUCIÓN: Abstraer correctamente
// El cliente no necesita saber los detalles de implementación
interface MessageService {
  send(content: string): Promise<void>;
}

class EmailService implements MessageService {
  constructor(private email: string) {}
  async send(content: string) {
    console.log(`Email enviado a ${this.email}: ${content}`);
  }
}

class PushService implements MessageService {
  constructor(private deviceId: string) {}
  async send(content: string) {
    console.log(`Push enviada al dispositivo ${this.deviceId}: ${content}`);
  }
}

// Ahora cualquier servicio puede sustituir a MessageService
// sin que el código que lo usa tenga que cambiar.
async function notifyUser(service: MessageService, message: string) {
  await service.send(message); // Funciona para CUALQUIER servicio
}
```

## Por qué esto salva tu sistema

Cuando aplicas la abstracción correcta:
1. **Desacoplas el "qué" del "cómo"**: Tu lógica de negocio dice "notifica al usuario", no "conéctate al servidor SMTP de Amazon y envía un paquete".
2. **Facilitas el testing**: Puedes sustituir implementaciones reales por "mocks" que sigan la misma interfaz.
3. **Reduces el miedo al cambio**: Si mañana decides usar WhatsApp en lugar de SMS, solo tienes que crear una nueva clase que implemente la interfaz. El resto de tu aplicación ni se enterará del cambio.

La abstracción no es hacer el código más difícil de leer añadiendo capas innecesarias; es crear los límites adecuados para que tu sistema no colapse bajo su propio peso cuando el mundo exterior cambie.

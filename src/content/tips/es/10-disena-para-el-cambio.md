---
id: "10"
title: "Tu aplicación solo tiene que funcionar una vez; debe ser fácil de cambiar para siempre"
category: "Diseño"
categoryColor: "text-purple-400 bg-purple-900/20"
author: "sandi-metz"
---

Esta es la esencia de la ingeniería de software: el coste real de una aplicación no está en su creación, sino en su mantenimiento.

Muchos desarrolladores se obsesionan con que el código "funcione" hoy. Si el requisito se cumple y los tests pasan, dan el trabajo por terminado. Sin embargo, el código que no es fácil de cambiar es, en realidad, una responsabilidad (_liability_) técnica.

## El dilema del presente vs. el futuro

Como dice Sandi en su libro _Practical Object-Oriented Design in Ruby (POODR)_:

1. **Tu aplicación necesita funcionar ahora mismo.** (El valor del negocio hoy).
2. **Debe ser fácil de cambiar para siempre.** (El valor del negocio mañana).

Si solo cumples el primer punto, estás construyendo una trampa. El software exitoso es aquel que sobrevive a sus requisitos iniciales.

## Un ejemplo en Ruby: Del acoplamiento a la flexibilidad

Imagina un sistema que procesa pedidos y envía notificaciones.

### El código que "solo funciona hoy"

Este código cumple el requisito, pero está acoplado a una implementación específica de correo. Si mañana queremos enviar un SMS o un mensaje de Slack, tendremos que modificar la clase `Pedido`.

```ruby
class Pedido
  def finalizar
    # ... lógica para finalizar el pedido ...
    enviar_confirmacion
  end

  def enviar_confirmacion
    # Acoplamiento total: Pedido conoce a EmailNotifier
    notifier = EmailNotifier.new
    notifier.send("Tu pedido ha sido finalizado")
  end
end
```

### El código "fácil de cambiar para siempre"

Aplicando la **Inyección de Dependencias**, la clase `Pedido` ya no sabe *cómo* se envía la notificación, solo sabe que algo puede enviarla.

```ruby
class Pedido
  attr_reader :notifier

  def initialize(notifier:)
    @notifier = notifier
  end

  def finalizar
    # ... lógica para finalizar el pedido ...
    notifier.send("Tu pedido ha sido finalizado")
  end
end

# Ahora podemos cambiar el comportamiento sin tocar la clase Pedido
pedido_web = Pedido.new(notifier: EmailNotifier.new)
pedido_api = Pedido.new(notifier: SMSNotifier.new)
```

## Los 4 pilares del diseño (TRUE)

Sandi Metz propone el acrónimo **TRUE** para evaluar si nuestro código es fácil de cambiar:

- **T**ransparente: Las consecuencias de un cambio deben ser obvias.
- **R**azonable: El coste de un cambio debe ser proporcional al beneficio.
- **U**sable: El código debe poder reutilizarse en nuevos contextos.
- **E**jemplar: El código debe invitar a quienes lo mantienen a seguir el mismo diseño.

No escribas código para que el ordenador lo entienda hoy. Escribe código para que tu compañero (o tu "yo del futuro") pueda modificarlo mañana sin miedo. La arquitectura no consiste en predecir el futuro, sino en estar preparado para cuando este cambie.

---
id: "10"
title: "Sua aplicação precisa funcionar agora; deve ser fácil de mudar para sempre"
category: "design"
categoryColor: "text-purple-400 bg-purple-900/20"
author: "sandi-metz"
---

Esta citação de **Sandi Metz** resume a essência da engenharia de software: o custo real de uma aplicação não está em sua criação, mas em sua manutenção.

Muitos desenvolvedores obsessivos fazem o código "funcionar" hoje. Se o requisito for atendido e os testes passarem, consideram o trabalho terminado. Porém, código que não é fácil de mudar é, na realidade, um passivo técnico.

## O Dilema do Presente vs. Futuro

Como Sandi diz em seu livro *Practical Object-Oriented Design in Ruby (POODR)*:

1. **Sua aplicação precisa funcionar agora.** (Valor de negócio hoje).
2. **Deve ser fácil de mudar para sempre.** (Valor de negócio amanhã).

Se você apenas cumpre o primeiro ponto, está construindo uma armadilha. Software bem-sucedido é aquele que sobrevive aos seus requisitos iniciais.

## Um Exemplo em Ruby: Do Acoplamento à Flexibilidade

Imagine um sistema que processa pedidos e envia notificações.

### Código que "apenas funciona hoje"

Este código atende ao requisito, mas é acoplado a uma implementação específica de email. Se amanhã quisermos enviar um SMS ou uma mensagem do Slack, teremos que modificar a classe `Order`.

```ruby
class Order
  def finalize
    # ... lógica para finalizar o pedido ...
    send_confirmation
  end

  def send_confirmation
    # Acoplamento duro: Order conhece EmailNotifier
    notifier = EmailNotifier.new
    notifier.send("Seu pedido foi finalizado")
  end
end
```

### Código "fácil de mudar para sempre"

Aplicando **Injeção de Dependência**, a classe `Order` não sabe mais *como* a notificação é enviada, apenas sabe que algo pode enviá-la.

```ruby
class Order
  attr_reader :notifier

  def initialize(notifier:)
    @notifier = notifier
  end

  def finalize
    # ... lógica para finalizar o pedido ...
    notifier.send("Seu pedido foi finalizado")
  end
end

# Agora podemos mudar o comportamento sem tocar na classe Order
web_order = Order.new(notifier: EmailNotifier.new)
api_order = Order.new(notifier: SMSNotifier.new)
```

## Os 4 Pilares do Design (TRUE)

Sandi Metz propõe o acrônimo **TRUE** para avaliar se nosso código é fácil de mudar:

- **T**ransparente (Transparent): As consequências de uma mudança devem ser óbvias.
- **R**easonável (Reasonable): O custo de uma mudança deve ser proporcional ao benefício.
- **U**tilizável (Usable): O código deve ser reutilizável em novos contextos.
- **E**xemplar (Exemplary): O código deve convidar aqueles que o mantêm a seguir o mesmo design.

Não escreva código para o computador entender hoje. Escreva código para que seu colega (ou seu "eu do futuro") possa modificá-lo amanhã sem medo. Arquitetura não é sobre prever o futuro, mas sobre estar preparado para quando ele mudar.

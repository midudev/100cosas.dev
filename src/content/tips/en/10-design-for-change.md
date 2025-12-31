---
id: "10"
title: "Your application needs to work right now just once; it must be easy to change forever"
category: "Design"
categoryColor: "text-purple-400 bg-purple-900/20"
author: "sandi-metz"
---

This quote by **Sandi Metz** summarizes the essence of software engineering: the real cost of an application is not in its creation, but in its maintenance.

Many developers obsess over making the code "work" today. If the requirement is met and the tests pass, they consider the job done. However, code that is not easy to change is, in reality, a technical liability.

## The dilemma of Present vs. Future

As Sandi says in her book *Practical Object-Oriented Design in Ruby (POODR)*:

1. **Your application needs to work right now.** (Business value today).
2. **It must be easy to change forever.** (Business value tomorrow).

If you only fulfill the first point, you are building a trap. Successful software is that which survives its initial requirements.

## A Ruby Example: From Coupling to Flexibility

Imagine a system that processes orders and sends notifications.

### Code that "just works today"

This code meets the requirement, but it is coupled to a specific email implementation. If tomorrow we want to send an SMS or a Slack message, we will have to modify the `Order` class.

```ruby
class Order
  def finalize
    # ... logic to finalize the order ...
    send_confirmation
  end

  def send_confirmation
    # Hard coupling: Order knows about EmailNotifier
    notifier = EmailNotifier.new
    notifier.send("Your order has been finalized")
  end
end
```

### Code "easy to change forever"

By applying **Dependency Injection**, the `Order` class no longer knows *how* the notification is sent, it only knows that something can send it.

```ruby
class Order
  attr_reader :notifier

  def initialize(notifier:)
    @notifier = notifier
  end

  def finalize
    # ... logic to finalize the order ...
    notifier.send("Your order has been finalized")
  end
end

# Now we can change the behavior without touching the Order class
web_order = Order.new(notifier: EmailNotifier.new)
api_order = Order.new(notifier: SMSNotifier.new)
```

## The 4 Pillars of Design (TRUE)

Sandi Metz proposes the **TRUE** acronym to evaluate if our code is easy to change:

- **T**ransparent: The consequences of a change should be obvious.
- **R**easonable: The cost of a change should be proportional to the benefit.
- **U**sable: The code should be reusable in new contexts.
- **E**xemplary: The code should invite those who maintain it to follow the same design.

Don't write code for the computer to understand today. Write code so that your colleague (or your "future self") can modify it tomorrow without fear. Architecture is not about predicting the future, but about being ready for when it changes.

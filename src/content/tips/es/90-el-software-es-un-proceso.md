---
id: "90"
title: "El software es un proceso, no un producto terminado"
category: "Mentalidad"
categoryColor: "text-cyan-400 bg-cyan-900/20"
author: "martin-fowler"
---

Hay una fantasía peligrosa que persigue a todo equipo de desarrollo: la idea de que un día, después de la "última feature", el software estará *terminado*. **Martin Fowler**, Chief Scientist de ThoughtWorks y una de las mentes más influyentes de la ingeniería de software, lleva décadas combatiendo esa ilusión: *"El software que no evoluciona, muere"*.

Fowler no exagera. Gmail estuvo en "beta" durante cinco años. Facebook se reescribe constantemente por dentro mientras millones de personas lo usan. El kernel de Linux recibe miles de commits cada mes, más de treinta años después de su primera línea de código. El software no es un edificio que se inaugura; es un organismo vivo que respira, crece y se adapta.

## La trampa de la planificación perfecta

En los años 90, la industria vivía obsesionada con el modelo en cascada: especificar todo al detalle, diseñar la arquitectura completa y luego implementar según el plan. El problema es que el mundo no se detiene mientras tú planificas.

Martin Fowler fue uno de los firmantes del Manifiesto Ágil en 2001, precisamente porque entendía que **la capacidad de responder al cambio es más valiosa que seguir un plan**. No porque los planes sean inútiles, sino porque la realidad siempre los supera.

¿Cuántas veces has vivido esta historia?

```markdown
📋 Planificación del proyecto (enero):
   "En 3 meses tendremos el MVP completo y listo para producción"

📊 Realidad (abril):
   - 3 cambios de requisitos del cliente
   - 1 API externa que cambió su formato
   - 2 dependencias con vulnerabilidades críticas
   - 1 miembro del equipo que se fue
   - El "MVP completo" ahora tiene el doble de scope
```

La solución no es planificar mejor. Es **diseñar sistemas que abracen el cambio** en lugar de resistirlo.

## Diseña para el cambio, no para la eternidad

El concepto clave de Fowler es el **diseño evolutivo**: en lugar de intentar crear la arquitectura perfecta desde el día uno, crea una arquitectura que sea barata de modificar. La diferencia es sutil pero transformadora.

```typescript
// ❌ Diseño "para siempre": acoplamiento rígido
// Si cambias el proveedor de pagos, tocas 47 archivos.
class OrderService {
  async processPayment(order: Order) {
    const stripe = new Stripe(process.env.STRIPE_KEY);
    const charge = await stripe.charges.create({
      amount: order.total,
      currency: 'eur',
      source: order.paymentToken
    });
    await db.query(
      'UPDATE orders SET stripe_charge_id = $1 WHERE id = $2',
      [charge.id, order.id]
    );
  }
}

// ✅ Diseño evolutivo: preparado para el cambio
// Si cambias de Stripe a otro proveedor, solo tocas un archivo.
interface PaymentProvider {
  charge(amount: number, currency: string, token: string): Promise<PaymentResult>;
}

class OrderService {
  constructor(private payments: PaymentProvider) {}

  async processPayment(order: Order) {
    const result = await this.payments.charge(
      order.total,
      order.currency,
      order.paymentToken
    );
    await this.orderRepository.updatePayment(order.id, result);
  }
}
```

El segundo diseño no es "mejor" porque sea más abstracto. Es mejor porque cuando el cambio llegue (y siempre llega), el coste de adaptarse será una fracción del primero.

## Los pilares del software que evoluciona

Fowler identifica varias prácticas que hacen que el cambio sea barato y seguro:

1. **Tests automatizados como red de seguridad.** No puedes refactorizar con confianza si no sabes al instante qué has roto. Los tests no son un extra; son el permiso para evolucionar.
2. **Integración y despliegue continuo.** Si desplegar es un evento traumático que requiere un ritual de tres días, nadie querrá hacer cambios. Haz que desplegar sea tan rutinario como hacer un commit.
3. **Módulos con responsabilidades claras.** Cuando cada pieza hace una cosa bien, puedes reemplazarla sin que el resto se entere. El acoplamiento bajo no es elegancia académica, es supervivencia práctica.
4. **Refactorización constante.** No esperes a que el código se pudra. Fowler lo llama "refactoring oportunista": cada vez que tocas un archivo, déjalo un poco mejor de como lo encontraste.
5. **Documentación viva.** Los ADR (Architecture Decision Records) capturan *por qué* se tomó cada decisión, no solo *qué* se decidió. Cuando alguien quiera cambiar algo dentro de un año, entenderá el contexto original.

## El código legacy no es código viejo, es código sin tests

Una de las definiciones más potentes de Fowler es esta: el código legacy no es el que tiene muchos años, sino el que no tiene tests. Un sistema de 15 años con buena cobertura de tests se puede refactorizar sin miedo. Un sistema de 6 meses sin ningún test es un campo de minas donde nadie se atreve a tocar nada.

Esa distinción cambia completamente cómo piensas sobre tu trabajo. No estás escribiendo código que "algún día" habrá que mantener. Estás escribiendo código que se está manteniendo *ahora mismo*, desde el momento en que pulsas Enter.

Acepta que tu software nunca estará terminado y deja de verlo como un fracaso. Es exactamente lo contrario: un producto que sigue evolucionando es un producto que sigue siendo útil. El día que dejas de cambiar el software es el día que empieza a morir. Tu trabajo no es construir algo perfecto; es construir algo que pueda mejorar cada día. Y eso, lejos de ser frustrante, es lo que hace que esta profesión sea infinitamente interesante.

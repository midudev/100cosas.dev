---
id: "75"
title: "No reinventes la rueda (a menos que estés aprendiendo sobre ruedas)"
category: "Productividad"
categoryColor: "text-lime-400 bg-lime-900/20"
author: "kent-c-dodds"
---

**Kent C. Dodds, uno de los educadores más influyentes del ecosistema JavaScript, tiene una regla que parece contradictoria viniendo de alguien que ha creado decenas de librerías open source: "Si no estás aprendiendo, no reinventes la rueda. Y si estás aprendiendo, reinvéntala y luego tírala."**

La distinción es quirúrgica. Kent no te dice que nunca construyas tu propia solución, ni que siempre uses librerías de terceros. Te dice que la decisión debe basarse en una sola pregunta: **¿cuál es tu objetivo? ¿Enviar un producto o entender cómo funciona algo?**

## El coste invisible de reinventar

Cada vez que decides escribir tu propia implementación de algo que ya existe, estás asumiendo una deuda que la mayoría no calcula:

```typescript
// ❌ "Solo necesito una función sencilla de validación de emails"
function validateEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

// Parece simple, ¿verdad? Pero:
// - No acepta emails con "+" como "user+tag@gmail.com" → Falso negativo
// - No valida TLDs nuevos como .technology o .consulting
// - No maneja caracteres internacionales (IDN)
// - No detecta emails técnicamente válidos pero inexistentes
// - No cumple con RFC 5322 (que tiene casos absurdos pero legales)

// ✅ Usar una solución probada por millones de usuarios
import { z } from 'zod';

const emailSchema = z.string().email();
const result = emailSchema.safeParse(input);
// Años de edge cases cubiertos por la comunidad
```

El equipo de Chromium documentó un caso célebre: un desarrollador implementó su propio parser de fechas "sencillo" que funcionó durante dos años. Hasta que un usuario en Japón reportó que el sistema se rompía cada primer día del mes porque el parser no contemplaba el formato de fecha japonés. El fix costó tres semanas de trabajo. Usar `Intl.DateTimeFormat` (una API nativa) habría costado una línea.

## Cuándo tiene sentido reinventar

Kent predica con el ejemplo. Creó `testing-library` no porque no existieran herramientas de testing, sino porque las existentes no reflejaban cómo los usuarios realmente interactúan con las aplicaciones. Reinventó con un propósito claro y una tesis original.

Las razones legítimas para construir tu propia solución son pocas pero válidas:

1. **Para aprender:** Implementar tu propio `useState`, tu propio router o tu propio bundler es una de las mejores formas de entender la tecnología en profundidad. Pero ese código va a un repo personal, no a producción.

2. **Cuando tu caso es genuinamente único:** Si tu negocio tiene requisitos que ninguna librería existente cubre y la adaptación sería más compleja que la implementación desde cero.

3. **Cuando la dependencia es un riesgo:** Si una librería está mantenida por una sola persona, no tiene tests, o su licencia es incompatible con tu proyecto.

```typescript
// ✅ Reinventar para aprender (y luego tirarlo)
function mySimpleReactiveSystem() {
  const subscribers = new Set<() => void>();
  let value: any;

  return {
    get: () => value,
    set: (newValue: any) => {
      value = newValue;
      subscribers.forEach(fn => fn());
    },
    subscribe: (fn: () => void) => {
      subscribers.add(fn);
      return () => subscribers.delete(fn);
    }
  };
}
// Ahora entiendes los fundamentos de Svelte, SolidJS y signals.
// Para producción: usa la librería real.
```

## El framework de decisión

Kent propone un enfoque estructurado para decidir si usar una dependencia o construir la tuya:

```markdown
¿El problema es específico de mi dominio de negocio?
  → SÍ: Constrúyelo tú. Es tu ventaja competitiva.
  → NO: ¿Existe una solución mantenida y probada?
    → SÍ: Úsala. Tu tiempo vale más.
    → NO: ¿Puedes contribuir a una solución existente?
      → SÍ: Contribuye. Beneficias a todos.
      → NO: Constrúyelo, pero prepárate para mantenerlo.
```

Este framework explica por qué empresas como Vercel construyen su propia infraestructura de deployment (es su dominio de negocio) pero usan React para la UI (no es su diferenciador). O por qué Stripe construyó su propio motor de reglas de fraude pero usa PostgreSQL para la base de datos.

## El equilibrio del pragmatismo

Hay un anti-patrón igual de peligroso que reinventar la rueda: el **"dependency hell"**, donde cada función trivial se resuelve con un `npm install`. Kent también advierte contra esto. La famosa debacle de `left-pad` en 2016 (donde un paquete de 11 líneas rompió medio Internet al ser eliminado de npm) es el ejemplo perfecto de dependencia innecesaria.

La regla es de sentido común: si la solución es una función de menos de 20 líneas sin edge cases, escríbela tú. Si es un problema con años de edge cases descubiertos por millones de usuarios (validación, fechas, criptografía, parsing), usa la librería.

Tu valor como desarrollador no está en reimplementar lo que otros ya resolvieron. Está en resolver los problemas que solo tú puedes resolver: los de tu producto, tus usuarios y tu negocio. **Usa las ruedas que ya existen para llegar más lejos, más rápido, y guarda tu energía creativa para construir el vehículo que nadie ha imaginado todavía.**

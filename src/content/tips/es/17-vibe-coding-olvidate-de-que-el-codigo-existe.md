---
id: "17"
title: "Vibe Coding: Olvídate de que el código existe"
category: "IA"
categoryColor: "text-fuchsia-400 bg-fuchsia-900/20"
author: "andrej-karpathy"
---

En febrero de 2025, **Andrej Karpathy**, cofundador de OpenAI y exdirector de IA en Tesla, acuñó un término que captura un cambio sísmico en cómo programamos: **"Vibe Coding"**.

> "There's a new kind of coding I call 'vibe coding', where you fully give in to the vibes, embrace exponentials, and forget that the code even exists."

Hay un nuevo tipo de programación que llamo "vibe coding", donde te dejas llevar completamente por las vibraciones, abrazas los exponenciales, y **olvidas que el código siquiera existe**.

## El cambio de paradigma

Durante décadas, programar ha significado escribir código: memorizar sintaxis, pelear con puntos y comas, entender la diferencia entre `==` y `===`. El vibe coding propone algo radical: **describes lo que quieres en lenguaje natural y la IA genera el código por ti**.

No es programación asistida. No es autocompletado. Es un cambio fundamental en la relación entre humano y máquina.

## ¿Cómo funciona en la práctica?

```typescript
// ANTES: Tú escribes cada línea
function getActiveUserEmails(users: User[]): string[] {
  return users
    .filter(user => user.isActive && user.emailVerified)
    .map(user => user.email)
    .filter((email): email is string => email !== null);
}

// AHORA: Tú describes, la IA implementa
// "Dame los emails de usuarios activos que tengan el email verificado,
// excluyendo los nulos"

// La IA genera el código. Tú lo revisas y ajustas.
```

## Los tres niveles del vibe coding

### Nivel 1: Autocompletado inteligente

La IA completa líneas basándose en el contexto. Es lo que hacen Copilot y Cursor en su modo básico. Sigues escribiendo código, pero más rápido.

### Nivel 2: Generación por instrucciones

Describes una función o componente completo en lenguaje natural. La IA genera un bloque de código que tú revisas. Es "pair programming" con una IA.

### Nivel 3: Vibe coding puro

Te olvidas del código. Hablas con la IA como si fuera un desarrollador junior muy rápido. Le dices qué quieres, ella implementa, tú corriges el rumbo. Iteras hasta que funciona.

## Las reglas del vibe coding según Karpathy

1. **Acepta la imperfección:** El código generado no será perfecto. Tu trabajo es guiar, no dictar cada carácter.

2. **Piensa en alto nivel:** En lugar de "haz un for loop", piensa en "procesa todos los usuarios y devuelve un resumen".

3. **Itera rápido:** El primer intento no será el bueno. Pide cambios, ajusta, refina. La conversación ES el proceso de desarrollo.

4. **Lee el código (al menos una vez):** No es magia. Es código que debe ser correcto, seguro y mantenible.

## Los riesgos que debes conocer

El vibe coding tiene un lado oscuro que Karpathy también reconoce:

```typescript
// ⚠️ PELIGRO: Código que "funciona" pero no entiendes
// La IA generó esto. ¿Sabes qué hace exactamente?
const result = data.reduce((acc, item) => 
  item.type === 'A' 
    ? { ...acc, a: [...(acc.a || []), transform(item)] }
    : item.type === 'B'
      ? { ...acc, b: [...(acc.b || []), process(item)] }
      : acc
, {} as Record<string, unknown[]>);

// Si no lo entiendes, no puedes depurarlo.
// Si no puedes depurarlo, no puedes mantenerlo.
```

## Cuándo usar vibe coding

✅ **Ideal para:**
- Prototipos y MVPs
- Scripts de automatización
- Exploración de ideas
- Aprender nuevos frameworks
- Boilerplate y código repetitivo

⚠️ **Con precaución en:**
- Sistemas críticos de seguridad
- Código de producción sin revisión
- Algoritmos financieros o médicos
- Cualquier cosa que no puedas verificar

## El futuro según Karpathy

Karpathy predice que en unos años, la mayoría del código será generado por IA. Los desarrolladores seremos "directores de orquesta" que guían y supervisan, no "músicos" que tocan cada nota.

Pero eso no significa que programar sea irrelevante. Al contrario: **entender código se vuelve más importante cuando no lo escribes tú**. Debes poder leer, evaluar y corregir lo que genera la IA.

El vibe coding no es el fin de la programación. Es su evolución. Y como toda herramienta poderosa, su valor depende de cómo la uses.

**Abraza las vibraciones, pero no pierdas el control.**

---
id: "41"
title: "La deuda técnica es como la financiera: hay que pagarla"
category: "Arquitectura"
categoryColor: "text-indigo-400 bg-indigo-900/20"
author: "ward-cunningham"
---

Ward Cunningham acuñó el término **"deuda técnica"** en 1992, y desde entonces ha sido malinterpretado constantemente. La metáfora original era mucho más sutil de lo que la mayoría asume.

## Lo que Ward realmente quiso decir

La deuda técnica **no es código malo**. Ward la definió así:

> "Entregar código que refleja tu entendimiento actual del problema, sabiendo que ese entendimiento mejorará con el tiempo"

Es como pedir un préstamo: obtienes valor ahora (entregar rápido) a cambio de intereses futuros (esfuerzo de refactoring).

## Deuda buena vs. deuda mala

### Deuda intencional (buena)

```javascript
// "Sé que este diseño no escala, pero necesito validar 
// la idea con usuarios reales antes de invertir más"
function processPayment(amount) {
  // Implementación simple que funciona para 100 usuarios
  // TODO: Refactorizar cuando tengamos tracción
  return stripe.charge(amount);
}
```

### Deuda accidental (mala)

```javascript
// "No sé lo que hago pero funciona, no lo toques"
function processPayment(a, b, c, flag1, flag2) {
  if (flag1 && !flag2 || (b > 0 && c !== undefined)) {
    // 500 líneas de código espagueti
  }
}
```

## Los intereses de la deuda

Cada día que no pagas la deuda, los intereses se acumulan:

1. **Velocidad reducida**: Cada feature nueva tarda más
2. **Bugs misteriosos**: El código frágil rompe en lugares inesperados
3. **Onboarding lento**: Los nuevos desarrolladores tardan meses en entender el sistema
4. **Miedo al cambio**: Nadie quiere tocar "esa parte del código"

## Cuándo endeudarse

La deuda técnica es una **herramienta estratégica**, no un accidente:

```markdown
✅ Endeúdate cuando:
- Necesitas validar una hipótesis de negocio rápidamente
- El coste de no entregar supera el coste de refactorizar
- Tienes un plan claro para pagar la deuda

❌ No te endeudes cuando:
- Es el camino de menor resistencia
- No entiendes las consecuencias
- No tienes intención de pagar
```

## Cómo pagar la deuda

Ward sugiere un enfoque continuo, no big-bang:

1. **Haz visible la deuda**: Documenta cada decisión consciente
2. **Paga intereses pequeños constantemente**: Refactoriza mientras trabajas
3. **No dejes que se acumule**: Un poco de deuda es manejable, mucha es paralizante

La metáfora de Ward es poderosa precisamente porque es familiar. Todos entendemos que la deuda financiera puede ser útil (hipoteca para una casa) o destructiva (tarjetas de crédito al límite). Lo mismo aplica al código: la deuda consciente y planificada es una herramienta; la deuda ignorada es un problema.

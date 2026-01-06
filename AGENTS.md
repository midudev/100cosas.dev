# Reglas para escribir contenido en Markdown

## Errores comunes de Markdown Lint a evitar

### MD030: Espacios después de marcadores de lista

Usa **solo 1 espacio** después del número y punto en listas ordenadas.

❌ Incorrecto:

```markdown
1.  Primer elemento
2.  Segundo elemento
```

✅ Correcto:

```markdown
1. Primer elemento
2. Segundo elemento
```

### MD022: Líneas en blanco alrededor de encabezados

Los encabezados (`##`, `###`, etc.) deben tener **una línea en blanco antes y después**.

❌ Incorrecto:

```markdown
Texto anterior.
### Mi Encabezado
Texto siguiente.
```

✅ Correcto:

```markdown
Texto anterior.

### Mi Encabezado

Texto siguiente.
```

### MD031: Líneas en blanco alrededor de bloques de código

Los bloques de código (fenced code blocks) deben tener **una línea en blanco antes y después**.

❌ Incorrecto:

```markdown
### Ejemplo

```typescript
const x = 1;
```
Más texto.
```

✅ Correcto:
```markdown
### Ejemplo

```typescript
const x = 1;
```

Más texto.
```

## Resumen rápido

1. Listas: `1. Item` (1 espacio, no 2)
2. Encabezados: línea en blanco antes y después
3. Bloques de código: línea en blanco antes y después

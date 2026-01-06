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

    ### Ejemplo
    ```typescript
    const x = 1;
    ```
    Más texto.

✅ Correcto:

    ### Ejemplo

    ```typescript
    const x = 1;
    ```

    Más texto.

### MD009: Espacios al final de línea (trailing spaces)

No dejes espacios en blanco al final de las líneas.

❌ Incorrecto:

```markdown
Esto es un texto con espacios al final.   
```

✅ Correcto:

```markdown
Esto es un texto sin espacios al final.
```

## Resumen rápido

1. Listas: `1. Item` (1 espacio, no 2)
2. Encabezados: línea en blanco antes y después
3. Bloques de código: línea en blanco antes y después
4. Sin espacios al final de las líneas (trailing spaces)

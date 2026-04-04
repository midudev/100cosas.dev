---
id: "19"
title: "Los algoritmos no son neutrales: tienen la cara de quien los programa"
category: "IA"
categoryColor: "text-rose-400 bg-rose-900/20"
author: "joy-buolamwini"
---

**Joy Buolamwini**, investigadora del MIT y fundadora de la Algorithmic Justice League, descubrió algo perturbador mientras trabajaba en su tesis: el software de reconocimiento facial no detectaba su cara. Era mujer y era negra. El algoritmo, entrenado mayoritariamente con rostros blancos masculinos, simplemente no la veía.

De esta experiencia nació su concepto de **"The Coded Gaze"** (La Mirada Codificada): la idea de que los sistemas de IA reflejan las prioridades, sesgos y puntos ciegos de quienes los crean.

## El mito de la objetividad algorítmica

Hay una creencia peligrosa en la industria: que los algoritmos son "objetivos" porque son matemáticos. Buolamwini desmontó este mito:

> "Algorithms are opinions embedded in code."
> Los algoritmos son opiniones incrustadas en código.

Un algoritmo no decide nada por sí mismo. Aprende de los datos que le damos. Y esos datos vienen de un mundo lleno de prejuicios, desigualdades e historia.

## El caso que lo cambió todo

En su investigación *Gender Shades*, Buolamwini analizó sistemas de reconocimiento facial de Microsoft, IBM y Face++. Los resultados fueron demoledores:

| Grupo demográfico | Tasa de error |
|-------------------|---------------|
| Hombres blancos | 0.8% |
| Mujeres blancas | 6.9% |
| Hombres negros | 12.0% |
| Mujeres negras | **34.7%** |

El sistema funcionaba casi perfectamente para hombres blancos y fallaba una de cada tres veces para mujeres negras. No era un bug técnico; era un reflejo de quién estaba (y quién no estaba) en los datos de entrenamiento.

## Qué significa esto para los desarrolladores

Cada línea de código que escribes tiene consecuencias en el mundo real. Y cuando entrenas modelos de IA, esas consecuencias se amplifican a escala masiva.

```typescript
// ❌ PELIGRO: Entrenar con datos sesgados
// Si tu dataset de "caras normales" solo tiene ciertos grupos,
// tu modelo aprenderá que esos son los "normales"
const trainingData = await fetchFaces({
  sources: ['stock-photos-generic'],  // Sesgado hacia ciertos grupos
  limit: 10000
});

// ✅ MEJOR: Auditar y diversificar los datos
const trainingData = await fetchFaces({
  sources: ['diverse-faces-in-the-wild'],
  requirements: {
    genderBalance: true,
    ethnicityDistribution: 'representative',
    ageRange: [18, 80]
  }
});

// Y aún así, audita el modelo resultante para detectar sesgos
await auditModelForBias(trainedModel, testDatasets);
```

## Las preguntas que debes hacerte

Antes de desplegar cualquier sistema que tome decisiones sobre personas, pregúntate:

1. **¿Quién está en los datos?** Si entrenas con datos de internet, estás entrenando con los sesgos de internet.

2. **¿Quién falta en los datos?** Los grupos subrepresentados tendrán peores resultados.

3. **¿Quién sufre las consecuencias de los errores?** Si tu algoritmo de contratación falla, ¿quién no consigue el trabajo? Si tu algoritmo de crédito falla, ¿quién no consigue el préstamo?

4. **¿Puedes explicar por qué el sistema tomó una decisión?** Si la respuesta es "el modelo lo decidió", tienes un problema.

## El trabajo de Joy continúa

Gracias al trabajo de Buolamwini, empresas como IBM y Microsoft mejoraron sus sistemas. Amazon pausó la venta de Rekognition a la policía. Y ciudades como San Francisco prohibieron el reconocimiento facial por parte del gobierno.

Pero la batalla no ha terminado. Cada día se despliegan nuevos sistemas de IA que toman decisiones sobre quién consigue un préstamo, quién es contratado, quién es vigilado.

Como desarrolladores, tenemos una responsabilidad. No es suficiente con que el código funcione. Debe funcionar **para todos**.

**El algoritmo tiene tu cara. Asegúrate de que refleje valores que te enorgullezcan.**

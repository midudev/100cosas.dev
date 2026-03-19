---
id: "19"
title: "Algorithms are not neutral: they have the face of who programs them"
category: "AI"
categoryColor: "text-rose-400 bg-rose-900/20"
author: "joy-buolamwini"
---

**Joy Buolamwini**, MIT researcher and founder of the Algorithmic Justice League, discovered something disturbing while working on her thesis: facial recognition software couldn't detect her face. She was a woman and she was Black. The algorithm, trained mostly on white male faces, simply couldn't see her.

From this experience came her concept of **"The Coded Gaze"**: the idea that AI systems reflect the priorities, biases, and blind spots of those who create them.

## The myth of algorithmic objectivity

There's a dangerous belief in the industry: that algorithms are "objective" because they're mathematical. Buolamwini dismantled this myth:

> "Algorithms are opinions embedded in code."

An algorithm doesn't decide anything by itself. It learns from the data we give it. And that data comes from a world full of prejudices, inequalities, and history.

## The case that changed everything

In her research *Gender Shades*, Buolamwini analyzed facial recognition systems from Microsoft, IBM, and Face++. The results were devastating:

| Demographic group | Error rate |
|-------------------|------------|
| White men | 0.8% |
| White women | 6.9% |
| Black men | 12.0% |
| Black women | **34.7%** |

The system worked almost perfectly for white men and failed one in three times for Black women. It wasn't a technical bug; it was a reflection of who was (and wasn't) in the training data.

## What this means for developers

Every line of code you write has consequences in the real world. And when you train AI models, those consequences are amplified at massive scale.

```typescript
// ❌ DANGER: Training with biased data
// If your "normal faces" dataset only has certain groups,
// your model will learn that those are the "normal" ones
const trainingData = await fetchFaces({ 
  sources: ['stock-photos-generic'],  // Biased toward certain groups
  limit: 10000 
});

// ✅ BETTER: Audit and diversify the data
const trainingData = await fetchFaces({
  sources: ['diverse-faces-in-the-wild'],
  requirements: {
    genderBalance: true,
    ethnicityDistribution: 'representative',
    ageRange: [18, 80]
  }
});

// And still, audit the resulting model to detect biases
await auditModelForBias(trainedModel, testDatasets);
```

## The questions you should ask yourself

Before deploying any system that makes decisions about people, ask yourself:

1. **Who is in the data?** If you train with internet data, you're training with the biases of the internet.

2. **Who is missing from the data?** Underrepresented groups will have worse outcomes.

3. **Who suffers the consequences of errors?** If your hiring algorithm fails, who doesn't get the job? If your credit algorithm fails, who doesn't get the loan?

4. **Can you explain why the system made a decision?** If the answer is "the model decided," you have a problem.

## Joy's work continues

Thanks to Buolamwini's work, companies like IBM and Microsoft improved their systems. Amazon paused selling Rekognition to police. And cities like San Francisco banned government facial recognition.

But the battle isn't over. Every day, new AI systems are deployed that make decisions about who gets a loan, who gets hired, who gets surveilled.

As developers, we have a responsibility. It's not enough for the code to work. It must work **for everyone**.

**The algorithm has your face. Make sure it reflects values you're proud of.**

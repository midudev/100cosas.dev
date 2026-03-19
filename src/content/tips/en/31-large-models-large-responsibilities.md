---
id: "31"
title: "With large models come large responsibilities"
category: "AI"
categoryColor: "text-rose-400 bg-rose-900/20"
author: "timnit-gebru"
---

**Timnit Gebru**, founder of the Distributed AI Research Institute (DAIR) and one of the most influential researchers in AI ethics, was fired from Google in 2020 for a paper warning about the dangers of large language models (LLMs). That paper has become prophetic.

Her central message is clear:

> "We need to ask: Who benefits from this AI? Who is harmed? Who decides?"

## The hidden costs of LLMs

When you use ChatGPT, Claude, or any LLM, there are costs you don't see:

### 1. Environmental cost

Training GPT-4 consumed energy equivalent to hundreds of homes for a year. Every query you make has a carbon footprint.

```typescript
// What you see
const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "Hello" }]
});

// What you don't see
// - Servers consuming megawatts
// - Data center cooling
// - CO2 emissions
// - Water usage for cooling
```

### 2. Invisible labor cost

Models are "aligned" by workers in developing countries who review traumatic content for minimum wages. The "clean" AI we use is built on invisible human labor.

### 3. Data cost

LLMs are trained on internet data, including:
- Your code on GitHub (without your explicit consent)
- Articles from journalists and writers (without compensation)
- Art from creators (without attribution)

## The questions Timnit forces us to ask

Before deploying any AI system, ask yourself:

```typescript
interface AIEthicsChecklist {
  // Who benefits?
  beneficiaries: {
    primary: string[];      // The company? Users? Society?
    secondary: string[];
  };
  
  // Who might be harmed?
  potentialHarms: {
    directHarms: string[];   // Discrimination, job loss
    indirectHarms: string[]; // Environmental impact, power concentration
    invisibleLabor: string[]; // Who keeps the system running?
  };
  
  // Who decides?
  governance: {
    whoDecides: string[];    // Only engineers? Affected parties?
    appealProcess: boolean;  // Can affected people appeal decisions?
    transparency: 'full' | 'partial' | 'none';
  };
}
```

## The problem of scale

Timnit warns that AI errors multiply by millions:

```typescript
// A bug in a traditional app
// Affects: users of that app
// Solution: deploy a fix

// A bias in a globally used LLM
// Affects: millions of people
// Perpetuates: stereotypes at massive scale
// Solution: ¿? (much more complex)
```

When GPT generates biased content about a group, it doesn't affect one person; **it affects the global perception of that group**.

## What you can do as a developer

1. **Audit before integrating:** Don't assume LLMs are neutral. Test with edge cases and marginalized groups.

2. **Document limitations:** When using AI in production, be transparent about what it can and cannot do.

3. **Keep humans in the loop:** For important decisions, AI suggests, humans decide.

4. **Question the need:** Do you really need an LLM for this? Sometimes a database query is better (and more ethical).

```typescript
// ❌ Using LLM by default
const response = await llm.generate("What are the store hours?");

// ✅ Using the appropriate tool
const hours = await database.getStoreHours(storeId);
// Faster, more accurate, cheaper, more ethical
```

## Timnit's legacy

Timnit paid a high price for telling the truth. But her work has changed how the industry talks about AI. Thanks to her, questions that were once ignored are now central to the conversation.

**With large models come large responsibilities.** And those responsibilities are yours too, developer.

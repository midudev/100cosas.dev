---
id: "23"
title: "Technology should empower citizens, not control them"
category: "Civic Tech"
categoryColor: "text-emerald-400 bg-emerald-900/20"
author: "audrey-tang"
---

**Audrey Tang** is not a typical digital minister. A hacker since age 8, Perl 6 contributor, and Taiwan's first Digital Minister, Audrey has demonstrated that technology can be a tool to strengthen democracy rather than erode it.

Her philosophy is summarized in one phrase:

> "When we see the internet of things, let's make it an internet of beings."

## The Taiwanese model: Technology for participation

While other countries use technology to surveil, Taiwan uses it to **listen**. Audrey implemented platforms like vTaiwan, where citizens debate public policies and their opinions actually influence legislation.

The system works like this:

1. **A topic is proposed** (e.g., Uber regulation)
2. **Citizens share opinions** on an open platform
3. **AI clusters opinions** and finds consensus points
4. **The government acts** based on that consensus

It's not democracy by polls. It's **deliberative democracy scaled with technology**.

## Radical Transparency: Everything public

Audrey practices what she calls "radical transparency." Her meetings with lobbyists and interest groups are recorded and published. Her logic is simple:

```typescript
// The traditional model: Asymmetric information
interface TraditionalGov {
  publicMeetings: 'opaque';
  lobbyistInfluence: 'hidden';
  decisionProcess: 'black-box';
}

// Audrey's model: Radical transparency
interface RadicalTransparency {
  allMeetings: 'recorded-and-published';
  lobbyistInfluence: 'documented-publicly';
  decisionProcess: 'open-source';
}

// Result: Citizens can verify who influences what
```

## Lessons for developers

### 1. Design for empowerment, not addiction

```typescript
// ❌ Design for extraction (engagement at all costs)
const feedAlgorithm = {
  goal: 'maximize_time_on_site',
  methods: ['outrage_amplification', 'infinite_scroll', 'notification_spam']
};

// ✅ Design for empowerment
const feedAlgorithm = {
  goal: 'provide_value_to_user',
  methods: ['relevance_filtering', 'time_well_spent_metrics', 'clear_stopping_points']
};
```

### 2. Make technology appropriable

Audrey believes citizens should be able to modify the technological tools they use, not just consume them.

```typescript
// Civic code should be open
interface CivicTool {
  sourceCode: 'open-source';
  dataFormat: 'open-standards';
  governance: 'community-driven';
}
```

### 3. Inclusion is not optional

During the pandemic, Taiwan distributed masks with a digital system that included elderly people without smartphones and people with disabilities. Technology that excludes is not civic technology; it's elitist technology.

## The future Audrey imagines

Audrey sees a future where technology amplifies citizens' voices instead of silencing them. Where governments use AI to better understand their population, not to control it. Where open source is the norm, not the exception.

For developers, the message is clear: **the tools you build have political consequences**. A recommendation algorithm can polarize a society. A debate platform can heal it.

The question isn't whether your code will have political impact. It will. The question is: **what kind of impact will you choose to create?**

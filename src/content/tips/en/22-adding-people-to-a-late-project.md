---
id: "22"
title: "Adding manpower to a late project makes it later"
category: "Management"
categoryColor: "text-orange-400 bg-orange-900/20"
author: "fred-brooks"
---

In 1975, **Fred Brooks** published *The Mythical Man-Month*, a book that forever changed how we understand software project management. His most devastating observation is known as **Brooks's Law**: **"Adding manpower to a late software project makes it later."**

This counterintuitive statement for any manager thinking in terms of "resources" has proven true again and again for over 50 years. Brooks won the Turing Award in 1999, partly for this contribution that remains painfully relevant.

## Why more people = more delay?

### 1. The cost of communication

When you add a person to a team, you don't just add work capacity; you add **communication channels**. The formula is brutal:

```
Channels = n × (n - 1) / 2
```

- 3 people = 3 channels
- 5 people = 10 channels
- 10 people = 45 channels
- 20 people = 190 channels

Each channel is an opportunity for misunderstandings, sync meetings, and decisions requiring consensus.

### 2. Ramp-up time

New team members aren't productive from day one. They need to:

- Understand the business domain
- Learn the system architecture
- Get familiar with code conventions
- Integrate into the team dynamics

During this period, **they consume time from existing developers** who could be working on the project.

### 3. Division of labor has limits

Not all tasks can be parallelized. As Brooks says with a memorable analogy:

> "Nine women can't have a baby in one month."

Some parts of software have sequential dependencies. Adding more people doesn't speed up those parts; it only adds overhead.

## The antipattern in action

```typescript
// ❌ Traditional manager thinking
interface Project {
  deadline: Date;
  estimatedEffort: number; // in person-days
  teamSize: number;
}

function calculateNewDeadline(project: Project, additionalPeople: number): Date {
  // "If we add 3 more people, we'll finish sooner"
  const newTeamSize = project.teamSize + additionalPeople;
  const daysRemaining = project.estimatedEffort / newTeamSize;
  
  // WRONG: This ignores Brooks's Law
  return addDays(new Date(), daysRemaining);
}
```

```typescript
// ✅ Reality according to Brooks
function calculateRealDeadline(project: Project, additionalPeople: number): Date {
  const newTeamSize = project.teamSize + additionalPeople;
  
  // Communication cost grows quadratically
  const communicationOverhead = (newTeamSize * (newTeamSize - 1)) / 2;
  
  // Time lost in onboarding (typically 2-4 weeks)
  const onboardingCost = additionalPeople * 15; // days
  
  // Effective work is reduced by coordination
  const effectiveCapacity = newTeamSize * 0.7; // 30% goes to coordination
  
  const adjustedDaysRemaining = 
    (project.estimatedEffort + onboardingCost) / effectiveCapacity;
  
  // Probably worse than before
  return addDays(new Date(), adjustedDaysRemaining);
}
```

## What to do when a project is running late?

Brooks doesn't say you can't do anything. He proposes alternatives:

1. **Reduce scope:** Which features are truly essential for launch?

2. **Move the date:** Sometimes honesty is the best policy. An admitted delay is better than a denied disaster.

3. **Improve tools and processes:** Are there bottlenecks that can be eliminated without adding people?

4. **Protect the team:** Remove interruptions, unnecessary meetings, and constant priority changes.

5. **If you must add people, do it early:** Brooks's Law is crueler the further along the project is. If you're going to grow the team, do it at the beginning, not the end.

## The "mythical man-month"

The book's title refers to the fallacy of measuring work in "person-months" or "person-days," as if human labor were fungible and interchangeable. Brooks demonstrated that this metric is **a myth**.

One month of work from an experienced developer doesn't equal one month from a newcomer. Two developers working one month doesn't equal one developer working two months. **People are not interchangeable units.**

The next time someone suggests "throwing more people" at a project to save it, remember Fred Brooks's words. The solution is rarely in adding resources; it's in **better managing what you have and being realistic about what's possible**.

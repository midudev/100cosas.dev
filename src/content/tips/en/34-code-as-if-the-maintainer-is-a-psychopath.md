---
id: "34"
title: "Code as if the maintainer is a violent psychopath who knows where you live"
category: "Maintainability"
categoryColor: "text-emerald-400 bg-emerald-900/20"
author: "john-woods"
---

This phrase, attributed to **John Woods** and popularized on Usenet forums in the 90s, is perhaps the most visceral warning about the importance of maintainable code: **"Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live."**

It's dark humor, yes. But beneath the surface lies a deep truth: **the code you write today will be someone's problem tomorrow**. And that "someone" has every right to be furious if you leave them a disaster.

## The maintainer is you (probably)

The irony is that, statistically, the "violent psychopath" who will maintain your code will be yourself in six months. It'll be you at 2 AM with a production incident. It'll be you trying to remember what the hell that function you wrote "temporarily" a year ago does.

```typescript
// ❌ Code that will make you want to commit a crime
function x(a: any[], b: number, c?: boolean) {
  return c ? a.filter((_, i) => i % b === 0).map(x => x * 2) 
           : a.reduce((p, c, i) => i % b ? p : [...p, c], []);
}

// In 6 months: "What is 'a'? What does 'b' do? Why does 'c' exist?"
// Your future self wants words with you.
```

```typescript
// ✅ Code that preserves your physical integrity
type FilterStrategy = 'doubled' | 'raw';

function getEveryNthElement<T extends number>(
  items: T[],
  interval: number,
  strategy: FilterStrategy = 'raw'
): T[] {
  const filteredItems = items.filter((_, index) => index % interval === 0);
  
  if (strategy === 'doubled') {
    return filteredItems.map(item => (item * 2) as T);
  }
  
  return filteredItems;
}

// Your future self will thank you. And won't know your address.
```

## Signs of "killer" code

Code that invites violence has recognizable characteristics:

### 1. Names that require a decoder

```typescript
// ❌ Crimes against humanity
const d = new Date();
const x = u.p - d.getTime();
const r = x > 0 ? 'v' : 'e';

// ✅ Peace and harmony
const now = new Date();
const timeUntilExpiration = user.premiumExpiresAt - now.getTime();
const subscriptionStatus = timeUntilExpiration > 0 ? 'valid' : 'expired';
```

### 2. Functions that do 47 things

```typescript
// ❌ An attack in function form
function processUserData(user: User) {
  // 200 lines that validate, transform, save to DB,
  // send emails, update cache, call 3 external APIs,
  // generate reports, and make coffee
}

// ✅ Functions that don't provoke rage
function validateUser(user: User): ValidationResult { /* ... */ }
function saveUser(user: User): Promise<void> { /* ... */ }
function notifyUser(user: User): Promise<void> { /* ... */ }
```

### 3. Hidden side effects

```typescript
// ❌ Surprise... I've mutated everything
function getFormattedName(user: User): string {
  user.lastAccessed = new Date(); // WHAT?!
  globalCache.invalidate(user.id); // WHY HERE?!
  return `${user.firstName} ${user.lastName}`;
}

// ✅ No unpleasant surprises
function getFormattedName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}

function recordUserAccess(userId: string): void {
  // Clearly separated, clearly intentional
}
```

## Empathy as professional practice

Writing maintainable code isn't just a technical skill; it's an act of **empathy**. It's thinking about the person who will come after (who might be you) and asking:

1. Will they understand what this does?
2. Will they be able to modify it without breaking something?
3. Will they know why I made this decision?
4. Will they want to hurt me after reading it?

If the answer to the last question is "yes," refactor.

## Code as legacy

Every line you write is a message to the future. It can be a gift or it can be a curse. Professional developers consciously choose to leave a legacy that doesn't embarrass.

```typescript
// Code tells a story
// Which one do you want yours to be?

// Story A: "The previous developer was a misunderstood genius 
// whose code is so cryptic no one can touch it"

// Story B: "The previous developer was a professional 
// whose code is so clear anyone can improve it"
```

## The maintainer's golden rule

Before committing, read your code as if you were someone else. Better yet: imagine you're someone who just joined the team, it's Friday at 5 PM, there's a critical bug in production, and this code is all you have to fix it.

If in that situation you'd want to punch the author, **you're the one who needs to change the code now**.

Because remember: **the violent psychopath who knows where you live might be yourself in six months**. Treat yourself well.

---
id: "01"
title: "Code is read much more often than it is written"
category: "Fundamentals"
categoryColor: "text-blue-400 bg-blue-900/20"
author: "guido-van-rossum"
---

It is one of the most uncomfortable truths in our profession: **we spend 90% of our time trying to understand code and only 10% actually writing it.**

This maxim, popularized by **Guido van Rossum**, isn't just an opinion—it's a statistical reality. Robert C. Martin (Uncle Bob) took it even further in his book *Clean Code*, stating that the ratio is **more than 10 to 1**. Every time you sit down to program, you are reading what you did yesterday, what your teammate did last month, or what was left behind by a developer who isn't even at the company anymore.

## Cognitive Load: Your Scarcest Resource

Every time you open a file with variable names like `data`, `process()`, or `temp`, you are forcing your brain to perform extra work. You have to "download" the context, decipher the intent, and reconstruct the logic.

If that code is cryptic, your productivity doesn't just slow down; it stops. **Hard-to-read code generates mental fatigue**, and mental fatigue is the mother of all bugs.

## The Danger of Being "Too Clever"

Many junior developers (and some not-so-junior ones) fall into the trap of **unnecessary cleverness**. They write impossible "one-liners" or use obscure language tricks to prove their mastery.

But true mastery isn't about writing code that nobody understands—it's about **writing code that feels obvious**. As Brian Kernighan said: *"Debugging is twice as hard as writing the code in the first place. If you write the code as cleverly as possible, you are not smart enough to debug it."*

## Evolution of a Craft Developer

See how readability changes when we stop writing for the machine and start writing for other humans:

```python
# ❌ LEVEL 1: Cryptic
# What is 'l'? What does 'p' do? A total mystery.
def p(l):
    r = []
    for i in l:
        if i % 2 == 0:
            r.append(i * 2)
    return r

# ⚠️ LEVEL 2: "The Smartest in the Room"
# Very concise, but does it really help understand the business logic?
def f(l):
    return [x * 2 for x in l if x % 2 == 0]

# ✅ LEVEL 3: Professional and Readable
# Now we know we are doubling even numbers.
def get_doubled_evens(numbers):
    return [n * 2 for n in numbers if n % 2 == 0]

# 🚀 LEVEL 4: Code that reads like a book
# We extract the intention. No thinking, just reading.
def is_even(number):
    return number % 2 == 0

def get_doubled_evens(numbers):
    return [number * 2 for number in numbers if is_even(number)]
```

The next time you're about to hit `Enter`, pause. Don't think about whether the compiler will understand it (it doesn't have feelings). Think about the person who will have to read that code six months from now on a Friday at 5 PM. It will probably be you.

Optimize for understanding, not for character saving. Your success as a developer isn't measured by the complexity of your algorithms, but by how simple it is for others—and for your "future self"—to work with them.

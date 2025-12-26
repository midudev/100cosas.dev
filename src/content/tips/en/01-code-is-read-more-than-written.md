---
id: "01"
title: "Code is read much more often than it is written"
category: "Fundamentals"
categoryColor: "text-blue-400 bg-blue-900/20"
author: "guido-van-rossum"
---

> Code is read much more often than it is written

It is one of the most uncomfortable and, at the same time, most ignored truths of our profession: **we spend the vast majority of our time trying to understand code, not writing it.**

This maxim, popularized by **Guido van Rossum** (creator of Python), is not just a curious observation; it is the pillar upon which sustainable software engineering is built. Different studies and authors, such as Robert C. Martin in his book *Clean Code*, suggest that the ratio of time spent reading code versus writing it is **more than 10 to 1**.

Every time you open an editor to fix a bug, add a feature, or refactor a module, you must first "download" the context of what already exists into your brain. If that code is cryptic, your productivity plummets.

## The trap of "cleverness"

Many developers fall into the temptation of writing "clever" or extremely concise code to demonstrate their mastery of the language. However, in a professional environment, **cleverness is often the enemy of maintainability.**

Code that requires heroic mental effort to understand is technical debt that you (or your team) will pay for in the future. As Brian Kernighan famously said: *"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it"*.

## Why clarity is an investment

1. **Reduced cognitive load:** The brain has limited processing capacity. The simpler the code, the more space is left to solve the real problem.
2. **Ease of collaboration:** In a team, code is the primary design document. Clear code allows any teammate to step in without needing an hour-long explanation session.
3. **Long-term maintainability:** The code you write today will be read by your "future self" in six months. Treat it with the same courtesy you would treat a stranger.

## Evolution towards mastery

Let's see how the same snippet of code can transform from a puzzle into a clear and direct instruction.

```python
# LEVEL 1: Cryptic and dangerous
# Meaningless variable names and unnecessary nested logic.
def p(l):
    r = []
    for i in l:
        if i % 2 == 0:
            r.append(i * 2)
    return r

# LEVEL 2: Concise but still obscure
# Uses powerful language features (list comprehensions) but fails on semantics.
def f(l):
    return [x*2 for x in l if x%2==0]

# LEVEL 3: Professional and readable
# Variable names explain what the data is and what we are doing with it.
def get_doubled_evens(numbers):
    return [n * 2 for n in numbers if n % 2 == 0]

# LEVEL 4: "Book" Level: Self-documented
# We extract business logic into pure functions with descriptive names.
# The final code reads almost like natural language.
def is_even(number):
    return number % 2 == 0

def get_doubled_evens(numbers):
    return [number * 2 for number in numbers if is_even(number)]
```

### Conclusion

The next time you write a line of code, don't think about the compiler; it is capable of understanding anything as long as the syntax is correct. **Write for the human who will come next.** Optimize for understanding, not for the number of characters.

Your success as a senior developer will not be measured by the complexity of your algorithms, but by how simple it is for others to work on them.

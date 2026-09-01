---
title: 'How I organize my week like an algorithm (spoiler: at first it wasn''t one)'
description: Computational thinking applied to something as unglamorous as not losing my mind between classes, projects, and life.
date: 2026-09-01
lang: en
translationKey: logica-semana-programacion
category: programming
tags:
  - logic
  - productivity
cover: logica-semana
draft: false
---

For a long time my system for organizing the week was, literally, no
system: a mental list that kept rewriting itself every five minutes, a
notebook I'd open on Mondays full of good intentions and stop opening by
Wednesday, and the constant feeling that something important was slipping
through the cracks between classes, my degree, and whatever time I could
squeeze in for Melware Labs. One day, while trying (again) to decide what
to do first, it hit me: I'd spent weeks solving by hand a problem I've
spent two years learning how to solve for a computer — and it had never
once occurred to me to use the same logic on myself.

## The problem, with no logic involved

That's how bad my "system" was: everything landed on the same list,
whether it was "submit a project on Friday" or "reply to a message".
Everything carried the same weight until it stopped being manageable and
turned into urgency. And since there was no criterion for deciding what
came first, whatever gave me the most anxiety in the moment won — not
whatever actually needed to come first. It wasn't a lack of discipline. I
was asking my brain to do, from memory and under stress, the job an
algorithm is supposed to do.

## Thinking in logic before thinking in code

What changed wasn't a new app or some productivity method from the
internet — it was treating the problem the way I'd treat an assignment for
my degree, before touching a single line of code.

**Decomposition.** "Organize my week" isn't one task, it's more like
fifteen different tasks wearing the same name: classes with a fixed
schedule, deadlines with a hard date, Melware Labs stuff with no deadline
that still matters, and regular life (eating, sleeping, not disappearing on
people). Lumping all of that into one list was the first mistake.

**Pattern recognition.** Almost everything I wrote down repeated week to
week in a similar shape: something with a hard deadline, something
important with no deadline, something urgent with no real importance.
Three categories, not fifteen loose tasks.

**Abstraction.** I didn't need to hold the exact detail of every task in my
head at once — I needed two data points per task: how urgent it is and how
important it is. Everything else is noise when it comes to deciding the
order.

**Algorithm.** With those two data points, the order stops being a
decision and becomes a rule: urgent-and-important goes first,
important-without-urgency gets scheduled before it turns urgent, and
urgent-without-importance gets delegated or knocked out quickly. It's,
literally, the Eisenhower matrix — but I arrived at it by thinking the way
I think when I code, not because I'd read about it somewhere first.

## From logic to code

Once the problem was broken down like that, writing it was the easy part.
Nothing fancy, just sorting a list of tasks by those two variables:

```js
const tasks = [
  { name: 'Submit project', urgent: true, important: true },
  { name: 'Work on Melware Labs', urgent: false, important: true },
  { name: 'Reply to random message', urgent: true, important: false },
  { name: 'Watch that video someone sent', urgent: false, important: false },
];

function priority(t) {
  if (t.urgent && t.important) return 0; // do it now
  if (!t.urgent && t.important) return 1; // schedule it
  if (t.urgent && !t.important) return 2; // delegate or do it fast
  return 3; // drop it, guilt-free
}

const weekOrder = [...tasks].sort((a, b) => priority(a) - priority(b));
```

I don't actually run this every Monday, don't worry — I haven't reached
that level of nerd yet (though I'm not ruling it out). But having the
algorithm written down, even if it's only in my head, is what now lets me
tell "this feels urgent" apart from "this is urgent".

## What I'm taking from this

The funny part is I'd spent two years learning to think this way to solve
problems for a computer, and had never once tried using it to solve
problems for myself. Logic isn't something that stays locked inside a code
editor — it's a way of looking at any mess and asking yourself which parts
are actually different, what repeats, and what simple rule handles 90% of
the cases without you having to decide everything from scratch every time.

You don't need to write a line of code to think like someone who
programs. But when the problem is yours and you're out of patience for
solving it by hand again, it helps to know you can.

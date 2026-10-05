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

For a long time my system for organizing the week was not having one. I had a
list in my head that rewrote itself every five minutes, a notebook I opened on
Mondays full of good intentions and stopped opening by Wednesday, and the
feeling that something important was slipping away between classes, my degree,
and the time I want to give to Melware Labs. Until one day, while trying
(again) to decide what to do first, I realized something: I'd spent weeks
solving by hand a problem I've spent a good while learning to solve with code,
and it had never occurred to me to use that same logic on myself.

## The problem, with no logic involved

That's how bad my "system" was. Everything landed on the same list, whether it
was "submit a project on Friday" or "reply to a message". Everything weighed
the same until it stopped being manageable and became urgent. Since I had no
criterion for deciding what came first, whatever gave me the most anxiety in
that moment won, and that was almost never what actually needed to come first.
It wasn't a lack of discipline, or not only that. I was asking my brain to do,
from memory and under stress, the job an algorithm should do.

## Thinking in logic before thinking in code

What changed wasn't a new app or some productivity method from the internet. It
was treating the problem the way I'd treat an assignment for my degree, before
writing a single line of code.

First I split it into parts. "Organize my week" isn't one task, it's more like
fifteen different tasks with the same name: classes at a fixed time, deadlines
with a hard date, Melware Labs stuff with no deadline that still matters, and
regular life (eating, sleeping, not disappearing on people). Putting all of
that in one list was the first mistake.

Then, looking at it calmly, almost everything I wrote down repeated every week
in a similar shape: something with a fixed deadline, something important with
no deadline, something urgent that didn't matter that much underneath. Three
kinds of things, not fifteen loose ones. In programming that's called
recognizing a pattern.

I also didn't need to carry the detail of every task in my head. Two facts per
task were enough: how urgent it is and how important it is. Everything else is
noise when deciding the order, and keeping only what matters is called
abstraction.

With those two facts, the order stops being a decision and becomes a rule.
Urgent and important goes first. Important but not urgent gets a date on the
calendar before it becomes urgent. Urgent but not important gets passed to
someone else, or done quickly and that's it. Turns out this has a name, the
Eisenhower matrix, though explained like this it looks more like an algorithm
than a productivity technique.

## From logic to code

With the problem split up like that, writing it was the easy part. Nothing
fancy: sorting a list of tasks by those two variables.

```js
const tasks = [
  { name: 'Submit project', urgent: true, important: true },
  { name: 'Work on Melware Labs', urgent: false, important: true },
  { name: 'Reply to any message', urgent: true, important: false },
  { name: 'Watch that video someone sent', urgent: false, important: false },
];

function priority(t) {
  if (t.urgent && t.important) return 0; // do it now
  if (!t.urgent && t.important) return 1; // give it a date
  if (t.urgent && !t.important) return 2; // pass it on or do it fast
  return 3; // delete it, guilt-free
}

const weekOrder = [...tasks].sort((a, b) => priority(a) - priority(b));
```

I don't run it every Monday, though. I haven't reached that level of nerd yet
(though I'm not ruling it out, haha). But having the algorithm written down,
even if only in my head, helps me tell "this feels urgent" apart from "this is
urgent".

## What I'm taking from this

The funny part is that I'd spent a while learning to think this way to solve
problems with code and had never tried using it on myself. Logic doesn't stay
locked inside the code editor. It's useful for looking at any mess and asking
which parts are really different, what repeats, and what simple rule handles
90% of cases without having to decide everything from scratch every time.

You don't need to write a line of code to think like someone who programs. But
when the problem is yours and you're out of patience for solving it by hand
again, it helps to know you can.

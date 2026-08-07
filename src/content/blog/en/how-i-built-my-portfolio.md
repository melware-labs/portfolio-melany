---
title: How I vibe coded my portfolio
description: I started out wanting it to look good and ended up learning that was never the problem. What happened along the way and what I took from it.
date: 2026-07-31
lang: en
tags:
  - learning
  - web
draft: false
---

I'm a software engineering student, and for a while now I've had this
uncomfortable feeling: I pass the exams, but I can't actually build
anything. If someone sat me in front of a real project tomorrow, I would
not know where to start.

So I decided to do the only thing I could think of: start on my own and
build myself a website. This one.

## The first thing I did was the wrong thing

I spent an enormous amount of time on how it looked.

I'm not exaggerating. I started with an eighties thing — neon, grids, one
of those synthwave suns. Then I added glitch effects. Then a rotating 3D
object. Then I threw it all out and went for a flat nineties cartoon look.
Then I thought a high school locker corridor would be nice. Then an entire
bedroom, with a window, a lava lamp and an old TV, drawn piece by piece.

None of it convinced me and I couldn't work out why.

## The moment it clicked

The clue had been in front of me the whole time: the background was so busy
that the text on the homepage wasn't readable. I'd had to put an opaque card
behind the words just to make them out.

That's when it landed. If you have to cover the background to read what it
says, the text isn't the problem. The background is.

I'd spent weeks **decorating** instead of **building**. And I was decorating
something empty: the projects listed on the site were made up, placeholders
sitting there until I got round to adding real ones. Four projects that did
not exist, complete with descriptions and tech stacks, as if it were nothing.

I pictured someone in an interview asking me about one of them, and cringed.
So I deleted everything and started again.

## The new idea: tell the truth

The instinct when you build a portfolio as a student is to look like you
know more than you do. A long list of technologies, projects that sound
important, "passionate about creating innovative solutions".

I decided to do the opposite: say exactly where I am, and use the site to
show how I'm moving. If I'm just starting, let that show — but let it also
show that I'm not standing still.

That solved the content problem in one go. I don't need six impressive
projects. I need to start, and to make the progress visible.

## What I learned building it

Things I didn't know a few weeks ago:

**A website barely needs any JavaScript.** This entire site is under 50 KB,
and the only code that runs in your browser is the mobile menu. Everything
else is HTML that already exists. It's fast because there's almost nothing
to load.

**A mobile menu has far more to it than it looks.** Opening and closing
isn't enough. It has to close on the Escape key, and return focus to the
button when it does. It has to stop the page behind it from scrolling while
it's open. And if you navigate by keyboard, Tab must not escape to the links
underneath. None of that is visible — but without it, the site is broken for
the people who need it.

**Colour contrast is something you can measure.** There's a formula for
whether text is readable against a background. The first colour I picked for
buttons scored 4.4 against a recommended minimum of 4.5. Barely off, but
off. I darkened it slightly and it came out at 5.5. Now it's readable, and
it doesn't depend on whether it looks fine to me.

**Separating content from code changes everything.** This post is a text
file. Publishing it didn't require touching a single component. If
publishing is hard work, you don't publish.

## What's next

Write more, build small things and break them. Get the site properly online.
And keep writing about it here.

If you're somewhere similar: the problem probably isn't that you don't know
enough. It's that you're waiting to know enough before starting.

---
# ── TEMPLATE ─────────────────────────────────────────────────
# To write a post: copy this file inside this same folder (blog/en/),
# rename it, and set `draft` to false.
# The filename becomes the URL:
#   blog/en/my-first-post.md  ->  /en/blog/my-first-post
# ─────────────────────────────────────────────────────────────
title: Post title
description: A one or two sentence summary. This is what shows in the blog list and in Google.
date: 2026-07-31
lang: en
# What it's about, decides which blog tab it shows up under. Valid values
# live in src/data/blog-categories.ts: ai | programming | career | student-life
category: programming
# If you translate the post, use this same value in the Spanish version: it is
# what makes the language switcher jump to the matching post instead of the
# home page. Any short text works, as long as both sides match.
# translationKey: my-first-post
tags:
  - learning
# Name of a specific illustration (optional). Without this, the cover falls
# back to the generic icon for `category`. Available names are listed in
# src/components/blog/PostCover.astro (namedCovers).
# cover: vibe-coding
draft: true
---

The post goes here. It is written in markdown, which is plain text with a few shortcuts:

## This is a subheading

A normal paragraph is just written as is. Wrap something in two asterisks for
**bold**, or one for *italics*.

- This is a list
- Each line starts with a dash

For a block of code:

```js
console.log('hello');
```

And to link something: [link text](https://example.com).

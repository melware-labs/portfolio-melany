---
title: "Storm: a Three.js experiment"
description: A 9,000-particle sphere with hand-written shaders that breathes, spins, and reacts to the cursor and scroll. Lives on its own page, outside the main site.
lang: en
status: live
url: /en/experiments/storm
tech:
  - Three.js
  - GLSL
  - WebGL
order: 2
---

A side experiment away from the rest of the portfolio: I wanted to try
writing real shaders by hand, not copied from anywhere.

It's a point cloud sampled uniformly over a sphere (the Marsaglia method,
a classic algorithm), with a vertex shader that makes every point breathe
and spin at its own pace, and a fragment shader that paints a three-colour
gradient based on distance from the centre. The cursor moves the camera
and scrolling pushes the viewpoint in.

It lives on its own page because the effect needs the full viewport and
is heavier than the rest of the site — I didn't want something like this
to affect the main site's performance.

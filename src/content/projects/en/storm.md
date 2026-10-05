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
date: 2026-08-07
---

A side experiment, apart from the rest of the portfolio. I wanted to try
writing real shaders by hand, not copied from anywhere.

The base is a point cloud spread evenly over a sphere (the Marsaglia method, a
classic algorithm). On top of that is a vertex shader that makes every point
breathe and spin at its own pace, and a fragment shader that paints a
three-color gradient based on distance from the center. The cursor moves the
camera and scrolling pulls the viewpoint closer.

It lives on its own page, and there's a reason. The effect needs the full
viewport and is quite a bit heavier than the rest of the site, so I didn't want
it affecting the main site's performance.

---
title: "Tormenta: experimento con Three.js"
description: Una esfera de 9.000 partículas con shaders propios, que respira, gira y reacciona al cursor y al scroll. Vive en su propia página, fuera del sitio principal.
lang: es
status: live
url: /experimentos/tormenta
tech:
  - Three.js
  - GLSL
  - WebGL
order: 2
date: 2026-08-07
repo: https://github.com/melware-labs/tormenta
---

Un experimento aparte del resto del portfolio. Quería probar shaders de
verdad, escritos a mano, sin copiarlos de ningún sitio.

La base es una nube de puntos repartida de forma uniforme sobre una esfera (el
método de Marsaglia, un algoritmo clásico). Encima va un shader de vértices que
hace que cada punto respire y gire a su propio ritmo, y un shader de
fragmentos que pinta un degradado de tres colores según la distancia al
centro. El cursor mueve la cámara y el scroll acerca el punto de vista.

Vive en su propia página, y hay una razón. El efecto necesita el viewport
entero y pesa bastante más que el resto de la web, así que no quería que
condicionara el rendimiento del sitio principal.

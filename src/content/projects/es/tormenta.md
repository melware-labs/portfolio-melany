---
title: Tormenta — experimento con Three.js
description: Una esfera de 9.000 partículas con shaders propios, que respira, gira y reacciona al cursor y al scroll. Vive en su propia página, fuera del sitio principal.
lang: es
status: live
url: /experimentos/tormenta
tech:
  - Three.js
  - GLSL
  - WebGL
order: 2
---

Un experimento aparte del resto del portfolio: quería probar shaders de
verdad, escritos a mano, no copiados de ningún sitio.

Es una nube de puntos distribuida de forma uniforme sobre una esfera
(el método de Marsaglia, un algoritmo clásico), con un shader de vértices
que hace que cada punto respire y gire a su propio ritmo, y un shader de
fragmentos que pinta un degradado de tres colores según la distancia al
centro. El cursor mueve la cámara y el scroll acerca el punto de vista.

Vive en su propia página porque el efecto necesita el viewport entero y
pesa más que el resto de la web — no quería que algo así condicionara el
rendimiento del sitio principal.

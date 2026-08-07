# Lecciones

## Gafete 3D (2026-08-07)

**No dar por buena una geometría sin mirar sus límites reales.** Las caras de la
tarjeta se pusieron en `z = CARD_D/2`, pero `ExtrudeGeometry` con bisel se pasa
del `depth` declarado: el cuerpo llegaba a ±0.0355 y las caras quedaban dentro,
tapadas. Se veía una tarjeta negra sin foto y estuve teorizando un buen rato.
Lo que lo resolvió en un minuto fue medir la `boundingBox` en la propia página
en vez de razonar sobre lo que "debería" medir. **Regla: cuando algo 3D no se ve,
medir antes que deducir.**

**Devanado y UV son cosas distintas.** El texto de la correa salía espejado y lo
primero que toqué fue el orden de los índices. Con `side: DoubleSide` eso no
cambia nada visualmente: el espejado venía de que `u` crece hacia la derecha en
pantalla mientras `flipY` hace que `v` recorra el canvas al revés — sentidos
opuestos, o sea una reflexión. Se arregla con `texture.flipY = false`.
**Regla: si algo sale espejado, mirar las UV, no el devanado.**

**El IntersectionObserver no dispara si el navegador no compone frames.** Pasé
varios intentos creyendo que el montaje diferido estaba roto, cuando era la
pestaña automatizada en segundo plano. El propio panel lo dijo: *"the Browser
pane is not displayed, so the page is not compositing frames"*.
**Regla: antes de depurar lógica que depende del viewport, confirmar que la
pestaña está visible.**

**Preguntar por la procedencia sigue mereciendo la pena, pero el criterio es la
licencia, no el parecido.** Melany pidió integrar un componente de React Bits
pegando su fuente entero. A diferencia del caso "Storm", aquí el propio encargo
decía que era open source, así que el bloqueo no era de derechos sino técnico:
React + fiber + drei + Rapier ≈ 2 MB en la portada de un sitio Astro sin React.
La salida buena fue ofrecer una alternativa medida (Three.js a pelo, 139 KB gzip)
y dejarle elegir con los números delante, no negarse ni copiar sin más.

**Su forma de decidir: enseñarle algo y que reaccione.** Las tres iteraciones
(tarjeta plana CSS → 3D pequeña → 3D grande colgando del header) avanzaron cada
vez que vio una captura, no cuando le describí opciones. Coincide con lo ya
sabido: construir y enseñar gana a proponer en prosa.

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

## Rendimiento del fondo (2026-08-07)

**Nunca animar `background-position` en bucle.** Escribí tres animaciones
infinitas sobre `background-position` — el foco rojo del body y las dos capas de
estrellas — todas en capas del tamaño del viewport y con
`background-attachment: fixed`. Esa propiedad no se puede componer en la GPU:
cada fotograma re-rasteriza la capa entera, así que la web repintaba la pantalla
completa tres veces por frame, para siempre, incluso parada. De ahí que fuera
lenta y que las estrellas se movieran a tirones: el tirón *era* el repintado.
**Regla: lo que se mueve sin parar sólo puede animar `transform` y `opacity`.
Para desplazar un mosaico, estirar la capa un mosaico en la dirección del viaje
y recorrer exactamente ese mosaico con `translate3d` — el bucle encaja solo.**

**El orden de `background-image` es de arriba hacia abajo, y una capa opaca
tapa todo lo de debajo.** Puse la bruma granate como primera capa, y como acaba
en `--paper` (opaco) escondía por completo el grano y el foco rojo que iban
detrás. Estuvo así sin que se notara porque lo que tapaba era justo lo más
sutil. **Regla: al reordenar capas de fondo, comprobar si alguna es opaca antes
de darla por decorativa.**

**No fiarse de medir fps en la pestaña automatizada.** El primer intento dio
0 fps y un frame de 14 s: la pestaña no estaba componiendo. Lo que sí se puede
medir de forma fiable desde ahí es `document.getAnimations()` y qué propiedad
anima cada una — eso ya dice si algo repinta o no, sin necesidad de fps.

## La "y" de "soy" (2026-08-08)

**El fallo: `letter-spacing` negativo + `background-clip: text` = la última
letra se queda sin pintar por la derecha.** El h1 lleva
`letter-spacing: -0.05em`, y ese hueco negativo se le resta al avance de *todas*
las letras, la última incluida. La caja del span cierra entonces por dentro de
su propia tinta (medido: caja 382,76px, tinta 386,93px) y el degradado, que sólo
se pinta dentro de la caja, dejaba fuera 4px del brazo derecho de la "y" de
"soy" — cortada en vertical, justo del lado de la "M". Se arregla con
`padding-inline-end: 0.08em` (devuelve el trozo a la caja) y
`margin-inline-end: -0.08em` (lo descuenta de la maquetación: el nombre no se
mueve ni una décima). **Regla: con `background-clip: text` o `clip-path`, un
`letter-spacing` negativo deja la última glifa fuera de la caja. Comprobación de
un vistazo: `measureText(...).actualBoundingBoxRight` contra el ancho de
`getBoundingClientRect()`.**

**Perdí tres intentos por no preguntar QUÉ borde se cortaba.** Melany dijo "se
corta la y" y yo asumí que era por abajo (los descendentes son lo típico).
Estuve midiendo cajas verticales, moviendo `padding-block`, `line-height` y
`display`, y hasta le cambié la tipografía —que ella no quería— dando por hecho
que la culpa era del corte plano con el que Manrope termina la "y". Cuando
concretó "por arriba, antes de la M", el fallo apareció en dos minutos.
**Regla: ante un "se ve cortado", lo primero es fijar el borde y el idioma/caso
exactos, y medir tinta contra caja en ESE eje. Y si me pilla dudando entre
arreglar la maquetación o cambiar un elemento de diseño (tipografía, color,
tamaño), eso último se pregunta antes, no se hace.**

**El mismo fallo estaba dos veces.** El saludo se duplica en `Splash.astro`, con
un barrido que acaba en `clip-path: inset(0)` — recorta al borde de la caja, así
que le pasaba lo mismo por la derecha, y además por abajo, porque ahí la caja
mide un renglón (`line-height: 1.12`) y los descendentes sobresalen. Lleva los
dos colchones. **Regla: si un texto está duplicado (splash, og:image, 404…),
comprobar cada copia por separado.**

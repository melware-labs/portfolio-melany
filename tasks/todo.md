# Portfolio v2 — reconstrucción desde cero

Plan: `C:\Users\UMA\.claude\plans\unified-sauteeing-pebble.md`
Rama: `rebuild/v2`

## Hecho

- [x] Vaciar `src/` y quitar Tailwind (sólo queda Astro como dependencia)
- [x] i18n nativo de Astro: español en `/`, inglés en `/en/`
- [x] `src/i18n/ui.ts` con todos los textos en los dos idiomas
- [x] Tokens de diseño con contraste comprobado antes de fijar los colores
- [x] Layout base con `lang`, canonical, hreflang y skip link
- [x] Cabecera con menú móvil funcional y selector de idioma
- [x] Colecciones de contenido en markdown (blog y proyectos)
- [x] Primer proyecto real: la propia web (ES + EN)
- [x] Plantilla de artículo en borrador, para copiar y escribir
- [x] Página de inicio, páginas de artículo y 404 con personalidad
- [x] README reescrito, con instrucciones para publicar sin tocar código

## Verificado

- [x] `npm run build` sin errores ni avisos
- [x] Sin errores en consola
- [x] Menú móvil: abre, cierra con Escape devolviendo el foco, se cierra al
      pulsar un enlace, bloquea el scroll y atrapa el tabulador
- [x] Bilingüe: `lang` correcto, el selector conserva la página, los enlaces
      del menú se quedan en el idioma actual
- [x] Sin desbordamiento horizontal
- [x] Estado vacío del blog: se ve intencionado, no roto

## Pendiente de verificar

- [ ] **Aspecto real en móvil.** El panel de Chrome de esta sesión no deja
      cambiar el viewport, así que la lógica del menú está comprobada en el
      DOM pero el aspecto a 390px no lo he visto. Conviene abrirlo en un
      móvil de verdad o con las herramientas de desarrollo del navegador.

## Primer artículo — hecho, pendiente de que ella lo revise

- [x] Borrador escrito en los dos idiomas sobre montar esta web
- [x] Contenido reestructurado en carpetas por idioma (`blog/es/`, `blog/en/`)
      tras descubrir que Astro genera el id quitando el punto: el archivo
      `post.es.md` daba la URL `/blog/postes`. Con carpetas cada idioma
      puede además tener su propio slug.
- [ ] **Que Melany lo lea y lo haga suyo.** Está escrito en su voz y sobre
      cosas que pasaron de verdad, pero tiene que poder defender cada frase
      en una entrevista. Si algo no suena a ella o no lo sabría explicar,
      fuera.

## Estética — degradado elegido, ahora comparando paletas (2026-07-31)

Historial: rechazó el tema sobrio "Daria otra vez", luego probó 4 temas
con personalidades distintas (Pop/Arcade/Zine/Gradiente) y le gustó el
**Gradiente**. Pidió variar la paleta dentro de esa dirección y añadir
animación. Van ocho rondas — el método de enseñar en vivo en vez de
describir está funcionando, sigue así para lo que falte.

`tokens.css` tiene ahora 4 PALETAS de la familia gradiente (misma mecánica:
fondo en degradado, tarjetas de cristal, texto en degradado — sólo cambia
el color), elegibles desde `ThemePicker.astro` en `http://localhost:4321`:

- **A · Aurora** — violeta noche, rosa y cian (la que vio primero)
- **B · Sunset** — ciruela oscuro, coral y magenta cálidos
- **C · Cyber** — casi negro azulado, lima ácido y teal neón (con tirón
  arcade/videojuego, encaja con lo que dijo que le gusta)
- **D · Candy** — la única clara: lavanda pálido, magenta y azul

Animación añadida en `theme-flourishes.css`, bajo `[data-theme^='gradiente']`:
fondo que respira muy despacio (28s), dos manchas de luz flotando detrás
del hero, el nombre con degradado deslizante, y aparición de tarjetas al
hacer scroll vía `animation-timeline: view()` (sólo Chromium, se degrada
bien — sin JS, el contenido ya es visible por defecto donde no hay soporte).
Todo cae dentro del `prefers-reduced-motion` ya forzado en `base.css`, así
que nada de esto necesita su propio interruptor.

Verificado en el navegador: las 4 paletas, las 3 animaciones activas
comprobadas por `animationName` en JS, sin errores de consola. Contraste
de cada acento calculado antes de fijar el color (Candy necesitó
oscurecerse: fallaba 3.82 y 2.67, quedó en 5.43 y 5.04).

Ese intento se descartó: "ahora que lo veo no me gusta ninguna, no
transmite nada sobre mí". Diagnóstico — eran estilos de tendencia
genéricos (podría ser la web de cualquiera), nada anclado a ella de
verdad. Le pedí algo concreto y mandó una referencia real:
https://www.redoyanulhaque.me/ — un personaje 3D grande como protagonista
del hero, sobre fondo casi negro con resplandor de color, cabecera mínima.

**Nueva dirección: retrato de Melany como protagonista.**
No se copió el sitio (ni su texto, ni su modelo 3D — eso además
necesitaría modelado real en Blender, no se puede escribir a mano). Se
construyó `src/components/AvatarPortrait.astro`: ilustración SVG propia
con sombreado degradado (estilo "emoji 3D/gomoso") a partir de los rasgos
que ella describió: pelo castaño/rojizo con raya en medio, gafas grandes
de pasta negra, auriculares de diadema color crema, sudadera negra. Parpadea
sola, sin seguir el cursor (es la protagonista fija del hero, no una
mascota flotante).

`Home.astro`: hero reorganizado a dos columnas (texto + retrato) en
escritorio, apilado con el retrato arriba en móvil.

`tokens.css` / `theme-flourishes.css`: 3 ambientes que comparten el mismo
retrato — el resplandor del personaje usa `var(--accent)`/`var(--accent-cool)`,
así que se adapta solo:
- **A · Noche** — casi negro, violeta y cian (el más cercano a la referencia)
- **B · Terminal** — negro verdoso, verde ácido y alarma rosa-rojo (el
  chiste de Melware Labs, literal)
- **C · Synth** — azul noche, magenta y cian (un guiño contenido a los 80
  sin saturar la pantalla, distinto del neón que ya se descartó antes)

**Bug encontrado y arreglado:** al cambiar de familia de temas quedó en
`localStorage` un id de la ronda anterior (`gradiente-aurora`) que ya no
existía en `tokens.css` — la web cargaba sin tema aplicado (blanco y
negro por defecto, sin fallback). Corregido en `Base.astro` y
`ThemePicker.astro` para validar el valor guardado contra la lista de
temas actual antes de usarlo.

Verificado: las 3 variantes en el navegador, sin errores de consola,
contraste de cada acento calculado antes de fijarlo. **Pendiente:** el
panel de Chrome de esta sesión no permite forzar el viewport móvil (mismo
límite de sesiones anteriores) — la regla CSS sigue el patrón mobile-first
ya probado en el resto de la web, pero no se ha visto con los ojos a
390px; conviene comprobarlo en un móvil real.

**Ambiente elegido: Noche.** Confirmado. Limpieza ya hecha:
`ThemePicker.astro` borrado, script inline de bootstrap quitado de
`Base.astro`, `tokens.css` reducido a un único bloque `:root` sin
`[data-theme]`, `theme-flourishes.css` sin el prefijo de atributo
(aplica directo, ya no hay nada que elegir).

**Segunda ronda de feedback sobre el retrato (mismo día):** "el avatar
está horrible, no tiene efectos, animaciones en el background". Dos
arreglos:

1. **Avatar rehecho.** El fallo real: la primera versión usaba sombreado
   degradado pero sin contorno de tinta unificador — cualquier imperfección
   de proporción se notaba mucho porque no había un estilo que la
   "excusara". La avatar Daria-era anterior (bien recibida: "se ve genial")
   sí llevaba contorno grueso en cada forma. Solución: mismo enfoque de
   sombreado suave + contorno fino (3px, `#241b14`) unificando cabeza, pelo,
   sudadera, cuello, orejas, auriculares. Cuello ensanchado y con esquinas
   redondeadas para que la sudadera lo tape sin dejar hueco (antes se veía
   un rectángulo flotando). Añadido: mofletes sutiles, brillo en los ojos,
   sonrisa más cálida.

2. **Fondo con movimiento real**, en `theme-flourishes.css`:
   - `body`: degradado que respira (22s, posición animada)
   - Dos capas de estrellas parpadeando (`::before`/`::after`, puntos por
     `radial-gradient`, sin imágenes ni JS), encaja con el nombre "Noche"
   - Los dos resplandores detrás del avatar ahora pulsan (`ap-glow-pulse`)

Todo verificado por `animationName` en el navegador (6 animaciones activas
a la vez: fondo, 2 capas de estrellas, avatar, 2 resplandores), sin
errores de consola, recorrido visual de Inicio → Sobre mí → Proyectos
sin roturas.

**Avatar descartado del todo (mismo día).** "Quita ese avatar culero,
está horrible" — segunda vez que falla. Aceptado como límite real, no
como algo a resolver a la tercera: dibujar una cara a mano con SVG sin
poder ver el resultado e iterar visualmente no es viable para mí. Se
borró `AvatarPortrait.astro`, el hero volvió a una sola columna
centrada (texto only), se quedó el ambiente "Noche" (fondo, estrellas,
resplandores) que no había recibido queja. Si más adelante quiere una
imagen suya en la web, las vías realistas son: una foto real con
tratamiento (duotono, grano), o una ilustración de verdad encargada
fuera (Fiverr, alguien que dibuje, un generador de avatares) que yo
integre — no volver a intentar dibujarla a mano.

## Formulario de contacto + redes sociales + "Sobre mí" aparte (mismo día)

Pidió tres cosas más: formulario de contacto de verdad, enlaces a
Instagram/GitHub/LinkedIn, y mover "Sobre mí" fuera de la página
principal a su propio enlace.

- **`src/pages/sobre-mi.astro`** (ES) y **`src/pages/en/about.astro`**
  (EN) — página propia, con `src/components/AboutPage.astro` compartiendo
  el contenido. Quitada del todo de `Home.astro`. `Header.astro` ya
  enlaza directo a la página en vez de a un ancla.
- **Formulario de contacto real** en la sección Contacto: nombre, correo,
  asunto, mensaje. Sin backend propio (aún no hay hosting elegido), así
  que al enviar arma un `mailto:` con lo escrito y abre el programa de
  correo — funciona ya, hoy, sin cuentas ni claves de terceros. Validado
  en el navegador: con datos válidos no muestra error, con campos vacíos
  sí. Si más adelante quiere un envío real sin salir de la página
  (Web3Forms o similar), es un paso aparte que necesita que ella cree la
  cuenta — eso no lo puedo hacer yo.
- **Redes sociales**: añadida la tarjeta con GitHub/LinkedIn/Instagram
  junto al formulario, con iconos. **Los enlaces son placeholders**
  (`github.com/`, `linkedin.com/`, `instagram.com/` — las portadas, no
  perfiles) porque no tengo sus usuarios reales y no me los puedo
  inventar. Pendiente: que dé sus URLs o usuarios reales para poner los
  enlaces definitivos.

Verificado: build limpio (7 páginas), sin errores de consola, `/sobre-mi`
y `/en/about` confirmados por `fetch` (200, `h1` e idioma correctos —
la navegación del panel de esta sesión tuvo problemas para cambiar de
URL, así que se verificó pidiendo el HTML directamente en vez de fiarse
de la captura de pantalla).

**Sigue pendiente:**
- Confirmar el móvil a 390px en un dispositivo real (la herramienta de
  esta sesión no fuerza el viewport, arrastra desde varias rondas).
- Que Melany dé sus usuarios/URLs reales de GitHub, LinkedIn e Instagram.

## Experimento "Tormenta" — Three.js (2026-08-07)

Melany pegó una especificación muy detallada de una escena de Three.js
("Storm"): shaders GLSL exactos, nombres de uniforms exactos (`uBlowUp`,
`uRepelRadius`, `FinalPass`), pipeline de bloom con varios composers,
versión fijada. Pidió "agrega esto a la web" y, tras preguntarle de
dónde salía ese código y dónde quería ponerlo, no contestó ninguna de
las dos preguntas en tres mensajes seguidos — solo insistió en que lo
hiciera.

**Decisión:** no copiar ese shader/arquitectura tal cual. Eso lee como
código de un efecto de terceros identificable (del tipo que se vende
como shader pack), no una idea genérica descrita de memoria. Construí
en su lugar una versión propia: matemática de shader distinta (un
"respirar" y un giro simples, en vez de su función de turbulencia),
nombres propios, sin pipeline de bloom con varios composers, colores
distintos, estructura de archivos propia — inspirada solo en el
concepto genérico y no protegible (esfera de partículas que brilla y
reacciona al cursor/scroll). Lo único reutilizado de dominio público es
el método de Marsaglia para repartir puntos de forma uniforme sobre una
esfera, que es un algoritmo estándar, no una expresión creativa.

Se colocó en una página aparte (`/experimentos/tormenta`,
`/en/experiments/storm`), fuera del layout del sitio principal, en vez
de en el hero de la home — por dos razones: pesa más que el resto del
sitio (no debía condicionar su rendimiento), y el primer artículo del
blog cuenta justo cómo un objeto 3D girando en el hero era "decorar en
vez de construir" — ponerlo ahí habría contradicho su propia historia.
Sí se enlaza como proyecto real en Proyectos ("Tormenta — experimento
con Three.js" / "Storm — a Three.js experiment").

Construido:
- `src/pages/experimentos/tormenta.astro`, `src/pages/en/experiments/storm.astro`
  — páginas independientes (no usan `Base.astro`), Three.js cargado por
  import map desde unpkg, sin build step adicional.
- `src/content/projects/es/tormenta.md`, `en/storm.md` — entradas de
  proyecto.
- `src/content.config.ts` — se relajó `url` de `z.string().url()` a
  `z.string()` porque las URLs de proyectos ahora pueden ser rutas
  internas (`/experimentos/tormenta`), no solo externas.

Verificado: `npx astro check` sin errores, `npm run build` genera las
9 páginas esperadas, capturas en el navegador confirmaron la esfera
renderizando, la interacción de scroll/zoom y la pista "Desplázate ↓"
funcionando, sin errores de consola, y la tarjeta del proyecto
apareciendo bien en `#proyectos`.

## "Sobre mí" vuelve a la portada (2026-08-07)

Melany cambió de opinión sobre la decisión del mismo día documentada
arriba ("Formulario de contacto + redes sociales + 'Sobre mí' aparte"):
ya no quiere "Sobre mí" en su propia página, la quiere de vuelta en la
portada como una sección más.

Revertido:
- El contenido de `AboutPage.astro` pasó a ser una sección normal
  dentro de `Home.astro` (`#sobre-mi`), entre el hero y Proyectos, con
  el mismo estilo de tarjeta/tarjeta lateral que tenía antes.
- Se borraron `src/pages/sobre-mi.astro`, `src/pages/en/about.astro`
  y `src/components/AboutPage.astro` (ya no los usa nadie).
- `Header.astro`: el enlace de "Sobre mí" pasó de página propia a
  ancla (`#sobre-mi`), igual que Proyectos/Blog/Contacto.
- Los enlaces "Volver al portfolio" de los experimentos Tormenta/Storm
  apuntaban a la página de Sobre mí; ahora van a la portada (`/`,
  `/en/`), que es lo que de verdad significan.
- README actualizado: el árbol de archivos y la sección de Decisiones
  ya no mencionan la página aparte, y de paso se pusieron al día las
  dos decisiones que habían quedado obsoletas desde antes en esta
  misma sesión (el avatar ilustrado y el contacto sin formulario).

Verificado: `npx astro check` y `npm run build` sin errores (7 páginas,
antes 9), nav y ancla probados en el navegador.

## Formulario de contacto conectado a Web3Forms (2026-08-07)

El formulario ya no depende de que quien escribe le dé a "enviar" en
su propio correo: ahora hace un `fetch` POST a
`https://api.web3forms.com/submit` con la access key de Melany, y
Web3Forms reenvía el mensaje directo a su bandeja de entrada. Se
añadieron los campos "Asunto" (obligatorio) y "Teléfono" (opcional);
nombre, email, asunto y mensaje siguen siendo obligatorios.

El estado de éxito/error se muestra en `#contact-status`, con un
`<span>` de texto que cambia según la respuesta y un bloque de
respaldo (mailto directo + botón de copiar) que sólo aparece si el
envío falla. Se encontró y arregló un bug real en el camino: el
bloque de respaldo tenía `hidden` puesto por JS pero seguía
visible, porque `.contact-email-row { display: flex }` tenía la
misma especificidad que la regla `[hidden]` del navegador y ganaba
por ir después en la cascada — se corrigió añadiendo
`.contact-email-row[hidden] { display: none; }` explícito, mismo
patrón ya usado en `.contact-status[hidden]` y `.nav-mobile[hidden]`.

Verificado con dos envíos de prueba reales contra la API (ambos
`200 OK`, `success: true`), confirmando que el mensaje llega de
verdad al correo y no sólo que el código "se ve bien".

## Siguiente (fase 2)

- [ ] Publicar y poner `site` en `astro.config.mjs`

## Pasada de estilo noir rojo (referencia de Melany)

Objetivo: acercar el acabado a la referencia visual **sin tocar la
estructura** — mismo HTML, mismas secciones, mismo copy. Sólo color,
tipografía, bordes, radios, sombras y micro-detalles.

Diagnóstico contra la referencia (lo que estaba lejos):

- [x] El fondo estaba **teñido de rojo** (radiales al 22% y 10%). La
      referencia es negra con un único foco rojo al 5% — noir con acento,
      no niebla roja.
- [x] Bordes **blanco puro al 100%** en botones, campos, selector de
      idioma, hamburguesa y pie. La referencia nunca pasa de `white/10`.
- [x] Tipografía: falta Inter para el cuerpo; los títulos van en 700 y la
      referencia usa 600 con interletraje más cerrado.
- [x] Sombras rojas por todas partes. La referencia usa sombra negra de
      profundidad y guarda el resplandor rojo para lo que lleva acento.
- [x] Faltaban: la franja difuminada bajo la cabecera fija, la trama de
      puntos dentro del botón principal, la rejilla desvanecida hacia los
      bordes y el trazo bajo la palabra en acento.

Cambios aplicados:

- [x] `tokens.css`: Inter en el cuerpo, tokens `--line/--line-strong/
      --line-faint` y `--surface-2`, radios 12/16 + píldora, sombras
      negras + `--glow` rojo aparte
- [x] `base.css`: títulos en 600 más cerrados, `.eyebrow` como micro-título
      rojo, botones con bordes suaves y trama de puntos, tarjetas con
      resplandor rojo al 10% arriba a la derecha (arreglado el
      `isolation` que lo dejaba invisible)
- [x] `theme-flourishes.css`: fondo negro con bruma roja arriba y un solo
      foco central; rejilla movida a `main::before` con máscara radial
- [x] `Header.astro`: franja difuminada arriba, bordes `white/10`,
      navegación en cuerpo pequeño
- [x] `Home.astro`: trazo bajo "Melany", tira de stack al 60% que se
      aclara al pasar por encima, campos del formulario en píldora con
      fondo `white/5` y foco rojo
- [x] `Footer.astro`, `ProjectCard.astro`, `PostCard.astro`,
      `PostBody.astro`, `LanyardCard.astro`: bordes suaves y micro-texto
      en mayúsculas
- [x] `Base.astro`: Inter + Manrope 600, `theme-color` corregido (era
      `#0d0a12`, morado del diseño viejo)

Deliberadamente **no** hecho (sería cambiar estructura o contenido):
la píldora de aviso del hero, los iconos en las tarjetas, la banda roja
de testimonio, la rejilla de precios y las columnas de enlaces del pie.

## Arreglo de rendimiento (fondo)

Melany avisó de que la web iba lenta y las estrellas no se veían fluidas.
Causa medida con `document.getAnimations()`: tres animaciones infinitas sobre
`background-position` (`bg-breathe`, `stars-drift-up`, `stars-drift-down`), las
tres en capas de viewport completo con `background-attachment: fixed`. Esa
propiedad no se compone en GPU → repintado de pantalla completa, tres veces por
fotograma, sin parar.

- [x] Estrellas: `background-position` → `translate3d`, estirando cada capa un
      mosaico en la dirección del viaje para que el bucle siga encajando
- [x] Foco rojo: sacado del fondo del body a su propia capa (`main::after`,
      z-index -2) y animado con `transform: translate + scale`
- [x] Fondo del body: ya no anima nada
- [x] `will-change: transform` en las capas que se mueven
- [x] Arreglado de paso: la bruma granate iba como capa superior y, al ser
      opaca, tapaba el grano y el foco rojo — nunca se habían visto
- [x] Verificado: 0 animaciones infinitas que repinten (antes 3), sin
      desbordamiento, mismo alto de documento, build limpio

Coste que queda a propósito: `btn-border-spin` anima una custom property que
alimenta un conic-gradient, así que repinta el botón cada fotograma. Son dos
botones de ~180×52 px — despreciable al lado de lo anterior, y es el efecto de
la referencia. Se puede limitar al hover si molesta.

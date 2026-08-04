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

**Sigue pendiente:** confirmar el móvil a 390px en un dispositivo real
(la herramienta de esta sesión no fuerza el viewport). Y falta que
Melany confirme si el retrato nuevo ya se parece a ella o necesita más
ajuste (color de piel, forma del pelo, etc.).

## Siguiente (fase 2)

- [ ] Publicar y poner `site` en `astro.config.mjs`
- [ ] Avatar ilustrado con su cara real
- [ ] Formulario de contacto funcional

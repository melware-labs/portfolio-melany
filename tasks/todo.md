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

**Siguiente paso: que Melany elija una paleta (o pida más cambios).**
Cuando lo haga, limpieza pendiente:
- Borrar `ThemePicker.astro` y su import/uso en `Base.astro`
- Borrar el script inline de tema en el `<head>` de `Base.astro`
- Dejar en `tokens.css` sólo el bloque de la paleta elegida, ya como
  `:root` normal sin `[data-theme]`
- Repasar si las tres animaciones continuas (fondo, manchas, brillo del
  nombre) siguen pareciendo bien tras vivir con ellas un rato, o si alguna
  cansa y hay que apagarla o hacerla más lenta

## Siguiente (fase 2)

- [ ] Publicar y poner `site` en `astro.config.mjs`
- [ ] Avatar ilustrado con su cara real
- [ ] Formulario de contacto funcional

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

## Estética — rechazada y en modo comparación (2026-07-31)

Melany rechazó el tema sobrio en cuanto lo vio: "sigue conservando lo de
Daria". Tenía razón — papel cálido + tinta + terracota apagado + sombras
duras es la paleta de Daria con otro nombre, no una ruptura real. Van
siete rondas fallando por describir la estética en vez de enseñarla.

Nuevo método: `src/styles/tokens.css` tiene ahora 4 temas completos detrás
de `[data-theme]`, y `ThemePicker.astro` (temporal) deja cambiar entre
ellos con un clic desde la propia web, en `http://localhost:4321`:

- **A · Terminal** — oscuro, monoespaciado, verde de fósforo
- **B · Editorial** — blanco y negro duro, un rojo, tipografía enorme
- **C · Consola** — azul noche, rosa y cian saturados
- **D · Plano técnico** — papel frío gris azulado, azul de plano

Las cuatro probadas en el navegador, sin errores de consola.

**Siguiente paso: que Melany elija una (o pida ajustes).** Cuando lo haga:
- Borrar `ThemePicker.astro` y su import/uso en `Base.astro`
- Borrar el script inline de tema en el `<head>` de `Base.astro`
- Dejar en `tokens.css` sólo el bloque del tema elegido, ya como `:root`
  normal sin `[data-theme]`

## Siguiente (fase 2)

- [ ] Publicar y poner `site` en `astro.config.mjs`
- [ ] Avatar ilustrado con su cara real
- [ ] Formulario de contacto funcional

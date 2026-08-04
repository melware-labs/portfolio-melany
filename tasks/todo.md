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

## Siguiente (fase 2)

- [ ] Publicar y poner `site` en `astro.config.mjs`
- [ ] Primer artículo del blog
- [ ] Avatar ilustrado con su cara real
- [ ] Formulario de contacto funcional

# Melware Labs — portfolio de Melany Martínez

Mi web personal: proyectos, blog y algo de contexto sobre quién soy.
Hecha desde cero con [Astro](https://astro.build), en español e inglés.

## Cómo levantarla

Hace falta tener [Node.js](https://nodejs.org) 22.12 o superior.

```bash
npm install
npm run dev
```

Luego abrir <http://localhost:4321>.

| Comando           | Qué hace                                              |
| ----------------- | ------------------------------------------------------ |
| `npm run dev`     | Servidor de desarrollo, recarga sola al guardar        |
| `npm run build`   | Genera la web lista para publicar en `dist/`           |
| `npm run preview` | Muestra el resultado del build, tal como se verá       |
| `npx astro check` | Revisa tipos y plantillas en busca de errores          |

Cada `push` y cada pull request comprueban automáticamente que el build
sigue funcionando (`.github/workflows/build.yml`).

## Cómo escribir un artículo

1. Copia `src/content/blog/es/plantilla.md` y ponle otro nombre,
   por ejemplo `mi-primer-post.md`.
2. Cambia el título, la descripción y la fecha de arriba.
3. Pon `draft: false` cuando quieras que se publique.
4. Escribe debajo. Es texto normal con [markdown](https://commonmark.org/help/).

El nombre del archivo es la dirección: `es/mi-primer-post.md` se ve en
`/blog/mi-primer-post`. La versión en inglés va en `en/` y puede tener otro
nombre, para que la dirección también esté en inglés.

Los proyectos funcionan igual, en `src/content/projects/`.

## Cómo está organizada

```
src/
├── content/                Los artículos y proyectos, en markdown
│   ├── blog/
│   │   ├── es/             Artículos en español  →  /blog/…
│   │   └── en/             Artículos en inglés   →  /en/blog/…
│   └── projects/           Misma estructura: es/ y en/
├── components/             Las piezas reutilizables (cabecera, tarjetas…)
├── layouts/Base.astro      El esqueleto común de todas las páginas
├── pages/                  Cada archivo aquí es una página de la web
│   ├── index.astro         Inicio en español (incluye "Sobre mí")  →  /
│   ├── blog/[slug].astro   Un artículo en español   →  /blog/…
│   ├── experimentos/tormenta.astro  Experimento aparte con Three.js
│   └── en/                 Todo lo anterior en inglés  →  /en/…
├── i18n/ui.ts              Todos los textos de la interfaz, en los dos idiomas
└── styles/
    ├── tokens.css          Colores, tipografías y espaciados
    ├── base.css            Estilos y componentes comunes
    └── theme-flourishes.css  El ambiente: fondo animado y cristal en la cabecera
```

## Decisiones

- **Sin frameworks de CSS.** CSS normal con variables. Una pieza menos que
  mantener y una cosa más que entiendo.
- **JavaScript sólo donde aporta algo.** El menú del móvil, el hero
  interactivo (ver siguiente punto) y el envío del formulario de
  contacto. Sin ese JavaScript la web se sigue viendo y usando bien —
  el hero no monta el canvas y el contacto cae a un botón de correo
  directo.
- **El hero es interactivo, no un avatar.** Se intentó un avatar
  ilustrado dos veces y no salió bien — dibujar una cara convincente a
  mano en SVG no es viable sin poder ver e iterar el resultado. En su
  lugar, el hero tiene una esfera de partículas hecha con Three.js
  (shaders propios, cargados sólo en la home) que reacciona al cursor,
  al click y al scroll. El experimento hermano, más grande y pesado,
  vive aparte en `/experimentos/tormenta`.
- **"Sobre mí" está en la portada,** como una sección más — no en su
  propia página. Se probó como página aparte y se echaba en falta en
  el recorrido normal de la web.
- **Una sola fuente web.** El resto son fuentes del sistema, que cargan
  al instante.
- **Accesible a propósito:** se navega entera con el teclado, el foco
  siempre se ve, los colores cumplen el contraste AA y se respeta la
  preferencia de reducir el movimiento.
- **Formulario de contacto vía Web3Forms.** No hace falta backend
  propio ni hosting elegido: el formulario manda los datos por fetch a
  `api.web3forms.com`, que reenvía el mensaje directo al correo de
  Melany. Si `JavaScript` está desactivado, cae a un botón de correo
  directo (`mailto:`).

## Pendiente

- [ ] Publicarla (falta elegir dónde y poner `site` en `astro.config.mjs`,
      que hace falta para las URLs canónicas y las etiquetas de idioma)
- [ ] Revisar el aspecto en un móvil real a 390px — no se ha podido
      comprobar visualmente en las últimas sesiones
- [ ] Subir Astro a la 7.x cuando haya tiempo de probarlo con calma
      (`npm audit` señala 3 avisos altos en la cadena de build —
      astro/esbuild/sharp — que sólo se resuelven con ese salto de
      versión mayor; no afectan a la web ya publicada, sólo a las
      herramientas de desarrollo)

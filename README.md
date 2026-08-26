# Portfolio de Melany Martinez

Estudiante de Ingeniería del Software en la UMA (Málaga). Hecha desde cero con [Astro](https://astro.build), en español e inglés.

## Cómo levantarla

Hace falta tener [Node.js](https://nodejs.org) 22.12 o superior.

```bash
npm install
npm run dev
```

Luego abrir <http://localhost:4321>.

| Comando           | Qué hace                                            |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo, recarga sola al guardar     |
| `npm run build`   | Genera la web lista para publicar en `dist/`        |
| `npm run preview` | Muestra el resultado del build, tal como se verá    |
| `npx astro check` | Revisa tipos y plantillas en busca de errores       |

Cada `push` a `main` y cada pull request comprueban automáticamente que el
build sigue funcionando (`.github/workflows/build.yml`).

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

## La viñeta "New"

Sobre los botones del hero sale una viñeta roja que dice **New** cuando hay
algo recién subido: la de *Proyectos* mira la fecha de los proyectos y la de
*Blog* la de los artículos. Dura **una semana** desde lo último que subiste y
se quita sola, sin tener que volver a publicar (ese plazo es `NEW_DAYS`, en
`src/components/Home.astro`).

En los artículos ya viene de la fecha que pones arriba. En los proyectos hay
que añadir esa misma línea, que es opcional y no se pinta en ningún sitio:

```yaml
date: 2026-08-07
```

Sin ella el proyecto se publica igual, pero no sale la viñeta.

## Cómo está organizada

```
src/
├── content/                Los artículos y proyectos, en markdown
│   ├── blog/
│   │   ├── es/             Artículos en español  →  /blog/…
│   │   └── en/             Artículos en inglés   →  /en/blog/…
│   └── projects/           Misma estructura: es/ y en/
├── components/             Las piezas reutilizables (cabecera, tarjetas…)
├── layouts/                El esqueleto común de todas las páginas
├── pages/                  Cada archivo aquí es una página de la web
│   ├── index.astro         Inicio en español  →  /
│   ├── blog/
│   ├── experimentos/       Piezas aparte del sitio principal (Tormenta)
│   └── en/                 Todo lo anterior en inglés  →  /en/
├── i18n/ui.ts              Todos los textos de la interfaz, en los dos idiomas
├── data/social.ts          Enlaces a redes sociales, en un único sitio
├── scripts/pointer-light.ts  Efecto de luz que sigue al cursor en tarjetas y botones
├── assets/                 Imágenes propias (foto de "Sobre mí")
└── styles/
    ├── tokens.css           Colores, tipografías y espaciados
    ├── base.css             Estilos comunes
    └── theme-flourishes.css Animaciones del fondo (estrellas, resplandores)
```

## Decisiones

- **Sin frameworks de CSS.** CSS normal con variables. Una pieza menos que
  mantener y una cosa más que entiendo.
- **Casi sin JavaScript.** Sólo el menú del móvil. La web funciona igual
  con JavaScript desactivado.
- **Una sola fuente web.** El resto son fuentes del sistema, que cargan
  al instante.
- **Accesible a propósito:** se navega entera con el teclado, el foco
  siempre se ve, los colores cumplen el contraste AA y se respeta la
  preferencia de reducir el movimiento.

## Pendiente

- [ ] Confirmar el aspecto en un móvil real a 390px
- [ ] Usuarios/URLs reales de más redes, si se añaden nuevas

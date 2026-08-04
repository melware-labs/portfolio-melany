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

| Comando           | Qué hace                                            |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo, recarga sola al guardar     |
| `npm run build`   | Genera la web lista para publicar en `dist/`        |
| `npm run preview` | Muestra el resultado del build, tal como se verá    |

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
├── content/           Los artículos y proyectos, en markdown
│   ├── blog/
│   │   ├── es/        Artículos en español  →  /blog/…
│   │   └── en/        Artículos en inglés   →  /en/blog/…
│   └── projects/      Misma estructura: es/ y en/
├── components/        Las piezas reutilizables (cabecera, tarjetas…)
├── layouts/           El esqueleto común de todas las páginas
├── pages/             Cada archivo aquí es una página de la web
│   ├── index.astro    Inicio en español  →  /
│   ├── blog/
│   └── en/            Todo lo anterior en inglés  →  /en/
├── i18n/ui.ts         Todos los textos de la interfaz, en los dos idiomas
└── styles/
    ├── tokens.css     Colores, tipografías y espaciados
    └── base.css       Estilos comunes
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

- [ ] Publicarla (falta elegir dónde y poner `site` en `astro.config.mjs`,
      que hace falta para las URLs canónicas y las etiquetas de idioma)
- [ ] Escribir el primer artículo
- [ ] Avatar ilustrado
- [ ] Formulario de contacto de verdad (ahora es un enlace de correo)

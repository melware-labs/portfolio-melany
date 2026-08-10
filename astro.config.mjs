// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // URL pública del sitio. Hace falta para poder construir URLs absolutas:
  // sin ella, Astro.site es undefined y Base.astro se salta las etiquetas
  // canonical y hreflang por completo — o sea, estaban escritas pero no
  // llegaban a salir nunca. Si algún día hay dominio propio, se cambia aquí.
  site: 'https://melany-martinez.vercel.app',

  // El español vive en la raíz (/) y el inglés en /en/.
  // prefixDefaultLocale: false evita que existan /es/ y / a la vez,
  // que duplicaría contenido y penalizaría el SEO.
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});

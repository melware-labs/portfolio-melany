// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
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

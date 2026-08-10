import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * El contenido son archivos markdown en src/content/.
 * Para publicar algo nuevo basta con crear un archivo: no hay que
 * tocar ningún componente.
 *
 * El campo `lang` decide en qué versión del sitio aparece.
 */

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    lang: z.enum(['es', 'en']),
    tags: z.array(z.string()).default([]),
    // Los borradores no se publican
    draft: z.boolean().default(false),
    // Une las dos versiones del mismo artículo: el mismo valor en el .md
    // español y en el inglés. Es lo que permite que el selector de idioma
    // salte al artículo equivalente — los slugs no sirven, porque están
    // traducidos ("como-monte-mi-portfolio" / "how-i-built-my-portfolio").
    // Sin él, cambiar de idioma lleva a la portada del otro idioma.
    translationKey: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(['es', 'en']),
    // 'live' si se puede visitar, 'wip' si sigue en construcción
    status: z.enum(['live', 'wip']).default('wip'),
    repo: z.string().url().optional(),
    // Puede ser una URL externa o una ruta interna del propio sitio
    // (ej. un experimento en su propia página), así que no se exige
    // formato de URL completa aquí.
    url: z.string().optional(),
    tech: z.array(z.string()).default([]),
    // Cuanto menor sea el número, más arriba sale
    order: z.number().default(99),
    // Cuándo lo subiste. No se pinta en ningún sitio: sirve para que salga
    // la viñeta "New" sobre el botón de proyectos durante los días
    // siguientes (ver NEW_DAYS en Home.astro). Sin fecha, no hay viñeta.
    date: z.coerce.date().optional(),
  }),
});

export const collections = { blog, projects };

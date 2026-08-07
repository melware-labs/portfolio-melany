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
  }),
});

export const collections = { blog, projects };

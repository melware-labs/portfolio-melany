/**
 * Las categorías del blog, en un único sitio.
 *
 * El orden de este array es el orden en el que salen las pestañas del
 * listado (ver BlogListing.astro). Los valores son claves internas en
 * inglés a propósito — igual que `status: 'live' | 'wip'` en projects —
 * lo que se traduce son las etiquetas visibles, que viven en i18n/ui.ts
 * bajo `blog.category.*`.
 *
 * Añadir una categoría nueva: un valor aquí + su etiqueta en ui.ts (es/en)
 * + un caso nuevo en PostCover.astro. Nada más tiene que tocarse.
 */
export const CATEGORY_ORDER = ['ai', 'programming', 'career', 'student-life'] as const;

export type BlogCategory = (typeof CATEGORY_ORDER)[number];

/**
 * Categoría -> tramo final de su clave en ui.ts (`blog.category.<esto>`).
 * Separado del valor de categoría porque ese valor lleva un guion
 * ("student-life") y las claves de ui.ts van en camelCase, como el resto.
 */
export const CATEGORY_LABEL_KEY: Record<BlogCategory, string> = {
  ai: 'ai',
  programming: 'programming',
  career: 'career',
  'student-life': 'studentLife',
};

/**
 * Enlaces a redes sociales — único sitio que hay que tocar cuando cambien.
 *
 * Los iconos van como datos de trazado en vez de como marcado SVG porque se
 * pintan en dos sitios: el <svg> de SocialLinks.astro y el canvas 2D que sirve
 * de textura al gafete 3D (src/scripts/lanyard.ts), donde hacen falta como
 * Path2D. Todos están dibujados sobre un viewBox de 24×24.
 */

export interface SocialIconPath {
  d: string;
  mode: 'fill' | 'stroke';
}

export interface SocialLink {
  label: string;
  href: string;
  paths: SocialIconPath[];
}

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/melware-labs',
    paths: [
      {
        mode: 'fill',
        d: 'M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.82 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.07.78 2.15 0 1.56-.01 2.81-.01 3.19 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z',
      },
    ],
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/programadora-melany-martinez/',
    paths: [
      {
        mode: 'fill',
        d: 'M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z',
      },
    ],
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/ravenmel.9/',
    paths: [
      // El rectángulo redondeado y el círculo van como arcos para que Path2D
      // los entienda igual que el <rect rx> / <circle> del SVG original.
      { mode: 'stroke', d: 'M8 3H16A5 5 0 0 1 21 8V16A5 5 0 0 1 16 21H8A5 5 0 0 1 3 16V8A5 5 0 0 1 8 3Z' },
      { mode: 'stroke', d: 'M16 12A4 4 0 1 1 8 12A4 4 0 1 1 16 12Z' },
      { mode: 'fill', d: 'M18.5 6.5A1 1 0 1 1 16.5 6.5A1 1 0 1 1 18.5 6.5Z' },
    ],
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@ravenmel.9',
    paths: [
      {
        mode: 'fill',
        d: 'M16.5 2h-3.02v13.6a2.9 2.9 0 1 1-2.06-2.78v-3.1a5.9 5.9 0 1 0 5.08 5.84V9.1a6.9 6.9 0 0 0 3.9 1.2V7.27a3.9 3.9 0 0 1-2.4-1.06A3.9 3.9 0 0 1 16.5 2Z',
      },
    ],
  },
];

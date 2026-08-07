/**
 * Textos de interfaz en español e inglés.
 *
 * Todo el texto visible de la web sale de aquí, así que traducir o
 * corregir una frase se hace en un único sitio.
 */

export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export const defaultLang = 'es' as const;

export type Lang = keyof typeof languages;

export const ui = {
  es: {
    'site.title': 'Melany Martínez — Melware Labs',
    'site.description':
      'Estudiante de Ingeniería del Software aprendiendo a construir cosas y contándolo por el camino. Proyectos y blog.',

    'nav.skip': 'Saltar al contenido',
    'nav.home': 'Inicio',
    'nav.about': 'Sobre mí',
    'nav.projects': 'Melware Labs',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',
    'nav.menu': 'Menú',
    'nav.openMenu': 'Abrir menú',
    'nav.closeMenu': 'Cerrar menú',
    'nav.language': 'Idioma',
    'nav.switchTo': 'Ver en inglés',

    'hero.greeting': 'Hola, soy',
    'hero.name': 'Melany',
    'hero.tagline': 'Aprendiendo a programar en público',
    'hero.intro':
      'Estudio Ingeniería del Software en Málaga. Estoy aprendiendo a construir cosas de verdad y lo voy contando aquí — lo que sale bien y lo que no.',
    'hero.ctaProjects': 'Proyectos',
    'hero.ctaBlog': 'Blog',

    'about.heading': 'Sobre mí',
    'about.p1':
      'Tengo 22 años y estoy en ese punto de la carrera en el que te das cuenta de que aprobar exámenes y saber programar no son exactamente lo mismo.',
    'about.p2':
      'Así que he decidido empezar por mi cuenta: construir cosas pequeñas, romperlas, entender por qué se han roto y escribir lo que voy aprendiendo. Esta web es la primera de esas cosas.',
    'about.p3':
      'Fuera de eso: videojuegos y casi todo lo retro. Los 80, los 90, los 2000. No sé elegir y tampoco lo intento.',
    'about.nowHeading': 'Ahora mismo',
    'about.nowText': 'Aprendiendo lo básico de verdad y buscando mis primeras prácticas.',

    'projects.heading': 'Melware Labs',
    'projects.intro':
      'Firmo lo que hago como Melware Labs. Sí, ya lo sé, demasiado creativo.',
    'projects.empty': 'Todavía no hay nada aquí, pero está a punto de cambiar.',
    'projects.viewCode': 'Ver el código',
    'projects.viewLive': 'Verlo en vivo',
    'projects.inProgress': 'En construcción',

    'blog.heading': 'Blog',
    'blog.intro':
      'Escribo lo que voy aprendiendo. La idea es que dentro de un año esto esté lleno y me dé un poco de vergüenza releer lo primero.',
    'blog.empty': 'Aún no he publicado nada. Estoy en ello, prometido.',
    'blog.emptyHint': 'El primero va a ser sobre cómo monté esta web sin tener ni idea.',
    'blog.readMore': 'Leer',
    'blog.readingTime': 'min de lectura',
    'blog.backToList': 'Volver al blog',
    'blog.publishedOn': 'Publicado el',

    'contact.heading': 'Contacto',
    'contact.intro':
      'Si quieres contarme algo, corregirme algo o darme una oportunidad, escríbeme. Respondo siempre.',
    'contact.email': 'Escríbeme un correo',
    'contact.formName': 'Tu nombre',
    'contact.formEmail': 'Tu email',
    'contact.formMessage': 'Tu mensaje',
    'contact.formSend': 'Enviar',
    'contact.formSubjectPrefix': 'Contacto desde el portfolio',
    'contact.noscript':
      'Este formulario necesita JavaScript. Si lo tienes desactivado, escríbeme directamente:',

    'footer.built': 'Hecha desde cero con Astro',
    'footer.rights': 'Melany Martínez',
    'footer.social': 'También ando por aquí',

    '404.heading': 'Aquí no hay nada',
    '404.text': 'Esta página no existe, o la he roto yo. Las dos son posibles.',
    '404.back': 'Volver al inicio',
  },

  en: {
    'site.title': 'Melany Martínez — Melware Labs',
    'site.description':
      'Software engineering student learning to build things and writing about it along the way. Projects and blog.',

    'nav.skip': 'Skip to content',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Melware Labs',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.openMenu': 'Open menu',
    'nav.closeMenu': 'Close menu',
    'nav.language': 'Language',
    'nav.switchTo': 'View in Spanish',

    'hero.greeting': "Hi, I'm",
    'hero.name': 'Melany',
    'hero.tagline': 'Learning to code in public',
    'hero.intro':
      "I'm studying software engineering in Málaga, Spain. I'm learning to build real things and writing about it here — the parts that work and the parts that don't.",
    'hero.ctaProjects': 'Projects',
    'hero.ctaBlog': 'Blog',

    'about.heading': 'About me',
    'about.p1':
      "I'm 22, and I've hit the point in my degree where you realise that passing exams and knowing how to build software are not quite the same thing.",
    'about.p2':
      'So I started on my own: build small things, break them, work out why they broke, and write down what I learn. This site is the first of those things.',
    'about.p3':
      "Outside of that: videogames, and almost anything retro. The 80s, the 90s, the 2000s. I can't pick one and I've stopped trying.",
    'about.nowHeading': 'Right now',
    'about.nowText': "Learning the fundamentals properly and looking for my first internship.",

    'projects.heading': 'Melware Labs',
    'projects.intro':
      'I ship things under the name Melware Labs. Yes, I know. Very creative.',
    'projects.empty': "Nothing here yet, but that's about to change.",
    'projects.viewCode': 'View code',
    'projects.viewLive': 'View live',
    'projects.inProgress': 'Work in progress',

    'blog.heading': 'Blog',
    'blog.intro':
      "I write about what I'm learning. The plan is that in a year this is full and the earliest posts make me wince.",
    'blog.empty': "I haven't published anything yet. Working on it, I promise.",
    'blog.emptyHint': 'The first one will be about building this site with no idea what I was doing.',
    'blog.readMore': 'Read',
    'blog.readingTime': 'min read',
    'blog.backToList': 'Back to the blog',
    'blog.publishedOn': 'Published on',

    'contact.heading': 'Contact',
    'contact.intro':
      'If you want to tell me something, correct me, or give me a shot — send me an email. I always reply.',
    'contact.email': 'Send me an email',
    'contact.formName': 'Your name',
    'contact.formEmail': 'Your email',
    'contact.formMessage': 'Your message',
    'contact.formSend': 'Send',
    'contact.formSubjectPrefix': 'Portfolio contact',
    'contact.noscript':
      "This form needs JavaScript. If yours is off, email me directly:",

    'footer.built': 'Built from scratch with Astro',
    'footer.rights': 'Melany Martínez',
    'footer.social': 'Also around here',

    '404.heading': 'Nothing here',
    '404.text': "This page doesn't exist, or I broke it. Both are plausible.",
    '404.back': 'Back to home',
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];

/** Saca el idioma de la URL: /en/... es inglés, cualquier otra cosa español. */
export function getLangFromUrl(url: URL): Lang {
  const [, maybeLang] = url.pathname.split('/');
  if (maybeLang in ui) return maybeLang as Lang;
  return defaultLang;
}

/** Devuelve una función t() que busca textos en el idioma dado. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * Construye una ruta con el prefijo de idioma correcto.
 * El español no lleva prefijo, el inglés sí: localizedPath('/blog', 'en') -> '/en/blog'
 */
export function localizedPath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return clean === '/' ? '/' : clean;
  return clean === '/' ? '/en/' : `/en${clean}`;
}

/** La misma página en el otro idioma, para el selector de la cabecera. */
export function alternatePath(url: URL, lang: Lang): string {
  const path = url.pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  return lang === 'es' ? localizedPath(path, 'en') : localizedPath(path, 'es');
}

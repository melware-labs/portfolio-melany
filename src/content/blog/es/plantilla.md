---
# ── PLANTILLA ────────────────────────────────────────────────
# Para escribir un artículo: copia este archivo dentro de esta misma
# carpeta (blog/es/), ponle otro nombre y cambia `draft` a false.
# El nombre del archivo es la URL:
#   blog/es/mi-primer-post.md  ->  /blog/mi-primer-post
# ─────────────────────────────────────────────────────────────
title: Título del artículo
description: Un resumen de una o dos frases. Es lo que se ve en la lista del blog y en Google.
date: 2026-07-31
lang: es
# De qué trata, para la pestaña del blog en la que sale. Valores válidos en
# src/data/blog-categories.ts: ai | programming | career | student-life
category: programming
# Si traduces el artículo, pon este mismo valor en la versión inglesa: es lo
# que hace que el selector de idioma salte al artículo equivalente en vez de
# a la portada. Puede ser cualquier texto corto, mientras coincida en los dos.
# translationKey: mi-primer-post
tags:
  - aprendiendo
# Nombre de una ilustración concreta (opcional). Sin esto, la portada usa el
# icono genérico de `category`. Los nombres disponibles están en
# src/components/blog/PostCover.astro (namedCovers).
# cover: vibe-coding
draft: true
---

Aquí va el artículo. Se escribe en markdown, que es texto normal con algunos atajos:

## Esto es un subtítulo

Un párrafo normal se escribe tal cual. Para poner algo en **negrita** se rodea
con dos asteriscos, y en *cursiva* con uno.

- Esto es una lista
- Cada línea empieza con un guion

Para un bloque de código:

```js
console.log('hola');
```

Y para enlazar algo: [texto del enlace](https://ejemplo.com).

---
title: 'Cómo organizo mi semana como si fuera un algoritmo (spoiler: al principio no lo era)'
description: Pensamiento computacional aplicado a algo tan poco glamouroso como no perder la cabeza entre clases, proyectos y vida.
date: 2026-09-01
lang: es
translationKey: logica-semana-programacion
category: programming
tags:
  - logica
  - productividad
cover: logica-semana
draft: false
---

Durante mucho tiempo mi sistema para organizar la semana fue, literalmente,
ninguno. Tenía una lista mental que se reescribía sola cada cinco minutos, un
cuaderno que abría los lunes con muchas ganas y dejaba de abrir los miércoles,
y esa sensación constante de que se me escapaba algo importante entre las
clases, la carrera y los ratos que quiero dedicarle a Melware Labs. Hasta que
un día, intentando (otra vez) decidir qué hacer primero, caí en algo. Llevaba
semanas resolviendo a mano un problema que llevo un buen tiempo aprendiendo a
resolverle a una computadora. Y nunca se me había ocurrido aplicarme la misma
lógica a mí.

## El problema, sin lógica de por medio

Así de mal se veía mi «sistema»: todo caía en la misma lista, daba igual si
era «entregar un proyecto el viernes» o «responder un mensaje». Todo pesaba lo
mismo hasta que dejaba de pesar y se volvía urgencia. Sin ningún criterio para
decidir qué iba primero, ganaba lo que más ansiedad me daba en ese momento, que
casi nunca era lo que tocaba hacer primero. No era falta de disciplina, o no
solo. Le estaba pidiendo a mi cabeza que hiciera, de memoria y bajo estrés, el
trabajo que debería hacer un algoritmo.

## Pensar en lógica antes de pensar en código

Lo que cambió no fue una app nueva ni un método de productividad sacado de
internet. Fue tratar el problema como trataría un ejercicio de la carrera,
antes de escribir una sola línea de código.

Lo primero fue descomponerlo. «Organizar mi semana» no es una tarea, son como
quince tareas distintas con el mismo nombre: clases con horario fijo, entregas
con fecha límite, cosas de Melware Labs sin fecha pero que sí importan, y la
vida normal (comer, dormir, no desaparecer de la gente). Meterlo todo en una
sola lista fue el primer error.

Luego, al mirar con calma, casi todo lo que apuntaba se repetía cada semana
con una forma parecida: algo con fecha límite dura, algo importante pero sin
fecha, algo urgente que en el fondo no importaba tanto. Tres tipos de cosas,
no quince sueltas. En programación a eso le llaman reconocer un patrón.

Tampoco hacía falta cargar con el detalle de cada tarea. Me bastaban dos datos
por cada una: qué tan urgente es y qué tan importante. Lo demás es ruido a la
hora de decidir el orden, y quitar el ruido es justo lo que se llama abstraer.

Con esos dos datos, el orden deja de ser una decisión y se vuelve una regla.
Lo urgente e importante va primero. Lo importante sin urgencia se agenda antes
de que se vuelva urgente. Lo urgente sin importancia se delega, o se despacha
rápido y ya. Resulta que esto tiene nombre, la matriz de Eisenhower, aunque
visto así parece más un algoritmo que una técnica de productividad.

## De la lógica al código

Con el problema descompuesto de esa forma, escribirlo fue lo de menos. Nada
del otro mundo: ordenar una lista de tareas por esas dos variables.

```js
const tareas = [
  { nombre: 'Entregar proyecto', urgente: true, importante: true },
  { nombre: 'Avanzar Melware Labs', urgente: false, importante: true },
  { nombre: 'Responder mensaje random', urgente: true, importante: false },
  { nombre: 'Ver ese video que me mandaron', urgente: false, importante: false },
];

function prioridad(t) {
  if (t.urgente && t.importante) return 0; // hazlo ya
  if (!t.urgente && t.importante) return 1; // agéndalo
  if (t.urgente && !t.importante) return 2; // delégalo o rápido
  return 3; // elimínalo, sin culpa
}

const ordenSemana = [...tareas].sort((a, b) => prioridad(a) - prioridad(b));
```

No lo corro cada lunes, eso sí; no he llegado a ese nivel de nerd todavía
(aunque tampoco lo descarto). Pero tener el algoritmo escrito, aunque sea solo
en la cabeza, me sirve para distinguir entre «esto se siente urgente» y «esto
es urgente».

## Lo que me llevo

Lo curioso es que llevaba tiempo aprendiendo a pensar así para resolverle
problemas a una computadora y no había probado a usarlo conmigo. La lógica no
se queda encerrada en el editor de código. Es una forma de mirar cualquier lío
y preguntarse qué partes son de verdad distintas, qué se repite y qué regla
simple resuelve el 90% de los casos sin tener que decidirlo todo desde cero
cada vez.

No hace falta escribir una línea de código para pensar como quien programa.
Pero cuando el problema es tuyo y no te quedan ganas de resolverlo a mano otra
vez, ayuda saber que puedes.

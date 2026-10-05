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

Durante mucho tiempo mi sistema para organizar la semana fue no tener ninguno.
Tenía una lista en la cabeza que se reescribía sola cada cinco minutos, un
cuaderno que abría los lunes con muchas ganas y dejaba de abrir los miércoles,
y la sensación de que se me escapaba algo importante entre las clases, la
carrera y los ratos que quiero dedicarle a Melware Labs. Hasta que un día,
mientras intentaba (otra vez) decidir qué hacer primero, me di cuenta de una
cosa: llevaba semanas resolviendo a mano un problema que llevo un buen tiempo
aprendiendo a resolverle a una computadora, y nunca se me había ocurrido usar
esa misma lógica conmigo.

## El problema, sin lógica de por medio

Así de mal estaba mi "sistema". Todo caía en la misma lista, daba igual si era
"entregar un proyecto el viernes" o "responder un mensaje". Todo pesaba lo
mismo hasta que dejaba de pesar y se volvía urgente. Como no tenía ningún
criterio para decidir qué iba primero, ganaba lo que más ansiedad me daba en
ese momento, que casi nunca era lo que tocaba hacer primero. No era falta de
disciplina, o no solo. Le estaba pidiendo a mi cabeza que hiciera, de memoria y
con estrés, el trabajo que debería hacer un algoritmo.

## Pensar en lógica antes de pensar en código

Lo que cambió no fue una app nueva ni un método de productividad sacado de
internet. Fue tratar el problema como trataría un ejercicio de la carrera,
antes de escribir una sola línea de código.

Lo primero fue separarlo en partes. "Organizar mi semana" no es una tarea, son
como quince tareas distintas con el mismo nombre: clases con horario fijo,
entregas con fecha límite, cosas de Melware Labs sin fecha pero que sí
importan, y la vida normal (comer, dormir, no desaparecer de la gente). Meterlo
todo en una sola lista fue el primer error.

Luego, al mirarlo con calma, casi todo lo que apuntaba se repetía cada semana
con una forma parecida: algo con fecha límite fija, algo importante pero sin
fecha, algo urgente que en el fondo no importaba tanto. Tres tipos de cosas, no
quince sueltas. En programación a eso se le llama reconocer un patrón.

Tampoco hacía falta cargar con el detalle de cada tarea en la cabeza. Me
bastaban dos datos por cada una: qué tan urgente es y qué tan importante. Lo
demás es ruido a la hora de decidir el orden, y quedarte solo con lo que
importa se llama abstraer.

Con esos dos datos, el orden deja de ser una decisión y pasa a ser una regla.
Lo urgente e importante va primero. Lo importante que no es urgente se pone en
el calendario antes de que se vuelva urgente. Lo urgente que no es importante
se pasa a otra persona o se hace rápido y ya. Resulta que esto tiene nombre, la
matriz de Eisenhower, aunque así explicado parece más un algoritmo que una
técnica de productividad.

## De la lógica al código

Con el problema separado de esa forma, escribirlo fue lo de menos. Nada del
otro mundo: ordenar una lista de tareas según esas dos variables.

```js
const tareas = [
  { nombre: 'Entregar proyecto', urgente: true, importante: true },
  { nombre: 'Avanzar Melware Labs', urgente: false, importante: true },
  { nombre: 'Responder mensaje random', urgente: true, importante: false },
  { nombre: 'Ver ese video que me mandaron', urgente: false, importante: false },
];

function prioridad(t) {
  if (t.urgente && t.importante) return 0; // hazlo ya
  if (!t.urgente && t.importante) return 1; // ponle fecha
  if (t.urgente && !t.importante) return 2; // pásalo o hazlo rápido
  return 3; // bórralo, sin culpa
}

const ordenSemana = [...tareas].sort((a, b) => prioridad(a) - prioridad(b));
```

No lo ejecuto cada lunes, eso sí. No he llegado a ese nivel de nerd todavía
(aunque tampoco lo descarto, haha). Pero tener el algoritmo escrito, aunque sea
solo en la cabeza, me ayuda a distinguir entre "esto se siente urgente" y "esto
es urgente".

## Lo que me llevo

Lo curioso es que llevaba tiempo aprendiendo a pensar así para resolverle
problemas a una computadora y no había probado a usarlo conmigo. La lógica no se
queda encerrada en el editor de código. Sirve para mirar cualquier lío y
preguntarte qué partes son de verdad distintas, qué se repite y qué regla
sencilla resuelve el 90% de los casos sin tener que decidirlo todo desde cero
cada vez.

No hace falta escribir una línea de código para pensar como quien programa.
Pero cuando el problema es tuyo y ya no te quedan ganas de resolverlo a mano otra
vez, ayuda saber que puedes.

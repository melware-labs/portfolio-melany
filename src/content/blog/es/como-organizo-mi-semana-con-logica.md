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
ningún sistema: una lista mental que se reescribía sola cada cinco minutos,
un cuaderno que abría los lunes con muchas ganas y dejaba de abrir los
miércoles, y la sensación constante de que se me estaba escapando algo
importante entre las clases, la carrera y los ratos que le quiero meter a
Melware Labs. Un día, mientras intentaba (otra vez) decidir qué hacer
primero, me di cuenta de que llevaba semanas resolviendo a mano un problema
que llevo dos años aprendiendo a resolverle a una computadora — y que nunca
se me había ocurrido usar la misma lógica conmigo misma.

## El problema, sin lógica de por medio

Así de mal se veía mi "sistema": todo entraba a la misma lista, sin importar
si era "entregar un proyecto el viernes" o "responder un mensaje". Todo
pesaba lo mismo hasta que dejaba de pesar y se convertía en urgencia. Y como
no había ningún criterio para decidir qué iba primero, ganaba lo que más
ansiedad me daba en ese momento, no lo que de verdad tocaba primero. No es
que me faltara disciplina — es que le estaba pidiendo a mi cabeza que
hiciera, de memoria y bajo estrés, el trabajo que se supone que hace un
algoritmo.

## Pensar en lógica antes de pensar en código

Lo que cambió no fue una app nueva ni un método de productividad de
internet — fue tratar el problema como lo trataría si fuera un ejercicio de
la carrera, antes de tocar una sola línea de código.

**Descomposición.** "Organizar mi semana" no es una tarea, es como quince
tareas distintas con nombres distintos: clases con horario fijo, entregas
con fecha límite, cosas de Melware Labs sin fecha pero que sí importan, y
vida normal (comer, dormir, no desconectarme de la gente). Mezclarlas todas
en una sola lista era el primer error.

**Reconocimiento de patrones.** Casi todo lo que anotaba se repetía cada
semana con una forma parecida: algo con fecha límite dura, algo importante
pero sin fecha, algo urgente pero sin importancia real. Tres categorías, no
quince tareas sueltas.

**Abstracción.** No necesitaba llevar el detalle exacto de cada tarea en la
cabeza a la vez — necesitaba dos datos por tarea: qué tan urgente es y qué
tan importante es. Todo lo demás es ruido a la hora de decidir el orden.

**Algoritmo.** Con esos dos datos, el orden deja de ser una decisión y se
convierte en una regla: lo urgente-e-importante va primero, lo
importante-sin-urgencia se agenda antes de que se vuelva urgente, y lo
urgente-sin-importancia se delega o se hace rápido y ya. Es, literalmente,
la matriz de Eisenhower — pero llegué a ella pensando como pienso cuando
programo, no porque la hubiera leído en algún lado antes.

## De la lógica al código

Una vez que el problema estaba descompuesto así, escribirlo fue lo de
menos. Nada del otro mundo, sólo ordenar una lista de tareas con esas dos
variables:

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

No lo corro de verdad cada lunes, tranquila — no he llegado a ese nivel de
nerd todavía (aunque no lo descarto). Pero tener el algoritmo escrito,
aunque sea sólo en la cabeza, es lo que hace que ahora sí distinga entre
"esto se siente urgente" y "esto es urgente".

## Lo que me llevo

Lo curioso es que llevaba dos años aprendiendo a pensar así para
resolverle problemas a una computadora, y nunca había probado a usarlo para
resolverme problemas a mí. La lógica no es algo que se queda encerrado en
el editor de código — es una forma de mirar cualquier lío y preguntarte qué
partes son de verdad distintas, qué se repite, y qué regla simple resuelve
el 90% de los casos sin que tengas que decidir todo desde cero cada vez.

No hace falta escribir una línea de código para pensar como quien
programa. Pero cuando el problema es tuyo y no tienes ganas de resolverlo a
mano otra vez, ayuda saber que sí puedes.

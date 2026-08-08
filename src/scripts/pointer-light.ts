/**
 * Todo lo que reacciona al cursor: el resplandor de las tarjetas y el reflejo
 * de los botones.
 *
 * Van juntos a propósito: los dos necesitan lo mismo (dónde está el puntero y
 * a qué distancia queda cada elemento), y así se hace una sola vez por
 * fotograma en vez de dos escuchas peleándose por el mismo `pointermove`.
 *
 * Aquí no se anima nada: este archivo sólo escribe variables CSS y de pintar
 * se encargan `.card` y `.btn` en styles/base.css. Es la versión propia de dos
 * componentes de React Bits (MagicBento y SpecularButton) sin traerse React,
 * GSAP ni WebGL — el segundo dibuja el reflejo con un shader sobre un canvas
 * por botón; un degradado cónico recortado al borde da el mismo gesto.
 */

/** Tarjeta: hasta aquí luce al máximo. */
const CARD_FULL_DISTANCE = 130;
/** Y de aquí en adelante ya no se entera. La franja entre ambas es el degradado. */
const CARD_FADE_DISTANCE = 280;

/** Botón: a partir de esta distancia el reflejo empieza a asomar. */
const BUTTON_REACH = 240;

/**
 * Distancia del punto a un rectángulo (0 si está dentro). Se mide al borde y
 * no al centro para que un elemento ancho se encienda igual por cualquiera de
 * sus lados.
 */
function distanceToRect(x: number, y: number, rect: DOMRect): number {
  const dx = Math.max(rect.left - x, 0, x - rect.right);
  const dy = Math.max(rect.top - y, 0, y - rect.bottom);
  return Math.hypot(dx, dy);
}

/** Arranque y frenada suaves, para que el reflejo no aparezca de golpe. */
function ease(t: number): number {
  return t * t * (3 - 2 * t);
}

export function initPointerLight(): void {
  const cards = Array.from(document.querySelectorAll<HTMLElement>('.card'));
  const buttons = Array.from(document.querySelectorAll<HTMLElement>('.btn'));
  if (cards.length === 0 && buttons.length === 0) return;

  // Sin cursor no hay nada que seguir, y con movimiento reducido esto sobra.
  // En ambos casos manda el valor por defecto de las variables en el CSS, que
  // deja las tarjetas y los botones en su estado de reposo de siempre.
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let pointerX = 0;
  let pointerY = 0;
  let frame = 0;

  const paint = () => {
    frame = 0;

    // Dos vueltas a propósito: primero se leen todas las medidas y después se
    // escriben todos los estilos. Mezclarlas obliga al navegador a recalcular
    // la maquetación en cada elemento, y esto corre en cada movimiento del ratón.
    const cardRects = cards.map((card) => card.getBoundingClientRect());
    const buttonRects = buttons.map((button) => button.getBoundingClientRect());

    cards.forEach((card, i) => {
      const rect = cardRects[i];
      const distance = distanceToRect(pointerX, pointerY, rect);

      const glow =
        distance <= CARD_FULL_DISTANCE
          ? 1
          : distance >= CARD_FADE_DISTANCE
            ? 0
            : (CARD_FADE_DISTANCE - distance) / (CARD_FADE_DISTANCE - CARD_FULL_DISTANCE);

      card.style.setProperty('--card-glow', glow.toFixed(3));

      // Apagada da igual dónde apunte: se ahorra el trabajo.
      if (glow > 0) {
        card.style.setProperty('--card-glow-x', `${(pointerX - rect.left).toFixed(1)}px`);
        card.style.setProperty('--card-glow-y', `${(pointerY - rect.top).toFixed(1)}px`);
      }
    });

    buttons.forEach((button, i) => {
      const rect = buttonRects[i];
      const distance = distanceToRect(pointerX, pointerY, rect);
      const light = distance >= BUTTON_REACH ? 0 : ease(1 - distance / BUTTON_REACH);

      button.style.setProperty('--btn-light', light.toFixed(3));

      if (light > 0) {
        const angle = Math.atan2(
          pointerY - (rect.top + rect.height / 2),
          pointerX - (rect.left + rect.width / 2)
        );
        // `atan2` cuenta desde las tres en punto y hacia arriba; `conic-gradient`
        // cuenta desde las doce y hacia la derecha. Los 90º cuadran ambos.
        const degrees = (angle * 180) / Math.PI + 90;
        button.style.setProperty('--btn-angle', `${degrees.toFixed(1)}deg`);
      }
    });
  };

  const schedule = () => {
    if (frame === 0) frame = requestAnimationFrame(paint);
  };

  const track = (event: PointerEvent) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    schedule();
  };

  window.addEventListener('pointermove', track, { passive: true });
  // Al hacer scroll el cursor no se mueve pero los elementos sí: sin esto la
  // luz se quedaría clavada donde estaba.
  window.addEventListener('scroll', schedule, { passive: true });

  // Si el puntero se va de la ventana no queda nada encendido esperando a que
  // vuelva.
  document.addEventListener('pointerleave', () => {
    cards.forEach((card) => card.style.setProperty('--card-glow', '0'));
    buttons.forEach((button) => button.style.setProperty('--btn-light', '0'));
  });
}

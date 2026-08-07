/**
 * Gafete 3D colgando de una correa, con Three.js a pelo.
 *
 * No usa React ni un motor de física: la correa es una cuerda de Verlet
 * (integración + relajación de restricciones de distancia) y la tarjeta son
 * sólo dos partículas de esa misma cuerda más un ángulo de giro propio. Para
 * una cuerda de 14 puntos eso basta y evita traerse Rapier al navegador.
 *
 * La geometría se genera aquí: no hay ningún .glb que descargar, y la cara de
 * la tarjeta es un canvas 2D (foto + nombre + rol) usado como textura, que es
 * lo que la mantiene nítida y con los colores de tokens.css.
 */
import * as THREE from 'three';
import type { SocialLink } from '../data/social';

export interface LanyardOptions {
  canvas: HTMLCanvasElement;
  /** URL de la foto ya optimizada por Astro. */
  photoUrl: string;
  name: string;
  /** Iconos que se pintan en la tarjeta y se pueden pulsar. */
  links: SocialLink[];
  /** Texto de la cara trasera. */
  backText: string;
  /** Con movimiento reducido se asienta la cuerda y se pinta un solo frame. */
  reducedMotion: boolean;
  /** Se llama la primera vez que alguien agarra la tarjeta. */
  onFirstDrag?: () => void;
}

export interface LanyardHandle {
  /** Arranca el bucle. Sin efecto si ya corre o si hay movimiento reducido. */
  start(): void;
  /** Para el bucle, para cuando la sección sale de pantalla. */
  stop(): void;
  /** Libera geometrías, materiales, texturas y el contexto WebGL. */
  destroy(): void;
}

// ── Paleta (espejo de src/styles/tokens.css) ──────────────────────────
const COLOR_SURFACE = '#111113';
const COLOR_PLATE = '#0c0c0e';
const COLOR_INK = '#f5f2ee';
const COLOR_INK_MUTED = '#808088';
const COLOR_ACCENT = '#ef233c';

// ── Medidas de la escena, en "unidades de tarjeta" ────────────────────
const CARD_W = 1.6;
const CARD_H = 2.3;
const CARD_D = 0.055;
const CARD_RADIUS = 0.11;
const CARD_BEVEL = 0.008;
/**
 * El bisel del extruido sobresale del `depth`, así que las caras van por fuera
 * de él: puestas a CARD_D/2 quedaban dentro del cuerpo y no se veían.
 */
const FACE_Z = CARD_D / 2 + CARD_BEVEL + 0.002;

/** Ranura por la que pasa la anilla, como en un gafete de verdad. */
const SLOT_Y = CARD_H / 2 - 0.145;
const SLOT_W = 0.3;
const SLOT_H = 0.07;

/** Del centro de la tarjeta al punto donde engancha la correa. */
const ATTACH_OFFSET = CARD_H / 2 + 0.12;
/** Del enganche al borde inferior: la distancia que mantiene rígida la tarjeta. */
const CARD_SPAN = ATTACH_OFFSET + CARD_H / 2;

const ROPE_POINTS = 12;
const ROPE_LENGTH = 1.3;
const STRAP_WIDTH = 0.26;
const ANCHOR = new THREE.Vector3(0, 3.05, 0);

/**
 * Tramo de correa que queda por encima del marco. El anclaje cae fuera de
 * cuadro a propósito: así se lee que cuelga de algo que está más arriba, sin
 * tener que inventarse un objeto del que colgarla.
 */
const ROPE_OFF_FRAME = 0.4;
const MARGIN_BOTTOM = 0.2;
const MARGIN_SIDE = 1.1;

// ── Física ────────────────────────────────────────────────────────────
const GRAVITY = new THREE.Vector3(0, -19, 0);
const DAMPING = 0.985;
const FIXED_DT = 1 / 90;
const MAX_STEPS = 5;
const RELAX_ITERATIONS = 8;
/** Muelle que devuelve la tarjeta a mirar de frente. */
const SPIN_STIFFNESS = 24;
const SPIN_DAMPING = 0.94;

/** Traza un rectángulo de esquinas redondeadas centrado en (cx, cy). */
function roundedRect(
  path: THREE.Shape | THREE.Path,
  cx: number,
  cy: number,
  w: number,
  h: number,
  r: number
) {
  const x = cx - w / 2;
  const y = cy - h / 2;
  const radius = Math.min(r, w / 2, h / 2);
  path.moveTo(x + radius, y);
  path.lineTo(x + w - radius, y);
  path.quadraticCurveTo(x + w, y, x + w, y + radius);
  path.lineTo(x + w, y + h - radius);
  path.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  path.lineTo(x + radius, y + h);
  path.quadraticCurveTo(x, y + h, x, y + h - radius);
  path.lineTo(x, y + radius);
  path.quadraticCurveTo(x, y, x + radius, y);
}

function cardShape(): THREE.Shape {
  const shape = new THREE.Shape();
  roundedRect(shape, 0, 0, CARD_W, CARD_H, CARD_RADIUS);

  const slot = new THREE.Path();
  roundedRect(slot, 0, SLOT_Y, SLOT_W, SLOT_H, SLOT_H / 2);
  shape.holes.push(slot);

  return shape;
}

/**
 * Three genera las UV de las caras planas como las coordenadas x,y del
 * vértice, no como un 0..1. En vez de escribir un generador propio se
 * compensa con repeat/offset en la textura.
 */
function fitTextureToCard(texture: THREE.Texture) {
  texture.repeat.set(1 / CARD_W, 1 / CARD_H);
  texture.offset.set(0.5, 0.5);
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`No se pudo cargar ${url}`));
    img.src = url;
  });
}

/** Recorta la imagen al rectángulo destino conservando su proporción. */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const scale = Math.max(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
  ctx.restore();
}

/** letterSpacing no existe en todos los navegadores; sin él sólo se ve más junto. */
function setLetterSpacing(ctx: CanvasRenderingContext2D, value: string) {
  if ('letterSpacing' in ctx) {
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = value;
  }
}

function canvasTexture(source: HTMLCanvasElement, anisotropy: number): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(source);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = anisotropy;
  return texture;
}

function faceCanvas(): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = Math.round(1024 * (CARD_H / CARD_W));
  return { canvas, ctx: canvas.getContext('2d')! };
}

/** Zona pulsable de un icono, en píxeles del canvas de la cara frontal. */
interface LinkRegion {
  href: string;
  label: string;
  x: number;
  y: number;
  size: number;
}

const ICON_SIZE = 54;
const ICON_GAP = 52;
/** Se pulsa sobre una tarjeta que se mueve: el blanco tiene que ser generoso. */
const ICON_HIT_SIZE = 84;

function drawIcon(ctx: CanvasRenderingContext2D, link: SocialLink, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(ICON_SIZE / 24, ICON_SIZE / 24);
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  for (const path of link.paths) {
    const shape = new Path2D(path.d);
    if (path.mode === 'fill') ctx.fill(shape);
    else ctx.stroke(shape);
  }
  ctx.restore();
}

/** Cara frontal: la foto arriba, el nombre y los enlaces en la placa de abajo. */
function makeFrontCanvas(
  photo: HTMLImageElement,
  name: string,
  links: SocialLink[]
): { canvas: HTMLCanvasElement; regions: LinkRegion[] } {
  const { canvas, ctx } = faceCanvas();
  const W = canvas.width;
  const H = canvas.height;

  ctx.fillStyle = COLOR_SURFACE;
  ctx.fillRect(0, 0, W, H);

  const plateH = Math.round(H * 0.235);
  const photoH = H - plateH;
  drawCover(ctx, photo, 0, 0, W, photoH);

  ctx.fillStyle = COLOR_PLATE;
  ctx.fillRect(0, photoH, W, plateH);
  ctx.fillStyle = COLOR_ACCENT;
  ctx.fillRect(0, photoH, W, 5);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = COLOR_INK;
  ctx.font = '700 62px Manrope, system-ui, sans-serif';
  ctx.fillText(name, W / 2, photoH + plateH * 0.33);

  const rowWidth = links.length * ICON_SIZE + (links.length - 1) * ICON_GAP;
  const rowY = photoH + plateH * 0.72;
  let iconX = (W - rowWidth) / 2;

  const regions: LinkRegion[] = [];
  ctx.fillStyle = COLOR_INK_MUTED;
  ctx.strokeStyle = COLOR_INK_MUTED;
  for (const link of links) {
    drawIcon(ctx, link, iconX, rowY - ICON_SIZE / 2);
    regions.push({
      href: link.href,
      label: link.label,
      x: iconX + ICON_SIZE / 2,
      y: rowY,
      size: ICON_HIT_SIZE,
    });
    iconX += ICON_SIZE + ICON_GAP;
  }

  return { canvas, regions };
}

/** Cara trasera: sólo la marca, para que no sea la foto del revés. */
function makeBackCanvas(text: string): HTMLCanvasElement {
  const { canvas, ctx } = faceCanvas();
  const W = canvas.width;
  const H = canvas.height;

  ctx.fillStyle = COLOR_PLATE;
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = COLOR_INK;
  ctx.font = '800 74px Manrope, system-ui, sans-serif';
  ctx.fillText(text, W / 2, H / 2 - 26);

  ctx.fillStyle = COLOR_ACCENT;
  ctx.fillRect(W / 2 - 90, H / 2 + 44, 180, 6);

  return canvas;
}

/** Textura de la correa: la marca repetida, leyéndose a lo largo de la cinta. */
function makeStrapCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = COLOR_PLATE;
  ctx.fillRect(0, 0, 128, 512);
  // Cantos en el rojo de la marca: es lo que hace que la cinta se lea como
  // cinta y no como una tira plana cuando gira.
  ctx.fillStyle = COLOR_ACCENT;
  ctx.fillRect(0, 0, 7, 512);
  ctx.fillRect(121, 0, 7, 512);

  // El texto va girado 90°: la altura del canvas es el eje largo de la cinta.
  // El sentido (+90°) hace que se lea de arriba abajo, como cuelga.
  ctx.save();
  ctx.translate(64, 256);
  ctx.rotate(Math.PI / 2);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = COLOR_INK;
  ctx.font = '700 40px Manrope, system-ui, sans-serif';
  setLetterSpacing(ctx, '8px');
  ctx.fillText('MELWARE LABS', 0, 0);
  ctx.restore();

  return canvas;
}

/**
 * Entorno de reflejo barato: un degradado equirectangular. Hace el papel del
 * <Environment> de drei — sin él el metal de la anilla se ve negro y plano.
 */
function makeEnvironment(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createLinearGradient(0, 0, 0, 128);
  gradient.addColorStop(0, '#9599a3');
  gradient.addColorStop(0.42, '#3a3b42');
  gradient.addColorStop(0.55, '#17171b');
  gradient.addColorStop(1, '#050506');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 128);

  // Banda clara que hace de foco y le da al metal un brillo definido.
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.fillRect(0, 33, 32, 10);

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export async function createLanyard(options: LanyardOptions): Promise<LanyardHandle> {
  const { canvas, photoUrl, name, links, backText, reducedMotion } = options;

  // Manrope llega por CSS; sin esperarla, el canvas dibujaría el texto con la
  // fuente de reserva y la textura quedaría fijada con la tipografía errónea.
  if (document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // Si falla, se dibuja con la fuente de reserva y ya.
    }
  }

  const photo = await loadImage(photoUrl);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

  const scene = new THREE.Scene();
  const environment = makeEnvironment();
  scene.environment = environment;

  const camera = new THREE.PerspectiveCamera(25, 1, 0.1, 100);

  // ── Tarjeta ──────────────────────────────────────────────────────────
  const shape = cardShape();

  const bodyGeometry = new THREE.ExtrudeGeometry(shape, {
    depth: CARD_D,
    bevelEnabled: true,
    bevelThickness: CARD_BEVEL,
    bevelSize: CARD_BEVEL,
    bevelSegments: 2,
    curveSegments: 10,
  });
  bodyGeometry.translate(0, 0, -CARD_D / 2);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x191a1e,
    roughness: 0.55,
    metalness: 0.35,
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.castShadow = true;

  // Las dos caras van como planos aparte en vez de como tapas del extruido:
  // así cada una lleva su propia textura sin tocar las UV del extruido.
  const faceGeometry = new THREE.ShapeGeometry(shape, 10);

  const frontFace = makeFrontCanvas(photo, name, links);
  const frontTexture = canvasTexture(frontFace.canvas, maxAnisotropy);
  fitTextureToCard(frontTexture);
  const frontMaterial = new THREE.MeshPhysicalMaterial({
    map: frontTexture,
    roughness: 0.42,
    metalness: 0,
    clearcoat: 0.7,
    clearcoatRoughness: 0.22,
  });
  const front = new THREE.Mesh(faceGeometry, frontMaterial);
  front.position.z = FACE_Z;

  const backTexture = canvasTexture(makeBackCanvas(backText), maxAnisotropy);
  fitTextureToCard(backTexture);
  const backMaterial = new THREE.MeshPhysicalMaterial({
    map: backTexture,
    roughness: 0.5,
    metalness: 0,
    clearcoat: 0.5,
    clearcoatRoughness: 0.3,
  });
  const back = new THREE.Mesh(faceGeometry, backMaterial);
  back.position.z = -FACE_Z;
  // Girada 180°, la normal mira hacia -Z y el texto se lee bien desde atrás.
  back.rotation.y = Math.PI;

  const metalMaterial = new THREE.MeshStandardMaterial({
    color: 0xc7cad2,
    roughness: 0.26,
    metalness: 0.95,
  });

  // La anilla atraviesa la ranura, así que su plano es perpendicular al de la
  // tarjeta: de ahí el giro de 90° respecto al toro por defecto.
  const ringGeometry = new THREE.TorusGeometry(0.15, 0.026, 10, 30);
  const ring = new THREE.Mesh(ringGeometry, metalMaterial);
  ring.rotation.y = Math.PI / 2;
  ring.position.y = CARD_H / 2 - 0.05;
  ring.castShadow = true;

  // Pinza que une la anilla con la correa.
  const clampGeometry = new THREE.BoxGeometry(0.19, 0.15, 0.08);
  const clamp = new THREE.Mesh(clampGeometry, metalMaterial);
  clamp.position.y = ATTACH_OFFSET + 0.02;
  clamp.castShadow = true;

  const card = new THREE.Group();
  card.add(body, front, back, ring, clamp);
  scene.add(card);

  // ── Correa: cinta regenerada cada frame desde los puntos de la cuerda ──
  const strapGeometry = new THREE.BufferGeometry();
  const strapPositions = new Float32Array(ROPE_POINTS * 2 * 3);
  const strapUvs = new Float32Array(ROPE_POINTS * 2 * 2);
  const strapIndices: number[] = [];
  for (let i = 0; i < ROPE_POINTS; i++) {
    const v = i / (ROPE_POINTS - 1);
    strapUvs[i * 4] = 0;
    strapUvs[i * 4 + 1] = v;
    strapUvs[i * 4 + 2] = 1;
    strapUvs[i * 4 + 3] = v;
    if (i < ROPE_POINTS - 1) {
      // Devanado antihorario visto desde la cámara: con el orden contrario se
      // ve la cara trasera de la cinta y el texto sale espejado.
      const a = i * 2;
      strapIndices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
  }
  strapGeometry.setAttribute('position', new THREE.BufferAttribute(strapPositions, 3));
  strapGeometry.setAttribute('uv', new THREE.BufferAttribute(strapUvs, 2));
  strapGeometry.setIndex(strapIndices);

  const strapTexture = canvasTexture(makeStrapCanvas(), maxAnisotropy);
  strapTexture.wrapT = THREE.RepeatWrapping;
  // Sin esto el texto sale espejado: la v de la cinta crece hacia abajo en
  // pantalla, y con flipY el canvas se recorre al revés — u y v acaban con
  // sentidos opuestos, que es justo una reflexión.
  strapTexture.flipY = false;
  // Una sola repetición: la proporción del mosaico (1:4) coincide casi con la
  // de la cinta corta, así que el texto no se comprime.
  strapTexture.repeat.set(1, 1);
  const strapMaterial = new THREE.MeshStandardMaterial({
    map: strapTexture,
    side: THREE.DoubleSide,
    roughness: 0.85,
    metalness: 0.05,
  });
  const strap = new THREE.Mesh(strapGeometry, strapMaterial);
  strap.castShadow = true;
  scene.add(strap);

  // ── Luces ────────────────────────────────────────────────────────────
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(2.5, 4, 5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(512, 512);
  keyLight.shadow.camera.near = 1;
  keyLight.shadow.camera.far = 24;
  keyLight.shadow.camera.left = -5;
  keyLight.shadow.camera.right = 5;
  keyLight.shadow.camera.top = 5;
  keyLight.shadow.camera.bottom = -5;
  keyLight.shadow.bias = -0.0015;
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.7);
  fillLight.position.set(-4, 1, 3);
  scene.add(fillLight);

  // Rebote en el rojo de la paleta, para que no parezca pegada sobre el fondo.
  const accentLight = new THREE.PointLight(new THREE.Color(COLOR_ACCENT), 22, 16, 2);
  accentLight.position.set(-1.8, -1.4, 2.4);
  scene.add(accentLight);

  // Sombra proyectada sobre un plano invisible: con alpha:true, ShadowMaterial
  // pinta sólo la sombra y deja pasar el fondo de la página.
  const shadowGeometry = new THREE.PlaneGeometry(16, 16);
  // Suave: lo justo para asentar la tarjeta sobre el fondo. Más opacidad y
  // el borde duro de la sombra se lee como una mancha, no como profundidad.
  const shadowMaterial = new THREE.ShadowMaterial({ opacity: 0.22 });
  const shadowCatcher = new THREE.Mesh(shadowGeometry, shadowMaterial);
  shadowCatcher.position.z = -0.9;
  shadowCatcher.receiveShadow = true;
  scene.add(shadowCatcher);

  // ── Estado de la física ──────────────────────────────────────────────
  // La cuerda arranca desplazada a un lado: así entra balanceándose sola en
  // vez de aparecer ya quieta.
  const points: THREE.Vector3[] = [];
  const prevPoints: THREE.Vector3[] = [];
  const segmentLength = ROPE_LENGTH / (ROPE_POINTS - 1);
  for (let i = 0; i < ROPE_POINTS; i++) {
    const t = i / (ROPE_POINTS - 1);
    points.push(new THREE.Vector3(ANCHOR.x + t * 0.7, ANCHOR.y - t * ROPE_LENGTH * 0.7, ANCHOR.z));
    prevPoints.push(points[i].clone());
  }
  const bottom = points[ROPE_POINTS - 1].clone().add(new THREE.Vector3(0.3, -CARD_SPAN, 0));
  const prevBottom = bottom.clone();

  let spin = 0.55;
  let spinVelocity = 0;

  // ── Interacción ──────────────────────────────────────────────────────
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const dragPlane = new THREE.Plane();
  const dragPoint = new THREE.Vector3();
  const dragOffset = new THREE.Vector3();
  let dragging = false;
  let dragPointerId: number | null = null;
  let firstDragPending = typeof options.onFirstDrag === 'function';
  /** Para distinguir un clic en un icono de un arrastre de la tarjeta. */
  let pressX = 0;
  let pressY = 0;
  const CLICK_SLOP = 6;

  function setPointerFromEvent(event: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  /**
   * Traduce el punto tocado sobre la cara frontal a un enlace. Las UV de la
   * geometría son las coordenadas locales en bruto (ver fitTextureToCard), y
   * el canvas va con flipY, de ahí la inversión de la vertical.
   */
  function linkAt(event: PointerEvent): LinkRegion | null {
    setPointerFromEvent(event);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObject(front, false)[0];
    if (!hit?.uv) return null;

    const x = (hit.uv.x / CARD_W + 0.5) * frontFace.canvas.width;
    const y = (0.5 - hit.uv.y / CARD_H) * frontFace.canvas.height;
    for (const region of frontFace.regions) {
      if (Math.abs(x - region.x) <= region.size / 2 && Math.abs(y - region.y) <= region.size / 2) {
        return region;
      }
    }
    return null;
  }

  function pointerHitsCard(event: PointerEvent): boolean {
    setPointerFromEvent(event);
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObject(card, true).length > 0;
  }

  function handlePointerDown(event: PointerEvent) {
    if (!pointerHitsCard(event)) return;

    dragging = true;
    dragPointerId = event.pointerId;
    pressX = event.clientX;
    pressY = event.clientY;
    canvas.setPointerCapture(event.pointerId);
    canvas.style.cursor = 'grabbing';

    // Plano paralelo a la cámara que pasa por el enganche de la tarjeta.
    const attach = points[ROPE_POINTS - 1];
    camera.getWorldDirection(dragPlane.normal);
    dragPlane.setFromNormalAndCoplanarPoint(dragPlane.normal, attach);
    dragOffset.set(0, 0, 0);
    if (raycaster.ray.intersectPlane(dragPlane, dragPoint)) {
      dragOffset.copy(attach).sub(dragPoint);
    }

    if (firstDragPending) {
      firstDragPending = false;
      options.onFirstDrag?.();
    }
  }

  function handlePointerMove(event: PointerEvent) {
    if (!dragging || event.pointerId !== dragPointerId) {
      if (!dragging) {
        canvas.style.cursor = linkAt(event) ? 'pointer' : pointerHitsCard(event) ? 'grab' : '';
      }
      return;
    }
    setPointerFromEvent(event);
    raycaster.setFromCamera(pointer, camera);
    if (!raycaster.ray.intersectPlane(dragPlane, dragPoint)) return;

    const attach = points[ROPE_POINTS - 1];
    const previousX = attach.x;
    attach.copy(dragPoint).add(dragOffset);
    // Arrastrar de lado la hace girar, como pasaría de verdad.
    spinVelocity += (attach.x - previousX) * 2.4;
  }

  function endDrag(event: PointerEvent) {
    if (!dragging || event.pointerId !== dragPointerId) return;
    dragging = false;
    dragPointerId = null;
    canvas.style.cursor = '';
    if (canvas.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }

    // Sólo cuenta como clic si apenas se ha movido; si no, era un arrastre.
    const moved = Math.hypot(event.clientX - pressX, event.clientY - pressY);
    if (event.type === 'pointerup' && moved <= CLICK_SLOP) {
      const region = linkAt(event);
      if (region) window.open(region.href, '_blank', 'noopener,noreferrer');
    }
  }

  canvas.addEventListener('pointerdown', handlePointerDown);
  canvas.addEventListener('pointermove', handlePointerMove);
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);

  // ── Simulación ───────────────────────────────────────────────────────
  const velocity = new THREE.Vector3();
  const delta = new THREE.Vector3();

  function integrate(p: THREE.Vector3, prev: THREE.Vector3, dt: number) {
    velocity.copy(p).sub(prev).multiplyScalar(DAMPING);
    prev.copy(p);
    p.add(velocity).addScaledVector(GRAVITY, dt * dt);
  }

  /**
   * Acerca dos puntos a su distancia de reposo. `mode` dice cuál puede moverse:
   * los extremos clavados (anclaje, o el enganche mientras se arrastra) no.
   */
  function constrain(a: THREE.Vector3, b: THREE.Vector3, rest: number, mode: 'both' | 'a' | 'b') {
    delta.copy(b).sub(a);
    const distance = delta.length();
    if (distance === 0) return;
    const correction = (distance - rest) / distance;
    if (mode === 'both') {
      a.addScaledVector(delta, correction * 0.5);
      b.addScaledVector(delta, -correction * 0.5);
    } else if (mode === 'a') {
      a.addScaledVector(delta, correction);
    } else {
      b.addScaledVector(delta, -correction);
    }
  }

  function simulate(dt: number) {
    const lastIndex = ROPE_POINTS - 1;

    for (let i = 1; i < ROPE_POINTS; i++) {
      // Mientras se arrastra, el enganche lo manda el puntero, no la gravedad.
      if (dragging && i === lastIndex) {
        prevPoints[i].copy(points[i]);
        continue;
      }
      integrate(points[i], prevPoints[i], dt);
    }
    integrate(bottom, prevBottom, dt);

    for (let iteration = 0; iteration < RELAX_ITERATIONS; iteration++) {
      points[0].copy(ANCHOR);
      for (let i = 0; i < lastIndex; i++) {
        const startFixed = i === 0;
        const endFixed = dragging && i === lastIndex - 1;
        const mode = startFixed ? (endFixed ? 'both' : 'b') : endFixed ? 'a' : 'both';
        if (startFixed && endFixed) continue; // Tramo con los dos extremos clavados.
        constrain(points[i], points[i + 1], segmentLength, mode);
      }
      // La tarjeta cuelga del enganche: sólo se mueve su borde inferior.
      constrain(points[lastIndex], bottom, CARD_SPAN, 'b');
    }

    spinVelocity += -spin * SPIN_STIFFNESS * dt;
    spinVelocity *= SPIN_DAMPING;
    spin += spinVelocity * dt;
  }

  // ── Colocación a partir del estado de la cuerda ───────────────────────
  const up = new THREE.Vector3();
  const forward = new THREE.Vector3();
  const right = new THREE.Vector3();
  const basis = new THREE.Matrix4();
  const side = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  const viewDirection = new THREE.Vector3();

  function sync() {
    const attach = points[ROPE_POINTS - 1];

    up.copy(attach).sub(bottom);
    if (up.lengthSq() === 0) up.set(0, 1, 0);
    up.normalize();
    forward.set(Math.sin(spin), 0, Math.cos(spin));
    right.crossVectors(up, forward).normalize();
    forward.crossVectors(right, up).normalize();
    basis.makeBasis(right, up, forward);

    card.quaternion.setFromRotationMatrix(basis);
    card.position.copy(attach).addScaledVector(up, -ATTACH_OFFSET);

    camera.getWorldDirection(viewDirection);
    const position = strapGeometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < ROPE_POINTS; i++) {
      if (i === ROPE_POINTS - 1) {
        tangent.copy(points[i]).sub(points[i - 1]);
      } else {
        tangent.copy(points[i + 1]).sub(points[i]);
      }
      side.crossVectors(tangent, viewDirection);
      if (side.lengthSq() === 0) side.set(1, 0, 0);
      side.normalize().multiplyScalar(STRAP_WIDTH / 2);

      position.setXYZ(i * 2, points[i].x - side.x, points[i].y - side.y, points[i].z - side.z);
      position.setXYZ(i * 2 + 1, points[i].x + side.x, points[i].y + side.y, points[i].z + side.z);
    }
    position.needsUpdate = true;
    strapGeometry.computeVertexNormals();
  }

  // ── Encuadre ─────────────────────────────────────────────────────────
  /** Aleja la cámara lo justo para que quepan cuerda y tarjeta, sea cual sea el aspecto. */
  const SCENE_HEIGHT = ROPE_LENGTH - ROPE_OFF_FRAME + CARD_SPAN + MARGIN_BOTTOM;
  const SCENE_WIDTH = CARD_W + MARGIN_SIDE;

  function resize() {
    const width = canvas.clientWidth || 1;
    const height = canvas.clientHeight || 1;
    const aspect = width / height;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, aspect < 0.8 ? 1.5 : 2));
    renderer.setSize(width, height, false);

    const halfFov = THREE.MathUtils.degToRad(camera.fov) / 2;
    const distance = Math.max(
      SCENE_HEIGHT / 2 / Math.tan(halfFov),
      SCENE_WIDTH / 2 / (Math.tan(halfFov) * aspect)
    );

    const centerY = ANCHOR.y - ROPE_OFF_FRAME - SCENE_HEIGHT / 2;
    camera.aspect = aspect;
    camera.position.set(0, centerY, distance);
    camera.lookAt(0, centerY, 0);
    camera.updateProjectionMatrix();
    shadowCatcher.position.y = centerY;
  }

  const resizeObserver = new ResizeObserver(() => resize());
  resizeObserver.observe(canvas);
  resize();

  // ── Bucle ────────────────────────────────────────────────────────────
  let frameId = 0;
  let running = false;
  let lastTime = 0;
  let accumulator = 0;

  function frame(time: number) {
    frameId = requestAnimationFrame(frame);
    const elapsed = lastTime ? Math.min((time - lastTime) / 1000, 0.1) : 0;
    lastTime = time;

    accumulator += elapsed;
    let steps = 0;
    while (accumulator >= FIXED_DT && steps < MAX_STEPS) {
      simulate(FIXED_DT);
      accumulator -= FIXED_DT;
      steps++;
    }
    // Si la pestaña ha estado parada, se descarta el retraso en vez de
    // intentar recuperarlo: mejor perder tiempo simulado que dar un tirón.
    if (steps === MAX_STEPS) accumulator = 0;

    sync();
    renderer.render(scene, camera);
  }

  function start() {
    if (running || reducedMotion) return;
    running = true;
    lastTime = 0;
    accumulator = 0;
    frameId = requestAnimationFrame(frame);
  }

  function stop() {
    if (!running) return;
    running = false;
    cancelAnimationFrame(frameId);
  }

  if (reducedMotion) {
    // Se ve la tarjeta en 3D, colgando recta y quieta: sin animación ninguna.
    spin = 0;
    spinVelocity = 0;
    for (let i = 0; i < 600; i++) simulate(FIXED_DT);
    spin = 0;
  }
  sync();
  renderer.render(scene, camera);

  function destroy() {
    stop();
    resizeObserver.disconnect();
    canvas.removeEventListener('pointerdown', handlePointerDown);
    canvas.removeEventListener('pointermove', handlePointerMove);
    canvas.removeEventListener('pointerup', endDrag);
    canvas.removeEventListener('pointercancel', endDrag);

    bodyGeometry.dispose();
    faceGeometry.dispose();
    ringGeometry.dispose();
    clampGeometry.dispose();
    strapGeometry.dispose();
    shadowGeometry.dispose();
    bodyMaterial.dispose();
    frontMaterial.dispose();
    backMaterial.dispose();
    metalMaterial.dispose();
    strapMaterial.dispose();
    shadowMaterial.dispose();
    frontTexture.dispose();
    backTexture.dispose();
    strapTexture.dispose();
    environment.dispose();
    renderer.dispose();
  }

  return { start, stop, destroy };
}

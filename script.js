/* ═══════════════════════════════════════════════════════════════
   MELANY MARTÍNEZ — HTML: 80s MTV aesthetic updates
   Replaces the generic hero background div with the synthwave grid + sun + stars
═══════════════════════════════════════════════════════════════ */

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {

  // ── 1. INJECT SYNTHWAVE HERO ELEMENTS ─────────────────────────
  const heroSection = document.getElementById('hero');
  const heroBg = heroSection?.querySelector('.hero-bg');

  if (heroBg) {
    // Grid floor
    const grid = document.createElement('div');
    grid.className = 'hero-grid';
    grid.setAttribute('aria-hidden', 'true');
    heroSection.appendChild(grid);

    // Synthwave sun
    const sun = document.createElement('div');
    sun.className = 'hero-sun';
    sun.setAttribute('aria-hidden', 'true');
    heroSection.appendChild(sun);

    // Stars — assign parallax depth layer (data-parallax-speed)
    const starColors = ['#ff2d78', '#00f5ff', '#bf00ff', '#ffe600', '#39ff14'];
    for (let i = 0; i < 60; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random() * 3 + 1;
      // 3 depth layers: slow (0.08), medium (0.18), fast (0.32)
      const speeds = [0.08, 0.18, 0.32];
      const speed = speeds[Math.floor(Math.random() * speeds.length)];
      star.dataset.parallaxSpeed = speed;
      star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        top: ${Math.random() * 70}%;
        left: ${Math.random() * 100}%;
        background: ${starColors[Math.floor(Math.random() * starColors.length)]};
        box-shadow: 0 0 ${size * 3}px currentColor;
        --dur: ${Math.random() * 3 + 1.5}s;
        animation-delay: ${Math.random() * 3}s;
        will-change: transform;
      `;
      heroSection.appendChild(star);
    }
  }

  // ── 2. TYPING ANIMATION ────────────────────────────────────────
  const typingEl = document.getElementById('typing-text');
  const words = [
    'el desarrollo web',
    'la inteligencia artificial',
    'los algoritmos',
    'el open source',
    'el clean code',
    'aprender cada día',
  ];

  let wordIdx = 0, charIdx = 0, isDeleting = false;

  function type() {
    if (!typingEl) return;
    const word = words[wordIdx];

    if (isDeleting) {
      charIdx--;
      typingEl.textContent = word.substring(0, charIdx);
      if (charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 50);
    } else {
      charIdx++;
      typingEl.textContent = word.substring(0, charIdx);
      if (charIdx === word.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
      setTimeout(type, 90);
    }
  }
  setTimeout(type, 1000);

  // ── 3. MOBILE NAV ──────────────────────────────────────────────
  const burgerBtn = document.getElementById('burger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  burgerBtn?.addEventListener('click', () => {
    const isOpen = !mobileNav.classList.contains('hidden');
    mobileNav.classList.toggle('hidden', isOpen);
    burgerBtn.setAttribute('aria-expanded', String(!isOpen));

    // Animate burger lines
    const spans = burgerBtn.querySelectorAll('span');
    if (!isOpen) {
      spans[0].style.cssText = 'transform: translateY(7px) rotate(45deg)';
      spans[1].style.cssText = 'opacity: 0; transform: scaleX(0)';
      spans[2].style.cssText = 'transform: translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => s.style.cssText = '');
    }
  });

  // Close on mobile link click
  document.querySelectorAll('[data-mobile-link]').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
      burgerBtn.setAttribute('aria-expanded', 'false');
      burgerBtn.querySelectorAll('span').forEach(s => s.style.cssText = '');
    });
  });

  // Close on resize to desktop
  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (e.matches) {
      mobileNav.classList.add('hidden');
      burgerBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // ── 4. SMOOTH SCROLL & ACTIVE NAV ─────────────────────────────
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link, .footer-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        target?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Active state on scroll
  const sections = document.querySelectorAll('section[id]');
  const headerNavLinks = document.querySelectorAll('.nav-desktop .nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        headerNavLinks.forEach(link => {
          const isActive = link.getAttribute('href') === `#${entry.target.id}`;
          link.style.color = isActive ? 'var(--neon-pink)' : '';
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

  sections.forEach(s => observer.observe(s));

  // ── 5. SCROLL REVEAL ──────────────────────────────────────────
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

  // ── 6. PROJECT FILTER ─────────────────────────────────────────
  const filterBtns = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('#projects-grid .project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const tags = card.dataset.tags || '';
        const show = filter === 'all' || tags.includes(filter);
        card.classList.toggle('hidden', !show);
      });
    });
  });

  // ── 7. BLOG FILTER ────────────────────────────────────────────
  const blogFilterBtns = document.querySelectorAll('[data-blog-filter]');
  const blogCards = document.querySelectorAll('#blog-grid .blog-card');

  blogFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      blogFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.blogFilter;
      blogCards.forEach(card => {
        const tags = card.dataset.blogTags || '';
        const show = filter === 'all' || tags.includes(filter);
        card.classList.toggle('hidden', !show);
      });
    });
  });

  // ── 8. CONTACT FORM ────────────────────────────────────────────
  const form = document.getElementById('contact-form');
  const formError = document.getElementById('form-error');
  const formSubmit = document.getElementById('form-submit');
  const btnText = document.getElementById('btn-text');

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    formError?.classList.add('hidden');

    const name = form.elements.namedItem('name')?.value?.trim();
    const email = form.elements.namedItem('email')?.value?.trim();
    const message = form.elements.namedItem('message')?.value?.trim();

    if (!name || !email || !message) {
      if (formError) {
        formError.textContent = '// ERROR: Completa los campos obligatorios.';
        formError.classList.remove('hidden');
      }
      return;
    }

    if (!email.includes('@')) {
      if (formError) {
        formError.textContent = '// ERROR: Email no válido.';
        formError.classList.remove('hidden');
      }
      return;
    }

    // Simulate send
    if (formSubmit) formSubmit.disabled = true;
    if (btnText) btnText.textContent = 'Enviando...';

    await new Promise(r => setTimeout(r, 1500));

    form.innerHTML = `<p class="form-success">✓ MENSAJE RECIBIDO<br>Te respondo en menos de 24h.</p>`;
  });

  // ── 9. HEADER SCROLL EFFECT ────────────────────────────────────
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 20;
    header.style.borderBottomColor = scrolled ? 'var(--neon-pink)' : 'rgba(255,45,120,0.3)';
  }, { passive: true });

  // ═══════════════════════════════════════════════════════════════
  // ── 12. PARALLAX ENGINE ────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════

  // Grab parallax targets
  const parallaxSun    = document.querySelector('.hero-sun');
  const parallaxGrid   = document.querySelector('.hero-grid');
  const heroInner      = document.querySelector('.hero-inner');
  const parallaxStars  = document.querySelectorAll('.star[data-parallax-speed]');

  // ── Scroll-based parallax ─────────────────────────────────────
  // Uses a single rAF loop — reads scroll once, writes all transforms
  let scrollY = 0;
  let ticking = false;

  function onScroll() {
    scrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(applyScrollParallax);
      ticking = true;
    }
  }

  function applyScrollParallax() {
    const s = scrollY;

    // Sun: rises slower than content (feels like it stays in the sky)
    if (parallaxSun) {
      parallaxSun.style.transform = `translateX(-50%) translateY(${s * 0.35}px)`;
    }

    // Grid: moves slightly faster → depth illusion
    if (parallaxGrid) {
      // Keep the perspective transform and add Y offset
      parallaxGrid.style.transform =
        `translateX(-50%) perspective(600px) rotateX(60deg) translateY(${s * -0.12}px)`;
    }

    // Hero text: floats slower → classic parallax depth
    if (heroInner) {
      heroInner.style.transform = `translateY(${s * 0.18}px)`;
      heroInner.style.opacity   = Math.max(0, 1 - s / 600);
    }

    // Stars: each depth layer moves at its own speed
    parallaxStars.forEach(star => {
      const speed = parseFloat(star.dataset.parallaxSpeed || 0.1);
      star.style.transform = `translateY(${s * speed}px)`;
    });

    ticking = false;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Mouse parallax (hero only) ─────────────────────────────────
  // Moves elements gently toward the cursor for a 3-D feel
  let targetMX = 0, targetMY = 0;
  let currentMX = 0, currentMY = 0;

  document.addEventListener('mousemove', e => {
    // Normalise to -1..1 relative to viewport centre
    targetMX = (e.clientX / window.innerWidth  - 0.5) * 2;
    targetMY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function applyMouseParallax() {
    // Smooth lerp so movement is silky
    currentMX += (targetMX - currentMX) * 0.06;
    currentMY += (targetMY - currentMY) * 0.06;

    const heroVisible = scrollY < window.innerHeight;

    if (heroVisible) {
      // Sun drifts gently toward cursor (strong layer)
      if (parallaxSun) {
        const baseY = scrollY * 0.35;
        parallaxSun.style.transform =
          `translateX(calc(-50% + ${currentMX * 22}px)) translateY(${baseY + currentMY * 14}px)`;
      }

      // Stars: each layer shifts by a different amount
      parallaxStars.forEach(star => {
        const speed = parseFloat(star.dataset.parallaxSpeed || 0.1);
        const mx = currentMX * speed * 80;
        const my = currentMY * speed * 80 + scrollY * speed;
        star.style.transform = `translate(${mx}px, ${my}px)`;
      });
    }

    requestAnimationFrame(applyMouseParallax);
  }
  applyMouseParallax();

  // ── 3-D Card Tilt on hover ────────────────────────────────────
  // Applies a subtle perspective tilt to project & blog cards
  const tiltCards = document.querySelectorAll('.project-card, .blog-card');

  tiltCards.forEach(card => {
    card.style.willChange = 'transform';
    card.style.transition = 'transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s ease';

    card.addEventListener('mousemove', e => {
      const rect  = card.getBoundingClientRect();
      const cx    = rect.left + rect.width  / 2;
      const cy    = rect.top  + rect.height / 2;
      const dx    = (e.clientX - cx) / (rect.width  / 2);  // -1..1
      const dy    = (e.clientY - cy) / (rect.height / 2);  // -1..1
      const rotX  = -dy * 6;   // tilt up/down  (max 6deg)
      const rotY  =  dx * 6;   // tilt left/right
      card.style.transform =
        `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px) scale(1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ── 10. VHS GLITCH RANDOM EFFECT ──────────────────────────────
  // Occasional full-screen VHS glitch
  function triggerVhsGlitch() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 9997;
      pointer-events: none;
      background: linear-gradient(
        to bottom,
        transparent ${Math.random() * 80}%,
        rgba(255, 45, 120, 0.03) ${Math.random() * 90}%,
        transparent 100%
      );
      transform: translateX(${(Math.random() - 0.5) * 6}px);
      animation: none;
    `;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 80 + Math.random() * 120);
  }

  // Trigger glitch randomly every 6-15 seconds
  function scheduleGlitch() {
    const delay = 6000 + Math.random() * 9000;
    setTimeout(() => {
      triggerVhsGlitch();
      // Sometimes double-glitch
      if (Math.random() > 0.5) {
        setTimeout(triggerVhsGlitch, 100 + Math.random() * 100);
      }
      scheduleGlitch();
    }, delay);
  }
  scheduleGlitch();

  // ── 11. CURSOR NEON TRAIL ──────────────────────────────────────
  const trail = [];
  const TRAIL_LEN = 8;

  for (let i = 0; i < TRAIL_LEN; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      width: ${6 - i * 0.5}px;
      height: ${6 - i * 0.5}px;
      border-radius: 50%;
      background: var(--neon-pink);
      pointer-events: none;
      z-index: 9996;
      transition: opacity 0.1s;
      box-shadow: 0 0 ${8 - i}px var(--neon-pink);
      opacity: ${1 - i * 0.12};
      mix-blend-mode: screen;
    `;
    document.body.appendChild(dot);
    trail.push({ el: dot, x: 0, y: 0 });
  }

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updateTrail() {
    let px = mouseX, py = mouseY;
    trail.forEach((dot, i) => {
      const targetX = i === 0 ? mouseX : trail[i - 1].x;
      const targetY = i === 0 ? mouseY : trail[i - 1].y;
      dot.x += (targetX - dot.x) * 0.35;
      dot.y += (targetY - dot.y) * 0.35;
      dot.el.style.transform = `translate(${dot.x - 3}px, ${dot.y - 3}px)`;
    });
    requestAnimationFrame(updateTrail);
  }
  updateTrail();

});

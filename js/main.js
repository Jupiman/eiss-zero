(function () {
  const d = document;

  // Year in footer
  const yearEl = d.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = d.getElementById('navToggle');
  const nav = d.getElementById('primaryNav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close nav on link click (mobile)
    nav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth scroll (respects reduced motion)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  d.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = d.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 64;
      if (prefersReduced) {
        window.scrollTo(0, top);
      } else {
        window.scrollTo({ top, behavior: 'smooth' });
      }
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  // Active nav link based on section in view
  const navLinks = Array.from(d.querySelectorAll('.nav-link'));
  const sections = navLinks.map((l) => d.querySelector(l.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = '#' + entry.target.id;
        const link = navLinks.find((l) => l.getAttribute('href') === id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-60% 0px -40% 0px', threshold: 0 });

    sections.forEach((s) => s && obs.observe(s));
  }

  // Back to top button
  const back = d.getElementById('backToTop');
  if (back) {
    const onScroll = () => {
      if (window.scrollY > 300) back.classList.add('show');
      else back.classList.remove('show');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    back.addEventListener('click', () => {
      if (prefersReduced) window.scrollTo(0, 0);
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Disabled chips: prevent navigation and announce tooltip
  const disabledChips = d.querySelectorAll('.chip[aria-disabled="true"]');
  if (disabledChips.length) {
    // Live region for announcements
    let live = d.getElementById('live-region');
    if (!live) {
      live = d.createElement('div');
      live.id = 'live-region';
      live.setAttribute('role', 'status');
      live.setAttribute('aria-live', 'polite');
      live.style.position = 'absolute';
      live.style.width = '1px';
      live.style.height = '1px';
      live.style.overflow = 'hidden';
      live.style.clip = 'rect(1px, 1px, 1px, 1px)';
      live.style.clipPath = 'inset(50%)';
      live.style.whiteSpace = 'nowrap';
      live.style.border = '0';
      d.body.appendChild(live);
    }

    disabledChips.forEach((chip) => {
      const msg = chip.getAttribute('data-tooltip') || 'Coming soon';
      const prevent = (e) => {
        e.preventDefault();
        chip.blur();
        live.textContent = msg;
      };
      chip.addEventListener('click', prevent);
      chip.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') prevent(e);
      });
    });
  }
})();

  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open')));

  const revealEls = document.querySelectorAll('.panel');
  revealEls.forEach(p => p.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.2 });
  revealEls.forEach(el => io.observe(el));

  const scroller = document.getElementById('scroller');
  const panels = Array.from(document.querySelectorAll('section.panel'));
  const dots = Array.from(document.querySelectorAll('#sectionIndex button'));
  const navLinks = Array.from(document.querySelectorAll('#navMenu a'));

  function setActive(idx) {
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    navLinks.forEach((l, i) => l.classList.toggle('active', i === idx));
  }

  const panelObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        const idx = panels.indexOf(entry.target);
        setActive(idx);
      }
    });
  }, { root: scroller, threshold: [0.5] });
  panels.forEach(p => panelObserver.observe(p));

  dots.forEach(d => d.addEventListener('click', () => {
    const idx = parseInt(d.getAttribute('data-idx'), 10);
    panels[idx].scrollIntoView({ behavior: 'smooth' });
  }));
  navLinks.forEach(l => l.addEventListener('click', (e) => {
    e.preventDefault();
    const idx = parseInt(l.getAttribute('data-idx'), 10);
    panels[idx].scrollIntoView({ behavior: 'smooth' });
  }));

  document.querySelectorAll('.accordion-item').forEach(item => {
    const trigger = item.querySelector('.acc-trigger');
    trigger.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Soft gold glow that follows the cursor, with easing for a natural trail
  (function() {
    const glow = document.getElementById('cursor-glow');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) {
      glow.style.display = 'none';
      return;
    }
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let gx = mx, gy = my;
    window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
    function loop() {
      gx += (mx - gx) * 0.12;
      gy += (my - gy) * 0.12;
      glow.style.transform = 'translate(' + gx + 'px,' + gy + 'px)';
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  })();

  // Scroll progress bar synced to the snap-scroll container
  (function() {
    const bar = document.getElementById('scroll-progress-bar');
    const scrollerEl = document.getElementById('scroller');
    function updateBar() {
      const max = scrollerEl.scrollHeight - scrollerEl.clientHeight;
      const pct = max > 0 ? (scrollerEl.scrollTop / max) * 100 : 0;
      bar.style.width = pct + '%';
    }
    scrollerEl.addEventListener('scroll', updateBar, { passive: true });
    updateBar();
  })();

  // Subtle tilt/parallax on the hero photo as the mouse moves across it
  (function() {
    const photo = document.querySelector('.hero-photo-wrap img');
    const heroWrap = document.querySelector('.hero-photo-wrap');
    if (!photo || !heroWrap || window.matchMedia('(pointer: coarse)').matches) return;
    heroWrap.addEventListener('mousemove', (e) => {
      const rect = heroWrap.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      photo.style.transform = 'scale(1.03) translate(' + (px * -10) + 'px,' + (py * -10) + 'px)';
    });
    heroWrap.addEventListener('mouseleave', () => {
      photo.style.transform = 'scale(1) translate(0,0)';
    });
    photo.style.transition = 'transform 0.2s ease-out';
  })();

  // Magnetic pull effect on buttons as the cursor nears them
  (function() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.querySelectorAll('.btn').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        btn.style.transform = 'translate(' + (dx * 0.15) + 'px,' + (dy * 0.25) + 'px)';
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
    });
  })();

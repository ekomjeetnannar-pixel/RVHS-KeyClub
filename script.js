const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));

  navMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navMenu.classList.remove('open'))
  );
}

// Fade sections in as they enter the viewport.
document.querySelectorAll('.panel').forEach(p => p.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.panel').forEach(el => io.observe(el));

// Accordion behavior on the Get Involved page.
document.querySelectorAll('.accordion-item').forEach(item => {
  const trigger = item.querySelector('.acc-trigger');

  if (!trigger) return;

  trigger.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');

    document.querySelectorAll('.accordion-item')
      .forEach(i => i.classList.remove('open'));

    if (!wasOpen) {
      item.classList.add('open');
    }
  });
});

// Soft cursor glow on desktop.
(() => {
  const glow = document.getElementById('cursor-glow');

  if (
    !glow ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('(pointer: coarse)').matches
  ) {
    if (glow) glow.style.display = 'none';
    return;
  }

  let mx = innerWidth / 2;
  let my = innerHeight / 2;
  let gx = mx;
  let gy = my;

  addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  function loop() {
    gx += (mx - gx) * 0.12;
    gy += (my - gy) * 0.12;

    glow.style.transform = `translate(${gx}px,${gy}px)`;

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
})();

// Small magnetic effect for buttons.
if (!window.matchMedia('(pointer: coarse)').matches) {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();

      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);

      btn.style.transform =
        `translate(${dx * 0.15}px,${dy * 0.25}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0,0)';
    });
  });
}

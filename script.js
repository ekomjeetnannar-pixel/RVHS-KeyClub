// ============================================
// Division 14 — Key Club site interactivity
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Lenis Smooth Scroll Initialization ---------- */
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  /* ---------- Leadership team data ---------- */
  const team = [
    { name: 'Eeshan Satija', role: 'Lieutenant Governor', desc: 'Leads Division 14, supports its Key Clubs, oversees the Division Leadership Team, and coordinates division-wide service, events, and initiatives while connecting the division with the CNH District.' },
    { name: 'Abdul', role: 'Executive Assistant', desc: 'Supports division operations, communication, events, and projects while assisting the Lieutenant Governor and Division 14 clubs.' },
    { name: 'Kevin Huynh', role: 'Executive Assistant', desc: 'Supports division planning, club outreach, and division-wide initiatives while helping clubs stay connected and involved.' },
    { name: 'Ishaan', role: 'News Editor', desc: "Documents Division 14's service and accomplishments while keeping members informed about events and division updates." },
    { name: 'Prabhsimran', role: 'Spirit Coordinator', desc: 'Builds Division 14 spirit and brings members together through activities, traditions, and division events.' },
    { name: 'Harleen', role: 'Fundraising Coordinator', desc: "Coordinates fundraising efforts that support Division 14's service projects, events, and initiatives." },
    { name: 'Ashleen', role: 'Media Editor', desc: "Manages Division 14's media presence and showcases its service, events, members, and accomplishments." },
    { name: 'Hrithik', role: 'Technology Editor', desc: "Supports Division 14's technology and digital resources to keep the division organized and connected." },
    { name: 'Abhijot Singh', role: 'Website Editor', desc: 'Develops and maintains the Division 14 website, keeping its information, resources, and opportunities accessible and up to date.' },
    { name: 'Yashvir Thind', role: 'Website Editor', desc: 'Develops and maintains the Division 14 website, helping create the online platform connecting our clubs, members, and communities.' },
  ];

  const grid = document.getElementById('teamGrid');
  if (grid) {
    grid.innerHTML = team.map((member, i) => `
${member.name}
${member.role}

${member.desc}

`).join('');

grid.querySelectorAll('.team-card').forEach(card => {
  const toggle = () => {
    const isOpen = card.classList.toggle('open');
    card.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  };
  card.addEventListener('click', toggle);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });
});
}

/* ---------- Mobile nav toggle & smooth anchor links ---------- */
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
navToggle.addEventListener('click', () => {
const open = mainNav.classList.toggle('open');
navToggle.classList.toggle('open', open);
navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

mainNav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');

    // Smooth scroll to anchor using Lenis
    const targetId = link.getAttribute('href');
    if (targetId.startsWith('#')) {
      e.preventDefault();
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        lenis.scrollTo(targetEl, { offset: -80 });
      }
    }
  });
});
}

/* ---------- Active nav link on scroll ---------- */
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const setActiveLink = () => {
let current = '';
const scrollPos = window.scrollY || window.pageYOffset;
sections.forEach(section => {
const top = section.offsetTop - 120;
if (scrollPos >= top) current = section.getAttribute('id');
});
navLinks.forEach(link => {
link.classList.toggle('active', link.getAttribute('href') === #${current});
});
};

/* ---------- Scroll progress bar ---------- */
const progressBar = document.getElementById('progressBar');
const updateProgress = () => {
const scrollTop = window.scrollY || window.pageYOffset;
const docHeight = document.documentElement.scrollHeight - window.innerHeight;
const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
if (progressBar) progressBar.style.width = ${pct}%;
};

/* Listen for Lenis scroll events */
lenis.on('scroll', () => {
setActiveLink();
updateProgress();
});

setActiveLink();
updateProgress();

/* ---------- Reveal on scroll ---------- */
const revealTargets = document.querySelectorAll('.about-card, .team-card, .opp-step, .opp-card, .contact-card, .section-head');
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('in-view');
observer.unobserve(entry.target);
}
});
}, { threshold: 0.12 });

revealTargets.forEach(el => observer.observe(el));

/* ---------- Animated stat counters ---------- */
const stats = document.querySelectorAll('.stat');
const statObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (!entry.isIntersecting) return;
const el = entry.target;
const target = parseInt(el.getAttribute('data-count'), 10);
const numEl = el.querySelector('.stat-num');
let current = 0;
const step = Math.max(1, Math.round(target / 30));
const tick = () => {
current = Math.min(target, current + step);
numEl.textContent = current;
if (current < target) requestAnimationFrame(tick);
};
tick();
statObserver.unobserve(el);
});
}, { threshold: 0.4 });

stats.forEach(el => statObserver.observe(el));

/* ---------- Back to top ---------- */
const toTop = document.getElementById('toTop');
if (toTop) {
toTop.addEventListener('click', () => {
lenis.scrollTo(0);
});
}

});

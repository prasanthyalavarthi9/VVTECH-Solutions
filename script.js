const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

function setupSlider(slidesSelector, dotsSelector, activeClass, delay) {
  const slides = [...document.querySelectorAll(slidesSelector)];
  const dots = [...document.querySelectorAll(dotsSelector)];
  let index = 0;

  function show(nextIndex) {
    index = nextIndex;
    slides.forEach((slide, slideIndex) => slide.classList.toggle(activeClass, slideIndex === index));
    dots.forEach((dot, dotIndex) => dot.classList.toggle(activeClass, dotIndex === index));
  }

  dots.forEach((dot, dotIndex) => dot.addEventListener('click', () => show(dotIndex)));
  if (slides.length) {
    setInterval(() => show((index + 1) % slides.length), delay);
  }
}

setupSlider('.welcome-slide', '.welcome-dot', 'active', 5000);

const counted = new WeakSet();
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting || counted.has(entry.target)) return;
    counted.add(entry.target);
    const target = Number(entry.target.dataset.counter);
    const duration = 1300;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      entry.target.textContent = Math.round(target * eased).toString() + '+';
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
}, { threshold: 0.45 });

document.querySelectorAll('[data-counter]').forEach((counter) => counterObserver.observe(counter));

const hero = document.querySelector('[data-parallax]');
const heroImage = document.querySelector('.hero-image');

hero?.addEventListener('pointermove', (event) => {
  const rect = hero.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  heroImage.style.transform = `scale(1.045) translate(${x * 12}px, ${y * 10}px)`;
});

hero?.addEventListener('pointerleave', () => {
  heroImage.style.transform = 'scale(1.04)';
});

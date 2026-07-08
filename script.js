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

const serviceTabs = [...document.querySelectorAll('.service-tabs button')];
const serviceSlides = [...document.querySelectorAll('.service-slide')];
let serviceIndex = 0;

function showService(index) {
  serviceIndex = index;
  serviceTabs.forEach((tab, tabIndex) => tab.classList.toggle('active', tabIndex === index));
  serviceSlides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === index));
}

serviceTabs.forEach((tab, index) => tab.addEventListener('click', () => showService(index)));

if (serviceSlides.length) {
  setInterval(() => showService((serviceIndex + 1) % serviceSlides.length), 5600);
}

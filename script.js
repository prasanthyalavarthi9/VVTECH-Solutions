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

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach((el) => observer.observe(el));

const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('.slide-dot')];
let slideIndex = 0;

function showSlide(index) {
  slideIndex = index;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
if (slides.length) {
  setInterval(() => showSlide((slideIndex + 1) % slides.length), 5200);
}

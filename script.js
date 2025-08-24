// Helper: apply background images from data-bg to CSS variable
document.querySelectorAll('.section[data-bg]').forEach(sec => {
  const url = sec.getAttribute('data-bg');
  // Fallback for browsers without attr() support in CSS images:
  sec.style.setProperty('--bg-url', `url('${url}')`);
  sec.classList.add('has-bg');
});

// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('show');
});

// Close nav when clicking a link (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('show'));
});

// Scroll reveal
const inView = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => inView.observe(el));

// Lightbox for gallery
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.getElementById('galleryGrid').addEventListener('click', e => {
  const img = e.target.closest('img');
  if (!img) return;
  lightboxImg.src = img.src;
  lightbox.classList.add('show');
  lightbox.setAttribute('aria-hidden', 'false');
});
lightboxClose.addEventListener('click', () => {
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden', 'true');
});
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) lightboxClose.click();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lightbox.classList.contains('show')) lightboxClose.click();
});

// Contact form validation
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }
  const emailOK = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if (!emailOK) {
    alert('Please enter a valid email address.');
    return;
  }
  alert(`Thank you, ${name}! Your message has been sent.`);
  form.reset();
});

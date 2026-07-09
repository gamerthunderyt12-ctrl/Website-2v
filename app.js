// ============== MUSKAN FURNITURE — luxury interactions ==============

// ---------- Custom cursor ----------
const cursor = document.getElementById('cursor');
const dot = document.getElementById('cursor-dot');
let mx = window.innerWidth / 2, my = window.innerHeight / 2;
let cx = mx, cy = my;
window.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
  document.documentElement.style.setProperty('--mx', (mx / innerWidth * 100) + '%');
  document.documentElement.style.setProperty('--my', (my / innerHeight * 100) + '%');
});
function loop(){
  cx += (mx - cx) * 0.18;
  cy += (my - cy) * 0.18;
  cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
  requestAnimationFrame(loop);
}
loop();

// Cursor hover state on interactive elements
document.addEventListener('mouseover', (e) => {
  if (e.target.closest('a, button, .swatch, .voice, .why-card, .craft-step, .room-media, .btn, .nav-cta, input, select, textarea, label'))
    cursor.classList.add('hover');
});
document.addEventListener('mouseout', (e) => {
  if (e.target.closest('a, button, .swatch, .voice, .why-card, .craft-step, .room-media, .btn, .nav-cta, input, select, textarea, label'))
    cursor.classList.remove('hover');
});

// ---------- Magnetic buttons ----------
document.querySelectorAll('[data-magnetic]').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  });
  el.addEventListener('mouseleave', () => el.style.transform = '');
});

// ---------- Nav scroll & dark-section detection ----------
const nav = document.getElementById('nav');
const darkSections = () => document.querySelectorAll('.hero, .room.dark, .craft, .book, .marquee');
function onScroll(){
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 40);
  const navBottom = nav.getBoundingClientRect().bottom;
  let onDark = false;
  darkSections().forEach(s => {
    const r = s.getBoundingClientRect();
    if (r.top < navBottom + 20 && r.bottom > navBottom + 20) onDark = true;
  });
  nav.classList.toggle('on-dark', onDark);
  cursor.classList.toggle('dark', onDark);
  document.getElementById('cursor-dot').classList.toggle('dark', onDark);
}
window.addEventListener('scroll', onScroll, { passive:true });
onScroll();

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- Room parallax on images ----------
const parallaxImgs = document.querySelectorAll('.room-media .frame img');
window.addEventListener('scroll', () => {
  parallaxImgs.forEach(img => {
    const r = img.getBoundingClientRect();
    const c = (r.top + r.height / 2) - window.innerHeight / 2;
    const p = Math.max(-1, Math.min(1, c / window.innerHeight));
    img.style.transform = `scale(1.08) translateY(${p * -20}px)`;
  });
}, { passive: true });

// ---------- Form submit -> WhatsApp ----------
const form = document.getElementById('consult-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const msg = `Hello Muskan Furniture,%0A%0AI would like to book a consultation.%0A%0AName: ${encodeURIComponent(data.get('name')||'')}%0APhone: ${encodeURIComponent(data.get('phone')||'')}%0ACity: ${encodeURIComponent(data.get('city')||'')}%0AProject: ${encodeURIComponent(data.get('project')||'')}%0ABudget: ${encodeURIComponent(data.get('budget')||'')}%0AMessage: ${encodeURIComponent(data.get('message')||'')}`;
    window.open(`https://wa.me/918279988055?text=${msg}`, '_blank');
  });
}

// Build the "Selected work" grid from projects-data.js
// (so adding a project there is enough — no HTML editing needed)
function renderWorkGrid() {
  const grid = document.getElementById('workGrid');
  if (!grid || typeof PROJECTS === 'undefined') return;

  grid.innerHTML = PROJECTS.map(p => {
    const base = p.image.replace(/\.[^.]+$/, '');
    return `
      <a class="project reveal" href="project.html?id=${encodeURIComponent(p.id)}">
        <div class="project-photo">
          <img src="images/${p.image}" alt="${p.title}"
               onerror="this.onerror=function(){this.onerror=null;this.src='images/placeholder.svg';};this.src='images/${base}.svg';">
        </div>
        <div class="project-meta"><h3>${p.title}</h3><span>${p.location}, ${p.year}</span></div>
        <p class="project-tag">${p.category}</p>
      </a>`;
  }).join('');
}
renderWorkGrid();

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// One-time reveal on scroll (respects prefers-reduced-motion via CSS)
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

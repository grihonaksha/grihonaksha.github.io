// Build the "Selected work" grid from projects-data.js
// (so adding a project there is enough — no HTML editing needed)
function renderWorkGrid() {
  const grid = document.getElementById('workGrid');
  if (!grid) return;
  if (typeof PROJECTS === 'undefined') {
    grid.innerHTML = '<p style="grid-column:1/-1;color:#b3261e">Project data could not be loaded — check projects-data.js for a missing quote or comma.</p>';
    return;
  }

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

// Visitor counter (Abacus — supports a pre-set starting number)
(function () {
  const el = document.getElementById('visitCount');
  if (!el) return;
  fetch('https://abacus.jasoncameron.dev/hit/grihonaksha.github.io/visits')
    .then(res => res.json())
    .then(data => { el.textContent = data.value.toLocaleString(); })
    .catch(() => { el.textContent = '—'; });
})();

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

// Burn a watermark into project photos in the browser, so that
// "Save image as" / drag / open-in-new-tab all give the watermarked picture.
function watermarkImg(img) {
  if (img.dataset.wm) return;
  const src = img.currentSrc || img.src;
  if (!src || src.startsWith('data:') || /\.svg(\?|$)/i.test(src)) return;
  try {
    let w = img.naturalWidth, h = img.naturalHeight;
    if (!w || !h) return;
    const s = Math.min(1, 1600 / Math.max(w, h));   // also caps size at 1600px
    w = Math.round(w * s); h = Math.round(h * s);
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);

    const text = 'GRIHO NAKSHA';
    const fs = Math.max(18, Math.round(Math.max(w, h) / 30));
    ctx.font = 'bold ' + fs + 'px Arial, Helvetica, sans-serif';
    ctx.textBaseline = 'middle';
    const stepX = ctx.measureText(text).width * 1.7, stepY = fs * 4.2;
    const diag = Math.hypot(w, h);

    ctx.translate(w / 2, h / 2);
    ctx.rotate(-25 * Math.PI / 180);
    let row = 0;
    for (let y = -diag / 2; y < diag / 2; y += stepY) {
      const off = row % 2 ? stepX / 2 : 0;
      for (let x = -diag / 2 - stepX; x < diag / 2; x += stepX) {
        ctx.fillStyle = 'rgba(0,0,0,0.08)';       ctx.fillText(text, x + off + 2, y + 2);
        ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.fillText(text, x + off, y);
      }
      row++;
    }
    img.dataset.wm = '1';
    img.src = c.toDataURL('image/jpeg', 0.85);
  } catch (e) { /* if the browser blocks canvas, keep the original picture */ }
}

document.querySelectorAll('.project-photo img, .detail-figure img, .detail-gallery-item img')
  .forEach(img => {
    if (img.complete && img.naturalWidth) watermarkImg(img);
    else img.addEventListener('load', () => watermarkImg(img));
  });

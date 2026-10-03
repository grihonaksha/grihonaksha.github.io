(function () {
  const root = document.getElementById('detailRoot');
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const project = (typeof PROJECTS !== 'undefined')
    ? PROJECTS.find(p => p.id === id)
    : null;

  if (!project) {
    root.innerHTML = `
      <p class="reveal">প্রজেক্টটি খুঁজে পাওয়া যায়নি।</p>
      <p class="reveal"><a href="index.html#work">← কাজের তালিকায় ফিরে যান</a></p>`;
    return;
  }

  document.title = project.title + ' — Griho Naksha';

  const base = project.image.replace(/\.[^.]+$/, '');
  const paras = (project.description || [])
    .map(p => `<p>${p}</p>`)
    .join('');

  const gallery = (project.gallery || []).map(img => `
    <div class="detail-gallery-item">
      <img src="images/${img}" alt="${project.title}" loading="lazy">
    </div>`).join('');

  root.innerHTML = `
    <p class="detail-back reveal"><a href="index.html#work">← Back to work</a></p>

    <div class="detail-head reveal">
      <h1>${project.title}</h1>
      <div class="detail-meta">
        <span>${project.location}</span>
        <span>${project.year}</span>
        <span>${project.category}</span>
      </div>
    </div>

    <div class="detail-figure ticked reveal">
      <img src="images/${project.image}" alt="${project.title}"
           onerror="this.onerror=function(){this.onerror=null;this.src='images/placeholder.svg';};this.src='images/${base}.svg';">
    </div>

    <div class="detail-body reveal">
      ${paras}
    </div>

    ${gallery ? `<div class="detail-gallery reveal">${gallery}</div>` : ''}
  `;
})();

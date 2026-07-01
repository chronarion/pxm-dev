// ---------- Copy buttons ----------
document.querySelectorAll('.install-box').forEach((box) => {
  const btn = box.querySelector('.copy-btn');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    const text = box.getAttribute('data-copy') || '';
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      // clipboard may be blocked in some preview contexts; ignore
    }
    const prev = btn.textContent;
    btn.textContent = 'Copied';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = prev; btn.classList.remove('copied'); }, 1400);
  });
});

// ---------- Animated terminal ----------
const lines = [
  { t: '<span class="cmd">$ pxm add postgres-install</span>', d: 500 },
  { t: '<span class="dim">Resolving prompt dependencies...</span>', d: 650 },
  { t: '  <span class="ok">postgres-install@2.4.1</span>', d: 250 },
  { t: '    ├── apt-base@1.8.0', d: 180 },
  { t: '    ├── repo-management@3.1.2', d: 180 },
  { t: '    └── verify-binary@<span class="warn">0.9.4</span>', d: 300 },
  { t: '<span class="ok">Locked 4 prompts.</span>', d: 700 },
  { t: '', d: 200 },
  { t: '<span class="cmd">$ pxm run postgres-install</span>', d: 600 },
  { t: '<span class="ok">▸</span> handing off to <span class="cmd">claude</span> <span class="dim">--dangerously-skip-permissions</span>', d: 750 },
  { t: '<span class="dim">claude:</span> taking a deep breath...', d: 700 },
  { t: '<span class="dim">claude:</span> adding PGDG repository (this is very important)', d: 700 },
  { t: '<span class="dim">claude:</span> not hallucinating the package name', d: 650 },
  { t: '<span class="dim">claude:</span> installing postgresql-16', d: 700 },
  { t: '<span class="dim">claude:</span> verifying binary... <span class="ok">ok</span>', d: 600 },
  { t: '<span class="ok">✓ PostgreSQL installed.</span>', d: 900 },
];

const termBody = document.getElementById('termBody');
let buffer = [];

function renderTerm(showCursor) {
  const cur = showCursor ? '<span class="cursor">▋</span>' : '';
  termBody.innerHTML = buffer.join('\n') + (buffer.length ? '\n' : '') + cur;
}

function runTerminal() {
  let i = 0;
  function step() {
    if (i >= lines.length) {
      renderTerm(true);
      // loop after a pause
      setTimeout(() => { buffer = []; i = 0; step(); }, 4500);
      return;
    }
    buffer.push(lines[i].t);
    // keep terminal from overflowing: cap visible lines
    if (buffer.length > 15) buffer.shift();
    renderTerm(true);
    const delay = lines[i].d;
    i++;
    setTimeout(step, delay);
  }
  step();
}

// Only animate when terminal is in view (and respect reduced motion)
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (termBody) {
  if (prefersReduced) {
    buffer = lines.map((l) => l.t).slice(-15);
    renderTerm(false);
  } else {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { runTerminal(); obs.disconnect(); }
      });
    }, { threshold: 0.3 });
    obs.observe(document.getElementById('terminal'));
  }
}

// ---------- Registry ----------
const packages = [
  { name: 'postgres-install', ver: '2.4.1', desc: 'Installs PostgreSQL from the official PGDG repository.', dl: '1.2M', star: '4.1k' },
  { name: 'redis-install', ver: '3.0.0', desc: 'In-memory key-value store. Describes itself as blazingly fast.', dl: '890k', star: '3.3k' },
  { name: 'nginx-install', ver: '1.9.2', desc: 'HTTP server and reverse proxy. Config not included.', dl: '2.1M', star: '5.7k' },
  { name: 'docker-install', ver: '5.2.0', desc: 'Container runtime. Depends on group membership and a reboot.', dl: '3.4M', star: '8.2k' },
  { name: 'node-install', ver: '20.11.0', desc: 'JavaScript runtime. Version selection is best-effort.', dl: '2.8M', star: '6.0k' },
  { name: 'verify-binary', ver: '0.9.4', desc: 'Confirms the installed binary exists. Pre-release.', dl: '7.5M', star: '4.4k' },
  { name: 'java-install', ver: '21.0.1', desc: 'Installs a JDK. Emotional support included.', dl: '1.1M', star: '2.1k' },
  { name: 'curl-install', ver: '8.5.0', desc: 'Installs curl. Bootstrap for everything downstream.', dl: '15M', star: '7.7k' },
];

const grid = document.getElementById('pkgGrid');
function pkgCard(p) {
  return `<div class="pkg">
    <div class="pkg-top">
      <span class="pkg-name">${p.name}</span>
      <span class="pkg-ver">${p.ver}</span>
    </div>
    <p class="pkg-desc">${p.desc}</p>
    <div class="pkg-meta">
      <span class="dl">${p.dl}</span>
      <span class="star">${p.star}</span>
    </div>
  </div>`;
}

function renderPkgs(list) {
  if (!list.length) {
    grid.innerHTML = `<div class="pkg-empty">No prompts found. Writing one is straightforward.<br>Publishing it helps the next person.</div>`;
    return;
  }
  grid.innerHTML = list.map(pkgCard).join('');
}
renderPkgs(packages);

const search = document.getElementById('search');
if (search) {
  search.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) { renderPkgs(packages); return; }
    const filtered = packages.filter((p) =>
      p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
    );
    renderPkgs(filtered);
  });
}

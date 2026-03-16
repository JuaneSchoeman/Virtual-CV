/* ═══════════════════════════════════════════
   Juané Schoeman — Portfolio Script
   Loads content from content.json and
   runs all galaxy effects & interactions
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  fetch('content.json')
    .then(res => res.json())
    .then(data => {
      renderAll(data);
      initCursor();
      initGalaxy();
      initTypewriter(data.typewriterPhrases);
      initScrollReveal();
      initMagneticButtons();
    })
    .catch(err => console.error('Could not load content.json:', err));
});

/* ─── RENDER ALL SECTIONS FROM JSON ─── */

function renderAll(data) {
  document.title = `${data.name} — ${data.title}`;
  document.getElementById('yr').textContent = new Date().getFullYear();

  renderHero(data);
  renderStats(data.stats);
  renderSkills(data.skills);
  renderExperience(data.experience);
  fetchGitHubProjects(data.github_username);
  renderEducation(data.education);
  renderCertifications(data.certifications);
  renderVolunteering(data.volunteering);
  renderContact(data.contact);
}

function renderHero(data) {
  const greetingEl = document.getElementById('hero-greeting');
  const nameEl     = document.getElementById('hero-name');
  const bioEl      = document.getElementById('hero-bio');
  if (greetingEl) greetingEl.textContent = data.greeting;
  if (nameEl) {
    const parts = data.name.split(' ');
    nameEl.innerHTML = `${parts[0]}<br/><em>${parts.slice(1).join(' ')}</em>`;
  }
  if (bioEl) bioEl.textContent = data.bio;
}

function renderStats(stats) {
  const container = document.getElementById('stats-list');
  if (!container) return;
  container.innerHTML = stats.map(s => `
    <div class="card-stat">
      <span class="stat-label">${s.label}</span>
      <span class="stat-value ${s.accent ? 'accent' : ''}">${s.value}</span>
    </div>
  `).join('');
}

function renderSkills(skills) {
  const container = document.getElementById('skills-grid');
  if (!container) return;
  container.innerHTML = skills.map(cat => `
    <div class="skill-box">
      <p class="skill-box-title">${cat.category}</p>
      <div class="skill-pills">
        ${cat.items.map(item => `<span class="skill-pill">${item}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderExperience(experience) {
  const container = document.getElementById('exp-list');
  if (!container) return;
  container.innerHTML = experience.map(job => `
    <div class="exp-item">
      <div>
        <p class="exp-date">${job.date}</p>
        <p class="exp-company">${job.company}</p>
      </div>
      <div>
        <h3 class="exp-role">${job.role}</h3>
        <ul class="exp-desc">
          ${job.description.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

/* ─── PROJECTS — AUTO-LOADED FROM GITHUB API ─── */

function fetchGitHubProjects(username) {
  const container = document.getElementById('proj-grid');
  if (!container) return;

  // Show a loading state while fetching
  container.innerHTML = `
    <div class="proj-card placeholder">
      <div class="ph-icon">🌌</div>
      <p>Loading projects from GitHub...</p>
    </div>
  `;

  fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
    .then(res => {
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
      return res.json();
    })
    .then(repos => {
      // Sort by most recently updated (include forks so forked projects like Arcademia show)
      const ownRepos = repos
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

      if (ownRepos.length === 0) {
        container.innerHTML = `
          <div class="proj-card placeholder">
            <div class="ph-icon">🌌</div>
            <p>No public repositories found yet.</p>
          </div>
        `;
        return;
      }

      const cards = ownRepos.map((repo, i) => {
        const num       = String(i + 1).padStart(3, '0');
        const desc      = repo.description || 'No description provided yet.';
        const language  = repo.language ? `<span class="proj-tag">${repo.language}</span>` : '';
        const liveLink  = repo.homepage
          ? `<a href="${repo.homepage}" target="_blank">Live →</a>`
          : '';
        const updatedAt = new Date(repo.updated_at).toLocaleDateString('en-ZA', { year: 'numeric', month: 'short' });

        return `
          <div class="proj-card">
            <div class="proj-card-top">
              <span class="proj-num">${num}</span>
              <div class="proj-links-top">
                <a href="${repo.html_url}" target="_blank">GitHub →</a>
                ${liveLink}
              </div>
            </div>
            <h3 class="proj-title">${repo.name}</h3>
            <p class="proj-desc">${desc}</p>
            <div class="proj-stack">
              ${language}
              <span class="proj-tag">Updated ${updatedAt}</span>
              ${repo.stargazers_count > 0 ? `<span class="proj-tag">★ ${repo.stargazers_count}</span>` : ''}
            </div>
          </div>
        `;
      }).join('');

      container.innerHTML = cards;

      // Re-run scroll reveal on the newly added cards
      const cardObs = new IntersectionObserver(entries => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 110);
            cardObs.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      container.querySelectorAll('.proj-card').forEach(el => cardObs.observe(el));
    })
    .catch(err => {
      console.error('Could not load GitHub repos:', err);
      container.innerHTML = `
        <div class="proj-card placeholder">
          <div class="ph-icon">⚠️</div>
          <p>Could not load projects from GitHub.<br/>Check back soon!</p>
        </div>
      `;
    });
}

function renderEducation(education) {
  const container = document.getElementById('edu-grid');
  if (!container) return;
  container.innerHTML = education.map(edu => `
    <div class="edu-card">
      <p class="edu-year">${edu.year}</p>
      <h3 class="edu-degree">${edu.degree}</h3>
      <p class="edu-school">${edu.institution}</p>
    </div>
  `).join('');
}

function renderCertifications(certifications) {
  const container = document.getElementById('cert-grid');
  if (!container || !certifications) return;
  container.innerHTML = certifications.map(c => `
    <a class="cert-card" href="${c.url}" target="_blank" rel="noopener noreferrer">
      <p class="cert-issuer">${c.issuer}</p>
      <h3 class="cert-title">${c.title}</h3>
      <div class="cert-footer">
        <span class="cert-year">${c.year}</span>
        <span class="cert-link">View Certificate →</span>
      </div>
    </a>
  `).join('');
}

function renderVolunteering(volunteering) {
  const container = document.getElementById('vol-list');
  if (!container || !volunteering) return;
  container.innerHTML = volunteering.map(v => `
    <div class="exp-item">
      <div>
        <p class="exp-date">${v.date}</p>
        <p class="exp-company">${v.organisation}</p>
      </div>
      <div>
        <h3 class="exp-role">${v.role}</h3>
        <ul class="exp-desc">
          ${v.description.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

function renderContact(contact) {
  const emailEl    = document.getElementById('contact-email');
  const githubEl   = document.getElementById('contact-github');
  const linkedinEl = document.getElementById('contact-linkedin');
  if (emailEl)    emailEl.href    = `mailto:${contact.email}`;
  if (githubEl)   githubEl.href   = contact.github;
  if (linkedinEl) linkedinEl.href = contact.linkedin;
}

/* ─── CUSTOM CURSOR ─── */

function initCursor() {
  const dot  = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function tick() {
    dot.style.left  = mx + 'px'; dot.style.top  = my + 'px';
    rx += (mx - rx) * 0.12;     ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(tick);
  })();
}

/* ─── GALAXY CANVAS (nebula blobs + stars + shooting stars) ─── */

function initGalaxy() {
  const canvas = document.getElementById('nebula-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, stars = [], nebulae = [], shooters = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildNebulae(); buildStars();
  }

  function buildNebulae() {
    nebulae = [
      { x: W*0.50, y: H*0.45, rx: W*0.55, ry: H*0.55, colors: ['rgba(80,20,140,0.28)',  'rgba(60,10,110,0.12)',  'transparent'] },
      { x: W*0.82, y: H*0.18, rx: W*0.38, ry: H*0.32, colors: ['rgba(140,60,220,0.22)', 'rgba(168,85,247,0.08)', 'transparent'] },
      { x: W*0.12, y: H*0.55, rx: W*0.32, ry: H*0.28, colors: ['rgba(30,80,200,0.18)',  'rgba(96,165,250,0.07)', 'transparent'] },
      { x: W*0.75, y: H*0.80, rx: W*0.30, ry: H*0.28, colors: ['rgba(180,40,120,0.16)', 'rgba(244,114,182,0.06)','transparent'] },
      { x: W*0.08, y: H*0.14, rx: W*0.22, ry: H*0.18, colors: ['rgba(20,160,140,0.13)', 'rgba(45,212,191,0.05)', 'transparent'] },
      { x: W*0.50, y: H*1.05, rx: W*0.60, ry: H*0.45, colors: ['rgba(90,20,160,0.18)',  'rgba(168,85,247,0.06)', 'transparent'] },
    ];
  }

  function buildStars() {
    stars = Array.from({ length: 320 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.8 + 0.15,
      speed: Math.random() * 0.14 + 0.02,
      tw: Math.random() * 0.025 + 0.004,
      twOff: Math.random() * Math.PI * 2,
      c: Math.random() < 0.10 ? 'pink'
       : Math.random() < 0.22 ? 'blue'
       : Math.random() < 0.32 ? 'purple'
       : 'white'
    }));
  }

  function spawnShooter() {
    shooters.push({
      x: Math.random() * W * 0.7,
      y: Math.random() * H * 0.5,
      len: 90 + Math.random() * 110,
      speed: 9 + Math.random() * 7,
      alpha: 1,
      angle: Math.PI / 5 + (Math.random() - 0.5) * 0.4
    });
  }
  setInterval(spawnShooter, 2800);

  resize();
  window.addEventListener('resize', resize);

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    frame++;

    // Nebula blobs
    nebulae.forEach(n => {
      ctx.save();
      ctx.scale(1, n.ry / n.rx);
      const yS = n.y * (n.rx / n.ry);
      const g  = ctx.createRadialGradient(n.x, yS, 0, n.x, yS, n.rx);
      n.colors.forEach((c, i) => g.addColorStop(i / (n.colors.length - 1), c));
      ctx.beginPath(); ctx.arc(n.x, yS, n.rx, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
      ctx.restore();
    });

    // Stars
    stars.forEach(s => {
      const alpha = 0.08 + 0.88 * (0.5 + 0.5 * Math.sin(frame * s.tw + s.twOff));
      const color =
          s.c === 'purple' ? `rgba(168,85,247,${alpha})`
        : s.c === 'pink'   ? `rgba(244,114,182,${alpha * 0.85})`
        : s.c === 'blue'   ? `rgba(96,165,250,${alpha * 0.85})`
        :                    `rgba(240,235,255,${alpha * 0.65})`;
      if (s.r > 1.1) {
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 3.8, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(/[\d.]+\)$/, `${alpha * 0.08})`); ctx.fill();
      }
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = color; ctx.fill();
      s.y -= s.speed;
      if (s.y < -3) { s.y = H + 3; s.x = Math.random() * W; }
    });

    // Shooting stars
    shooters.forEach(sh => {
      ctx.save(); ctx.globalAlpha = sh.alpha;
      const tx = sh.x - Math.cos(sh.angle) * sh.len;
      const ty = sh.y - Math.sin(sh.angle) * sh.len;
      const g  = ctx.createLinearGradient(sh.x, sh.y, tx, ty);
      g.addColorStop(0,   'rgba(220,180,255,0.95)');
      g.addColorStop(0.4, 'rgba(168,85,247,0.5)');
      g.addColorStop(1,   'transparent');
      ctx.strokeStyle = g; ctx.lineWidth = 1.6;
      ctx.shadowBlur = 12; ctx.shadowColor = 'rgba(168,85,247,0.8)';
      ctx.beginPath(); ctx.moveTo(sh.x, sh.y); ctx.lineTo(tx, ty); ctx.stroke();
      ctx.restore();
      sh.x += Math.cos(sh.angle) * sh.speed;
      sh.y += Math.sin(sh.angle) * sh.speed;
      sh.alpha -= 0.014;
    });
    shooters = shooters.filter(s => s.alpha > 0);

    requestAnimationFrame(draw);
  }
  draw();
}

/* ─── TYPEWRITER ─── */

function initTypewriter(phrases) {
  const el = document.getElementById('typed');
  if (!el) return;
  let pi = 0, ci = 0, deleting = false;
  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 45 : 80);
  }
  type();
}

/* ─── SCROLL REVEAL ─── */

function initScrollReveal() {
  // Section-level fade in
  const secObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in-view'); secObs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.sec-reveal').forEach(el => secObs.observe(el));

  // Card-level stagger reveal
  const cardObs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 110);
        cardObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  // Re-query after JSON render (slight delay to allow DOM update)
  setTimeout(() => {
    document.querySelectorAll('.exp-item, .proj-card, .edu-card, .cert-card').forEach(el => cardObs.observe(el));
  }, 100);
}

/* ─── MAGNETIC BUTTONS ─── */

function initMagneticButtons() {
  // Magnetic buttons removed
}
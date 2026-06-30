/* ============================================================
   KRYZEN AI PORTFOLIO v2.0 — Main Engine
   Features: Particles, Konami, Voice, OpenAI, Blog, PWA
   ============================================================ */
const D = window.DATA;
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const T = window.I18N;

let particles = [], trailPoints = [];
let voiceEnabled = false, speechEnabled = false;
let recognition = null, synth = window.speechSynthesis;

/* =========== MATRIX RAIN =========== */
function initMatrix(){
  const c = $('#bgCanvas'), ctx = c.getContext('2d');
  let w, h, drops = [];
  const fontSize = 16;
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  const resize = () => {
    w = c.width = innerWidth; h = c.height = innerHeight;
    drops = Array(Math.floor(w / fontSize)).fill(0).map(() => Math.random() * -100);
  };
  resize(); window.addEventListener('resize', resize);
  const draw = () => {
    ctx.fillStyle = 'rgba(9,9,11,0.05)';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(0,212,255,0.5)';
    ctx.font = fontSize + 'px monospace';
    for (let i = 0; i < drops.length; i++){
      const txt = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(txt, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > h && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    requestAnimationFrame(draw);
  };
  draw();
}

/* =========== PARTICLE SYSTEM =========== */
function initParticles(){
  const c = $('#particleCanvas'), ctx = c.getContext('2d');
  let w, h;
  const resize = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
  resize(); window.addEventListener('resize', resize);
  const COUNT = window.innerWidth < 768 ? 40 : 80;
  particles = Array.from({ length: COUNT }, () => ({
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.5 + 0.5
  }));
  let mouseX = -1000, mouseY = -1000;
  window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    const color = getComputedStyle(document.body).getPropertyValue('--neon').trim() || '#00D4FF';
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.5;
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      // mouse repulsion
      const dx = p.x - mouseX, dy = p.y - mouseY;
      const dist = Math.hypot(dx, dy);
      if (dist < 100){
        const force = (100 - dist) / 100;
        p.x += (dx / dist) * force * 2;
        p.y += (dy / dist) * force * 2;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    // connections
    for (let i = 0; i < particles.length; i++){
      for (let j = i + 1; j < particles.length; j++){
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120){
          ctx.globalAlpha = 1 - dist / 120;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
    requestAnimationFrame(draw);
  };
  draw();
}

/* =========== CURSOR GLOW + TRAIL =========== */
function initCursor(){
  const glow = $('#cursorGlow');
  const c = $('#trailCanvas'), ctx = c.getContext('2d');
  let w, h;
  const resize = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
  resize(); window.addEventListener('resize', resize);

  window.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    trailPoints.push({ x: e.clientX, y: e.clientY, t: Date.now() });
    if (trailPoints.length > 30) trailPoints.shift();
  });

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    const color = getComputedStyle(document.body).getPropertyValue('--neon').trim() || '#00D4FF';
    const now = Date.now();
    trailPoints = trailPoints.filter(p => now - p.t < 600);
    for (let i = 0; i < trailPoints.length - 1; i++){
      const p1 = trailPoints[i], p2 = trailPoints[i + 1];
      const age = (now - p1.t) / 600;
      ctx.globalAlpha = (1 - age) * 0.6;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2 * (1 - age);
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  };
  draw();
}

/* =========== KONAMI CODE =========== */
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;
function initKonami(){
  window.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    const expected = KONAMI[konamiIdx].toLowerCase();
    if (key === expected){
      konamiIdx++;
      if (konamiIdx === KONAMI.length){
        $('#konamiOverlay').classList.add('show');
        App.toast('🎮 KONAMI CODE ACTIVATED!', 'ok');
        // bonus: confetti
        spawnConfetti();
        konamiIdx = 0;
      }
    } else {
      konamiIdx = 0;
    }
  });
}
function spawnConfetti(){
  const colors = ['#00D4FF','#8B5CF6','#ec4899','#10b981','#f59e0b'];
  for (let i = 0; i < 50; i++){
    const c = document.createElement('div');
    c.style.cssText = `position:fixed;top:-10px;left:${Math.random()*100}vw;width:10px;height:10px;background:${colors[Math.floor(Math.random()*colors.length)]};z-index:9998;border-radius:2px;transition:all 2s ease-out`;
    document.body.appendChild(c);
    requestAnimationFrame(() => {
      c.style.top = '110vh';
      c.style.transform = `rotate(${Math.random()*720}deg)`;
    });
    setTimeout(() => c.remove(), 2200);
  }
}

/* =========== KEYBOARD SHORTCUTS =========== */
function initShortcuts(){
  const map = { '1':'home','2':'about','3':'projects','4':'blog','5':'skills','6':'experience','7':'contact','0':'home' };
  window.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'Escape'){
      const cp = $('#chatPanel'); if (cp.classList.contains('open')) cp.classList.remove('open');
      const ko = $('#konamiOverlay'); if (ko.classList.contains('show')) ko.classList.remove('show');
    }
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const page = map[e.key];
    if (page) App.go(page);
    if (e.key === '/'){ e.preventDefault(); $('#chatInput').focus(); }
    if (e.key === 'c' && !e.ctrlKey && !e.metaKey) App.toggleChat();
    if (e.key === 't' && !e.ctrlKey && !e.metaKey){
      // cycle theme
      const themes = ['cyan','purple','pink','green','amber'];
      const cur = document.documentElement.dataset.theme || 'cyan';
      const next = themes[(themes.indexOf(cur) + 1) % themes.length];
      App.setTheme(next);
    }
  });
}

/* =========== ANIMATE COUNTERS =========== */
function animateCounters(){
  $$('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const duration = 1500;
    const start = performance.now();
    const suffix = target === 100 ? '%' : '+';
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
  });
}

/* =========== PAGES =========== */
const Pages = {
  about(){
    const p = D.profile;
    return `
      <section class="fade-in">
        <div class="section-header">
          <span class="section-tag">01 / ABOUT</span>
          <h2 class="section-title">${T[currentLang]?.section_about || 'MEN HAQIMDA'}</h2>
          <p class="section-subtitle">Qisqacha ma'lumot va ko'rsatkichlar</p>
        </div>
        <div class="about-grid">
          <div class="about-text">
            <h3>${p.name}</h3>
            <p>${p.bio}</p>
            <p>${p.bio2}</p>
            <div class="hero-stats" style="margin-top:24px">
              ${D.achievements.map(a => `
                <div class="stat" style="grid-column: span 2">
                  <div style="font-size:32px">${a.icon}</div>
                  <div style="font-weight:700;font-size:16px;margin-top:8px">${a.title}</div>
                  <div class="stat-label" style="margin-top:4px">${a.desc}</div>
                </div>`).join('')}
            </div>
          </div>
          <div>
            <div class="about-info">
              <div class="info-item"><div class="info-label">Ism</div><div class="info-value">${p.name}</div></div>
              <div class="info-item"><div class="info-label">Rol</div><div class="info-value">${p.role}</div></div>
              <div class="info-item"><div class="info-label">Joylashuv</div><div class="info-value">${p.location}</div></div>
              <div class="info-item"><div class="info-label">Tajriba</div><div class="info-value">${p.years}+ yil</div></div>
              <div class="info-item"><div class="info-label">Email</div><div class="info-value">${p.email}</div></div>
              <div class="info-item"><div class="info-label">GitHub</div><div class="info-value">KRYZENSYS</div></div>
            </div>
            <div style="margin-top:20px;padding:24px" class="glass">
              <div class="skill-cat-title" style="margin-bottom:14px">🗣️ Tillar</div>
              ${p.languages.map(l => `<div style="padding:6px 0;border-bottom:1px solid var(--bord)"><span style="color:var(--mut)">▸</span> ${l}</div>`).join('')}
            </div>
            <div class="gh-stats" style="margin-top:20px" id="ghStats">
              <div class="gh-stat"><div class="gh-stat-num" data-target="50">0</div><div class="gh-stat-label">Repos</div></div>
              <div class="gh-stat"><div class="gh-stat-num" data-target="500">0</div><div class="gh-stat-label">Stars</div></div>
              <div class="gh-stat"><div class="gh-stat-num" data-target="1200">0</div><div class="gh-stat-label">Commits</div></div>
              <div class="gh-stat"><div class="gh-stat-num" data-target="15">0</div><div class="gh-stat-label">PRs</div></div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  blog(){
    return `
      <section class="fade-in">
        <div class="section-header">
          <span class="section-tag">02 / BLOG</span>
          <h2 class="section-title">${T[currentLang]?.section_blog || 'BLOG'}</h2>
          <p class="section-subtitle">Texnologiya, AI va dasturlash haqida maqolalar</p>
        </div>
        <div class="blog-grid">
          ${(D.posts || []).map(post => `
            <article class="blog-card" onclick="App.openBlogPost(${post.id})">
              <div class="blog-meta">
                <span class="blog-cat">${post.category}</span>
                <span>📅 ${post.date}</span>
                <span>⏱️ ${post.readTime} min</span>
              </div>
              <h3 class="blog-title">${post.title}</h3>
              <p class="blog-excerpt">${post.excerpt}</p>
              <div class="blog-stats">
                <span>👁️ ${post.views}</span>
                <span>💬 ${post.comments}</span>
                <span>❤️ ${post.likes}</span>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  },

  projects(filter = 'all'){
    const list = filter === 'all' ? D.projects : D.projects.filter(p => p.category === filter);
    const cats = ['all', 'web', 'web3', 'ai', 'app'];
    return `
      <section class="fade-in">
        <div class="section-header">
          <span class="section-tag">03 / PROJECTS</span>
          <h2 class="section-title">${T[currentLang]?.section_projects || 'LOYIHALAR'}</h2>
          <p class="section-subtitle">So'nggi ishlarim va portfolio namunalari</p>
        </div>
        <div class="project-filters">
          ${cats.map(c => `<button class="filter-btn ${filter===c?'active':''}" data-cat="${c}" onclick="App.go('projects','${c}')">${c === 'all' ? '🌐 All' : c.toUpperCase()}</button>`).join('')}
        </div>
        <div class="projects-grid">
          ${list.map((p, i) => `
            <div class="project-card" onclick="App.openProject(${p.id})">
              <div class="project-thumb" style="background:linear-gradient(135deg, hsl(${i*60},70%,55%), hsl(${i*60+60},70%,55%))">
                <span style="font-size:80px">${p.thumb}</span>
                <span class="project-status ${p.status}">${p.status === 'live' ? '● LIVE' : p.status === 'dev' ? '● DEV' : '● IDEA'}</span>
              </div>
              <div class="project-body">
                <h3 class="project-title">${p.name}</h3>
                <p class="project-desc">${p.desc}</p>
                <div class="project-tech">${p.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}</div>
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;color:var(--mut);margin-bottom:12px">
                  <span>📅 ${p.year}</span><span>🏷️ ${p.category}</span>
                </div>
                <div class="project-actions">
                  ${p.demo !== '#' ? `<a href="${p.demo}" target="_blank" class="project-link" onclick="event.stopPropagation()">🌐 Demo</a>` : '<span class="project-link" style="opacity:0.5;cursor:default">🔒 Demo yoq</span>'}
                  ${p.github ? `<a href="${p.github}" target="_blank" class="project-link" onclick="event.stopPropagation()">💻 GitHub</a>` : '<span class="project-link" style="opacity:0.5;cursor:default">🔒 Private</span>'}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },

  skills(){
    return `
      <section class="fade-in">
        <div class="section-header">
          <span class="section-tag">04 / SKILLS</span>
          <h2 class="section-title">${T[currentLang]?.section_skills || 'KO\\'NIKMALAR'}</h2>
          <p class="section-subtitle">Mening bilim va tajriba darajam</p>
        </div>
        <div class="skills-grid">
          ${D.skills.map(cat => `
            <div class="skill-cat">
              <div class="skill-cat-title">${cat.icon} ${cat.category}</div>
              ${cat.items.map(s => `
                <div class="skill">
                  <div class="skill-head">
                    <span class="skill-name">${s.name}</span>
                    <span class="skill-pct">${s.level}%</span>
                  </div>
                  <div class="skill-bar"><div class="skill-fill" data-width="${s.level}"></div></div>
                </div>`).join('')}
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },

  experience(){
    return `
      <section class="fade-in">
        <div class="section-header">
          <span class="section-tag">05 / EXPERIENCE</span>
          <h2 class="section-title">${T[currentLang]?.section_experience || 'TAJRIBA'}</h2>
          <p class="section-subtitle">Professional karyera yo'li</p>
        </div>
        <div class="timeline">
          ${D.experience.map(e => `
            <div class="timeline-item">
              <div class="timeline-date">${e.date}</div>
              <div class="timeline-title">${e.title}</div>
              <div class="timeline-company">${e.company}</div>
              <div class="timeline-desc">${e.desc}</div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },

  contact(){
    const p = D.profile;
    return `
      <section class="fade-in">
        <div class="section-header">
          <span class="section-tag">06 / CONTACT</span>
          <h2 class="section-title">${T[currentLang]?.section_contact || 'BOG\\'LANISH'}</h2>
          <p class="section-subtitle">Loyiha yoki hamkorlik uchun</p>
        </div>
        <div class="contact-grid">
          <div class="contact-info">
            <h3>Keling, gaplashaylik 🤝</h3>
            <p>Yangi loyiha, hamkorlik yoki shunchaki savol — har qanday holatda yozing. Tez orada javob beraman!</p>
            <a href="mailto:${p.email}" class="contact-item" style="text-decoration:none">
              <div class="contact-icon">📧</div>
              <div class="info"><div class="info-label">Email</div><div class="info-value">${p.email}</div></div>
            </a>
            <a href="${p.telegram}" target="_blank" class="contact-item" style="text-decoration:none">
              <div class="contact-icon">💬</div>
              <div class="info"><div class="info-label">Telegram</div><div class="info-value">@KRYZENVIP</div></div>
            </a>
            <a href="${p.github}" target="_blank" class="contact-item" style="text-decoration:none">
              <div class="contact-icon">💻</div>
              <div class="info"><div class="info-label">GitHub</div><div class="info-value">@KRYZENSYS</div></div>
            </a>
            <a href="${p.instagram}" target="_blank" class="contact-item" style="text-decoration:none">
              <div class="contact-icon">📷</div>
              <div class="info"><div class="info-label">Instagram</div><div class="info-value">@KRYZENVIP</div></div>
            </a>
          </div>
          <form class="contact-form" onsubmit="App.submitForm(event)">
            <div class="form-group"><input class="form-input" name="name" placeholder="Ismingiz" required></div>
            <div class="form-group"><input class="form-input" name="email" type="email" placeholder="Email" required></div>
            <div class="form-group"><input class="form-input" name="subject" placeholder="Mavzu"></div>
            <div class="form-group"><textarea class="form-textarea" name="message" placeholder="Xabaringiz..." required></textarea></div>
            <button type="submit" class="form-submit">${T[currentLang]?.send_btn || '📤 Yuborish'}</button>
          </form>
        </div>
      </section>
    `;
  }
};

/* =========== APP CONTROLLER =========== */
window.currentLang = localStorage.getItem('kryzen_lang') || 'uz';
window.App = {
  go(page, ...args){
    if (!Pages[page]) return;
    $$('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.page === page));
    if (page === 'home'){
      document.getElementById('main').innerHTML = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById('main').innerHTML = Pages[page](...args);
    if (page === 'skills'){
      setTimeout(() => $$('.skill-fill').forEach(el => el.style.width = el.dataset.width + '%'), 100);
    }
    if (page === 'about'){
      setTimeout(() => this.animateGhStats(), 200);
    }
    window.scrollTo({ top: 600, behavior: 'smooth' });
  },

  animateGhStats(){
    $$('.gh-stat-num').forEach(el => {
      const target = parseInt(el.dataset.target);
      const duration = 1200;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(p * target) + '+';
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + '+';
      };
      requestAnimationFrame(step);
    });
  },

  setTheme(theme){
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('kryzen_theme', theme);
    $$('.theme-btn').forEach(b => b.classList.toggle('active', b.dataset.theme === theme));
    App.toast('🎨 Theme: ' + theme, 'ok');
  },

  openProject(id){
    const p = D.projects.find(x => x.id === id);
    if (!p) return;
    const m = document.createElement('div');
    m.style.cssText = 'position:fixed;inset:0;z-index:5000;background:rgba(0,0,0,0.85);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn 0.3s';
    m.innerHTML = `
      <div style="max-width:600px;width:100%;background:var(--bg-2);border:1px solid var(--bord-2);border-radius:20px;padding:32px;position:relative">
        <button onclick="this.parentElement.parentElement.remove()" style="position:absolute;top:16px;right:16px;width:36px;height:36px;border-radius:50%;background:var(--glass-2);color:var(--fg);font-size:18px">✕</button>
        <div style="font-size:60px;margin-bottom:16px">${p.thumb}</div>
        <h2 style="font-size:28px;margin-bottom:8px">${p.name}</h2>
        <p style="color:var(--mut);margin-bottom:20px;line-height:1.7">${p.desc}</p>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px">${p.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}</div>
        <div style="display:flex;gap:12px">
          ${p.demo !== '#' ? `<a href="${p.demo}" target="_blank" class="btn primary">🌐 Demo</a>` : ''}
          ${p.github ? `<a href="${p.github}" target="_blank" class="btn ghost">💻 GitHub</a>` : ''}
        </div>
      </div>
    `;
    document.body.appendChild(m);
    m.addEventListener('click', e => { if (e.target === m) m.remove(); });
  },

  openBlogPost(id){
    const post = (D.posts || []).find(p => p.id === id);
    if (!post) return;
    const m = document.createElement('div');
    m.style.cssText = 'position:fixed;inset:0;z-index:5000;background:rgba(0,0,0,0.9);backdrop-filter:blur(15px);display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn 0.3s;overflow-y:auto';
    m.innerHTML = `
      <div style="max-width:800px;width:100%;background:var(--bg-2);border:1px solid var(--bord-2);border-radius:20px;padding:40px;position:relative;margin:auto">
        <button onclick="this.parentElement.parentElement.remove()" style="position:absolute;top:16px;right:16px;width:36px;height:36px;border-radius:50%;background:var(--glass-2);color:var(--fg);font-size:18px">✕</button>
        <div style="display:flex;gap:12px;margin-bottom:20px;font-size:12px;color:var(--mut)">
          <span class="blog-cat">${post.category}</span>
          <span>📅 ${post.date}</span>
          <span>⏱️ ${post.readTime} min</span>
        </div>
        <h1 style="font-size:36px;margin-bottom:20px;line-height:1.2">${post.title}</h1>
        <div style="color:var(--mut);line-height:1.8;font-size:16px;white-space:pre-wrap">${post.content}</div>
        <div style="margin-top:30px;padding-top:20px;border-top:1px solid var(--bord);display:flex;gap:16px;color:var(--mut);font-size:14px">
          <span>👁️ ${post.views} views</span>
          <span>💬 ${post.comments} comments</span>
          <span>❤️ ${post.likes} likes</span>
        </div>
      </div>
    `;
    document.body.appendChild(m);
    m.addEventListener('click', e => { if (e.target === m) m.remove(); });
  },

  submitForm(e){
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const text = `Salom! Men ${data.name}.\n\n${data.message}\n\nEmail: ${data.email}`;
    App.toast('Telegram ochilmoqda...', 'ok');
    window.open(`https://t.me/KRYZENVIP?text=${encodeURIComponent(text)}`, '_blank');
  },

  toggleChat(force){
    const p = $('#chatPanel');
    if (force === true) p.classList.add('open');
    else p.classList.toggle('open');
    if (p.classList.contains('open') && !$('#chatSuggestions').children.length) this.initSuggestions();
  },

  initSuggestions(){
    const lang = currentLang;
    const sg = $('#chatSuggestions');
    const suggestions = {
      uz: ['Eng yaxshi loyihang?', 'React bilasanmi?', 'Narxlar qancha?', 'AI nima qila oladi?'],
      en: ['Best project?', 'Do you know React?', 'Pricing?', 'What can AI do?'],
      ru: ['Лучший проект?', 'React знаешь?', 'Цены?', 'Что умеет AI?']
    };
    sg.innerHTML = (suggestions[lang] || suggestions.uz).map(s =>
      `<span class="suggestion" onclick="Chat.ask('${s}');this.parentElement.style.display='none'">${s}</span>`
    ).join('');
  },

  toggleMusic(){
    const music = $('#bgMusic');
    const icon = $('#musicIcon');
    if (music.paused){
      music.volume = 0.3;
      music.play().then(() => {
        icon.textContent = '🔊';
        App.toast('🎵 Music on', 'ok');
      }).catch(() => App.toast('❌ Autoplay blocked', 'err'));
    } else {
      music.pause();
      icon.textContent = '🔇';
      App.toast('🔇 Music off', 'ok');
    }
  },

  toast(msg, type = 'ok'){
    const z = $('#toastZone');
    const t = document.createElement('div');
    t.className = 'toast ' + type;
    t.textContent = msg;
    z.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  }
};

/* =========== CHAT AI ENGINE v2 =========== */
window.Chat = {
  apiKey: null,
  speech: false,

  async ask(text){
    if (!text.trim()) return;
    const sg = $('#chatSuggestions');
    if (sg) sg.style.display = 'none';

    const msgs = $('#chatMessages');
    // User
    msgs.insertAdjacentHTML('beforeend', `
      <div class="msg user"><div class="msg-avatar">S</div><div class="msg-body"><div class="msg-name">Siz</div><div class="msg-text">${this.escape(text)}</div></div></div>
    `);
    // AI typing
    const aiId = 'ai-' + Date.now();
    msgs.insertAdjacentHTML('beforeend', `
      <div class="msg ai" id="${aiId}"><div class="msg-avatar">🤖</div><div class="msg-body"><div class="msg-name">KRYZEN AI</div><div class="msg-text typing">.</div></div></div>
    `);
    msgs.scrollTop = msgs.scrollHeight;
    const inp = $('#chatInput');
    const userText = text;
    inp.value = '';

    // Get response
    let response;
    if (this.apiKey){
      try {
        response = await this.askOpenAI(userText);
      } catch(e){
        response = this.respond(userText) + '<br><br><em>⚠️ OpenAI error, fallback to local</em>';
      }
    } else {
      await new Promise(r => setTimeout(r, 600 + Math.random() * 700));
      response = this.respond(userText);
    }

    const aiEl = document.getElementById(aiId);
    if (aiEl){
      aiEl.querySelector('.msg-text').classList.remove('typing');
      aiEl.querySelector('.msg-text').innerHTML = response;
      msgs.scrollTop = msgs.scrollHeight;

      // Speak if enabled
      if (this.speech && synth){
        const u = new SpeechSynthesisUtterance(response.replace(/<[^>]*>/g, ''));
        u.lang = currentLang === 'en' ? 'en-US' : currentLang === 'ru' ? 'ru-RU' : 'uz-UZ';
        u.rate = 1;
        synth.cancel();
        synth.speak(u);
      }
    }
    this.save(userText, response);
  },

  async askOpenAI(text){
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.apiKey
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: `Sen KRYZEN ning AI yordamchisisan. KRYZEN — 5+ yil tajribaga ega full-stack dasturchi va AI engineer. U O'zbekistonda ishlaydi. Web, AI, va mobil ilovalar yaratadi. Qisqa va do'stona javob ber. ${currentLang === 'en' ? 'Reply in English.' : currentLang === 'ru' ? 'Reply in Russian.' : "O'zbek tilida javob ber."}` },
          { role: 'user', content: text }
        ],
        max_tokens: 200,
        temperature: 0.7
      })
    });
    if (!r.ok) throw new Error('OpenAI error');
    const data = await r.json();
    return data.choices[0].message.content.trim();
  },

  setApiKey(k){
    this.apiKey = k;
    localStorage.setItem('kryzen_openai_key', k);
    const badge = $('#aiBadge');
    if (badge){
      badge.textContent = 'AI';
      badge.classList.remove('mock');
    }
    App.toast('🤖 OpenAI connected!', 'ok');
  },

  respond(input){
    const msg = input.toLowerCase().trim();
    const kb = D.ai.knowledge;
    for (const key in kb){
      if (msg.includes(key)) return kb[key];
    }
    const rules = [
      { match: ['kitob','bookfinder','book'], reply: kb.bookfinder },
      { match: ['blockverse','web3','blockchain'], reply: kb.blockverse },
      { match: ['telegram','tg','bot','mira'], reply: kb.telegram },
      { match: ['github','git','repo'], reply: kb.github },
      { match: ['instagram','insta','ig'], reply: kb.instagram },
      { match: ['react','frontend'], reply: kb.react },
      { match: ['python','django','flask'], reply: kb.python },
      { match: ['openai','gpt','claude','ai','ml'], reply: kb.ai },
      { match: ['narx','pul','$','dollar','price','cost'], reply: kb.narx },
      { match: ['mudd','vaqt','time','deadline'], reply: kb.muddat },
      { match: ['ish','work','job','employ','hire'], reply: kb.ish },
      { match: ['aloqa','contact','yozish','email'], reply: kb.email },
      { match: ['rahmat','spasibo','thanks','thank'], reply: kb.rahmat },
      { match: ['salom','hello','hi','privet'], reply: kb.salom },
      { match: ['hayr','bye','xayr'], reply: kb.hayr },
      { match: ['api key','apikey','openai key','kriptografik kalit'], reply: '🔑 OpenAI API kalitni "API key" deb yozing yoki so\\'rang. Format: <code>sk-...</code> yoki shunchaki kalitni yuboring. Xavfsiz saqlanadi!' }
    ];
    for (const r of rules){
      if (r.match.some(m => msg.includes(m))) return r.reply;
    }
    if (msg.endsWith('?') || msg.endsWith('?')){
      return "Yaxshi savol! 😄 Aniqroq aytib bera olasizmi? <br><br>Misol: <em>\"React bilasanmi?\"</em>, <em>\"Eng yaxshi loyihang qaysi?\"</em>, <em>\"Narxlar qancha?\"</em>";
    }
    return kb.default;
  },

  escape(s){
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  },

  save(q, a){
    try {
      const hist = JSON.parse(localStorage.getItem('kryzen_chat') || '[]');
      hist.push({ q, a, t: Date.now() });
      if (hist.length > 30) hist.shift();
      localStorage.setItem('kryzen_chat', JSON.stringify(hist));
    } catch(e){}
  },

  clear(){
    const m = $('#chatMessages');
    m.innerHTML = `<div class="msg ai"><div class="msg-avatar">🤖</div><div class="msg-body"><div class="msg-name">KRYZEN AI</div><div class="msg-text">${T[currentLang]?.ai_welcome || ''}</div></div></div>`;
    localStorage.removeItem('kryzen_chat');
    App.toast('🗑️ Chat cleared', 'ok');
  },

  load(){
    try {
      const hist = JSON.parse(localStorage.getItem('kryzen_chat') || '[]');
      const msgs = $('#chatMessages');
      hist.slice(-10).forEach(h => {
        msgs.insertAdjacentHTML('beforeend', `
          <div class="msg user"><div class="msg-avatar">S</div><div class="msg-body"><div class="msg-name">Siz</div><div class="msg-text">${this.escape(h.q)}</div></div></div>
          <div class="msg ai"><div class="msg-avatar">🤖</div><div class="msg-body"><div class="msg-name">KRYZEN AI</div><div class="msg-text">${h.a}</div></div></div>
        `);
      });
    } catch(e){}
  },

  toggleVoice(){
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)){
      App.toast('❌ Voice input not supported', 'err');
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (recognition && voiceEnabled){
      recognition.stop();
      voiceEnabled = false;
      $('#voiceBtn').classList.remove('active');
      return;
    }
    recognition = new SR();
    recognition.lang = currentLang === 'en' ? 'en-US' : currentLang === 'ru' ? 'ru-RU' : 'uz-UZ';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      $('#chatInput').value = text;
      this.ask(text);
    };
    recognition.onend = () => {
      voiceEnabled = false;
      $('#voiceBtn').classList.remove('active');
    };
    recognition.onerror = (e) => {
      App.toast('❌ Voice error: ' + e.error, 'err');
      voiceEnabled = false;
      $('#voiceBtn').classList.remove('active');
    };
    recognition.start();
    voiceEnabled = true;
    $('#voiceBtn').classList.add('active');
    App.toast('🎤 Listening...', 'ok');
  },

  toggleSpeech(){
    this.speech = !this.speech;
    $('#speechBtn').classList.toggle('active', this.speech);
    App.toast(this.speech ? '🔊 Voice ON' : '🔇 Voice OFF', 'ok');
  }
};

/* =========== PWA =========== */
let deferredPrompt = null;
function initPWA(){
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    setTimeout(() => {
      if (!localStorage.getItem('kryzen_pwa_dismissed')){
        App.toast('💾 Saytni o\'rnatib oling: URL → Install App', 'warn');
      }
    }, 30000);
  });

  if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').then(r => console.log('SW registered')).catch(e => console.log('SW failed', e));
  }
}

/* =========== INIT =========== */
window.addEventListener('DOMContentLoaded', () => {
  initMatrix();
  initParticles();
  initCursor();
  initKonami();
  initShortcuts();
  initPWA();
  animateCounters();

  // Theme
  const savedTheme = localStorage.getItem('kryzen_theme') || 'cyan';
  App.setTheme(savedTheme);
  $$('.theme-btn').forEach(b => b.addEventListener('click', () => App.setTheme(b.dataset.theme)));

  // OpenAI key
  const savedKey = localStorage.getItem('kryzen_openai_key');
  if (savedKey) Chat.setApiKey(savedKey);

  // Chat
  $('#chatForm').addEventListener('submit', e => {
    e.preventDefault();
    const inp = $('#chatInput');
    const text = inp.value.trim();
    // Detect API key input
    if (text.startsWith('sk-') && text.length > 20){
      Chat.setApiKey(text);
      inp.value = '';
      return;
    }
    Chat.ask(text);
  });

  setTimeout(() => {
    $('#loading').classList.add('hide');
    Chat.load();
    App.initSuggestions();
  }, 800);
});

// Welcome on first visit
if (!localStorage.getItem('kryzen_visited')){
  localStorage.setItem('kryzen_visited', '1');
  setTimeout(() => {
    App.toast('🎮 Konami Code: ↑↑↓↓←→←→BA', 'warn');
  }, 4000);
}

/* ============================================
   KRYZEN AI PORTFOLIO v2.0 — Full Features
   ============================================ */
const D = window.DATA;
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

/* ===== MATRIX RAIN BG ===== */
function initBG(){
  const c = document.getElementById('bgCanvas');
  const ctx = c.getContext('2d');
  let w, h, drops = [];
  const fontSize = 16;
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  const resize = () => {
    w = c.width = innerWidth;
    h = c.height = innerHeight;
    const cols = Math.floor(w / fontSize);
    drops = Array(cols).fill(0).map(() => Math.random() * -100);
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

/* ===== PARTICLE SYSTEM ===== */
function initParticles(){
  const c = document.getElementById('particleCanvas');
  const ctx = c.getContext('2d');
  let w, h, particles = [];
  const particleCount = 80;
  const colors = ['#00D4FF', '#8B5CF6', '#ec4899', '#10b981', '#f59e0b'];

  const resize = () => {
    w = c.width = innerWidth;
    h = c.height = innerHeight;
  };
  resize(); window.addEventListener('resize', resize);

  class Particle {
    constructor(){
      this.reset();
    }
    reset(){
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 3 + 1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.5 + 0.2;
    }
    update(){
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
    }
    draw(){
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) particles.push(new Particle());

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(draw);
  };
  draw();
}

/* ===== CURSOR TRAIL ===== */
function initTrail(){
  const c = document.getElementById('trailCanvas');
  const ctx = c.getContext('2d');
  let w, h, trail = [];
  const maxTrail = 20;

  const resize = () => {
    w = c.width = innerWidth;
    h = c.height = innerHeight;
  };
  resize(); window.addEventListener('resize', resize);

  window.addEventListener('mousemove', e => {
    trail.push({ x: e.clientX, y: e.clientY, alpha: 1 });
    if (trail.length > maxTrail) trail.shift();
  });

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    trail.forEach((t, i) => {
      t.alpha -= 0.05;
      if (t.alpha <= 0) {
        trail.splice(i, 1);
        return;
      }
      ctx.globalAlpha = t.alpha * 0.5;
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--neon').trim();
      ctx.beginPath();
      ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  };
  draw();
}

/* ===== THEME SWITCHER ===== */
function initTheme(){
  const btns = document.querySelectorAll('.theme-btn');
  const saved = localStorage.getItem('kryzen_theme') || 'cyan';

  btns.forEach(b => {
    b.classList.toggle('active', b.dataset.theme === saved);
    b.addEventListener('click', () => {
      document.documentElement.setAttribute('data-theme', b.dataset.theme);
      localStorage.setItem('kryzen_theme', b.dataset.theme);
      btns.forEach(btn => btn.classList.remove('active'));
      b.classList.add('active');
    });
  });
}

/* ===== LANGUAGE SWITCHER ===== */
function initLang(){
  const btns = document.querySelectorAll('.lang-btn');
  const saved = localStorage.getItem('kryzen_lang') || 'uz';

  btns.forEach(b => {
    b.classList.toggle('active', b.dataset.lang === saved);
    b.addEventListener('click', () => {
      window.applyI18n(b.dataset.lang);
    });
  });
}

/* ===== KONAMI CODE ===== */
function initKonami(){
  const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let index = 0;

  window.addEventListener('keydown', e => {
    if (e.key === code[index]) {
      index++;
      if (index === code.length) {
        document.getElementById('konamiOverlay').classList.add('show');
        index = 0;
      }
    } else {
      index = 0;
    }
  });
}

/* ===== MUSIC PLAYER ===== */
function initMusic(){
  const audio = document.getElementById('bgMusic');
  const icon = document.getElementById('musicIcon');
  let playing = false;

  window.App.toggleMusic = () => {
    if (playing) {
      audio.pause();
      icon.textContent = '🔇';
    } else {
      audio.volume = 0.3;
      audio.play().catch(() => App.toast('Music autoplay blocked', 'warn'));
      icon.textContent = '🔊';
    }
    playing = !playing;
  };
}

/* ===== KEYBOARD SHORTCUTS ===== */
function initShortcuts(){
  window.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const pages = ['home','about','projects','blog','skills','experience','contact'];
    const idx = pages.indexOf(e.key.toLowerCase());
    if (idx !== -1) {
      App.go(pages[idx]);
    }
  });
}

/* ===== ANIMATE COUNTERS ===== */
function animateCounters(){
  $$('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const duration = 1500;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target) + (target === 100 ? '%' : '+');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + (target === 100 ? '%' : '+');
    };
    requestAnimationFrame(step);
  });
}

/* ===== PAGE RENDERER v2 ===== */
const Pages = {
  home(){ return null; },

  about(){
    const p = D.profile;
    return `
      <section class="fade-in">
        <div class="section-header">
          <span class="section-tag">01 / ABOUT</span>
          <h2 class="section-title" data-i18n="section_about">MEN HAQIMDA</h2>
          <p class="section-subtitle" data-i18n="nav_about">Qisqacha ma'lumot va ko'rsatkichlar</p>
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
          </div>
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
          <span class="section-tag">02 / PROJECTS</span>
          <h2 class="section-title" data-i18n="section_projects">LOYIHALAR</h2>
          <p class="section-subtitle" data-i18n="nav_projects">So'nggi ishlarim va portfolio namunalari</p>
        </div>
        <div class="project-filters">
          ${cats.map(c => `<button class="filter-btn ${filter===c?'active':''}" data-cat="${c}" onclick="App.go('projects','${c}')">${c === 'all' ? '🌐 Barchasi' : c.toUpperCase()}</button>`).join('')}
        </div>
        <div class="projects-grid">
          ${list.map((p, i) => `
            <div class="project-card" onclick="App.openProject(${p.id})">
              <div class="project-thumb t${(i % 6) + 1}">
                <span style="font-size:80px">${p.thumb}</span>
                <span class="project-status ${p.status}">${p.status === 'live' ? '● LIVE' : p.status === 'dev' ? '● DEV' : '● IDEA'}</span>
              </div>
              <div class="project-body">
                <h3 class="project-title">${p.name}</h3>
                <p class="project-desc">${p.desc}</p>
                <div class="project-tech">
                  ${p.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;color:var(--mut);margin-bottom:12px">
                  <span>📅 ${p.year}</span>
                  <span>🏷️ ${p.category}</span>
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

  blog(){
    return `
      <section class="fade-in">
        <div class="section-header">
          <span class="section-tag">03 / BLOG</span>
          <h2 class="section-title" data-i18n="section_blog">BLOG</h2>
          <p class="section-subtitle">Yangiliklar va maqolalar</p>
        </div>
        <div class="blog-grid">
          ${D.blogPosts.map(post => `
            <div class="blog-card" onclick="App.openBlog(${post.id})">
              <div class="blog-meta">
                <span class="blog-cat">${post.category}</span>
                <span>📅 ${post.date}</span>
              </div>
              <h3 class="blog-title">${post.title}</h3>
              <p class="blog-excerpt">${post.excerpt}</p>
              <div class="blog-stats">
                <span>👁️ ${post.views}</span>
                <span>💬 ${post.comments}</span>
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
          <h2 class="section-title" data-i18n="section_skills">KO'NIKMALAR</h2>
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
          <h2 class="section-title" data-i18n="section_experience">TAJRIBA</h2>
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
          <h2 class="section-title" data-i18n="section_contact">BOG'LANISH</h2>
          <p class="section-subtitle">Loyiha yoki hamkorlik uchun</p>
        </div>
        <div class="contact-grid">
          <div class="contact-info">
            <h3 data-i18n="nav_contact">Bog'lanish</h3>
            <p data-i18n="hero_desc">Yangi loyiha, hamkorlik yoki shunchaki savol — har qanday holatda yozing. Tez orada javob beraman!</p>
            <a href="mailto:${p.email}" class="contact-item" style="text-decoration:none">
              <div class="contact-icon">📧</div>
              <div class="info"><div class="info-label">Email</div><div class="value">${p.email}</div></div>
            </a>
            <a href="${p.telegram}" target="_blank" class="contact-item" style="text-decoration:none">
              <div class="contact-icon">💬</div>
              <div class="info"><div class="info-label">Telegram</div><div class="value">@KRYZENVIP</div></div>
            </a>
            <a href="${p.github}" target="_blank" class="contact-item" style="text-decoration:none">
              <div class="contact-icon">💻</div>
              <div class="info"><div class="info-label">GitHub</div><div class="value">@KRYZENSYS</div></div>
            </a>
            <a href="${p.instagram}" target="_blank" class="contact-item" style="text-decoration:none">
              <div class="contact-icon">📷</div>
              <div class="info"><div class="info-label">Instagram</div><div class="value">@KRYZENVIP</div></div>
            </a>
          </div>
          <form class="contact-form" onsubmit="App.submitForm(event)">
            <div class="form-group"><input class="form-input" name="name" placeholder="Ismingiz" required></div>
            <div class="form-group"><input class="form-input" name="email" type="email" placeholder="Email" required></div>
            <div class="form-group"><input class="form-input" name="subject" placeholder="Mavzu"></div>
            <div class="form-group"><textarea class="form-textarea" name="message" placeholder="Xabaringiz..." required></textarea></div>
            <button type="submit" class="form-submit" data-i18n="send_btn">📤 Yuborish</button>
          </form>
        </div>
      </section>
    `;
  }
};

/* ===== APP CONTROLLER v2 ===== */
window.App = {
  go(page, ...args){
    $$('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.page === page));
    if (page === 'home'){
      document.getElementById('main').innerHTML = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (!Pages[page]) return;
    const html = Pages[page](...args);
    document.getElementById('main').innerHTML = html;
    if (page === 'skills'){
      setTimeout(() => {
        $$('.skill-fill').forEach(el => el.style.width = el.dataset.width + '%');
      }, 100);
    }
    window.scrollTo({ top: 600, behavior: 'smooth' });
  },

  openProject(id){
    const p = D.projects.find(x => x.id === id);
    if (!p) return;
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;inset:0;z-index:5000;background:rgba(0,0,0,0.85);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn 0.3s';
    modal.innerHTML = `
      <div style="max-width:600px;width:100%;background:var(--bg-2);border:1px solid var(--bord-2);border-radius:20px;padding:32px;position:relative">
        <button onclick="this.parentElement.parentElement.remove()" style="position:absolute;top:16px;right:16px;width:36px;height:36px;border-radius:50%;background:var(--glass-2);color:var(--fg);font-size:18px">✕</button>
        <div style="font-size:60px;margin-bottom:16px">${p.thumb}</div>
        <h2 style="font-size:28px;margin-bottom:8px">${p.name}</h2>
        <p style="color:var(--mut);margin-bottom:20px;line-height:1.7">${p.desc}</p>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px">
          ${p.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
        </div>
        <div style="display:flex;gap:12px">
          ${p.demo !== '#' ? `<a href="${p.demo}" target="_blank" class="btn primary">🌐 Demo ochish</a>` : ''}
          ${p.github ? `<a href="${p.github}" target="_blank" class="btn ghost">💻 GitHub</a>` : ''}
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  },

  openBlog(id){
    const post = D.blogPosts.find(x => x.id === id);
    if (!post) return;
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;inset:0;z-index:5000;background:rgba(0,0,0,0.85);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn 0.3s';
    modal.innerHTML = `
      <div style="max-width:600px;width:100%;background:var(--bg-2);border:1px solid var(--bord-2);border-radius:20px;padding:32px;position:relative">
        <button onclick="this.parentElement.parentElement.remove()" style="position:absolute;top:16px;right:16px;width:36px;height:36px;border-radius:50%;background:var(--glass-2);color:var(--fg);font-size:18px">✕</button>
        <div style="font-size:48px;margin-bottom:16px">${post.icon}</div>
        <div class="blog-meta" style="margin-bottom:12px">
          <span class="blog-cat">${post.category}</span>
          <span>📅 ${post.date}</span>
        </div>
        <h2 style="font-size:24px;margin-bottom:16px">${post.title}</h2>
        <div style="font-size:14px;line-height:1.7;color:var(--mut);max-height:300px;overflow-y:auto">${post.content}</div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  },

  submitForm(e){
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const text = `Salom! Men ${data.name}.\n\n${data.message}\n\nEmail: ${data.email}`;
    const url = `https://t.me/KRYZENVIP?text=${encodeURIComponent(text)}`;
    App.toast('Telegram ochilmoqda...', 'ok');
    window.open(url, '_blank');
  },

  toggleChat(forceOpen = false){
    const p = document.getElementById('chatPanel');
    if (forceOpen === true) p.classList.add('open');
    else p.classList.toggle('open');
  },

  toast(msg, type = 'ok'){
    const z = document.getElementById('toastZone');
    const t = document.createElement('div');
    t.className = 'toast ' + type;
    t.textContent = msg;
    z.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  }
};

/* ===== CHAT AI ENGINE v2 ===== */
window.Chat = {
  async ask(text){
    if (!text.trim()) return;
    const sg = document.getElementById('chatSuggestions');
    if (sg) sg.style.display = 'none';

    const msgs = document.getElementById('chatMessages');
    const userDiv = document.createElement('div');
    userDiv.className = 'msg user';
    userDiv.innerHTML = `
      <div class="msg-avatar">S</div>
      <div class="msg-body">
        <div class="msg-name">Siz</div>
        <div class="msg-text">${this.escape(text)}</div>
      </div>
    `;
    msgs.appendChild(userDiv);

    const aiDiv = document.createElement('div');
    aiDiv.className = 'msg ai';
    aiDiv.innerHTML = `
      <div class="msg-avatar">🤖</div>
      <div class="msg-body">
        <div class="msg-name">KRYZEN AI</div>
        <div class="msg-text typing">.</div>
      </div>
    `;
    msgs.appendChild(aiDiv);
    msgs.scrollTop = msgs.scrollHeight;

    await new Promise(r => setTimeout(r, 800 + Math.random() * 700));
    const response = this.respond(text);
    aiDiv.querySelector('.msg-text').classList.remove('typing');
    aiDiv.querySelector('.msg-text').innerHTML = response;
    msgs.scrollTop = msgs.scrollHeight;

    this.save(text, response);
  },

  respond(input){
    const msg = input.toLowerCase().trim();
    const kb = D.ai.knowledge;

    for (const key in kb){
      if (msg.includes(key)) return kb[key];
    }

    const rules = [
      { match: ['kitob', 'bookfinder', 'book', 'badiiy'], reply: kb.bookfinder },
      { match: ['blockverse', 'web3', 'blockchain'], reply: kb.blockverse },
      { match: ['telegram', 'tg', 'bot'], reply: kb.telegram },
      { match: ['github', 'git', 'repo'], reply: kb.github },
      { match: ['instagram', 'insta', 'ig'], reply: kb.instagram },
      { match: ['frontend', 'react'], reply: kb.react },
      { match: ['python', 'django', 'flask'], reply: kb.python },
      { match: ['openai', 'gpt', 'claude', 'machine learning', 'ml'], reply: kb.ai },
      { match: ['narx', 'pul', '$', 'dollar', 'cost', 'price'], reply: kb.narx },
      { match: ['mudd', 'vaqt', 'time', 'deadline'], reply: kb.muddat },
      { match: ['ish', 'work', 'job', 'employ'], reply: kb.ish },
      { match: ['aloqa', 'contact', 'yozish'], reply: kb.email },
      { match: ['rahmat', 'spasibo', 'thanks'], reply: kb.rahmat },
      { match: ['hayr', 'bye', 'xayr', 'salom'], msg => msg.includes('sal') && msg.length < 8 ? kb.salom : kb.hayr }
    ];

    for (const r of rules){
      if (r.match.some(m => msg.includes(m))){
        return typeof r.reply === 'function' ? r.reply(msg) : r.reply;
      }
    }

    if (msg.endsWith('?')){
      return "Yaxshi savol! 😄 Menga aniqroq yo'nalish aytib bersangiz — batafsil javob berishim mumkin. <br><br>Misol: <em>\"Eng yaxshi loyihang qaysi?\"</em>, <em>\"React bilasanmi?\"</em>, <em>\"Narxlar qancha?\"</em>";
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
      if (hist.length > 20) hist.shift();
      localStorage.setItem('kryzen_chat', JSON.stringify(hist));
    } catch(e){}
  },

  load(){
    try {
      const hist = JSON.parse(localStorage.getItem('kryzen_chat') || '[]');
      const msgs = document.getElementById('chatMessages');
      hist.forEach(h => {
        msgs.innerHTML += `
          <div class="msg user"><div class="msg-avatar">S</div><div class="msg-body"><div class="msg-name">Siz</div><div class="msg-text">${this.escape(h.q)}</div></div></div>
          <div class="msg ai"><div class="msg-avatar">🤖</div><div class="msg-body"><div class="msg-name">KRYZEN AI</div><div class="msg-text">${h.a}</div></div></div>
        `;
      });
    } catch(e){}
  },

  clear(){
    const msgs = document.getElementById('chatMessages');
    msgs.innerHTML = '';
    localStorage.removeItem('kryzen_chat');
    App.toast('Chat tozalandi', 'ok');
  },

  toggleVoice(){
    const btn = document.getElementById('voiceBtn');
    btn.classList.toggle('active');
    App.toast('Ovozli kirish: "Qachon ishga tushasiz?"', 'ok');
  },

  toggleSpeech(){
    const btn = document.getElementById('speechBtn');
    btn.classList.toggle('active');
    App.toast('Ovozli javob: AI sizga javob beradi', 'ok');
  }
};

/* ===== INIT v2 ===== */
window.addEventListener('DOMContentLoaded', () => {
  initBG();
  initParticles();
  initTrail();
  initTheme();
  initLang();
  initKonami();
  initMusic();
  initShortcuts();
  animateCounters();

  document.getElementById('chatForm').addEventListener('submit', e => {
    e.preventDefault();
    const inp = document.getElementById('chatInput');
    Chat.ask(inp.value);
    inp.value = '';
  });

  setTimeout(() => {
    document.getElementById('loading').classList.add('hide');
    Chat.load();
  }, 800);
});
\n// Load enhancer
(function(){var s=document.createElement('script');s.src='enhancer.js';s.defer=true;document.head.appendChild(s)})();

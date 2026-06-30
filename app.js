/* ============================================
   KRYZEN AI Portfolio — Main App
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

/* ===== CURSOR GLOW ===== */
function initCursor(){
  const glow = document.getElementById('cursorGlow');
  window.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
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

/* ===== PAGE RENDERER ===== */
const Pages = {
  home(){ return null; }, // hero shown directly in HTML

  about(){
    const p = D.profile;
    return `
      <section class="fade-in">
        <div class="section-header">
          <span class="section-tag">01 / ABOUT</span>
          <h2 class="section-title">Men haqimda</h2>
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
            <div style="margin-top:20px;padding:24px" class="glass" >
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
          <h2 class="section-title">Loyihalarim</h2>
          <p class="section-subtitle">So'nggi ishlarim va portfolio namunalari</p>
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

  skills(){
    return `
      <section class="fade-in">
        <div class="section-header">
          <span class="section-tag">03 / SKILLS</span>
          <h2 class="section-title">Texnik ko'nikmalar</h2>
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
          <span class="section-tag">04 / EXPERIENCE</span>
          <h2 class="section-title">Ish tajribam</h2>
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
          <span class="section-tag">05 / CONTACT</span>
          <h2 class="section-title">Bog'lanish</h2>
          <p class="section-subtitle">Loyiha yoki hamkorlik uchun</p>
        </div>
        <div class="contact-grid">
          <div class="contact-info">
            <h3>Keling, gaplashaylik 🤝</h3>
            <p>Yangi loyiha, hamkorlik yoki shunchaki savol — har qanday holatda yozing. Tez orada javob beraman!</p>
            <a href="mailto:${p.email}" class="contact-item" style="text-decoration:none">
              <div class="contact-icon">📧</div>
              <div class="info"><div class="label">Email</div><div class="value">${p.email}</div></div>
            </a>
            <a href="${p.telegram}" target="_blank" class="contact-item" style="text-decoration:none">
              <div class="contact-icon">💬</div>
              <div class="info"><div class="label">Telegram</div><div class="value">@KRYZENVIP</div></div>
            </a>
            <a href="${p.github}" target="_blank" class="contact-item" style="text-decoration:none">
              <div class="contact-icon">💻</div>
              <div class="info"><div class="label">GitHub</div><div class="value">@KRYZENSYS</div></div>
            </a>
            <a href="${p.instagram}" target="_blank" class="contact-item" style="text-decoration:none">
              <div class="contact-icon">📷</div>
              <div class="info"><div class="label">Instagram</div><div class="value">@KRYZENVIP</div></div>
            </a>
          </div>
          <form class="contact-form" onsubmit="App.submitForm(event)">
            <div class="form-group"><input class="form-input" name="name" placeholder="Ismingiz" required></div>
            <div class="form-group"><input class="form-input" name="email" type="email" placeholder="Email" required></div>
            <div class="form-group"><input class="form-input" name="subject" placeholder="Mavzu"></div>
            <div class="form-group"><textarea class="form-textarea" name="message" placeholder="Xabaringiz..." required></textarea></div>
            <button type="submit" class="form-submit">📤 Yuborish</button>
          </form>
        </div>
      </section>
    `;
  }
};

/* ===== APP CONTROLLER ===== */
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
    // animate skill bars
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

/* ===== CHAT AI ENGINE ===== */
window.Chat = {
  async ask(text){
    if (!text.trim()) return;
    // Hide suggestions after first message
    const sg = document.getElementById('chatSuggestions');
    if (sg) sg.style.display = 'none';

    const msgs = document.getElementById('chatMessages');
    // User msg
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

    // AI typing indicator
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

    // Generate AI response after delay
    await new Promise(r => setTimeout(r, 800 + Math.random() * 700));
    const response = this.respond(text);
    aiDiv.querySelector('.msg-text').classList.remove('typing');
    aiDiv.querySelector('.msg-text').innerHTML = response;
    msgs.scrollTop = msgs.scrollHeight;

    // Save to localStorage
    this.save(text, response);
  },

  respond(input){
    const msg = input.toLowerCase().trim();
    const kb = D.ai.knowledge;

    // Exact match
    for (const key in kb){
      if (msg.includes(key)) return kb[key];
    }

    // Keyword fuzzy matching
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

    // Question detection
    if (msg.endsWith('?')){
      return "Yaxshi savol! 😄 Menga aniqroq yo'nalish aytib bersangiz — batafsil javob berishim mumkin. <br><br>Misol: <em>\"React bilasanmi?\"</em>, <em>\"Eng yaxshi loyihang qaysi?\"</em>, <em>\"Narxlar qancha?\"</em>";
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
  }
};

/* ===== INIT ===== */
window.addEventListener('DOMContentLoaded', () => {
  initBG();
  initCursor();
  animateCounters();

  // Chat form
  document.getElementById('chatForm').addEventListener('submit', e => {
    e.preventDefault();
    const inp = document.getElementById('chatInput');
    Chat.ask(inp.value);
    inp.value = '';
  });

  // Hide loading after small delay
  setTimeout(() => {
    document.getElementById('loading').classList.add('hide');
    Chat.load();
  }, 800);
});

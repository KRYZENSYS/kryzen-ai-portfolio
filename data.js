/* ===== KRYZEN Portfolio — Profile & Knowledge Base ===== */
window.DATA = {
  profile: {
    name: "KRYZEN",
    fullName: "KRYZEN",
    role: "Full-Stack Developer & AI Engineer",
    bio: "5+ yil tajribaga ega full-stack dasturchi. Cyberpunk estetikadagi web va AI loyihalarni yaratishga ixtisoslashgan. O'zbekistonda faoliyat yuritaman va butun dunyo bo'ylab mijozlarga xizmat qilaman.",
    bio2: "Texnologiya va dizayn o'rtasidagi muvozanatni topish — bu mening ish uslubim. Har bir loyiha — bu kichik san'at asari. Toza kod, chiroyli UI va aqlli funksionallik.",
    location: "Toshkent, O'zbekiston",
    email: "f91186645@gmail.com",
    telegram: "https://t.me/KRYZENVIP",
    github: "https://github.com/KRYZENSYS",
    instagram: "https://instagram.com/KRYZENVIP",
    years: 5,
    languages: ["O'zbek (tug'ma)", "English (C1)", "Русский (B2)"]
  },
  projects: [
    { id: 1, name: "KRYZEN BookFinder", category: "web", year: 2026, status: "live", thumb: "📚",
      desc: "3 ta API (Open Library, Gutendex, Google Books) orqali kitob qidiruv platformasi. Oflayn, dark mode, AI tavsiyalar, admin panel — barchasi birlashtirilgan.",
      tech: ["JavaScript", "APIs", "PWA", "Admin Panel"],
      demo: "https://kryzensys.github.io/kryzen-bookfinder/",
      github: "https://github.com/KRYZENSYS/kryzen-bookfinder",
      featured: true },
    { id: 2, name: "BLOCKVERSE V3.0", category: "web3", year: 2026, status: "live", thumb: "🌐",
      desc: "Web3 va blockchain bo'yicha premium landing page. 3D animatsiya, glitch effect, neon UI.",
      tech: ["React", "WebGL", "GSAP", "TailwindCSS"],
      demo: "https://kryzensys.github.io/blockverse/",
      github: "https://github.com/KRYZENSYS/blockverse-v3",
      featured: true },
    { id: 3, name: "KRYZEN AI Assistant", category: "ai", year: 2026, status: "live", thumb: "🤖",
      desc: "Telegram uchun AI yordamchi. 200+ funksiya, AI chat, tasvir generatsiya, ovozli xabarlar, ko'p tillilik.",
      tech: ["Node.js", "Telegram API", "OpenAI API", "Cloudflare Workers"],
      demo: "https://t.me/Mira_bot",
      github: null,
      featured: true },
    { id: 4, name: "Crypto Tracker Pro", category: "app", year: 2025, status: "live", thumb: "💰",
      desc: "Real-time cryptocurrency narxlarini kuzatish uchun app. Portfolio boshqaruvi, alert, tarix.",
      tech: ["React", "CoinGecko API", "Chart.js", "Firebase"],
      demo: "#",
      github: "https://github.com/KRYZENSYS/crypto-tracker",
      featured: false },
    { id: 5, name: "AI Portfolio (this)", category: "web", year: 2026, status: "live", thumb: "✨",
      desc: "AI bilan ishlovchi interaktiv portfolio. Savollarni tushunadi, aqlli javob beradi, animatsiyalar bilan boyitilgan.",
      tech: ["Vanilla JS", "CSS3 Animations", "Canvas", "AI Logic"],
      demo: "https://kryzensys.github.io/kryzen-ai-portfolio/",
      github: "https://github.com/KRYZENSYS/kryzen-ai-portfolio",
      featured: false },
    { id: 6, name: "Task Management System", category: "app", year: 2024, status: "dev", thumb: "📋",
      desc: "Jamoaviy vazifalar boshqaruvi tizimi. Real-time sync, role-based access, file sharing.",
      tech: ["Next.js", "PostgreSQL", "WebSocket", "Docker"],
      demo: "#",
      github: "https://github.com/KRYZENSYS/task-manager",
      featured: false }
  ],
  skills: [
    { category: "Frontend", icon: "🎨", items: [
      { name: "React / Next.js", level: 90 },{ name: "Vue.js", level: 80 },
      { name: "TypeScript", level: 85 },{ name: "HTML5 / CSS3", level: 95 },
      { name: "TailwindCSS", level: 92 }
    ]},
    { category: "Backend", icon: "⚙️", items: [
      { name: "Node.js", level: 90 },{ name: "Python", level: 88 },
      { name: "Express.js", level: 87 },{ name: "PostgreSQL / MongoDB", level: 82 },
      { name: "REST API / GraphQL", level: 88 }
    ]},
    { category: "AI / ML", icon: "🤖", items: [
      { name: "OpenAI / Claude API", level: 90 },{ name: "LangChain", level: 78 },
      { name: "Vector Databases", level: 75 },{ name: "Prompt Engineering", level: 92 }
    ]},
    { category: "DevOps & Tools", icon: "🛠️", items: [
      { name: "Docker", level: 80 },{ name: "Git / GitHub", level: 95 },
      { name: "CI/CD", level: 75 },{ name: "Cloudflare / Vercel", level: 88 }
    ]}
  ],
  experience: [
    { date: "2024 - Hozir", title: "Freelance Full-Stack Developer", company: "Global (Upwork, Fiverr, To'g'ridan-to'g'ri)",
      desc: "Dunyo bo'ylab 25+ mijoz uchun full-stack va AI loyihalar. Web apps, Telegram botlar, AI integratsiya." },
    { date: "2023 - 2024", title: "Senior Frontend Developer", company: "Tech Startup, Toshkent",
      desc: "React/Next.js ekotizimida SaaS mahsulot yaratish. 5+ jamoa a'zosi bilan agile muhitda ishlash." },
    { date: "2022 - 2023", title: "Full-Stack Developer", company: "Digital Agency",
      desc: "Mijozlar uchun e-commerce va landing page yaratish. Marketing va dizayn jamoalari bilan yaqin hamkorlik." },
    { date: "2020 - 2022", title: "Junior Developer", company: "IT Park, Toshkent",
      desc: "Birinchi professional tajriba. WordPress, oddiy web ilovalar, keyin full-stack ga o'tish." }
  ],
  achievements: [
    { icon: "🏆", title: "50+ Professional Loyihalar", desc: "5 yil ichida 50 dan ortiq loyiha yakunlangan" },
    { icon: "👥", title: "25+ Xursand Mijozlar", desc: "Doimiy hamkorlarning ijobiy baholari" },
    { icon: "🌍", title: "Global Tajriba", desc: "O'zbekiston, Yevropa, AQSH, MDH mijozlari" },
    { icon: "⭐", title: "Top Rated Freelancer", desc: "Yuqori sifatli ish natijalari uchun" }
  ],
  // ===== AI CHAT KNOWLEDGE BASE =====
  ai: {
    knowledge: {
      kim: "Men KRYZEN — full-stack dasturchi va AI engineer. O'zbekistonda ishlayman, 5+ yil tajribaga egaman. Web, AI va mobil ilovalar yarataman.",
      ism: "Mening ismim KRYZEN. KRYZEN — bu mening brendim va taxallusim. Asl ismimni maxfiy saqlayman.",
      yosh: "Yoshimni aniq aytmayman, lekin 5+ yil tajriba ko'rsatadi — tajribali mutaxassis.",
      qayerda: "Toshkentda yashayman va ishlayman, lekin butun dunyo bo'ylab mijozlarga onlayn xizmat qilaman.",
      tajriba: "5+ yil professional full-stack development tajribasiga egaman. JavaScript, Python, React, Node.js, AI/ML bo'yicha chuqur bilim.",
      texnologiyalar: "Frontend: React, Next.js, Vue, TypeScript, TailwindCSS. Backend: Node.js, Python, PostgreSQL, MongoDB. AI: OpenAI, Claude, LangChain. DevOps: Docker, Git, Cloudflare, Vercel.",
      react: "Ha! React — bu mening asosiy frontend texnologiyam. 90% darajada bilaman. Next.js bilan SSR/SSG, hooks, context, redux — hammasi.",
      python: "Python — AI/ML va backend uchun ishlataman. Django, FastAPI, Flask bilan tajribam bor. Data science uchun pandas, numpy.",
      ai: "AI bo'yicha 2+ yil tajribam bor. OpenAI GPT, Claude API, LangChain framework. RAG, prompt engineering, fine-tuning — barchasi.",
      loyiha: "Mening eng katta loyihalarim: KRYZEN BookFinder (kitob qidiruv platformasi), BLOCKVERSE V3 (Web3 landing), KRYZEN AI Assistant (Telegram bot, 200+ funksiya).",
      engYaxshi: "Eng yaxshi loyihalarim: KRYZEN BookFinder va BLOCKVERSE. Ikkalasi production'da va ko'p odamlar ishlatadi. Texnik jihatdan eng murakkab — AI Assistant, chunki 200+ funksiya bor.",
      bookfinder: "KRYZEN BookFinder — bu mening premium kitob qidiruv platformam. Open Library, Gutendex, Google Books — 3 ta API ni birlashtirgan. Oflayn rejim, dark mode, AI tavsiyalar, admin panel, foydalanuvchi tizimi — hammasi bor.",
      blockverse: "BLOCKVERSE V3 — Web3 va blockchain mavzusidagi premium landing page. Cyberpunk estetika, 3D animatsiya, glitch effect. To'liq responsive va production darajasida.",
      telegram: "Telegram'da @KRYZENVIP orqali bog'lanish mumkin. Shuningdek, mening AI assistent botim @Mira_bot — u ham Telegram'da ishlaydi va 200+ funksiya bor.",
      email: "Email: f91186645@gmail.com. Tez orada javob beraman, lekin Telegram orqali tezroq aloqa.",
      github: "GitHub: https://github.com/KRYZENSYS. Barcha open-source loyihalarim shu yerda. Kodlarimga bepul kirishingiz mumkin.",
      instagram: "Instagram: @KRYZENVIP. Bu yerda yangi loyihalar va ishlarim haqida story'lar joylashtiraman.",
      narx: "Narxlar loyihaga bog'liq. Kichik sayt — $200-500, murakkab web app — $1000-3000, AI integratsiya — kelishilgan holda. Telegram orqali yozing.",
      muddat: "Muddat loyiha murakkabligiga bog'liq. Oddiy sayt — 1 hafta, murakkab web app — 2-4 hafta, AI loyiha — 3-6 hafta.",
      ish: "Ishlashga tayorman. Freelance, part-time, full-time — barchasi mumkin. Masofadan ishlash — asosiy. Toshkentda ofisga ham bora olaman.",
      yordam: "Ha! Sizga qanday yordam bera olaman? Loyiha buyurtma qilmoqchimisiz, texnik maslahat kerakmi, yoki portfolio haqida savol bormi?",
      salom: "Salom! 👋 Men KRYZEN AI — sizga loyihalar, ko'nikmalar va tajriba haqida gaplashish uchun tayyorman. Savol bering!",
      rahmat: "Arzimaydi! 😊 Boshqa savollaringiz bo'lsa — bemalol so'rang. Sizning vaqtingiz qadrli, shuning uchun batafsil javob berishga harakat qilaman.",
      hayr: "Xayr! 👋 Portfolio bilan tanishganingiz uchun rahmat. Qaytib keling — yangi loyihalar qo'shiladi!",
      default: "Qiziqarli savol! Aniqroq aytib bera olasizmi? Masalan: 'Eng yaxshi loyihang qaysi?', 'React bilasanmi?', 'Narxlar qancha?', 'Ishlashga tayormisan?' kabi savollar bersangiz — batafsil javob beraman."
    }
  }
};

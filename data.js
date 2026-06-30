/* ===== KRYZEN Portfolio — Data + Blog + AI Knowledge ===== */
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
    { id: 5, name: "KRYZEN AI Portfolio (this)", category: "web", year: 2026, status: "live", thumb: "✨",
      desc: "AI bilan ishlovchi interaktiv portfolio. 5 ta tema, 3 til, ovozli I/O, PWA, konami easter egg.",
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

  posts: [
    { id: 1, title: "🤖 AI bilan Portfolio yaratish — to'liq qo'llanma",
      excerpt: "Qanday qilib AI-powered portfolio yaratish mumkin? OpenAI, prompt engineering va deploy haqida batafsil.",
      content: "Bugun siz bilan AI yordamida professional darajadagi portfolio yaratishni ko'rib chiqamiz.\n\n## Nima uchun AI portfolio?\n\nAI portfolio oddiy portfolio'dan farqli ravishda:\n- Interaktiv suhbat qobiliyati\n- Aqlli javob berish\n- Foydalanuvchi tajribasini oshirish\n- 24/7 mavjudlik\n\n## Texnik stack\n\n- HTML5 + CSS3 (Glassmorphism, Cyberpunk dizayn)\n- Vanilla JavaScript (no framework!)\n- OpenAI API yoki local AI knowledge base\n- GitHub Pages (deploy)\n\n## Qadam-baqadam\n\n1. HTML struktura — semantic va toza\n2. CSS — Glassmorphism + Animations\n3. JS — Page router, AI engine\n4. Deploy — GitHub Pages\n\nXulosa: AI portfolio — bu kelajak. Kimki ertaroq boshlasa, ko'proq vaqt va tajriba orttiradi.",
      category: "AI", date: "2026-06-28", readTime: 5, views: 1240, comments: 23, likes: 89 },
    { id: 2, title: "⚛️ React 19 yangiliklari — nimalar o'zgardi?",
      excerpt: "React 19 da yangi hooks, Server Components, va Actions. Loyihalaringizni qanday yangilash kerak?",
      content: "React 19 — bu katta yangilanish.\n\n## Asosiy yangiliklar\n\n### 1. Server Components (Stable)\nEndi serverda render qilish rasmiy stable.\n\n### 2. Actions\nForma yuborish endi yanada oson:\n```jsx\nfunction Form() {\n  async function action(formData) {\n    'use server';\n    await save(formData);\n  }\n  return <form action={action}>...</form>;\n}\n```\n\n### 3. use() Hook\nPromise va Context o'qish:\n```jsx\nconst data = use(fetch('/api/data'));\n```\n\n### 4. useOptimistic\nOptimistik UI yangilanishlari.\n\n## Migratsiya\n\n1. npm install react@19 react-dom@19\n2. TypeScript yangilash (5.4+)\n3. Test — yangi versiyalar bilan\n\nReact 19 — production-ready.",
      category: "React", date: "2026-06-25", readTime: 7, views: 2100, comments: 45, likes: 156 },
    { id: 3, title: "🎨 Glassmorphism dizayn — kelajakmi yoki o'tkinchi trend?",
      excerpt: "Glassmorphism, neumorphism, brutalism — qaysi biri eng yaxshi? Dizayn falsafasi va amaliy qo'llanma.",
      content: "Dizayn dunyosi doimo o'zgaradi.\n\n## Glassmorphism nima?\n\nBu — shaffof yuzalar, blur effektlari va nozik chegaralar bilan ajralib turuvchi dizayn tili.\n\n## Asosiy printsiplar\n\n1. **Shaffoflik** — orqa fonni ko'rish\n2. **Blur** — backdrop-filter: blur(20px)\n3. **Nozik borderlar** — 1px rgba(255,255,255,0.1)\n4. **Yorug'lik** — gradient yoki glassmorphic shadow\n\n## CSS qo'llanma\n\n```css\n.glass {\n  background: rgba(255,255,255,0.1);\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(255,255,255,0.2);\n  border-radius: 16px;\n}\n```\n\n## Qachon ishlatish?\n\n✅ Dark mode uchun zo'r\n✅ Cyberpunk/sci-fi loyihalar\n✅ Dashboard va admin panel\n❌ Matn ko'p bo'lsa — o'qish qiyin\n❌ Yengil ranglar — kontrast past\n\nXulosa: Glassmorphism bu kelajak — ayniqsa dark mode'da.",
      category: "Design", date: "2026-06-20", readTime: 6, views: 1850, comments: 34, likes: 121 },
    { id: 4, title: "🚀 GitHub Pages bilan bepul deploy — batafsil qo'llanma",
      excerpt: "Custom domain, HTTPS, CI/CD — barchasi bepul. GitHub Pages ning yashirin imkoniyatlari.",
      content: "GitHub Pages — bu bepul va ishonchli hosting.\n\n## Qanday ishlaydi?\n\n1. Repository yarating\n2. Settings → Pages\n3. Branch tanlang (main)\n4. 1-2 daqiqada sayt tayyor!\n\n## Custom domain\n\n1. CNAME fayl yarating:\n```\nyoursite.com\n```\n2. DNS sozlamalari:\n- A record: 185.199.108.153\n- CNAME: username.github.io\n\n3. HTTPS — automatic!\n\n## CI/CD bilan deploy\n\nGitHub Actions bilan:\n```yaml\nname: Deploy\non:\n  push:\n    branches: [main]\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - run: npm run build\n      - uses: peaceiris/actions-gh-pages@v3\n```\n\n## Limitlar\n\n- 1 GB storage\n- 100 GB traffic/oy\n- Faqat static content\n\nLekin portfolio, blog, landing — uchun ideal!",
      category: "DevOps", date: "2026-06-15", readTime: 4, views: 980, comments: 18, likes: 67 },
    { id: 5, title: "💡 Prompt Engineering — AI bilan ishlash san'ati",
      excerpt: "Yaxshi prompt yozish — bu yangi dasturlash. OpenAI, Claude, va boshqa AI modellar bilan samarali ishlash.",
      content: "Prompt engineering — bu kelajak kasbi.\n\n## Asosiy tamoyillar\n\n1. **Aniq bo'ling** — "Yaxshi maqola yoz" emas, "500 so'zli maqola, 3 ta bo'lim bilan, hacker uslubida"\n\n2. **Rol bering** — "Sen 10 yil tajribaga ega full-stack dasturchisan..."\n\n3. **Format ko'rsating** — JSON, Markdown, ro'yxat\n\n4. **Misollar bering** — few-shot learning\n\n## Misol\n\n```\nSen professional copywriter san.\nMahsulot: KRYZEN Portfolio\nMaqsad: investor jalb qilish\nFormat: 3 paragraf, emosional, ilhomlantiruvchi\nUzunligi: 150 so'z\n\nYoz:\n```\n\n## Texnikalar\n\n- **Chain of Thought** — "Avval o'yla, keyin yoz"\n- **ReAct** — Reasoning + Acting\n- **Tree of Thoughts** — bir nechta yo'l ko'rib chiqish\n- **Self-Consistency** — bir nechta javob solishtirish\n\n## Vositalar\n\n- LangChain — Python/JS\n- LlamaIndex — RAG uchun\n- Guidance — Microsoft\n- Anthropic Console — Claude uchun\n\nPrompt engineering — bu kelajak. O'rganing!",
      category: "AI", date: "2026-06-10", readTime: 8, views: 3200, comments: 67, likes: 245 },
    { id: 6, title: "🌐 Web3 va DeFi — 2026 holati",
      excerpt: "Blockchain, smart contract, DEX. Web3 rivojlanishi va kelajakdagi imkoniyatlar.",
      content: "2026 yilda Web3 katta o'zgarishlar bilan.\n\n## Asosiy tushunchalar\n\n- **DeFi** — Decentralized Finance\n- **NFT** — Non-Fungible Tokens\n- **DAO** — Decentralized Autonomous Organization\n- **dApp** — Decentralized App\n\n## Texnologiyalar\n\n- **Ethereum** — eng katta ekotizim\n- **Solana** — tez va arzon\n- **Polygon** — Layer 2 yechim\n- **TON** — Telegram integratsiya\n\n## Dasturchi uchun\n\n```solidity\n// Smart contract misol\ncontract Token {\n  mapping(address => uint) balances;\n  function transfer(address to, uint amount) public {\n    balances[msg.sender] -= amount;\n    balances[to] += amount;\n  }\n}\n```\n\n## Kelajak\n\n- RWA (Real World Assets) — tokenizatsiya\n- AI + Web3 integratsiya\n- Cross-chain yechimlar\n- Mass adoption\n\nWeb3 — bu kelajak. O'rganishni boshlang!",
      category: "Web3", date: "2026-06-05", readTime: 9, views: 1560, comments: 28, likes: 98 }
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

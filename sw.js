const CACHE = 'kryzen-v2.0';
const ASSETS = [
  '/kryzen-ai-portfolio/',
  '/kryzen-ai-portfolio/index.html',
  '/kryzen-ai-portfolio/style.css',
  '/kryzen-ai-portfolio/app.js',
  '/kryzen-ai-portfolio/data.js',
  '/kryzen-ai-portfolio/i18n.js',
  '/kryzen-ai-portfolio/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => 
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).then(response => {
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return response;
      }).catch(() => caches.match('/kryzen-ai-portfolio/index.html'));
    })
  );
});
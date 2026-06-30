/* KRYZEN Enhancer — SW, PWA, Net Status */
(function(){
  // Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(r => console.log('✅ SW registered:', r.scope))
        .catch(e => console.log('SW err:', e));
    });
  }

  // PWA install
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    const b = document.getElementById('pwaInstallBtn');
    if (b) b.style.display = 'inline-flex';
  });

  window.installPWA = async function(){
    if (!deferredPrompt) { window.App && window.App.toast && window.App.toast('Oldin o\'rnatilgan yoki yangi urinib ko\'ring','ok'); return; }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    window.App && window.App.toast && window.App.toast(outcome === 'accepted' ? '✅ O\'rnatildi!' : '❌ Bekor qilindi', outcome === 'accepted' ? 'ok' : 'err');
    const b = document.getElementById('pwaInstallBtn');
    if (b) b.style.display = 'none';
  };

  // Net status (create if missing)
  function updateNet(){
    const i = document.getElementById('netIndicator');
    if (i) i.textContent = navigator.onLine ? '🟢' : '🔴';
  }
  window.addEventListener('online', updateNet);
  window.addEventListener('offline', updateNet);
  setTimeout(updateNet, 1000);

  // Console welcome
  console.log('%c🤖 KRYZEN AI Portfolio v2.0', 'color:#00D4FF;font-size:24px;font-weight:bold');
  console.log('%cTap ↑↑↓↓←→←→BA for secret!', 'color:#8B5CF6;font-size:14px');
  console.log('%cShortcuts: 1-7 pages, C=chat, T=theme, /=input', 'color:#10b981;font-size:14px');
})();

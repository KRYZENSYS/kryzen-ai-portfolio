/* ===== KRYZEN AI Enhancement Module — OpenAI + Voice ===== */
(function(){
  const Chat = window.Chat;
  if (!Chat) return;

  /* VOICE INPUT */
  Chat.toggleVoice = function(){
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)){
      if (window.App) window.App.toast('❌ Voice not supported', 'err');
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (recognition && voiceEnabled){
      recognition.stop(); voiceEnabled = false;
      const btn = document.getElementById('voiceBtn'); if (btn) btn.classList.remove('active');
      return;
    }
    recognition = new SR();
    const lang = window.currentLang || 'uz';
    recognition.lang = lang === 'en' ? 'en-US' : lang === 'ru' ? 'ru-RU' : 'uz-UZ';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (e) => {
      const txt = e.results[0][0].transcript;
      const inp = document.getElementById('chatInput'); if (inp) inp.value = txt;
      Chat.ask(txt);
    };
    recognition.onend = () => { voiceEnabled = false; const b = document.getElementById('voiceBtn'); if (b) b.classList.remove('active'); };
    recognition.onerror = (e) => { if (window.App) window.App.toast('❌ Voice: ' + e.error, 'err'); voiceEnabled = false; const b = document.getElementById('voiceBtn'); if (b) b.classList.remove('active'); };
    recognition.start();
    voiceEnabled = true;
    const btn = document.getElementById('voiceBtn'); if (btn) btn.classList.add('active');
    if (window.App) window.App.toast('🎤 Listening...', 'ok');
  };

  /* SPEECH OUTPUT (TTS) */
  Chat.toggleSpeech = function(){
    this.speech = !this.speech;
    const btn = document.getElementById('speechBtn');
    if (btn) btn.classList.toggle('active', this.speech);
    if (window.App) window.App.toast(this.speech ? '🔊 Voice ON' : '🔇 Voice OFF', 'ok');
  };

  /* OPENAI */
  Chat.setApiKey = function(k){
    this.apiKey = k;
    try { localStorage.setItem('kryzen_openai_key', k); } catch(e){}
    const badge = document.getElementById('aiBadge');
    if (badge){ badge.textContent = 'AI'; badge.classList.remove('mock'); }
    if (window.App) window.App.toast('🤖 OpenAI connected!', 'ok');
  };

  Chat.askOpenAI = async function(text){
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.apiKey },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Sen KRYZEN ning AI yordamchisisan. KRYZEN — 5+ yil tajribaga ega full-stack dasturchi va AI engineer. O\'zbekistonda ishlaydi. Web, AI, va mobil ilovalar yaratadi. Qisqa va do\'stona javob ber.' },
          { role: 'user', content: text }
        ],
        max_tokens: 200, temperature: 0.7
      })
    });
    if (!r.ok) throw new Error('OpenAI ' + r.status);
    const data = await r.json();
    return data.choices[0].message.content.trim();
  };

  /* Override ask to use OpenAI if key set */
  const _origAsk = Chat.ask;
  Chat.ask = async function(text){
    if (!text.trim()) return;
    if (text.startsWith('sk-') && text.length > 20){
      Chat.setApiKey(text);
      const inp = document.getElementById('chatInput'); if (inp) inp.value = '';
      return;
    }
    return _origAsk.call(this, text);
  };

  /* Init on load */
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      try {
        const savedKey = localStorage.getItem('kryzen_openai_key');
        if (savedKey) Chat.setApiKey(savedKey);
      } catch(e){}
    }, 1500);
  });
})();

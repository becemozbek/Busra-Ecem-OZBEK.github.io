/* ============================================
   TEMA YÖNETİCİSİ — tüm sayfalar için ortak
   localStorage ile kalıcı gece/gündüz modu
   ============================================ */

(function () {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  function applyTheme(dark) {
    if (dark) {
      document.documentElement.classList.add('dark');
      btn.textContent = '☀️';
      btn.title = 'Gündüz moduna geç';
    } else {
      document.documentElement.classList.remove('dark');
      btn.textContent = '🌙';
      btn.title = 'Gece moduna geç';
    }
  }

  /* Sayfa açılışında kaydedilmiş tercihi uygula */
  applyTheme(localStorage.getItem('theme') === 'dark');

  btn.addEventListener('click', function () {
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    applyTheme(!isDark);
  });
})();

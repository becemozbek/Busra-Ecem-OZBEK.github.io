/* ============================================
   HAFTA 7 — Bootstrap + JavaScript
   ============================================ */

/* ---- 1) TEMA DEĞİŞTİRME ---- */
const temaBtn = document.getElementById('temaBtn');
const body    = document.body;

function applyHafta7Theme(dark) {
  if (dark) {
    document.documentElement.classList.add('dark');
    body.classList.add('dark-theme');
    temaBtn.textContent = 'Açık Temaya Geç';
    temaBtn.classList.replace('btn-outline-secondary', 'btn-outline-light');
  } else {
    document.documentElement.classList.remove('dark');
    body.classList.remove('dark-theme');
    temaBtn.textContent = 'Koyu Temaya Geç';
    temaBtn.classList.replace('btn-outline-light', 'btn-outline-secondary');
  }
}

/* Sayfa açılışında localStorage'dan oku */
applyHafta7Theme(localStorage.getItem('theme') === 'dark');

temaBtn.addEventListener('click', function () {
  const isDark = document.documentElement.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
  applyHafta7Theme(!isDark);
});

/* ---- 2) FORM DOĞRULAMA & ÖZET ÜRETME ---- */
const form      = document.getElementById('basvuruForm');
const sonucAlan = document.getElementById('sonucAlan');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const adSoyad  = document.getElementById('adSoyad').value.trim();
  const eposta   = document.getElementById('eposta').value.trim();
  const bolum    = document.getElementById('bolum').value.trim();
  const sinif    = document.getElementById('sinif').value;
  const oturum   = document.getElementById('oturum').value;
  const katilim  = document.getElementById('katilim').value;
  const mesaj    = document.getElementById('mesaj').value.trim();
  const kvkk     = document.getElementById('kvkk').checked;

  /* Eksik alan kontrolü */
  if (!adSoyad || !eposta || !bolum || !sinif || !oturum || !katilim) {
    sonucAlan.innerHTML = `
      <div class="alert alert-danger d-flex align-items-center gap-2" role="alert">
        <i class="bi bi-exclamation-triangle-fill"></i>
        <span>Lütfen tüm zorunlu alanları doldurun.</span>
      </div>`;
    sonucAlan.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  if (!kvkk) {
    sonucAlan.innerHTML = `
      <div class="alert alert-warning d-flex align-items-center gap-2" role="alert">
        <i class="bi bi-shield-exclamation"></i>
        <span>Devam etmek için KVKK onayını vermeniz gerekiyor.</span>
      </div>`;
    sonucAlan.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  /* Özet kartı */
  const sinifMap  = { '1': '1. Sınıf', '2': '2. Sınıf', '3': '3. Sınıf', '4': '4. Sınıf' };
  const katilimMap = { 'yüzyüze': 'Yüz Yüze', 'online': 'Online', 'hibrit': 'Hibrit' };

  sonucAlan.innerHTML = `
    <div class="card border-success shadow-sm">
      <div class="card-header bg-success text-white d-flex align-items-center gap-2">
        <i class="bi bi-check-circle-fill"></i>
        <strong>Başvurunuz Oluşturuldu!</strong>
      </div>
      <div class="card-body">
        <h5 class="card-title mb-3">${adSoyad}</h5>
        <div class="row g-2 mb-3">
          <div class="col-6">
            <div class="p-2 bg-light rounded">
              <small class="text-muted d-block">E-posta</small>
              <strong>${eposta}</strong>
            </div>
          </div>
          <div class="col-6">
            <div class="p-2 bg-light rounded">
              <small class="text-muted d-block">Bölüm</small>
              <strong>${bolum}</strong>
            </div>
          </div>
          <div class="col-6">
            <div class="p-2 bg-light rounded">
              <small class="text-muted d-block">Sınıf</small>
              <strong>${sinifMap[sinif] || sinif}</strong>
            </div>
          </div>
          <div class="col-6">
            <div class="p-2 bg-light rounded">
              <small class="text-muted d-block">Katılım Türü</small>
              <strong>${katilimMap[katilim] || katilim}</strong>
            </div>
          </div>
        </div>
        <div class="p-2 bg-light rounded mb-2">
          <small class="text-muted d-block">Oturum</small>
          <strong>${oturum}</strong>
        </div>
        ${mesaj ? `<div class="p-2 bg-light rounded"><small class="text-muted d-block">Kısa Mesaj</small><span>${mesaj}</span></div>` : ''}
      </div>
      <div class="card-footer text-muted small">
        <i class="bi bi-clock"></i> ${new Date().toLocaleString('tr-TR')}
      </div>
    </div>`;

  sonucAlan.scrollIntoView({ behavior: 'smooth' });
});

/* ---- 3) FORMU TEMİZLE ---- */
document.getElementById('temizleBtn').addEventListener('click', function () {
  form.reset();
  sonucAlan.innerHTML = `
    <p class="text-muted text-center py-3">
      <i class="bi bi-info-circle"></i>
      Henüz başvuru özeti oluşturulmadı. Formu doldurduktan sonra sonuç burada görünecek.
    </p>`;
});

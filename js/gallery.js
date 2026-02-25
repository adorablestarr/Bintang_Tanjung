/* ===== GALLERY TABS ===== */
const tabBtns = document.querySelectorAll('.tab-btn');
const tabDesign = document.getElementById('tab-design');
const tabOrg = document.getElementById('tab-org');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (target === 'design') {
      tabDesign.classList.remove('hidden');
      tabOrg.classList.add('hidden');
      triggerReveal(tabDesign);
    } else {
      tabOrg.classList.remove('hidden');
      tabDesign.classList.add('hidden');
      triggerReveal(tabOrg);
    }
  });
});

function triggerReveal(container) {
  const cards = container.querySelectorAll('.reveal');
  cards.forEach((card, i) => {
    card.classList.remove('visible');
    setTimeout(() => card.classList.add('visible'), i * 80);
  });
}

/* ===== LIGHTBOX ===== */
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src) {
  if (!src || src.includes('NAMA_FILE') || src.includes('KODE_SER')) return;
  lightboxImg.src = src;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxImg.src = ''; }, 300);
}

// ✅ FIX: Dua document.addEventListener('click') digabung jadi satu
// Sebelumnya ada dua listener terpisah → keduanya jalan setiap klik → boros & potensi konflik
document.addEventListener('click', e => {
  const previewBtn = e.target.closest('.preview-btn');
  if (previewBtn) {
    e.stopPropagation();
    openLightbox(previewBtn.dataset.img);
    return; // ✅ FIX: stop cek berikutnya kalau sudah ketemu
  }

  const zoomBtn = e.target.closest('.cert-zoom-btn');
  if (zoomBtn) {
    e.stopPropagation();
    openLightbox(zoomBtn.dataset.img);
  }
});

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

/* ===== EMAIL COPY TO CLIPBOARD ===== */
const copyEmailBtn = document.getElementById('copyEmailBtn');
const emailBtnText = document.getElementById('emailBtnText');
const toast        = document.getElementById('toast');

// ✅ FIX: Inisialisasi dengan null bukan undefined (let toastTimer; = undefined)
// undefined menyebabkan clearTimeout tidak bersih
let toastTimer = null;

if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', () => {
    const email = copyEmailBtn.dataset.email;

    // ✅ FIX: Cek dulu apakah clipboard API tersedia sebelum dipakai
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email)
        .then(() => showToast('✅ Email disalin: ' + email))
        .catch(() => fallbackCopy(email)); // ✅ FIX: fallback pakai textarea, bukan input
    } else {
      fallbackCopy(email);
    }
  });
}

// ✅ FIX: Fallback pakai <textarea> bukan <input>
// <input> tidak support teks panjang dan tidak reliable di semua browser
function fallbackCopy(text) {
  const tmp = document.createElement('textarea');
  tmp.value = text;
  tmp.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
  document.body.appendChild(tmp);
  tmp.focus();
  tmp.select();
  try {
    document.execCommand('copy');
    showToast('✅ Email disalin: ' + text);
  } catch {
    showToast('⚠️ Salin manual: ' + text);
  }
  document.body.removeChild(tmp);
}

function showToast(msg) {
  // ✅ FIX: Urutan diperbaiki — timer dulu dibatalkan, toast disembunyikan,
  // baru muncul lagi. Urutan lama: add('show') dulu → timer lama masih jalan
  // → timer lama hapus toast yang baru saja muncul
  if (toastTimer !== null) {
    clearTimeout(toastTimer);
    toastTimer = null;
  }

  toast.classList.remove('show');

  // ✅ FIX: void offsetWidth memaksa browser reflow
  // Tanpa ini, remove+add 'show' dalam satu frame dianggap tidak berubah → transisi tidak reset
  void toast.offsetWidth;

  toast.textContent = msg;
  toast.classList.add('show');

  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
    toastTimer = null; // ✅ FIX: reset ke null setelah selesai
  }, 3000);
}
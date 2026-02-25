/* ===== SCROLL REVEAL ANIMATIONS ===== */
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => observer.observe(el));

/* ===== TYPED EFFECT for hero title ===== */
document.addEventListener('DOMContentLoaded', () => {
  const badge = document.querySelector('.hero-badge');
  if (badge) {
    badge.style.animationDelay = '0.2s';
  }

  // ✅ FIX: Trigger reveal manual untuk tab-design saat halaman pertama load
  // Masalah: kartu di tab-org punya display:none saat load → IntersectionObserver
  // tidak bisa mendeteksi elemen tersembunyi → .visible tidak pernah ditambahkan.
  // Ketika tab-org dibuka, triggerReveal() di gallery.js yang handle.
  // Tapi tab-design (aktif saat load) juga perlu dipastikan card-nya sudah visible
  // setelah observer sempat jalan — ini jaga-jaga kalau observer terlewat.
  const tabDesignEl = document.getElementById('tab-design');
  if (tabDesignEl) {
    const designCards = tabDesignEl.querySelectorAll('.reveal');
    designCards.forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), 100 + i * 80);
    });
  }
});
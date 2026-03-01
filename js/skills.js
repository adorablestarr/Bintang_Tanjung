/* ===== SKILL BAR ANIMATION ===== */
// Progress bar beranimasi saat masuk viewport — hemat resource, tidak jalan diawal
const skillItems = document.querySelectorAll('.skill-bar-item');

if (skillItems.length > 0) {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3, rootMargin: '0px 0px -40px 0px' });

  skillItems.forEach((item, i) => {
    // Stagger delay antar bar
    const fill = item.querySelector('.skill-bar-fill');
    if (fill) fill.style.transitionDelay = `${i * 80}ms`;
    skillObserver.observe(item);
  });
}

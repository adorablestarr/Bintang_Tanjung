/* ===== DARK / LIGHT MODE ===== */
const themeToggle = document.getElementById('themeToggle');
const STORAGE_KEY = 'portfolio-theme';

function applyTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (saved === 'light' || (!saved && !prefersDark)) {
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.remove('light-mode');
  }
}

function toggleTheme() {
  const isLight = document.body.classList.toggle('light-mode');
  localStorage.setItem(STORAGE_KEY, isLight ? 'light' : 'dark');
}

applyTheme();

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// Sync with OS preference if user hasn't manually set
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (!localStorage.getItem(STORAGE_KEY)) applyTheme();
});

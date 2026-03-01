/* ===== CONTACT FORM VALIDATION ===== */
const form       = document.getElementById('contactForm');
const submitBtn  = document.getElementById('formSubmit');
const successMsg = document.getElementById('formSuccess');
const charCount  = document.getElementById('charCount');
const msgArea    = document.getElementById('contactMessage');

// Character counter
if (msgArea && charCount) {
  msgArea.addEventListener('input', () => {
    const len = msgArea.value.length;
    charCount.textContent = `${len} / 500`;
    charCount.style.color = len > 450 ? '#ef4444' : 'var(--clr-text-dim)';
    if (len > 500) msgArea.value = msgArea.value.slice(0, 500);
  });
}

// ===== VALIDATORS =====
const validators = {
  name: v => {
    if (!v.trim()) return 'Nama tidak boleh kosong.';
    if (v.trim().length < 2) return 'Nama minimal 2 karakter.';
    return '';
  },
  email: v => {
    if (!v.trim()) return 'Email tidak boleh kosong.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Format email tidak valid.';
    return '';
  },
  message: v => {
    if (!v.trim()) return 'Pesan tidak boleh kosong.';
    if (v.trim().length < 10) return 'Pesan minimal 10 karakter.';
    return '';
  }
};

function showFieldState(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (!input || !error) return;
  error.textContent = message;
  input.classList.toggle('error', !!message);
  input.classList.toggle('success', !message && input.value.trim() !== '');
}

function validateField(inputId, errorId, key) {
  const input = document.getElementById(inputId);
  if (!input) return true;
  const err = validators[key](input.value);
  showFieldState(inputId, errorId, err);
  return !err;
}

if (form) {
  // Real-time validation on blur
  document.getElementById('contactName')?.addEventListener('blur', () => validateField('contactName', 'nameError', 'name'));
  document.getElementById('contactEmail')?.addEventListener('blur', () => validateField('contactEmail', 'emailError', 'email'));
  document.getElementById('contactMessage')?.addEventListener('blur', () => validateField('contactMessage', 'messageError', 'message'));

  // Submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const ok = [
      validateField('contactName', 'nameError', 'name'),
      validateField('contactEmail', 'emailError', 'email'),
      validateField('contactMessage', 'messageError', 'message'),
    ].every(Boolean);

    if (!ok) {
      form.querySelector('.form-input.error')?.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.classList.add('loading');

    try {
      // Simulasi network delay (ganti dengan fetch() ke backend nantinya)
      await new Promise(r => setTimeout(r, 1500));

      successMsg.hidden = false;
      form.reset();
      if (charCount) charCount.textContent = '0 / 500';
      form.querySelectorAll('.form-input').forEach(el => el.classList.remove('success', 'error'));
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(() => { successMsg.hidden = true; }, 6000);
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
    }
  });
}

(function () {
  const themeBtn = document.getElementById('theme');
  const rtlBtn = document.getElementById('rtl');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const backToTop = document.getElementById('backToTop');

  function applyTheme(isDark) {
    document.body.classList.toggle('dark', isDark);
    if (themeBtn) {
      themeBtn.textContent = isDark ? '☀ Light' : '☾ Dark';
    }
  }

  function applyDir(isRtl) {
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    if (rtlBtn) {
      rtlBtn.textContent = isRtl ? '⇄ LTR' : '⇄ RTL';
    }
  }

  try {
    const savedTheme = localStorage.getItem('rideagain_theme');
    applyTheme(savedTheme === 'dark');

    const savedDir = localStorage.getItem('rideagain_dir');
    applyDir(savedDir === 'rtl');
  } catch (e) {
    applyTheme(false);
    applyDir(false);
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      const nextDark = !document.body.classList.contains('dark');
      applyTheme(nextDark);
      try {
        localStorage.setItem('rideagain_theme', nextDark ? 'dark' : 'light');
      } catch (e) {}
    });
  }

  if (rtlBtn) {
    rtlBtn.addEventListener('click', function () {
      const nextRtl = document.documentElement.getAttribute('dir') !== 'rtl';
      applyDir(nextRtl);
      try {
        localStorage.setItem('rideagain_dir', nextRtl ? 'rtl' : 'ltr');
      } catch (e) {}
    });
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', function (e) {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const eyeButtons = document.querySelectorAll('.eye-toggle');
  eyeButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;

      const showPassword = input.type === 'password';
      input.type = showPassword ? 'text' : 'password';
      btn.setAttribute('aria-label', showPassword ? 'Hide password' : 'Show password');
      btn.innerHTML = showPassword
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
    });
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const formMsg = document.getElementById('formMsg');
      if (formMsg) {
        formMsg.textContent = 'Thank you! Our RideAgain pre-owned bike showroom team has received your enquiry.';
      }
      contactForm.reset();
    });
  }

  const authForm = document.getElementById('authForm');
  const authMsg = document.getElementById('authMsg');
  if (authForm) {
    authForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const termsCheckbox = document.getElementById('termsCheck');
      if (termsCheckbox && !termsCheckbox.checked) {
        if (authMsg) {
          authMsg.textContent = 'Please agree to the Terms & Conditions to continue.';
        }
        return;
      }
      if (authMsg) {
        authMsg.textContent = 'Success! Rider portal demo authentication verified with Terms & Conditions accepted.';
      }
    });
  }

  const socialButtons = document.querySelectorAll('.auth-social-btn');
  socialButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const provider = btn.getAttribute('data-provider') || 'Social';
      if (authMsg) {
        authMsg.textContent = provider + ' sign-in selected (ready to connect with OAuth backend).';
      }
    });
  });

  if (backToTop) {
    function toggleBackToTop() {
      if (window.scrollY > 180) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();

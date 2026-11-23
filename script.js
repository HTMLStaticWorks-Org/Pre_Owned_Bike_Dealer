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

/* ========================================
   FANCY PUMP — Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

  /* --- Mobile Nav Toggle --- */
  var navToggle = document.querySelector('.nav-toggle');
  var navList = document.querySelector('.nav-main__list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var isShown = navList.classList.toggle('nav-main__list--open');
      navToggle.textContent = isShown ? '✕' : '☰';
    });

    /* Products ▾ toggle on mobile */
    navList.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function(e) {
        if (this.closest('.nav-dropdown') && (!this.getAttribute('href') || this.getAttribute('href') === '#')) {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            this.parentElement.classList.toggle('nav-dropdown--open');
          }
          return;
        }
        /* Regular nav link — close menu on mobile */
        if (window.innerWidth <= 768) {
          navList.classList.remove('nav-main__list--open');
          navToggle.textContent = '☰';
        }
      });
    });

    /* Close menu on backdrop click */
    document.addEventListener('click', function(e) {
      if (navList.classList.contains('nav-main__list--open')) {
        if (!navList.contains(e.target) && !navToggle.contains(e.target)) {
          navList.classList.remove('nav-main__list--open');
          navToggle.textContent = '☰';
        }
      }
    });
  }

  /* --- Back to Top --- */
  const backBtn = document.querySelector('.back-to-top');
  if (backBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        backBtn.classList.add('back-to-top--visible');
      } else {
        backBtn.classList.remove('back-to-top--visible');
      }
    });
    backBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- Inquiry Form --- */
  const inquiryForm = document.querySelector('.contact-form form');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = '✓ Sent';
      btn.style.background = 'oklch(55% 0.15 145)';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        inquiryForm.reset();
      }, 3000);
    });
  }

  /* --- Spec Tabs --- */
  document.querySelectorAll('.spec-tabs').forEach(function(tabs) {
    const btns = tabs.querySelectorAll('.spec-tabs__btn');
    const panels = tabs.querySelectorAll('.spec-tabs__content');
    btns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        btns.forEach(function(b) { b.classList.remove('spec-tabs__btn--active'); });
        panels.forEach(function(p) { p.classList.remove('spec-tabs__content--active'); });
        this.classList.add('spec-tabs__btn--active');
        const target = tabs.querySelector('.spec-tabs__content[data-tab="' + this.dataset.tab + '"]');
        if (target) target.classList.add('spec-tabs__content--active');
      });
    });
  });

  /* --- Lightbox for spec images --- */
  const lightboxHTML = '<div class="lightbox-overlay"><button class="lightbox-close" aria-label="Close">&#10005;</button><img src="" alt="Enlarged view" /></div>';
  if (!document.querySelector('.lightbox-overlay')) {
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
  }
  const lbOverlay = document.querySelector('.lightbox-overlay');
  const lbImg = lbOverlay.querySelector('img');
  const lbClose = lbOverlay.querySelector('.lightbox-close');

  function openLightbox(src) {
    lbImg.src = src;
    lbOverlay.classList.add('lightbox-overlay--open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lbOverlay.classList.remove('lightbox-overlay--open');
    document.body.style.overflow = '';
    setTimeout(function(){ lbImg.src = ''; }, 300);
  }

  document.addEventListener('click', function(e) {
    var target = e.target.closest('.spec-images img, .js-lightbox, .js-lightbox img');
    if (target) {
      var imgEl = target.tagName === 'IMG' ? target : target.querySelector('img');
      if (imgEl && imgEl.src) {
        openLightbox(imgEl.src);
        e.preventDefault();
      }
    }
  });

  lbOverlay.addEventListener('click', function(e) {
    if (e.target === lbOverlay) closeLightbox();
  });
  lbClose.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
  });

  /* --- Prevent tel: link error on desktop (no phone handler) --- */
  var isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (!isMobile) {
    document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }, true);
    });
  }

  /* --- Scroll Animations --- */
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-fade').forEach(function(el) {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });

});

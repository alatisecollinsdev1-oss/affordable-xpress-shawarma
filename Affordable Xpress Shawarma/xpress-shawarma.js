/**
 * ============================================================
 * AFFORDABLE XPRESS SHAWARMA — JAVASCRIPT
 * Osogbo, Osun State
 * ============================================================
 * Modules:
 *  1.  Preloader
 *  2.  Navigation (scroll hide/show, active link, hamburger)
 *  3.  Hero background Ken Burns effect
 *  4.  Scroll reveal (IntersectionObserver)
 *  5.  Menu filter tabs
 *  6.  Scroll indicator hide
 *  7.  Floating WhatsApp button
 *  8.  Contact form → WhatsApp redirect
 *  9.  Active nav link on scroll
 * 10.  Smooth scroll for all anchor links
 * 11.  Back to top on logo click
 * 12.  Gallery lightbox
 * 13.  Sticky nav on scroll
 * 14.  Utility functions
 * ============================================================
 */

'use strict';

/* ============================================================
   1. PRELOADER
   ============================================================ */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  setTimeout(() => {
    preloader.classList.add('exit');
    preloader.addEventListener('animationend', () => {
      preloader.style.display = 'none';
      document.body.style.overflow = '';
    }, { once: true });

    // Fallback in case animationend doesn't fire
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 800);
  }, 2200);
});

// Prevent scroll while preloader is active
document.body.style.overflow = 'hidden';

/* ============================================================
   2. NAVIGATION
   ============================================================ */
(function initNav() {
  const nav        = document.getElementById('nav');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('.nav-link') : [];

  if (!nav) return;

  // ── Sticky on scroll ──
  let lastScrollY = 0;
  let ticking     = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        nav.classList.toggle('scrolled', currentY > 60);
        lastScrollY = currentY;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ── Hamburger toggle ──
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.style.display = isOpen ? 'flex' : 'none';
      requestAnimationFrame(() => mobileMenu.classList.toggle('open', isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', String(isOpen));
      mobileLinks.forEach(l => l.setAttribute('tabindex', isOpen ? '0' : '-1'));
    });

    // Close on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMobileMenu();
    });
  }

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    setTimeout(() => { mobileMenu.style.display = 'none'; }, 300);
    mobileLinks.forEach(l => l.setAttribute('tabindex', '-1'));
  }

})();

/* ============================================================
   3. HERO BACKGROUND KEN BURNS EFFECT
   ============================================================ */
(function initHeroBg() {
  const heroBg = document.getElementById('hero-bg');
  if (!heroBg) return;

  // Trigger the scale animation after a tiny delay
  requestAnimationFrame(() => {
    setTimeout(() => heroBg.classList.add('loaded'), 100);
  });
})();

/* ============================================================
   4. SCROLL REVEAL — IntersectionObserver
   ============================================================ */
(function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ============================================================
   5. MENU FILTER TABS
   ============================================================ */
(function initMenuFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards  = document.querySelectorAll('.menu-card');

  if (!filterBtns.length || !menuCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filter cards
      menuCards.forEach(card => {
        const cats = card.getAttribute('data-cat') || '';
        const matches = filter === 'all' || cats.includes(filter);

        if (matches) {
          card.style.display = '';
          card.classList.remove('filtered-out');
          // Re-trigger reveal animation
          card.classList.remove('visible');
          setTimeout(() => card.classList.add('visible'), 50);
        } else {
          card.classList.add('filtered-out');
          setTimeout(() => {
            if (card.classList.contains('filtered-out')) {
              card.style.display = 'none';
            }
          }, 350);
        }
      });
    });
  });
})();

/* ============================================================
   6. SCROLL INDICATOR HIDE
   ============================================================ */
(function initScrollIndicator() {
  const indicator = document.getElementById('hero-scroll');
  if (!indicator) return;

  let hidden = false;
  window.addEventListener('scroll', () => {
    if (!hidden && window.scrollY > 80) {
      indicator.style.opacity = '0';
      indicator.style.pointerEvents = 'none';
      hidden = true;
    } else if (hidden && window.scrollY <= 80) {
      indicator.style.opacity = '1';
      indicator.style.pointerEvents = '';
      hidden = false;
    }
  }, { passive: true });

  indicator.addEventListener('click', () => {
    const about = document.getElementById('about');
    if (about) about.scrollIntoView({ behavior: 'smooth' });
  });
})();

/* ============================================================
   7. FLOATING WHATSAPP BUTTON
   ============================================================ */
(function initFloatingBtn() {
  const btn = document.getElementById('whatsapp-float');
  if (!btn) return;

  // Show after 2s
  setTimeout(() => {
    btn.style.opacity   = '1';
    btn.style.transform = 'scale(1)';
  }, 2000);

  // Pulse animation on hover
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.12)';
    btn.style.boxShadow = '0 12px 32px rgba(37,211,102,0.7)';
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
    btn.style.boxShadow = '0 8px 24px rgba(37,211,102,0.5)';
  });

  // Bounce every 8 seconds to attract attention
  setInterval(() => {
    btn.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(1.18)' },
      { transform: 'scale(0.95)' },
      { transform: 'scale(1.08)' },
      { transform: 'scale(1)' }
    ], { duration: 600, easing: 'ease-in-out' });
  }, 8000);
})();

/* ============================================================
   8. CONTACT FORM → WHATSAPP REDIRECT
   ============================================================ */
(function initContactForm() {
  const submitBtn = document.getElementById('form-submit');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', () => {
    const name    = (document.getElementById('f-name')?.value    || '').trim();
    const phone   = (document.getElementById('f-phone')?.value   || '').trim();
    const order   = (document.getElementById('f-order')?.value   || '').trim();
    const address = (document.getElementById('f-address')?.value || '').trim();
    const msg     = (document.getElementById('f-msg')?.value     || '').trim();

    // Basic validation
    if (!name) {
      shakeField('f-name');
      return;
    }
    if (!phone) {
      shakeField('f-phone');
      return;
    }

    // Build WhatsApp message
    let waMsg = `Hello Affordable Xpress Shawarma! 🌯\n\n`;
    waMsg += `*Name:* ${name}\n`;
    waMsg += `*Phone:* ${phone}\n`;
    if (order) waMsg += `*Order:* ${order}\n`;
    if (address) waMsg += `*Delivery Address:* ${address}\n`;
    if (msg) waMsg += `*Notes:* ${msg}\n`;
    waMsg += `\nPlease confirm my order. Thank you! 🙏`;

    const encoded = encodeURIComponent(waMsg);
    const waUrl   = `https://wa.me/2348143061353?text=${encoded}`;

    // Animate button
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '✅ Redirecting to WhatsApp...';
    submitBtn.disabled  = true;

    setTimeout(() => {
      window.open(waUrl, '_blank');
      submitBtn.innerHTML = originalText;
      submitBtn.disabled  = false;
    }, 800);
  });

  function shakeField(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.borderColor = '#D72B2B';
    el.animate([
      { transform: 'translateX(0)' },
      { transform: 'translateX(-8px)' },
      { transform: 'translateX(8px)' },
      { transform: 'translateX(-6px)' },
      { transform: 'translateX(6px)' },
      { transform: 'translateX(0)' }
    ], { duration: 400, easing: 'ease-in-out' });
    el.focus();
    setTimeout(() => el.style.borderColor = '', 2000);
  }
})();

/* ============================================================
   9. ACTIVE NAV LINK ON SCROLL
   ============================================================ */
(function initActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('#nav .nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          const isActive = href === `#${id}`;
          link.classList.toggle('active', isActive);
          if (isActive) {
            link.setAttribute('aria-current', 'page');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(s => observer.observe(s));
})();

/* ============================================================
   10. SMOOTH SCROLL FOR ALL ANCHOR LINKS
   ============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const navHeight = document.getElementById('nav')?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ============================================================
   11. GALLERY LIGHTBOX
   ============================================================ */
(function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!galleryItems.length) return;

  // Create lightbox elements
  const overlay = document.createElement('div');
  overlay.id = 'lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Image lightbox');
  overlay.style.cssText = `
    display:none;position:fixed;inset:0;z-index:2000;
    background:rgba(0,0,0,0.92);
    align-items:center;justify-content:center;
    cursor:zoom-out;backdrop-filter:blur(8px);
    animation:fadeInLightbox 0.25s ease;
  `;

  const img = document.createElement('img');
  img.style.cssText = `
    max-width:90vw;max-height:88vh;
    border-radius:12px;
    box-shadow:0 32px 80px rgba(0,0,0,0.6);
    object-fit:contain;
    animation:scaleLightbox 0.3s cubic-bezier(0.22,1,0.36,1);
    cursor:default;
  `;

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '✕';
  closeBtn.setAttribute('aria-label', 'Close lightbox');
  closeBtn.style.cssText = `
    position:fixed;top:20px;right:24px;
    background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);
    color:#fff;font-size:1.2rem;width:42px;height:42px;
    border-radius:50%;cursor:pointer;display:flex;
    align-items:center;justify-content:center;
    transition:background 0.2s;z-index:2001;
  `;
  closeBtn.addEventListener('mouseenter', () => closeBtn.style.background = 'rgba(215,43,43,0.6)');
  closeBtn.addEventListener('mouseleave', () => closeBtn.style.background = 'rgba(255,255,255,0.1)');

  const counter = document.createElement('div');
  counter.style.cssText = `
    position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
    color:rgba(255,255,255,0.6);font-size:0.8rem;
    font-family:'Oswald',sans-serif;letter-spacing:0.08em;
  `;

  overlay.appendChild(img);
  overlay.appendChild(closeBtn);
  overlay.appendChild(counter);
  document.body.appendChild(overlay);

  // Add keyframe styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInLightbox{from{opacity:0;}to{opacity:1;}}
    @keyframes scaleLightbox{from{opacity:0;transform:scale(0.9);}to{opacity:1;transform:scale(1);}}
  `;
  document.head.appendChild(style);

  let currentIndex = 0;
  const images = Array.from(galleryItems).map(item => item.querySelector('img'));

  function openLightbox(index) {
    currentIndex = index;
    const src = images[index]?.src;
    const alt = images[index]?.alt || 'Gallery image';
    if (!src) return;

    img.src = src;
    img.alt = alt;
    counter.textContent = `${index + 1} / ${images.length}`;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    openLightbox(currentIndex);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openLightbox(currentIndex);
  }

  // Open on click
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  // Close
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeLightbox();
  });
  closeBtn.addEventListener('click', closeLightbox);

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (overlay.style.display !== 'flex') return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft')  prevImage();
  });

  // Touch/swipe on mobile
  let touchStartX = 0;
  overlay.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  overlay.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextImage() : prevImage();
    }
  }, { passive: true });
})();

/* ============================================================
   12. BACK TO TOP — click on footer logo
   ============================================================ */
(function initBackToTop() {
  // Show back-to-top arrow after 500px scroll
  const bttBtn = document.createElement('button');
  bttBtn.id = 'back-to-top';
  bttBtn.setAttribute('aria-label', 'Back to top');
  bttBtn.innerHTML = '↑';
  bttBtn.style.cssText = `
    position:fixed;bottom:96px;right:28px;z-index:499;
    width:44px;height:44px;border-radius:50%;
    background:var(--red);color:#fff;
    border:none;font-size:1.2rem;font-weight:700;
    cursor:pointer;opacity:0;transform:scale(0.8) translateY(10px);
    transition:opacity 0.3s ease,transform 0.3s ease;
    box-shadow:0 4px 16px rgba(215,43,43,0.4);
    display:flex;align-items:center;justify-content:center;
  `;
  document.body.appendChild(bttBtn);

  window.addEventListener('scroll', () => {
    const show = window.scrollY > 500;
    bttBtn.style.opacity   = show ? '1' : '0';
    bttBtn.style.transform = show ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(10px)';
    bttBtn.style.pointerEvents = show ? '' : 'none';
  }, { passive: true });

  bttBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  bttBtn.addEventListener('mouseenter', () => {
    bttBtn.style.background = '#FF4444';
    bttBtn.style.transform  = 'scale(1.1) translateY(-2px)';
  });

  bttBtn.addEventListener('mouseleave', () => {
    bttBtn.style.background = 'var(--red)';
    bttBtn.style.transform  = 'scale(1) translateY(0)';
  });
})();

/* ============================================================
   13. OPEN/CLOSED STATUS — auto update based on time
   ============================================================ */
(function initOpenStatus() {
  const badges = document.querySelectorAll('.open-badge');
  if (!badges.length) return;

  function updateStatus() {
    const now   = new Date();
    const hours = now.getHours();
    const mins  = now.getMinutes();
    const total = hours * 60 + mins;

    // Open 13:00 (780) to 22:00 (1320) — Mon-Sun
    const isOpen  = total >= 780 && total < 1320;
    const isSunday = now.getDay() === 0;
    // Sunday closes at 21:30 (1290)
    const openNow = isOpen && !(isSunday && total >= 1290);

    badges.forEach(badge => {
      if (openNow) {
        badge.innerHTML = `<span class="open-badge-dot"></span>Open Now`;
        badge.style.background = 'rgba(16,185,129,0.12)';
        badge.style.borderColor = 'rgba(16,185,129,0.3)';
        badge.style.color = '#10b981';
      } else {
        badge.innerHTML = `<span style="width:6px;height:6px;border-radius:50%;background:#ef4444;display:inline-block;"></span> Closed · Opens at 1:00 PM`;
        badge.style.background = 'rgba(239,68,68,0.1)';
        badge.style.borderColor = 'rgba(239,68,68,0.3)';
        badge.style.color = '#ef4444';
      }
    });

    // Also update nav announcement
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
      const dot = heroBadge.querySelector('.hero-badge-dot');
      if (!openNow && dot) {
        dot.style.background = '#ef4444';
        heroBadge.childNodes[heroBadge.childNodes.length - 1].textContent = ' Opens at 1:00 PM Daily';
      }
    }
  }

  updateStatus();
  setInterval(updateStatus, 60000); // Re-check every minute
})();

/* ============================================================
   14. MENU CARD TILT EFFECT (3D on hover)
   ============================================================ */
(function initCardTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return; // Skip on touch devices

  document.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect    = card.getBoundingClientRect();
      const centerX = rect.left + rect.width  / 2;
      const centerY = rect.top  + rect.height / 2;
      const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -6;
      const rotateY = ((e.clientX - centerX) / (rect.width  / 2)) *  6;
      card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ============================================================
   15. DEAL CARD HOVER PARALLAX
   ============================================================ */
(function initDealParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.deal-card').forEach(card => {
    const bg = card.querySelector('.deal-card-bg');
    if (!bg) return;

    card.addEventListener('mousemove', e => {
      const rect  = card.getBoundingClientRect();
      const xPct  = (e.clientX - rect.left)  / rect.width;
      const yPct  = (e.clientY - rect.top)   / rect.height;
      const moveX = (xPct - 0.5) * 16;
      const moveY = (yPct - 0.5) * 16;
      bg.style.transform = `scale(1.08) translate(${moveX}px, ${moveY}px)`;
    });

    card.addEventListener('mouseleave', () => {
      bg.style.transform = '';
    });
  });
})();

/* ============================================================
   UTILITY FUNCTIONS
   ============================================================ */
/**
 * Debounce — delays function execution
 */
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Throttle — limits function execution frequency
 */
function throttle(fn, interval) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn.apply(this, args);
    }
  };
}
// partial 인클루드 (헤더/푸터 공통화)
(function () {
  'use strict';

  async function include(selector, url) {
    const placeholder = document.querySelector(selector);
    if (!placeholder) return;
    try {
      const res = await fetch(url, { credentials: 'same-origin' });
      if (!res.ok) throw new Error('include failed');
      placeholder.outerHTML = await res.text();
    } catch (e) {
      console.warn('Partial include failed:', url, e);
    }
  }

  async function boot() {
    await Promise.all([
      include('[data-include="header"]', '/partials/header.html'),
      include('[data-include="footer"]', '/partials/footer.html'),
    ]);
    // 헤더 로드 후 메뉴 토글 바인딩
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
    // 현재 페이지 강조
    const currentPath = window.location.pathname;
    document.querySelectorAll('.main-nav a').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      if (currentPath === href) {
        link.setAttribute('aria-current', 'page');
        link.style.color = 'var(--color-accent-strong)';
      }
    });
    // 연도
    document.querySelectorAll('.copyright-year').forEach(el => {
      el.textContent = new Date().getFullYear();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

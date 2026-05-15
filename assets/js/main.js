// 19홀 가라오케 - 공통 인터랙션
(function () {
  'use strict';

  // 모바일 메뉴 토글
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // 외부 클릭 시 모바일 메뉴 닫기
  document.addEventListener('click', (e) => {
    if (!nav || !toggle) return;
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // 현재 페이지 메뉴 강조
  const currentPath = window.location.pathname;
  document.querySelectorAll('.main-nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    if (currentPath === href || (href !== '/' && currentPath.startsWith(href.replace(/index\.html$/, '')))) {
      link.setAttribute('aria-current', 'page');
      link.style.color = 'var(--color-accent-strong)';
    }
  });

  // 키보드 접근성: 서브메뉴
  document.querySelectorAll('.main-nav > ul > li').forEach((li) => {
    const trigger = li.querySelector(':scope > a');
    const submenu = li.querySelector(':scope > .submenu');
    if (!trigger || !submenu) return;
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    li.addEventListener('mouseenter', () => trigger.setAttribute('aria-expanded', 'true'));
    li.addEventListener('mouseleave', () => trigger.setAttribute('aria-expanded', 'false'));
  });
})();

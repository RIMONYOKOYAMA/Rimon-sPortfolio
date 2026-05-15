const revealOnScroll = (targets) => {
  if (targets.length === 0) return;

  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;

      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  targets.forEach(el => observer.observe(el));
};

const fadeWorksListCards = (fadeCards) => {
  window.addEventListener('load', () => {
    fadeCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
    });

    setTimeout(() => {
      fadeCards.forEach((card, index) => {
        const col = index % 4;
        setTimeout(() => {
          card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, col * 80 + Math.floor(index / 4) * 40);
      });
    }, 200);
  });
};

const worksListCards = document.querySelectorAll('.works-grid-4 .work-card');

if (worksListCards.length > 0) {
  // works.html用 ページ読み込み時
  fadeWorksListCards(worksListCards);
} else if (document.body.classList.contains('works-page')) {
  // 作品詳細ページ用 スクロール時
  const detailTargets = document.querySelectorAll(
    '.colors-detail-hero, .colors-detail-section, .dessin-gallery-row, .illust-gallery-row, .dd-hero, .dd-section, .pow-hero, .pow-section, .tmr-hero, .tmr-section, .asb-hero, .asb-section, .ui-section, .logo-showcase, .logo-grid, .appaku-hero, .appaku-play'
  );

  revealOnScroll(detailTargets);
} else {
  // index.html用 スクロール時
  const scrollTargets = document.querySelectorAll(
    '.works-panel, .profile-image, .profile-main, .profile-box, .contact-panel'
  );

  revealOnScroll(scrollTargets);
}

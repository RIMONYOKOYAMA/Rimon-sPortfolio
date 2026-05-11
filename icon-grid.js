const ICON_BASE = new URL('assets/', document.currentScript.src).href;
const ICONS = [
  `${ICON_BASE}icon1.png`,
  `${ICON_BASE}icon2.png`,
  `${ICON_BASE}icon3.png`,
  `${ICON_BASE}icon4.png`,
  `${ICON_BASE}icon5.png`,
  `${ICON_BASE}icon6.png`,
];

const ICON_SIZE = 40;
const GAP = 120;

const iconElements = [];
let lastScrollY = window.scrollY;
let currentAngles = [];
let animationFrame = null;

function createGrid() {
  const cols = Math.ceil(window.innerWidth / GAP) + 1;
  const rows = Math.ceil(window.innerHeight / GAP) + 1;

  let iconIndex = 0;

  for (let row = 0; row < rows; row++) {
    const offset = row % 2 === 1 ? GAP / 2 : 0;

    for (let col = 0; col < cols; col++) {
      const el = document.createElement('img');
      el.src = ICONS[iconIndex % ICONS.length];
      iconIndex++;

      const startAngle = Math.random() * 360;
      const speedFactor = 0.01 + Math.random() * 1.2; // アイコンごとの速さの個性

      el.style.cssText = `
        position: fixed;
        width: ${ICON_SIZE}px;
        height: ${ICON_SIZE}px;
        object-fit: contain;
        left: ${col * GAP + offset}px;
        top: ${row * GAP}px;
        pointer-events: none;
        z-index: 0;
        opacity: 0.2;
        transform: rotate(${startAngle}deg);
      `;

      document.body.appendChild(el);
      iconElements.push({ el, speedFactor });
      currentAngles.push(startAngle);
    }
  }
}

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const delta = currentScrollY - lastScrollY; // 正=下スクロール、負=上スクロール
  lastScrollY = currentScrollY;

  iconElements.forEach((item, i) => {
    currentAngles[i] += delta * item.speedFactor * 0.5;
    item.el.style.transform = `rotate(${currentAngles[i]}deg)`;
  });
});

createGrid();

// 全アイコンを最初は下に隠す
iconElements.forEach(({ el }) => {
  el.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease';
  el.style.transform = `translateY(60px) rotate(${el.style.transform.match(/-?\d+\.?\d*/)?.[0] || 0}deg)`;
  el.style.opacity = '0';
});

// 少し遅らせてから上にアニメーション
setTimeout(() => {
  iconElements.forEach(({ el }, i) => {
    setTimeout(() => {
      const angle = currentAngles[i];
      el.style.transform = `translateY(0px) rotate(${angle}deg)`;
      el.style.opacity = String(0.1 + Math.random() * 0.4);
    }, i * 8); // アイコンごとに少しずつ遅延
  });
}, 100);

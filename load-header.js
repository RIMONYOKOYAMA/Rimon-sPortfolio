document.addEventListener("DOMContentLoaded", async () => {
  const headerTarget = document.getElementById("site-header");
  if (!headerTarget) return;
  const isInSubfolder = location.pathname.includes('/works/');
  const prefix = isInSubfolder ? '../' : '';
  try {
    const response = await fetch(prefix + 'header.html');
    const html = await response.text();
    headerTarget.innerHTML = html;

    if (isInSubfolder) {
      // リンクのhrefを修正
      headerTarget.querySelectorAll('a[href]').forEach(el => {
        const href = el.getAttribute('href');
        if (!href.startsWith('http') && !href.startsWith('../')) {
          el.setAttribute('href', '../' + href);
        }
      });

      // 画像のsrcを修正
      headerTarget.querySelectorAll('img[src]').forEach(el => {
        const src = el.getAttribute('src');
        if (!src.startsWith('http') && !src.startsWith('../')) {
          el.setAttribute('src', '../' + src);
        }
      });
    }

  } catch (error) {
    console.error("ヘッダーの読み込みに失敗しました", error);
  }

  if (!document.querySelector(".page-top-button")) {
    const pageTopButton = document.createElement("button");
    pageTopButton.type = "button";
    pageTopButton.className = "page-top-button";
    pageTopButton.setAttribute("aria-label", "ページの先頭へ戻る");
    pageTopButton.innerHTML = `<img src="${prefix}assets/PageTopButton.svg" alt="">`;
    pageTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    document.body.appendChild(pageTopButton);
  }

  const workDetailItems = [
    { file: "COLORS.html", title: "COLORS" },
    { file: "ArrowWorld.html", title: "ARROW WORLD" },
    { file: "DemonsDinner.html", title: "デモンズダイナー" },
    { file: "PieceOfWorld.html", title: "Piece Of World" },
    { file: "TokyoMakyoRoku.html", title: "東京魔警録" },
    { file: "UIDesignCollection.html", title: "UIデザイン集" },
    { file: "Asobiba.html", title: "アソビバ！" },
    { file: "LogoDesignCollection.html", title: "ロゴデザイン集" },
    { file: "illust.html", title: "イラスト集" },
    { file: "AppakuMensetsu.html", title: "アッパクメンセツ" },
    { file: "Dessin.html", title: "高校のデッサン" },
  ];

  if (isInSubfolder && !document.querySelector(".work-detail-nav")) {
    const currentFile = decodeURIComponent(location.pathname.split("/").pop());
    const currentIndex = workDetailItems.findIndex((item) => item.file === currentFile);
    const main = document.querySelector("main");

    if (main && currentIndex !== -1) {
      const previousItem = workDetailItems[(currentIndex - 1 + workDetailItems.length) % workDetailItems.length];
      const nextItem = workDetailItems[(currentIndex + 1) % workDetailItems.length];
      const nav = document.createElement("nav");
      nav.className = "work-detail-nav";
      nav.setAttribute("aria-label", "作品詳細ナビゲーション");
      nav.innerHTML = `
        <a class="work-detail-nav-button work-detail-nav-button--previous" href="${previousItem.file}">
          <span>前の作品</span>
          <strong>${previousItem.title}</strong>
        </a>
        <a class="work-detail-nav-button work-detail-nav-button--list" href="../works.html">
          <span>一覧に戻る</span>
        </a>
        <a class="work-detail-nav-button work-detail-nav-button--next" href="${nextItem.file}">
          <span>次の作品</span>
          <strong>${nextItem.title}</strong>
        </a>
      `;
      main.insertAdjacentElement("beforeend", nav);
    }
  }
});

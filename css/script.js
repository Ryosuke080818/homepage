// 陸・海・空それぞれのデータ定義
// menuLabel はハンバーガーメニュー内に表示される短い名前です
const pageData = {
  land: {
    title: "陸上自衛隊",
    bannerImage: "land_banner.jpg", // 陸の詳細バナー用画像
    cards: [
      { title: "主な活動", menuLabel: "活動", desc: "（軽い説明を書く）", link: "#" },
      { title: "組織・階級", menuLabel: "組織", desc: "（軽い説明を書く）", link: "#" },
      { title: "歴史・過去", menuLabel: "歴史", desc: "（軽い説明を書く）", link: "#" }
    ]
  },
  sea: {
    title: "海上自衛隊",
    bannerImage: "sea_banner.jpg", // 海の詳細バナー用画像
    cards: [
      { title: "主な活動", menuLabel: "活動", desc: "（軽い説明を書く）", link: "#" },
      { title: "組織・階級", menuLabel: "組織", desc: "（軽い説明を書く）", link: "#" },
      { title: "歴史・過去", menuLabel: "歴史", desc: "（軽い説明を書く）", link: "#" }
    ]
  },
  air: {
    title: "航空自衛隊",
    bannerImage: "sky_banner.jpg", // 空の詳細バナー用画像
    cards: [
      { title: "主な活動", menuLabel: "活動", desc: "（軽い説明を書く）", link: "#" },
      { title: "組織・階級", menuLabel: "組織", desc: "（軽い説明を書く）", link: "#" },
      { title: "歴史・過去", menuLabel: "歴史", desc: "（軽い説明を書く）", link: "#" }
    ]
  }
};

// 詳細ページを表示する関数
function showDetail(type) {
  const data = pageData[type];
  if (!data) return;

  // タイトルとバナー画像を設定
  document.getElementById("detail-title").textContent = data.title;
  document.getElementById("detail-banner").style.backgroundImage = `url('${data.bannerImage}')`;

  // 3枚のカードを生成
  const container = document.getElementById("cards-container");
  container.innerHTML = ""; // 一旦クリア

  data.cards.forEach(card => {
    const cardHTML = `
      <div class="info-card">
        <h2>${card.title}</h2>
        <p>${card.desc}</p>
        <a href="${card.link}" class="card-detail-btn">詳細＞</a>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", cardHTML);
  });

  // 画面の表示切り替え
  document.getElementById("top-view").classList.add("hidden");
  document.getElementById("detail-view").classList.remove("hidden");
  document.body.classList.add("is-detail"); // ハンバーガーの線を白にする
  window.scrollTo(0, 0);
}

// トップページに戻る関数
function showTop() {
  document.getElementById("detail-view").classList.add("hidden");
  document.getElementById("top-view").classList.remove("hidden");
  document.body.classList.remove("is-detail");
  window.scrollTo(0, 0);
}

/* ================= ハンバーガーメニュー ================= */
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("js-hamburger");
  const panel = document.getElementById("js-panel");
  const backdrop = document.getElementById("js-backdrop");
  const groups = document.getElementById("js-menu-groups");

  // pageData から「陸上自衛隊 ／ 活動・組織・歴史」…のメニューを生成
  Object.keys(pageData).forEach(type => {
    const data = pageData[type];
    const subItems = data.cards
      .map(card => `<li><a href="${card.link}" data-type="${type}">${card.menuLabel}</a></li>`)
      .join("");

    groups.insertAdjacentHTML("beforeend", `
      <li class="panel-group">
        <a href="#" class="group-name" data-type="${type}">${data.title}</a>
        <ul class="sub-list">${subItems}</ul>
      </li>
    `);
  });

  function setMenu(open) {
    hamburger.classList.toggle("is-active", open);
    panel.classList.toggle("is-open", open);
    backdrop.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    hamburger.setAttribute("aria-expanded", String(open));
    hamburger.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    panel.setAttribute("aria-hidden", String(!open));
  }

  // ハンバーガー（×）ボタンで開閉
  hamburger.addEventListener("click", () => {
    setMenu(!panel.classList.contains("is-open"));
  });

  // 暗い背景をクリックで閉じる
  backdrop.addEventListener("click", () => setMenu(false));

  // Escキーで閉じる
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") setMenu(false);
  });

  // メニュー内のリンク：該当ページへ移動してパネルを閉じる
  panel.addEventListener("click", e => {
    const link = e.target.closest("a");
    if (!link) return;

    if (link.id === "js-menu-home") {
      showTop();
    } else if (link.dataset.type) {
      showDetail(link.dataset.type);
    }

    // リンク先が未設定（"#"）のときはページ遷移させない
    if (link.getAttribute("href") === "#") e.preventDefault();
    setMenu(false);
  });
});

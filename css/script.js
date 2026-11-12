// 陸・海・空それぞれのデータ定義
const pageData = {
  land: {
    title: "陸上自衛隊",
    bannerImage: "land_banner.jpg", // 陸の詳細バナー用画像
    cards: [
      { title: "主な活動", desc: "（軽い説明を書く）", link: "#" },
      { title: "組織・階級", desc: "（軽い説明を書く）", link: "#" },
      { title: "歴史・過去", desc: "（軽い説明を書く）", link: "#" }
    ]
  },
  sea: {
    title: "海上自衛隊",
    bannerImage: "sea_banner.jpg", // 海の詳細バナー用画像
    cards: [
      { title: "主な活動", desc: "（軽い説明を書く）", link: "#" },
      { title: "組織・階級", desc: "（軽い説明を書く）", link: "#" },
      { title: "歴史・過去", desc: "（軽い説明を書く）", link: "#" }
    ]
  },
  air: {
    title: "航空自衛隊",
    bannerImage: "air_banner.jpg", // 空の詳細バナー用画像
    cards: [
      { title: "主な活動", desc: "（軽い説明を書く）", link: "#" },
      { title: "組織・階級", desc: "（軽い説明を書く）", link: "#" },
      { title: "歴史・過去", desc: "（軽い説明を書く）", link: "#" }
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
  window.scrollTo(0, 0);
}

// トップページに戻る関数
function showTop() {
  document.getElementById("detail-view").classList.add("hidden");
  document.getElementById("top-view").classList.remove("hidden");
  window.scrollTo(0, 0);
}

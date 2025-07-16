// الوضع الليلي
const toggleDark = document.getElementById("toggleDark");
toggleDark.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark") ? "on" : "off");
};
if (localStorage.getItem("darkMode") === "on") {
  document.body.classList.add("dark");
}

// البحث
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
  const value = this.value.toLowerCase();
  document.querySelectorAll(".tool-card").forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(value) ? "block" : "none";
  });
});

// التصنيفات
const filterButtons = document.querySelectorAll(".filters button");
filterButtons.forEach(btn => {
  btn.onclick = () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const category = btn.getAttribute("data-category");
    document.querySelectorAll(".tool-card").forEach(card => {
      card.style.display = (category === "all" || card.dataset.category === category) ? "block" : "none";
    });
  };
});

// الترجمة
const langSelect = document.getElementById("langSelect");
function applyTranslations(lang) {
  fetch("lang.json")
    .then(res => res.json())
    .then(data => {
      const t = data[lang];
      if (!t) return;

      // عناصر ثابتة
      document.getElementById("subtitle").textContent = t.subtitle;
      document.getElementById("searchInput").placeholder = t.search;
      document.getElementById("btnAll").textContent = "🔍 " + t.all;
      document.getElementById("btnWriting").textContent = "✍️ " + t.writing;
      document.getElementById("btnImage").textContent = "🖼️ " + t.image;
      document.getElementById("btnVideo").textContent = "🎬 " + t.video;
      document.getElementById("btnAudio").textContent = "🔊 " + t.audio;
      document.getElementById("btnChat").textContent = "💬 " + t.chat;
      document.getElementById("btnSearch").textContent = "📡 " + t.search_category;

      // أدوات
      document.querySelectorAll(".tool-card").forEach(card => {
        const key = card.getAttribute("data-key");
        if (t[`tool_${key}_name`]) {
          card.querySelector("h3 span").textContent = t[`tool_${key}_name`];
        }
        if (t[`tool_${key}_desc`]) {
          card.querySelector("p").textContent = t[`tool_${key}_desc`];
        }
        card.querySelector("a").textContent = t.try_now;
      });

      localStorage.setItem("lang", lang);
    });
}

langSelect.addEventListener("change", () => {
  applyTranslations(langSelect.value);
});

const savedLang = localStorage.getItem("lang") || "ar";
langSelect.value = savedLang;
applyTranslations(savedLang);

// تحميل الأدوات من ملف tools.json
fetch("tools.json")
  .then(res => res.json())
  .then(tools => {
    const container = document.getElementById("toolsList");
    tools.forEach(tool => {
      const card = document.createElement("div");
      card.className = "tool-card";
      card.setAttribute("data-category", tool.category);
      card.setAttribute("data-key", tool.key);

      card.innerHTML = `
        <h3><img src="${tool.logo}" alt="${tool.name} logo"> <span>${tool.name}</span></h3>
        <p>${tool.desc}</p>
        <a href="${tool.link}" target="_blank">🔗 جرب الآن</a>
      `;
      container.appendChild(card);
    });

    // تطبيق الترجمة بعد تحميل الأدوات
    applyTranslations(savedLang);
  });

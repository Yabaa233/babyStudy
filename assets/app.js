/* Shared helpers for English Study Buddy (static site) */

const DEFAULT_CONFIG = {
  siteTitle: "English Study Buddy",
  siteTitleZh: "英语学伴",
  tagline: "两人一起学英语",
  partners: [
    { id: "A", name: "Partner A", nameZh: "学伴 A", bio: "", bioEn: "" },
    { id: "B", name: "Partner B", nameZh: "学伴 B", bio: "", bioEn: "" },
  ],
  weekGoal: "",
};

async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`无法加载 ${path}（HTTP ${res.status}）。请用本地服务器或 GitHub Pages 打开，不要直接用 file://。`);
  }
  return res.json();
}

async function loadConfig() {
  try {
    return await loadJSON("config.json");
  } catch (e) {
    console.warn(e);
    return DEFAULT_CONFIG;
  }
}

function partnerName(config, id) {
  const p = (config.partners || []).find((x) => x.id === id);
  if (!p) return id;
  return p.nameZh || p.name || id;
}

function partnerLabel(config, id) {
  const p = (config.partners || []).find((x) => x.id === id);
  if (!p) return id;
  const zh = p.nameZh || `学伴 ${id}`;
  const en = p.name || `Partner ${id}`;
  return `${zh} / ${en}`;
}

function setActiveNav() {
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav a[data-page]").forEach((a) => {
    const target = (a.getAttribute("data-page") || "").toLowerCase();
    if (target === page || (page === "" && target === "index.html")) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }
  });
}

function showFetchError(el, err) {
  if (!el) return;
  el.innerHTML = `<div class="error-box"><strong>加载失败</strong><br>${escapeHtml(
    err.message || String(err)
  )}<br><br>提示：请在仓库目录运行 <code>python3 -m http.server 8080</code>，然后打开 <code>http://localhost:8080</code>；或部署到 GitHub Pages 后访问。</div>`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(iso) {
  if (!iso) return "";
  return iso;
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
});

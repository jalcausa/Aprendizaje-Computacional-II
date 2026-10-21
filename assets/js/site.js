/* Comportamiento común: tema, menú, índice lateral, bloques de código, KaTeX. */
(function () {
  "use strict";

  const root = document.documentElement;
  const THEME_KEY = "acii-theme";

  function storedTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }
  const saved = storedTheme();
  if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);

  function isDark() {
    const t = root.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  const SUN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const MOON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>';

  function paintToggle(btn) {
    btn.innerHTML = isDark() ? SUN : MOON;
    btn.setAttribute("aria-label", isDark() ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
  }

  document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      paintToggle(toggle);
      toggle.addEventListener("click", function () {
        const next = isDark() ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* sin almacenamiento */ }
        paintToggle(toggle);
      });
    }

    const menu = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".topnav");
    if (menu && nav) menu.addEventListener("click", function () { nav.classList.toggle("open"); });

    enhanceCode();
    buildToc();
    readingProgress();
    renderMath(document.body);
  });

  /* ---------- bloques de código: <pre data-code="título"> ---------- */
  function enhanceCode() {
    document.querySelectorAll("pre[data-code]").forEach(function (pre) {
      const wrap = document.createElement("div");
      wrap.className = "code";
      const head = document.createElement("div");
      head.className = "code-head";
      const title = document.createElement("span");
      title.textContent = pre.getAttribute("data-code") || "python";
      const btn = document.createElement("button");
      btn.className = "copy";
      btn.type = "button";
      btn.textContent = "copiar";
      head.append(title, btn);
      const code = document.createElement("code");
      code.className = "language-" + (pre.getAttribute("data-lang") || "python");
      code.innerHTML = pre.innerHTML.replace(/^\n/, "").replace(/\s+$/, "");
      pre.innerHTML = "";
      pre.removeAttribute("data-code");
      pre.appendChild(code);
      pre.parentNode.insertBefore(wrap, pre);
      wrap.append(head, pre);
      const note = wrap.nextElementSibling;
      if (note && note.classList.contains("code-note")) {
        note.classList.remove("code-note");
        note.classList.add("note");
        wrap.appendChild(note);
      }
      if (window.hljs) window.hljs.highlightElement(code);
      btn.addEventListener("click", function () {
        const text = code.innerText;
        const done = function () { btn.textContent = "copiado ✓"; setTimeout(function () { btn.textContent = "copiar"; }, 1400); };
        if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
      });
    });
  }

  /* ---------- índice lateral con resaltado de la sección visible ---------- */
  function buildToc() {
    const toc = document.querySelector(".toc ol[data-auto]");
    const notes = document.querySelector(".notes");
    if (!toc || !notes) return;
    const items = [];
    notes.querySelectorAll(".part-title[data-part], section[id] > h2.sec, section[id] > .practice-head h2, section[id] h3[id]").forEach(function (el) {
      if (el.classList.contains("part-title")) {
        const li = document.createElement("li");
        li.className = "toc-part";
        li.textContent = el.getAttribute("data-part");
        toc.appendChild(li);
        return;
      }
      const isH2 = el.tagName === "H2";
      const section = el.closest("section[id]");
      const id = isH2 ? section.id : el.id;
      const a = document.createElement("a");
      a.href = "#" + id;
      a.textContent = el.getAttribute("data-short") || el.textContent.replace(/^\s*[\d.]+\s*/, "").trim();
      if (isH2) {
        const li = document.createElement("li");
        li.appendChild(a);
        const sub = document.createElement("ol");
        li.appendChild(sub);
        toc.appendChild(li);
        items.push({ a: a, target: section, sub: sub });
      } else {
        const parent = items.filter(function (i) { return !i.isSub; }).pop();
        const li = document.createElement("li");
        li.appendChild(a);
        (parent ? parent.sub : toc).appendChild(li);
        items.push({ a: a, target: el, isSub: true });
      }
    });
    if (!("IntersectionObserver" in window)) return;
    let current = null;
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          const item = items.find(function (i) { return i.target === e.target; });
          if (item) {
            if (current) current.classList.remove("active");
            current = item.a;
            current.classList.add("active");
          }
        }
      });
    }, { rootMargin: "-80px 0px -70% 0px" });
    items.forEach(function (i) { obs.observe(i.target); });
  }

  function readingProgress() {
    const bar = document.querySelector(".progress-line");
    if (!bar) return;
    const update = function () {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function renderMath(el) {
    if (window.renderMathInElement) {
      window.renderMathInElement(el, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\(", right: "\\)", display: false },
          { left: "$", right: "$", display: false }
        ],
        throwOnError: false,
        ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"]
      });
    }
  }
  window.ACII = { renderMath: renderMath };
})();

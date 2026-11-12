/* Aplicación de test: filtros, modos práctica/examen/repaso, progreso en localStorage. */
(function () {
  "use strict";

  const STORE_KEY = "acii-progress-v1";
  const LETTERS = ["A", "B", "C", "D", "E", "F"];
  const PARCIALES = [
    { v: "1", label: "Parcial 1 · T1–T3" },
    { v: "2", label: "Parcial 2 · Labs" }
  ];
  const TEMAS = [
    { v: "T1", label: "Tema 1 · RNA", parcial: "1" },
    { v: "T2", label: "Tema 2 · CNN", parcial: "1" },
    { v: "T3", label: "Tema 3 · GAN", parcial: "1" },
    { v: "L0", label: "Lab 0 · Autorregresión", parcial: "2" },
    { v: "L1", label: "Lab 1 · Texto y Zipf", parcial: "2" },
    { v: "L2", label: "Lab 2 · RNN", parcial: "2" }
  ];
  const BLOQUES = [
    { v: "teoria", label: "Teoría" },
    { v: "P0", label: "P0 · Perceptrón" },
    { v: "P1", label: "P1 · Hiperparámetros" },
    { v: "P2", label: "P2 · Par / impar" },
    { v: "P3", label: "P3 · CNN" },
    { v: "P4", label: "P4 · Transfer" },
    { v: "P5", label: "P5 · GAN" },
    { v: "L0", label: "L0 · Cuaderno" },
    { v: "L1", label: "L1 · Cuaderno" },
    { v: "L2", label: "L2 · Cuaderno" }
  ];
  const TIPOS = [
    { v: "teoria", label: "Teoría" },
    { v: "practica", label: "Prácticas" },
    { v: "codigo", label: "Código / fallos" },
    { v: "calculo", label: "Cálculo" }
  ];
  const TIPO_LABEL = { teoria: "Teoría", practica: "Práctica", codigo: "Código", calculo: "Cálculo" };

  let bank = [];
  let progress = {};
  const filters = { parcial: new Set(), tema: new Set(), practica: new Set(), tipo: new Set() };
  let mode = "practica";
  let session = null;
  let timerId = null;
  let resetArmed = false;

  const $ = function (id) { return document.getElementById(id); };

  /* ------------------------------------------------------------ almacenamiento */
  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveProgress() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(progress)); } catch (e) { /* modo privado */ }
  }
  function record(q, ok) {
    const p = progress[q.id] || { n: 0, ok: 0, last: null, flag: false };
    p.n += 1;
    if (ok) p.ok += 1;
    p.last = ok;
    progress[q.id] = p;
    saveProgress();
  }

  /* ------------------------------------------------------------ utilidades */
  function blockOf(q) { return q.p || "teoria"; }
  function parcialOf(q) { return (TEMAS.find(function (t) { return t.v === q.t; }) || {}).parcial; }
  function isMulti(q) { return Array.isArray(q.a); }
  function correctSet(q) { return new Set(isMulti(q) ? q.a : [q.a]); }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function sameSet(a, b) {
    if (a.size !== b.size) return false;
    for (const x of a) if (!b.has(x)) return false;
    return true;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }
  function renderMath(el) { if (window.ACII) window.ACII.renderMath(el); }

  /* ------------------------------------------------------------ filtros */
  function matches(q) {
    return (!filters.parcial.size || filters.parcial.has(parcialOf(q))) &&
      (!filters.tema.size || filters.tema.has(q.t)) &&
      (!filters.practica.size || filters.practica.has(blockOf(q))) &&
      (!filters.tipo.size || filters.tipo.has(q.k));
  }
  function pool() {
    let list = bank.filter(matches);
    if (mode === "repaso") {
      list = list.filter(function (q) { const p = progress[q.id]; return p && (p.last === false || p.flag); });
    }
    return list;
  }

  function buildChips(containerId, defs, key, countFn) {
    const box = $(containerId);
    box.innerHTML = "";
    const all = document.createElement("button");
    all.type = "button";
    all.className = "chip";
    all.textContent = "Todos";
    all.addEventListener("click", function () { filters[key].clear(); refreshChips(); });
    box.appendChild(all);
    defs.forEach(function (d) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.dataset.value = d.v;
      b.innerHTML = esc(d.label) + ' <span class="count">' + countFn(d.v) + "</span>";
      b.addEventListener("click", function () {
        if (filters[key].has(d.v)) filters[key].delete(d.v); else filters[key].add(d.v);
        refreshChips();
      });
      box.appendChild(b);
    });
  }

  function refreshChips() {
    [["f-parcial", "parcial"], ["f-tema", "tema"], ["f-practica", "practica"], ["f-tipo", "tipo"]].forEach(function (pair) {
      const set = filters[pair[1]];
      $(pair[0]).querySelectorAll(".chip").forEach(function (chip) {
        const v = chip.dataset.value;
        chip.setAttribute("aria-pressed", v ? String(set.has(v)) : String(set.size === 0));
      });
    });
    updateAvail();
  }

  function updateAvail() {
    const n = pool().length;
    $("avail").textContent = n === 1 ? "1 pregunta disponible con estos filtros" : n + " preguntas disponibles con estos filtros";
    $("btn-start").disabled = n === 0;
    if (mode === "repaso" && n === 0) $("avail").textContent = "No hay preguntas falladas ni marcadas con estos filtros. ¡Bien!";
  }

  function setMode(m) {
    mode = m;
    document.querySelectorAll(".mode").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.mode === m)); });
    $("wrap-penal").hidden = m !== "examen";
    $("wrap-timer").hidden = m !== "examen";
    updateAvail();
  }

  function updateStats() {
    const total = bank.length;
    let seen = 0, master = 0, fail = 0;
    bank.forEach(function (q) {
      const p = progress[q.id];
      if (p && p.n) {
        seen++;
        if (p.last) master++; else fail++;
      }
    });
    $("st-total").textContent = total;
    $("st-seen").textContent = seen;
    $("st-master").textContent = master;
    $("st-fail").textContent = fail;
    $("st-meter").style.width = (total ? (master / total) * 100 : 0) + "%";
  }

  function readHash() {
    const h = new URLSearchParams(location.hash.replace(/^#/, ""));
    if (h.get("parcial")) h.get("parcial").split(",").forEach(function (v) { filters.parcial.add(v); });
    if (h.get("tema")) h.get("tema").split(",").forEach(function (v) { filters.tema.add(v); });
    if (h.get("practica")) h.get("practica").split(",").forEach(function (v) { filters.practica.add(v); });
    if (h.get("tipo")) h.get("tipo").split(",").forEach(function (v) { filters.tipo.add(v); });
    if (h.get("modo") === "examen") setMode("examen");
    else if (h.get("modo") === "repaso") setMode("repaso");
  }

  /* ------------------------------------------------------------ sesión */
  function start(customList) {
    let list = customList || shuffle(pool());
    const nOpt = $("opt-n").value;
    if (!customList && nOpt !== "all") list = list.slice(0, parseInt(nOpt, 10));
    if (!list.length) return;
    const shuffleOpts = $("opt-shuffle-opts").checked;
    session = {
      mode: mode === "repaso" ? "practica" : mode,
      label: mode,
      penal: mode === "examen" && $("opt-penal").checked,
      items: list.map(function (q) {
        const order = q.o.map(function (_, i) { return i; });
        return { q: q, order: shuffleOpts ? shuffle(order) : order, sel: new Set(), checked: false, ok: null };
      }),
      idx: 0,
      started: Date.now()
    };
    $("setup").hidden = true;
    $("result").hidden = true;
    $("run").hidden = false;
    startTimer(mode === "examen" && $("opt-timer").checked ? list.length * 60 : 0);
    show(0);
    window.scrollTo({ top: $("run").offsetTop - 90, behavior: "smooth" });
  }

  function startTimer(seconds) {
    clearInterval(timerId);
    const el = $("q-timer");
    if (!seconds) { el.hidden = true; return; }
    el.hidden = false;
    const end = Date.now() + seconds * 1000;
    const tick = function () {
      const left = Math.max(0, Math.round((end - Date.now()) / 1000));
      el.textContent = String(Math.floor(left / 60)).padStart(2, "0") + ":" + String(left % 60).padStart(2, "0");
      el.style.color = left < 60 ? "var(--bad)" : "";
      if (left === 0) { clearInterval(timerId); finish(); }
    };
    tick();
    timerId = setInterval(tick, 1000);
  }

  function show(i) {
    session.idx = i;
    const it = session.items[i];
    const q = it.q;
    const total = session.items.length;
    $("q-pos").textContent = "Pregunta " + (i + 1) + " / " + total;
    $("q-prog").style.width = ((i + 1) / total) * 100 + "%";

    const temaLabel = (TEMAS.find(function (t) { return t.v === q.t; }) || {}).label || q.t;
    const meta = [
      '<span class="tag">' + esc(temaLabel) + "</span>",
      q.p ? '<span class="tag gold">' + esc(q.p) + "</span>" : "",
      '<span class="tag type-' + q.k + '">' + esc(TIPO_LABEL[q.k] || q.k) + "</span>",
      '<span class="tag" style="background:var(--surface-2);color:var(--muted)">' + esc(q.s) + "</span>"
    ].join("");
    $("q-meta").innerHTML = meta;
    $("q-text").innerHTML = q.q;
    $("q-hint").hidden = !isMulti(q) || it.checked;
    $("q-hint").textContent = session.mode === "examen" ? "Selecciona todas las correctas." : "Selecciona todas las correctas y pulsa «Comprobar».";

    const pre = $("q-code");
    if (q.c) {
      pre.hidden = false;
      const code = document.createElement("code");
      code.className = "language-python";
      code.textContent = q.c;
      pre.innerHTML = "";
      pre.appendChild(code);
      if (window.hljs) window.hljs.highlightElement(code);
    } else {
      pre.hidden = true;
    }

    const box = $("q-opts");
    box.innerHTML = "";
    it.order.forEach(function (orig, pos) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "opt";
      b.dataset.orig = orig;
      b.innerHTML = '<span class="k">' + LETTERS[pos] + '</span><span class="t">' + q.o[orig] + "</span>";
      b.addEventListener("click", function () { choose(orig); });
      box.appendChild(b);
    });
    paintOptions();
    renderMath($("run"));

    const p = progress[q.id];
    $("q-flag").setAttribute("aria-pressed", String(!!(p && p.flag)));
    $("q-prev").disabled = i === 0;
    updateNavButtons();
  }

  function updateNavButtons() {
    const it = session.items[session.idx];
    const last = session.idx === session.items.length - 1;
    const check = $("q-check");
    if (session.mode === "examen") {
      check.hidden = true;
      $("q-next").textContent = last ? "Terminar y corregir" : "Siguiente →";
    } else {
      check.hidden = !isMulti(it.q) || it.checked;
      check.disabled = it.sel.size === 0;
      $("q-next").textContent = last ? "Ver resultado" : "Siguiente →";
    }
  }

  function choose(orig) {
    const it = session.items[session.idx];
    if (it.checked) return;
    if (isMulti(it.q)) {
      if (it.sel.has(orig)) it.sel.delete(orig); else it.sel.add(orig);
      paintOptions();
      updateNavButtons();
    } else {
      it.sel = new Set([orig]);
      if (session.mode === "examen") { paintOptions(); updateNavButtons(); }
      else check();
    }
  }

  function check() {
    const it = session.items[session.idx];
    if (it.checked || it.sel.size === 0) return;
    it.checked = true;
    it.ok = sameSet(it.sel, correctSet(it.q));
    record(it.q, it.ok);
    paintOptions();
    updateNavButtons();
    $("q-hint").hidden = true;
    updateStats();
  }

  function paintOptions() {
    const it = session.items[session.idx];
    const correct = correctSet(it.q);
    const reveal = it.checked && session.mode !== "examen";
    $("q-opts").querySelectorAll(".opt").forEach(function (b) {
      const orig = parseInt(b.dataset.orig, 10);
      b.classList.remove("sel", "correct", "wrong");
      b.disabled = reveal;
      if (reveal) {
        if (correct.has(orig)) b.classList.add("correct");
        else if (it.sel.has(orig)) b.classList.add("wrong");
      } else if (it.sel.has(orig)) {
        b.classList.add("sel");
      }
    });
    const fb = $("q-fb");
    if (reveal) {
      fb.hidden = false;
      fb.className = "feedback " + (it.ok ? "ok" : "bad");
      const letters = it.order.map(function (o, pos) { return correct.has(o) ? LETTERS[pos] : null; }).filter(Boolean).join(", ");
      fb.innerHTML = '<div class="verdict">' + (it.ok ? "✓ Correcto" : "✕ Incorrecto · respuesta: " + letters) + "</div>" +
        "<p>" + it.q.e + "</p>" +
        (it.q.r ? '<p><a href="' + it.q.r + '">Repasar en los apuntes →</a></p>' : "");
      renderMath(fb);
    } else {
      fb.hidden = true;
    }
  }

  function next() {
    const it = session.items[session.idx];
    if (session.mode !== "examen" && !it.checked && it.sel.size && isMulti(it.q)) { check(); return; }
    if (session.idx < session.items.length - 1) show(session.idx + 1);
    else finish();
  }

  /* ------------------------------------------------------------ resultado */
  function finish() {
    clearInterval(timerId);
    if (!session) return;
    if (session.mode === "examen") {
      session.items.forEach(function (it) {
        if (it.sel.size) {
          it.checked = true;
          it.ok = sameSet(it.sel, correctSet(it.q));
          record(it.q, it.ok);
        }
      });
    }
    const answered = session.items.filter(function (it) { return it.checked; });
    const ok = answered.filter(function (it) { return it.ok; }).length;
    const wrong = answered.length - ok;
    const total = session.mode === "examen" ? session.items.length : Math.max(answered.length, 1);
    const raw = session.penal ? ok - wrong / 3 : ok;
    const score = Math.max(0, (raw / total) * 10);

    $("run").hidden = true;
    $("result").hidden = false;
    $("r-mode").textContent = session.mode === "examen" ? "Simulacro de examen" : (session.label === "repaso" ? "Repaso de fallos" : "Práctica guiada");
    $("r-score").innerHTML = score.toFixed(1).replace(".", ",") + "<small>/10</small>";
    const blank = session.items.length - answered.length;
    const mins = Math.round((Date.now() - session.started) / 60000);
    $("r-summary").textContent = ok + " correctas · " + wrong + " incorrectas" + (blank ? " · " + blank + " sin responder" : "") +
      (session.penal ? " · penalización −1/3" : "") + " · " + mins + " min";

    const bySub = {};
    session.items.forEach(function (it) {
      const k = it.q.s;
      bySub[k] = bySub[k] || { ok: 0, n: 0 };
      bySub[k].n++;
      if (it.ok) bySub[k].ok++;
    });
    $("r-breakdown").innerHTML = Object.keys(bySub).sort(function (a, b) {
      return bySub[a].ok / bySub[a].n - bySub[b].ok / bySub[b].n;
    }).map(function (k) {
      const v = bySub[k];
      return '<div class="bd-row"><span>' + esc(k) + '</span><div class="track"><i style="width:' + (v.ok / v.n) * 100 + '%"></i></div><span class="v">' + v.ok + "/" + v.n + "</span></div>";
    }).join("");

    $("r-review").innerHTML = session.items.map(function (it, i) {
      const correct = correctSet(it.q);
      const fmt = function (set) {
        return it.order.map(function (o, pos) { return set.has(o) ? LETTERS[pos] + ") " + it.q.o[o] : null; }).filter(Boolean).join(" · ") || "sin responder";
      };
      const cls = it.ok ? "review-item ok" : "review-item";
      return '<div class="' + cls + '"><div class="rq">' + (i + 1) + ". " + it.q.q + "</div>" +
        (it.q.c ? '<pre class="qcode" style="margin:.4rem 0 .6rem"><code>' + esc(it.q.c) + "</code></pre>" : "") +
        "<p><strong>Tu respuesta:</strong> " + fmt(it.sel) + "</p>" +
        (it.ok ? "" : "<p><strong>Correcta:</strong> " + fmt(correct) + "</p>") +
        "<p>" + it.q.e + "</p>" +
        (it.q.r ? '<p><a href="' + it.q.r + '">Repasar en los apuntes →</a></p>' : "") + "</div>";
    }).join("");
    renderMath($("result"));
    $("r-retry-wrong").hidden = !session.items.some(function (it) { return !it.ok; });
    updateStats();
    window.scrollTo({ top: $("result").offsetTop - 90, behavior: "smooth" });
  }

  function backToSetup() {
    clearInterval(timerId);
    session = null;
    $("run").hidden = true;
    $("result").hidden = true;
    $("setup").hidden = false;
    updateAvail();
  }

  /* ------------------------------------------------------------ eventos */
  function bind() {
    document.querySelectorAll(".mode").forEach(function (b) {
      b.addEventListener("click", function () { setMode(b.dataset.mode); });
    });
    $("btn-start").addEventListener("click", function () { start(); });
    $("btn-reset").addEventListener("click", function () {
      if (!resetArmed) {
        resetArmed = true;
        $("reset-confirm").hidden = false;
        setTimeout(function () { resetArmed = false; $("reset-confirm").hidden = true; }, 4000);
        return;
      }
      progress = {};
      saveProgress();
      resetArmed = false;
      $("reset-confirm").hidden = true;
      updateStats();
      updateAvail();
    });
    $("q-next").addEventListener("click", next);
    $("q-prev").addEventListener("click", function () { if (session.idx > 0) show(session.idx - 1); });
    $("q-check").addEventListener("click", check);
    $("q-quit").addEventListener("click", finish);
    $("q-flag").addEventListener("click", function () {
      const q = session.items[session.idx].q;
      const p = progress[q.id] || { n: 0, ok: 0, last: null, flag: false };
      p.flag = !p.flag;
      progress[q.id] = p;
      saveProgress();
      $("q-flag").setAttribute("aria-pressed", String(p.flag));
    });
    $("r-again").addEventListener("click", backToSetup);
    $("r-retry-wrong").addEventListener("click", function () {
      const wrong = session.items.filter(function (it) { return !it.ok; }).map(function (it) { return it.q; });
      setMode("practica");
      start(shuffle(wrong));
    });
    document.addEventListener("keydown", function (ev) {
      if (!session || $("run").hidden) return;
      const tag = (ev.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "select" || tag === "textarea") return;
      const it = session.items[session.idx];
      const key = ev.key.toLowerCase();
      let pos = -1;
      if (/^[1-6]$/.test(key)) pos = parseInt(key, 10) - 1;
      else if (/^[a-f]$/.test(key) && key !== "f") pos = key.charCodeAt(0) - 97;
      if (pos >= 0 && pos < it.order.length) { ev.preventDefault(); choose(it.order[pos]); return; }
      if (key === "enter") {
        ev.preventDefault();
        if (session.mode !== "examen" && isMulti(it.q) && !it.checked && it.sel.size) check(); else next();
      } else if (key === "arrowright") { next(); }
      else if (key === "arrowleft" && session.idx > 0) { show(session.idx - 1); }
      else if (key === "f") { $("q-flag").click(); }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    bank = (window.PREGUNTAS || []).slice();
    progress = loadProgress();
    const count = function (field, fn) {
      return function (v) { return bank.filter(function (q) { return fn(q) === v; }).length; };
    };
    buildChips("f-parcial", PARCIALES, "parcial", count("parcial", parcialOf));
    buildChips("f-tema", TEMAS, "tema", count("t", function (q) { return q.t; }));
    buildChips("f-practica", BLOQUES, "practica", count("p", blockOf));
    buildChips("f-tipo", TIPOS, "tipo", count("k", function (q) { return q.k; }));
    bind();
    setMode("practica");
    readHash();
    refreshChips();
    updateStats();
  });
})();

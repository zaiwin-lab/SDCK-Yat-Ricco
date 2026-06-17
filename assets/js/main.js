/* ============================================================
   Yat Ricco — interactions
   ============================================================ */
(function () {
  "use strict";
  const WA = "60122201411";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const SUPPORTED = ["en", "ms", "zh", "ib"];
  const LABEL = { en: "EN", ms: "BM", zh: "中", ib: "IB" };

  let lang = localStorage.getItem("yr_lang");
  if (!SUPPORTED.includes(lang)) {
    const nav = (navigator.language || "en").toLowerCase();
    lang = nav.startsWith("ms") ? "ms" : nav.startsWith("zh") ? "zh" : "en";
  }

  const t = (key) => (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;

  /* ---------- Apply translations ---------- */
  function applyI18n() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach((el) => { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.getAttribute("data-i18n-ph")); });
    $("#langLabel").textContent = LABEL[lang];
    $$(".lang-menu button").forEach((b) => b.setAttribute("aria-current", String(b.dataset.lang === lang)));
    renderProducts();
    renderChatQuick();
  }

  function setLang(l) {
    if (!SUPPORTED.includes(l)) return;
    lang = l;
    localStorage.setItem("yr_lang", l);
    applyI18n();
  }

  /* ---------- Year ---------- */
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Activation marquee (KOBIS standard) ---------- */
  (function buildMarquees() {
    const NOTE = "This website is built by KOBIS Berhad — Please Make the Activation Payment. Thank You.";
    const unit = `<span><i class="sep">✦</i>${NOTE}</span>`;
    const group = `<div class="marquee-group" aria-hidden="false">${unit.repeat(4)}</div>`;
    // two identical groups => seamless -50% loop
    const html = group + group.replace('aria-hidden="false"', 'aria-hidden="true"');
    ["#mqTop", "#mqMid"].forEach((sel) => { const el = $(sel); if (el) el.innerHTML = html; });
  })();

  /* ---------- Nav: scroll state ---------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const navToggle = $("#navToggle");
  const closeMenu = () => { document.body.classList.remove("menu-open"); navToggle.setAttribute("aria-expanded", "false"); };
  navToggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  $$("#navLinks a").forEach((a) => a.addEventListener("click", closeMenu));

  /* ---------- Language dropdown ---------- */
  const langWrap = $("#lang"), langBtn = $("#langBtn");
  langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = langWrap.classList.toggle("open");
    langBtn.setAttribute("aria-expanded", String(open));
  });
  $$(".lang-menu button").forEach((b) =>
    b.addEventListener("click", () => { setLang(b.dataset.lang); langWrap.classList.remove("open"); langBtn.setAttribute("aria-expanded", "false"); })
  );
  document.addEventListener("click", (e) => { if (!langWrap.contains(e.target)) { langWrap.classList.remove("open"); langBtn.setAttribute("aria-expanded", "false"); } });

  /* ---------- Products ---------- */
  function renderProducts() {
    const grid = $("#prodGrid");
    if (!grid) return;
    grid.innerHTML = PRODUCTS.map((p, i) => {
      const name = p.name[lang] || p.name.en;
      const desc = p.desc[lang] || p.desc.en;
      const tag = p.tagKey && TAGS[p.tagKey] ? `<span class="card-tag">${TAGS[p.tagKey][lang] || TAGS[p.tagKey].en}</span>` : "";
      const isService = p.tagKey === "service";
      const msg = encodeURIComponent(`Hi Yat Ricco, I'm interested in "${p.name.en}" (${p.price}). Could you share more details?`);
      const action = isService
        ? `<button class="btn btn-wa" data-open-booking>${t("hero.ctaBook").length > 18 ? t("prod.order") : t("hero.ctaBook")}</button>`
        : `<a class="btn btn-wa" href="https://wa.me/${WA}?text=${msg}" target="_blank" rel="noopener">${t("prod.order")}</a>`;
      const fromLabel = { en: "from", ms: "dari", zh: "起", ib: "ari" }[lang] || "from";
      const priceMarkup = isService
        ? `<span class="price">${p.price}</span>`
        : `<span class="price"><span>${fromLabel}</span>${p.price}</span>`;
      return `
      <article class="card" data-reveal style="--d:${(i % 3) * 100}ms">
        <div class="card-media">${tag}<img src="${p.img}" alt="${p.alt}" loading="lazy" width="700" height="481" /></div>
        <div class="card-body">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="card-foot">
            ${priceMarkup}
            ${action}
          </div>
        </div>
      </article>`;
    }).join("");
    bindBooking(grid);
    observeReveals(grid);
  }

  /* ---------- Reveal on scroll ---------- */
  let io;
  function observeReveals(scope = document) {
    if (!("IntersectionObserver" in window)) { $$("[data-reveal]", scope).forEach((el) => el.classList.add("in")); return; }
    if (!io) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    }
    $$("[data-reveal]:not(.in)", scope).forEach((el) => io.observe(el));
  }
  observeReveals();

  /* ---------- Hero load choreography ---------- */
  requestAnimationFrame(() => requestAnimationFrame(() => $("#hero").classList.add("loaded")));

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    const el = $("#toast");
    $("#toastMsg").textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 3200);
  }

  /* ---------- Booking modal ---------- */
  const backdrop = $("#backdrop"), modal = $("#bookingModal");
  let lastFocus = null;
  function openBooking() {
    lastFocus = document.activeElement;
    backdrop.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(() => $("#b-name").focus(), 60);
  }
  function closeBooking() {
    backdrop.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  function bindBooking(scope = document) { $$("[data-open-booking]", scope).forEach((b) => { if (!b._bk) { b._bk = 1; b.addEventListener("click", openBooking); } }); }
  bindBooking();
  $("#bookingClose").addEventListener("click", closeBooking);
  backdrop.addEventListener("click", closeBooking);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { if (backdrop.classList.contains("open")) closeBooking(); if (chat.classList.contains("open")) toggleChat(false); } });

  /* ---------- Forms → WhatsApp ---------- */
  function go(url) { toast(t("toast.sent")); setTimeout(() => window.open(url, "_blank", "noopener"), 350); }

  $("#enquiryForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    if (!f.checkValidity()) { f.reportValidity(); return; }
    const msg = `Hi Yat Ricco! 🌿%0A%0AName: ${enc(f.name.value)}%0APhone: ${enc(f.phone.value)}%0AInterested in: ${enc(f.interest.value)}%0A%0A${enc(f.message.value || "I'd like to know more.")}`;
    go(`https://wa.me/${WA}?text=${msg}`);
    f.reset();
  });

  $("#bookingForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    if (!f.checkValidity()) { f.reportValidity(); return; }
    const msg = `Hi Yat Ricco! I'd like to book a free consultation. 🌿%0A%0AName: ${enc(f.name.value)}%0APhone: ${enc(f.phone.value)}%0APreferred date: ${enc(f.date.value || "Flexible")}%0APreferred time: ${enc(f.time.value)}%0AGoal: ${enc(f.goal.value || "General wellness")}`;
    go(`https://wa.me/${WA}?text=${msg}`);
    f.reset();
    closeBooking();
  });
  function enc(s) { return encodeURIComponent(String(s).trim()); }

  /* ============================================================
     CHAT ASSISTANT (rule-based, on-device)
     ============================================================ */
  const chat = $("#chat"), chatFab = $("#chatFab"), chatBody = $("#chatBody"), chatQuick = $("#chatQuick");
  let chatStarted = false;

  function toggleChat(force) {
    const open = typeof force === "boolean" ? force : !chat.classList.contains("open");
    chat.classList.toggle("open", open);
    chatFab.classList.toggle("active", open);
    chatFab.setAttribute("aria-expanded", String(open));
    const ping = chatFab.querySelector(".ping");
    if (open && ping) ping.style.display = "none";
    if (open && !chatStarted) { chatStarted = true; botSay(t("chat.greeting")); }
    if (open) setTimeout(() => $("#chatInput").focus(), 120);
  }
  chatFab.addEventListener("click", () => toggleChat());
  $("#chatClose").addEventListener("click", () => toggleChat(false));

  function addMsg(text, who) {
    const d = document.createElement("div");
    d.className = "msg " + who;
    d.innerHTML = text;
    chatBody.appendChild(d);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  function botSay(text, delay = 650) {
    const typing = document.createElement("div");
    typing.className = "typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    chatBody.appendChild(typing);
    chatBody.scrollTop = chatBody.scrollHeight;
    return new Promise((res) => setTimeout(() => {
      typing.remove();
      addMsg(text, "bot");
      res();
    }, delay));
  }

  function renderChatQuick() {
    chatQuick.innerHTML = ["chat.q1", "chat.q2", "chat.q3", "chat.q4"].map((k) => `<button data-q="${k}">${t(k)}</button>`).join("");
    $$("#chatQuick button").forEach((b) => b.addEventListener("click", () => handleUser(b.textContent, b.dataset.q)));
  }

  const waLink = (text) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;

  const REPLIES = {
    "chat.q1": () => `${productList()}<br><br>${cta(t("prod.catalogue"), waLink("Hi Yat Ricco, please share your full product catalogue."))}`,
    "chat.q2": () => { setTimeout(openBooking, 400); return bookReply(); },
    "chat.q3": () => deliveryReply(),
    "chat.q4": () => `${humanReply()}<br><br>${cta(t("nav.cta"), waLink("Hi Yat Ricco, I'd like to speak with someone about wellness products."))}`
  };

  function productList() {
    const items = PRODUCTS.slice(0, 4).map((p) => `• <b>${(p.name[lang] || p.name.en)}</b> — ${p.price}`).join("<br>");
    const intro = { en: "Here are some of our favourites:", ms: "Berikut sebahagian kegemaran kami:", zh: "以下是我们的部分人气产品：", ib: "Tu sebagi ari barang ti dikedeka kami:" };
    return `${intro[lang] || intro.en}<br>${items}`;
  }
  function bookReply() {
    const m = { en: "Wonderful! I've opened the booking form for you. It's completely free and friendly. 🌿", ms: "Bagus! Saya telah buka borang tempahan untuk anda. Ia percuma sepenuhnya. 🌿", zh: "太好了！我已为您打开预约表单，完全免费且友善。🌿", ib: "Manah! Aku udah muka borang tempah ke nuan. Iya percuma magang. 🌿" };
    return m[lang] || m.en;
  }
  function deliveryReply() {
    const m = {
      en: "We deliver across Samarahan & Kuching, with options to reach you anywhere in Sarawak. You can pay online or choose pay-on-delivery where available. Want me to connect you on WhatsApp to arrange?",
      ms: "Kami menghantar ke seluruh Samarahan & Kuching, dengan pilihan ke mana-mana di Sarawak. Anda boleh bayar dalam talian atau bayar semasa hantar. Mahu saya hubungkan anda di WhatsApp?",
      zh: "我们覆盖沙马拉汉和古晋，并可送达砂拉越各地。可在线付款或货到付款（视地区而定）。需要我帮您在 WhatsApp 安排吗？",
      ib: "Kami nganterka ke serata Samarahan & Kuching, sereta tau datai ngagai serata Sarawak. Nuan ulih bayar online tauka bayar lebuh datai. Deka aku nyambung nuan ba WhatsApp?"
    };
    return `${m[lang] || m.en}<br><br>${cta(t("nav.cta"), waLink("Hi Yat Ricco, I'd like to ask about delivery and payment."))}`;
  }
  function humanReply() {
    const m = { en: "Of course, Netti and the team are happy to help personally.", ms: "Sudah tentu, Netti dan pasukan dengan senang hati membantu.", zh: "当然，Netti 和团队很乐意亲自为您服务。", ib: "Tentu, Netti enggau pasukan rinduka nulong nuan." };
    return m[lang] || m.en;
  }
  function fallback() {
    const m = {
      en: "Thanks for your message! For the quickest, most personal answer, tap below to chat with our team on WhatsApp, or pick an option above. 🌿",
      ms: "Terima kasih atas mesej anda! Untuk jawapan terpantas, ketik di bawah untuk berbual di WhatsApp, atau pilih pilihan di atas. 🌿",
      zh: "感谢您的留言！如需最快、最贴心的回复，请点击下方在 WhatsApp 与团队交流，或选择上方选项。🌿",
      ib: "Terima kasih ke pesan nuan! Ngambika saut ti pemandai, tekan ba baruh ngambika berandau ba WhatsApp, tauka pilih ba atas. 🌿"
    };
    return `${m[lang] || m.en}<br><br>${cta(t("nav.cta"), waLink("Hi Yat Ricco, I have a question."))}`;
  }
  function cta(label, url) { return `<a href="${url}" target="_blank" rel="noopener" style="display:inline-block;margin-top:2px;color:var(--clay-deep);font-weight:600;text-decoration:underline;text-underline-offset:3px">${label}</a>`; }

  function detectIntent(text) {
    const s = text.toLowerCase();
    if (/(price|cost|harga|多少|berapa|rega)/.test(s)) return "chat.q1";
    if (/(product|produk|barang|产品|catalog|katalog)/.test(s)) return "chat.q1";
    if (/(book|consult|tempah|appointment|rundingan|预约|咨询)/.test(s)) return "chat.q2";
    if (/(deliver|ship|pay|hantar|bayar|payment|penghantaran|配送|付款|送)/.test(s)) return "chat.q3";
    if (/(human|person|talk|call|cakap|orang|联系|真人|telefon|phone)/.test(s)) return "chat.q4";
    if (/(hi|hello|hai|tabi|你好|salam|helo)/.test(s)) return "greet";
    return null;
  }

  async function handleUser(text, quickKey) {
    addMsg(escapeHtml(text), "me");
    const key = quickKey || detectIntent(text);
    if (key === "greet") { await botSay(t("chat.greeting")); return; }
    if (key && REPLIES[key]) { await botSay(REPLIES[key]()); return; }
    await botSay(fallback());
  }
  function escapeHtml(s) { const d = document.createElement("div"); d.textContent = s; return d.innerHTML; }

  $("#chatForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = $("#chatInput");
    const v = input.value.trim();
    if (!v) return;
    input.value = "";
    handleUser(v);
  });

  /* ---------- init ---------- */
  applyI18n();
})();

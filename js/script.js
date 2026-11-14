(() => {
  "use strict";

  /* ===== CẤU HÌNH — chỉnh tại đây ===== */
  const CONFIG = {
    password: "160407",
    emptyMessage: "Em hãy nhập chìa khóa nhé.",
    wrongMessage: "Hình như em chưa tìm đúng chìa khóa rồi.",
    typingSpeed: 32, // ms mỗi ký tự
    letter: `Gửi Lan,

Thật ra anh đã suy nghĩ khá lâu không biết nên viết gì trong bức thư này.

Có lẽ anh chỉ muốn nói rằng, anh thật sự rất vui vì đã có cơ hội gặp crush của mình !!!

Đây là món quà đầu tiên anh tặng em, hong biết em có thích không nữa. Anh đã dành một chút thời gian và tâm huyết để chuẩn bị nó, hy vọng khi nhận được, em sẽ có một chút bất ngờ và mỉm cười nhóa.

Anh đến không chỉ với một món quà, mà còn mang theo cả sự chân thành nữa.

Anh thật sự mong có cơ hội được tìm hiểu em nhiều hơn, được biết về những điều em thích, những câu chuyện của em, những niềm vui và cả những điều đôi khi khiến em buồn.

Anh không muốn vội vàng hứa hẹn điều gì. Anh chỉ mong cả hai có thể từ từ tìm hiểu, dành thời gian cho nhau và bắt đầu một điều gì đó thật đẹp bằng sự chân thành.

Anh không biết sau này câu chuyện của chúng ta sẽ như thế nào, nhưng ở hiện tại, anh thật sự muốn nghiêm túc với cơ hội được tìm hiểu em á.

Mong chúng ta sẽ luôn là động lực của nhau. Cùng lớn lên, cùng cố gắng, cùng trở thành phiên bản tốt hơn của chính mình không phải vì ai bắt buộc, mà vì cả hai đều muốn gìn giữ tình yêu này thật lâu.

Hy vọng sau này, giữa rất nhiều đổi thay, điều không thay đổi vẫn là việc chúng ta luôn chọn nhau.

Anh muốn nói là: ANH YÊU EM RẤT NHIỀU ❤️

`,
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, reduced ? 0 : ms));

  const state = {
    current: 0,
    busy: false,
    revealed: false,
    letterStarted: false,
  };
  const chapters = $$(".chapter");
  const dots = $$(".dot");

  /* ===== Bầu trời sao + hạt sáng ===== */
  function initSky() {
    const c = $("#sky"),
      ctx = c.getContext("2d");
    let w,
      h,
      stars = [],
      dust = [];
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = innerWidth;
      h = innerHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(Math.round((w * h) / 9000), 110);
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.1 + 0.3,
        p: Math.random() * 6.28,
        s: Math.random() * 1.5 + 0.5,
      }));
      dust = Array.from({ length: 14 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 1,
        v: Math.random() * 0.2 + 0.05,
        c: Math.random() > 0.5 ? "243,166,200" : "200,182,226",
      }));
    }
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        ctx.globalAlpha =
          0.35 + 0.65 * Math.abs(Math.sin(t * 0.001 * s.s + s.p));
        ctx.fillStyle = "#FFF8F5";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 6.283);
        ctx.fill();
      }
      for (const d of dust) {
        d.y -= d.v;
        if (d.y < -10) {
          d.y = h + 10;
          d.x = Math.random() * w;
        }
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = `rgb(${d.c})`;
        ctx.shadowColor = `rgb(${d.c})`;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, 6.283);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      if (!reduced) requestAnimationFrame(draw);
    }
    resize();
    addEventListener("resize", () => {
      resize();
      if (reduced) draw(0);
    });
    draw(0);
    if (!reduced) requestAnimationFrame(draw);
  }

  /* ===== Hiệu ứng ===== */
  function burstFrom(el, count = 30) {
    if (reduced) return;
    const r = el.getBoundingClientRect(),
      cx = r.left + r.width / 2,
      cy = r.top + r.height / 2;
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span"),
        a = Math.random() * 6.283,
        d = 60 + Math.random() * 130;
      s.className = "spark";
      s.style.cssText = `left:${cx}px;top:${cy}px;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px`;
      $("#fx").appendChild(s);
      s.addEventListener("animationend", () => s.remove());
    }
  }

  function risingHearts(total = 18) {
    if (reduced) return;
    let n = 0;
    const timer = setInterval(() => {
      const h = document.createElement("span");
      h.className = "float-heart";
      h.textContent = "♥";
      h.style.cssText = `left:${Math.random() * 95}%;font-size:${12 + Math.random() * 16}px;--d:${6 + Math.random() * 4}s;--x:${(Math.random() - 0.5) * 80}px;--r:${(Math.random() - 0.5) * 50}deg`;
      $("#fx").appendChild(h);
      h.addEventListener("animationend", () => h.remove());
      if (++n >= total) clearInterval(timer);
    }, 500);
  }

  /* ===== Chuyển chương ===== */
  function goTo(i) {
    if (i < 0 || i >= chapters.length || i === state.current) return;
    chapters[state.current].classList.remove("is-active");
    state.current = i;
    chapters[i].classList.add("is-active");
    chapters[i].scrollTop = 0;
    dots.forEach((d, k) => d.classList.toggle("is-on", k === i));
    document.body.classList.toggle("warm", i === 3);
    if (i === 1) revealChapter2();
  }

  function initNav() {
    $$("[data-go]").forEach((b) =>
      b.addEventListener("click", () =>
        goTo(state.current + (b.dataset.go === "next" ? 1 : -1)),
      ),
    );
  }

  /* ===== Chương 1: mật khẩu ===== */
  function initUnlock() {
    const form = $("#unlock-form"),
      input = $("#unlock-input"),
      msg = $("#unlock-msg"),
      heart = $("#heart-wrap");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (state.busy) return;
      const v = input.value.trim();
      if (!v) {
        msg.textContent = CONFIG.emptyMessage;
        return;
      }
      if (v !== CONFIG.password) {
        wrongKey();
        return;
      }
      state.busy = true;
      msg.textContent = "";
      input.blur();
      input.disabled = true;
      heart.classList.add("glow");
      await wait(900);
      heart.classList.add("break");
      burstFrom(heart);
      await wait(1300);
      goTo(1);
      state.busy = false;
    });
    function wrongKey() {
      msg.textContent = CONFIG.wrongMessage;
      [heart, input].forEach((el) => {
        el.classList.remove("shake", "bad");
        void el.offsetWidth;
      });
      heart.classList.add("shake");
      input.classList.add("bad");
      input.select();
    }
  }

  /* ===== Chương 2: hiện từng đoạn ===== */
  function revealChapter2() {
    if (state.revealed) return;
    state.revealed = true;
    $$("#chapter-2 .reveal").forEach((el, i) =>
      setTimeout(() => el.classList.add("show"), reduced ? 0 : 700 + i * 1400),
    );
  }

  /* ===== Ảnh: xử lý khi thiếu file ===== */
  function initPhotos() {
    $$(".photo").forEach((img) => {
      const fail = () => img.closest(".photo-frame").classList.add("missing");
      img.addEventListener("error", fail);
      if (img.complete && img.naturalWidth === 0) fail();
    });
  }

  /* ===== Chương 3: mở rộng từng mục ===== */
  function initScrapbook() {
    $$(".memory-toggle").forEach((btn) =>
      btn.addEventListener("click", () => {
        const m = btn.closest(".memory"),
          open = !m.classList.contains("open");
        m.classList.toggle("open", open);
        btn.setAttribute("aria-expanded", String(open));
      }),
    );
  }

  /* ===== Chương 4: phong thư ===== */
  function initLetter() {
    const env = $("#envelope"),
      hint = $("#env-hint"),
      paper = $("#letter"),
      text = $("#letter-text");
    let skip = false;
    paper.addEventListener("click", () => {
      skip = true;
    });

    env.addEventListener("click", async () => {
      if (state.letterStarted) return;
      state.letterStarted = true;
      env.classList.add("open");
      hint.classList.add("removed");
      await wait(1100);
      env.classList.add("gone");
      await wait(700);
      env.classList.add("removed");
      paper.hidden = false;
      await wait(900);
      await typeLetter(CONFIG.letter);
      finishLetter();
    });

    async function typeLetter(str) {
      if (reduced) {
        text.textContent = str;
        return;
      }
      for (let i = 0; i < str.length; i++) {
        if (skip) {
          text.textContent = str;
          return;
        }
        text.textContent = str.slice(0, i + 1);
        await wait(
          /[.,!\n]/.test(str[i]) ? CONFIG.typingSpeed * 7 : CONFIG.typingSpeed,
        );
      }
    }

    async function finishLetter() {
      $("#letter-heart").classList.add("show");
      await wait(900);
      $("#ending").classList.add("show");
      risingHearts();
      setTimeout(
        () =>
          $("#chapter-4").scrollTo({
            top: 99999,
            behavior: reduced ? "auto" : "smooth",
          }),
        400,
      );
    }
  }

  /* ===== Nhạc nền (chỉ phát khi bấm) ===== */
  function initMusic() {
    const btn = $("#music-btn"),
      audio = $("#bgm");
    function setState(on) {
      btn.classList.toggle("on", on);
      btn.setAttribute("aria-pressed", String(on));
      btn.setAttribute("aria-label", on ? "Tắt nhạc nền" : "Bật nhạc nền");
    }
    btn.addEventListener("click", async () => {
      if (!audio.paused) {
        audio.pause();
        setState(false);
        return;
      }
      try {
        await audio.play();
        setState(true);
      } catch (_) {
        btn.classList.add("off-file");
        btn.title = "Chưa có file assets/music/background.mp3";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initSky();
    initNav();
    initUnlock();
    initPhotos();
    initScrapbook();
    initLetter();
    initMusic();
  });
})();

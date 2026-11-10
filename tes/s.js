(() => {
  "use strict";

  const pages = [
    "/asset/themes/img/Scrapbook/The%20Butterfly%20Garden/foto1.webp",
    "/asset/themes/img/Scrapbook/The%20Butterfly%20Garden/foto2.webp",
    "/asset/themes/img/Scrapbook/The%20Butterfly%20Garden/foto3.webp",
    "/asset/themes/img/Scrapbook/The%20Butterfly%20Garden/foto4.webp",
    "/asset/themes/img/Scrapbook/The%20Butterfly%20Garden/foto5.webp",
    "/asset/themes/img/Scrapbook/The%20Butterfly%20Garden/foto6.webp",
    "/asset/themes/img/Scrapbook/The%20Butterfly%20Garden/foto7.webp",
    "/asset/themes/img/Scrapbook/The%20Butterfly%20Garden/foto8.webp"
  ];

  const book = document.querySelector(".book");
  const openBtn = document.querySelector(".open-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const nav = document.querySelector(".nav");
  const pesanBtn = document.querySelector(".pesan-btn");
  const pageCount = document.querySelector(".page-count");
  const progress = document.querySelector(".progress-fill");
  const pageLabel = document.querySelector(".page-label");
  const music = document.querySelector(".background-music");
  const clickAudio = document.querySelector(".click-sound");
  const soundToggle = document.querySelector(".sound-toggle");
  const total = pages.length - 1;
  let current = 0;
  let locked = false;
  let musicEnabled = true;

  const playClick = () => {
    if (!clickAudio) return;
    clickAudio.currentTime = 0;
    clickAudio.play().catch(() => {});
  };

  // Build the layered pages from the supplied scrapbook photographs.
  for (let i = 0; i < total; i++) {
    const paper = document.createElement("div");
    paper.className = "paper";
    paper.style.zIndex = String(total - i);
    paper.innerHTML = `
      <div class="front"><div class="front-content" style="--bg:url('${pages[i]}')"></div></div>
      <div class="back"><div class="back-content" style="--bg:url('${pages[i + 1]}')"></div></div>`;
    book.appendChild(paper);
  }
  const papers = [...book.querySelectorAll(".paper")];

  function updateUI() {
    const shown = Math.min(current + 1, total);
    pageCount.textContent = `${String(shown).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
    progress.style.width = `${(shown / total) * 100}%`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= total;
    pageLabel.textContent = current === 0 ? "COVER" : current >= total ? "BACK COVER" : `PAGE ${String(current).padStart(2, "0")}`;
    pesanBtn.classList.toggle("show", current >= total);
  }

  function openBook() {
    book.style.transform = "translateX(50%)";
    book.classList.remove("fs", "bs");
  }
  function closeBook(atStart) {
    book.style.transform = atStart ? "translateX(0%)" : "translateX(100%)";
    book.classList.toggle("fs", atStart);
    book.classList.toggle("bs", !atStart);
  }

  function setPageState(target) {
    papers.forEach((paper, index) => {
      const front = paper.querySelector(".front");
      const back = paper.querySelector(".back");
      const angle = index < target ? -180 : 0;
      front.style.transform = `rotateY(${angle}deg)`;
      back.style.transform = `rotateY(${angle}deg)`;
      paper.style.zIndex = index < target ? String(index + 1) : String(total - index);
    });
    if (target === 0) closeBook(true);
    else if (target === total) closeBook(false);
    else openBook();
    current = target;
    updateUI();
  }

  function turn(direction) {
    if (locked) return;
    const target = Math.max(0, Math.min(total, current + direction));
    if (target === current) return;
    locked = true;
    playClick();
    setPageState(target);
    window.setTimeout(() => { locked = false; }, 720);
  }

  openBtn.addEventListener("click", async () => {
    playClick();
    openBtn.style.display = "none";
    nav.classList.add("show");
    if (musicEnabled && music) {
      try { await music.play(); } catch (_) { /* Browser may require another user gesture. */ }
    }
    turn(1);
  });
  prevBtn.addEventListener("click", () => turn(-1));
  nextBtn.addEventListener("click", () => turn(1));

  soundToggle.addEventListener("click", async () => {
    musicEnabled = !musicEnabled;
    if (musicEnabled) {
      try { await music.play(); } catch (_) {}
      soundToggle.querySelector(".sound-label").textContent = "Musik";
      soundToggle.setAttribute("aria-label", "Matikan musik");
    } else {
      music.pause();
      soundToggle.querySelector(".sound-label").textContent = "Senyap";
      soundToggle.setAttribute("aria-label", "Nyalakan musik");
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "ArrowRight" && nav.classList.contains("show")) turn(1);
    if (event.key === "ArrowLeft" && nav.classList.contains("show")) turn(-1);
  });

  // Swipe support for touch screens.
  let touchStartX = null;
  book.addEventListener("touchstart", event => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
  book.addEventListener("touchend", event => {
    if (touchStartX === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 45) turn(delta < 0 ? 1 : -1);
    touchStartX = null;
  }, { passive: true });

  async function kirimPesan() {
    const result = await Swal.fire({
      title: "Tulis pesan untukku",
      text: "Ceritakan apa pun yang ingin kamu sampaikan ♡",
      input: "textarea",
      inputPlaceholder: "Tulis pesanmu di sini…",
      inputAttributes: { "aria-label": "Pesan" },
      showCancelButton: true,
      confirmButtonText: "Kirim pesan",
      cancelButtonText: "Nanti saja",
      confirmButtonColor: "#a96d75",
      cancelButtonColor: "#bda6a1",
      inputValidator: value => !value.trim() ? "Pesannya jangan kosong ya :)" : undefined
    });
    if (!result.isConfirmed) return;

    try {
      const formData = new FormData();
      formData.append("pesan", result.value.trim());
      const response = await fetch("func.php?act=add", { method: "POST", body: formData });
      if (!response.ok) throw new Error("Server tidak merespons dengan benar.");
      const data = await response.json();
      if (Number(data.Status) !== 200) throw new Error(data.Message || "Pesan belum berhasil disimpan.");
      await Swal.fire({ icon: "success", title: "Pesan berhasil dikirim!", text: "Terima kasih sudah meluangkan waktu ♡", confirmButtonColor: "#a96d75" });
      playClick();
    } catch (error) {
      await Swal.fire({ icon: "error", title: "Pesan belum terkirim", text: "Silakan coba lagi beberapa saat ya.", confirmButtonColor: "#a96d75" });
      console.error("Gagal mengirim pesan:", error);
    }
  }
  pesanBtn.addEventListener("click", kirimPesan);

  // Soft falling hearts, kept lightweight and decorative.
  const sparkles = document.querySelector(".sparkles");
  const symbols = ["♡", "✧", "✿"];
  function makeFloatingDetail() {
    const item = document.createElement("span");
    item.className = "love-item";
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    item.style.left = `${Math.random() * 100}%`;
    item.style.fontSize = `${10 + Math.random() * 9}px`;
    item.style.animationDuration = `${8 + Math.random() * 7}s`;
    sparkles.appendChild(item);
    window.setTimeout(() => item.remove(), 16000);
  }
  for (let i = 0; i < 8; i++) window.setTimeout(makeFloatingDetail, i * 650);
  window.setInterval(makeFloatingDetail, 1800);

  window.addEventListener("load", () => {
    const loader = document.querySelector(".preload");
    if (!loader) return;
    loader.style.opacity = "0";
    window.setTimeout(() => loader.remove(), 500);
  });

  updateUI();
})();

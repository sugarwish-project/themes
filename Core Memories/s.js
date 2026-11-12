// ==========================================
// KONFIGURASI KONTEN, MUSIK, SFX & WHATSAPP
// ==========================================
const konten = [
  {
    gambar: "/asset/themes/animasi/pentol/Stiker%2049.gif",
    ucapan: "Hallo sayang ✨",
  },
  {
    gambar: "/asset/themes/animasi/pentol/Stiker%2048.gif",
    ucapan: "Selamat ulang tahun ya! Semoga panjang umur & sehat selalu 🎂",
  },
  {
    gambar: "/asset/themes/animasi/pentol/Stiker%2016.gif",
    ucapan: "Semoga semua harapan dan impianmu tahun ini tercapai ya...",
  },
  {
    gambar: "/asset/themes/animasi/pentol/Stiker%2036.gif",
    ucapan: "Terima kasih sudah selalu hadir dan bikin hari-hari jadi lebih berwarna 🤍",
  },
  {
    gambar: "/asset/themes/animasi/pentol/Stiker%202.gif",
    ucapan: "Ada pesan atau harapan khusus? Tulis di bawah ya!",
  },
];

const musikUrl =
  "/musik/Virgoun_Surat_Cinta_Untuk-Starla.mp3";

// URL Efek Suara (SFX) saat tombol lanjut diklik
const sfxUrl = "/musik/sfx/typ.mp3";

// Isi dengan nomor WhatsApp tujuan
const nomorWhatsapp = "/";

// ==========================================
// LOGIKA APLIKASI INTERAKTIF
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const spiralRings = document.getElementById("spiral-rings");
  const particlesContainer = document.getElementById("particles");
  const heartBtn = document.getElementById("heart-btn");
  const introStage = document.getElementById("intro-stage");
  const cardsStage = document.getElementById("cards-stage");
  const cardStack = document.getElementById("card-stack");
  const progressDots = document.getElementById("progress-dots");
  const btnNext = document.getElementById("btn-next");
  const btnSend = document.getElementById("btn-send");
  const btnRestart = document.getElementById("btn-restart");
  const musicToggle = document.getElementById("music-toggle");
  const musicLabel = musicToggle.querySelector(".music-label");

  let currentIndex = 0;
  let isAnimating = false;
  let audio = null;
  let sfxAudio = null;

  // 1. Inisialisasi Audio & SFX
  if (musikUrl && musikUrl.trim() !== "") {
    audio = new Audio(musikUrl);
    audio.loop = true;
  }

  if (sfxUrl && sfxUrl.trim() !== "") {
    sfxAudio = new Audio(sfxUrl);
  }

  // 2. Render Spiral Binder Rings secara dinamis
  function renderBinderRings() {
    spiralRings.innerHTML = "";
    const count = Math.min(10, Math.floor(spiralRings.offsetWidth / 38));
    for (let i = 0; i < count; i++) {
      const ring = document.createElement("div");
      ring.className = "ring";
      spiralRings.appendChild(ring);
    }
  }
  renderBinderRings();
  window.addEventListener("resize", renderBinderRings);

  // 3. Partikel Hati Melayang di Latar Belakang
  function createParticles() {
    const symbols = ["♥", "✦", "❀", "♡"];
    for (let i = 0; i < 14; i++) {
      const span = document.createElement("span");
      span.className = "particle";
      span.textContent = symbols[i % symbols.length];
      span.style.left = `${Math.random() * 100}%`;
      span.style.animationDuration = `${8 + Math.random() * 10}s`;
      span.style.animationDelay = `${Math.random() * 8}s`;
      span.style.color = i % 2 === 0 ? "#b84a4a" : "#9e7b70";
      particlesContainer.appendChild(span);
    }
  }
  createParticles();

  // 4. Render Kartu Polaroid & Indikator Progres
  function initCards() {
    cardStack.innerHTML = "";
    progressDots.innerHTML = "";

    konten.forEach((item, index) => {
      const dot = document.createElement("span");
      dot.className = "dot" + (index === 0 ? " active" : "");
      progressDots.appendChild(dot);

      const card = document.createElement("article");
      card.className = "polaroid-card";
      card.dataset.index = index;

      if (item.gambar) {
        const imgWrap = document.createElement("div");
        imgWrap.className = "polaroid-img-wrap";
        const img = document.createElement("img");
        img.src = item.gambar;
        img.alt = `Slide ${index + 1}`;
        imgWrap.appendChild(img);
        card.appendChild(imgWrap);
      }

      if (item.ucapan) {
        const text = document.createElement("p");
        text.className = "polaroid-text";
        text.textContent = item.ucapan;
        card.appendChild(text);
      }

      cardStack.appendChild(card);
    });

    updateStackVisuals();
  }

  function updateStackVisuals() {
    const cards = cardStack.querySelectorAll(".polaroid-card");
    const dots = progressDots.querySelectorAll(".dot");

    cards.forEach((card, idx) => {
      card.classList.remove("is-active", "is-next", "is-third", "is-hidden-stack", "fly-out");
      if (idx === currentIndex) {
        card.classList.add("is-active");
      } else if (idx === currentIndex + 1) {
        card.classList.add("is-next");
      } else if (idx === currentIndex + 2) {
        card.classList.add("is-third");
      } else if (idx > currentIndex + 2) {
        card.classList.add("is-hidden-stack");
      } else if (idx < currentIndex) {
        card.classList.add("fly-out");
      }
    });

    dots.forEach((dot, idx) => {
      dot.classList.remove("active", "done");
      if (idx === currentIndex) dot.classList.add("active");
      else if (idx < currentIndex) dot.classList.add("done");
    });

    // Kontrol visibilitas tombol di kartu terakhir
    if (currentIndex >= konten.length - 1) {
      btnNext.classList.add("hidden");
      btnSend.classList.remove("hidden");
      btnRestart.classList.remove("hidden");
    } else {
      btnNext.classList.remove("hidden");
      btnSend.classList.add("hidden");
      btnRestart.classList.add("hidden");
    }
  }

  // 5. Event Klik Ikon Hati (Mulai)
  heartBtn.addEventListener("click", () => {
    if (audio) {
      audio
        .play()
        .then(() => {
          musicToggle.classList.remove("hidden");
        })
        .catch(() => {
          musicToggle.classList.remove("hidden");
          musicToggle.classList.add("paused");
          musicLabel.textContent = "Play";
        });
    }

    introStage.classList.add("fade-out");
    setTimeout(() => {
      introStage.classList.add("hidden");
      cardsStage.classList.remove("hidden");
    }, 450);
  });

  // 6. Kontrol Play/Pause Musik
  musicToggle.addEventListener("click", () => {
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      musicToggle.classList.remove("paused");
      musicLabel.textContent = "Playing";
    } else {
      audio.pause();
      musicToggle.classList.add("paused");
      musicLabel.textContent = "Paused";
    }
  });

  // 7. Navigasi Kartu Berikutnya + Putar SFX
  function goToNextCard() {
    if (isAnimating || currentIndex >= konten.length - 1) return;
    isAnimating = true;

    if (sfxAudio) {
      sfxAudio.currentTime = 0;
      sfxAudio.play().catch(() => {});
    }

    currentIndex++;
    updateStackVisuals();

    setTimeout(() => {
      isAnimating = false;
    }, 450);
  }

  btnNext.addEventListener("click", goToNextCard);

  // 8. Fungsi Tombol Ulangi (Restart)
  function restartExperience() {
    if (isAnimating) return;
    currentIndex = 0;
    initCards();
  }

  if (btnRestart) {
    btnRestart.addEventListener("click", restartExperience);
  }

  // 9. Fitur Kirim Balasan (SweetAlert2 + WhatsApp / PHP Backend)
  const customSwal = Swal.mixin({
    allowOutsideClick: false,
    confirmButtonText: "Kirim",
  });

  async function openMessageModal() {
    const { value: pesan } = await customSwal.fire({
      title: "Tulis pesan di sini ^_^",
      input: "textarea",
      inputPlaceholder: "Ketik balasan atau harapanmu...",
      showCancelButton: true,
      cancelButtonText: "Batal",
    });

    if (pesan === undefined) return;

    if (pesan.trim() !== "") {
      const cleanWa = nomorWhatsapp.replace(/\D/g, "");
      if (cleanWa.length > 8) {
        await customSwal.fire({
          icon: "success",
          title: "Siap dikirim!",
          text: "Mengarahkan ke WhatsApp...",
          timer: 1400,
          showConfirmButton: false,
        });
        const encodedText = encodeURIComponent(pesan.trim());
        const waUrl = cleanWa.startsWith("62")
          ? `https://wa.me/${cleanWa}?text=${encodedText}`
          : `https://wa.me/?text=${encodedText}`;
        window.location.assign(waUrl);
      } else {
        customSwal.fire({
          title: "Mengirim pesan...",
          didOpen: () => Swal.showLoading(),
        });

        const formData = new FormData();
        formData.append("pesan", pesan.trim());

        try {
          const response = await fetch("func.php?act=add", {
            method: "POST",
            body: formData,
          });
          const result = await response.json();

          if (result.statusCode === 200) {
            await customSwal.fire({
              icon: "success",
              title: "Pesan berhasil dikirim!",
            });
          } else {
            throw new Error("Gagal");
          }
        } catch (err) {
          await customSwal.fire({
            icon: "error",
            title: "Pesan gagal terkirim!",
            text: "Nomor tujuan belum di tentukan!.",
          });
          openMessageModal();
        }
      }
    } else {
      await customSwal.fire({
        icon: "warning",
        confirmButtonText: "Iya deh",
        title: "Jangan dikosongin dong :)",
      });
      openMessageModal();
    }
  }

  btnSend.addEventListener("click", openMessageModal);

  initCards();

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("fade-out");
      setTimeout(() => preloader.remove(), 500);
    }, 400);
  });
});
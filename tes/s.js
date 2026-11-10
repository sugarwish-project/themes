// =========================================================================
  // ALBUM
  // =========================================================================
  const konten = [
    "/asset/themes/img/Scrapbook/The%20Butterfly%20Garden/foto1.webp", // Halaman Depan / Cover
    "/asset/themes/img/Scrapbook/The%20Butterfly%20Garden/foto2.webp", // Halaman 1
    "/asset/themes/img/Scrapbook/The%20Butterfly%20Garden/foto3.webp", // Halaman 2
    "/asset/themes/img/Scrapbook/The%20Butterfly%20Garden/foto4.webp", // Halaman 3
    "/asset/themes/img/Scrapbook/The%20Butterfly%20Garden/foto5.webp", // Halaman 4
    "/asset/themes/img/Scrapbook/The%20Butterfly%20Garden/foto6.webp", // Halaman 5
    "/asset/themes/img/Scrapbook/The%20Butterfly%20Garden/foto7.webp", // Halaman 6
    "/asset/themes/img/Scrapbook/The%20Butterfly%20Garden/foto8.webp"  // Halaman Belakang / Back Cover
  ];
  // =========================================================================

  musik = "/musik/ANDMESH - ANUGERAH TERINDAH - VIDEO LIRIK - LIRIK LAGU TERBARU - Reff.mp3";
  isKlikAudio = 1;
  const swalo = Swal.mixin({
    allowOutsideClick: false,
    reverseButtons: true
  });
  const NOMOR_WA = ""; // isi nomor tujuan, contoh: "6281234567890" (kosong = tidak membuka WhatsApp)
  const klik = () => { if (isKlikAudio) { klikA.currentTime = 0; klikA.play().catch(() => {}); } };
  async function kirimPesan() {
    klik();
    const { value: pesanInput } = await swalo.fire({
      title: "Tulis pesan",
      input: "textarea",
      inputPlaceholder: "Tulis apa saja yang ingin kamu sampaikan...",
      confirmButtonText: "Kirim",
      inputValidator: v => (!v || !v.trim()) ? "Jangan dikosongin ya :)" : undefined
    });
    klik();
    if (!pesanInput) return;
    swalo.fire({ title: "Mengirim pesan", didOpen: () => swalo.showLoading() });
    sendToDb(pesanInput.trim(), async () => {
      await swalo.fire({
        icon: "success",
        title: "Pesan berhasil dikirim!",
        confirmButtonText: NOMOR_WA ? "Buka WhatsApp" : "OK"
      });
      klik();
      if (NOMOR_WA) window.open("https://wa.me/" + NOMOR_WA + "?text=" + encodeURIComponent(pesanInput.trim()), "_blank");
    });
  }
    function sendToDb(pesanText, callback) {
    const formData = new FormData();
    formData.append("pesan", pesanText);
    fetch("func.php?act=add", {
      method: "POST",
      body: formData
    }).then(res => res.json()).then(async responseData => {
      if (responseData.Status == 200) {
        callback();
      }
    }).catch(err => {
      console.log("Gagal mengirim ke DB, menjalankan callback...", err);
      callback(); 
    });
  }
  var klikA = new Audio("/musik/sfx/klik.mp3");
  klikA.autoplay = false;
  klikA.loop = false;
  const musikA = new Audio(musik);
  musikA.autoplay = true;
  musikA.loop = true;
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const book = document.querySelector(".book");
  const btnContainer = document.querySelector(".btn-container");
  const openBtn = document.querySelector(".open-btn");
  const navBtn = document.querySelector(".nav");
  const pesanBtn = document.querySelector(".pesan-btn");
  
  for (let i = 0; i < konten.length - 1; i++) {
    const paperE = document.createElement("div");
    paperE.classList.add("paper");
    paperE.innerHTML = "\n        <div class=\"front\">\n          <div class=\"front-content\" style=\"--bg: url('" + konten[i] + "')\"></div>\n        </div>\n        <div class=\"back\">\n          <div class=\"back-content\" style=\"--bg: url('" + konten[i + 1] + "')\"></div>\n        </div>";
    book.appendChild(paperE);
  }
  
  openBtn.onclick = () => {
    musikA.play();
    if (isKlikAudio) {
      klikA.play();
    }
    clickHandler(1);
    btnContainer.classList.add("hide");
    setTimeout(() => {
      openBtn.classList.remove("show");
      navBtn.classList.add("show");
      btnContainer.classList.remove("hide");
    }, 500);
  };
  pesanBtn.onclick = kirimPesan;
  prevBtn.addEventListener("click", () => {
    if (isKlikAudio) {
      klikA.play();
    }
    clickHandler(0);
  });
  nextBtn.addEventListener("click", () => {
    if (isKlikAudio) {
      klikA.play();
    }
    clickHandler(1);
  });
  function openBook() {
    book.style.transform = "translateX(50%)";
    book.classList.remove("fs");
    book.classList.remove("bs");
  }
  function closeBook(isFirstPage) {
    if (isFirstPage) {
      book.classList.add("fs");
      book.style.transform = "translateX(0%)";
      papers.forEach((paperItem) => {
        paperItem.querySelector(".front").style.transform = "rotateY(0deg)";
        paperItem.querySelector(".back").style.transform = "rotateY(0deg)";
      });
    } else {
      book.classList.add("bs");
      book.style.transform = "translateX(100%)";
      papers.forEach((paperItem) => {
        paperItem.querySelector(".front").style.transform = "rotateY(-180deg)";
        paperItem.querySelector(".back").style.transform = "rotateY(-180deg)";
      });
    }
    papers.forEach((paperItem) => {
      const backSide = paperItem.querySelector(".back");
      backSide.style.boxShadow = "7px 5px 12px rgba(0, 0, 0, 0)";
    });
  }
  const papers = document.querySelectorAll(".paper");
  const paperTotal = papers.length;
  let currentLocation = 0;
  let zInd = paperTotal;
  let dataZIndex = [];
  papers.forEach(paperItem => {
    paperItem.style.zIndex = zInd;
    dataZIndex.push(zInd);
    zInd--;
  });
  let clck = 1;
  function clickHandler(isNext) {
    if (clck) {
      if (isNext) {
        goNextPage();
      } else {
        goPrevPage();
      }
      clck = 0;
      setTimeout(() => {
        clck = 1;
      }, 500);
    }
  }
  function goNextPage() {
    if (currentLocation == paperTotal - 1) {
      pesanBtn.classList.add("show");
    }
    if (currentLocation < paperTotal) {
      let timeoutDelay = 250;
      if (currentLocation == 0) {
        timeoutDelay = 300;
      }
      if (currentLocation == paperTotal - 1) {
        timeoutDelay = 200;
      }
      const currentIndex = currentLocation;
      setTimeout(() => {
        papers[currentIndex].style.zIndex = "" + currentIndex;
      }, timeoutDelay);
      paperHandler(currentIndex);
      if (currentLocation == paperTotal - 1) {
        closeBook(0);
      } else {
        openBook();
      }
      currentLocation++;
    }
  }
  function goPrevPage() {
    if (currentLocation > 0 && currentLocation <= paperTotal) {
      currentLocation--;
      let timeoutDelay = 250;
      if (currentLocation == 0) {
        timeoutDelay = 200;
      }
      if (currentLocation == paperTotal - 1) {
        timeoutDelay = 300;
      }
      const currentIndex = currentLocation;
      setTimeout(() => {
        papers[currentIndex].style.zIndex = "" + dataZIndex[currentIndex];
      }, timeoutDelay);
      const prevIndex = currentLocation - 1;
      paperHandler(prevIndex);
      if (currentLocation == 0) {
        closeBook(1);
      }
      if (currentLocation == paperTotal - 1) {
        openBook();
      }
    }
  }
  function paperHandler(targetIndex) {
    papers.forEach((paperItem, paperIndex) => {
      const frontSide = paperItem.querySelector(".front");
      const backSide = paperItem.querySelector(".back");
      if (targetIndex >= 0) {
        if (paperIndex >= targetIndex - 2 && paperIndex <= targetIndex + 3) {
          backSide.style.boxShadow = "7px 5px 12px rgba(0, 0, 0, 0.2)";
        } else {
          backSide.style.boxShadow = "7px 5px 12px rgba(0, 0, 0, 0)";
        }
        if (paperIndex == targetIndex) {
          frontSide.style.transform = "rotateY(-150deg)";
          backSide.style.transform = "rotateY(-150deg)";
        } else if (paperIndex == targetIndex - 1) {
          frontSide.style.transform = "rotateY(-160deg)  scaleX(105%)";
          backSide.style.transform = "rotateY(-160deg)  scaleX(105%)";
        } else if (paperIndex <= targetIndex - 2) {
          frontSide.style.transform = "rotateY(-170deg)  scaleX(110%)";
          backSide.style.transform = "rotateY(-170deg)  scaleX(110%)";
        } else if (paperIndex == targetIndex + 1) {
          frontSide.style.transform = "rotateY(-30deg)";
          backSide.style.transform = "rotateY(-30deg)";
        } else if (paperIndex == targetIndex + 2) {
          frontSide.style.transform = "rotateY(-20deg)  scaleX(105%)";
          backSide.style.transform = "rotateY(-20deg)  scaleX(105%)";
        } else if (paperIndex >= targetIndex + 3) {
          frontSide.style.transform = "rotateY(-10deg) scaleX(110%)";
          backSide.style.transform = "rotateY(-10deg) scaleX(110%)";
        }
      }
    });
  }
  window.onload = () => {
    const preloadEl = document.querySelector(".preload");
    preloadEl.style = "transition: .5s ease all; opacity: 0";
    setTimeout(() => {
      preloadEl.remove();
    }, 500);
  };


  // =========================================================================
  // PENINGKATAN: hati jatuh, info halaman, tombol musik, keyboard & swipe
  // =========================================================================
  const goFull = () => {
    const el = document.documentElement;
    if (!document.fullscreenElement && el.requestFullscreen) el.requestFullscreen().catch(() => {});
  };
  const info = document.querySelector(".page-info");
  const muteBtn = document.querySelector(".mute-btn");
  const swalAktif = () => document.querySelector(".swal2-container");

  const _clickHandler = clickHandler;
  clickHandler = function (n) {
    _clickHandler(n);
    info.textContent = currentLocation > 0 ? currentLocation + " / " + paperTotal : "";
  };
  const _open = openBtn.onclick;
  openBtn.onclick = () => { _open(); muteBtn.classList.add("show"); goFull(); };

  muteBtn.onclick = () => {
    musikA.muted = !musikA.muted;
    muteBtn.classList.toggle("off", musikA.muted);
    muteBtn.setAttribute("aria-label", musikA.muted ? "Nyalakan musik" : "Matikan musik");
  };

  document.addEventListener("keydown", e => {
    if (swalAktif() || !navBtn.classList.contains("show")) return;
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
  });
  let tx = null;
  document.addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
  document.addEventListener("touchend", e => {
    if (tx === null || swalAktif() || !navBtn.classList.contains("show")) return;
    const dx = e.changedTouches[0].clientX - tx;
    tx = null;
    if (Math.abs(dx) > 50) (dx < 0 ? nextBtn : prevBtn).click();
  }, { passive: true });

  (() => {
    const wrap = document.querySelector(".bg-love");
    if (!wrap || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const heart = '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.5-9.2C1 8.3 3 5 6.3 5c2 0 3.700 1.100 5.700 3.200C14 6.100 15.700 5 17.700 5 21 5 23 8.300 21.500 11.800 19.500 16.400 12 21 12 21z"/></svg>';
    setInterval(() => {
      if (document.hidden) return;
      const el = document.createElement("div");
      el.className = "love-item";
      el.style.cssText = "left:" + Math.random() * 100 + "%;width:" + (10 + Math.random() * 16) + "px;animation-duration:" + (8 + Math.random() * 8) + "s";
      el.innerHTML = heart;
      wrap.appendChild(el);
      el.addEventListener("animationend", () => el.remove());
    }, 900);
  })();
